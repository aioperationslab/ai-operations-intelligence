export type AIProviderName = "rule-based" | "openai" | "anthropic";

export type AIRequest = {
  question: string;
  context?: string;
};

export type AIResponse = {
  answer: string;
  provider: AIProviderName;
};

export interface AIProvider {
  name: AIProviderName;

  generateResponse(request: AIRequest): Promise<AIResponse>;
}