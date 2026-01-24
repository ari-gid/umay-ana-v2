import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const message = String(body.message || "").trim();
  const doctorId = body.doctorId ? String(body.doctorId) : null;
  const user = await getSessionUser();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const requestRecord = await prisma.doctorRequest.create({
    data: {
      name,
      email,
      message,
      doctorId,
      userId: user?.id ?? null,
    },
  });

  return NextResponse.json({ ok: true, request: requestRecord });
}
