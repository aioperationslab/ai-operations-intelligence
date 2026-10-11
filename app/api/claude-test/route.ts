import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

export async function GET() {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "ANTHROPIC_API_KEY is missing.",
        },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-5-5",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Reply with exactly: Claude connection successful.",
        },
      ],
    });

    const text =
      message.content[0]?.type === "text"
        ? message.content[0].text
        : "Claude responded successfully.";

    return NextResponse.json({
      success: true,
      message: text,
      model: message.model,
    });
  } catch (error: any) {
    console.error("Claude API test error:", error);

    return NextResponse.json(
      {
        success: false,
        status: error?.status ?? null,
        errorType: error?.error?.type ?? null,
        message: error?.message ?? "Unknown Claude API error",
        requestId: error?.requestID ?? null,
      },
      { status: 500 }
    );
  }
}