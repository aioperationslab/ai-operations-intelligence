import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";
import {
  calculateOpportunityScore,
  type AutomationMaturity,
} from "@/app/lib/scoring";

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "toNumber" in value &&
    typeof (value as { toNumber: unknown }).toNumber === "function"
  ) {
    return (
      value as {
        toNumber: () => number;
      }
    ).toNumber();
  }

  return Number(value ?? 0);
}

function normalizeMaturity(value: unknown): AutomationMaturity {
  const maturity = String(value ?? "").trim();

  if (maturity === "Production") {
    return "Production";
  }

  if (maturity === "Pilot") {
    return "Pilot";
  }

  return "Other";
}

export async function GET() {
  try {
    const result = await driver.executeQuery(`
      MATCH (p:Process)-[:AUTOMATED_BY]->(a:Automation)

      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p)

      OPTIONAL MATCH (a)-[:USES_SYSTEM]->(s:System)

      OPTIONAL MATCH (a)-[:USES_TECHNOLOGY]->(t:Technology)

      OPTIONAL MATCH (p)-[:DEPENDS_ON]->(dependent:Process)

      WITH
        p,
        a,
        d,
        collect(DISTINCT s.name) AS systems,
        collect(DISTINCT t.name) AS technologies,
        collect(DISTINCT dependent.name) AS dependencies

      RETURN
        p.id AS processId,
        p.name AS process,
        d.name AS department,

        a.id AS automationId,
        a.name AS automation,
        a.type AS automationType,
        a.maturity AS maturity,
        a.confidence AS confidence,

        systems,
        technologies,
        dependencies

      ORDER BY a.confidence ASC
    `);

    const opportunities = result.records.map((record) => {
      const processId = String(record.get("processId") ?? "");
      const process = String(record.get("process") ?? "");
      const department = String(record.get("department") ?? "");

      const automationId = String(
        record.get("automationId") ?? ""
      );

      const automation = String(
        record.get("automation") ?? ""
      );

      const automationType = String(
        record.get("automationType") ?? ""
      );

      const maturity = normalizeMaturity(
        record.get("maturity")
      );

      const confidence = toNumber(
        record.get("confidence")
      );

      const systems = (record.get("systems") ?? []) as string[];

      const technologies = (record.get("technologies") ??
        []) as string[];

      const dependencies = (record.get("dependencies") ??
        []) as string[];

      /*
       * =====================================================
       * CANONICAL OPPORTUNITY SCORING
       * =====================================================
       *
       * This MUST use the same scoring engine as
       * Process Intelligence.
       *
       * No separate formula is maintained here.
       */

      const scoring = calculateOpportunityScore({
        confidence,
        maturity,
        systems: systems.length,
        dependencies: dependencies.length,
      });

      const opportunityScore = scoring.score;
      const priority = scoring.priority;

      let recommendation =
        "Monitor current automation performance.";

      if (priority === "High") {
        recommendation =
          "Assess this process for further automation or AI optimization.";
      } else if (priority === "Medium") {
        recommendation =
          "Review process performance and identify targeted improvements.";
      }

      return {
        processId,
        process,
        department,

        automationId,
        automation,
        automationType,

        maturity,
        confidence,

        opportunityScore,
        priority,
        recommendation,

        systems,
        technologies,
        dependencies,
      };
    });

    const highPriority = opportunities.filter(
      (item) => item.priority === "High"
    ).length;

    const mediumPriority = opportunities.filter(
      (item) => item.priority === "Medium"
    ).length;

    const lowPriority = opportunities.filter(
      (item) => item.priority === "Low"
    ).length;

    const averageOpportunity =
      opportunities.length > 0
        ? Math.round(
            opportunities.reduce(
              (sum, item) => sum + item.opportunityScore,
              0
            ) / opportunities.length
          )
        : 0;

    return NextResponse.json({
      success: true,

      count: opportunities.length,

      summary: {
        totalOpportunities: opportunities.length,
        highPriority,
        mediumPriority,
        lowPriority,
        averageOpportunity,
      },

      opportunities,

      source: "Neo4j Aura",
    });
  } catch (error) {
    console.error(
      "Automation opportunities error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load automation opportunities.",
      },
      {
        status: 500,
      }
    );
  }
}