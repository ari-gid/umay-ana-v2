import { Suspense } from 'react'
import { prisma } from '@/lib/prisma'
import ArticleCard from '@/components/articles/ArticleCard'
import ArticleFilters from '@/components/articles/ArticleFilters'

export const dynamic = 'force-dynamic'

interface SearchParams {
  topic?: string
  trimester?: string
  search?: string
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const where: Record<string, unknown> = {}
  if (searchParams.trimester) where.trimester = parseInt(searchParams.trimester)
  if (searchParams.topic) where.topic = searchParams.topic
  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search } },
      { summary: { contains: searchParams.search } },
    ]
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📖 Pregnancy Articles</h1>
        <p className="text-gray-500">Expert-written articles to guide your pregnancy journey</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-medium/20 sticky top-20">
            <h2 className="font-bold text-gray-700 mb-4">Filter Articles</h2>
            <Suspense fallback={<div>Loading filters...</div>}>
              <ArticleFilters />
            </Suspense>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-3">📚</div>
              <h3 className="text-lg font-medium text-gray-600">No articles found</h3>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-4">{articles.length} article{articles.length !== 1 ? 's' : ''} found</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
