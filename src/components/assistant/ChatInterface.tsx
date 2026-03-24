'use client'

import { useState, useRef, useEffect } from 'react'
import Button from '@/components/ui/Button'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const suggestions = [
  'I have morning sickness, what can I do?',
  'What foods should I avoid during pregnancy?',
  'Is it safe to exercise in my second trimester?',
  'How can I improve my sleep?',
  'What happens in the third trimester?',
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm your BloomCare pregnancy assistant. 🌸 

I'm here to support you throughout your pregnancy journey. I can help with nutrition, exercise, symptoms, development stages, and much more!

What would you like to know today? ✨`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input.trim()
    if (!messageText || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: messageText }])
    setLoading(true)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response ?? 'Sorry, I could not process your request.' }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, there was an error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: bold }} />
    })
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-sm border border-pink-medium/20 overflow-hidden">
      {/* Header */}
      <div className="bg-[#FF5FA2] text-white px-6 py-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
          🌸
        </div>
        <div>
          <h3 className="font-bold">BloomCare Assistant</h3>
          <p className="text-xs text-white/80">Pregnancy support & guidance</p>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
          <span className="text-xs text-white/80">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[#FFE6F0] flex items-center justify-center text-sm mr-2 mt-1 flex-shrink-0">
                🌸
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#FF5FA2] text-white rounded-tr-none'
                  : 'bg-[#FFE6F0] text-gray-800 rounded-tl-none'
              }`}
            >
              {formatMessage(msg.content)}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-[#FFE6F0] flex items-center justify-center text-sm mr-2">
              🌸
            </div>
            <div className="bg-[#FFE6F0] rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#FF5FA2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#FF5FA2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#FF5FA2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#FFE6F0] text-[#FF5FA2] hover:bg-[#FFB3D1] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about pregnancy..."
            className="flex-1 px-4 py-2 rounded-full border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 text-sm"
          />
          <Button variant="primary" size="sm" onClick={() => sendMessage()} loading={loading}>
            Send
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          ⚠️ For medical concerns, always consult your healthcare provider
        </p>
      </div>
    </div>
  )
}
