'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/forum', label: 'Forum' },
  { href: '/articles', label: 'Articles' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/chat', label: 'AI Chat' },
]

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav
      style={{
        background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
        borderBottom: '1px solid #f9a8d4',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🌸</span>
            <span
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#be185d',
                letterSpacing: '-0.025em',
              }}
            >
              BloomCare
            </span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                padding: '0.5rem 0.875rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: '#9d174d',
                textDecoration: 'none',
                backgroundColor: hovered === item.href ? 'rgba(249, 168, 212, 0.4)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={() => setHovered(item.href)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
