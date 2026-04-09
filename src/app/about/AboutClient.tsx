"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

// Scroll fade-in wrapper
function FadeIn({ children, className, delay = 0, style }: { children: React.ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Animated counter
export default function AboutClient() {
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);
  const xRef = useRef(0);
  const sliderX = useMotionValue(0);

  useEffect(() => {
    const gap = 16; // gap-[16px]
    const imageCount = 8; // number of images in one set

    const measure = () => {
      if (sliderRef.current) {
        const children = sliderRef.current.children;
        let width = 0;
        for (let i = 0; i < imageCount; i++) {
          width += (children[i] as HTMLElement).offsetWidth;
        }
        width += gap * imageCount; // gaps between items (including gap after last item of first set)
        halfWidthRef.current = width;
      }
    };

    // Wait for images to load before measuring
    const images = sliderRef.current?.querySelectorAll("img");
    let loaded = 0;
    const total = images?.length ?? 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= total) measure();
    };
    images?.forEach((img) => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener("load", onLoad);
      }
    });
    if (loaded >= total) measure();

    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      images?.forEach((img) => img.removeEventListener("load", onLoad));
    };
  }, [isMobile]);

  useEffect(() => {
    const pixelsPerSecond = isMobile ? 80 : 48;
    let animationId: number;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (lastTime !== null) {
        const delta = (time - lastTime) / 1000;
        xRef.current -= pixelsPerSecond * delta;
        if (halfWidthRef.current > 0 && Math.abs(xRef.current) >= halfWidthRef.current) {
          xRef.current += halfWidthRef.current;
        }
        sliderX.set(xRef.current);
      }
      lastTime = time;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [sliderX, isMobile]);

  // Image carousel data - responsive with aspect ratios
  const sliderImages = [
    { widthRatio: 0.2, src: "/artists/tunexx.webp", name: "TUNEXX", debut: "2026" },
    { widthRatio: 0.2, src: "/artists/apink.webp", name: "Apink", debut: "2011" },
    { widthRatio: 0.25, src: "/artists/atbo.webp", name: "ATBO", debut: "2022" },
    { widthRatio: 0.17, src: "/artists/jungeunji.webp", name: "Jung Eunji", debut: "2011" },
    { widthRatio: 0.3, src: "/artists/theboyz.webp", name: "THE BOYZ", debut: "2017" },
    { widthRatio: 0.17, src: "/artists/weeekly.webp", name: "Weeekly", debut: "2020" },
    { widthRatio: 0.2, src: "/artists/bahiyyih.webp", name: "Bahiyyih", debut: "2021" },
    { widthRatio: 0.15, src: "/artists/hanseungwoo.webp", name: "Han Seungwoo", debut: "2019" },
  ];

  // 12 Column Grid: responsive padding (16px mobile, 24px desktop), 24px gutter
  const gridClass = "grid grid-cols-12 gap-[24px] content-padding";

  return (
    <div className="min-h-screen bg-black">
      {/* Section 1: Hero Title */}
      <section className={`${gridClass} pt-[138px] md:pt-[174px]`}>
        <motion.div
          className="col-span-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="text-center text-[48px] md:text-[80px] lg:text-[110px] font-bold text-white tracking-tight"
            style={{ lineHeight: 1.05 }}
          >
            {t("연결된 시스템과", "Interconnected")}
            <br />
            {t("혁신으로", "Innovative")}
            <br />
            {t("선두를 만들어갑니다", "Built to Lead")}
          </h1>
        </motion.div>
      </section>

      {/* Gap below hero title */}
      <div className="h-[80px] md:h-[160px]" />

      {/* Section 2: Video - Full width */}
      <section ref={videoSectionRef}>
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <iframe
            src="https://www.youtube.com/embed/cQESe4Jc0rE?autoplay=1&mute=1&loop=1&playlist=cQESe4Jc0rE&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="IST Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Gap: 140px mobile, 200px desktop */}
      <div className="h-[140px] md:h-[200px]" />

      {/* Section 3+4: Description + Image Slider */}
      <section className="grid-pattern relative overflow-hidden">
        <div className={gridClass}>
          <FadeIn className="col-span-11 md:col-span-8 md:col-start-2">
            <h2
              className="text-[24px] md:text-[28px] lg:text-[32px] font-light text-white"
              style={{ lineHeight: 1.4 }}
            >
              {t(
                "IST엔터테인먼트는 유기적으로 연결된 시스템을 기반으로 아티스트가 글로벌 무대의 선두(1st)에 설 수 있도록 성장시키는 엔터테인먼트 기업입니다. 기획, 제작, 매니지먼트를 하나로 연결하여 강력한 시너지를 창출하고, 아티스트가 K-POP의 미래를 이끄는 주체로 자리할 수 있도록 지원합니다. 또한 아티스트와 팬이 즐겁고 의미 있게 소통할 수 있도록 혁신적이고 가치 있는 콘텐츠를 지속적으로 선보이고 있습니다.",
                "IST Entertainment represents an Interconnected System that empowers talent to become 1st on the global stage. By seamlessly integrating planning, production, and management, we create powerful synergy that drives artists to lead the future of K-POP. We are committed to delivering innovative and meaningful content that connects artists and fans in engaging and inspiring ways."
              )}
            </h2>
          </FadeIn>
        </div>

        <div className="h-[120px]" />

        <div ref={sliderSectionRef} className="content-padding">
        <motion.div
          ref={sliderRef}
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
              <Image
                src={image.src}
                alt={image.name}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto grayscale"
              />
              <div style={{ marginTop: "8px", lineHeight: 1 }}>
                <span
                  className="text-white/70 font-sans"
                  style={{ fontSize: "12px" }}
                >
                  {image.name}
                </span>
                <span
                  className="text-white/70 font-sans"
                  style={{ fontSize: "12px", marginLeft: "4px" }}
                >
                  {image.debut}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* Gap: 100px mobile, 200px desktop */}
      <div className="h-[100px] md:h-[200px]" />

      {/* Section 5: What We Do - Title */}
      <section>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <FadeIn>
            <h2 className="font-light text-white" style={{ fontSize: "44px" }}>
              {t("What we do", "What we do")}
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* Section 5-1: Artist Discovery & Development */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <FadeIn className="col-span-12 md:col-span-3">
              <h3
                className="font-light text-white text-[28px]"
                style={{ lineHeight: 1.3 }}
              >
                {t("아티스트 발굴 및 개발", "Artist Discovery & Development")}
              </h3>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-7" delay={0.1}>
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-10" delay={0.2}>
              <p className="font-normal leading-snug" style={{ fontSize: "16px", color: "#9e9ba0" }}>
                {t(
                  "유망한 인재를 발굴하고, 트레이닝부터 데뷔까지 아티스트의 전 과정을 이끌어갑니다. 아티스트가 역량을 강화하고 장기적인 성장을 위한 기반을 다질 수 있도록 지원합니다.",
                  "We discover promising talent and guide artists through every stage of their journey. From training to debut, we support artists in refining their skills and building a strong foundation for long-term growth."
                )}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 5-2: Artist Planning & Direction */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <FadeIn className="col-span-12 md:col-span-3">
              <h3
                className="font-light text-white text-[28px]"
                style={{ lineHeight: 1.3 }}
              >
                {t("아티스트 기획 및 연출", "Artist Planning & Direction")}
              </h3>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-7" delay={0.1}>
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-10" delay={0.2}>
              <p className="font-normal leading-snug" style={{ fontSize: "16px", color: "#9e9ba0" }}>
                {t(
                  "각 아티스트의 정체성을 설계하고 프로젝트의 전체 방향성을 총괄합니다. 콘셉트 및 앨범 기획부터 비주얼 아이덴티티, 콘텐츠 전략까지 크리에이티브 전반을 통합 관리하여 일관되고 차별화된, 시장 경쟁력을 갖춘 아티스트 브랜드를 구축합니다.",
                  "We design each artist's identity and lead the overall direction of their projects. From concept and album planning to visual identity and content strategy, we oversee the full creative process to deliver a cohesive, differentiated, and market-competitive artist brand."
                )}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 5-3: Artist Management & Global Expansion */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <FadeIn className="col-span-12 md:col-span-3">
              <h3
                className="font-light text-white text-[28px]"
                style={{ lineHeight: 1.3 }}
              >
                {t("아티스트 매니지먼트 및 글로벌 확장", "Artist Management & Global Expansion")}
              </h3>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-7" delay={0.1}>
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-10" delay={0.2}>
              <p className="font-normal leading-snug" style={{ fontSize: "16px", color: "#9e9ba0" }}>
                {t(
                  "전략적인 매니지먼트와 글로벌 파트너십을 통해 아티스트의 성장을 지원합니다. 공연, 미디어 활동, 해외 기회를 통해 활동 영역을 확장하고 전 세계 팬들과 의미 있는 연결을 만들어가며, 진정으로 소통하는 아티스트로 성장할 수 있도록 돕습니다.",
                  "We manage artists and support their growth through strategic promotion and global partnerships. Through performances, media exposure, and international opportunities, we help artists expand their reach and build meaningful connections with audiences worldwide—growing into artists who truly connect."
                )}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 5-4: IP & Brand Value Expansion */}
      <section style={{ borderTop: "1px solid #313033" }}>
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            <FadeIn className="col-span-12 md:col-span-3">
              <h3
                className="font-light text-white text-[28px]"
                style={{ lineHeight: 1.3 }}
              >
                {t("IP 및 브랜드 가치 확장", "IP & Brand Value Expansion")}
              </h3>
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-7" delay={0.1}>
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </FadeIn>
            <FadeIn className="col-span-12 md:col-span-3 md:col-start-10" delay={0.2}>
              <p className="font-normal leading-snug" style={{ fontSize: "16px", color: "#9e9ba0" }}>
                {t(
                  "아티스트 IP를 구축하고 장기적인 브랜드 가치로 확장합니다. 브랜딩, MD, 다양한 협업을 통해 음악을 넘어 지속 가능한 비즈니스 기회를 창출합니다.",
                  "We develop and expand artist IP into long-term brand value. Through branding, merchandising, and strategic collaborations, we extend the artist's identity beyond music into sustainable business opportunities."
                )}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* Section 10: Join the future */}
      <section className={gridClass} style={{ paddingTop: "clamp(80px, 10vw, 140px)", paddingBottom: "40px" }}>
        {/* Title: Left side */}
        <FadeIn className="col-span-12 md:col-span-5 md:col-start-2" style={{ marginBottom: "16px" }}>
          <h2
            className="text-white font-semibold"
            style={{ fontSize: "clamp(44px, 7vw, 88px)", lineHeight: 1.2, fontFamily: "var(--font-aspekta)" }}
          >
            Stay Connected
            <br />
            with IST
          </h2>
          <p
            className="text-white/50"
            style={{ fontSize: "clamp(14px, 1.2vw, 18px)", lineHeight: 1.5, fontFamily: "var(--font-aspekta)", marginTop: "16px" }}
          >
            {t(
              "IST Entertainment 공식 채널입니다. 아티스트의 소식과 콘텐츠를 공식 채널에서 만나보세요.",
              "Follow official updates, artist releases, and stories"
            )}
          </p>
        </FadeIn>

        {/* Links: Right side */}
        <FadeIn className="col-span-12 md:col-span-4 md:col-start-8 flex flex-col gap-[24px]" delay={0.15}>
          {/* Top line */}
          <div className="w-full h-px bg-white/20" />

          {/* Audition link */}
          <Link
            href="/audition"
            className="flex items-center justify-between text-white hover:text-accent transition-colors group"
            style={{ fontSize: "16px", lineHeight: 1.2, fontFamily: "var(--font-aspekta)" }}
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
            style={{ fontSize: "16px", lineHeight: 1.2, fontFamily: "var(--font-aspekta)" }}
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
        </FadeIn>
      </section>

      <div className="h-24" />
    </div>
  );
}
