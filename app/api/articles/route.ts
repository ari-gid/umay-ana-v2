import { NextResponse } from 'next/server'

const mockArticles = [
  {
    id: 1,
    title: 'Complete Guide to First Trimester Nutrition',
    excerpt: 'Everything you need to know about eating well during your first trimester.',
    category: 'Nutrition',
    author: 'Dr. Emily Chen',
    readingTime: 8,
    createdAt: new Date('2024-10-01').toISOString(),
  },
  {
    id: 2,
    title: 'Safe Prenatal Exercise: A Complete Guide',
    excerpt: 'Discover which exercises are safe and beneficial during pregnancy.',
    category: 'Exercise',
    author: 'Dr. Maria Rodriguez',
    readingTime: 10,
    createdAt: new Date('2024-10-05').toISOString(),
  },
  {
    id: 3,
    title: "Understanding Your Baby's Development: Weeks 1-40",
    excerpt: "A week-by-week guide to your baby's incredible development.",
    category: 'Baby Development',
    author: 'Dr. James Thompson',
    readingTime: 12,
    createdAt: new Date('2024-10-10').toISOString(),
  },
  {
    id: 4,
    title: 'Mental Wellness During Pregnancy',
    excerpt: 'Practical strategies for maintaining emotional and mental wellness.',
    category: 'Mental Health',
    author: 'Dr. Lisa Park',
    readingTime: 9,
    createdAt: new Date('2024-10-15').toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ articles: mockArticles })
}
