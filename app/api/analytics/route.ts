import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";

export async function GET() {
  try {
    const result = await driver.executeQuery(`
      MATCH (p:Process)
      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p)
      OPTIONAL MATCH (p)-[:AUTOMATED_BY]->(a:Automation)
      OPTIONAL MATCH (a)-[:USES_SYSTEM]->(s:System)
      OPTIONAL MATCH (a)-[:USES_TECHNOLOGY]->(t:Technology)

      WITH
        p,
        d,
        a,
        collect(DISTINCT s.name) AS systems,
        collect(DISTINCT t.name) AS technologies

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
        technologies

      ORDER BY p.name
    `);

    const processes = result.records.map((record) => ({
      processId: record.get("processId"),
      process: record.get("process"),
      department: record.get("department"),
      automationId: record.get("automationId"),
      automation: record.get("automation"),
      automationType: record.get("automationType"),
      maturity: record.get("maturity"),
      confidence: Number(record.get("confidence") ?? 0),
      systems: record.get("systems") ?? [],
      technologies: record.get("technologies") ?? [],
    }));

    const totalProcesses = processes.length;

    const productionAutomations = processes.filter(
      (item) => item.maturity === "Production"
    ).length;

    const pilotAutomations = processes.filter(
      (item) => item.maturity === "Pilot"
    ).length;

    const averageConfidence =
      totalProcesses > 0
        ? Math.round(
            processes.reduce((sum, item) => sum + item.confidence, 0) /
              totalProcesses
          )
        : 0;

    const departmentMap = new Map<string, number>();

    processes.forEach((item) => {
      departmentMap.set(
        item.department,
        (departmentMap.get(item.department) ?? 0) + 1
      );
    });

    const departments = Array.from(departmentMap.entries())
      .map(([department, count]) => ({
        department,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    const technologyMap = new Map<string, number>();

    processes.forEach((item) => {
      item.technologies.forEach((technology: string) => {
        technologyMap.set(
          technology,
          (technologyMap.get(technology) ?? 0) + 1
        );
      });
    });

    const technologies = Array.from(technologyMap.entries())
      .map(([technology, count]) => ({
        technology,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      success: true,
      source: "Neo4j Aura",
      summary: {
        totalProcesses,
        productionAutomations,
        pilotAutomations,
        averageConfidence,
      },
      departments,
      technologies,
      processes,
    });
  } catch (error) {
    console.error("Analytics API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load analytics from Neo4j.",
      },
      { status: 500 }
    );
  }
}