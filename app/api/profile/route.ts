import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { toStringArray } from "@/lib/tags";

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.pregnancyProfile.findUnique({
    where: { userId: user.id },
  });

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const articleIds = favorites
    .filter((fav) => fav.itemType === "ARTICLE")
    .map((fav) => fav.itemId);
  const postIds = favorites
    .filter((fav) => fav.itemType === "POST")
    .map((fav) => fav.itemId);

  const [articles, posts] = await Promise.all([
    prisma.article.findMany({ where: { id: { in: articleIds } } }),
    prisma.forumPost.findMany({
      where: { id: { in: postIds } },
      include: { author: { select: { name: true } } },
    }),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      city: user.city,
      createdAt: user.createdAt,
    },
    pregnancy: profile,
    favorites: favorites.map((fav) => {
      if (fav.itemType === "ARTICLE") {
        const article = articles.find((item) => item.id === fav.itemId);
        return {
          ...fav,
          item: article
            ? {
                ...article,
                trimesterTags: toStringArray(article.trimesterTags),
                topicTags: toStringArray(article.topicTags),
              }
            : null,
        };
      }
      const post = posts.find((item) => item.id === fav.itemId);
      return {
        ...fav,
        item: post
          ? {
              ...post,
              topicTags: toStringArray(post.topicTags),
            }
          : null,
      };
    }),
  });
}
