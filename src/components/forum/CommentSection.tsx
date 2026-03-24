'use client'

import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface Comment {
  id: string
  content: string
  createdAt: string | Date
  author: { id: string; name: string }
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
}

export default function CommentSection({ postId, initialComments }: CommentSectionProps) {
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  const submitComment = async () => {
    if (!newComment.trim() || loading) return
    setLoading(true)
    try {
      const res = await fetch(`/api/forum/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      })
      if (res.ok) {
        const data = await res.json()
        setComments((prev) => [...prev, data.comment])
        setNewComment('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        💬 Comments ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-[#FFE6F0]/50 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FF5FA2] text-white flex items-center justify-center text-sm font-bold">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="font-medium text-sm text-gray-800">{comment.author.name}</span>
                  <span className="text-xs text-gray-400 ml-2">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-700 pl-10">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {user ? (
        <div className="bg-white rounded-xl border border-pink-medium/30 p-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts or support... 💕"
            rows={3}
            className="w-full resize-none focus:outline-none text-sm text-gray-700"
          />
          <div className="flex justify-end mt-2">
            <Button variant="primary" size="sm" loading={loading} onClick={submitComment}>
              Post Comment
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-[#FFE6F0]/50 rounded-xl">
          <p className="text-gray-600 text-sm mb-3">Join the conversation!</p>
          <Link href="/auth/login" className="text-[#FF5FA2] font-semibold text-sm hover:underline">
            Login to comment →
          </Link>
        </div>
      )}
    </div>
  )
}
