import brandsData from "@/data/brands.json";

export interface BrandProduct {
  name: { ja: string; en: string };
  description: { ja: string; en: string };
  image: string;
}

export interface Brand {
  slug: string;
  name: { ja: string; en: string };
  category: { ja: string; en: string };
  description: { ja: string; en: string };
  story: { ja: string; en: string };
  logo: string;
  heroImage: string;
  exclusive: boolean;
  products: BrandProduct[];
}

const brands: Brand[] = brandsData as Brand[];

export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getAllBrandSlugs(): string[] {
  return brands.map((b) => b.slug);
}
