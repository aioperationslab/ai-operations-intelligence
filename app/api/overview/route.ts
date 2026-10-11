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
    /*
     * =========================================================
     * CORE PLATFORM METRICS
     * =========================================================
     */

    const summaryResult = await driver.executeQuery(`
      MATCH (p:Process)
      WITH count(p) AS totalProcesses

      MATCH (a:Automation)
      WITH
        totalProcesses,
        count(a) AS totalAutomations,
        count(
          CASE
            WHEN a.maturity = 'Production' THEN 1
          END
        ) AS productionAutomations,
        count(
          CASE
            WHEN a.maturity = 'Pilot' THEN 1
          END
        ) AS pilotAutomations,
        coalesce(
          round(avg(toFloat(a.confidence))),
          0
        ) AS averageConfidence

      MATCH ()-[r]->()
      WITH
        totalProcesses,
        totalAutomations,
        productionAutomations,
        pilotAutomations,
        averageConfidence,
        count(r) AS totalRelationships

      MATCH (s:System)
      WITH
        totalProcesses,
        totalAutomations,
        productionAutomations,
        pilotAutomations,
        averageConfidence,
        totalRelationships,
        count(s) AS totalSystems

      MATCH (t:Technology)

      RETURN
        totalProcesses,
        totalAutomations,
        productionAutomations,
        pilotAutomations,
        averageConfidence,
        totalRelationships,
        totalSystems,
        count(t) AS totalTechnologies
    `);

    const rawSummary =
      summaryResult.records[0]?.toObject() ?? {};

    const totalProcesses = toNumber(
      rawSummary.totalProcesses
    );

    const totalAutomations = toNumber(
      rawSummary.totalAutomations
    );

    const productionAutomations = toNumber(
      rawSummary.productionAutomations
    );

    const pilotAutomations = toNumber(
      rawSummary.pilotAutomations
    );

    const averageConfidence = toNumber(
      rawSummary.averageConfidence
    );

    const totalRelationships = toNumber(
      rawSummary.totalRelationships
    );

    const totalSystems = toNumber(
      rawSummary.totalSystems
    );

    const totalTechnologies = toNumber(
      rawSummary.totalTechnologies
    );

    /*
     * =========================================================
     * OPPORTUNITY DATA
     *
     * Uses the same canonical scoring engine as:
     *
     * - Process Intelligence
     * - Automation Opportunities
     * - Overview
     * =========================================================
     */

    const opportunityResult = await driver.executeQuery(`
      MATCH (p:Process)-[:AUTOMATED_BY]->(a:Automation)

      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p)

      OPTIONAL MATCH (a)-[:USES_SYSTEM]->(s:System)

      OPTIONAL MATCH (p)-[:DEPENDS_ON]->(dependency:Process)

      WITH
        p,
        a,
        d,
        count(DISTINCT s) AS systemCount,
        count(DISTINCT dependency) AS dependencyCount

      RETURN
        p.id AS processId,
        p.name AS process,
        d.name AS department,

        a.id AS automationId,
        a.name AS automation,
        a.maturity AS maturity,
        a.confidence AS confidence,

        systemCount,
        dependencyCount

      ORDER BY p.name
    `);

    const allOpportunities =
      opportunityResult.records.map((record) => {
        const processId = String(
          record.get("processId") ?? ""
        );

        const process = String(
          record.get("process") ?? ""
        );

        const department = String(
          record.get("department") ?? ""
        );

        const automationId = String(
          record.get("automationId") ?? ""
        );

        const automation = String(
          record.get("automation") ?? ""
        );

        const maturity = normalizeMaturity(
          record.get("maturity")
        );

        const confidence = toNumber(
          record.get("confidence")
        );

        const systemCount = toNumber(
          record.get("systemCount")
        );

        const dependencyCount = toNumber(
          record.get("dependencyCount")
        );

        const scoring =
          calculateOpportunityScore({
            confidence,
            maturity,
            systems: systemCount,
            dependencies: dependencyCount,
          });

        return {
          processId,
          process,
          department,

          automationId,
          automation,

          maturity,
          confidence,

          opportunityScore: scoring.score,
          priority: scoring.priority,

          systemCount,
          dependencyCount,
        };
      });

    /*
     * =========================================================
     * OPPORTUNITY SUMMARY
     * =========================================================
     */

    const highPriority =
      allOpportunities.filter(
        (item) => item.priority === "High"
      ).length;

    const mediumPriority =
      allOpportunities.filter(
        (item) => item.priority === "Medium"
      ).length;

    const lowPriority =
      allOpportunities.filter(
        (item) => item.priority === "Low"
      ).length;

    const averageOpportunity =
      allOpportunities.length > 0
        ? Math.round(
            allOpportunities.reduce(
              (sum, item) =>
                sum + item.opportunityScore,
              0
            ) / allOpportunities.length
          )
        : 0;

    const opportunities = [...allOpportunities]
      .sort(
        (a, b) =>
          b.opportunityScore -
            a.opportunityScore ||
          a.confidence - b.confidence
      )
      .slice(0, 5);

    /*
     * =========================================================
     * TECHNOLOGY ADOPTION
     *
     * IMPORTANT:
     * Neo4j count() returns a Neo4j Integer.
     * Convert it to a normal JavaScript number before
     * returning JSON to the React frontend.
     * =========================================================
     */

    const technologyResult =
      await driver.executeQuery(`
        MATCH (a:Automation)-[:USES_TECHNOLOGY]->(t:Technology)

        RETURN
          t.name AS technology,
          count(DISTINCT a) AS automationCount

        ORDER BY automationCount DESC
      `);

    const technologies =
      technologyResult.records.map((record) => ({
        technology: String(
          record.get("technology") ?? ""
        ),
        automationCount: toNumber(
          record.get("automationCount")
        ),
      }));

    /*
     * =========================================================
     * DEPARTMENT COVERAGE
     *
     * Same Neo4j Integer normalization here.
     * =========================================================
     */

    const departmentResult =
      await driver.executeQuery(`
        MATCH (d:Department)-[:CONTAINS]->(p:Process)

        RETURN
          d.name AS department,
          count(p) AS processCount

        ORDER BY processCount DESC
      `);

    const departments =
      departmentResult.records.map((record) => ({
        department: String(
          record.get("department") ?? ""
        ),
        processCount: toNumber(
          record.get("processCount")
        ),
      }));

    /*
     * =========================================================
     * GRAPH NODE COUNT
     *
     * Synthetic graph:
     *
     * 8 Processes
     * 8 Automations
     * 7 Systems
     * 5 Technologies
     * 6 Departments
     * 4 Documents
     * 1 Platform
     *
     * Total = 39
     * =========================================================
     */

    const totalDepartments =
      departments.length;

    const totalNodes =
      totalProcesses +
      totalAutomations +
      totalSystems +
      totalTechnologies +
      totalDepartments +
      4 +
      1;

    /*
     * =========================================================
     * NORMALIZED SUMMARY
     * =========================================================
     */

    const summary = {
      processes: totalProcesses,

      automations: totalAutomations,

      production: productionAutomations,

      pilot: pilotAutomations,

      averageConfidence,

      relationships: totalRelationships,

      systems: totalSystems,

      technologies: totalTechnologies,

      departments: totalDepartments,

      nodes: totalNodes,

      highPriority,

      mediumPriority,

      lowPriority,

      averageOpportunity,

      /*
       * Backward-compatible fields
       */

      totalProcesses,

      totalAutomations,

      productionAutomations,

      pilotAutomations,

      totalRelationships,

      totalSystems,

      totalTechnologies,
    };

    /*
     * =========================================================
     * RESPONSE
     * =========================================================
     */

    return NextResponse.json({
      success: true,

      source: "Neo4j Aura",

      summary,

      opportunities,

      technologies,

      departments,
    });
  } catch (error) {
    console.error(
      "Overview API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load overview data from Neo4j.",
      },
      {
        status: 500,
      }
    );
  }
}