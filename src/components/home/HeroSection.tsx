'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthContext'

export default function HeroSection() {
  const { user } = useAuth()

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE6F0] to-[#FFB3D1]/30 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block bg-[#FF5FA2]/10 text-[#FF5FA2] text-sm font-semibold px-4 py-2 rounded-full mb-4">
            🌸 Your Pregnancy Companion
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
            Bloom through every{' '}
            <span className="text-[#FF5FA2]">magical moment</span>{' '}
            of pregnancy
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Expert articles, a supportive community, trusted doctors, and a caring AI assistant — 
            all in one place for your journey from month 1 to 9.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {user ? (
              <Link href="/profile" className="btn-primary text-lg px-8 py-4 rounded-full bg-[#FF5FA2] text-white font-semibold hover:bg-[#E0457F] transition-colors shadow-lg">
                My Pregnancy 🌺
              </Link>
            ) : (
              <Link href="/auth/register" className="btn-primary text-lg px-8 py-4 rounded-full bg-[#FF5FA2] text-white font-semibold hover:bg-[#E0457F] transition-colors shadow-lg">
                Start Your Journey 🌺
              </Link>
            )}
            <Link href="/articles" className="text-lg px-8 py-4 rounded-full border-2 border-[#FF5FA2] text-[#FF5FA2] font-semibold hover:bg-[#FFE6F0] transition-colors">
              Explore Articles
            </Link>
          </div>
          <div className="flex gap-8 mt-10 justify-center md:justify-start text-center">
            <div>
              <div className="text-2xl font-bold text-[#FF5FA2]">500+</div>
              <div className="text-sm text-gray-500">Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF5FA2]">10k+</div>
              <div className="text-sm text-gray-500">Moms</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#FF5FA2]">50+</div>
              <div className="text-sm text-gray-500">Doctors</div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#FF5FA2]/20 flex items-center justify-center">
              <div className="text-8xl md:text-9xl">🤰</div>
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-3 text-sm font-medium text-gray-700">
              📅 Week 24
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 text-sm font-medium text-gray-700">
              🍌 Size of a banana
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
