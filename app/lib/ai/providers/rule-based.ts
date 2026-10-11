import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types";

export class RuleBasedProvider implements AIProvider {
  name = "rule-based" as const;

  async generateResponse(
    request: AIRequest
  ): Promise<AIResponse> {
    const question = request.question.toLowerCase();

    let answer =
      "I can analyze the operational knowledge graph using the available process, automation, system, technology and dependency data.";

    if (
      question.includes("process") ||
      question.includes("processes")
    ) {
      answer =
        "The knowledge graph contains 8 synthetic operational processes connected to departments, automations, systems and dependencies.";
    } else if (
      question.includes("automation") ||
      question.includes("automations")
    ) {
      answer =
        "The knowledge graph contains 8 synthetic automations. They are connected to the operational processes they support and use a combination of AI, LLM, RPA and AI Agent technologies.";
    } else if (
      question.includes("system") ||
      question.includes("systems")
    ) {
      answer =
        "The knowledge graph contains 7 synthetic enterprise systems connected to the automations that use them.";
    } else if (
      question.includes("technology") ||
      question.includes("technologies")
    ) {
      answer =
        "The knowledge graph contains 5 technology entities, including LLM, RAG, RPA, AI Agent and Neo4j.";
    } else if (
      question.includes("dependency") ||
      question.includes("dependencies")
    ) {
      answer =
        "The knowledge graph contains process dependencies that can be used to identify operational impact and prioritize automation opportunities.";
    } else if (
      question.includes("opportunity") ||
      question.includes("opportunities")
    ) {
      answer =
        "Automation opportunities are evaluated using automation confidence, maturity, dependencies and system complexity.";
    } else if (
      question.includes("confidence")
    ) {
      answer =
        "Automation confidence represents the confidence associated with each synthetic automation. The current graph has an average automation confidence of 88%.";
    } else if (
      question.includes("neo4j") ||
      question.includes("knowledge graph")
    ) {
      answer =
        "The AI Operations Lab platform uses Neo4j Aura as the live knowledge graph. It currently contains 39 nodes and 72 relationships across processes, automations, systems, technologies, departments and documents.";
    }

    return {
      answer,
      provider: this.name,
    };
  }
}