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
  date: string;
  content: string;
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
    date: 'June 10, 2025',
    content: `The first trimester — weeks 1 through 13 — is when the most dramatic development takes place. By the end of week 10, your baby's organs, muscles, limbs, and bones are forming. The neural tube, which becomes the brain and spinal cord, closes around weeks 3–4. This is why nutrition in early pregnancy matters so much, even before many women know they're pregnant.

**Folate and Folic Acid: The Non-Negotiable**

Folate (found naturally in foods) and folic acid (the synthetic form in supplements) are essential for neural tube development. Most guidelines recommend 400–600 mcg daily before and during the first trimester. Food sources include dark leafy greens (spinach, kale, romaine), asparagus, lentils, chickpeas, avocado, and fortified grains.

**Iron: Building Blood for Two**

Your blood volume increases by up to 50% during pregnancy, demanding significantly more iron. First-trimester needs are around 27 mg per day. Lean red meat, chicken, turkey, lentils, tofu, spinach, and fortified cereals are all good sources. Pair plant-based iron with vitamin C (citrus, bell peppers, strawberries) to boost absorption. Avoid consuming coffee or tea with iron-rich meals as tannins inhibit absorption.

**Vitamin B12**

Critical for neurological development, B12 is found predominantly in animal products. If you follow a plant-based diet, supplementation is essential. Fortified plant milks, nutritional yeast, and B12 supplements are your best options.

**Managing Nausea While Eating Well**

Morning sickness makes eating well feel impossible for many women. Some practical strategies: eat small amounts every 2–3 hours before hunger sets in, keep bland snacks like crackers or dry toast nearby, favour cold or room-temperature foods which tend to have less smell, and stay well hydrated with water, herbal teas (ginger, peppermint), or diluted fruit juice.

**Foods to Avoid**

Raw or undercooked meat and eggs, unpasteurized cheeses and dairy, high-mercury fish (shark, swordfish, king mackerel, tilefish), raw sprouts, deli meats unless heated until steaming, and alcohol. Limit caffeine to under 200 mg per day (roughly one 12 oz cup of coffee).

**A Note on Prenatal Vitamins**

A quality prenatal vitamin covers many bases but is not a substitute for a balanced diet. Look for one that contains at least 400 mcg folic acid/folate, 27 mg iron, 150 mcg iodine, and DHA. Discuss the best option with your healthcare provider.`,
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
    date: 'June 7, 2025',
    content: `Prenatal yoga is one of the most recommended forms of exercise during pregnancy. It combines gentle stretching, mindful breathing, and relaxation techniques — all of which have measurable benefits for both mother and baby.

**Benefits Backed by Research**

Multiple studies have shown that regular prenatal yoga reduces lower back pain, improves sleep quality, decreases levels of the stress hormone cortisol, and may shorten labour duration. Women who practise yoga during pregnancy also report lower rates of anxiety and depression.

**First Trimester Poses**

During weeks 1–13, focus on building a foundation. Cat-Cow stretches gently mobilise the spine and relieve back tension. Child's Pose (modified with knees wide) creates a restful opening through the hips. Standing Mountain Pose with breath awareness builds postural awareness that will matter as your belly grows.

**Second Trimester Poses**

Your centre of gravity shifts and balance becomes important. Warrior II strengthens the legs and hips while building stamina. Side Angle Pose opens the chest and stretches the side body. Goddess Squat (Utkata Konasana) builds hip and pelvic floor strength essential for labour.

**Third Trimester Poses**

In the final weeks, comfort and preparation take priority. Supported Bridge Pose with a bolster relieves sacral pressure. Butterfly Pose (Baddha Konasana) gently opens the inner thighs. Legs-Up-The-Wall relieves swelling in the feet and legs. Focus on long, slow, counted breaths that mirror the breathing techniques used in labour.

**What to Avoid**

Avoid lying flat on your back after the first trimester (can compress the vena cava), deep twists, strong abdominal work, inversions, and hot yoga. Always inform your instructor that you are pregnant.`,
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
    date: 'June 5, 2025',
    content: `Prenatal anxiety — anxiety during pregnancy — affects approximately 15–20% of pregnant women, making it as common as postpartum depression yet far less discussed. Understanding it, normalising it, and treating it effectively matters for your wellbeing and your baby's development.

**Why Anxiety Increases During Pregnancy**

Hormonal shifts (particularly rises in estrogen and progesterone) directly affect mood-regulating brain circuits. Added to this are legitimate concerns about labour, parenting readiness, relationship changes, financial pressures, and your baby's health. For women with a history of anxiety or depression, pregnancy can trigger or intensify symptoms.

**Evidence-Based Strategies**

Cognitive-behavioural therapy (CBT) has the strongest evidence base for prenatal anxiety. It helps you identify and reframe unhelpful thought patterns (catastrophising, overestimating risk) that fuel anxiety. Many therapists now offer telehealth sessions making CBT more accessible.

Mindfulness-Based Stress Reduction (MBSR) has shown significant results in reducing prenatal anxiety in multiple controlled trials. Apps like Headspace, Calm, or dedicated prenatal mindfulness programs can supplement formal therapy.

Progressive Muscle Relaxation (PMR) is a technique where you systematically tense and release muscle groups. Research shows it lowers cortisol and reduces anxiety symptoms. Guided PMR recordings are widely available.

**When to Seek Professional Help**

Please talk to your midwife, OB, or GP if: anxiety is interfering with your sleep, appetite, or daily functioning; you're experiencing panic attacks; you're avoiding medical appointments due to fear; or you feel detached from your pregnancy. Perinatal mental health specialists can offer therapies and, if needed, review medications that are safe during pregnancy.

**Building Your Support Network**

Social support is one of the strongest protective factors against prenatal anxiety. Be open with your partner, a trusted friend, or a family member about what you're experiencing. Joining a pregnancy support group — in person or online — connects you with others who understand.`,
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
    date: 'June 3, 2025',
    content: `Twenty weeks marks the halfway point of a typical pregnancy — a significant milestone that often coincides with the anatomy scan ultrasound. Here is a detailed look at what your baby is doing right now.

**Size and Appearance**

At 20 weeks, your baby is approximately 25–26 cm (10 inches) from crown to heel and weighs around 300 grams. They are covered in vernix caseosa, a white waxy substance that protects their skin from the amniotic fluid. Lanugo — fine downy hair — covers most of the body, helping the vernix adhere.

**Hearing and Touch**

The auditory system is now functional. Your baby can hear sounds from outside the womb — your heartbeat, your voice, music, and loud external noises. Research shows newborns prefer voices and music they heard regularly in utero. Touch receptors are fully developed, and babies at this stage can be seen on ultrasound touching their faces, grasping the umbilical cord, and responding to external stimulation.

**Movement**

Many mothers feel fetal movement (quickening) for the first time around weeks 18–22. What you feel as flutters or gentle taps are your baby's purposeful kicks, stretches, and rolls. Movement patterns are becoming more consistent, though it's too early to track regular kick counts (typically recommended from 28 weeks).

**The Anatomy Scan**

The 20-week anatomy scan (anomaly scan) examines all major organ systems: the brain, heart, spine, kidneys, stomach, and limbs. It checks the position of the placenta and measures amniotic fluid levels. Most structural abnormalities, if present, can be identified at this scan.

**Brain Development**

The cerebral cortex is growing rapidly and the brain is forming the grooves and folds that characterise mature human brain tissue. Synaptic connections are forming at a staggering rate — billions per day.`,
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
    date: 'June 1, 2025',
    content: `A birth plan is a written document that outlines your preferences for labour, delivery, and the immediate postnatal period. It is not a rigid script but a communication tool — a way to let your midwives and doctors know what matters most to you.

**Why Write a Birth Plan**

Research shows that women who participate actively in birth planning report higher satisfaction with their birth experience, regardless of whether the birth unfolded as planned. The process of writing a birth plan encourages you to learn about your options, discuss them with your partner, and have important conversations with your healthcare team before labour begins.

**Section 1: Labour Environment and Comfort**

Where would you like to labour (hospital room, birth pool, birth centre)? What atmosphere do you prefer (dim lights, music, aromatherapy)? Who will be your support person(s)? Do you want freedom of movement and to try different positions?

**Section 2: Pain Relief Options**

Thinking through this section ahead of time is valuable even if your preferences may change during labour. Options include: epidural anaesthesia, spinal block, IV or IM opioids, nitrous oxide (gas and air), TENS machine, water immersion, breathing techniques, massage, and positional changes. Note any strong preferences and any things you'd like to avoid.

**Section 3: Monitoring and Interventions**

Would you prefer continuous electronic fetal monitoring or intermittent auscultation (if available and appropriate for your risk level)? How do you feel about routine IV cannula insertion, rupturing membranes artificially, or episiotomy? Express that you want to be consulted and given time to consider before any non-emergency intervention.

**Section 4: Pushing and Delivery**

Preferred pushing positions (upright, side-lying, hands-and-knees)? Preferences around coached versus breathing-down pushing? Wishes around perineal support to reduce tearing? Who will announce the baby's sex (if unknown)? Do you want the cord to stop pulsating before it's cut, and who will cut it?

**Section 5: Immediate Postpartum**

Skin-to-skin contact as soon as possible after birth? Delayed cord clamping? Do you want to try to breastfeed immediately? Preferences around the third stage (placenta delivery): physiological (natural) or managed (oxytocin injection)?

**Keeping It Flexible**

Always include a note along the lines of: "I understand that birth is unpredictable and that medical circumstances may require changes to this plan. I trust my care team to keep me informed and involved in any decisions that need to be made." This demonstrates collaboration and makes your plan far easier for staff to work with.`,
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
    date: 'May 29, 2025',
    content: `Iron deficiency anaemia is the most common nutritional deficiency during pregnancy, affecting an estimated 40% of pregnant women worldwide. Identifying it early and addressing it effectively protects both maternal wellbeing and fetal development.

**Why Iron Demands Increase**

During pregnancy your blood volume expands by up to 50%. This dilutional effect lowers haemoglobin concentration even when total iron stores are adequate. On top of this, the fetus draws iron from maternal stores for its own blood and organ development — particularly in the third trimester. Altogether, daily iron requirements rise from 18 mg to 27 mg during pregnancy.

**Signs and Symptoms**

Mild iron deficiency may be asymptomatic, discovered only on routine blood tests. As deficiency progresses, symptoms include unusual fatigue and weakness, pale skin and mucous membranes, shortness of breath with mild exertion, dizziness or light-headedness, cold hands and feet, headaches, and difficulty concentrating. An uncommon but notable symptom is pica — cravings for non-food substances like ice, dirt, or chalk.

**Diagnosis**

Iron deficiency is diagnosed with a full blood count (haemoglobin and haematocrit) plus serum ferritin, which reflects stored iron. Haemoglobin below 11 g/dL in the first trimester, 10.5 g/dL in the second, or 11 g/dL in the third is considered anaemic by most guidelines.

**Dietary Solutions**

The best dietary sources of haem iron (most bioavailable) are lean red meat (beef, lamb), liver (in moderation — no more than once a week due to high vitamin A), chicken, turkey, and fish. Non-haem iron sources include lentils, chickpeas, kidney beans, tofu, spinach, kale, quinoa, and fortified cereals. Vitamin C dramatically enhances non-haem iron absorption — pair your plant-based iron sources with a glass of orange juice, sliced strawberries, or bell pepper. Avoid coffee and tea with iron-rich meals.

**Supplementation**

When diet alone isn't enough, oral iron supplements (ferrous sulfate, ferrous gluconate, or ferrous fumarate) are prescribed. They are best absorbed on an empty stomach but can be taken with food if they cause nausea. Side effects include constipation, dark stools, and stomach upset. Vitamin C taken alongside the supplement enhances absorption. In severe cases or late pregnancy, intravenous iron infusion may be recommended for faster repletion.`,
  },
];

