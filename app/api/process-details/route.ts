import { NextResponse } from "next/server";
import driver from "@/app/lib/neo4j";

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);
  const processId = searchParams.get("id");

  if (!processId) {
    return NextResponse.json(
      {
        success: false,
        message: "Process ID is required",
      },
      { status: 400 }
    );
  }

  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (d:Department)-[:CONTAINS]->(p:Process {id: $processId})
      OPTIONAL MATCH (p)-[:AUTOMATED_BY]->(a:Automation)
      OPTIONAL MATCH (a)-[:USES_SYSTEM]->(s:System)
      OPTIONAL MATCH (a)-[:USES_TECHNOLOGY]->(t:Technology)
      OPTIONAL MATCH (p)-[:DEPENDS_ON]->(dependency:Process)

      RETURN
        p.id AS processId,
        p.name AS processName,

        d.id AS departmentId,
        d.name AS departmentName,

        a.id AS automationId,
        a.name AS automationName,

        collect(DISTINCT {
          id: s.id,
          name: s.name
        }) AS systems,

        collect(DISTINCT {
          id: t.id,
          name: t.name
        }) AS technologies,

        collect(DISTINCT {
          id: dependency.id,
          name: dependency.name
        }) AS dependencies
      `,
      { processId }
    );

    if (result.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Process not found",
        },
        { status: 404 }
      );
    }

    const record = result.records[0];

    return NextResponse.json({
      success: true,
      data: {
        processId: record.get("processId"),
        processName: record.get("processName"),

        department: {
          id: record.get("departmentId"),
          name: record.get("departmentName"),
        },

        automation: {
          id: record.get("automationId"),
          name: record.get("automationName"),
        },

        systems: record.get("systems"),
        technologies: record.get("technologies"),
        dependencies: record.get("dependencies"),
      },
    });
  } catch (error) {
    console.error("Process details error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to retrieve process details",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}