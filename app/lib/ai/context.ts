import neo4j from "neo4j-driver";
import driver from "@/app/lib/neo4j";
import { retrieveDocuments } from "@/app/lib/ai/retrieval";
import {
  calculateOpportunityScore,
  type AutomationMaturity,
} from "@/app/lib/scoring";

export type AIContextSource = {
  type: "graph" | "document";
  name: string;
  description?: string;
};

export type AIContextDocument = {
  id: string;
  title: string;
  content: string;
  source: string;
  score?: number;
};

export type AIContextResult = {
  question: string;
  responseType: string;

  graph: {
    records: Record<string, unknown>[];
    source: string;
  };

  documents: {
    records: AIContextDocument[];
    source: string;
  };

  sources: AIContextSource[];

  metadata: {
    graphRecordCount: number;
    documentCount: number;
    routingIntent: string;
  };
};

type RoutingIntent =
  | "opportunities"
  | "dependencies"
  | "automations"
  | "technologies"
  | "systems"
  | "departments"
  | "processes"
  | "overview";

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

function toNumber(value: unknown): number {
  if (typeof value === "number") {
    return value;
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

function detectIntent(question: string): RoutingIntent {
  const normalizedQuestion = question.toLowerCase();

  /*
   * Opportunity intent must be checked before generic
   * automation/process intent.
   */
  if (
    normalizedQuestion.includes("opportunit") ||
    normalizedQuestion.includes("automate next") ||
    normalizedQuestion.includes("automate") ||
    normalizedQuestion.includes("improve next") ||
    normalizedQuestion.includes("priority") ||
    normalizedQuestion.includes("priorit") ||
    normalizedQuestion.includes("best process") ||
    normalizedQuestion.includes("next process")
  ) {
    return "opportunities";
  }

  if (
    normalizedQuestion.includes("dependenc") ||
    normalizedQuestion.includes("depends") ||
    normalizedQuestion.includes("impact") ||
    normalizedQuestion.includes("connected")
  ) {
    return "dependencies";
  }

  if (
    normalizedQuestion.includes("automation") ||
    normalizedQuestion.includes("automations")
  ) {
    return "automations";
  }

  if (
    normalizedQuestion.includes("technology") ||
    normalizedQuestion.includes("technologies") ||
    normalizedQuestion.includes("tech")
  ) {
    return "technologies";
  }

  if (
    normalizedQuestion.includes("system") ||
    normalizedQuestion.includes("systems")
  ) {
    return "systems";
  }

  if (
    normalizedQuestion.includes("department") ||
    normalizedQuestion.includes("departments")
  ) {
    return "departments";
  }

  if (
    normalizedQuestion.includes("process") ||
    normalizedQuestion.includes("processes")
  ) {
    return "processes";
  }

  return "overview";
}

export async function buildAIContext(
  question: string
): Promise<AIContextResult> {
  const routingIntent = detectIntent(question);

  let query = "";
  let responseType = routingIntent;

  if (routingIntent === "opportunities") {
    /*
     * Retrieve the exact same inputs used by
     * /api/opportunities.
     *
     * This ensures the AI Agent and Automation Opportunities
     * dashboard use the same canonical scoring engine inputs.
     */
    query = `
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
    `;
  } else if (routingIntent === "dependencies") {
    query = `
      MATCH (p1:Process)-[:DEPENDS_ON]->(p2:Process)
      OPTIONAL MATCH (d:Department)-[:CONTAINS]->(p1)
      RETURN
        p1.name AS process,
        p2.name AS dependsOn,
        d.name AS department
      ORDER BY p1.name
    `;
  } else if (routingIntent === "automations") {
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
  } else if (routingIntent === "technologies") {
    query = `
      MATCH (a:Automation)-[:USES_TECHNOLOGY]->(t:Technology)
      OPTIONAL MATCH (p:Process)-[:AUTOMATED_BY]->(a)
      RETURN
        t.name AS technology,
        collect(DISTINCT a.name) AS automations,
        collect(DISTINCT p.name) AS processes
      ORDER BY t.name
    `;
  } else if (routingIntent === "systems") {
    query = `
      MATCH (a:Automation)-[:USES_SYSTEM]->(s:System)
      OPTIONAL MATCH (p:Process)-[:AUTOMATED_BY]->(a)
      RETURN
        s.name AS system,
        collect(DISTINCT a.name) AS automations,
        collect(DISTINCT p.name) AS processes
      ORDER BY s.name
    `;
  } else if (routingIntent === "departments") {
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
  } else if (routingIntent === "processes") {
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
  } else {
    query = `
      MATCH (n)
      WITH labels(n)[0] AS nodeType, count(n) AS count
      RETURN
        nodeType,
        count
      ORDER BY nodeType
    `;
  }

  const result = await driver.executeQuery(query);

  let graphRecords = result.records.map((record) => {
    const rawData = record.toObject();

    return normalizeNeo4jValue(rawData) as Record<
      string,
      unknown
    >;
  });

  /*
   * Apply the canonical opportunity scoring engine using
   * exactly the same inputs as /api/opportunities.
   */
  if (routingIntent === "opportunities") {
    graphRecords = graphRecords
      .map((record) => {
        const confidence = toNumber(record.confidence);

        const systems = Array.isArray(record.systems)
          ? record.systems
          : [];

        const dependencies = Array.isArray(
          record.dependencies
        )
          ? record.dependencies
          : [];

        const maturity =
          normalizeMaturity(record.maturity);

        const scoring = calculateOpportunityScore({
          confidence,
          maturity,
          systems: systems.length,
          dependencies: dependencies.length,
        });

        return {
          ...record,
          confidence,
          maturity,
          systemCount: systems.length,
          dependencyCount: dependencies.length,
          opportunityScore: scoring.score,
          priority: scoring.priority,
        };
      })
      .sort(
        (a, b) =>
          Number(b.opportunityScore ?? 0) -
          Number(a.opportunityScore ?? 0)
      );
  }

  const retrievalResult =
    await retrieveDocuments(question);

  const documentRecords =
    retrievalResult.documents.map(
      (document) => ({
        id: document.id,
        title: document.title,
        content: document.content,
        source: document.source,
        score: document.score,
      })
    );

  const sources: AIContextSource[] = [
    {
      type: "graph",
      name: "Neo4j Aura",
      description:
        "Live operational knowledge graph containing processes, automations, systems, technologies and relationships.",
    },
  ];

  if (documentRecords.length > 0) {
    sources.push({
      type: "document",
      name: "Document Retrieval",
      description:
        "Relevant synthetic operational documents retrieved using keyword relevance scoring.",
    });
  }

  return {
    question,
    responseType,

    graph: {
      records: graphRecords,
      source: "Neo4j Aura",
    },

    documents: {
      records: documentRecords,
      source: "Neo4j Aura",
    },

    sources,

    metadata: {
      graphRecordCount: graphRecords.length,
      documentCount: documentRecords.length,
      routingIntent,
    },
  };
}