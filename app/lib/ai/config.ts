import type { AIProviderName } from "./providers/types";

const configuredProvider =
  process.env.AI_PROVIDER?.toLowerCase();

const validProviders: AIProviderName[] = [
  "rule-based",
  "openai",
  "anthropic",
];

export const DEFAULT_AI_PROVIDER: AIProviderName =
  configuredProvider &&
  validProviders.includes(configuredProvider as AIProviderName)
    ? (configuredProvider as AIProviderName)
    : "rule-based";