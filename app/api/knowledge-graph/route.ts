import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";

export async function GET() {
  try {
    const result = await driver.executeQuery(`
      MATCH (n)
      WITH labels(n)[0] AS type, count(n) AS count
      RETURN type, count
      ORDER BY type
    `);

    const counts: Record<string, number> = {};

    for (const record of result.records) {
      counts[record.get("type")] = record.get("count").toNumber();
    }

    return NextResponse.json({
      success: true,
      kpis: {
        processes: counts.Process ?? 0,
        automations: counts.Automation ?? 0,
        systems: counts.System ?? 0,
        departments: counts.Department ?? 0,
      },
    });
  } catch (error) {
    console.error("Knowledge graph query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load knowledge graph data",
      },
      { status: 500 }
    );
  }
}