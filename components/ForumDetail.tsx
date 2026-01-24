"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { Tag } from "@/components/Tag";
import { FavoriteButton } from "@/components/FavoriteButton";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  author: { name: string | null };
};

type Post = {
  id: string;
  title: string;
  content: string;
  trimesterTag: string | null;
  topicTags: string[];
  upvotes: number;
  author: { name: string | null };
  comments: Comment[];
};

export function ForumDetail({ postId }: { postId: string }) {
  const t = useTranslations("forum");
  const [post, setPost] = useState<Post | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/forum/${postId}`);
      if (!response.ok) {
        setPost(null);
        return;
      }
      const data = await response.json();
      setPost(data);
    };
    load();
  }, [postId]);

  async function handleComment() {
    if (!comment.trim()) {
      return;
    }
    const response = await fetch(`/api/forum/${postId}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: comment }),
    });
    if (!response.ok) {
      setStatus(t("signInComment"));
      return;
    }
    setComment("");
    setStatus(t("commentAdded"));
    const updated = await fetch(`/api/forum/${postId}`);
    const data = await updated.json();
    setPost(data);
  }

  async function handleUpvote() {
    await fetch(`/api/forum/${postId}/upvote`, { method: "POST" });
    const updated = await fetch(`/api/forum/${postId}`);
    const data = await updated.json();
    setPost(data);
  }

  if (!post) {
    return <p className="text-sm text-slate-600">{t("loading")}</p>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {post.trimesterTag ? <Tag>{post.trimesterTag}</Tag> : null}
          {post.topicTags.map((tag) => (
            <Tag key={tag} className="bg-pink-100 text-pink-700">
              {tag}
            </Tag>
          ))}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-slate-900">{post.title}</h1>
        <p className="mt-3 text-sm text-slate-600">{post.content}</p>
        <p className="mt-4 text-xs text-slate-500">
          {t("postedBy", { name: post.author?.name ?? t("anonymous") })}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button onClick={handleUpvote}>{t("upvote", { count: post.upvotes })}</Button>
          <FavoriteButton itemId={post.id} itemType="POST" />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {t("comments", { count: post.comments.length })}
        </h2>
        <div className="space-y-3">
          {post.comments.map((item) => (
            <div key={item.id} className="rounded-2xl border border-pink-100 bg-white p-4">
              <p className="text-sm text-slate-700">{item.content}</p>
              <p className="mt-2 text-xs text-slate-500">{item.author?.name}</p>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-pink-100 bg-white p-4">
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-pink-200 px-4 py-3 text-sm text-slate-800 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
            placeholder={t("commentPlaceholder")}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <div className="mt-3 flex items-center gap-3">
            <Button onClick={handleComment}>{t("submit")}</Button>
            {status ? <span className="text-xs text-slate-500">{status}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
