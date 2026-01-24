import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const message = String(body.message || "").trim();

  if (!message) {
    return NextResponse.json({ error: "Missing message" }, { status: 400 });
  }

  const reply =
    "Thanks for sharing. A gentle next step is to focus on rest, hydration, and one small support action today. If anything feels urgent or worrying, reach out to a healthcare professional for personalized care.";
  const disclaimer =
    "This chat provides general wellness information and is not medical advice.";

  return NextResponse.json({ reply, disclaimer });
}
