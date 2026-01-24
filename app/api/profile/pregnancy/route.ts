import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

function calculateFromLmp(lmpDate: Date) {
  const now = new Date();
  const diffMs = now.getTime() - lmpDate.getTime();
  const totalDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const gestationWeeks = Math.floor(totalDays / 7);
  const gestationDays = totalDays % 7;
  const dueDate = new Date(lmpDate.getTime() + 280 * 24 * 60 * 60 * 1000);
  return { gestationWeeks, gestationDays, dueDate };
}

function calculateFromGestation(weeks: number, days: number) {
  const totalDays = weeks * 7 + days;
  const remainingDays = Math.max(0, 280 - totalDays);
  const dueDate = new Date(Date.now() + remainingDays * 24 * 60 * 60 * 1000);
  return { dueDate };
}

function trimesterForWeeks(weeks: number) {
  if (weeks >= 28) {
    return 3;
  }
  if (weeks >= 14) {
    return 2;
  }
  return 1;
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const lmpDate = body.lmpDate ? new Date(body.lmpDate) : null;
  const gestationWeeks = Number(body.gestationWeeks ?? "");
  const gestationDays = Number(body.gestationDays ?? "");

  let dueDate: Date | null = null;
  let weeks: number | null = null;
  let days: number | null = null;

  if (lmpDate && !Number.isNaN(lmpDate.getTime())) {
    const result = calculateFromLmp(lmpDate);
    dueDate = result.dueDate;
    weeks = result.gestationWeeks;
    days = result.gestationDays;
  } else if (!Number.isNaN(gestationWeeks) && !Number.isNaN(gestationDays)) {
    const result = calculateFromGestation(gestationWeeks, gestationDays);
    dueDate = result.dueDate;
    weeks = gestationWeeks;
    days = gestationDays;
  } else {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const trimester = trimesterForWeeks(weeks ?? 0);

  const profile = await prisma.pregnancyProfile.upsert({
    where: { userId: user.id },
    update: {
      lmpDate,
      dueDate,
      gestationWeeks: weeks,
      gestationDays: days,
      trimester,
    },
    create: {
      userId: user.id,
      lmpDate,
      dueDate,
      gestationWeeks: weeks,
      gestationDays: days,
      trimester,
    },
  });

  return NextResponse.json(profile);
}
