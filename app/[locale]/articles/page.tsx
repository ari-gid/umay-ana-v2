import { ArticlesCatalog } from "@/components/ArticlesCatalog";
import { getTranslations } from "next-intl/server";

export default async function ArticlesPage() {
  const t = await getTranslations("articles");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{t("title")}</h1>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
      </div>
      <ArticlesCatalog />
    </div>
  );
}
