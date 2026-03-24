import Link from 'next/link'

interface ForumPost {
  id: string
  title: string
  content: string
  tags: string
  createdAt: string | Date
  author: { id: string; name: string }
  _count: { comments: number; upvotes: number }
}

export default function PostCard({ post }: { post: ForumPost }) {
  const tags = post.tags ? post.tags.split(',').filter(Boolean) : []
  const preview = typeof post.content === 'string'
    ? post.content.slice(0, 150) + (post.content.length > 150 ? '...' : '')
    : ''
  const date = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Link href={`/forum/${post.id}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-5 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-base mb-1 hover:text-[#FF5FA2] transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 mb-3">{preview}</p>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-[#FFE6F0] text-[#FF5FA2] font-medium"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>👤 {post.author.name}</span>
              <span>📅 {date}</span>
              <span>💬 {post._count.comments} comments</span>
              <span>❤️ {post._count.upvotes}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
