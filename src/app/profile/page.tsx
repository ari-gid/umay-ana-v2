'use client'
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthContext'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const { user, loading, refresh } = useAuth()
  const router = useRouter()
  const [pregnancyProfile, setPregnancyProfile] = useState<{lmpDate?: string; hideOnForum?: boolean; dueDate?: string; currentWeek?: number; trimester?: number} | null>(null)
  const [favorites, setFavorites] = useState<Array<{id: string; article?: {id: string; title: string; topic: string} | null; post?: {id: string; title: string} | null}>>([])
  const [lmpDate, setLmpDate] = useState('')
  const [hideOnForum, setHideOnForum] = useState(false)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [activeTab, setActiveTab] = useState<'pregnancy' | 'favorites'>('pregnancy')

  useEffect(() => {
    if (!loading && !user) router.push('/auth/login')
    if (user) {
      setName(user.name)
      fetch('/api/pregnancy-profile').then(r => r.json()).then(d => {
        if (d.profile) {
          setPregnancyProfile(d.profile)
          if (d.profile.lmpDate) setLmpDate(new Date(d.profile.lmpDate).toISOString().split('T')[0])
          setHideOnForum(d.profile.hideOnForum ?? false)
        }
      })
      fetch('/api/favorites').then(r => r.json()).then(d => { if (d.favorites) setFavorites(d.favorites) })
    }
  }, [user, loading, router])

  const savePregnancyProfile = async () => {
    setSaving(true)
    await fetch('/api/pregnancy-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lmpDate, hideOnForum }),
    })
    const d = await fetch('/api/pregnancy-profile').then(r => r.json())
    if (d.profile) setPregnancyProfile(d.profile)
    setSaving(false)
  }

  const saveName = async () => {
    setSaving(true)
    await fetch('/api/profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) })
    await refresh()
    setSaving(false)
  }

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin w-8 h-8 rounded-full border-4 border-[#FF5FA2] border-t-transparent" /></div>
  if (!user) return null

  const trimesterLabels = ['', 'First Trimester', 'Second Trimester', 'Third Trimester']

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-6 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-[#FF5FA2] text-white flex items-center justify-center text-2xl font-bold">{user.name.charAt(0).toUpperCase()}</div>
        <div className="flex-1">
          <input value={name} onChange={e => setName(e.target.value)} className="text-xl font-bold text-gray-800 bg-transparent border-b border-transparent hover:border-pink-medium/40 focus:border-[#FF5FA2] focus:outline-none w-full" />
          <p className="text-gray-400 text-sm mt-1">{user.email}</p>
          {pregnancyProfile?.currentWeek && (
            <span className="inline-block mt-2 bg-[#FFE6F0] text-[#FF5FA2] text-xs font-semibold px-3 py-1 rounded-full">
              Week {pregnancyProfile.currentWeek} • {trimesterLabels[pregnancyProfile.trimester ?? 0]}
            </span>
          )}
        </div>
        <Button variant="secondary" size="sm" onClick={saveName} loading={saving}>Save</Button>
      </div>

      <div className="flex rounded-xl overflow-hidden border border-pink-medium/30 mb-6">
        <button onClick={() => setActiveTab('pregnancy')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'pregnancy' ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 hover:bg-[#FFE6F0]'}`}>🤰 Pregnancy</button>
        <button onClick={() => setActiveTab('favorites')} className={`flex-1 py-2.5 text-sm font-medium transition-colors ${activeTab === 'favorites' ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 hover:bg-[#FFE6F0]'}`}>❤️ Favorites ({favorites.length})</button>
      </div>

      {activeTab === 'pregnancy' && (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-6">
          <h2 className="font-bold text-gray-800 mb-5">🤰 Pregnancy Profile</h2>
          {pregnancyProfile?.dueDate && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-[#FFE6F0] rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-[#FF5FA2]">{pregnancyProfile.currentWeek}</div>
                <div className="text-xs text-gray-500">Weeks</div>
              </div>
              <div className="bg-[#FFE6F0] rounded-xl p-4 text-center">
                <div className="text-lg font-bold text-[#FF5FA2]">{trimesterLabels[pregnancyProfile.trimester ?? 0]}</div>
                <div className="text-xs text-gray-500">Trimester</div>
              </div>
              <div className="bg-[#FFE6F0] rounded-xl p-4 text-center">
                <div className="text-sm font-bold text-[#FF5FA2]">{new Date(pregnancyProfile.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                <div className="text-xs text-gray-500">Due Date</div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Menstrual Period (LMP)</label>
              <input type="date" value={lmpDate} onChange={e => setLmpDate(e.target.value)} max={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40" />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={hideOnForum} onChange={e => setHideOnForum(e.target.checked)} className="w-4 h-4 accent-[#FF5FA2]" />
              <span className="text-sm text-gray-600">Hide pregnancy week on forum posts</span>
            </label>
            <Button variant="primary" className="w-full" onClick={savePregnancyProfile} loading={saving}>Save Pregnancy Profile 🌸</Button>
          </div>
        </div>
      )}

      {activeTab === 'favorites' && (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-medium/20 p-6">
          <h2 className="font-bold text-gray-800 mb-5">❤️ My Favorites</h2>
          {favorites.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <div className="text-4xl mb-2">❤️</div>
              <p className="text-sm">No favorites yet. Explore articles and posts!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map(fav => fav.article ? (
                <Link key={fav.id} href={`/articles/${fav.article.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6F0] transition-colors">
                  <span className="text-xl">📖</span>
                  <div><div className="text-sm font-medium text-gray-800">{fav.article.title}</div><div className="text-xs text-gray-400">{fav.article.topic}</div></div>
                </Link>
              ) : fav.post ? (
                <Link key={fav.id} href={`/forum/${fav.post.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FFE6F0] transition-colors">
                  <span className="text-xl">💬</span>
                  <div className="text-sm font-medium text-gray-800">{fav.post.title}</div>
                </Link>
              ) : null)}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
