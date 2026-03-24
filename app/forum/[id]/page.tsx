import Link from 'next/link';

interface Comment {
  id: number;
  author: string;
  authorEmoji: string;
  date: string;
  content: string;
  likes: number;
}

interface ForumPost {
  id: number;
  title: string;
  author: string;
  authorEmoji: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  likes: number;
  comments: Comment[];
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
    content: `After weeks of struggling with morning sickness — which, let's be honest, should be called all-day sickness — I finally found a combination of things that made a real difference. I want to share everything in detail so other mamas going through this don't have to figure it out alone.

**Ginger Tea (the real kind)**

I started with grocery-store ginger tea bags, but what actually helped was making fresh ginger tea from a peeled, sliced knob of ginger steeped in boiling water for 10 minutes. I added a little honey and sipped it slowly first thing in the morning before getting out of bed. The difference was noticeable within a week.

**Sea-Bands**

These are wristbands that apply acupressure to the P6 point on your inner wrist. I was skeptical, but a friend who'd had hyperemesis swore by them. I ordered a pair and wore them constantly through weeks 6–12. They don't eliminate nausea entirely, but they take the edge off enough to function.

**Small, Frequent Meals**

The worst thing I could do was let myself get hungry. An empty stomach made nausea ten times worse. I started keeping plain crackers, almonds, and sliced apple on my nightstand so I could eat something before even sitting up. Every 2 hours during the day I'd have a small snack: half a banana, a few rice crackers with peanut butter, a small bowl of plain rice.

**What Didn't Work for Me**

Vitamin B6 supplements did almost nothing for me, though they help some women. Peppermint made things worse. Fizzy water helped initially but then I couldn't stand the bubbles.

**When to Call Your Doctor**

If you can't keep any fluids down for 24 hours, are losing weight, or feel dizzy and faint — please call your provider. Hyperemesis gravidarum is serious and treatable. You don't have to suffer through it.

I hope something here helps you. Sending so much love to everyone in the thick of it. ❤️`,
    likes: 142,
    comments: [
      {
        id: 1,
        author: 'Priya K.',
        authorEmoji: '🌸',
        date: 'June 13, 2025',
        content:
          "The fresh ginger tip is a game-changer! I was using tea bags and wondering why it wasn't helping much. Switching to fresh ginger this week — thank you!",
        likes: 24,
      },
      {
        id: 2,
        author: 'Aisha T.',
        authorEmoji: '💗',
        date: 'June 13, 2025',
        content:
          'Sea-bands saved me too! I wore mine to bed because I was waking up nauseous. Also — cold, bland foods were more tolerable than hot foods for me. Ice-cold watermelon was my best friend.',
        likes: 18,
      },
      {
        id: 3,
        author: 'Mei L.',
        authorEmoji: '🍀',
        date: 'June 14, 2025',
        content:
          'Thank you for including the "when to call your doctor" section. I had HG with my first pregnancy and I wish I had asked for help sooner. Always worth calling if things feel serious!',
        likes: 31,
      },
      {
        id: 4,
        author: 'Emma R.',
        authorEmoji: '🌺',
        date: 'June 15, 2025',
        content:
          'The crackers-on-the-nightstand advice is so practical. I started doing this after reading your earlier post in another group and it made mornings SO much more manageable.',
        likes: 12,
      },
    ],
  },
  {
    id: 2,
    title: 'Safe exercises during second trimester – my weekly routine',
    author: 'Priya K.',
    authorEmoji: '🌸',
    date: 'June 10, 2025',
    category: 'Exercise',
    tags: ['exercise', 'second trimester', 'prenatal fitness'],
    content: `My OB cleared me for moderate exercise and I've been doing a mix of prenatal yoga, swimming, and gentle walks. Here's my full routine.`,
    likes: 98,
    comments: [
      {
        id: 1,
        author: 'Sarah M.',
        authorEmoji: '🌷',
        date: 'June 11, 2025',
        content: 'Swimming was my absolute favourite in the second trimester! The weightlessness is such a relief.',
        likes: 14,
      },
    ],
  },
];

function getPost(id: string): ForumPost | undefined {
  return mockPosts.find((p) => p.id === Number(id)) ?? mockPosts[0];
}

