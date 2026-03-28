import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export interface NewsDetail extends NewsItem {
  content: string;
}

const CONTENT_DIR = path.join(process.cwd(), "src/content/news");

export async function getNewsList(locale: string): Promise<NewsItem[]> {
  const dir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "news",
      excerpt: data.excerpt || "",
    };
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getNewsDetail(
  slug: string,
  locale: string
): Promise<NewsDetail | null> {
  const filePath = path.join(CONTENT_DIR, locale, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    category: data.category || "news",
    excerpt: data.excerpt || "",
    content,
  };
}

export async function getNewsSlugs(locale: string): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, locale);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
