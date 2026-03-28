import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/lib/news";
import { getAllBrandSlugs } from "@/lib/brands";

const BASE_URL = "https://tonyainc.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = ["ja", "en"];
  const staticPages = ["", "/about", "/services", "/brands", "/news", "/contact", "/privacy"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "/news" ? "weekly" : "monthly",
        priority: page === "" ? 1 : 0.8,
      });
    }

    const newsSlugs = await getNewsSlugs(locale);
    for (const slug of newsSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/news/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    const brandSlugs = getAllBrandSlugs();
    for (const slug of brandSlugs) {
      entries.push({
        url: `${BASE_URL}/${locale}/brands/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
