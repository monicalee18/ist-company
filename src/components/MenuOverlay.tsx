"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useMenu } from "@/context/MenuContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { getLatestNews } from "@/lib/news";

const menuItemsData = [
  { label: "About", href: "/about", image: "/menu/about.webp" },
  { label: "Artist", href: "/artist", image: "/menu/artist.webp" },
  { label: "Latest News", href: "/news", image: "/menu/news.webp" },
  { label: "Audition", href: "/audition", image: "/menu/audition.webp" },
  { label: "Contact", href: "/contact", image: "/menu/contact.webp" },
];

// Latest news from shared data
const latestNews = getLatestNews(5).map((item, i) => ({
  id: i + 1,
  date: item.pubDate,
  title: item.title,
  thumbnail: item.thumbnail || "",
  link: item.link,
}));

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
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 20,
      delay: 0.4,
      staggerChildren: 0.1,
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
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 18
    }
  }
};

export default function MenuOverlay() {
  const { isMenuOpen, closeMenu } = useMenu();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(menuItemsData[0].image);
  const [mobileTransition, setMobileTransition] = useState<"idle" | "image" | "expand" | "slidedown">("idle");

  const menuItems = menuItemsData;
  const [translatedNews, setTranslatedNews] = useState<Record<string, string>>({});

  const translateNewsTitles = useCallback(async () => {
    const titles = latestNews.map((n) => n.title);
    const untranslated = titles.filter((t) => !translatedNews[t]);
    if (untranslated.length === 0) return;
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: untranslated, target: "en" }),
      });
      const data = await res.json();
      if (data.translations) {
        setTranslatedNews((prev) => {
          const next = { ...prev };
          untranslated.forEach((title, i) => {
            next[title] = data.translations[i];
          });
          return next;
        });
      }
    } catch { /* fallback to original */ }
  }, [translatedNews]);

  useEffect(() => {
    if (language === "EN" && isMenuOpen) {
      translateNewsTitles();
    }
  }, [language, isMenuOpen, translateNewsTitles]);

  const getNewsTitle = (title: string) => {
    if (language === "EN" && translatedNews[title]) return translatedNews[title];
    return title;
  };

  // Set initial image and hover state based on current page when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      setMobileTransition("idle");
      const currentIndex = menuItemsData.findIndex(item => item.href === pathname);
      if (currentIndex !== -1) {
        setActiveImage(menuItemsData[currentIndex].image);
        setHoveredIndex(currentIndex);
      } else {
        // If on home or unknown page, reset to default
        setActiveImage(menuItemsData[0].image);
        setHoveredIndex(null);
      }
    }
  }, [isMenuOpen, pathname]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setActiveImage(menuItemsData[index].image);
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

  const handleMobileMenuClick = (href: string, index: number) => {
    // 1. Navigate immediately so page renders behind overlay
    router.prefetch(href);
    router.push(href);

    // 2. Image swap
    setActiveImage(menuItemsData[index].image);
    setMobileTransition("image");

    // 3. Fullscreen expand
    setTimeout(() => {
      setMobileTransition("expand");
    }, 500);

    // 4. Slide down (extra delay to let page render underneath)
    setTimeout(() => {
      setMobileTransition("slidedown");
    }, 1500);

    // 5. Clean up — don't reset mobileTransition here (reset on next menu open)
    setTimeout(() => {
      closeMenu();
    }, 2500);
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
          {/* Solid background — slides down with mobile content to reveal page beneath */}
          <motion.div
            className="absolute inset-0 z-0 bg-black"
            animate={{
              y: mobileTransition === "slidedown" ? "100vh" : 0,
            }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          />

          {/* Background Image - Full screen, appears behind content (desktop only) */}
          <motion.div
            className="absolute inset-0 z-[1] hidden md:block"
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
                  sizes="100vw"
                  quality={100}
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* White overlay frames that slide in over the image (desktop only) */}
          {/* Left frame */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 bg-white z-10 hidden md:block"
            variants={leftFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "33.333%" }}
          />
          {/* Right frame */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 bg-white z-10 hidden md:block"
            variants={rightFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: "33.333%" }}
          />
          {/* Top frame */}
          <motion.div
            className="absolute top-0 left-0 right-0 bg-white z-10 hidden md:block"
            variants={topFrameVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ height: "78px" }}
          />
          {/* Bottom frame */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-white z-10 hidden md:block"
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
                    className="font-en"
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuClick(item.href);
                      }}
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                      className="font-en group inline-block relative"
                    >
                      <span
                        className="font-en text-3xl lg:text-4xl xl:text-5xl font-medium transition-colors duration-300"
                        style={{
                          lineHeight: 1,
                          color:
                            hoveredIndex === null
                              ? "#000000"
                              : hoveredIndex === index
                              ? "#000000"
                              : "#B2B2B2",
                        }}
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
                className="flex flex-col w-full max-w-[250px]"
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
                      <span className="text-xs text-black/40 block" style={{ marginBottom: "6px", fontFamily: "var(--font-geist-sans)" }}>{news.date}</span>
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
                            className="text-black/80 group-hover:text-black transition-colors line-clamp-3"
                            style={{ fontSize: "12px", lineHeight: "1.2", fontFamily: "var(--font-geist-sans)" }}
                          >
                            {getNewsTitle(news.title)}
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
          <motion.div
            className="md:hidden h-full w-full flex flex-col overflow-hidden relative z-20"
            style={{ paddingTop: "78px", paddingBottom: "16px", paddingLeft: "16px", paddingRight: "0px" }}
            animate={{
              y: mobileTransition === "slidedown" ? "100vh" : 0,
            }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* White background for mobile */}
            <motion.div
              className="absolute inset-0 bg-white z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Fullscreen image overlay for transition */}
            <motion.div
              className="absolute inset-0 z-30 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{
                opacity: mobileTransition !== "idle" && mobileTransition !== "image" ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{ pointerEvents: "none" }}
            >
              <Image
                src={activeImage}
                alt="Transition"
                fill
                sizes="100vw"
                quality={100}
                className="object-cover"
              />
            </motion.div>

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
                <AnimatePresence mode="sync">
                  <motion.div
                    key={activeImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <Image
                      src={activeImage}
                      alt="Featured"
                      fill
                      sizes="100vw"
                      quality={100}
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Menu */}
            <motion.nav
              style={{ marginBottom: "30px" }}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: mobileTransition !== "idle" ? 0 : 1,
                x: 0,
              }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                opacity: { duration: 0.3, ease: "easeOut" },
                x: { duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
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
                        handleMobileMenuClick(item.href, index);
                      }}
                      className="inline-block relative"
                      style={{ paddingTop: "2px", paddingBottom: "2px" }}
                    >
                      <span
                        className="text-2xl font-medium text-black/60 hover:text-black transition-colors"
                        style={{ fontFamily: "var(--font-geist-sans)" }}
                      >
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
              initial={{ opacity: 0, x: 200 }}
              animate={{
                opacity: mobileTransition !== "idle" ? 0 : 1,
                x: 0,
              }}
              exit={{ opacity: 0, x: 40 }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4, ease: "easeOut" },
                x: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
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
                    <span className="text-xs text-black/40 block" style={{ marginBottom: "6px", fontFamily: "var(--font-geist-sans)" }}>{news.date}</span>
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
                          style={{ fontSize: "12px", lineHeight: "1.2", fontFamily: "var(--font-geist-sans)" }}
                        >
                          {getNewsTitle(news.title)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
