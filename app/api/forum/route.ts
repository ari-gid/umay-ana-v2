import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toStringArray } from "@/lib/tags";
import { getSessionUser } from "@/lib/session";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const trimester = searchParams.get("trimester") ?? "";
  const topic = searchParams.get("topic") ?? "";

  const posts = await prisma.forumPost.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          name: true,
          pregnancy: { select: { privacyHideOnForum: true } },
        },
      },
      _count: { select: { comments: true } },
    },
  });

  const filtered = posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(search);
    const contentMatch = post.content.toLowerCase().includes(search);
    if (search && !titleMatch && !contentMatch) {
      return false;
    }
    if (trimester && post.trimesterTag !== trimester) {
      return false;
    }
    const topicTags = toStringArray(post.topicTags);
    if (topic && !topicTags.includes(topic)) {
      return false;
    }
    return true;
  });

  return NextResponse.json({
    items: filtered.map((post) => ({
      ...post,
      author: {
        name: post.author?.pregnancy?.privacyHideOnForum ? "Anonymous" : post.author?.name,
      },
      topicTags: toStringArray(post.topicTags),
    })),
  });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title || "").trim();
  const content = String(body.content || "").trim();
  const trimesterTag = body.trimesterTag ? String(body.trimesterTag) : null;
  const topicTags = Array.isArray(body.topicTags) ? body.topicTags : [];

  if (!title || !content) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const post = await prisma.forumPost.create({
    data: {
      authorId: user.id,
      title,
      content,
      trimesterTag,
      topicTags,
    },
  });

  return NextResponse.json({
    ...post,
    author: {
      name: user.name,
    },
    topicTags: toStringArray(post.topicTags),
  });
}