function getArticle(id: string): Article | undefined {
  return mockArticles.find((a) => a.id === Number(id)) ?? mockArticles[0];
}

function getRelated(current: Article): Article[] {
  return mockArticles
    .filter((a) => a.id !== current.id && a.category === current.category)
    .slice(0, 3)
    .concat(
      mockArticles
        .filter((a) => a.id !== current.id && a.category !== current.category)
        .slice(0, Math.max(0, 3 - mockArticles.filter((a) => a.id !== current.id && a.category === current.category).length))
    )
    .slice(0, 3);
}

const categoryBadgeColor: Record<string, string> = {
  Nutrition: '#10b981',
  Exercise: '#3b82f6',
  'Mental Health': '#8b5cf6',
  'Baby Development': '#f59e0b',
  'Birth Preparation': '#ec4899',
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: '#9d174d',
        }}
      >
        Article not found.
      </div>
    );
  }

  const related = getRelated(article);
  const paragraphs = article.content.split('\n\n').filter(Boolean);
  const badgeColor = categoryBadgeColor[article.category] ?? '#ec4899';

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf2f8',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Back nav */}
      <div
        style={{
          backgroundColor: '#fff',
          borderBottom: '1px solid #fce7f3',
          padding: '14px 24px',
        }}
      >
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <Link
            href="/articles"
            style={{
              color: '#ec4899',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            ← Back to Articles
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .article-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .article-sidebar {
            position: static !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '36px 24px' }}>
        <div
          className="article-detail-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* Main content */}
          <article>
            {/* Cover */}
            <div
              style={{
                background: article.coverColor,
                borderRadius: 20,
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '5rem',
                marginBottom: 28,
                border: '1.5px solid #fce7f3',
              }}
            >
              {article.coverEmoji}
            </div>

            {/* Meta */}
            <div style={{ marginBottom: 16 }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: `${badgeColor}18`,
                  color: badgeColor,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: 9999,
                  border: `1px solid ${badgeColor}30`,
                  marginBottom: 14,
                }}
              >
                {article.category}
              </span>
              <h1
                style={{
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  color: '#9d174d',
                  margin: '0 0 14px',
                  lineHeight: 1.3,
                  letterSpacing: '-0.4px',
                }}
              >
                {article.title}
              </h1>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  color: '#be185d',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  paddingBottom: 20,
                  borderBottom: '1px solid #fce7f3',
                  marginBottom: 28,
                  flexWrap: 'wrap',
                }}
              >
                <span>✍️ {article.author}</span>
                <span>📅 {article.date}</span>
                <span>⏱ {article.readingTime} min read</span>
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                border: '1.5px solid #fce7f3',
                padding: '36px 40px',
                boxShadow: '0 4px 16px rgba(236,72,153,0.07)',
              }}
            >
              {paragraphs.map((para, i) => {
                const isHeading = para.startsWith('**') && para.endsWith('**');
                if (isHeading) {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#9d174d',
                        margin: '28px 0 12px',
                      }}
                    >
                      {para.replace(/\*\*/g, '')}
                    </h2>
                  );
                }
                return (
                  <p
                    key={i}
                    style={{
                      color: '#374151',
                      lineHeight: 1.8,
                      fontSize: '0.97rem',
                      margin: '0 0 18px',
                    }}
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar" style={{ position: 'sticky', top: 24 }}>
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: 18,
                border: '1.5px solid #fce7f3',
                padding: '24px',
                boxShadow: '0 2px 10px rgba(236,72,153,0.07)',
              }}
            >
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#9d174d',
                  marginBottom: 18,
                  paddingBottom: 12,
                  borderBottom: '1px solid #fce7f3',
                }}
              >
                Related Articles
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {related.map((rel) => {
                  const relBadge = categoryBadgeColor[rel.category] ?? '#ec4899';
                  return (
                    <Link
                      key={rel.id}
                      href={`/articles/${rel.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          gap: 12,
                          alignItems: 'flex-start',
                          padding: '12px',
                          borderRadius: 12,
                          border: '1px solid #fce7f3',
                          transition: 'background 0.15s',
                        }}
                      >
                        <div
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 10,
                            background: rel.coverColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.4rem',
                            flexShrink: 0,
                          }}
                        >
                          {rel.coverEmoji}
                        </div>
                        <div>
                          <span
                            style={{
                              display: 'inline-block',
                              backgroundColor: `${relBadge}18`,
                              color: relBadge,
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              padding: '2px 8px',
                              borderRadius: 9999,
                              marginBottom: 5,
                            }}
                          >
                            {rel.category}
                          </span>
                          <p
                            style={{
                              fontSize: '0.83rem',
                              fontWeight: 600,
                              color: '#9d174d',
                              margin: 0,
                              lineHeight: 1.4,
                            }}
                          >
                            {rel.title}
                          </p>
                          <p
                            style={{
                              fontSize: '0.75rem',
                              color: '#be185d',
                              margin: '4px 0 0',
                            }}
                          >
                            ⏱ {rel.readingTime} min
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
