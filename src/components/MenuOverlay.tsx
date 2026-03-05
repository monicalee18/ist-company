"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { label: "About", href: "/about", image: "/menu/about.jpg" },
  { label: "Artist", href: "/artist", image: "/menu/artist.jpg" },
  { label: "Latest News", href: "/news", image: "/menu/news.jpg" },
  { label: "Audition", href: "/audition", image: "/menu/audition.jpg" },
  { label: "Contact", href: "/contact", image: "/menu/contact.jpg" },
];

// Latest news data
const latestNews = [
  {
    id: 1,
    date: "2026.03.04",
    title: "'기대 그 이상' TUNEXX(튜넥스), 독보적 주파수로 쏘아올린 K팝 新신호탄!",
    thumbnail: "https://images.khan.co.kr/article/2026/03/04/news-p.v1.20260304.0a5d8a13a90c45c5aa28eec25f768484_P1.jpg",
    link: "https://sports.khan.co.kr/article/202603042126003?pt=nv",
  },
  {
    id: 2,
    date: "2026.03.03",
    title: "TUNEXX(튜넥스), 오늘(3일) 정식 데뷔..'주파수 ON'",
    thumbnail: "https://image.starnewskorea.com/cdn-cgi/image/f=auto,w=1200,h=1200,fit=cover,q=high,sharpen=2/21/2026/03/2026030307301835121_1.jpg",
    link: "https://www.starnewskorea.com/music/2026/03/03/2026030307301835121",
  },
  {
    id: 3,
    date: "2026.02.26",
    title: "TUNEXX(튜넥스), 데뷔 타이틀곡 '내가 살아있다는 증거' 음원 일부 최초 공개",
    thumbnail: "https://images.khan.co.kr/article/2026/02/26/news-p.v1.20260226.a7a4d0eb30e042d2b41dd9df4bf187a0_P1.jpeg",
    link: "https://sports.khan.co.kr/article/202602261040003?pt=nv",
  },
  {
    id: 4,
    date: "2026.03.03",
    title: "[포토] 튜넥스(TUNEXX), 오늘 데뷔!",
    thumbnail: "https://image.inews24.com/v1/ae57ac07e6bb15.jpg",
    link: "https://www.joynews24.com/view/1944619",
  },
  {
    id: 5,
    date: "2026.03.03",
    title: "TUNEXX(튜넥스), 데뷔 쇼케이스 현장",
    thumbnail: "/news/jtbc-tunexx.jpg",
    link: "https://news.jtbc.co.kr/article/NB12287857?influxDiv=NAVER",
  },
];

// Animation variants
const backgroundVariants = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    opacity: 0,
    scale: 1.15,
    transition: { duration: 0.5, delay: 0.35, ease: [0.4, 0, 1, 1] as const }
  }
};

const leftFrameVariants = {
  initial: { x: "-100%" },
  animate: {
    x: 0,
    transition: { duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.4, delay: 0.15, ease: [0.4, 0, 1, 1] as const }
  }
};

const rightFrameVariants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: { duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    x: "100%",
    transition: { duration: 0.4, delay: 0.15, ease: [0.4, 0, 1, 1] as const }
  }
};

const topFrameVariants = {
  initial: { y: "-100%" },
  animate: {
    y: 0,
    transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.35, delay: 0.2, ease: [0.4, 0, 1, 1] as const }
  }
};

const bottomFrameVariants = {
  initial: { y: "100%" },
  animate: {
    y: 0,
    transition: { duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    y: "100%",
    transition: { duration: 0.35, delay: 0.2, ease: [0.4, 0, 1, 1] as const }
  }
};

const leftContentVariants = {
  initial: { opacity: 1, x: -40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }
  },
  exit: {
    opacity: 0,
    x: -80,
    transition: { duration: 0.35, delay: 0, ease: [0.4, 0, 1, 1] as const }
  }
};

