import Link from 'next/link'

interface Article {
  id: string
  title: string
  summary: string
  topic: string
  trimester: number | null
  readingTime: number
  author: string
  imageUrl: string | null
}

const topicColors: Record<string, string> = {
  nutrition: 'bg-green-100 text-green-700',
  exercise: 'bg-blue-100 text-blue-700',
  'mental-health': 'bg-purple-100 text-purple-700',
  medical: 'bg-red-100 text-red-700',
  lifestyle: 'bg-yellow-100 text-yellow-700',
  baby: 'bg-pink-100 text-pink-700',
}

const topicEmojis: Record<string, string> = {
  nutrition: '🥗',
  exercise: '🏃',
  'mental-health': '🧠',
  medical: '🩺',
  lifestyle: '✨',
  baby: '👶',
}

const trimesterBadges: Record<number, string> = {
  1: '1st Trimester',
  2: '2nd Trimester',
  3: '3rd Trimester',
}

export default function ArticleCard({ article }: { article: Article }) {
  const colorClass = topicColors[article.topic] ?? 'bg-gray-100 text-gray-700'
  const emoji = topicEmojis[article.topic] ?? '📖'

  return (
    <Link href={`/articles/${article.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 overflow-hidden hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
        <div className="h-3 bg-gradient-to-r from-[#FF5FA2] to-[#FFB3D1]" />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}>
              {emoji} {article.topic}
            </span>
            {article.trimester && (
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#FFE6F0] text-[#FF5FA2]">
                {trimesterBadges[article.trimester]}
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-800 text-base leading-snug mb-2 flex-1">
            {article.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-4">{article.summary}</p>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>By {article.author}</span>
            <span>⏱️ {article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
