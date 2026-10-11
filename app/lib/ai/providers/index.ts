import type {
  AIProvider,
  AIProviderName,
} from "./types";

import { DEFAULT_AI_PROVIDER } from "../config";
import { AnthropicProvider } from "./anthropic";
import { OpenAIProvider } from "./openai";
import { RuleBasedProvider } from "./rule-based";

const ruleBasedProvider = new RuleBasedProvider();
const openAIProvider = new OpenAIProvider();
const anthropicProvider = new AnthropicProvider();

export function getAIProvider(
  provider: AIProviderName = DEFAULT_AI_PROVIDER
): AIProvider {
  switch (provider) {
    case "rule-based":
      return ruleBasedProvider;

    case "openai":
      return openAIProvider;

    case "anthropic":
      return anthropicProvider;

    default:
      return ruleBasedProvider;
  }
}