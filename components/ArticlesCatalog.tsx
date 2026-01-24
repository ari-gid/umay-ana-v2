"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ArticleCard } from "@/components/ArticleCard";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  readingTime: number;
  trimesterTags: string[];
  topicTags: string[];
};

export function ArticlesCatalog() {
  const t = useTranslations("articles");
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState("");
  const [trimester, setTrimester] = useState("");
  const [topic, setTopic] = useState("");
  const [readingTimeMax, setReadingTimeMax] = useState("");

  useEffect(() => {
    const load = async () => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (trimester) params.set("trimester", trimester);
      if (topic) params.set("topic", topic);
      if (readingTimeMax) params.set("readingTimeMax", readingTimeMax);
      const response = await fetch(`/api/articles?${params.toString()}`);
      const data = await response.json();
      setArticles(data.items ?? []);
    };
    load();
  }, [search, trimester, topic, readingTimeMax]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Input label={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} />
        <Input
          label={t("trimester")}
          placeholder={t("trimesterPlaceholder")}
          value={trimester}
          onChange={(e) => setTrimester(e.target.value)}
        />
        <Input label={t("topic")} value={topic} onChange={(e) => setTopic(e.target.value)} />
        <Input
          label={t("maxMinutes")}
          type="number"
          min="1"
          value={readingTimeMax}
          onChange={(e) => setReadingTimeMax(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          onClick={() => {
            setSearch("");
            setTrimester("");
            setTopic("");
            setReadingTimeMax("");
          }}
        >
          {t("reset")}
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
