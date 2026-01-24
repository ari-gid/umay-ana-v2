import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import crypto from "crypto";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: "file:./dev.db" }),
});

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.forumComment.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.session.deleteMany();
  await prisma.pregnancyProfile.deleteMany();
  await prisma.article.deleteMany();
  await prisma.doctorRequest.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  const userA = await prisma.user.create({
    data: {
      email: "mila@example.com",
      passwordHash: hashPassword("password123"),
      name: "Mila Nguyen",
      city: "Austin",
    },
  });

  const userB = await prisma.user.create({
    data: {
      email: "sofia@example.com",
      passwordHash: hashPassword("password123"),
      name: "Sofia Patel",
      city: "Seattle",
    },
  });

  await prisma.pregnancyProfile.create({
    data: {
      userId: userA.id,
      trimester: 2,
      gestationWeeks: 18,
      gestationDays: 3,
      dueDate: new Date(Date.now() + 280 * 24 * 60 * 60 * 1000),
      privacyHideOnForum: false,
    },
  });

  await prisma.article.createMany({
    data: [
      {
        slug: "month-1-gentle-start",
        title: "Month 1: A Gentle Start",
        excerpt: "Early pregnancy often comes with subtle shifts. Focus on rest and hydration.",
        content:
          "Your body is beginning a major transformation. Prioritize steady meals, short walks, and calm routines. If nausea appears, try small, frequent snacks and ginger tea.",
        trimesterTags: ["first"],
        topicTags: ["nutrition", "rest", "nausea"],
        readingTime: 4,
      },
      {
        slug: "month-2-energy-and-emotions",
        title: "Month 2: Energy and Emotions",
        excerpt: "Mood swings are common. Build tiny rituals that bring comfort.",
        content:
          "Hormonal changes can affect mood and energy. Keep a short journal, ask for support, and aim for consistent sleep. Gentle stretching can ease tension.",
        trimesterTags: ["first"],
        topicTags: ["mental-health", "sleep", "movement"],
        readingTime: 5,
      },
      {
        slug: "month-3-first-trimester-checklist",
        title: "Month 3: First Trimester Checklist",
        excerpt: "A short checklist for the end of the first trimester.",
        content:
          "Schedule any recommended prenatal visits, update your prenatal vitamins, and plan a simple self-care routine. Keep meals balanced with protein and fiber.",
        trimesterTags: ["first"],
        topicTags: ["appointments", "nutrition"],
        readingTime: 4,
      },
      {
        slug: "month-4-hello-second-trimester",
        title: "Month 4: Hello, Second Trimester",
        excerpt: "Many people notice more energy. Try low-impact activity.",
        content:
          "As energy returns, consider prenatal yoga or light swimming. Hydrate well and include iron-rich foods like spinach and lentils.",
        trimesterTags: ["second"],
        topicTags: ["movement", "nutrition"],
        readingTime: 5,
      },
      {
        slug: "month-5-body-changes",
        title: "Month 5: Body Changes and Comfort",
        excerpt: "Your posture may shift. Simple posture habits can help.",
        content:
          "Supportive footwear and light stretching can reduce discomfort. Use pillows for sleep and take breaks from standing.",
        trimesterTags: ["second"],
        topicTags: ["comfort", "sleep", "movement"],
        readingTime: 6,
      },
      {
        slug: "month-6-preparing-support-system",
        title: "Month 6: Preparing Your Support System",
        excerpt: "Start practical planning with your support network.",
        content:
          "Outline who can help with meals, appointments, or emotional support. Create a small list of questions for your next visit.",
        trimesterTags: ["second"],
        topicTags: ["planning", "support"],
        readingTime: 5,
      },
      {
        slug: "month-7-third-trimester-focus",
        title: "Month 7: Third Trimester Focus",
        excerpt: "Rest and comfort are key as you enter the third trimester.",
        content:
          "Short walks, warm showers, and a consistent bedtime can help. Keep hydration steady and consider a simple birth plan outline.",
        trimesterTags: ["third"],
        topicTags: ["rest", "planning", "comfort"],
        readingTime: 5,
      },
      {
        slug: "month-8-nesting-and-prep",
        title: "Month 8: Nesting and Preparation",
        excerpt: "Small, manageable tasks can ease stress.",
        content:
          "Focus on essentials like a safe sleep space and a few cozy outfits. Avoid overexertion and ask for help with heavy tasks.",
        trimesterTags: ["third"],
        topicTags: ["planning", "home"],
        readingTime: 4,
      },
      {
        slug: "month-9-final-weeks",
        title: "Month 9: Final Weeks",
        excerpt: "Slow down and listen to your body.",
        content:
          "Rest often, stay hydrated, and keep a list of calming activities. Gentle breathing exercises can help you stay grounded.",
        trimesterTags: ["third"],
        topicTags: ["rest", "calm"],
        readingTime: 4,
      },
    ],
  });

  await prisma.doctor.createMany({
    data: [
      {
        name: "Dr. Celia Monroe",
        specialization: "Obstetrics",
        city: "Austin",
        rating: 4.8,
        priceFrom: 160,
        about: "Focused on gentle, supportive prenatal care with clear guidance.",
        contacts: "celia.monroe@clinic.com",
      },
      {
        name: "Dr. Lena Brooks",
        specialization: "Midwifery",
        city: "Seattle",
        rating: 4.6,
        priceFrom: 120,
        about: "Warm, personalized care and evidence-based education.",
        contacts: "lena.brooks@clinic.com",
      },
      {
        name: "Dr. Yasmin Ali",
        specialization: "Family Medicine",
        city: "Chicago",
        rating: 4.7,
        priceFrom: 110,
        about: "Collaborative planning and practical lifestyle support.",
        contacts: "yasmin.ali@clinic.com",
      },
      {
        name: "Dr. Morgan Lee",
        specialization: "Obstetrics",
        city: "New York",
        rating: 4.9,
        priceFrom: 200,
        about: "Focused on calm communication and clear next steps.",
        contacts: "morgan.lee@clinic.com",
      },
      {
        name: "Dr. Priya Nair",
        specialization: "Nutrition",
        city: "Seattle",
        rating: 4.5,
        priceFrom: 95,
        about: "Nutrition guidance for steady energy and comfort.",
        contacts: "priya.nair@clinic.com",
      },
      {
        name: "Dr. Harper Ruiz",
        specialization: "Physical Therapy",
        city: "Austin",
        rating: 4.4,
        priceFrom: 90,
        about: "Prenatal movement and mobility coaching.",
        contacts: "harper.ruiz@clinic.com",
      },
      {
        name: "Dr. Elena Costa",
        specialization: "Obstetrics",
        city: "Denver",
        rating: 4.6,
        priceFrom: 150,
        about: "Supportive care with a focus on comfort and confidence.",
        contacts: "elena.costa@clinic.com",
      },
      {
        name: "Dr. Noor Rahman",
        specialization: "Mental Health",
        city: "Chicago",
        rating: 4.7,
        priceFrom: 130,
        about: "Emotional wellness support during pregnancy and beyond.",
        contacts: "noor.rahman@clinic.com",
      },
      {
        name: "Dr. Jules Park",
        specialization: "Obstetrics",
        city: "San Francisco",
        rating: 4.8,
        priceFrom: 190,
        about: "Clear education and collaborative decision-making.",
        contacts: "jules.park@clinic.com",
      },
      {
        name: "Dr. Tessa Moore",
        specialization: "Midwifery",
        city: "Denver",
        rating: 4.5,
        priceFrom: 115,
        about: "Empathetic care and practical birth preparation.",
        contacts: "tessa.moore@clinic.com",
      },
    ],
  });

  const postA = await prisma.forumPost.create({
    data: {
      authorId: userA.id,
      title: "Tips for staying hydrated?",
      content:
        "I am in month 4 and my water intake is inconsistent. Any gentle tips?",
      trimesterTag: "second",
      topicTags: ["hydration", "energy"],
    },
  });

  const postB = await prisma.forumPost.create({
    data: {
      authorId: userB.id,
      title: "Best bedtime routine?",
      content:
        "Looking for simple routines that help with sleep during month 6.",
      trimesterTag: "second",
      topicTags: ["sleep", "comfort"],
    },
  });

  const morePosts = [
    {
      authorId: userA.id,
      title: "Light workouts in the first trimester",
      content: "What gentle movement worked for you early on?",
      trimesterTag: "first",
      topicTags: ["movement"],
    },
    {
      authorId: userB.id,
      title: "Healthy snacks on busy days",
      content: "I need quick snack ideas that keep me steady.",
      trimesterTag: "first",
      topicTags: ["nutrition"],
    },
    {
      authorId: userA.id,
      title: "Managing lower back tension",
      content: "Month 7 and my back is tight. Any soothing routines?",
      trimesterTag: "third",
      topicTags: ["comfort", "movement"],
    },
    {
      authorId: userB.id,
      title: "Support partner ideas",
      content: "What practical support helped you feel calm?",
      trimesterTag: "second",
      topicTags: ["support", "planning"],
    },
    {
      authorId: userA.id,
      title: "Preparing for appointments",
      content: "How do you keep track of questions?",
      trimesterTag: "second",
      topicTags: ["planning"],
    },
    {
      authorId: userB.id,
      title: "Comfortable sleep positions",
      content: "Looking for pillow setups that help in month 8.",
      trimesterTag: "third",
      topicTags: ["sleep", "comfort"],
    },
    {
      authorId: userA.id,
      title: "Calm breathing exercises",
      content: "Any short breathing routines you like?",
      trimesterTag: "third",
      topicTags: ["calm"],
    },
    {
      authorId: userB.id,
      title: "Meal planning without stress",
      content: "Ideas for a simple weekly plan?",
      trimesterTag: "second",
      topicTags: ["nutrition", "planning"],
    },
  ];

  await prisma.forumPost.createMany({ data: morePosts });

  await prisma.forumComment.createMany({
    data: [
      {
        postId: postA.id,
        authorId: userB.id,
        content: "I keep a water bottle by my desk and add lemon for flavor.",
      },
      {
        postId: postA.id,
        authorId: userA.id,
        content: "Sparkling water helped me drink more throughout the day.",
      },
      {
        postId: postB.id,
        authorId: userA.id,
        content: "I dim lights early and do a short stretch before bed.",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
