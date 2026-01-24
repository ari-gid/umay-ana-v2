import { ChatUI } from "@/components/ChatUI";
import { Card } from "@/components/Card";
import { getTranslations } from "next-intl/server";

export default async function AiPage() {
  const t = await getTranslations("ai");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.6fr_1fr]">
      <Card className="space-y-4 bg-pink-50">
        <h1 className="text-3xl font-semibold text-slate-900">{t("title")}</h1>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
        <p className="text-xs text-slate-500">{t("disclaimer")}</p>
      </Card>
      <ChatUI />
    </div>
  );
}
