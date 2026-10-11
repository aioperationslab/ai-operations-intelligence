import { NextResponse } from "next/server";
import { buildAIContext } from "@/app/lib/ai/context";
import { getAIProvider } from "@/app/lib/ai/providers";
import { DEFAULT_AI_PROVIDER } from "@/app/lib/ai/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a question.",
        },
        { status: 400 }
      );
    }

    /*
     * ---------------------------------------------------------
     * 1. BUILD CONTEXT FROM NEO4J
     * ---------------------------------------------------------
     */

    const context = await buildAIContext(question);

    /*
     * ---------------------------------------------------------
     * 2. SELECT CONFIGURED AI PROVIDER
     * ---------------------------------------------------------
     *
     * Currently:
     * AI_PROVIDER=rule-based
     *
     * OpenAI and Anthropic remain disabled.
     * ---------------------------------------------------------
     */

    const provider = getAIProvider(DEFAULT_AI_PROVIDER);

    /*
     * ---------------------------------------------------------
     * 3. GENERATE RESPONSE
     * ---------------------------------------------------------
     */

    const aiResponse = await provider.generateResponse({
      question,
      context: JSON.stringify(context, null, 2),
    });

    /*
     * ---------------------------------------------------------
     * 4. RETURN RESPONSE
     * ---------------------------------------------------------
     */

    return NextResponse.json({
      success: true,
      question,
      responseType: context.responseType,
      answer: aiResponse.answer,
      provider: aiResponse.provider,
      data: context.data,
      source: context.source,
    });
  } catch (error) {
    console.error("AI Agent error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "The AI Agent could not query the knowledge graph.",
      },
      { status: 500 }
    );
  }
}