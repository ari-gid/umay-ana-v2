'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) router.push('/')
      else setError(data.error ?? 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌺</div>
          <h1 className="text-2xl font-bold text-gray-800">Join BloomCare</h1>
          <p className="text-gray-500 mt-1">Start your pregnancy journey with us</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-8">
          {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required minLength={6} value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" placeholder="Min. 6 characters" />
            </div>
            <Button variant="primary" className="w-full" type="submit" loading={loading}>Create Account 🌸</Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Already have an account?{' '}<Link href="/auth/login" className="text-[#FF5FA2] font-semibold hover:underline">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}
