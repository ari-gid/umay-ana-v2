import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import CommentSection from '@/components/forum/CommentSection'
import UpvoteButton from '@/components/forum/UpvoteButton'

export const dynamic = 'force-dynamic'

export default async function ForumPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.forumPost.findUnique({
    where: { id: params.id },
    include: {
      author: { select: { id: true, name: true } },
      comments: { include: { author: { select: { id: true, name: true } } }, orderBy: { createdAt: 'asc' } },
      _count: { select: { upvotes: true } },
    },
  })
  if (!post) notFound()
  const tags = post.tags ? post.tags.split(',').filter(Boolean) : []
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/forum" className="text-[#FF5FA2] text-sm font-medium hover:underline mb-6 inline-block">← Back to Forum</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-8 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map(t => <span key={t} className="text-xs px-2 py-1 rounded-full bg-[#FFE6F0] text-[#FF5FA2]">#{t.trim()}</span>)}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <div className="w-9 h-9 rounded-full bg-[#FF5FA2] text-white flex items-center justify-center font-bold">{post.author.name.charAt(0)}</div>
          <div>
            <div className="font-medium text-sm text-gray-800">{post.author.name}</div>
            <div className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </div>
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-6">{post.content}</div>
        <UpvoteButton postId={post.id} initialCount={post._count.upvotes} />
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-6">
        <CommentSection postId={post.id} initialComments={post.comments.map(c => ({...c, createdAt: c.createdAt.toISOString()}))} />
      </div>
    </div>
  )
}
