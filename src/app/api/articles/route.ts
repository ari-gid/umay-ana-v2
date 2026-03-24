import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const trimester = searchParams.get('trimester')
    const topic = searchParams.get('topic')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}
    if (trimester) where.trimester = parseInt(trimester)
    if (topic) where.topic = topic
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
      ]
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Articles error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
