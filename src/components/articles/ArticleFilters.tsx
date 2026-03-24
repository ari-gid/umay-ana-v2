'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const topics = [
  { value: '', label: 'All Topics', emoji: '📚' },
  { value: 'nutrition', label: 'Nutrition', emoji: '🥗' },
  { value: 'exercise', label: 'Exercise', emoji: '🏃' },
  { value: 'mental-health', label: 'Mental Health', emoji: '🧠' },
  { value: 'medical', label: 'Medical', emoji: '🩺' },
  { value: 'lifestyle', label: 'Lifestyle', emoji: '✨' },
  { value: 'baby', label: 'Baby', emoji: '👶' },
]

const trimesters = [
  { value: '', label: 'All Trimesters' },
  { value: '1', label: '1st Trimester' },
  { value: '2', label: '2nd Trimester' },
  { value: '3', label: '3rd Trimester' },
]

export default function ArticleFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentTopic = searchParams.get('topic') ?? ''
  const currentTrimester = searchParams.get('trimester') ?? ''
  const currentSearch = searchParams.get('search') ?? ''

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/articles?${params.toString()}`)
  }

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="🔍 Search articles..."
          defaultValue={currentSearch}
          onChange={(e) => {
            const val = e.target.value
            const timer = setTimeout(() => updateFilter('search', val), 500)
            return () => clearTimeout(timer)
          }}
          className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 bg-white"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Trimester</p>
        <div className="flex flex-wrap gap-2">
          {trimesters.map((t) => (
            <button
              key={t.value}
              onClick={() => updateFilter('trimester', t.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentTrimester === t.value
                  ? 'bg-[#FF5FA2] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF5FA2] hover:text-[#FF5FA2]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-600 mb-2">Topic</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <button
              key={topic.value}
              onClick={() => updateFilter('topic', topic.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                currentTopic === topic.value
                  ? 'bg-[#FF5FA2] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF5FA2] hover:text-[#FF5FA2]'
              }`}
            >
              {topic.emoji} {topic.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
