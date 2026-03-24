import { NextResponse } from 'next/server'

const responses: Record<string, string> = {
  nausea:
    'Morning sickness is very common in the first trimester, affecting up to 80% of pregnant women. Try eating small, frequent meals, ginger tea or ginger candies, and keeping crackers nearby. Staying hydrated is also important. If vomiting is severe or you cannot keep fluids down, please contact your healthcare provider, as this may be hyperemesis gravidarum.',
  exercise:
    'Exercise during pregnancy is generally very beneficial! Walking, swimming, and prenatal yoga are excellent low-impact options. Aim for about 150 minutes of moderate-intensity activity per week. Always listen to your body, stay hydrated, and avoid exercises lying flat on your back after the first trimester. Please check with your OB or midwife before starting any new exercise routine.',
  nutrition:
    'Great question about nutrition! During pregnancy, focus on getting enough folic acid (400-800 mcg daily), iron, calcium, and omega-3 fatty acids. Eat a variety of colorful fruits and vegetables, lean proteins, whole grains, and dairy or dairy alternatives. Avoid raw fish, unpasteurized cheeses, and limit caffeine to under 200mg per day. Your prenatal vitamin fills important gaps!',
  sleep:
    'Sleep challenges are very common during pregnancy! For better sleep, try sleeping on your left side (which improves blood flow to the baby), use a pregnancy pillow for support, keep your bedroom cool, limit fluids before bedtime to reduce nighttime bathroom trips, and practice a relaxing bedtime routine. If you have severe insomnia, speak with your healthcare provider.',
  pain:
    'Back pain is one of the most common pregnancy complaints. To help relieve it: maintain good posture, wear supportive shoes, use a pregnancy pillow, apply warm compresses, and try gentle prenatal yoga or stretching. Prenatal massage from a certified therapist can also provide relief. Always mention pain to your healthcare provider, especially if it is sudden or severe.',
  default:
    'Thank you for your question! I am here to help with general pregnancy information. For personalized medical advice tailored to your specific situation, please consult with your OB-GYN, midwife, or healthcare provider. Is there a specific topic about pregnancy I can help you learn more about?',
}

function getMockResponse(message: string): string {
  const lower = message.toLowerCase()
  if (lower.includes('nausea') || lower.includes('morning sickness') || lower.includes('vomit'))
    return responses.nausea
  if (lower.includes('exercise') || lower.includes('workout') || lower.includes('yoga') || lower.includes('walk'))
    return responses.exercise
  if (lower.includes('eat') || lower.includes('food') || lower.includes('nutrition') || lower.includes('diet'))
    return responses.nutrition
  if (lower.includes('sleep') || lower.includes('insomnia') || lower.includes('tired'))
    return responses.sleep
  if (lower.includes('pain') || lower.includes('back') || lower.includes('ache') || lower.includes('hurt'))
    return responses.pain
  return responses.default
}

export async function POST(request: Request) {
  const body = await request.json()
  const { message } = body

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  const reply = getMockResponse(message)
  return NextResponse.json({
    role: 'assistant',
    content: reply,
    timestamp: new Date().toISOString(),
  })
}
