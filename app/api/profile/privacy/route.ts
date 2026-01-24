import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const privacyHideOnForum = Boolean(body.privacyHideOnForum);

  const profile = await prisma.pregnancyProfile.upsert({
    where: { userId: user.id },
    update: { privacyHideOnForum },
    create: {
      userId: user.id,
      trimester: 1,
      privacyHideOnForum,
    },
  });

  return NextResponse.json(profile);
}
