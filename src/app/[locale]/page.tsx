import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getNewsList } from "@/lib/news";
import { getLocale } from "next-intl/server";

export default async function HomePage() {
  const locale = await getLocale();
  const allNews = await getNewsList(locale);
  const latestNews = allNews.slice(0, 3);

  return (
    <>
      <HeroSection />
      <ServicesSummary />
      <NewsSummary news={latestNews} />
      <CTASection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations("hero");
  return (
    <section className="relative bg-navy text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-blue-dark to-navy opacity-90" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <p className="text-sm sm:text-base font-medium tracking-widest text-gold mb-4">
          {t("tagline")}
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight whitespace-pre-line">
          {t("title")}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl">
          {t("subtitle")}
        </p>
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-block bg-orange px-8 py-3 rounded-lg text-white font-semibold hover:bg-orange/90 transition-colors"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesSummary() {
  const t = useTranslations("servicesSummary");
  const services = ["noroshi", "tagpo"] as const;

  const icons = {
    noroshi: (
      <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
    tagpo: (
      <svg className="w-6 h-6 text-orange" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
      </svg>
    ),
  };

  return (
    <section className="py-20 bg-light-gray">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-12">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((key) => (
            <div
              key={key}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-cream rounded-lg flex items-center justify-center mb-4">
                {icons[key]}
              </div>
              <h3 className="text-lg font-bold text-navy mb-3">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-block border-2 border-navy text-navy px-8 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function NewsSummary({ news }: { news: { slug: string; title: string; date: string; category: string }[] }) {
  const t = useTranslations("newsSummary");

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-navy mb-12">
          {t("title")}
        </h2>
        {news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="flex items-center gap-4 p-4 rounded-lg hover:bg-light-gray transition-colors group"
              >
                <time className="text-sm text-gray-500 shrink-0 w-28">
                  {item.date}
                </time>
                <span className="text-xs px-2 py-1 rounded bg-cream text-navy font-medium shrink-0">
                  {item.category}
                </span>
                <span className="text-navy group-hover:text-orange transition-colors">
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">-</p>
        )}
        <div className="text-center mt-8">
          <Link
            href="/news"
            className="inline-block border-2 border-navy text-navy px-8 py-3 rounded-lg font-semibold hover:bg-navy hover:text-white transition-colors"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const t = useTranslations("ctaSection");
  return (
    <section className="py-20 bg-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
          {t("title")}
        </h2>
        <p className="text-gray-700 mb-8 max-w-xl mx-auto">
          {t("description")}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-orange px-8 py-3 rounded-lg text-white font-semibold hover:bg-orange/90 transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
