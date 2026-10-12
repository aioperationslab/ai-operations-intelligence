import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: false,
    enabled: false,
    message:
      "Claude API testing is currently disabled. No Anthropic API call was made.",
  });
}