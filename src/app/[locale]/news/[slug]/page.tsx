import { notFound } from "next/navigation";
import { getNewsDetail, getNewsList, getNewsSlugs } from "@/lib/news";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const locales = ["ja", "en"];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = await getNewsSlugs(locale);
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await getNewsDetail(slug, locale);

  if (!article) {
    notFound();
  }

  const allNews = await getNewsList(locale);
  const currentIndex = allNews.findIndex((n) => n.slug === slug);
  const prevArticle = currentIndex < allNews.length - 1 ? allNews[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allNews[currentIndex - 1] : null;

  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <time className="text-sm text-gray-300">{article.date}</time>
            <span className="text-xs px-2 py-1 rounded bg-white/10 font-medium">
              {article.category}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{article.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="prose prose-gray max-w-none prose-headings:text-navy prose-a:text-blue hover:prose-a:text-orange">
            <MDXRemote source={article.content} />
          </article>

          <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between gap-4">
            {prevArticle ? (
              <Link
                href={`/news/${prevArticle.slug}`}
                className="group flex-1"
              >
                <span className="text-xs text-gray-500 block mb-1">&larr;</span>
                <span className="text-sm text-navy group-hover:text-orange transition-colors">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/news/${nextArticle.slug}`}
                className="group flex-1 text-right"
              >
                <span className="text-xs text-gray-500 block mb-1">&rarr;</span>
                <span className="text-sm text-navy group-hover:text-orange transition-colors">
                  {nextArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/news"
              className="inline-block border-2 border-navy text-navy px-6 py-2 rounded-lg text-sm font-semibold hover:bg-navy hover:text-white transition-colors"
            >
              &larr; Back to List
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
