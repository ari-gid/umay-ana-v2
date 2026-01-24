import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: { id: string };
};

export async function POST(_request: Request, { params }: Params) {
  const post = await prisma.forumPost.update({
    where: { id: params.id },
    data: { upvotes: { increment: 1 } },
  });

  return NextResponse.json(post);
}
