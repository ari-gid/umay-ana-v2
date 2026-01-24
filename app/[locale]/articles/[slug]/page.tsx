import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Tag } from "@/components/Tag";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ArticleCard } from "@/components/ArticleCard";
import { getBaseUrl } from "@/lib/url";

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  readingTime: number;
  trimesterTags: string[];
  topicTags: string[];
};

type Params = { params: { slug: string } };

async function getArticle(slug: string) {
  const response = await fetch(`${getBaseUrl()}/api/articles/${slug}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return null;
  }
  return (await response.json()) as Article;
}

async function getSimilar(article: Article) {
  const response = await fetch(`${getBaseUrl()}/api/articles`, {
    cache: "no-store",
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  const items = (data.items ?? []) as Article[];
  return items
    .filter((item) => item.slug !== article.slug)
    .filter((item) => item.trimesterTags.some((tag) => article.trimesterTags.includes(tag)))
    .slice(0, 3);
}

export default async function ArticleDetailPage({ params }: Params) {
  const article = await getArticle(params.slug);
  if (!article) {
    notFound();
  }
  const t = await getTranslations("articles");
  const similar = await getSimilar(article);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Link href="/articles" className="text-sm font-semibold text-pink-600">
          {t("back")}
        </Link>
        <h1 className="text-3xl font-semibold text-slate-900">{article.title}</h1>
        <div className="flex flex-wrap gap-2">
          {article.trimesterTags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {article.topicTags.map((tag) => (
            <Tag key={tag} className="bg-pink-100 text-pink-700">
              {tag}
            </Tag>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          {t("minRead", { minutes: article.readingTime })}
        </p>
        <FavoriteButton itemId={article.id} itemType="ARTICLE" />
      </div>
      <article className="prose max-w-none text-slate-700">
        <p>{article.content}</p>
      </article>
      {similar.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">{t("similar")}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {similar.map((item) => (
              <ArticleCard key={item.id} article={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
