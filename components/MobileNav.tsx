import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function MobileNav() {
  const t = await getTranslations("nav");
  const links = [
    { href: "/", label: t("home") },
    { href: "/articles", label: t("articles") },
    { href: "/forum", label: t("forum") },
    { href: "/doctors", label: t("doctors") },
    { href: "/profile", label: t("profile") },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-pink-100 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-pink-500">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
