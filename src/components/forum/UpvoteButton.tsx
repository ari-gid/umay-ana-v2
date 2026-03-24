'use client'
import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'

export default function UpvoteButton({ postId, initialCount }: { postId: string; initialCount: number }) {
  const { user } = useAuth()
  const router = useRouter()
  const [count, setCount] = useState(initialCount)
  const [loading, setLoading] = useState(false)

  const handleUpvote = async () => {
    if (!user) { router.push('/auth/login'); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/forum/posts/${postId}/upvote`, { method: 'POST' })
      const data = await res.json()
      setCount(data.count)
    } finally { setLoading(false) }
  }

  return (
    <button onClick={handleUpvote} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFE6F0] text-[#FF5FA2] font-semibold text-sm hover:bg-[#FFB3D1] transition-colors disabled:opacity-50">
      ❤️ {count} {count === 1 ? 'Like' : 'Likes'}
    </button>
  )
}
