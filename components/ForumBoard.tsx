"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ForumPostCard } from "@/components/ForumPostCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

type ForumPost = {
  id: string;
  title: string;
  content: string;
  trimesterTag: string | null;
  topicTags: string[];
  upvotes: number;
  author?: { name: string | null };
  _count?: { comments: number };
};

export function ForumBoard() {
  const t = useTranslations("forum");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [search, setSearch] = useState("");
  const [trimester, setTrimester] = useState("");
  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (trimester) params.set("trimester", trimester);
      if (topic) params.set("topic", topic);
      const response = await fetch(`/api/forum?${params.toString()}`);
      const data = await response.json();
      setPosts(data.items ?? []);
    };
    load();
  }, [search, trimester, topic]);

  async function createPost() {
    setStatus(null);
    const response = await fetch("/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        trimesterTag: trimester || null,
        topicTags: topic ? [topic] : [],
      }),
    });
    if (!response.ok) {
      setStatus(t("signInPost"));
      return;
    }
    setTitle("");
    setContent("");
    setStatus(t("posted"));
    const data = await response.json();
    setPosts((prev) => [data, ...prev]);
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Input label={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input
          label={t("trimester")}
          placeholder={t("trimesterPlaceholder")}
          value={trimester}
          onChange={(e) => setTrimester(e.target.value)}
        />
        <Input label={t("topic")} value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>

      <div className="rounded-3xl border border-pink-100 bg-white p-5">
        <h3 className="text-lg font-semibold text-slate-900">{t("startTitle")}</h3>
        <div className="mt-4 grid gap-3">
          <Input label={t("titleLabel")} value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
            <span>{t("message")}</span>
            <textarea
              className="min-h-[120px] rounded-2xl border border-pink-200 bg-white px-4 py-3 text-sm text-slate-800 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
          <div className="flex items-center gap-3">
            <Button onClick={createPost}>{t("post")}</Button>
            {status ? <span className="text-xs text-slate-500">{status}</span> : null}
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <ForumPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
