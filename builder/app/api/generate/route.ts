import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Groq AI is not configured yet. Add GROQ_API_KEY to the Vercel project environment variables, then redeploy." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const instruction = typeof body.instruction === "string" ? body.instruction.trim() : "";
    const existing = typeof body.existing === "string" ? body.existing : "";

    if (!instruction || instruction.length > 12000 || existing.length > 65000) {
      return NextResponse.json({ error: "Please provide a valid brief (maximum 12,000 characters)." }, { status: 400 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: "You are an expert web designer and frontend developer. Return a complete standalone HTML document only. Do not include markdown fences. Never add fake testimonials, false claims, or invented contact details.",
          },
          {
            role: "user",
            content: instruction + (existing ? "\n\nCURRENT WEBSITE HTML (edit this and preserve unrelated features):\n" + existing : ""),
          },
        ],
        temperature: 0.7,
        max_completion_tokens: 8192,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      const message = data?.error?.message || "Groq API request failed.";
      return NextResponse.json({ error: message }, { status: response.status >= 400 && response.status < 600 ? response.status : 502 });
    }

    const html = data?.choices?.[0]?.message?.content;
    if (typeof html !== "string" || !html.trim()) {
      return NextResponse.json({ error: "Groq returned an empty response. Please try again." }, { status: 502 });
    }
    return NextResponse.json({ html: html.trim() });
  } catch {
    return NextResponse.json({ error: "Could not generate the website. Please try again." }, { status: 500 });
  }
}
