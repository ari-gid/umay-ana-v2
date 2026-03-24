'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const mockResponses = [
  "That's a great question! During pregnancy it's important to stay well hydrated — most guidelines recommend around 8–10 glasses of water per day. If you're experiencing morning sickness, try sipping small amounts frequently rather than drinking large amounts at once. Herbal teas like ginger or peppermint can also help.",
  "Back pain during pregnancy is very common, especially in the second and third trimesters. As your belly grows, your centre of gravity shifts and the ligaments in your pelvis loosen. Gentle exercise like prenatal yoga, swimming, and walking can provide significant relief. A pregnancy support belt and paying attention to your posture can also help. If pain is severe, please speak with your healthcare provider.",
  "Folic acid is one of the most important supplements in early pregnancy. It helps prevent neural tube defects that occur in the first few weeks of development — often before a woman knows she's pregnant. Most guidelines recommend 400–600 mcg daily, ideally starting before conception and continuing through the first trimester. Your prenatal vitamin likely contains the right amount.",
  "Feeling tired in the first trimester is completely normal! Your body is working incredibly hard — elevated progesterone levels, increased blood production, and the energy demands of rapid fetal development all contribute to fatigue. Rest when you can, prioritise sleep, eat small nutritious meals regularly, and stay gently active. The energy often returns in the second trimester.",
  "Kick counts are generally recommended from around 28 weeks. A common guideline is to notice at least 10 movements within 2 hours. The best time to count is when your baby is typically active — often after a meal or in the evening. If you notice a significant decrease in movement, please contact your healthcare provider promptly. Trust your instincts — you know your baby's patterns best.",
  "Staying active during pregnancy has wonderful benefits — it can reduce back pain, improve sleep, lower the risk of gestational diabetes, and may even shorten labour. Low-impact activities like walking, swimming, prenatal yoga, and stationary cycling are generally safe. Always check with your healthcare provider before starting any new exercise programme, and listen to your body.",
];

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    content:
      "Hello! I'm BloomCare AI 🌸 — your pregnancy wellness assistant. I'm here to help answer general questions about pregnancy, nutrition, exercise, and more. How can I support you today?",
    time: '10:00 AM',
  },
  {
    id: 2,
    role: 'user',
    content: "Hi! I'm 12 weeks pregnant and still experiencing nausea. Is that normal?",
    time: '10:01 AM',
  },
  {
    id: 3,
    role: 'assistant',
    content:
      "Yes, it's completely normal! While nausea (often called morning sickness) is most common in the first trimester and typically peaks around weeks 8–10, many women continue to experience it through weeks 12–14 or even a bit beyond. For most, it gradually improves as the second trimester begins. In the meantime, eating small frequent meals, staying hydrated, trying ginger tea, and using sea-bands can all help. If you're unable to keep food or fluids down, please reach out to your healthcare provider — persistent vomiting can be a sign of hyperemesis gravidarum, which is very treatable. 💕",
    time: '10:01 AM',
  },
  {
    id: 4,
    role: 'user',
    content: 'What vitamins should I be taking right now?',
    time: '10:02 AM',
  },
  {
    id: 5,
    role: 'assistant',
    content:
      "Great question! The most important one at 12 weeks is still **folic acid** (400–600 mcg/day) which supports your baby's neural tube development. A good quality **prenatal multivitamin** typically covers the main bases: folic acid, iron (27 mg), iodine (150 mcg), vitamin D, calcium, and DHA. If you follow a plant-based diet, make sure your prenatal includes **vitamin B12**. It's always best to discuss your specific supplements with your midwife or OB, as individual needs can vary. Please remember I provide general information only — your healthcare provider is your best guide! 🌿",
    time: '10:02 AM',
  },
];

function getCurrentTime(): string {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseIndex, setResponseIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  function sendMessage() {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = mockResponses[responseIndex % mockResponses.length];
      const aiMsg: ChatMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setResponseIndex((i) => i + 1);
      setIsTyping(false);
    }, 1200);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#fdf2f8',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)',
          padding: '20px 24px',
          borderBottom: '1px solid #fbcfe8',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899, #be185d)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(236,72,153,0.3)',
          }}
        >
          🌸
        </div>
        <div>
          <div style={{ fontWeight: 800, color: '#9d174d', fontSize: '1.1rem' }}>
            BloomCare AI
          </div>
          <div style={{ fontSize: '0.8rem', color: '#be185d', fontWeight: 500 }}>
            {isTyping ? '✍️ Typing...' : '🟢 Online'}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          borderBottom: '1px solid #fde68a',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 1 }}>⚠️</span>
        <p
          style={{
            color: '#92400e',
            fontSize: '0.8rem',
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          <strong>Disclaimer:</strong> This AI assistant provides general information only and is
          not a substitute for professional medical advice. Always consult your healthcare provider
          with any concerns about your pregnancy.
        </p>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 760,
          width: '100%',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-end',
                gap: 10,
              }}
            >
              {/* Avatar */}
              {!isUser && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ec4899, #be185d)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                    alignSelf: 'flex-end',
                    marginBottom: 2,
                  }}
                >
                  🌸
                </div>
              )}

              {/* Bubble + time */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  gap: 4,
                }}
              >
                <div
                  style={{
                    backgroundColor: isUser ? '#ec4899' : '#fff',
                    color: isUser ? '#fff' : '#374151',
                    padding: '12px 16px',
                    borderRadius: isUser
                      ? '18px 18px 4px 18px'
                      : '18px 18px 18px 4px',
                    fontSize: '0.92rem',
                    lineHeight: 1.65,
                    border: isUser ? 'none' : '1.5px solid #fce7f3',
                    boxShadow: isUser
                      ? '0 2px 8px rgba(236,72,153,0.25)'
                      : '0 2px 6px rgba(236,72,153,0.07)',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {msg.content}
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    color: '#9ca3af',
                    paddingInline: 4,
                  }}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #be185d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                flexShrink: 0,
              }}
            >
              🌸
            </div>
            <div
              style={{
                backgroundColor: '#fff',
                border: '1.5px solid #fce7f3',
                borderRadius: '18px 18px 18px 4px',
                padding: '12px 18px',
                display: 'flex',
                gap: 5,
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(236,72,153,0.07)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#ec4899',
                    animation: `bounce 1.2s ${i * 0.2}s infinite`,
                    opacity: 0.7,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div
        style={{
          backgroundColor: '#fff',
          borderTop: '1px solid #fce7f3',
          padding: '16px 20px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'flex-end',
            gap: 10,
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a pregnancy question... (Enter to send)"
            rows={1}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 14,
              border: '1.5px solid #fbcfe8',
              fontSize: '0.92rem',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'none',
              color: '#374151',
              backgroundColor: '#fdf2f8',
              lineHeight: 1.5,
              overflowY: 'hidden',
              minHeight: 46,
              maxHeight: 120,
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              border: 'none',
              backgroundColor:
                !input.trim() || isTyping ? '#fbcfe8' : '#ec4899',
              color: '#fff',
              fontSize: '1.1rem',
              cursor: !input.trim() || isTyping ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background-color 0.15s',
              boxShadow:
                !input.trim() || isTyping
                  ? 'none'
                  : '0 2px 8px rgba(236,72,153,0.3)',
              fontFamily: 'inherit',
            }}
          >
            ➤
          </button>
        </div>
        <p
          style={{
            textAlign: 'center',
            color: '#be185d',
            fontSize: '0.72rem',
            margin: '8px 0 0',
            opacity: 0.7,
          }}
        >
          BloomCare AI · General information only · Not a substitute for medical advice
        </p>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
