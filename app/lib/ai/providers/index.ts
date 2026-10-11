import type {
  AIProvider,
  AIProviderName,
} from "./types";

import { RuleBasedProvider } from "./rule-based";

const ruleBasedProvider = new RuleBasedProvider();

export function getAIProvider(
  provider: AIProviderName = "rule-based"
): AIProvider {
  switch (provider) {
    case "rule-based":
      return ruleBasedProvider;

    case "openai":
      throw new Error(
        "OpenAI provider is not enabled yet."
      );

    case "anthropic":
      throw new Error(
        "Anthropic provider is not enabled yet."
      );

    default:
      return ruleBasedProvider;
  }
}