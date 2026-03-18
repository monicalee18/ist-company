import { NextResponse } from "next/server";
import { searchNaverNews } from "@/lib/naver-news";
import { getExistingUrls, addNewsToNotion } from "@/lib/notion-news";

const KEYWORDS = ["IST엔터테인먼트", "튜넥스", "TUNEXX"];
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Verify cron secret (skip in development)
  if (process.env.NODE_ENV === "production" && CRON_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    // Get existing URLs to avoid duplicates
    const existingUrls = await getExistingUrls();
    let added = 0;

    for (const keyword of KEYWORDS) {
      const results = await searchNaverNews(keyword, 20);

      for (const item of results) {
        if (existingUrls.has(item.link)) continue;
        // Only include articles where the keyword appears in the title
        if (!item.title.toLowerCase().includes(keyword.toLowerCase())) continue;

        const success = await addNewsToNotion(item);
        if (success) {
          added++;
          existingUrls.add(item.link); // Prevent cross-keyword duplicates
        }
      }
    }

    return NextResponse.json({
      success: true,
      added,
      message: `${added} new articles added to Notion`,
    });
  } catch (error) {
    console.error("News collection failed:", error);
    return NextResponse.json({ error: "Collection failed" }, { status: 500 });
  }
}
