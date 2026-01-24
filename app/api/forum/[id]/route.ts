import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toStringArray } from "@/lib/tags";

type Params = {
  params: { id: string };
};

export async function GET(_request: Request, { params }: Params) {
  const post = await prisma.forumPost.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
          pregnancy: { select: { privacyHideOnForum: true } },
        },
      },
      comments: {
        orderBy: { createdAt: "asc" },
        include: {
          author: {
            select: {
              name: true,
              pregnancy: { select: { privacyHideOnForum: true } },
            },
          },
        },
      },
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...post,
    author: {
      name: post.author?.pregnancy?.privacyHideOnForum ? "Anonymous" : post.author?.name,
    },
    comments: post.comments.map((comment) => ({
      ...comment,
      author: {
        name: comment.author?.pregnancy?.privacyHideOnForum
          ? "Anonymous"
          : comment.author?.name,
      },
    })),
    topicTags: toStringArray(post.topicTags),
  });
}
