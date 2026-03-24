import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Users
  const user1 = await prisma.user.upsert({
    where: { email: 'sarah@example.com' },
    update: {},
    create: { email: 'sarah@example.com', password: await bcrypt.hash('password123', 12), name: 'Sarah Johnson' },
  })
  const user2 = await prisma.user.upsert({
    where: { email: 'emma@example.com' },
    update: {},
    create: { email: 'emma@example.com', password: await bcrypt.hash('password123', 12), name: 'Emma Williams' },
  })

  // Pregnancy profiles
  const lmp1 = new Date(); lmp1.setDate(lmp1.getDate() - 140)
  await prisma.pregnancyProfile.upsert({
    where: { userId: user1.id },
    update: {},
    create: { userId: user1.id, lmpDate: lmp1, dueDate: new Date(lmp1.getTime() + 280*24*60*60*1000), currentWeek: 20, trimester: 2 },
  })

  // Articles
  const articles = [
    { title: 'Essential Nutrients for Your First Trimester', content: 'The first trimester is a critical time for your baby\'s development. During weeks 1-13, your baby\'s neural tube, heart, and major organs begin to form.\n\nFolic acid is perhaps the most important nutrient in early pregnancy. It helps prevent neural tube defects and should be taken before conception through the first trimester. Aim for 400-800 mcg daily from foods like leafy greens, legumes, and fortified cereals.\n\nIron supports the increased blood production needed during pregnancy. Good sources include lean red meat, spinach, lentils, and fortified cereals. Pair iron-rich foods with vitamin C for better absorption.\n\nCalcium is essential for your baby\'s developing bones and teeth. Dairy products, fortified plant milks, and leafy greens are excellent sources.\n\nStay hydrated! Aim for 8-10 glasses of water daily. Proper hydration helps prevent urinary tract infections, constipation, and swelling.', summary: 'Discover the key vitamins and minerals your baby needs in the first 13 weeks of pregnancy.', trimester: 1, topic: 'nutrition', readingTime: 5, author: 'Dr. Maria Chen' },
    { title: 'Safe Exercise Guide for Second Trimester', content: 'The second trimester is often called the "sweet spot" of pregnancy. Morning sickness typically subsides, energy returns, and your bump is growing but not yet too large to be uncomfortable.\n\nThis is an ideal time to establish a regular exercise routine. Aim for at least 150 minutes of moderate-intensity aerobic activity per week.\n\nWalking is one of the safest and most beneficial exercises during pregnancy. It\'s low-impact, requires no equipment, and can be done anywhere. Start with 20-30 minute walks and gradually increase.\n\nSwimming and water aerobics are excellent choices as the water supports your growing belly and reduces joint stress. Many pools offer prenatal swim classes.\n\nPrenatal yoga improves flexibility, builds strength, and teaches breathing techniques that will be valuable during labor. Look for classes specifically designed for pregnancy.\n\nAvoid exercises that involve lying flat on your back after 20 weeks, as this can compress a major blood vessel and reduce blood flow to the baby. Also avoid high-impact sports with fall risk or contact sports.', summary: 'The second trimester is perfect for staying active. Here\'s your complete guide to safe workouts.', trimester: 2, topic: 'exercise', readingTime: 7, author: 'Dr. Lisa Park' },
    { title: 'Managing Pregnancy Anxiety and Stress', content: 'Pregnancy is a time of joy, but it can also bring significant anxiety and stress. Many women experience worry about their baby\'s health, upcoming labor, financial concerns, and life changes.\n\nIt\'s important to know that some anxiety is normal during pregnancy. However, when worry becomes overwhelming or interferes with daily functioning, it\'s time to seek help.\n\nMindfulness meditation can be highly effective for pregnancy anxiety. Even 10 minutes of daily meditation can reduce stress hormones and improve overall wellbeing.\n\nTherapy, particularly Cognitive Behavioral Therapy (CBT), can help you identify and challenge anxious thought patterns. Many therapists now offer telehealth sessions, making it more accessible.\n\nBuilding a strong support network is crucial. Connect with your partner, family, friends, and other expecting mothers. Online forums and local prenatal groups can also provide community.\n\nRegular gentle exercise releases endorphins that naturally combat anxiety and depression. Even a short walk can shift your mood significantly.\n\nRemember: seeking help is a sign of strength, not weakness. Untreated anxiety and depression during pregnancy can have effects on both mother and baby, so early intervention is important.', summary: 'Practical strategies for managing anxiety and emotional wellbeing throughout your pregnancy.', trimester: null, topic: 'mental-health', readingTime: 6, author: 'Dr. Rachel Adams' },
    { title: 'Your Third Trimester: What to Expect', content: 'The third trimester spans weeks 28-40 (or beyond). Your baby is growing rapidly, gaining weight and developing the fat stores that will help regulate body temperature after birth.\n\nPhysical changes become more pronounced. You may experience Braxton Hicks contractions — irregular, painless tightening of the uterus. These practice contractions help prepare your body for labor.\n\nSleep may become more challenging as your belly grows. Sleep on your left side to improve circulation and reduce pressure on your liver. A pregnancy pillow can provide much-needed support.\n\nUrinary frequency increases as the baby descends and puts more pressure on your bladder. Stay hydrated despite this — dehydration can trigger premature contractions.\n\nStarting around week 36, your OB will likely schedule weekly check-ups. They will check the baby\'s position and your cervix\'s readiness for labor.\n\nPrepare your birth plan and hospital bag. Include your ID and insurance cards, comfortable clothing, toiletries, snacks for your support person, and an outfit for your newborn.\n\nNesting instincts often kick in during the third trimester. Channel this energy productively but avoid overexerting yourself — rest is equally important.', summary: 'A comprehensive guide to navigating the final stretch of pregnancy with confidence.', trimester: 3, topic: 'medical', readingTime: 8, author: 'Dr. Jennifer Lee' },
    { title: 'Eating Well: Pregnancy Superfoods', content: 'Certain foods are particularly nutrient-dense and beneficial during pregnancy. Incorporating these "superfoods" can help ensure you and your baby get optimal nutrition.\n\nSalmon is rich in DHA, an omega-3 fatty acid crucial for your baby\'s brain and eye development. Aim for 2-3 servings per week of low-mercury fish. Avoid raw or undercooked fish.\n\nLeafy greens like spinach, kale, and Swiss chard are packed with folate, iron, calcium, and vitamin K. Add them to smoothies, salads, and cooked dishes.\n\nEggs are a complete protein source containing choline, which supports brain development. They\'re also versatile and easy to prepare.\n\nBerries are antioxidant powerhouses that also provide vitamin C, fiber, and hydration. Blueberries, strawberries, and raspberries are all excellent choices.\n\nSweet potatoes are rich in beta-carotene (which converts to vitamin A), potassium, and fiber. They\'re also a great source of complex carbohydrates for sustained energy.\n\nGreek yogurt provides calcium, protein, and probiotics that support digestive health. Choose plain varieties and add your own fruit to control sugar intake.\n\nLegumes including lentils, chickpeas, and black beans are excellent plant-based sources of protein, folate, iron, and fiber. They\'re also budget-friendly and filling.', summary: 'The top nutrient-rich foods to include in your pregnancy diet for optimal baby development.', trimester: null, topic: 'nutrition', readingTime: 6, author: 'Dr. Maria Chen' },
    { title: 'Understanding Your Prenatal Tests', content: 'Prenatal testing helps monitor both your health and your baby\'s development throughout pregnancy. Understanding what each test involves can help reduce anxiety.\n\nFirst trimester screening (weeks 10-13) includes a nuchal translucency ultrasound and blood tests. This combination screens for chromosomal conditions like Down syndrome and trisomy 18.\n\nThe NIPT (Non-Invasive Prenatal Test) is a blood test available from week 10 that analyzes fetal DNA in the mother\'s blood. It can detect chromosomal conditions with high accuracy.\n\nThe anatomy scan (week 20) is a detailed ultrasound that checks the baby\'s development, organs, and position. It can also reveal the sex of the baby if you choose to know.\n\nThe glucose screening test (weeks 24-28) checks for gestational diabetes. You\'ll drink a sugary beverage and have blood drawn an hour later to measure blood sugar levels.\n\nGroup B Strep (GBS) testing occurs around weeks 35-37. A vaginal and rectal swab checks for GBS bacteria, which is common and treatable but can affect newborns during delivery.\n\nBiophysical profile and non-stress tests may be performed in the third trimester if there are any concerns about the baby\'s wellbeing. These monitor the baby\'s heart rate and movement.', summary: 'A clear explanation of all the prenatal tests you can expect throughout your pregnancy.', trimester: null, topic: 'medical', readingTime: 7, author: 'Dr. Jennifer Lee' },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }

  // Doctors
  const doctors = [
    { name: 'Dr. Emily Rodriguez', specialization: 'OB-GYN', city: 'New York', rating: 4.9, bio: 'Board-certified OB-GYN with 15 years of experience in high-risk pregnancies and natural birth support.', phone: '+1 (212) 555-0101', hospital: 'Mount Sinai Hospital' },
    { name: 'Dr. Sarah Kim', specialization: 'Maternal-Fetal Medicine', city: 'Los Angeles', rating: 4.8, bio: 'Specialist in high-risk pregnancies with expertise in prenatal diagnosis and fetal interventions.', phone: '+1 (310) 555-0202', hospital: 'Cedars-Sinai Medical Center' },
    { name: 'Dr. Priya Patel', specialization: 'OB-GYN', city: 'Chicago', rating: 4.7, bio: 'Passionate about empowering women through education and personalized prenatal care. Specializes in natural birth.', phone: '+1 (312) 555-0303', hospital: 'Northwestern Medicine' },
    { name: 'Dr. Hannah Thompson', specialization: 'Midwife', city: 'Seattle', rating: 4.9, bio: 'Certified nurse midwife with 12 years of experience supporting natural and home births. Holistic approach to care.', phone: '+1 (206) 555-0404', hospital: 'UW Medical Center' },
    { name: 'Dr. Maria Santos', specialization: 'OB-GYN', city: 'Miami', rating: 4.6, bio: 'Bilingual OB-GYN specializing in prenatal nutrition and exercise guidance. Committed to evidence-based care.', phone: '+1 (305) 555-0505', hospital: 'Jackson Memorial Hospital' },
    { name: 'Dr. Jennifer Walsh', specialization: 'Perinatologist', city: 'Boston', rating: 4.8, bio: 'Expert in managing complex pregnancies with chronic conditions. Research focus on preterm birth prevention.', phone: '+1 (617) 555-0606', hospital: 'Brigham and Women\'s Hospital' },
  ]

  for (const doctor of doctors) {
    await prisma.doctor.create({ data: doctor })
  }

  // Forum posts
  const posts = [
    { title: 'Morning sickness in week 8 - any tips?', content: 'Hi everyone! I\'m 8 weeks pregnant and the morning sickness is really getting to me. It\'s not just in the morning — it\'s all day long! I\'ve tried ginger tea and eating crackers before getting up, but I still feel nauseous most of the time.\n\nDid anyone else struggle with this? What helped you get through it? I have to be at work and it\'s really hard to concentrate when I feel sick all the time.', tags: 'first-trimester,symptoms,morning-sickness', authorId: user1.id },
    { title: 'What to pack in your hospital bag - my complete list!', content: 'I\'m 36 weeks and finally packed my hospital bag. It took me weeks of research so I wanted to share my list with everyone!\n\nFor mom: comfortable loose clothing, slippers, toiletries, phone charger, snacks, birth plan copies, insurance cards, a robe for walking around.\n\nFor baby: 2-3 onesies in newborn AND 0-3 month sizes (babies are sometimes bigger than expected!), a going-home outfit, a car seat (installed before you go!).\n\nFor partner: their own snacks, change of clothes, phone charger, pillow if the hospital ones are uncomfortable.\n\nDon\'t forget: your birth playlist if you have one, essential oils if you like them, and a comfort object for during labor.', tags: 'third-trimester,birth-plan,preparation', authorId: user2.id },
    { title: 'Second trimester energy boost is REAL', content: 'Just wanted to come here and share some positivity for those struggling in the first trimester!\n\nI\'m now 18 weeks and the difference from weeks 6-12 is incredible. I finally have energy again, the nausea is completely gone, and I feel so much more like myself.\n\nFor those who are in the exhausted/sick phase right now — it really does get better for most people. The second trimester felt like a new lease on life for me. I\'ve been going for walks every day and actually cooking meals again!\n\nAnyone else experiencing this second trimester revival? ��', tags: 'second-trimester,positive,energy', authorId: user1.id },
    { title: 'Anyone else dealing with pregnancy insomnia?', content: 'I\'m 30 weeks pregnant and sleep has become nearly impossible. Between the frequent bathroom trips, the back pain, not being able to get comfortable, and my brain just NOT shutting off with worries about the birth and everything after...\n\nI\'ve tried pregnancy pillows, white noise, cutting off screens an hour before bed, warm baths. Some of these help a little but I\'m still waking up multiple times per night and struggling to fall back asleep.\n\nMy doctor says it\'s normal but I\'m exhausted. Has anyone found something that really works? Any advice welcome! 😴', tags: 'third-trimester,sleep,insomnia', authorId: user2.id },
  ]

  const createdPosts = []
  for (const post of posts) {
    const p = await prisma.forumPost.create({ data: post })
    createdPosts.push(p)
  }

  // Comments
  await prisma.forumComment.create({ data: { content: 'I felt the same way! What helped me most was eating small amounts every 2 hours rather than big meals. Also, try keeping plain crackers on your nightstand and eating them before even sitting up. Vitamin B6 supplements also helped me a lot — ask your doctor about it!', postId: createdPosts[0].id, authorId: user2.id } })
  await prisma.forumComment.create({ data: { content: 'Ginger chews (not just tea) were a game changer for me. Also Sea-Bands on my wrists! Hang in there, it usually improves around week 12-14. 💕', postId: createdPosts[0].id, authorId: user2.id } })
  await prisma.forumComment.create({ data: { content: 'This is such a helpful list! I would add a hair tie/headband — you\'ll want hair out of your face during labor. And lip balm! I didn\'t realize how dry my lips got from breathing through contractions.', postId: createdPosts[1].id, authorId: user1.id } })
  await prisma.forumComment.create({ data: { content: 'YES! I\'m 20 weeks and feel amazing compared to the first trimester. It really does get better! Hang in there first trimester mamas 🌸', postId: createdPosts[2].id, authorId: user2.id } })

  // Upvotes
  await prisma.forumUpvote.create({ data: { postId: createdPosts[0].id, userId: user2.id } })
  await prisma.forumUpvote.create({ data: { postId: createdPosts[2].id, userId: user2.id } })
  await prisma.forumUpvote.create({ data: { postId: createdPosts[1].id, userId: user1.id } })

  console.log('✅ Seed completed!')
}

main().catch(e => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
