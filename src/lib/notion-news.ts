const NOTION_API_KEY = process.env.NOTION_API_KEY!;
const DATABASE_ID = process.env.NOTION_NEWS_DB_ID!;

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

interface NotionFile {
  type: "file" | "external";
  file?: { url: string };
  external?: { url: string };
}

interface NotionRichText {
  plain_text: string;
}

interface NotionPage {
  properties: {
    "뉴스 제목": { type: "title"; title: NotionRichText[] };
    URL: { type: "url"; url: string | null };
    "날짜": { type: "date"; date: { start: string } | null };
    "썸네일": { type: "files"; files: NotionFile[] };
    Checkbox: { type: "checkbox"; checkbox: boolean };
  };
}

function extractPageData(page: NotionPage): NewsItem | null {
  const props = page.properties;

  const title =
    props["뉴스 제목"].title.length > 0
      ? props["뉴스 제목"].title.map((t) => t.plain_text).join("")
      : "";

  const link = props.URL.url || "";

  const rawDate = props["날짜"].date ? props["날짜"].date.start : "";
  const pubDate = rawDate.replace(/-/g, ".");

  let thumbnail: string | undefined;
  if (props["썸네일"].files.length > 0) {
    const file = props["썸네일"].files[0];
    if (file.type === "file" && file.file) {
      thumbnail = file.file.url;
    } else if (file.type === "external" && file.external) {
      thumbnail = file.external.url;
    }
  }

  if (!title) return null;

  return { title, link, pubDate, thumbnail };
}

/** Fetch news items where Checkbox is checked, sorted by date descending */
export async function getPublishedNews(): Promise<NewsItem[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter: {
        property: "Checkbox",
        checkbox: { equals: true },
      },
      sorts: [
        { property: "날짜", direction: "descending" },
      ],
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error("Notion API error:", res.status, await res.text());
    return [];
  }

  const data = await res.json();
  const items: NewsItem[] = [];

  for (const page of data.results) {
    const item = extractPageData(page as NotionPage);
    if (item) items.push(item);
  }

  return items;
}

/** Get all URLs currently in the Notion DB (for dedup) */
export async function getExistingUrls(): Promise<Set<string>> {
  const res = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ page_size: 100 }),
    cache: "no-store",
  });

  if (!res.ok) return new Set();

  const data = await res.json();
  const urls = new Set<string>();
  for (const page of data.results) {
    const urlProp = page.properties?.URL;
    if (urlProp?.type === "url" && urlProp.url) {
      urls.add(urlProp.url);
    }
  }
  return urls;
}

/** Add a news item to Notion DB (Checkbox OFF by default) */
export async function addNewsToNotion(item: { title: string; link: string; date: string; thumbnail?: string }): Promise<boolean> {
  const properties: Record<string, unknown> = {
    "뉴스 제목": {
      title: [{ text: { content: item.title } }],
    },
    URL: { url: item.link },
    "날짜": { date: { start: item.date } },
    Checkbox: { checkbox: false },
  };

  if (item.thumbnail) {
    properties["썸네일"] = {
      files: [{ type: "external", name: "thumbnail", external: { url: item.thumbnail } }],
    };
  }

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: DATABASE_ID },
      properties,
    }),
  });

  if (!res.ok) {
    console.error("Failed to add news to Notion:", res.status, await res.text());
    return false;
  }
  return true;
}
