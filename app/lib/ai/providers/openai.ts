import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types";

export class OpenAIProvider implements AIProvider {
  name = "openai" as const;

  async generateResponse(
    request: AIRequest
  ): Promise<AIResponse> {
    /*
     * OpenAI integration is intentionally disabled for now.
     *
     * The provider is registered architecturally, but no
     * OpenAI API request will be made until we explicitly
     * enable and configure it.
     */

    void request;

    throw new Error(
      "OpenAI provider is not enabled yet."
    );
  }
}