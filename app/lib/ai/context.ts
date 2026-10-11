import neo4j from "neo4j-driver";
import driver from "@/app/lib/neo4j";

export type AIContextSource = {
  type: "graph" | "document";
  name: string;
  description?: string;
};

export type AIContextResult = {
  question: string;
  responseType: string;

  /*
   * Live operational knowledge retrieved from Neo4j.
   */
  graphData: Record<string, unknown>[];

  /*
   * Reserved for future RAG document retrieval.
   *
   * Currently empty because document retrieval has not
   * been implemented yet.
   */
  documentData: Record<string, unknown>[];

  /*
   * Sources used to build the context.
   */
  sources: AIContextSource[];

  source: "Neo4j Aura";
};

/*
 * ---------------------------------------------------------
 * NORMALIZE NEO4J VALUES
 * ---------------------------------------------------------
 */

function normalizeNeo4jValue(value: unknown): unknown {
  if (neo4j.isInt(value)) {
    return value.toNumber();
  }

  if (Array.isArray(value)) {
    return value.map(normalizeNeo4jValue);
  }

  if (value !== null && typeof value === "object") {
    const normalized: Record<string, unknown> = {};

    for (const [key, nestedValue] of Object.entries(
      value as Record<string, unknown>
    )) {
      normalized[key] = normalizeNeo4jValue(nestedValue);
    }

    return normalized;
  }

  return value;
}

/*
 * ---------------------------------------------------------
 * BUILD AI CONTEXT
 * ---------------------------------------------------------
 *
 * Current architecture:
 *
 * Neo4j
 *   ↓
 * Graph Context
 *   ↓
 * AI Provider
 *
 * Future architecture:
 *
 * Neo4j + Documents
 *   ↓
 * Retrieval / RAG
 *   ↓
 * Unified AI Context
 *   ↓
 * AI Provider
 * ---------------------------------------------------------
 */

