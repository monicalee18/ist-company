import { NextRequest, NextResponse } from "next/server";

const cache = new Map<string, { text: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function POST(request: NextRequest) {
  try {
    const { texts, target = "en" } = await request.json();

    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "texts array required" }, { status: 400 });
    }

    const results: string[] = [];
    const toTranslate: { index: number; text: string }[] = [];

    // Check cache first
    for (let i = 0; i < texts.length; i++) {
      const cacheKey = `${target}:${texts[i]}`;
      const cached = cache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        results[i] = cached.text;
      } else {
        results[i] = "";
        toTranslate.push({ index: i, text: texts[i] });
      }
    }

    // Translate uncached texts
    if (toTranslate.length > 0) {
      const joined = toTranslate.map((t) => t.text).join("\n---\n");

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ko&tl=${target}&dt=t&q=${encodeURIComponent(joined)}`;
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Translation API error: ${res.status}`);
      }

      const data = await res.json();

      // Extract translated text from Google's response format
      let translated = "";
      if (data && data[0]) {
        translated = data[0].map((seg: [string]) => seg[0]).join("");
      }

      // Split back by separator
      const parts = translated.split(/\n?---\n?/);

      for (let i = 0; i < toTranslate.length; i++) {
        const translatedText = parts[i]?.trim() || toTranslate[i].text;
        results[toTranslate[i].index] = translatedText;

        // Cache the result
        const cacheKey = `${target}:${toTranslate[i].text}`;
        cache.set(cacheKey, { text: translatedText, timestamp: Date.now() });
      }
    }

    return NextResponse.json({ translations: results });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
