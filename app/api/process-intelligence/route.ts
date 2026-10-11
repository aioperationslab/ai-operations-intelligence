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
      MATCH (department:Department)-[:CONTAINS]->(process:Process)
      MATCH (process)-[:AUTOMATED_BY]->(automation:Automation)

      OPTIONAL MATCH (automation)-[:USES_SYSTEM]->(system:System)

      WITH
        department,
        process,
        automation,
        count(DISTINCT system) AS systemCount

      OPTIONAL MATCH (process)-[:DEPENDS_ON]->(dependency:Process)

      WITH
        department,
        process,
        automation,
        systemCount,
        count(DISTINCT dependency) AS dependencyCount

      RETURN
        process.id AS processId,
        process.name AS processName,
        department.name AS departmentName,

        automation.id AS automationId,
        automation.name AS automationName,
        automation.maturity AS maturity,
        automation.confidence AS confidence,

        systemCount,
        dependencyCount

      ORDER BY process.name
    `);

    const processes = result.records.map((record) => {
      const confidence = toNumber(record.get("confidence"));
      const systems = toNumber(record.get("systemCount"));
      const dependencies = toNumber(record.get("dependencyCount"));

      /*
       * IMPORTANT:
       * Keep maturity as the original business value:
       * "Production" / "Pilot".
       *
       * Do NOT replace this with the numerical maturity score.
       */
      const maturity = normalizeMaturity(record.get("maturity"));

      const opportunity = calculateOpportunityScore({
        confidence,
        maturity,
        systems,
        dependencies,
      });

      return {
        processId: String(record.get("processId") ?? ""),
        processName: String(record.get("processName") ?? ""),
        departmentName: String(record.get("departmentName") ?? ""),

        automationId: String(record.get("automationId") ?? ""),
        automationName: String(record.get("automationName") ?? ""),

        /*
         * This is intentionally a string.
         */
        maturity,

        confidence,
        systems,
        dependencies,

        opportunityScore: opportunity.score,
        priority: opportunity.priority,
      };
    });

    const productionCount = processes.filter(
      (process) => process.maturity === "Production"
    ).length;

    const pilotCount = processes.filter(
      (process) => process.maturity === "Pilot"
    ).length;

    const averageConfidence =
      processes.length > 0
        ? Math.round(
            processes.reduce(
              (sum, process) => sum + process.confidence,
              0
            ) / processes.length
          )
        : 0;

    const averageOpportunity =
      processes.length > 0
        ? Math.round(
            processes.reduce(
              (sum, process) => sum + process.opportunityScore,
              0
            ) / processes.length
          )
        : 0;

    const highPriorityCount = processes.filter(
      (process) => process.priority === "High"
    ).length;

    const mediumPriorityCount = processes.filter(
      (process) => process.priority === "Medium"
    ).length;

    const lowPriorityCount = processes.filter(
      (process) => process.priority === "Low"
    ).length;

    return NextResponse.json({
      success: true,

      summary: {
        processes: processes.length,
        production: productionCount,
        pilot: pilotCount,
        averageConfidence,
        highPriority: highPriorityCount,
        mediumPriority: mediumPriorityCount,
        lowPriority: lowPriorityCount,
        averageOpportunity,
      },

      processes,
    });
  } catch (error) {
    console.error("Process Intelligence API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load Process Intelligence data.",
      },
      {
        status: 500,
      }
    );
  }
}