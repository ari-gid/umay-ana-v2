import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ArticleCard from '@/components/articles/ArticleCard'

export default async function Recommendations() {
  let articles: Array<{
    id: string
    title: string
    summary: string
    topic: string
    trimester: number | null
    readingTime: number
    author: string
    imageUrl: string | null
  }> = []

  try {
    articles = await prisma.article.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
  } catch {
    // Return empty if DB not ready
  }

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Latest Articles</h2>
            <p className="text-gray-500 text-sm mt-1">Expert advice for your pregnancy journey</p>
          </div>
          <Link href="/articles" className="text-[#FF5FA2] font-medium hover:underline text-sm">
            View all →
          </Link>
        </div>
        {articles.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">📚</div>
            <p>Articles coming soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
