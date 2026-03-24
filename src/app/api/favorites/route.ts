import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      include: {
        article: true,
        post: {
          include: {
            author: { select: { id: true, name: true } },
            _count: { select: { comments: true, upvotes: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ favorites })
  } catch (error) {
    console.error('Favorites fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { articleId, postId } = await request.json()

    if (!articleId && !postId) {
      return NextResponse.json({ error: 'articleId or postId required' }, { status: 400 })
    }

    const where: Record<string, string> = { userId: user.id }
    if (articleId) where.articleId = articleId
    if (postId) where.postId = postId

    const existing = await prisma.favorite.findFirst({ where })

    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } })
      return NextResponse.json({ favorited: false })
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: user.id,
        articleId: articleId ?? null,
        postId: postId ?? null,
      },
    })

    return NextResponse.json({ favorited: true, favorite })
  } catch (error) {
    console.error('Favorite toggle error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
