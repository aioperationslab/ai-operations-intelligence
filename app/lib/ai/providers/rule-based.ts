import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types";

type GraphContext = {
  question?: string;
  responseType?: string;
  data?: Record<string, unknown>[];
  source?: string;
};

export class RuleBasedProvider implements AIProvider {
  name = "rule-based" as const;

  async generateResponse(
    request: AIRequest
  ): Promise<AIResponse> {
    const question = request.question.toLowerCase();

    let context: GraphContext = {};

    /*
     * ---------------------------------------------------------
     * PARSE RETRIEVED GRAPH CONTEXT
     * ---------------------------------------------------------
     */

    if (request.context) {
      try {
        context = JSON.parse(request.context) as GraphContext;
      } catch {
        context = {};
      }
    }

    const data = Array.isArray(context.data)
      ? context.data
      : [];

    const responseType = context.responseType ?? "overview";

    /*
     * ---------------------------------------------------------
     * DEFAULT RESPONSE
     * ---------------------------------------------------------
     */

    let answer =
      "I analyzed the available operational knowledge graph data.";

    /*
     * ---------------------------------------------------------
     * PROCESS QUESTIONS
     * ---------------------------------------------------------
     */

    if (responseType === "processes") {
      const processNames = data
        .map((item) => item.process)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      if (processNames.length > 0) {
        answer =
          `The knowledge graph contains ${processNames.length} processes: ` +
          `${processNames.join(", ")}.`;
      } else {
        answer =
          "No process records were found in the knowledge graph.";
      }
    }

    /*
     * ---------------------------------------------------------
     * AUTOMATION QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "automations") {
      const automationNames = data
        .map((item) => item.automation)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const confidenceValues = data
        .map((item) => item.confidence)
        .filter(
          (value): value is number =>
            typeof value === "number"
        );

      if (automationNames.length > 0) {
        const averageConfidence =
          confidenceValues.length > 0
            ? Math.round(
                confidenceValues.reduce(
                  (total, value) => total + value,
                  0
                ) / confidenceValues.length
              )
            : null;

        answer =
          `The knowledge graph contains ${automationNames.length} automations: ` +
          `${automationNames.join(", ")}.`;

        if (averageConfidence !== null) {
          answer +=
            ` The average automation confidence in the retrieved data is ${averageConfidence}%.`;
        }
      } else {
        answer =
          "No automation records were found in the knowledge graph.";
      }
    }

    /*
     * ---------------------------------------------------------
     * DEPENDENCY QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "dependencies") {
      const dependencies = data
        .map((item) => {
          const process = item.process;
          const dependsOn = item.dependsOn;

          if (
            typeof process !== "string" ||
            typeof dependsOn !== "string"
          ) {
            return null;
          }

          return `${process} depends on ${dependsOn}`;
        })
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      if (dependencies.length > 0) {
        answer =
          `The graph contains ${dependencies.length} process dependencies. ` +
          dependencies.join(". ") +
          ".";
      } else {
        answer =
          "No process dependency relationships were found.";
      }
    }

    /*
     * ---------------------------------------------------------
     * TECHNOLOGY QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "technologies") {
      const technologies = data
        .map((item) => item.technology)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const uniqueTechnologies = [
        ...new Set(technologies),
      ];

      if (uniqueTechnologies.length > 0) {
        answer =
          `The knowledge graph contains ${uniqueTechnologies.length} technologies connected to the retrieved automation data: ` +
          `${uniqueTechnologies.join(", ")}.`;
      } else {
        answer =
          "No technology relationships were found.";
      }
    }

    /*
     * ---------------------------------------------------------
     * SYSTEM QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "systems") {
      const systems = data
        .map((item) => item.system)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const uniqueSystems = [...new Set(systems)];

      if (uniqueSystems.length > 0) {
        answer =
          `The graph contains ${uniqueSystems.length} connected systems: ` +
          `${uniqueSystems.join(", ")}.`;
      } else {
        answer =
          "No system relationships were found.";
      }
    }

    /*
     * ---------------------------------------------------------
     * DEPARTMENT QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "departments") {
      const departments = data
        .map((item) => item.department)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const uniqueDepartments = [
        ...new Set(departments),
      ];

      if (uniqueDepartments.length > 0) {
        answer =
          `The knowledge graph contains ${uniqueDepartments.length} departments represented in the retrieved data: ` +
          `${uniqueDepartments.join(", ")}.`;
      } else {
        answer =
          "No department records were found.";
      }
    }

    /*
     * ---------------------------------------------------------
     * GENERAL / OVERVIEW QUESTIONS
     * ---------------------------------------------------------
     */

    else if (responseType === "overview") {
      const totalNodes = data.reduce((total, item) => {
        const count = item.count;

        return (
          total +
          (typeof count === "number" ? count : 0)
        );
      }, 0);

      if (totalNodes > 0) {
        answer =
          `I queried the live Neo4j knowledge graph. ` +
          `The retrieved graph summary contains ${totalNodes} nodes across the available entity types.`;
      } else {
        answer =
          "I queried the live Neo4j knowledge graph, but no graph summary data was returned.";
      }
    }

    /*
     * ---------------------------------------------------------
     * SPECIAL KEYWORD FALLBACKS
     * ---------------------------------------------------------
     */

    else if (
      question.includes("neo4j") ||
      question.includes("knowledge graph")
    ) {
      answer =
        "The AI Operations Lab platform uses Neo4j Aura as the live operational knowledge graph.";
    }

    return {
      answer,
      provider: this.name,
    };
  }
}