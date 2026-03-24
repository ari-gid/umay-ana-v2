import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const specialization = searchParams.get('specialization')

    const where: Record<string, unknown> = {}
    if (city) where.city = { contains: city }
    if (specialization) where.specialization = { contains: specialization }

    const doctors = await prisma.doctor.findMany({
      where,
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json({ doctors })
  } catch (error) {
    console.error('Doctors error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
