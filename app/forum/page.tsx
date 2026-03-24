'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ForumPost {
  id: number;
  title: string;
  author: string;
  authorEmoji: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  likes: number;
  commentCount: number;
}

const mockPosts: ForumPost[] = [
  {
    id: 1,
    title: 'Morning sickness tips that actually worked for me',
    author: 'Sarah M.',
    authorEmoji: '🌷',
    date: 'June 12, 2025',
    category: 'First Trimester',
    tags: ['morning sickness', 'nausea', 'first trimester tips'],
    excerpt:
      "After weeks of struggling, I finally found a combination of ginger tea, small frequent meals, and sea-bands that made a real difference. Here's what worked for me and what the research says...",
    likes: 142,
    commentCount: 38,
  },
  {
    id: 2,
    title: 'Safe exercises during second trimester – my weekly routine',
    author: 'Priya K.',
    authorEmoji: '🌸',
    date: 'June 10, 2025',
    category: 'Exercise',
    tags: ['exercise', 'second trimester', 'prenatal fitness'],
    excerpt:
      "My OB cleared me for moderate exercise and I've been doing a mix of prenatal yoga, swimming, and gentle walks. I'll break down my weekly schedule and how I've adapted each workout...",
    likes: 98,
    commentCount: 24,
  },
  {
    id: 3,
    title: 'Anxiety during pregnancy – you are not alone',
    author: 'Aisha T.',
    authorEmoji: '💗',
    date: 'June 8, 2025',
    category: 'Mental Health',
    tags: ['anxiety', 'mental health', 'pregnancy emotions'],
    excerpt:
      "Nobody talks about prenatal anxiety as much as postpartum depression, but it's incredibly common. I want to share my experience and the coping strategies that helped me through my third trimester...",
    likes: 217,
    commentCount: 61,
  },
  {
    id: 4,
    title: 'Iron-rich meal ideas for gestational anemia',
    author: 'Mei L.',
    authorEmoji: '🍀',
    date: 'June 6, 2025',
    category: 'Nutrition',
    tags: ['nutrition', 'iron', 'anemia', 'meal ideas'],
    excerpt:
      "My midwife flagged low iron at my 28-week appointment. Since then I've been experimenting with iron-rich recipes that actually taste good. Here are my top 10 go-to meals...",
    likes: 76,
    commentCount: 19,
  },
  {
    id: 5,
    title: 'Birth plan template and what I learned from my first birth',
    author: 'Emma R.',
    authorEmoji: '🌺',
    date: 'June 4, 2025',
    category: 'Birth Preparation',
    tags: ['birth plan', 'labor', 'birth prep'],
    excerpt:
      "Writing a birth plan can feel overwhelming, but having one made me feel so much more in control. I'm sharing the template I used the second time around after learning lessons from my first delivery...",
    likes: 183,
    commentCount: 47,
  },
  {
    id: 6,
    title: 'Baby kicks diary – tracking movement in the third trimester',
    author: 'Zoe B.',
    authorEmoji: '⭐',
    date: 'June 2, 2025',
    category: 'Third Trimester',
    tags: ['baby kicks', 'fetal movement', 'third trimester'],
    excerpt:
      "My doctor recommended kick counts starting at 28 weeks. I started keeping a detailed diary and it not only gave me peace of mind but helped me notice patterns in my baby's activity...",
    likes: 55,
    commentCount: 13,
  },
];

const categories = [
  'All',
  'First Trimester',
  'Second Trimester',
  'Third Trimester',
  'Nutrition',
  'Exercise',
  'Mental Health',
  'Birth Preparation',
];

const tagColors: Record<string, string> = {
  default: '#fce7f3',
};

export default function ForumPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const filtered =
    activeCategory === 'All'
      ? mockPosts
      : mockPosts.filter((p) => p.category === activeCategory);

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
          Community Forum 💬
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#be185d', margin: 0, maxWidth: 520, marginInline: 'auto' }}>
          Ask questions, share experiences, and support each other through this beautiful journey.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        {/* Top bar: filters + new post */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            marginBottom: 28,
          }}
        >
          {/* Category filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const isHovered = hoveredCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  onMouseEnter={() => setHoveredCategory(cat)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: 9999,
                    border: isActive ? '2px solid #ec4899' : '2px solid #fbcfe8',
                    backgroundColor: isActive ? '#ec4899' : isHovered ? '#fce7f3' : '#fff',
                    color: isActive ? '#fff' : '#be185d',
                    fontSize: '0.85rem',
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

          {/* New Post button */}
          <button
            style={{
              padding: '8px 22px',
              borderRadius: 9999,
              border: 'none',
              backgroundColor: '#ec4899',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              flexShrink: 0,
              fontFamily: 'inherit',
              boxShadow: '0 2px 8px rgba(236,72,153,0.3)',
            }}
          >
            + New Post
          </button>
        </div>

        {/* Posts count */}
        <p style={{ color: '#be185d', fontSize: '0.9rem', marginBottom: 20, fontWeight: 500 }}>
          {filtered.length} post{filtered.length !== 1 ? 's' : ''} in{' '}
          <strong>{activeCategory}</strong>
        </p>

        {/* Post cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {filtered.map((post) => {
            const isHovered = hoveredPost === post.id;
            return (
              <div
                key={post.id}
                onMouseEnter={() => setHoveredPost(post.id)}
                onMouseLeave={() => setHoveredPost(null)}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  border: isHovered ? '1.5px solid #f9a8d4' : '1.5px solid #fce7f3',
                  padding: '24px 28px',
                  boxShadow: isHovered
                    ? '0 8px 24px rgba(236,72,153,0.12)'
                    : '0 2px 8px rgba(236,72,153,0.05)',
                  transition: 'all 0.2s ease',
                  transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                }}
              >
                {/* Author row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 12,
                    flexWrap: 'wrap',
                    gap: 8,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: '#fce7f3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                      }}
                    >
                      {post.authorEmoji}
                    </div>
                    <div>
                      <span style={{ fontWeight: 600, color: '#9d174d', fontSize: '0.9rem' }}>
                        {post.author}
                      </span>
                      <span style={{ color: '#f9a8d4', margin: '0 6px' }}>·</span>
                      <span style={{ color: '#be185d', fontSize: '0.82rem' }}>{post.date}</span>
                    </div>
                  </div>
                  {/* Category badge */}
                  <span
                    style={{
                      backgroundColor: '#fce7f3',
                      color: '#be185d',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '3px 12px',
                      borderRadius: 9999,
                      border: '1px solid #fbcfe8',
                    }}
                  >
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <Link
                  href={`/forum/${post.id}`}
                  style={{
                    textDecoration: 'none',
                    color: '#9d174d',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    lineHeight: 1.4,
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {post.title}
                </Link>

                {/* Excerpt */}
                <p
                  style={{
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    margin: '0 0 14px',
                  }}
                >
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: '#fdf2f8',
                        color: '#ec4899',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        padding: '2px 10px',
                        borderRadius: 9999,
                        border: '1px solid #fbcfe8',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer: likes + comments */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                    paddingTop: 12,
                    borderTop: '1px solid #fce7f3',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      color: '#be185d',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    ❤️ {post.likes} likes
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
                      color: '#be185d',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    💬 {post.commentCount} comments
                  </span>
                  <Link
                    href={`/forum/${post.id}`}
                    style={{
                      marginLeft: 'auto',
                      color: '#ec4899',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                    }}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: '#be185d',
              fontSize: '1rem',
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🌸</div>
            <p>No posts in this category yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
