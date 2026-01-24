"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";

type ForumPostCardProps = {
  post: {
    id: string;
    title: string;
    content: string;
    trimesterTag: string | null;
    topicTags: string[];
    upvotes: number;
    author?: { name: string | null };
    _count?: { comments: number };
  };
};

export function ForumPostCard({ post }: ForumPostCardProps) {
  const t = useTranslations("forum");

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {post.trimesterTag ? <Tag>{post.trimesterTag}</Tag> : null}
        {post.topicTags.slice(0, 3).map((tag) => (
          <Tag key={tag} className="bg-pink-100 text-pink-700">
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-600">
          {post.content.length > 120 ? `${post.content.slice(0, 120)}...` : post.content}
        </p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          {post.author?.name ?? t("anonymous")} ·{" "}
          {t("commentsCount", { count: post._count?.comments ?? 0 })}
        </span>
        <Link href={`/forum/${post.id}`} className="font-semibold text-pink-600">
          {t("join")}
        </Link>
      </div>
    </Card>
  );
}