export async function buildAIContext(
  question: string
): Promise<AIContextResult> {
  const normalizedQuestion = question.toLowerCase();

  let query = "";
  let responseType = "overview";

  /*
   * ---------------------------------------------------------
   * 1. DEPENDENCY QUESTIONS
   * ---------------------------------------------------------
   *
   * This must come BEFORE process questions because questions
   * such as "What are the process dependencies?" contain
   * both "process" and "dependency".
   * ---------------------------------------------------------
   */

  if (
    normalizedQuestion.includes("dependenc") ||
    normalizedQuestion.includes("depends") ||
    normalizedQuestion.includes("impact") ||
    normalizedQuestion.includes("connected")
  ) {
    responseType = "dependencies";

    query = `
      MATCH (p1:Process)-[:DEPENDS_ON]->(p2:Process)
      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p1)
      RETURN
        p1.name AS process,
        p2.name AS dependsOn,
        d.name AS department
      ORDER BY p1.name
    `;
  }

  /*
   * ---------------------------------------------------------
   * 2. AUTOMATION QUESTIONS
   * ---------------------------------------------------------
   */

  else if (
    normalizedQuestion.includes("automation") ||
    normalizedQuestion.includes("automations")
  ) {
    responseType = "automations";

    query = `
      MATCH (a:Automation)
      OPTIONAL MATCH (p:Process)-[:AUTOMATED_BY]->(a)
      OPTIONAL MATCH (a)-[:USES_TECHNOLOGY]->(t:Technology)
      RETURN
        a.id AS automationId,
        a.name AS automation,
        a.type AS automationType,
        a.status AS status,
        a.confidence AS confidence,
        collect(DISTINCT p.name) AS processes,
        collect(DISTINCT t.name) AS technologies
      ORDER BY a.confidence DESC
    `;
  }

  /*
   * ---------------------------------------------------------
   * 3. TECHNOLOGY QUESTIONS
   * ---------------------------------------------------------
   */

  else if (
    normalizedQuestion.includes("technology") ||
    normalizedQuestion.includes("technologies") ||
    normalizedQuestion.includes("tech")
  ) {
    responseType = "technologies";

    query = `
      MATCH (a:Automation)-[:USES_TECHNOLOGY]->(t:Technology)
      OPTIONAL MATCH (p:Process)-[:AUTOMATED_BY]->(a)
      RETURN
        t.name AS technology,
        collect(DISTINCT a.name) AS automations,
        collect(DISTINCT p.name) AS processes
      ORDER BY t.name
    `;
  }

  /*
   * ---------------------------------------------------------
   * 4. SYSTEM QUESTIONS
   * ---------------------------------------------------------
   */

  else if (
    normalizedQuestion.includes("system") ||
    normalizedQuestion.includes("systems")
  ) {
    responseType = "systems";

    query = `
      MATCH (a:Automation)-[:USES_SYSTEM]->(s:System)
      OPTIONAL MATCH (p:Process)-[:AUTOMATED_BY]->(a)
      RETURN
        s.name AS system,
        collect(DISTINCT a.name) AS automations,
        collect(DISTINCT p.name) AS processes
      ORDER BY s.name
    `;
  }

  /*
   * ---------------------------------------------------------
   * 5. DEPARTMENT QUESTIONS
   * ---------------------------------------------------------
   */

  else if (
    normalizedQuestion.includes("department") ||
    normalizedQuestion.includes("departments")
  ) {
    responseType = "departments";

    query = `
      MATCH (d:Department)
      OPTIONAL MATCH (d)-[:CONTAINS]->(p:Process)
      OPTIONAL MATCH (d)-[:OWNS]->(a:Automation)
      RETURN
        d.name AS department,
        collect(DISTINCT p.name) AS processes,
        collect(DISTINCT a.name) AS automations
      ORDER BY d.name
    `;
  }

  /*
   * ---------------------------------------------------------
   * 6. PROCESS QUESTIONS
   * ---------------------------------------------------------
   */

  else if (
    normalizedQuestion.includes("process") ||
    normalizedQuestion.includes("processes")
  ) {
    responseType = "processes";

    query = `
      MATCH (p:Process)
      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p)
      OPTIONAL MATCH (p)-[:AUTOMATED_BY]->(a:Automation)
      RETURN
        p.id AS processId,
        p.name AS process,
        d.name AS department,
        a.name AS automation
      ORDER BY p.name
    `;
  }

  /*
   * ---------------------------------------------------------
   * 7. GENERAL GRAPH OVERVIEW
   * ---------------------------------------------------------
   */

  else {
    responseType = "overview";

    query = `
      MATCH (n)
      WITH labels(n)[0] AS nodeType, count(n) AS count
      RETURN
        nodeType,
        count
      ORDER BY nodeType
    `;
  }

  /*
   * ---------------------------------------------------------
   * QUERY NEO4J
   * ---------------------------------------------------------
   */

  const result = await driver.executeQuery(query);

  /*
   * ---------------------------------------------------------
   * NORMALIZE NEO4J DATA
   * ---------------------------------------------------------
   */

  const graphData = result.records.map((record) => {
    const rawData = record.toObject();

    return normalizeNeo4jValue(
      rawData
    ) as Record<string, unknown>;
  });

  /*
   * ---------------------------------------------------------
   * DOCUMENT CONTEXT
   * ---------------------------------------------------------
   *
   * RAG is intentionally not active yet.
   * This array will later contain retrieved document chunks.
   * ---------------------------------------------------------
   */

  const documentData: Record<string, unknown>[] = [];

  /*
   * ---------------------------------------------------------
   * CONTEXT SOURCES
   * ---------------------------------------------------------
   */

  const sources: AIContextSource[] = [
    {
      type: "graph",
      name: "Neo4j Aura",
      description:
        "Live operational knowledge graph containing processes, automations, systems, technologies and relationships.",
    },
  ];

  /*
   * ---------------------------------------------------------
   * RETURN UNIFIED AI CONTEXT
   * ---------------------------------------------------------
   */

  return {
    question,
    responseType,
    graphData,
    documentData,
    sources,
    source: "Neo4j Aura",
  };
}