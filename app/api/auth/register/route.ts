import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").toLowerCase().trim();
  const password = String(body.password || "");
  const name = String(body.name || "").trim();
  const city = body.city ? String(body.city).trim() : null;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(password),
      name,
      city,
    },
  });

  await createSession(user.id);
  return NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, city: user.city },
  });
}
