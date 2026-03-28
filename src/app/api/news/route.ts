import { NextRequest, NextResponse } from "next/server";
import { getNewsList } from "@/lib/news";

export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") || "ja";
  const news = await getNewsList(locale);
  return NextResponse.json(news);
}
