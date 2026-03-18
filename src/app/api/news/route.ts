import { NextResponse } from "next/server";
import { getPublishedNews } from "@/lib/notion-news";

export async function GET() {
  try {
    const news = await getPublishedNews();
    return NextResponse.json({ news }, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" },
    });
  } catch (error) {
    console.error("Failed to fetch news from Notion:", error);
    return NextResponse.json({ news: [], error: "Failed to fetch news" }, { status: 500 });
  }
}
