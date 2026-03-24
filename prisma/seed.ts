import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.forumPost.createMany({
    data: [
      {
        title: 'First trimester tips - what helped me survive!',
        content:
          'Hello everyone! I am now in my 14th week and wanted to share what helped me through the rough first trimester. Ginger tea was a lifesaver for morning sickness. Small, frequent meals helped too. I also found that keeping crackers by my bedside for when I woke up made a huge difference. Remember to stay hydrated even if you feel nauseous. Lemon-scented things also helped calm my stomach. I hope these tips help some of you going through the same thing!',
        author: 'Sarah_mama',
        category: 'First Trimester',
        tags: 'First Trimester,Morning Sickness,Tips',
        likes: 42,
      },
      {
        title: 'Nutrition guide for second trimester - what to eat?',
        content:
          'I am in my 20th week and my OB told me I need to increase my iron intake. I have been eating more spinach, lentils, and lean beef. Does anyone have good recipe ideas that are iron-rich but also help with pregnancy cravings? I have been craving sweet things but trying to stay healthy. Also, should I be taking additional supplements beyond my prenatal vitamin?',
        author: 'NutritionMom2024',
        category: 'Nutrition',
        tags: 'Nutrition,Second Trimester,Iron,Supplements',
        likes: 38,
      },
      {
        title: 'Safe exercises for pregnancy - my routine at 28 weeks',
        content:
          'Just wanted to share my current exercise routine at 28 weeks. I do 30 minutes of prenatal yoga every morning, followed by a 20-minute walk in the evenings. My doctor approved swimming twice a week too. I feel so much better when I exercise regularly - less back pain, better sleep, and improved mood. For those wondering, I stopped any exercises lying flat on my back after week 20. Always check with your healthcare provider first!',
        author: 'ActiveMommy',
        category: 'Exercise',
        tags: 'Exercise,Third Trimester,Yoga,Walking',
        likes: 55,
      },
      {
        title: 'Anxiety during pregnancy - how to cope?',
        content:
          'I have been struggling with anxiety throughout my pregnancy. Everything feels so overwhelming - am I eating right, is the baby growing well, will labor go okay? My therapist has been very helpful, and I have started doing mindfulness meditation for 10 minutes every day. Has anyone else dealt with pregnancy anxiety? What helped you? I would love to hear from others who have been through this.',
        author: 'WorriedFirstTimeMom',
        category: 'Mental Health',
        tags: 'Mental Health,Anxiety,First Pregnancy,Mindfulness',
        likes: 61,
      },
      {
        title: 'Baby kicks - when did you first feel them?',
        content:
          'I am 18 weeks with my first pregnancy and I am not sure if what I am feeling is baby kicks or just gas! Everyone says it feels like butterflies or bubbles. I keep waiting for that magical moment. When did first-time moms here feel their first kicks? I know it can be 16-25 weeks for first pregnancies.',
        author: 'WaitingForKicks',
        category: 'Baby Development',
        tags: 'Baby Development,Kicks,Second Trimester,First Pregnancy',
        likes: 29,
      },
      {
        title: 'Hospital bag checklist - 36 weeks and getting ready!',
        content:
          'I am 36 weeks now and finally packed my hospital bag! Here is my checklist: for me - comfortable robe, nursing bras, toiletries, phone charger, snacks, birth plan copies, insurance cards. For baby - 3 onesies in newborn and 0-3 month sizes, swaddle blankets, car seat. For partner - change of clothes, snacks, camera. Am I missing anything important? Would love to hear what others packed!',
        author: 'AlmostThereNow',
        category: 'Birth Preparation',
        tags: 'Birth Preparation,Hospital Bag,Third Trimester',
        likes: 73,
      },
    ],
  })

  const posts = await prisma.forumPost.findMany()

  await prisma.comment.createMany({
    data: [
      {
        content:
          'Thank you for sharing! Ginger candy also helped me a lot. Hang in there, the second trimester gets so much better!',
        author: 'BeenThereMom',
        postId: posts[0].id,
      },
      {
        content:
          'I second the crackers! I kept a stash everywhere - bedside, office desk, car. Saved me so many times.',
        author: 'CrackerQueen',
        postId: posts[0].id,
      },
      {
        content:
          'Peppermint tea also worked wonders for me during my first trimester nausea!',
        author: 'TeaLover_Mama',
        postId: posts[0].id,
      },
      {
        content:
          'Great post! For iron absorption, try eating iron-rich foods with vitamin C sources like orange juice. Avoid coffee or tea with meals as it inhibits iron absorption.',
        author: 'NutritionNurse',
        postId: posts[1].id,
      },
      {
        content:
          'Lentil soup is amazing and so easy to make. I have been eating it twice a week. Also try adding nuts to your snacks for extra nutrients!',
        author: 'HealthyPregnancy',
        postId: posts[1].id,
      },
      {
        content:
          'This is so inspiring! I have been meaning to start prenatal yoga. Did you follow a specific app or YouTube channel?',
        author: 'YogaNewbie',
        postId: posts[2].id,
      },
      {
        content:
          'Pregnancy anxiety is so real and valid. Talking to a therapist was the best thing I did during my second pregnancy. You are not alone!',
        author: 'AnxietyWarrior',
        postId: posts[3].id,
      },
    ],
  })

  await prisma.article.createMany({
    data: [
      {
        title: 'Complete Guide to First Trimester Nutrition',
        content: `The first trimester is a critical time for fetal development, and proper nutrition plays a vital role in supporting both your health and your baby's growth.

**Folic Acid is Essential**
Folic acid (vitamin B9) is crucial during the first trimester as it helps prevent neural tube defects. Aim for 400-800 mcg daily through supplements and folate-rich foods like leafy greens, legumes, and fortified cereals.

**Managing Morning Sickness Through Diet**
Many women experience morning sickness during the first trimester. Small, frequent meals can help stabilize blood sugar and reduce nausea. Try bland, easy-to-digest foods like crackers, toast, or bananas when feeling nauseous.

**Foods to Prioritize**
- Lean proteins: chicken, fish, legumes, eggs
- Calcium-rich foods: dairy, fortified plant milks, leafy greens
- Iron sources: lean red meat, spinach, lentils, fortified cereals
- Omega-3 fatty acids: fatty fish (in safe amounts), walnuts, flaxseeds

**Foods to Avoid**
During pregnancy, avoid raw or undercooked meat, unpasteurized dairy products, high-mercury fish like shark or swordfish, excessive caffeine (limit to 200mg/day), and alcohol entirely.

**Staying Hydrated**
Aim for 8-10 glasses of water daily. Staying hydrated helps prevent constipation, reduces headaches, and supports increased blood volume during pregnancy.

**Taking Prenatal Vitamins**
Even with a healthy diet, prenatal vitamins fill nutritional gaps. Look for vitamins containing folic acid, iron, calcium, vitamin D, and DHA.`,
        excerpt:
          'Everything you need to know about eating well during your first trimester, from folic acid to managing morning sickness.',
        category: 'Nutrition',
        author: 'Dr. Emily Chen',
        readingTime: 8,
      },
      {
        title: 'Safe Prenatal Exercise: A Complete Guide',
        content: `Regular exercise during pregnancy offers numerous benefits for both mother and baby, including improved mood, better sleep, reduced back pain, and easier labor.

**Benefits of Prenatal Exercise**
Exercise during pregnancy can help maintain a healthy weight, reduce the risk of gestational diabetes, lower the chance of preeclampsia, improve cardiovascular health, boost energy levels, and prepare your body for childbirth.

**Safe Exercises During Pregnancy**

*Walking*
Walking is one of the safest and most accessible exercises throughout all trimesters. Aim for 30 minutes most days at a comfortable pace.

*Swimming and Water Aerobics*
The buoyancy of water supports your growing belly while providing a full-body workout. Swimming is gentle on joints and excellent for cardiovascular health.

*Prenatal Yoga*
Yoga improves flexibility, strength, and balance while incorporating breathing techniques useful during labor. Look for prenatal yoga classes specifically designed for pregnant women.

*Low-Impact Aerobics*
Prenatal aerobics classes maintain cardiovascular fitness while minimizing stress on joints. Many gyms offer specialized classes.

**Exercises to Modify or Avoid**
- After 20 weeks, avoid exercises lying flat on your back
- Avoid contact sports and activities with high fall risk
- Skip exercises involving jumping, jarring movements, or rapid direction changes
- Avoid exercising in hot, humid conditions

**Warning Signs to Stop Exercising**
Stop immediately and contact your healthcare provider if you experience: vaginal bleeding, shortness of breath before exertion, dizziness, headache, chest pain, calf pain or swelling, or decreased fetal movement.

Always consult with your healthcare provider before starting or continuing any exercise program during pregnancy.`,
        excerpt:
          'Discover which exercises are safe and beneficial during pregnancy, with guidance for each trimester.',
        category: 'Exercise',
        author: 'Dr. Maria Rodriguez',
        readingTime: 10,
      },
      {
        title: 'Understanding Your Baby\'s Development: Weeks 1-40',
        content: `Pregnancy is an extraordinary journey of development. Here is a week-by-week overview of your baby's remarkable growth.

**First Trimester (Weeks 1-12)**

*Weeks 1-4:* Fertilization occurs and the embryo implants in the uterine wall. The neural tube, which will become the brain and spinal cord, begins to form.

*Weeks 5-8:* The embryo's heart begins beating around week 6. Tiny arm and leg buds appear. Facial features begin to form, including the eyes, nose, and mouth.

*Weeks 9-12:* Your baby is now called a fetus. Fingers and toes are forming. The baby can make small movements. By week 12, all major organs have begun to develop.

**Second Trimester (Weeks 13-26)**

*Weeks 13-16:* The baby can make facial expressions, suck its thumb, and even hiccup. Soft hair called lanugo covers the body. Sex organs are distinguishable on ultrasound.

*Weeks 17-20:* You may feel the first movements (quickening)! The baby is covered in vernix, a waxy protective coating. Hearing develops, and the baby can hear your voice.

*Weeks 21-26:* The baby's brain develops rapidly. Lungs begin developing surfactant, necessary for breathing after birth. The baby responds to light and sound.

**Third Trimester (Weeks 27-40)**

*Weeks 27-30:* The baby opens its eyes and can distinguish light from dark. Rapid brain development continues. The baby gains weight quickly.

*Weeks 31-35:* The baby's bones are fully developed, though the skull remains soft. The immune system develops. Most babies are in head-down position by 36 weeks.

*Weeks 36-40:* The baby is considered full-term at 39 weeks. Final weight gain occurs. The baby is fully prepared for life outside the womb.`,
        excerpt:
          "A week-by-week guide to your baby's incredible development throughout all three trimesters of pregnancy.",
        category: 'Baby Development',
        author: 'Dr. James Thompson',
        readingTime: 12,
      },
      {
        title: 'Mental Wellness During Pregnancy: Caring for Your Mind',
        content: `Pregnancy brings profound physical changes, but emotional and mental wellbeing are equally important for a healthy pregnancy journey.

**Understanding Pregnancy Emotions**
Hormonal changes during pregnancy can significantly affect mood and emotions. It is completely normal to experience a wide range of feelings, from joy and excitement to fear and anxiety. Acknowledging these feelings is the first step toward managing them.

**Common Mental Health Challenges**

*Pregnancy Anxiety*
Many pregnant women experience anxiety about their baby's health, their ability to parent, or the birthing process. Mild anxiety is common, but if it interferes with daily life, seek professional support.

*Prenatal Depression*
Depression during pregnancy affects approximately 10-15% of pregnant women. Symptoms include persistent sadness, loss of interest in activities, changes in sleep or appetite, and difficulty concentrating. This is treatable and you should reach out for help.

**Strategies for Mental Wellness**

*Stay Connected*
Maintain social connections with friends, family, and other expectant parents. Joining a prenatal support group can provide valuable community and understanding.

*Mindfulness and Meditation*
Even 10 minutes of mindfulness practice daily can reduce anxiety and improve overall wellbeing. Prenatal yoga often incorporates mindfulness elements.

*Communicate Openly*
Share your feelings with your partner, a trusted friend, or a therapist. You do not have to navigate pregnancy challenges alone.

*Prioritize Rest*
Sleep is essential for mental health. Establish a relaxing bedtime routine and use pregnancy pillows for comfort as your body changes.

*Limit Stress*
Identify your stress triggers and develop strategies to address them. Delegate tasks when possible and give yourself permission to slow down.

**When to Seek Help**
Contact your healthcare provider if you experience persistent sadness lasting more than two weeks, inability to care for yourself, thoughts of harming yourself or others, or severe anxiety that interferes with daily functioning.`,
        excerpt:
          'Practical strategies for maintaining emotional and mental wellness throughout your pregnancy journey.',
        category: 'Mental Health',
        author: 'Dr. Lisa Park',
        readingTime: 9,
      },
      {
        title: 'Preparing for Labor: What to Expect',
        content: `As your due date approaches, understanding what to expect during labor can help reduce anxiety and help you feel more prepared for birth.

**Signs That Labor Is Beginning**

*Braxton Hicks vs. Real Contractions*
Braxton Hicks contractions are irregular practice contractions that do not follow a pattern. True labor contractions become progressively stronger, longer, and closer together.

*Water Breaking*
Your membranes may rupture before or during labor. This can be a gush or a slow trickle. Contact your healthcare provider when your water breaks.

*Bloody Show*
A discharge of blood-tinged mucus indicates your cervix is dilating. Labor may begin within hours or days.

**Stages of Labor**

*Early Labor (Latent Phase)*
Cervix dilates from 0 to 6 cm. Contractions are mild to moderate, lasting 30-45 seconds, occurring every 5-20 minutes. This phase can last hours to days for first-time mothers.

*Active Labor*
Cervix dilates from 6 to 10 cm. Contractions become stronger and occur every 3-5 minutes, lasting 45-60 seconds. This is when you should go to the hospital.

*Transition*
The most intense phase as the cervix completes dilation. Contractions may overlap and last 60-90 seconds.

*Pushing and Delivery*
You will push with contractions to move your baby through the birth canal. This stage lasts from a few minutes to several hours.

*Placenta Delivery*
After birth, you will deliver the placenta, usually within 30 minutes.

**Pain Management Options**
Options include epidural anesthesia, IV medications, nitrous oxide, water therapy, breathing techniques, massage, and movement. Discuss your preferences with your care team in advance.

**Creating a Birth Plan**
A birth plan communicates your preferences to your care team. Include your preferences for pain management, who you want present, positions during labor, and post-birth wishes like immediate skin-to-skin contact.`,
        excerpt:
          'A comprehensive guide to understanding the stages of labor and how to prepare for your birthing experience.',
        category: 'Birth Preparation',
        author: 'Midwife Sarah Johnson',
        readingTime: 11,
      },
      {
        title: 'Second Trimester: The Golden Period of Pregnancy',
        content: `Many women find the second trimester to be the most comfortable and enjoyable phase of pregnancy. Here is what to expect during weeks 13-26.

**Physical Changes**

*Growing Belly*
Your uterus expands beyond the pelvis, and your pregnancy becomes visible. Many women start showing noticeably between weeks 16-20.

*Feeling Baby Move*
One of the most exciting milestones! First-time mothers typically feel movement (quickening) between weeks 18-22. Experienced mothers may feel it as early as week 14.

*Reduced Nausea*
Most women find morning sickness improves significantly by weeks 12-14. Energy levels typically increase as well.

*Round Ligament Pain*
As your uterus grows, the ligaments supporting it stretch, causing sharp pains in your lower abdomen or groin, especially with sudden movements.

**Important Second Trimester Tests**

*Anatomy Ultrasound (20 Weeks)*
This detailed ultrasound checks the baby's anatomy, confirms the due date, and you may find out the baby's sex if desired.

*Glucose Screening Test (24-28 Weeks)*
Screens for gestational diabetes. You will drink a glucose solution and have your blood drawn an hour later.

*Maternal-Fetal Blood Tests*
Quad screen or other blood tests can assess risk for chromosomal abnormalities.

**Emotional Changes**
Many women feel more connected to their pregnancy in the second trimester as they see their bump grow and feel baby's movements. Partner involvement often increases during this trimester.

**Practical Preparations**
- Start researching childcare options
- Begin shopping for nursery items
- Consider prenatal classes
- Discuss maternity/paternity leave with your employer
- Start planning for the baby shower

The second trimester is a wonderful time to enjoy your pregnancy while you have good energy and before the final weeks of discomfort arrive.`,
        excerpt:
          'What to expect during the second trimester, including physical changes, important tests, and emotional milestones.',
        category: 'Baby Development',
        author: 'Dr. Amanda Foster',
        readingTime: 7,
      },
    ],
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
