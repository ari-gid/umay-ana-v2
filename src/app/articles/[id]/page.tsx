import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

const topicEmojis: Record<string, string> = {
  nutrition: '🥗',
  exercise: '🏃',
  'mental-health': '🧠',
  medical: '🩺',
  lifestyle: '✨',
  baby: '👶',
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await prisma.article.findUnique({ where: { id } })
  if (!article) notFound()

  const trimesterLabel = article.trimester
    ? `${article.trimester === 1 ? '1st' : article.trimester === 2 ? '2nd' : '3rd'} Trimester`
    : 'All Trimesters'

  const relatedArticles = await prisma.article.findMany({
    where: {
      topic: article.topic,
      id: { not: article.id },
    },
    take: 3,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link href="/articles" className="text-[#FF5FA2] text-sm font-medium hover:underline mb-6 inline-block">
        ← Back to Articles
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-[#FF5FA2] to-[#FFB3D1]" />
        <div className="p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-[#FFE6F0] text-[#FF5FA2]">
              {topicEmojis[article.topic] ?? '📖'} {article.topic}
            </span>
            <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700">
              {trimesterLabel}
            </span>
            <span className="text-sm text-gray-400">⏱️ {article.readingTime} min read</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-3">{article.title}</h1>
          <p className="text-gray-500 text-lg mb-6">{article.summary}</p>

          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-[#FFE6F0] flex items-center justify-center text-[#FF5FA2] font-bold">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="font-medium text-gray-800 text-sm">{article.author}</div>
              <div className="text-xs text-gray-400">
                {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
          </div>

          <div className="prose prose-pink max-w-none">
            {article.content.split('\n').map((paragraph, i) => (
              paragraph.trim() ? (
                <p key={i} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
              ) : (
                <br key={i} />
              )
            ))}
          </div>
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((ra) => (
              <Link key={ra.id} href={`/articles/${ra.id}`}>
                <div className="bg-white rounded-xl p-4 shadow-sm border border-pink-medium/20 hover:shadow-md transition-shadow">
                  <div className="text-xs font-medium text-[#FF5FA2] mb-1">{topicEmojis[ra.topic]} {ra.topic}</div>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{ra.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">⏱️ {ra.readingTime} min</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
