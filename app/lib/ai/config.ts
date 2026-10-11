import type { AIProviderName } from "./providers/types";

const validProviders: AIProviderName[] = [
  "rule-based",
  "openai",
  "anthropic",
];

function resolveAIProvider(): AIProviderName {
  const configuredProvider =
    process.env.AI_PROVIDER?.trim().toLowerCase();

  if (
    configuredProvider &&
    validProviders.includes(
      configuredProvider as AIProviderName
    )
  ) {
    return configuredProvider as AIProviderName;
  }

  return "rule-based";
}

export const DEFAULT_AI_PROVIDER =
  resolveAIProvider();

export const AI_PROVIDER_OPTIONS: AIProviderName[] = [
  "rule-based",
  "openai",
  "anthropic",
];