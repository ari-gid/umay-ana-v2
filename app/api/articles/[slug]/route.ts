import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toStringArray } from "@/lib/tags";

type Params = {
  params: { slug: string };
};

export async function GET(_request: Request, { params }: Params) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...article,
    trimesterTags: toStringArray(article.trimesterTags),
    topicTags: toStringArray(article.topicTags),
  });
}
