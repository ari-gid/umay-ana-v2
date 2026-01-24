"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/Button";

function switchLocale(pathname: string, locale: "en" | "ru") {
  if (!pathname) {
    return `/${locale}`;
  }
  const next = pathname.replace(/^\/(en|ru)(?=\/|$)/, `/${locale}`);
  if (next === pathname) {
    return `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  }
  return next;
}

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={() => router.push(switchLocale(pathname, "ru"))}
        aria-label="Switch to Russian"
      >
        RU
      </Button>
      <Button
        variant="ghost"
        onClick={() => router.push(switchLocale(pathname, "en"))}
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  );
}
