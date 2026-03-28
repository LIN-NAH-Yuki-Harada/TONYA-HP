import type { Metadata } from "next";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { getAllBrands } from "@/lib/brands";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "brands" });
  return {
    title: t("pageTitle"),
  };
}

export default function BrandsPage() {
  return (
    <>
      <PageHeader />
      <BrandsList />
    </>
  );
}

function PageHeader() {
  const t = useTranslations("brands");
  return (
    <section className="bg-navy text-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl">{t("lead")}</p>
      </div>
    </section>
  );
}

async function BrandsList() {
  const locale = await getLocale();
  const t = await getTranslations("brands");
  const brands = getAllBrands();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative h-48 bg-light-gray flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name[locale as "ja" | "en"]}
                  width={200}
                  height={100}
                  className="object-contain p-6"
                />
                {brand.exclusive && (
                  <span className="absolute top-3 right-3 text-xs font-semibold bg-orange text-white px-3 py-1 rounded-full">
                    {t("exclusiveBadge")}
                  </span>
                )}
              </div>
              <div className="p-6">
                <span className="text-xs font-medium text-orange">
                  {brand.category[locale as "ja" | "en"]}
                </span>
                <h3 className="mt-1 text-lg font-bold text-navy group-hover:text-orange transition-colors">
                  {brand.name[locale as "ja" | "en"]}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {brand.description[locale as "ja" | "en"]}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-orange">
                  {t("viewDetail")} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
