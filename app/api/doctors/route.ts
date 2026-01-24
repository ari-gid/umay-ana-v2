import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim() ?? "";
  const specialization = searchParams.get("specialization")?.trim() ?? "";
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";

  const doctors = await prisma.doctor.findMany({
    where: {
      ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
      ...(specialization
        ? { specialization: { contains: specialization, mode: "insensitive" } }
        : {}),
    },
    orderBy: { rating: "desc" },
  });

  const filtered = doctors.filter((doctor) => {
    if (!search) {
      return true;
    }
    return (
      doctor.name.toLowerCase().includes(search) ||
      doctor.about.toLowerCase().includes(search)
    );
  });

  return NextResponse.json({ items: filtered });
}
