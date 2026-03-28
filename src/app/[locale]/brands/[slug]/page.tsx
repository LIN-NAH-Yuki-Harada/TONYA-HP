import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllBrandSlugs, getBrandBySlug } from "@/lib/brands";

type Locale = "ja" | "en";

export async function generateStaticParams() {
  const slugs = getAllBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    title: brand.name[locale as Locale],
    description: brand.description[locale as Locale],
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const brand = getBrandBySlug(slug);

  if (!brand) {
    notFound();
  }

  return (
    <>
      <BrandHero brand={brand} locale={locale as Locale} />
      <BrandStory brand={brand} locale={locale as Locale} />
      <ProductLineup brand={brand} locale={locale as Locale} />
      <ExclusiveMessage />
      <CTASection />
      <BackLink />
    </>
  );
}

function BrandHero({
  brand,
  locale,
}: {
  brand: NonNullable<ReturnType<typeof getBrandBySlug>>;
  locale: Locale;
}) {
  const t = useTranslations("brands");
  return (
    <section className="bg-navy text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0">
            <Image
              src={brand.logo}
              alt={brand.name[locale]}
              width={64}
              height={64}
              className="object-contain p-2"
            />
          </div>
          <div>
            <span className="text-sm text-gold font-medium">
              {brand.category[locale]}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-1">
              {brand.name[locale]}
            </h1>
            <p className="mt-2 text-gray-300 max-w-2xl">
              {brand.description[locale]}
            </p>
            {brand.exclusive && (
              <span className="inline-block mt-3 text-xs font-semibold bg-orange text-white px-3 py-1 rounded-full">
                {t("exclusiveBadge")}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandStory({
  brand,
  locale,
}: {
  brand: NonNullable<ReturnType<typeof getBrandBySlug>>;
  locale: Locale;
}) {
  const t = useTranslations("brands");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-6">
          {t("storyTitle")}
        </h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl whitespace-pre-line">
          {brand.story[locale]}
        </p>
      </div>
    </section>
  );
}

function ProductLineup({
  brand,
  locale,
}: {
  brand: NonNullable<ReturnType<typeof getBrandBySlug>>;
  locale: Locale;
}) {
  const t = useTranslations("brands");

  if (brand.products.length === 0) return null;

  return (
    <section className="py-20 bg-light-gray">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-12 text-center">
          {t("productsTitle")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brand.products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl overflow-hidden shadow-sm"
            >
              <div className="relative h-48 bg-gray-50 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name[locale]}
                  width={200}
                  height={200}
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-navy">
                  {product.name[locale]}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {product.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExclusiveMessage() {
  const t = useTranslations("brands");
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-cream rounded-xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange/10 rounded-full mb-4">
            <svg
              className="w-6 h-6 text-orange"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <p className="text-navy font-medium max-w-2xl mx-auto">
            {t("exclusiveMessage")}
          </p>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations("brands");
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
          {t("ctaTitle")}
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          {t("ctaDescription")}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange px-8 py-3 rounded-lg text-white font-semibold hover:bg-orange/90 transition-colors"
        >
          {t("ctaButton")}
        </Link>
      </div>
    </section>
  );
}

function BackLink() {
  const t = useTranslations("brands");
  return (
    <div className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/brands"
          className="inline-flex items-center text-sm font-medium text-navy hover:text-orange transition-colors"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          {t("backToList")}
        </Link>
      </div>
    </div>
  );
}
