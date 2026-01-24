"use client";

import { useEffect, useState } from "react";
import { ArticleCard } from "@/components/ArticleCard";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
  trimesterTags: string[];
  topicTags: string[];
};

export function ArticlesPreview() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/articles");
      const data = await response.json();
      setArticles(data.items?.slice(0, 6) ?? []);
    };
    load();
  }, []);

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
