import SubmitPrompt from "@/utilities/api_call";
import { UnEscapeJSONstring } from "@/utilities/unescapeJsonstring";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const response = await SubmitPrompt(prompt);
  const unEscapedData = UnEscapeJSONstring(
    response.candidates[0].content.parts[0].text
  );

  return NextResponse.json(unEscapedData);
}
