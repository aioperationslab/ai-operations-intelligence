import type {
  AIProvider,
  AIRequest,
  AIResponse,
} from "./types";

export class AnthropicProvider implements AIProvider {
  name = "anthropic" as const;

  async generateResponse(
    request: AIRequest
  ): Promise<AIResponse> {
    /*
     * Anthropic integration is intentionally disabled for now.
     *
     * The provider is registered architecturally, but no
     * Anthropic API request will be made until we explicitly
     * enable and configure it.
     */

    void request;

    throw new Error(
      "Anthropic provider is not enabled yet."
    );
  }
}