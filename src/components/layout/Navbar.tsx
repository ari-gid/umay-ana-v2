'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/components/auth/AuthContext'

export default function Navbar() {
  const { user, logout, loading } = useAuth()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: '🏠 Home' },
    { href: '/articles', label: '📖 Articles' },
    { href: '/forum', label: '💬 Forum' },
    { href: '/doctors', label: '👩‍⚕️ Doctors' },
    { href: '/assistant', label: '🤖 Assistant' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <span className="text-xl font-bold text-[#FF5FA2]">BloomCare</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-[#FFE6F0] text-[#FF5FA2]'
                  : 'text-gray-600 hover:bg-[#FFE6F0] hover:text-[#FF5FA2]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href="/profile"
                    className="text-sm font-medium text-gray-700 hover:text-[#FF5FA2]"
                  >
                    👤 {user.name}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm text-gray-500 hover:text-[#FF5FA2] transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-semibold text-[#FF5FA2] border border-[#FF5FA2] rounded-full hover:bg-[#FFE6F0] transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-semibold bg-[#FF5FA2] text-white rounded-full hover:bg-[#E0457F] transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-[#FFE6F0]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6 text-[#FF5FA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-xl text-sm font-medium ${
                isActive(link.href) ? 'bg-[#FFE6F0] text-[#FF5FA2]' : 'text-gray-600'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/profile" className="px-3 py-2 text-sm text-gray-700" onClick={() => setMenuOpen(false)}>
                    👤 {user.name}
                  </Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false) }}
                    className="px-3 py-2 text-sm text-left text-gray-500"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link href="/auth/login" className="flex-1 text-center px-4 py-2 text-sm font-semibold text-[#FF5FA2] border border-[#FF5FA2] rounded-full" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link href="/auth/register" className="flex-1 text-center px-4 py-2 text-sm font-semibold bg-[#FF5FA2] text-white rounded-full" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </nav>
  )
}
