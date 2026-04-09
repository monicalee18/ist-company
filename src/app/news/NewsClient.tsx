"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

interface NewsItemData {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

const PAGE_SIZE = 10;

function NewsItem({ item, index, getTitle, isTranslating, highlight }: { item: NewsItemData; index: number; getTitle: (t: string) => string; isTranslating: boolean; highlight: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [bgColor, setBgColor] = useState("transparent");
  const highlightedRef = useRef(false);

  useEffect(() => {
    if (highlight && !highlightedRef.current && ref.current) {
      highlightedRef.current = true;
      // Highlight immediately before scrolling
      setBgColor("#171717");
      const lenis = (window as unknown as Record<string, unknown>).__lenis as { scrollTo?: (target: HTMLElement, options?: Record<string, unknown>) => void } | undefined;
      if (lenis?.scrollTo) {
        lenis.scrollTo(ref.current, { offset: -window.innerHeight / 3, duration: 1.5 });
      } else {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      // Fade out after scroll arrives (~1.5s scroll + 1s hold)
      setTimeout(() => setBgColor("transparent"), 2500);
    }
  }, [highlight]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderTop: index === 0 ? "1px solid #313033" : "none",
        borderBottom: "1px solid #313033",
        backgroundColor: bgColor,
        transition: "background-color 1.5s ease",
      }}
    >
      {/* Desktop Layout */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group hidden md:grid transition-colors duration-200 hover:bg-[#171717]"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
          paddingTop: "30px",
          paddingBottom: "30px",
          paddingLeft: "24px",
          paddingRight: "24px",
          alignItems: "center",
        }}
      >
        <div className="min-w-0" style={{ gridColumn: "2 / 10" }}>
          <span className="text-sm text-white/40 block" style={{ marginBottom: "8px" }}>
            {item.pubDate}
          </span>
          <h2
            className="text-2xl text-white group-hover:text-white/80 line-clamp-3"
            style={{ fontWeight: 400, opacity: isTranslating ? 0.3 : 1, transition: "opacity 0.3s ease" }}
          >
            {getTitle(item.title)}
          </h2>
        </div>
        <div
          className="overflow-hidden"
          style={{
            gridColumn: "10 / 12",
            width: "100%",
            aspectRatio: "16 / 10",
            maxWidth: "370px",
            marginLeft: "auto",
          }}
        >
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-white/20 text-sm">IMG</span>
            </div>
          )}
        </div>
      </a>

      {/* Mobile Layout */}
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col md:hidden transition-colors duration-200 hover:bg-[#171717]"
        style={{
          paddingTop: "24px",
          paddingBottom: "24px",
          paddingLeft: "16px",
          paddingRight: "16px",
          gap: "20px",
        }}
      >
        <div className="overflow-hidden w-full" style={{ aspectRatio: "16 / 10" }}>
          {item.thumbnail ? (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-white/5 flex items-center justify-center">
              <span className="text-white/20 text-sm">IMG</span>
            </div>
          )}
        </div>
        <div className="min-w-0">
          <span className="text-sm block" style={{ marginBottom: "8px", color: "#79767a" }}>
            {item.pubDate}
          </span>
          <h2
            className="text-white group-hover:text-white/80 line-clamp-3"
            style={{ fontWeight: 400, fontSize: "clamp(1rem, 4.6vw, 1.25rem)", opacity: isTranslating ? 0.3 : 1, transition: "opacity 0.3s ease" }}
          >
            {getTitle(item.title)}
          </h2>
        </div>
      </a>
    </motion.article>
  );
}

export default function NewsClient() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [allNews, setAllNews] = useState<NewsItemData[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});
  const [isTranslating, setIsTranslating] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const processedHighlight = useRef<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch news from Notion API
  useEffect(() => {
    fetch("/api/news")
      .then((res) => res.json())
      .then((data) => {
        setAllNews(data.news || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || allNews.length === 0) return;
    const highlight = searchParams.get("highlight");
    if (!highlight || highlight === processedHighlight.current) return;
    processedHighlight.current = highlight;

    const idx = parseInt(highlight, 10);
    if (isNaN(idx)) return;

    if (idx >= visibleCount) {
      setVisibleCount(idx + 1);
    }
    // Delay to allow rendering
    setTimeout(() => setHighlightIndex(idx), 300);
    // Clear param after highlight
    setTimeout(() => {
      setHighlightIndex(null);
      router.replace("/news", { scroll: false });
    }, 2500);
  }, [searchParams, visibleCount, router, loading, allNews]);

  const translateTitles = useCallback(async (titles: string[]) => {
    const untranslated = titles.filter((title) => !translatedTitles[title]);
    if (untranslated.length === 0) return;

    setIsTranslating(true);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: untranslated, target: "en" }),
      });
      const data = await res.json();
      if (data.translations) {
        setTranslatedTitles((prev) => {
          const next = { ...prev };
          untranslated.forEach((title, i) => {
            next[title] = data.translations[i];
          });
          return next;
        });
      }
    } catch {
      // Fallback to original titles on error
    } finally {
      setIsTranslating(false);
    }
  }, [translatedTitles]);

  useEffect(() => {
    if (language === "EN" && allNews.length > 0) {
      const visibleTitles = allNews.slice(0, visibleCount).map((n) => n.title);
      translateTitles(visibleTitles);
    }
  }, [language, visibleCount, translateTitles, allNews]);

  const getTitle = (title: string) => {
    if (language === "EN" && translatedTitles[title]) {
      return translatedTitles[title];
    }
    return title;
  };
  const news = allNews.slice(0, visibleCount);
  const hasMore = visibleCount < allNews.length;

  return (
    <div
      className="min-h-screen bg-black"
      style={{
        paddingTop: "78px",
      }}
    >
      {/* Header - Desktop with 12-column grid */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "24px",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "60px",
          paddingBottom: "60px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ gridColumn: "1 / 9" }}
        >
          <h1 className="text-6xl font-light text-white">
            Press Releases
          </h1>
        </motion.div>
      </div>

      {/* Header - Mobile */}
      <div
        className="md:hidden"
        style={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-light text-white">
            Press Releases
          </h1>
        </motion.div>
      </div>

      {/* News List - Full width borders */}
      <div>
        {news.map((item, index) => (
          <NewsItem key={index} item={item} index={index} getTitle={getTitle} isTranslating={isTranslating && language === "EN" && !translatedTitles[item.title]} highlight={highlightIndex === index} />
        ))}
      </div>

      {/* See more */}
      {hasMore && (
        <div className="flex flex-col items-center" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="text-white/60 text-base hover:text-white transition-colors underline underline-offset-4"
          >
            {t("더보기", "See more")}
          </button>
          <span
            style={{ marginTop: "24px", fontSize: "clamp(0.875rem, 4.1vw, 1rem)", color: "#79767a" }}
          >
            {t(`${allNews.length}개 중 ${visibleCount}개 표시`, `You've seen ${visibleCount} of ${allNews.length}`)}
          </span>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-[40px] md:h-[60px]" />
    </div>
  );
}
