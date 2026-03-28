import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Lato } from "next/font/google";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isJa = locale === "ja";

  return {
    title: {
      default: isJa
        ? "株式会社TONYA | EC/D2Cブランドの国内リテール進出支援"
        : "TONYA Inc. | EC/D2C Brand Retail Expansion Support",
      template: isJa ? "%s | 株式会社TONYA" : "%s | TONYA Inc.",
    },
    description: isJa
      ? "EC/D2Cブランドの国内リテール（実店舗）進出を、戦略設計からバイヤー商談、売場づくり、POS分析まで一気通貫で伴走します。New Style Merchandising."
      : "End-to-end support for EC/D2C brands entering physical retail — from strategy design to buyer negotiations, store placement, and POS analytics. New Style Merchandising.",
    metadataBase: new URL("https://tonyainc.jp"),
    alternates: {
      canonical: `/${locale}`,
      languages: { ja: "/ja", en: "/en" },
    },
    openGraph: {
      type: "website",
      locale: isJa ? "ja_JP" : "en_US",
      siteName: isJa ? "株式会社TONYA" : "TONYA Inc.",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${lato.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