const menuItemVariants = {
  initial: { opacity: 0, x: -25 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

const rightContentVariants = {
  initial: { opacity: 1, x: 40 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      delay: 0.4,
      ease: [0.16, 1, 0.3, 1] as const,
      staggerChildren: 0.07,
      delayChildren: 0.5
    }
  },
  exit: {
    opacity: 0,
    x: 80,
    transition: { duration: 0.35, delay: 0, ease: [0.4, 0, 1, 1] as const }
  }
};

const newsItemVariants = {
  initial: { opacity: 0, x: 25 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function MenuOverlay() {
  const { isMenuOpen, closeMenu } = useMenu();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(menuItems[0].image);

  // Set initial image and hover state based on current page when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      const currentIndex = menuItems.findIndex(item => item.href === pathname);
      if (currentIndex !== -1) {
        setActiveImage(menuItems[currentIndex].image);
        setHoveredIndex(currentIndex);
      } else {
        // If on home or unknown page, reset to default
        setActiveImage(menuItems[0].image);
        setHoveredIndex(null);
      }
    }
  }, [isMenuOpen, pathname]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setActiveImage(menuItems[index].image);
  };

  const handleMouseLeave = () => {
    // Don't reset if on current page
    const currentIndex = menuItems.findIndex(item => item.href === pathname);
    if (currentIndex !== -1) {
      setHoveredIndex(currentIndex);
      setActiveImage(menuItems[currentIndex].image);
    } else {
      setHoveredIndex(null);
    }
  };

  const handleMenuClick = (href: string) => {
    closeMenu();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Solid background to prevent page content showing through */}
          <div className="absolute inset-0 z-0 bg-black" />

          {/* Background Image - Full screen, appears behind content */}
          <motion.div
            className="absolute inset-0 z-[1]"
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={activeImage}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={activeImage}
                  alt="Featured"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* White overlay frames that slide in over the image */}
          {/* Left frame */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-white z-10"
            variants={leftFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "33.333%" }}
          />
          {/* Right frame */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 bg-white z-10"
            variants={rightFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "33.333%" }}
          />
          {/* Top frame */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white z-10"
            variants={topFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ height: "78px" }}
          />
          {/* Bottom frame */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white z-10"
            variants={bottomFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ height: "80px" }}
          />

          {/* Desktop Layout - 3 Grid */}
          <div
            className="hidden md:grid h-full w-full relative z-20"
            style={{
              paddingTop: "78px",
              paddingBottom: "80px",
              paddingLeft: "24px",
              paddingRight: "24px",
              gridTemplateColumns: "1fr 1fr 1fr",
            }}
          >
            {/* Left Column - Menu (left aligned) */}
            <motion.nav
              className="flex flex-col justify-center"
              variants={leftContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.ul
                className="flex flex-col gap-3"
                variants={{
                  animate: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  }
                }}
              >
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    variants={menuItemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.href);
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="group inline-block relative"
                    >
                      <span
                        className={`text-3xl lg:text-4xl xl:text-5xl font-light transition-colors duration-300 ${
                          hoveredIndex === null
                            ? "text-black/60"
                            : hoveredIndex === index
                            ? "text-black"
                            : "text-black/30"
                        }`}
                      >
                        {item.label}
                      </span>
                      {/* Underline */}
                      <span
                        className={`absolute left-0 bottom-0 h-[2px] bg-black transition-all duration-300 ${
                          hoveredIndex === index ? "w-full" : "w-0"
                        }`}
                      />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Language Switcher */}
              <motion.div
                className="flex items-center gap-2"
                style={{ marginTop: "40px" }}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.95,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <button
                  onClick={() => setLanguage("KO")}
                  className={`text-sm transition-colors ${
                    language === "KO" ? "text-black" : "text-black/40 hover:text-black/60"
                  }`}
                >
                  KO
                </button>
                <span className="text-black/30">/</span>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`text-sm transition-colors ${
                    language === "EN" ? "text-black" : "text-black/40 hover:text-black/60"
                  }`}
                >
                  EN
                </button>
              </motion.div>
            </motion.nav>

            {/* Center Column - Transparent to show background image */}
            <div className="flex items-center justify-center px-6">
              {/* Empty - background image shows through */}
            </div>


            {/* Right Column - News (right aligned) */}
            <motion.div
              className="flex flex-col justify-center items-end"
              variants={rightContentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                className="flex flex-col w-full max-w-[240px]"
                style={{ gap: "4px" }}
                variants={{
                  animate: {
                    transition: { staggerChildren: 0.07, delayChildren: 0.1 }
                  }
                }}
              >
                {latestNews.map((news) => (
                  <motion.div
                    key={news.id}
                    variants={newsItemVariants}
                  >
                    <Link
                      href="/news"
                      onClick={closeMenu}
                      className="group block transition-all hover:border-[#C7C7C7]"
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingTop: "12px",
                        paddingLeft: "12px",
                        paddingRight: "12px",
                        paddingBottom: "12px",
                        border: "1px solid transparent",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C7C7C7"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                    >
                      {/* Date above thumbnail */}
                      <span className="text-xs text-black/40 block" style={{ marginBottom: "6px" }}>{news.date}</span>
                      <div className="flex gap-[10px]">
                        {/* Thumbnail */}
                        <div
                          className="flex-shrink-0 overflow-hidden"
                          style={{ width: "48px", height: "48px" }}
                        >
                          <Image
                            src={news.thumbnail}
                            alt={news.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Text Content */}
                        <div className="flex flex-col flex-1 min-w-0">
                          <span
                            className="text-black/80 group-hover:text-black transition-colors"
                            style={{ fontSize: "12px", lineHeight: "1.2" }}
                          >
                            {news.title}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

            </motion.div>
          </div>

          {/* Mobile Layout */}
          <div
            className="md:hidden h-full w-full flex flex-col overflow-hidden relative z-20"
            style={{ paddingTop: "78px", paddingBottom: "16px", paddingLeft: "16px", paddingRight: "0px" }}
          >
            {/* White background for mobile */}
            <motion.div
              className="absolute inset-0 bg-white z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Featured Image */}
            <motion.div
              className="w-full"
              style={{ marginBottom: "20px", paddingRight: "16px" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={activeImage}
                  alt="Featured"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* Menu */}
            <motion.nav
              style={{ marginBottom: "30px" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className="flex flex-col" style={{ gap: "0px" }}>
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.href);
                      }}
                      className="inline-block relative"
                      style={{ paddingTop: "2px", paddingBottom: "2px" }}
                    >
                      <span className="text-2xl font-light text-black/60 hover:text-black transition-colors">
                        {item.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Language Switcher */}
              <motion.div
                className="flex items-center gap-2"
                style={{ marginTop: "40px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <button
                  onClick={() => setLanguage("KO")}
                  className={`text-sm transition-colors ${
                    language === "KO" ? "text-black" : "text-black/40 hover:text-black/60"
                  }`}
                >
                  KO
                </button>
                <span className="text-black/30">/</span>
                <button
                  onClick={() => setLanguage("EN")}
                  className={`text-sm transition-colors ${
                    language === "EN" ? "text-black" : "text-black/40 hover:text-black/60"
                  }`}
                >
                  EN
                </button>
              </motion.div>
            </motion.nav>

            {/* Spacer to push news to bottom */}
            <div className="flex-1" />

            {/* Horizontal Scrollable News */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex overflow-x-auto scrollbar-hide" style={{ gap: "4px", paddingRight: "16px" }}>
                {latestNews.map((news) => (
                  <Link
                    key={news.id}
                    href="/news"
                    onClick={closeMenu}
                    className="flex-shrink-0 w-[240px] transition-all"
                    style={{
                      backgroundColor: "#F5F5F5",
                      paddingTop: "12px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      paddingBottom: "12px",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#C7C7C7"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                  >
                    {/* Date above thumbnail */}
                    <span className="text-xs text-black/40 block" style={{ marginBottom: "6px" }}>{news.date}</span>
                    <div className="flex gap-[10px]">
                      {/* Thumbnail */}
                      <div
                        className="flex-shrink-0 overflow-hidden"
                        style={{ width: "48px", height: "48px" }}
                      >
                        <Image
                          src={news.thumbnail}
                          alt={news.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Text Content */}
                      <div className="flex flex-col flex-1 min-w-0">
                        <span
                          className="text-black/80"
                          style={{ fontSize: "12px", lineHeight: "1.2" }}
                        >
                          {news.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
