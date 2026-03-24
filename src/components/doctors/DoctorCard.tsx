interface Doctor {
  id: string
  name: string
  specialization: string
  city: string
  rating: number
  bio: string
  phone?: string | null
  hospital?: string | null
  imageUrl?: string | null
}

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const stars = Math.round(doctor.rating)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-[#FFE6F0] flex items-center justify-center text-3xl flex-shrink-0">
          {doctor.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={doctor.imageUrl} alt={doctor.name} className="w-full h-full rounded-full object-cover" />
          ) : (
            '👩‍⚕️'
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-base">{doctor.name}</h3>
          <p className="text-[#FF5FA2] text-sm font-medium">{doctor.specialization}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-400 text-sm">{'⭐'.repeat(Math.min(stars, 5))}</span>
            <span className="text-xs text-gray-500">{doctor.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-500 line-clamp-2">{doctor.bio}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mt-2">
          <span>📍 {doctor.city}</span>
          {doctor.hospital && <span>🏥 {doctor.hospital}</span>}
          {doctor.phone && <span>📞 {doctor.phone}</span>}
        </div>
      </div>

      <button
        className="mt-4 w-full py-2 rounded-full border-2 border-[#FF5FA2] text-[#FF5FA2] text-sm font-semibold hover:bg-[#FFE6F0] transition-colors"
        onClick={() => alert(`To book an appointment with ${doctor.name}, please call ${doctor.phone ?? 'the hospital directly'}.`)}
      >
        Book Appointment 📅
      </button>
    </div>
  )
}
