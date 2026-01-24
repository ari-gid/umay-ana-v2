import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { PregnancyCalculator } from "@/components/PregnancyCalculator";
import { ArticlesPreview } from "@/components/ArticlesPreview";

export default async function Home() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col gap-12">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
            {t("kicker")}
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
            {t("title")}
          </h1>
          <p className="text-base text-slate-600 md:text-lg">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/articles">
              <Button>{t("ctaArticles")}</Button>
            </Link>
            <Link href="/forum">
              <Button variant="outline">{t("ctaForum")}</Button>
            </Link>
            <Link href="/ai">
              <Button variant="ghost">{t("ctaAi")}</Button>
            </Link>
          </div>
        </div>
        <Card className="flex flex-col justify-between gap-5 bg-pink-500 text-white">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">{t("weeklyTitle")}</h2>
            <p className="text-sm text-white/90">{t("weeklyDesc")}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 text-sm">
            <p className="font-semibold">{t("weeklyFocusTitle")}</p>
            <p className="text-white/80">{t("weeklyFocusBody")}</p>
          </div>
          <Link href="/profile">
            <Button variant="outline" className="border-white text-white">
              {t("weeklyUpdateProfile")}
            </Button>
          </Link>
        </Card>
      </section>

      <PregnancyCalculator />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              {t("latestTitle")}
            </h2>
            <p className="text-sm text-slate-600">{t("latestSubtitle")}</p>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-pink-600">
            {t("latestViewAll")}
          </Link>
        </div>
        <ArticlesPreview />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4 bg-white/80">
          <h2 className="text-2xl font-semibold text-slate-900">{t("aiTitle")}</h2>
          <p className="text-sm text-slate-600">{t("aiDesc")}</p>
          <Link href="/ai">
            <Button>{t("aiCta")}</Button>
          </Link>
        </Card>
        <Card className="space-y-4 bg-pink-50">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("doctorsTitle")}
          </h2>
          <p className="text-sm text-slate-600">{t("doctorsDesc")}</p>
          <Link href="/doctors">
            <Button variant="outline">{t("doctorsCta")}</Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
