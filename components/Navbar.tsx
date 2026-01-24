import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getSessionUser } from "@/lib/session";
import { Button } from "@/components/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export async function Navbar() {
  const user = await getSessionUser();
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-100 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="text-xl font-bold text-slate-900">
          BloomCare
        </Link>
        <div className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
          <Link href="/articles" className="hover:text-pink-500">
            {t("articles")}
          </Link>
          <Link href="/forum" className="hover:text-pink-500">
            {t("forum")}
          </Link>
          <Link href="/doctors" className="hover:text-pink-500">
            {t("doctors")}
          </Link>
          <Link href="/ai" className="hover:text-pink-500">
            {t("ai")}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <>
              <Link href="/profile">
                <Button variant="outline">
                  {t("greeting", { name: user.name ?? t("friend") })}
                </Button>
              </Link>
              <form action="/api/auth/logout" method="post">
                <Button variant="ghost" type="submit">
                  {t("signOut")}
                </Button>
              </form>
            </>
          ) : (
            <Link href="/auth">
              <Button>{t("signIn")}</Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
