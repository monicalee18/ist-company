"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const { t } = useLanguage();
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const sliderSectionRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Video reveal animation
  const { scrollYProgress: videoProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "center center"],
  });

  const clipValue = useTransform(videoProgress, [0, 1], [50, 0]);
  const smoothClip = useSpring(clipValue, { stiffness: 100, damping: 30 });

  // Auto-scrolling animation for former artists
  const [sliderX, setSliderX] = useState(0);

  useEffect(() => {
    const speed = 1.2; // pixels per frame
    let animationId: number;

    const animate = () => {
      setSliderX(prev => {
        const newX = prev - speed;
        // Reset when scrolled enough (adjust based on content width)
        if (newX < -2000) return 0;
        return newX;
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Image carousel data - responsive with aspect ratios
  const sliderImages = [
    { widthRatio: 0.18, aspect: 4 / 3, src: "/artists/apink.webp", name: "Apink", debut: "2011" },
    { widthRatio: 0.35, aspect: 3 / 2, src: "/artists/theboyz.webp", name: "THE BOYZ", debut: "2017" },
    { widthRatio: 0.17, aspect: 1 / 1, src: "/artists/bahiyyih.webp", name: "Bahiyyih", debut: "2021" },
    { widthRatio: 0.35, aspect: 4 / 3, src: "/artists/atbo.webp", name: "ATBO", debut: "2022" },
    { widthRatio: 0.26, aspect: 3 / 2, src: "/artists/limsejun.webp", name: "Lim Se Jun", debut: "2016" },
    { widthRatio: 0.17, aspect: 3 / 5, src: "/artists/tunexx.webp", name: "TUNEXX", debut: "2026" },
  ];

  // 12 Column Grid: responsive padding (16px mobile, 24px desktop), 24px gutter
  const gridClass = "grid grid-cols-12 gap-[24px] content-padding";

  return (
    <div className="min-h-screen bg-black">
      {/* Section 1: Hero Title */}
      <section className={`${gridClass} pt-[138px] md:pt-[174px]`}>
        <div className="col-span-12">
          <h1
            className="text-center text-[40px] md:text-6xl lg:text-7xl font-light text-white"
            style={{ lineHeight: 1.1 }}
          >
            {t("Music. Artists. Global Impact.", "Music. Artists. Global Impact.")}
            <br />
            {t("Building the future of entertainment", "Building the future of entertainment")}
          </h1>
        </div>
      </section>

      {/* Gap: 60px mobile, 90px desktop */}
      <div className="h-[60px] md:h-[90px]" />

      {/* Section 2: Video */}
      <section ref={videoSectionRef} className={gridClass}>
        <div className="col-span-12 flex justify-center">
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: isMobile ? "100%" : "90%",
            }}
          >
            <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
              <iframe
                src="https://www.youtube.com/embed/cQESe4Jc0rE?autoplay=1&mute=1&loop=1&playlist=cQESe4Jc0rE&controls=0&showinfo=0&rel=0&modestbranding=1"
                title="IST Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gap: 140px mobile, 200px desktop */}
      <div className="h-[140px] md:h-[200px]" />

      {/* Section 3: Second Title */}
      <section className={gridClass}>
        <div className="col-span-11 md:col-span-7 md:col-start-2">
          <h2
            className="text-[32px] md:text-4xl lg:text-5xl font-light text-white"
            style={{ lineHeight: 1.2 }}
          >
            {t(
              "Since 2006, we have been building a strong foundation for artists by combining creative direction, strategic management, and global production capabilities.",
              "Since 2006, we have been building a strong foundation for artists by combining creative direction, strategic management, and global production capabilities."
            )}
          </h2>
        </div>
      </section>

      {/* Gap: 40px mobile, 200px desktop */}
      <div className="h-[40px] md:h-[200px]" />

      {/* Section 4: Image Slider - Former Artists */}
      <section
        ref={sliderSectionRef}
        className="relative overflow-hidden content-padding"
      >
        <motion.div
          className="flex gap-[16px]"
          style={{
            x: sliderX,
            alignItems: "flex-start",
          }}
        >
          {/* Duplicate images for seamless loop */}
          {[...sliderImages, ...sliderImages].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col"
              style={{
                width: `calc(${image.widthRatio * (isMobile ? 250 : 100)}vw)`,
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: image.aspect }}
              >
                <Image
                  src={image.src}
                  alt={image.name}
                  fill
                  className="object-cover grayscale"
                />
              </div>
              <span
                className="text-white/50 font-mono"
                style={{ fontSize: "12px", marginTop: "10px" }}
              >
                {image.debut}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Gap: 120px mobile, 200px desktop */}
      <div className="h-[120px] md:h-[200px]" />

      {/* Section 5: What We Do - Title */}
      <section>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <h2 className="text-3xl lg:text-4xl font-light text-white">
            {t("What we do", "What we do")}
          </h2>
        </div>
      </section>

      {/* Section 5-1: Discovering and Developing Future Artists */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <div className="col-span-8 md:col-span-3">
              <h3
                className="font-light text-white text-[24px] md:text-[40px]"
                style={{ lineHeight: 1.3 }}
              >
                Discovering and Developing Future Artists
              </h3>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="font-light leading-snug font-mono" style={{ fontSize: "14px", color: "#79767a" }}>
                We discover promising talent and support artists through every stage of their journey. From training and creative development to debut and long-term career growth, we provide an environment where artists can refine their skills and build their identity while growing into performers who connect with audiences worldwide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5-2: Producing Music and Creative Artist Content */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <div className="col-span-8 md:col-span-3">
              <h3
                className="font-light text-white text-[24px] md:text-[40px]"
                style={{ lineHeight: 1.3 }}
              >
                Producing Music and Creative Artist Content
              </h3>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="font-light leading-snug font-mono" style={{ fontSize: "14px", color: "#79767a" }}>
                We create music and visual content that reflect each artist&apos;s unique identity. From songwriting and recording to music videos and digital media, our creative teams collaborate closely with artists to produce work that resonates with audiences and strengthens their artistic voice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5-3: Connecting Artists with Fans Around the World */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <div className="col-span-8 md:col-span-3">
              <h3
                className="font-light text-white text-[24px] md:text-[40px]"
                style={{ lineHeight: 1.3 }}
              >
                Connecting Artists with Fans Around the World
              </h3>
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="font-light leading-snug font-mono" style={{ fontSize: "14px", color: "#79767a" }}>
                We bring artists and fans together through strategic promotion and global partnerships. Through performances, digital platforms, and international collaborations, we help artists expand their reach and build meaningful connections with audiences across cultures and markets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Impact Statement */}
      <section className={gridClass} style={{ paddingTop: "clamp(100px, 10vw, 140px)" }}>
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <h2
            className="text-white font-normal"
            style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
          >
            We measure our value in real-
            <br className="hidden md:block" />
            world impact
          </h2>
        </div>
      </section>

      {/* Section 9: Proof of Numbers */}
      <section className={gridClass} style={{ paddingTop: "clamp(60px, 10vw, 120px)", paddingBottom: "clamp(80px, 10vw, 140px)" }}>
        {/* Grid 1-4: Global users reached */}
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col md:flex-row">
            <div className="border-t md:border-t-0 md:border-l border-accent w-full md:w-auto md:self-stretch" style={{ marginBottom: "16px" }} />
            <div className="flex flex-col md:ml-[16px]" style={{ gap: "clamp(40px, 8vw, 100px)" }}>
              <p
                className="text-white font-normal"
                style={{ fontSize: "18px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                Global tours
                <br />
                performed
              </p>
              <p
                className="text-white font-normal"
                style={{ fontSize: "84px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                15+
              </p>
            </div>
          </div>
        </div>

        {/* Grid 5-8: Products shipped */}
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col md:flex-row">
            <div className="border-t md:border-t-0 md:border-l border-accent w-full md:w-auto md:self-stretch" style={{ marginBottom: "16px" }} />
            <div className="flex flex-col md:ml-[16px]" style={{ gap: "clamp(40px, 8vw, 100px)" }}>
              <p
                className="text-white font-normal"
                style={{ fontSize: "18px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                Awards
                <br />
                won
              </p>
              <p
                className="text-white font-normal"
                style={{ fontSize: "84px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                40+
              </p>
            </div>
          </div>
        </div>

        {/* Grid 9-12: Unicon shipped */}
        <div className="col-span-12 md:col-span-4">
          <div className="flex flex-col md:flex-row">
            <div className="border-t md:border-t-0 md:border-l border-accent w-full md:w-auto md:self-stretch" style={{ marginBottom: "16px" }} />
            <div className="flex flex-col md:ml-[16px]" style={{ gap: "clamp(40px, 8vw, 100px)" }}>
              <p
                className="text-white font-normal"
                style={{ fontSize: "18px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                Global fans
                <br />
                reached
              </p>
              <p
                className="text-white font-normal"
                style={{ fontSize: "84px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
              >
                120M+
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: How can we help? */}
      <section className={gridClass} style={{ paddingTop: "clamp(80px, 10vw, 140px)", paddingBottom: "40px" }}>
        {/* Title: Left side */}
        <div className="col-span-12 md:col-span-5" style={{ marginBottom: "16px" }}>
          <h2
            className="text-white font-semibold"
            style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
          >
            Join the
            <br />
            future of IST
          </h2>
        </div>

        {/* Links: Right side */}
        <div className="col-span-12 md:col-span-4 md:col-start-7 flex flex-col gap-[24px]">
          {/* Top line */}
          <div className="w-full h-px bg-white/20" />

          {/* Audition link */}
          <Link
            href="/audition"
            className="flex items-center justify-between text-white hover:text-accent transition-colors group"
            style={{ fontSize: "16px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
          >
            <span>Audition</span>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <path d="M1 15L15 1M15 1H1M15 1V15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          {/* Middle line */}
          <div className="w-full h-px bg-white/20" />

          {/* Contact link */}
          <Link
            href="/contact"
            className="flex items-center justify-between text-white hover:text-accent transition-colors group"
            style={{ fontSize: "16px", lineHeight: 1.2, fontFamily: "var(--font-geist-sans)" }}
          >
            <span>Contact</span>
            <div className="w-[24px] h-[24px] flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              >
                <path d="M1 15L15 1M15 1H1M15 1V15" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Link>

          {/* Bottom line */}
          <div className="w-full h-px bg-white/20" />
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
