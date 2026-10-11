import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types";

export class RuleBasedProvider
  implements AIProvider
{
  name = "rule-based" as const;

  async generateResponse(
    request: AIRequest
  ): Promise<AIResponse> {
    const question =
      request.question.toLowerCase();

    const context = request.context;

    const graphData =
      context.graph.records;

    const documentData =
      context.documents.records;

    const responseType =
      context.responseType;

    let answer =
      "I analyzed the available operational knowledge graph data.";

    if (responseType === "processes") {
      const processNames = graphData
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
    } else if (
      responseType === "automations"
    ) {
      const automationNames = graphData
        .map((item) => item.automation)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const confidenceValues = graphData
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
                  (total, value) =>
                    total + value,
                  0
                ) /
                  confidenceValues.length
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
    } else if (
      responseType === "dependencies"
    ) {
      const dependencies = graphData
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
    } else if (
      responseType === "technologies"
    ) {
      const technologies = graphData
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
    } else if (
      responseType === "systems"
    ) {
      const systems = graphData
        .map((item) => item.system)
        .filter(
          (value): value is string =>
            typeof value === "string"
        );

      const uniqueSystems = [
        ...new Set(systems),
      ];

      if (uniqueSystems.length > 0) {
        answer =
          `The graph contains ${uniqueSystems.length} connected systems: ` +
          `${uniqueSystems.join(", ")}.`;
      } else {
        answer =
          "No system relationships were found.";
      }
    } else if (
      responseType === "departments"
    ) {
      const departments = graphData
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
    } else if (
      responseType === "overview"
    ) {
      if (documentData.length > 0) {
        const topDocument =
          documentData[0];

        const title =
          typeof topDocument.title ===
          "string"
            ? topDocument.title
            : "Retrieved document";

        const content =
          typeof topDocument.content ===
          "string"
            ? topDocument.content
            : "";

        if (content) {
          answer =
            `Based on the retrieved document "${title}", ${content}`;
        } else {
          answer =
            `I found the relevant document "${title}", but it does not contain readable content.`;
        }
      } else {
        const totalNodes =
          graphData.reduce(
            (total, item) => {
              const count = item.count;

              return (
                total +
                (typeof count === "number"
                  ? count
                  : 0)
              );
            },
            0
          );

        if (totalNodes > 0) {
          answer =
            `I queried the live Neo4j knowledge graph. ` +
            `The retrieved graph summary contains ${totalNodes} nodes across the available entity types.`;
        } else {
          answer =
            "I queried the live Neo4j knowledge graph, but no graph summary data was returned.";
        }
      }
    } else if (
      question.includes("neo4j") ||
      question.includes("knowledge graph")
    ) {
      answer =
        "The AI Operations Lab platform uses Neo4j Aura as the live operational knowledge graph.";
    }

    if (
      documentData.length > 0 &&
      responseType !== "overview"
    ) {
      answer +=
        ` Additional document context was retrieved from ${documentData.length} document record${
          documentData.length === 1
            ? ""
            : "s"
        }.`;
    }

    return {
      answer,
      provider: this.name,
    };
  }
}