import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-pink-100 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-8">
        <div>
          <p className="text-base font-semibold text-slate-700">BloomCare</p>
          <p>{t("tagline")}</p>
        </div>
        <p>{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
