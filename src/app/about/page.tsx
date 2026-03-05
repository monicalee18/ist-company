"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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

  // Horizontal slider animation
  const { scrollYProgress: sliderProgress } = useScroll({
    target: sliderSectionRef,
    offset: ["start end", "end start"],
  });

  const sliderX = useTransform(sliderProgress, [0, 1], ["0%", "-40%"]);

  // Image carousel data - various aspect ratios aligned to top
  const sliderImages = [
    { width: 280, height: 210 },   // 4:3 landscape
    { width: 540, height: 360 },   // 3:2 landscape
    { width: 260, height: 260 },   // 1:1 square
    { width: 540, height: 405 },   // 4:3 landscape
    { width: 400, height: 260 },   // 3:2 landscape
    { width: 260, height: 420 },   // 3:5 portrait
  ];

  // 12 Column Grid: px-6 = 24px padding, gap-6 = 24px gutter
  const gridClass = "grid grid-cols-12 gap-6 px-6";

  return (
    <div className="min-h-screen bg-black">
      {/* Section 1: Hero Title */}
      <section className={gridClass} style={{ paddingTop: "100px" }}>
        <div className="col-span-12">
          <h1
            className="text-center"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {t("Odds are you've used a", "Odds are you've used a")}
            <br />
            {t("product we've built", "product we've built")}
          </h1>
        </div>
      </section>

      {/* 90px gap */}
      <div style={{ height: "90px" }} />

      {/* Section 2: Video */}
      <section ref={videoSectionRef} className={gridClass}>
        <div className="col-span-12 flex justify-center">
          <motion.div
            className="relative overflow-hidden"
            style={{
              width: isMobile ? "240px" : "520px",
              clipPath: useTransform(
                smoothClip,
                (v) => `inset(${v}% 0 ${v}% 0)`
              ),
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

      {/* 200px gap */}
      <div style={{ height: "200px" }} />

      {/* Section 3: Second Title */}
      <section className={gridClass}>
        <div className="col-span-12 md:col-span-8">
          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 4.5vw, 3.5rem)",
              fontWeight: 400,
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {t(
              "Since 2006, we've helped shape the technology landscape by building breakthrough products",
              "Since 2006, we've helped shape the technology landscape by building breakthrough products"
            )}
          </h2>
        </div>
      </section>

      {/* 200px gap */}
      <div style={{ height: "200px" }} />

      {/* Section 4: Image Slider */}
      <section
        ref={sliderSectionRef}
        className="relative overflow-hidden py-24 px-6"
      >
        <motion.div
          className="flex gap-6"
          style={{
            x: sliderX,
            alignItems: "flex-start",
          }}
        >
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/10 relative"
              style={{
                width: `${image.width}px`,
                height: `${image.height}px`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                Image {index + 1}
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 200px gap */}
      <div style={{ height: "200px" }} />

      {/* Section 5: Core Values */}
      <section className={`${gridClass} pb-32`}>
        {/* Label */}
        <div className="col-span-12 mb-16 md:mb-24">
          <span className="text-white/40 text-sm tracking-[0.2em] uppercase">
            {t("우리의 가치", "Our Values")}
          </span>
        </div>

        {/* What We Do - columns 1-4 */}
        <div className="col-span-12 md:col-span-4">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">01</span>
          <h3 className="text-white text-lg md:text-xl font-light mt-8 mb-6">
            {t("What We Do", "What We Do")}
          </h3>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
            {t(
              "K-Pop 아티스트의 발굴과 육성을 통해 글로벌 엔터테인먼트 시장을 선도합니다.",
              "We lead the global entertainment market through the discovery and development of K-Pop artists."
            )}
          </p>
        </div>

        {/* Vision - columns 5-8 */}
        <div className="col-span-12 md:col-span-4">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">02</span>
          <h3 className="text-white text-lg md:text-xl font-light mt-8 mb-6">
            {t("Vision", "Vision")}
          </h3>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
            {t(
              "글로벌 엔터테인먼트 산업을 선도하는 창의적 콘텐츠 기업으로 성장합니다.",
              "Growing as a creative content company leading the global entertainment industry."
            )}
          </p>
        </div>

        {/* Mission - columns 9-12 */}
        <div className="col-span-12 md:col-span-4">
          <span className="text-white/30 text-xs tracking-[0.3em] uppercase">03</span>
          <h3 className="text-white text-lg md:text-xl font-light mt-8 mb-6">
            {t("Mission", "Mission")}
          </h3>
          <p className="text-white/50 text-base md:text-lg font-light leading-relaxed">
            {t(
              "아티스트와 팬을 연결하는 감동적인 경험을 창출합니다.",
              "Creating meaningful experiences that connect artists and fans."
            )}
          </p>
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
