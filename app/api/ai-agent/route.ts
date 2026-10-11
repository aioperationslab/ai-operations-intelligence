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

    const context =
      await buildAIContext(question);

    const configuredProvider =
      DEFAULT_AI_PROVIDER;

    const provider =
      getAIProvider(configuredProvider);

    const aiResponse =
      await provider.generateResponse({
        question,
        context,
      });

    return NextResponse.json({
      success: true,
      question,

      responseType:
        context.responseType,

      answer:
        aiResponse.answer,

      provider:
        aiResponse.provider,

      configuredProvider,

      graphData:
        context.graph.records,

      documentData:
        context.documents.records,

      sources:
        context.sources,

      source:
        context.graph.source,

      metadata:
        context.metadata,
    });
  } catch (error) {
    console.error(
      "AI Agent error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "The AI Agent could not query the knowledge graph.",
      },
      { status: 500 }
    );
  }
}