"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const t = useTranslations("news");
  const locale = useLocale();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/news?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, [locale]);

  const categories = ["all", "news", "press", "event"];
  const filtered =
    filter === "all" ? news : news.filter((n) => n.category === filter);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("pageTitle")}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-navy text-white"
                    : "bg-light-gray text-navy hover:bg-gray-200"
                }`}
              >
                {cat === "all"
                  ? t("allCategories")
                  : t(`categories.${cat}`)}
              </button>
            ))}
          </div>

          {paged.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-sm text-gray-500">{item.date}</time>
                    <span className="text-xs px-2 py-1 rounded bg-cream text-navy font-medium">
                      {t(`categories.${item.category}`)}
                    </span>
                  </div>
                  <h2 className="font-bold text-navy group-hover:text-orange transition-colors mb-2">
                    {item.title}
                  </h2>
                  {item.excerpt && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              {t("noArticles")}
            </p>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-light-gray text-navy disabled:opacity-40 hover:bg-gray-200 transition-colors"
              >
                {t("pagination.prev")}
              </button>
              <span className="text-sm text-gray-600">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-light-gray text-navy disabled:opacity-40 hover:bg-gray-200 transition-colors"
              >
                {t("pagination.next")}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
