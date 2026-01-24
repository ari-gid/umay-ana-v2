import { AuthForm } from "@/components/AuthForm";
import { Card } from "@/components/Card";
import { getTranslations } from "next-intl/server";

export default async function AuthPage() {
  const t = await getTranslations("auth");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.6fr_1fr]">
      <Card className="space-y-3 bg-pink-50">
        <h1 className="text-3xl font-semibold text-slate-900">{t("title")}</h1>
        <p className="text-sm text-slate-600">{t("subtitle")}</p>
      </Card>
      <AuthForm />
    </div>
  );
}
