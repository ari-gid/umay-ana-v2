import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const itemType = String(body.itemType || "").toUpperCase();
  const itemId = String(body.itemId || "");

  if (!itemId || (itemType !== "ARTICLE" && itemType !== "POST")) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.favorite.findFirst({
    where: { userId: user.id, itemType, itemId },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await prisma.favorite.create({
    data: {
      userId: user.id,
      itemType: itemType as "ARTICLE" | "POST",
      itemId,
    },
  });

  return NextResponse.json({ favorited: true });
}
