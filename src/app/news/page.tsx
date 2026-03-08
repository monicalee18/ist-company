"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { newsData } from "@/lib/news";

const PAGE_SIZE = 10;

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [translatedTitles, setTranslatedTitles] = useState<Record<string, string>>({});

  const translateTitles = useCallback(async (titles: string[]) => {
    const untranslated = titles.filter((title) => !translatedTitles[title]);
    if (untranslated.length === 0) return;

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
    }
  }, [translatedTitles]);

  useEffect(() => {
    if (language === "EN") {
      const visibleTitles = newsData.slice(0, visibleCount).map((n) => n.title);
      translateTitles(visibleTitles);
    }
  }, [language, visibleCount, translateTitles]);

  const getTitle = (title: string) => {
    if (language === "EN" && translatedTitles[title]) {
      return translatedTitles[title];
    }
    return title;
  };
  const news = newsData.slice(0, visibleCount);
  const hasMore = visibleCount < newsData.length;

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
          style={{ gridColumn: "2 / 12" }}
        >
          <h1 className="text-6xl font-light text-white">
            {t("최신 뉴스", "Latest News")}
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
            {t("최신 뉴스", "Latest News")}
          </h1>
        </motion.div>
      </div>

      {/* News List - Full width borders */}
      <div>
        {news.map((item, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{
              borderTop: index === 0 ? "1px solid rgba(255,255,255,0.1)" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Desktop Layout */}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden md:grid"
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
              {/* Content - starts at column 2 */}
              <div
                className="min-w-0"
                style={{ gridColumn: "2 / 10" }}
              >
                <span
                  className="text-sm text-white/40 block"
                  style={{ marginBottom: "8px" }}
                >
                  {item.pubDate}
                </span>
                <h2
                  className="text-2xl text-white group-hover:text-white/80 transition-colors line-clamp-3"
                    style={{ fontWeight: 400 }}
                >
                  {getTitle(item.title)}
                </h2>
              </div>

              {/* Thumbnail - ends at column 11 */}
              <div
                className="overflow-hidden"
                style={{
                  gridColumn: "10 / 12",
                  aspectRatio: "16 / 10",
                  maxWidth: "370px",
                  marginLeft: "auto",
                }}
              >
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={320}
                    height={200}
                    className="w-full h-full object-cover"
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
              className="group flex flex-col md:hidden"
              style={{
                paddingTop: "24px",
                paddingBottom: "24px",
                paddingLeft: "16px",
                paddingRight: "16px",
                gap: "20px",
              }}
            >
              {/* Thumbnail - Top */}
              <div
                className="overflow-hidden w-full"
                style={{
                  aspectRatio: "16 / 10",
                }}
              >
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={600}
                    height={375}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-white/20 text-sm">IMG</span>
                  </div>
                )}
              </div>

              {/* Content - Below */}
              <div className="min-w-0">
                <span
                  className="text-sm text-white/40 block"
                  style={{ marginBottom: "8px" }}
                >
                  {item.pubDate}
                </span>
                <h2
                  className="text-xl text-white group-hover:text-white/80 transition-colors line-clamp-3"
                    style={{ fontWeight: 400 }}
                >
                  {getTitle(item.title)}
                </h2>
              </div>
            </a>
          </motion.article>
        ))}
      </div>

      {/* See more */}
      {hasMore && (
        <div className="flex justify-center" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="text-white/60 text-sm hover:text-white transition-colors underline underline-offset-4"
          >
            {t("더 보기", "See more")}
          </button>
        </div>
      )}

      {/* Bottom spacing */}
      <div className="h-[40px] md:h-[60px]" />
    </div>
  );
}
