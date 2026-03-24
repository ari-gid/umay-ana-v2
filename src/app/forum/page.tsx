import { prisma } from '@/lib/prisma'
import PostCard from '@/components/forum/PostCard'
import Link from 'next/link'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

interface SearchParams {
  tag?: string
  search?: string
}

export default async function ForumPage({ searchParams }: { searchParams: SearchParams }) {
  const where: Record<string, unknown> = {}
  if (searchParams.tag) where.tags = { contains: searchParams.tag }
  if (searchParams.search) {
    where.OR = [
      { title: { contains: searchParams.search } },
      { content: { contains: searchParams.search } },
    ]
  }

  const posts = await prisma.forumPost.findMany({
    where,
    include: {
      author: { select: { id: true, name: true } },
      _count: { select: { comments: true, upvotes: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  const popularTags = ['first-trimester', 'second-trimester', 'third-trimester', 'nutrition', 'exercise', 'anxiety', 'symptoms', 'birth-plan']

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">💬 Community Forum</h1>
          <p className="text-gray-500 mt-1">Share experiences and support each other</p>
        </div>
        <Link
          href="/forum/new"
          className="bg-[#FF5FA2] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#E0457F] transition-colors shadow-md"
        >
          + New Post
        </Link>
      </div>

      {/* Search */}
      <Suspense>
        <form className="mb-6">
          <input
            name="search"
            type="text"
            placeholder="🔍 Search posts..."
            defaultValue={searchParams.search ?? ''}
            className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 bg-white"
          />
        </form>
      </Suspense>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/forum"
          className={`px-3 py-1.5 rounded-full text-sm font-medium ${!searchParams.tag ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF5FA2]'}`}
        >
          All Posts
        </Link>
        {popularTags.map((tag) => (
          <Link
            key={tag}
            href={`/forum?tag=${tag}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${searchParams.tag === tag ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF5FA2] hover:text-[#FF5FA2]'}`}
          >
            #{tag}
          </Link>
        ))}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">💬</div>
          <h3 className="text-lg font-medium text-gray-600">No posts yet</h3>
          <p className="text-sm mt-1 mb-4">Be the first to start a conversation!</p>
          <Link href="/forum/new" className="bg-[#FF5FA2] text-white px-6 py-2 rounded-full font-semibold text-sm">
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
