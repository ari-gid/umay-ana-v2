import ChatInterface from '@/components/assistant/ChatInterface'

export default function AssistantPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🤖 AI Pregnancy Assistant</h1>
        <p className="text-gray-500">Ask anything about your pregnancy journey. Available 24/7.</p>
      </div>
      <ChatInterface />
    </div>
  )
}
