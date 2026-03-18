const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID!;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET!;

interface NaverNewsItem {
  title: string;
  originallink: string;
  link: string;
  description: string;
  pubDate: string;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function formatDate(pubDate: string): string {
  // "Wed, 18 Mar 2026 09:01:00 +0900" → "2026-03-18"
  const d = new Date(pubDate);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/** Fetch og:image from a URL */
async function fetchOgImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return undefined;
    const html = await res.text();
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    return match?.[1] || undefined;
  } catch {
    return undefined;
  }
}

/** Search Naver News for a keyword, return cleaned results */
export async function searchNaverNews(query: string, display: number = 20): Promise<{
  title: string;
  link: string;
  date: string;
  thumbnail?: string;
}[]> {
  const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=${display}&sort=date`;

  const res = await fetch(url, {
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  });

  if (!res.ok) {
    console.error("Naver API error:", res.status);
    return [];
  }

  const data = await res.json();
  const items = (data.items || []).map((item: NaverNewsItem) => ({
    title: stripHtml(item.title),
    link: item.originallink || item.link,
    date: formatDate(item.pubDate),
  }));

  // Fetch og:image thumbnails in parallel
  const withThumbnails = await Promise.all(
    items.map(async (item: { title: string; link: string; date: string }) => {
      const thumbnail = await fetchOgImage(item.link);
      return { ...item, thumbnail };
    })
  );

  return withThumbnails;
}
