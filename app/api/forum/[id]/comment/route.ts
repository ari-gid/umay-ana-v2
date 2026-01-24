import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";

type Params = {
  params: { id: string };
};

export async function POST(request: Request, { params }: Params) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const content = String(body.content || "").trim();
  if (!content) {
    return NextResponse.json({ error: "Missing content" }, { status: 400 });
  }

  const comment = await prisma.forumComment.create({
    data: {
      postId: params.id,
      authorId: user.id,
      content,
    },
  });

  return NextResponse.json(comment);
}
