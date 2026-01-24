"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function ChatUI() {
  const t = useTranslations("ai");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [disclaimer, setDisclaimer] = useState("");

  async function handleSend() {
    if (!input.trim()) {
      return;
    }
    const nextMessages = [...messages, { role: "user", content: input }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setDisclaimer(data.disclaimer);
    setLoading(false);
  }

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex-1 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-600">
            Share how you are feeling today and receive gentle, non-medical guidance.
          </p>
        ) : null}
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`rounded-2xl px-4 py-3 text-sm ${
              message.role === "user"
                ? "ml-auto bg-pink-500 text-white"
                : "bg-pink-50 text-slate-700"
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <textarea
          className="min-h-[96px] w-full rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
          placeholder={t("placeholder")}
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <Button onClick={handleSend} disabled={loading}>
          {loading ? t("thinking") : t("send")}
        </Button>
        {disclaimer ? <p className="text-xs text-slate-500">{disclaimer}</p> : null}
      </div>
    </Card>
  );
}
