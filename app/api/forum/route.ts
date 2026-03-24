import { NextResponse } from 'next/server'

const mockPosts = [
  {
    id: 1,
    title: 'First trimester tips - what helped me survive!',
    content: 'Hello everyone! Ginger tea was a lifesaver for morning sickness. Small, frequent meals helped too.',
    author: 'Sarah_mama',
    category: 'First Trimester',
    tags: 'First Trimester,Morning Sickness,Tips',
    likes: 42,
    createdAt: new Date('2024-11-15').toISOString(),
  },
  {
    id: 2,
    title: 'Nutrition guide for second trimester',
    content: 'I am in my 20th week and my OB told me I need to increase my iron intake.',
    author: 'NutritionMom2024',
    category: 'Nutrition',
    tags: 'Nutrition,Second Trimester,Iron',
    likes: 38,
    createdAt: new Date('2024-11-20').toISOString(),
  },
  {
    id: 3,
    title: 'Safe exercises for pregnancy - my routine at 28 weeks',
    content: 'I do 30 minutes of prenatal yoga every morning followed by a 20-minute walk.',
    author: 'ActiveMommy',
    category: 'Exercise',
    tags: 'Exercise,Third Trimester,Yoga',
    likes: 55,
    createdAt: new Date('2024-11-22').toISOString(),
  },
]

export async function GET() {
  return NextResponse.json({ posts: mockPosts })
}

export async function POST(request: Request) {
  const body = await request.json()
  const newPost = {
    id: Date.now(),
    title: body.title,
    content: body.content,
    author: body.author || 'Anonymous',
    category: body.category || 'General',
    tags: body.tags || '',
    likes: 0,
    createdAt: new Date().toISOString(),
  }
  return NextResponse.json({ post: newPost }, { status: 201 })
}
