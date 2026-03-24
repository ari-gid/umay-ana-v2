'use client'

import { useState } from 'react'
import Link from 'next/link'

function WeekCalculator() {
  const [dueDate, setDueDate] = useState('')
  const [result, setResult] = useState<{ week: number; trimester: string; daysLeft: number } | null>(null)

  const calculate = () => {
    if (!dueDate) return
    const due = new Date(dueDate)
    const today = new Date()
    const conceptionDate = new Date(due)
    conceptionDate.setDate(conceptionDate.getDate() - 280)
    const diffTime = today.getTime() - conceptionDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    const week = Math.max(1, Math.min(40, Math.floor(diffDays / 7)))
    const daysLeft = Math.max(0, Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    let trimester = 'First Trimester'
    if (week > 26) trimester = 'Third Trimester'
    else if (week > 12) trimester = 'Second Trimester'
    setResult({ week, trimester, daysLeft })
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2rem',
        boxShadow: '0 4px 24px rgba(249,168,212,0.2)',
        border: '1px solid #fbcfe8',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🗓️</span>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#be185d' }}>
          Pregnancy Week Calculator
        </h2>
      </div>
      <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.25rem' }}>
        Enter your due date to find out your current week and trimester.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            flex: 1,
            minWidth: '160px',
            padding: '0.625rem 1rem',
            border: '1.5px solid #fbcfe8',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
            outline: 'none',
            color: '#374151',
          }}
        />
        <button
          onClick={calculate}
          style={{
            padding: '0.625rem 1.5rem',
            background: 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Calculate
        </button>
      </div>
      {result && (
        <div
          style={{
            marginTop: '1.25rem',
            padding: '1.25rem',
            background: 'linear-gradient(135deg, #fce7f3 0%, #fdf2f8 100%)',
            borderRadius: '1rem',
            border: '1px solid #fbcfe8',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#be185d' }}>{result.week}</div>
              <div style={{ fontSize: '0.75rem', color: '#9d174d', fontWeight: 500 }}>Weeks Pregnant</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: '#be185d' }}>{result.trimester}</div>
              <div style={{ fontSize: '0.75rem', color: '#9d174d', fontWeight: 500, marginTop: '0.25rem' }}>Current Trimester</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#be185d' }}>{result.daysLeft}</div>
              <div style={{ fontSize: '0.75rem', color: '#9d174d', fontWeight: 500 }}>Days Until Due Date</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const recommendationCards = [
  {
    icon: '🌿',
    title: 'Nutrition Guide',
    description: 'Discover the best foods for you and your growing baby. Learn about essential vitamins and minerals.',
    tag: 'Nutrition',
    tagColor: '#10b981',
    tagBg: '#d1fae5',
    href: '/articles',
  },
  {
    icon: '🧘',
    title: 'Prenatal Exercise',
    description: 'Safe and effective exercises to stay fit and prepare your body for labor. Yoga, walking, and more.',
    tag: 'Exercise',
    tagColor: '#7c3aed',
    tagBg: '#ede9fe',
    href: '/articles',
  },
  {
    icon: '🧠',
    title: 'Mental Wellness',
    description: 'Support for your emotional health through pregnancy. Manage anxiety and embrace positive mindset.',
    tag: 'Mental Health',
    tagColor: '#2563eb',
    tagBg: '#dbeafe',
    href: '/articles',
  },
  {
    icon: '👶',
    title: 'Baby Development',
    description: 'Week-by-week milestones for your little one. Understand how your baby is growing and developing.',
    tag: 'Development',
    tagColor: '#d97706',
    tagBg: '#fef3c7',
    href: '/articles',
  },
]

const features = [
  { icon: '💬', title: 'Community Forum', description: 'Connect with thousands of expectant mothers. Share experiences and get support.' },
  { icon: '📚', title: 'Expert Articles', description: 'Evidence-based articles written by OBs, midwives, and maternal health specialists.' },
  { icon: '👩‍⚕️', title: 'Find Doctors', description: 'Browse and connect with top OB-GYNs, midwives, and maternal-fetal medicine specialists.' },
  { icon: '🤖', title: 'AI Chat Support', description: '24/7 AI assistant for general pregnancy questions. Always available when you need guidance.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 60%, #fdf2f8 100%)',
          padding: '5rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌸</div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#9d174d',
              lineHeight: 1.2,
              marginBottom: '1.25rem',
              letterSpacing: '-0.025em',
            }}
          >
            Your Pregnancy Journey,{' '}
            <span style={{ color: '#ec4899' }}>Beautifully Supported</span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: '#be185d',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
            }}
          >
            Join thousands of expectant mothers in our caring community. Get expert guidance,
            connect with doctors, and find support every step of your pregnancy.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/forum"
              style={{
                padding: '0.875rem 2rem',
                background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
                color: 'white',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(236,72,153,0.3)',
              }}
            >
              Join the Community 💬
            </Link>
            <Link
              href="/articles"
              style={{
                padding: '0.875rem 2rem',
                background: 'white',
                color: '#be185d',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
                border: '2px solid #fbcfe8',
              }}
            >
              Read Articles 📚
            </Link>
          </div>
        </div>
      </section>

      {/* Pregnancy Calculator */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fdf2f8' }}>
        <WeekCalculator />
      </section>

      {/* Recommendation Cards */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#9d174d', marginBottom: '0.75rem' }}>
            Curated for You
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.0625rem' }}>
            Expert resources tailored for every stage of your pregnancy journey
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {recommendationCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  background: 'white',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: '1.5px solid #fbcfe8',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  height: '100%',
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-4px)'
                  el.style.boxShadow = '0 12px 32px rgba(249,168,212,0.25)'
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = 'none'
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: card.tagColor,
                    backgroundColor: card.tagBg,
                    marginBottom: '0.75rem',
                  }}
                >
                  {card.tag}
                </span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.625rem' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65 }}>
                  {card.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fdf2f8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#9d174d', marginBottom: '0.75rem' }}>
              Everything You Need
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.0625rem' }}>
              A complete pregnancy support platform in one place
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                style={{
                  background: 'white',
                  borderRadius: '1.25rem',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  border: '1.5px solid #fbcfe8',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', lineHeight: 1.65 }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#9d174d', marginBottom: '1rem' }}>
            Start Your Journey Today 🌸
          </h2>
          <p style={{ color: '#be185d', fontSize: '1.0625rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Join our caring community of expectant mothers and get the support you deserve.
          </p>
          <Link
            href="/chat"
            style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: 600,
              fontSize: '1.0625rem',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(236,72,153,0.3)',
              display: 'inline-block',
            }}
          >
            Chat with AI Assistant 🤖
          </Link>
        </div>
      </section>
    </div>
  )
}
