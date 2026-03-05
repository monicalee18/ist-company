"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail?: string;
}

const newsData: NewsItem[] = [
  {
    title: "'기대 그 이상' TUNEXX(튜넥스), 독보적 주파수로 쏘아올린 K팝 新신호탄!",
    link: "https://sports.khan.co.kr/article/202603042126003?pt=nv",
    pubDate: "2026.03.04",
    thumbnail: "https://images.khan.co.kr/article/2026/03/04/news-p.v1.20260304.0a5d8a13a90c45c5aa28eec25f768484_P1.jpg",
  },
  {
    title: "TUNEXX(튜넥스), 오늘(3일) 정식 데뷔..'주파수 ON'",
    link: "https://www.starnewskorea.com/music/2026/03/03/2026030307301835121",
    pubDate: "2026.03.03",
    thumbnail: "https://image.starnewskorea.com/cdn-cgi/image/f=auto,w=1200,h=1200,fit=cover,q=high,sharpen=2/21/2026/03/2026030307301835121_1.jpg",
  },
  {
    title: "TUNEXX(튜넥스), 데뷔 타이틀곡 '내가 살아있다는 증거' 음원 일부 최초 공개",
    link: "https://sports.khan.co.kr/article/202602261040003?pt=nv",
    pubDate: "2026.02.26",
    thumbnail: "https://images.khan.co.kr/article/2026/02/26/news-p.v1.20260226.a7a4d0eb30e042d2b41dd9df4bf187a0_P1.jpeg",
  },
  {
    title: "[포토] 튜넥스(TUNEXX), 오늘 데뷔!",
    link: "https://www.joynews24.com/view/1944619",
    pubDate: "2026.03.03",
    thumbnail: "https://image.inews24.com/v1/ae57ac07e6bb15.jpg",
  },
  {
    title: "TUNEXX(튜넥스), 데뷔 쇼케이스 현장",
    link: "https://news.jtbc.co.kr/article/NB12287857?influxDiv=NAVER",
    pubDate: "2026.03.03",
    thumbnail: "/news/jtbc-tunexx.jpg",
  },
];

export default function NewsPage() {
  const [news] = useState<NewsItem[]>(newsData);

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
            Latest News
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
            Latest News
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
                  className="text-2xl font-light text-white group-hover:text-white/80 transition-colors line-clamp-2"
                >
                  {item.title}
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
                  className="text-xl font-light text-white group-hover:text-white/80 transition-colors line-clamp-2"
                >
                  {item.title}
                </h2>
              </div>
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