export default async function ForumPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = getPost(id);

  if (!post) {
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
        Post not found.
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n').filter(Boolean);

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
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <Link
            href="/forum"
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
            ← Back to Forum
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 24px' }}>
        <div style={{ display: 'grid', gap: 28 }}>
          {/* Main post card */}
          <article
            style={{
              backgroundColor: '#fff',
              borderRadius: 20,
              border: '1.5px solid #fce7f3',
              padding: '36px 40px',
              boxShadow: '0 4px 16px rgba(236,72,153,0.07)',
            }}
          >
            {/* Category + tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              <span
                style={{
                  backgroundColor: '#ec4899',
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  padding: '4px 14px',
                  borderRadius: 9999,
                }}
              >
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: '#fdf2f8',
                    color: '#ec4899',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    padding: '4px 12px',
                    borderRadius: 9999,
                    border: '1px solid #fbcfe8',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '1.7rem',
                fontWeight: 800,
                color: '#9d174d',
                margin: '0 0 20px',
                lineHeight: 1.35,
                letterSpacing: '-0.3px',
              }}
            >
              {post.title}
            </h1>

            {/* Author row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingBottom: 24,
                borderBottom: '1px solid #fce7f3',
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#fce7f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {post.authorEmoji}
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#9d174d', fontSize: '0.95rem' }}>
                  {post.author}
                </div>
                <div style={{ color: '#be185d', fontSize: '0.82rem' }}>{post.date}</div>
              </div>
              <div
                style={{
                  marginLeft: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  color: '#be185d',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              >
                <span>❤️ {post.likes}</span>
                <span>💬 {post.comments.length}</span>
              </div>
            </div>

            {/* Content */}
            <div>
              {paragraphs.map((para, i) => {
                const isHeading = para.startsWith('**') && para.endsWith('**');
                if (isHeading) {
                  return (
                    <h2
                      key={i}
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#9d174d',
                        margin: '24px 0 10px',
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
                      lineHeight: 1.75,
                      fontSize: '0.97rem',
                      margin: '0 0 16px',
                    }}
                  >
                    {para}
                  </p>
                );
              })}
            </div>
          </article>

          {/* Comments section */}
          <section>
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#9d174d',
                marginBottom: 18,
              }}
            >
              💬 {post.comments.length} Comments
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 14,
                    border: '1.5px solid #fce7f3',
                    padding: '20px 24px',
                    boxShadow: '0 2px 6px rgba(236,72,153,0.05)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: '#fce7f3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem',
                        flexShrink: 0,
                      }}
                    >
                      {comment.authorEmoji}
                    </div>
                    <div>
                      <span style={{ fontWeight: 700, color: '#9d174d', fontSize: '0.88rem' }}>
                        {comment.author}
                      </span>
                      <span style={{ color: '#f9a8d4', margin: '0 6px' }}>·</span>
                      <span style={{ color: '#be185d', fontSize: '0.8rem' }}>{comment.date}</span>
                    </div>
                    <span
                      style={{
                        marginLeft: 'auto',
                        color: '#be185d',
                        fontSize: '0.82rem',
                        fontWeight: 500,
                      }}
                    >
                      ❤️ {comment.likes}
                    </span>
                  </div>
                  <p
                    style={{
                      color: '#374151',
                      fontSize: '0.9rem',
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Comment form */}
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: 16,
              border: '1.5px solid #fce7f3',
              padding: '28px 32px',
              boxShadow: '0 2px 8px rgba(236,72,153,0.05)',
            }}
          >
            <h3
              style={{
                fontSize: '1.05rem',
                fontWeight: 700,
                color: '#9d174d',
                marginBottom: 16,
              }}
            >
              Leave a Comment
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input
                type="text"
                placeholder="Your name"
                style={{
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #fbcfe8',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  color: '#374151',
                  backgroundColor: '#fdf2f8',
                }}
              />
              <textarea
                placeholder="Share your thoughts or support..."
                rows={4}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1.5px solid #fbcfe8',
                  fontSize: '0.9rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical',
                  color: '#374151',
                  backgroundColor: '#fdf2f8',
                  lineHeight: 1.6,
                }}
              />
              <div>
                <button
                  style={{
                    padding: '10px 28px',
                    borderRadius: 9999,
                    border: 'none',
                    backgroundColor: '#ec4899',
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: '0 2px 8px rgba(236,72,153,0.3)',
                  }}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
