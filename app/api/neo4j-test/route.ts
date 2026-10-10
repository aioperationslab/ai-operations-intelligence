import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";

export async function GET() {
  try {
    const result = await driver.executeQuery(`
      MATCH (n)
      RETURN labels(n) AS labels, count(n) AS count
      ORDER BY labels(n)
    `);

    const data = result.records.map((record) => ({
      labels: record.get("labels"),
      count: record.get("count").toNumber(),
    }));

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Neo4j query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Neo4j query failed",
      },
      { status: 500 }
    );
  }
}