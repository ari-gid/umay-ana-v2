import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: "en" | "ru" }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-8 md:px-8">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </div>
    </NextIntlClientProvider>
  );
}
