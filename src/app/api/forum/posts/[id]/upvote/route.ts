import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const existing = await prisma.forumUpvote.findUnique({
      where: { postId_userId: { postId: id, userId: user.id } },
    })

    if (existing) {
      await prisma.forumUpvote.delete({ where: { id: existing.id } })
      const count = await prisma.forumUpvote.count({ where: { postId: id } })
      return NextResponse.json({ upvoted: false, count })
    } else {
      await prisma.forumUpvote.create({
        data: { postId: id, userId: user.id },
      })
      const count = await prisma.forumUpvote.count({ where: { postId: id } })
      return NextResponse.json({ upvoted: true, count })
    }
  } catch (error) {
    console.error('Upvote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
