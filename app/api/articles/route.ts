import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toStringArray } from "@/lib/tags";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const trimester = searchParams.get("trimester") ?? "";
  const topic = searchParams.get("topic") ?? "";
  const readingTimeMax = Number(searchParams.get("readingTimeMax") ?? "");

  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  const filtered = articles.filter((article) => {
    const titleMatch = article.title.toLowerCase().includes(search);
    const excerptMatch = article.excerpt.toLowerCase().includes(search);
    const contentMatch = article.content.toLowerCase().includes(search);
    if (search && !titleMatch && !excerptMatch && !contentMatch) {
      return false;
    }

    const trimesterTags = toStringArray(article.trimesterTags);
    const topicTags = toStringArray(article.topicTags);

    if (trimester && !trimesterTags.includes(trimester)) {
      return false;
    }
    if (topic && !topicTags.includes(topic)) {
      return false;
    }
    if (readingTimeMax && article.readingTime > readingTimeMax) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    items: filtered.map((article) => ({
      ...article,
      trimesterTags: toStringArray(article.trimesterTags),
      topicTags: toStringArray(article.topicTags),
    })),
  });
}
