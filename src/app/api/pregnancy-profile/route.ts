import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { calculatePregnancy } from '@/lib/pregnancy'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const profile = await prisma.pregnancyProfile.findUnique({
      where: { userId: user.id },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Pregnancy profile fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { lmpDate, hideOnForum } = await request.json()

    let dueDate: Date | null = null
    let currentWeek: number | null = null
    let trimester: number | null = null

    if (lmpDate) {
      const calc = calculatePregnancy(new Date(lmpDate))
      dueDate = calc.dueDate
      currentWeek = calc.currentWeek
      trimester = calc.trimester
    }

    const profile = await prisma.pregnancyProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        lmpDate: lmpDate ? new Date(lmpDate) : null,
        dueDate,
        currentWeek,
        trimester,
        hideOnForum: hideOnForum ?? false,
      },
      update: {
        lmpDate: lmpDate ? new Date(lmpDate) : null,
        dueDate,
        currentWeek,
        trimester,
        hideOnForum: hideOnForum ?? false,
      },
    })

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Pregnancy profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
