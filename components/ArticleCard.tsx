"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card } from "@/components/Card";
import { Tag } from "@/components/Tag";

type ArticleCardProps = {
  article: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    readingTime: number;
    trimesterTags: string[];
    topicTags: string[];
  };
};

export function ArticleCard({ article }: ArticleCardProps) {
  const t = useTranslations("articles");

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {article.trimesterTags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {article.topicTags.slice(0, 2).map((tag) => (
          <Tag key={tag} className="bg-pink-100 text-pink-700">
            {tag}
          </Tag>
        ))}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-slate-900">{article.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{article.excerpt}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{t("minRead", { minutes: article.readingTime })}</span>
        <Link href={`/articles/${article.slug}`} className="font-semibold text-pink-600">
          {t("read")}
        </Link>
      </div>
    </Card>
  );
}
