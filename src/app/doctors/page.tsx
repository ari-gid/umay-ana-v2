import { prisma } from '@/lib/prisma'
import DoctorCard from '@/components/doctors/DoctorCard'

export const dynamic = 'force-dynamic'

export default async function DoctorsPage({ searchParams }: { searchParams: { city?: string; specialization?: string } }) {
  const where: Record<string, unknown> = {}
  if (searchParams.city) where.city = { contains: searchParams.city }
  if (searchParams.specialization) where.specialization = { contains: searchParams.specialization }
  const doctors = await prisma.doctor.findMany({ where, orderBy: { rating: 'desc' } })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👩‍⚕️ Find a Doctor</h1>
        <p className="text-gray-500">Trusted OBGYNs and midwives for your pregnancy journey</p>
      </div>
      <form className="bg-white rounded-2xl p-5 shadow-sm border border-pink-medium/20 mb-8 flex flex-col md:flex-row gap-3">
        <input name="city" type="text" placeholder="🏙️ City" defaultValue={searchParams.city ?? ''} className="flex-1 px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" />
        <input name="specialization" type="text" placeholder="🩺 Specialization" defaultValue={searchParams.specialization ?? ''} className="flex-1 px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" />
        <button type="submit" className="px-6 py-3 bg-[#FF5FA2] text-white rounded-xl font-semibold hover:bg-[#E0457F] transition-colors">Search</button>
      </form>
      {doctors.length === 0 ? (
        <div className="text-center py-16 text-gray-400"><div className="text-5xl mb-3">👩‍⚕️</div><p>No doctors found. Try different filters.</p></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      )}
    </div>
  )
}
