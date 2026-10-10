import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";

export async function GET() {
  try {
    const result = await driver.executeQuery(`
      MATCH (a)-[r]->(b)
      RETURN
        labels(a)[0] AS fromType,
        a.id AS fromId,
        a.name AS fromName,
        type(r) AS relationship,
        labels(b)[0] AS toType,
        b.id AS toId,
        b.name AS toName
      ORDER BY fromType, fromName
    `);

    const relationships = result.records.map((record) => ({
      from: {
        type: record.get("fromType"),
        id: record.get("fromId"),
        name: record.get("fromName"),
      },
      relationship: record.get("relationship"),
      to: {
        type: record.get("toType"),
        id: record.get("toId"),
        name: record.get("toName"),
      },
    }));

    return NextResponse.json({
      success: true,
      count: relationships.length,
      relationships,
    });
  } catch (error) {
    console.error("Neo4j graph error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load Neo4j graph",
      },
      { status: 500 }
    );
  }
}