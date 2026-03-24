'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function NewPostPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [form, setForm] = useState({ title: '', content: '', tags: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loading && !user) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-4">🔒</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Login Required</h2>
      <p className="text-gray-500 mb-6">You need to be logged in to create a post.</p>
      <Link href="/auth/login" className="bg-[#FF5FA2] text-white px-6 py-3 rounded-full font-semibold">Login</Link>
    </div>
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) router.push(`/forum/${data.post.id}`)
      else setError(data.error ?? 'Failed to create post')
    } finally { setSubmitting(false) }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/forum" className="text-[#FF5FA2] text-sm font-medium hover:underline mb-6 inline-block">← Back to Forum</Link>
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">✍️ New Post</h1>
        {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="What's on your mind?" className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
            <textarea required rows={6} value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Share your thoughts, questions, or experiences..." className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="e.g. first-trimester, nutrition, symptoms" className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" />
          </div>
          <Button variant="primary" className="w-full" type="submit" loading={submitting}>Post to Community 🌸</Button>
        </form>
      </div>
    </div>
  )
}
