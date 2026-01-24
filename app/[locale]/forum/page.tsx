import { ForumBoard } from "@/components/ForumBoard";
import { getTranslations } from "next-intl/server";

export default async function ForumPage() {
  const t = await getTranslations("forum");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{t("title")}</h1>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
      </div>
      <ForumBoard />
    </div>
  );
}
