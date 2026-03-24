'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  readingTime: number;
  coverEmoji: string;
  coverColor: string;
}

const mockArticles: Article[] = [
  {
    id: 1,
    title: 'What to Eat in the First Trimester: A Complete Nutrition Guide',
    excerpt:
      'The first trimester is a critical period for fetal development. We break down the key nutrients, foods to focus on, and what to avoid in these early weeks.',
    category: 'Nutrition',
    author: 'Dr. Ayşe Kaya, RD',
    readingTime: 8,
    coverEmoji: '🥦',
    coverColor: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  },
  {
    id: 2,
    title: 'Prenatal Yoga: The 10 Best Poses for Every Trimester',
    excerpt:
      'Yoga during pregnancy can relieve back pain, improve sleep, and prepare your body for labour. Here are the safest and most effective poses trimester by trimester.',
    category: 'Exercise',
    author: 'Elif Şahin, Pre/Postnatal Trainer',
    readingTime: 6,
    coverEmoji: '🧘‍♀️',
    coverColor: 'linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%)',
  },
  {
    id: 3,
    title: 'Managing Pregnancy Anxiety: Evidence-Based Strategies',
    excerpt:
      'Feeling anxious during pregnancy is more common than you might think. Discover evidence-based strategies from perinatal mental health specialists.',
    category: 'Mental Health',
    author: 'Dr. Selin Demir, Psychologist',
    readingTime: 10,
    coverEmoji: '🌿',
    coverColor: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)',
  },
  {
    id: 4,
    title: 'Your Baby at 20 Weeks: Development Milestones',
    excerpt:
      "The halfway point! At 20 weeks your baby can hear your voice, move purposefully, and is developing remarkable complexity. Here's what's happening inside.",
    category: 'Baby Development',
    author: 'Dr. Murat Öztürk, OB-GYN',
    readingTime: 5,
    coverEmoji: '👶',
    coverColor: 'linear-gradient(135deg, #fbcfe8 0%, #fce7f3 100%)',
  },
  {
    id: 5,
    title: 'Writing Your Birth Plan: A Step-by-Step Guide',
    excerpt:
      "A birth plan helps you communicate your wishes to your healthcare team. We'll walk you through every section with prompts, examples, and tips from midwives.",
    category: 'Birth Preparation',
    author: 'Zeynep Arslan, Certified Midwife',
    readingTime: 12,
    coverEmoji: '📋',
    coverColor: 'linear-gradient(135deg, #f9a8d4 0%, #fbcfe8 100%)',
  },
  {
    id: 6,
    title: 'Iron Deficiency in Pregnancy: Causes, Symptoms & Solutions',
    excerpt:
      'Anaemia is one of the most common pregnancy complications. Learn how to identify the signs early, which foods boost iron absorption, and when to consider supplements.',
    category: 'Nutrition',
    author: 'Dr. Ayşe Kaya, RD',
    readingTime: 7,
    coverEmoji: '🩸',
    coverColor: 'linear-gradient(135deg, #fce7f3 0%, #ec4899 30%, #fbcfe8 100%)',
  },
];

const categories = [
  'All',
  'Nutrition',
  'Exercise',
  'Mental Health',
  'Baby Development',
  'Birth Preparation',
];

const categoryBadgeColor: Record<string, string> = {
  Nutrition: '#10b981',
  Exercise: '#3b82f6',
  'Mental Health': '#8b5cf6',
  'Baby Development': '#f59e0b',
  'Birth Preparation': '#ec4899',
};

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const filtered = mockArticles.filter((a) => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === '' ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf2f8',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
          padding: '48px 24px 40px',
          textAlign: 'center',
          borderBottom: '1px solid #fbcfe8',
        }}
      >
        <h1
          style={{
            fontSize: '2.25rem',
            fontWeight: 800,
            color: '#9d174d',
            margin: '0 0 12px',
            letterSpacing: '-0.5px',
          }}
        >
          Articles & Guides 📖
        </h1>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#be185d',
            margin: '0 auto 28px',
            maxWidth: 520,
          }}
        >
          Evidence-based articles written by healthcare professionals to support you every step of
          the way.
        </p>

        {/* Search */}
        <div style={{ maxWidth: 440, margin: '0 auto', position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1rem',
              pointerEvents: 'none',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 9999,
              border: '2px solid #fbcfe8',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              outline: 'none',
              backgroundColor: '#fff',
              color: '#374151',
              boxSizing: 'border-box',
              boxShadow: '0 2px 8px rgba(236,72,153,0.1)',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const isHov = hoveredCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                onMouseEnter={() => setHoveredCat(cat)}
                onMouseLeave={() => setHoveredCat(null)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 9999,
                  border: isActive ? '2px solid #ec4899' : '2px solid #fbcfe8',
                  backgroundColor: isActive ? '#ec4899' : isHov ? '#fce7f3' : '#fff',
                  color: isActive ? '#fff' : '#be185d',
                  fontSize: '0.87rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p style={{ color: '#be185d', fontSize: '0.9rem', marginBottom: 24, fontWeight: 500 }}>
          {filtered.length} article{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {filtered.map((article) => {
            const isHov = hoveredCard === article.id;
            const badgeColor = categoryBadgeColor[article.category] ?? '#ec4899';
            return (
              <Link
                key={article.id}
                href={`/articles/${article.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div
                  onMouseEnter={() => setHoveredCard(article.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 18,
                    border: isHov ? '1.5px solid #f9a8d4' : '1.5px solid #fce7f3',
                    overflow: 'hidden',
                    boxShadow: isHov
                      ? '0 10px 28px rgba(236,72,153,0.15)'
                      : '0 2px 8px rgba(236,72,153,0.06)',
                    transition: 'all 0.2s ease',
                    transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Cover */}
                  <div
                    style={{
                      background: article.coverColor,
                      height: 130,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3.5rem',
                    }}
                  >
                    {article.coverEmoji}
                  </div>

                  {/* Body */}
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Category badge */}
                    <span
                      style={{
                        display: 'inline-block',
                        backgroundColor: `${badgeColor}18`,
                        color: badgeColor,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 12px',
                        borderRadius: 9999,
                        marginBottom: 10,
                        border: `1px solid ${badgeColor}30`,
                        alignSelf: 'flex-start',
                      }}
                    >
                      {article.category}
                    </span>

                    <h2
                      style={{
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#9d174d',
                        margin: '0 0 10px',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h2>

                    <p
                      style={{
                        color: '#6b7280',
                        fontSize: '0.855rem',
                        lineHeight: 1.6,
                        margin: '0 0 16px',
                        flex: 1,
                      }}
                    >
                      {article.excerpt}
                    </p>

                    {/* Footer */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 12,
                        borderTop: '1px solid #fce7f3',
                        fontSize: '0.8rem',
                        color: '#be185d',
                        fontWeight: 500,
                      }}
                    >
                      <span>✍️ {article.author}</span>
                      <span>⏱ {article.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: '#be185d',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: '1rem' }}>No articles match your search. Try different keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
