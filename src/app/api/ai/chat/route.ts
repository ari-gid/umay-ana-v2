import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const lowerMessage = message.toLowerCase()

    let response = ''

    if (lowerMessage.includes('nausea') || lowerMessage.includes('morning sickness')) {
      response = `Morning sickness is very common, especially in the first trimester. Here are some tips that may help:

🍋 **Try these remedies:**
- Eat small, frequent meals throughout the day
- Avoid spicy, fatty, or strong-smelling foods
- Try ginger tea or ginger candies
- Stay hydrated with small sips of water or clear broth
- Eat crackers before getting out of bed

🌿 **Lifestyle tips:**
- Get plenty of rest
- Fresh air and light walks can help
- Acupressure wristbands (Sea-Bands) may provide relief

⚠️ **When to call your doctor:** If you can't keep any food or liquid down for 24+ hours, contact your healthcare provider immediately — this could be hyperemesis gravidarum.`
    } else if (lowerMessage.includes('nutrition') || lowerMessage.includes('eat') || lowerMessage.includes('food') || lowerMessage.includes('diet')) {
      response = `Great nutrition during pregnancy is so important! Here's what to focus on:

🥗 **Key nutrients:**
- **Folic acid** (400-800 mcg/day): leafy greens, fortified cereals, beans
- **Iron** (27 mg/day): lean red meat, spinach, lentils
- **Calcium** (1,000 mg/day): dairy, fortified plant milks, broccoli
- **DHA/Omega-3**: fatty fish (salmon, sardines), walnuts, flaxseed
- **Protein**: eggs, poultry, legumes, tofu

🚫 **Foods to avoid:**
- Raw or undercooked meats and seafood
- High-mercury fish (shark, swordfish, king mackerel)
- Unpasteurized dairy and juices
- Raw sprouts
- Excessive caffeine (limit to 200mg/day)

💊 Take your prenatal vitamins daily! They fill in nutritional gaps.`
    } else if (lowerMessage.includes('exercise') || lowerMessage.includes('workout') || lowerMessage.includes('sport')) {
      response = `Exercise during pregnancy is generally very beneficial! Here's what's safe and recommended:

✅ **Safe exercises:**
- Walking (one of the best pregnancy exercises!)
- Swimming and water aerobics
- Prenatal yoga and pilates
- Stationary cycling
- Low-impact aerobics

⚠️ **Exercises to avoid:**
- Contact sports or activities with fall risk
- Hot yoga (risk of overheating)
- Exercises lying flat on your back after 20 weeks
- High-altitude activities

🎯 **General guidelines:**
- Aim for 150 minutes of moderate activity per week
- Always warm up and cool down
- Stay hydrated
- Listen to your body — stop if you feel pain, dizziness, or shortness of breath

Always consult your OB/GYN before starting a new exercise program during pregnancy.`
    } else if (lowerMessage.includes('sleep') || lowerMessage.includes('insomnia')) {
      response = `Sleep challenges are very common during pregnancy. Here's how to improve your rest:

🛌 **Sleep positions:**
- Second and third trimester: Sleep on your left side (improves circulation to baby)
- Use a pregnancy pillow between your knees and under your belly for support

💤 **Tips for better sleep:**
- Establish a consistent bedtime routine
- Avoid screens 1 hour before bed
- Keep your room cool and dark
- Limit fluids 2-3 hours before bed to reduce nighttime bathroom trips
- Try gentle stretching or prenatal yoga before bed
- A warm (not hot) bath can be relaxing

🌿 **Natural remedies:**
- Chamomile tea (in moderation)
- Lavender aromatherapy
- Progressive muscle relaxation

If insomnia is severe or persistent, discuss safe sleep aids with your doctor.`
    } else if (lowerMessage.includes('trimester') || lowerMessage.includes('week') || lowerMessage.includes('development')) {
      response = `Here's a quick overview of pregnancy by trimester:

🌱 **First Trimester (Weeks 1-13):**
- Baby's major organs and systems begin forming
- Morning sickness is most common
- You may feel very fatigued
- Important: take folic acid, avoid alcohol/smoking

🌸 **Second Trimester (Weeks 14-27):**
- Often called the "honeymoon phase" — energy returns!
- Baby starts moving (you'll feel it around weeks 16-22)
- Baby bump becomes visible
- Anatomy scan ultrasound around week 20

🌺 **Third Trimester (Weeks 28-40):**
- Baby gains weight rapidly
- You may feel Braxton Hicks contractions
- Nesting instinct often kicks in
- Prepare your birth plan and hospital bag
- Weekly OB visits start around week 36

Every pregnancy is unique! Your doctor is your best resource for personalized guidance.`
    } else if (lowerMessage.includes('pain') || lowerMessage.includes('back') || lowerMessage.includes('ache')) {
      response = `Back pain and discomfort are very common during pregnancy. Here's how to manage them:

💆 **Relief strategies:**
- Prenatal massage from a certified therapist
- Warm (not hot) compress on sore areas
- Gentle stretching and prenatal yoga
- Swimming — the water supports your weight

🏃 **Posture tips:**
- Stand with feet slightly apart, weight balanced
- Avoid standing for long periods
- Use a pregnancy support belt if recommended by your doctor
- Sleep with a pillow between your knees

🪑 **Ergonomic tips:**
- Use a chair with good lumbar support
- Keep your feet elevated slightly when sitting
- Avoid high heels

⚠️ **See your doctor if:**
- Pain is severe or sudden
- Pain radiates down your leg (sciatica)
- You have any bleeding or contractions with the pain`
    } else if (lowerMessage.includes('mental health') || lowerMessage.includes('anxiety') || lowerMessage.includes('depression') || lowerMessage.includes('stress')) {
      response = `Your mental health during pregnancy is just as important as your physical health. You're not alone. 💕

🧠 **Common feelings:**
- Anxiety and worry about baby's health
- Mood swings due to hormonal changes
- Feeling overwhelmed about upcoming changes
- Prenatal depression affects 1 in 5 pregnant women

💛 **Coping strategies:**
- Talk to someone you trust — partner, friend, or family
- Practice mindfulness and deep breathing
- Join a prenatal support group
- Limit news and social media if it increases anxiety
- Regular gentle exercise helps boost mood
- Maintain a routine

🆘 **Please reach out if you:**
- Feel hopeless or unable to cope
- Have thoughts of harming yourself
- Are unable to eat, sleep, or function

Talk to your OB/GYN, midwife, or a mental health professional. Therapy and medication options are available and safe during pregnancy.`
    } else if (lowerMessage.includes('birth') || lowerMessage.includes('labor') || lowerMessage.includes('contraction') || lowerMessage.includes('delivery')) {
      response = `Preparing for birth is exciting! Here's what to know:

🏥 **Signs of labor:**
- Regular contractions that get closer together and more intense
- Water breaking (can be a gush or a slow trickle)
- Bloody show (pink or blood-tinged discharge)
- Strong lower back pain

📋 **Birth plan considerations:**
- Pain management preferences (epidural, natural, etc.)
- Who you want in the room
- Skin-to-skin contact after birth
- Cord cutting and clamping
- Feeding preferences

🧳 **Hospital bag essentials:**
- ID and insurance cards
- Birth plan copies
- Comfortable clothes and toiletries
- Snacks for labor support person
- Car seat (installed before birth!)
- Outfit for baby going home

💨 **Pain management options:**
- Epidural (most common)
- Nitrous oxide
- IV pain medication
- Natural methods: breathing, movement, hydrotherapy

Discuss your birth preferences with your OB or midwife in advance!`
    } else {
      response = `Hello! I'm your BloomCare pregnancy assistant. 🌸 I'm here to support you throughout your pregnancy journey.

I can help you with information about:
- 🤢 **Morning sickness & nausea relief**
- 🥗 **Nutrition and what to eat**
- 🏃 **Safe exercises during pregnancy**
- 😴 **Sleep tips and positions**
- 📅 **Trimester by trimester development**
- 💪 **Managing aches and pains**
- 🧠 **Mental health and emotional wellbeing**
- 🏥 **Labor, birth, and delivery**

What would you like to know about today? Remember, for medical advice specific to your pregnancy, always consult your healthcare provider.`
    }

    return NextResponse.json({ response })
  } catch (error) {
    console.error('AI chat error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
