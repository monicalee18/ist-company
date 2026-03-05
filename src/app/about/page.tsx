"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

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

  // Image carousel data - responsive with aspect ratios
  const sliderImages = [
    { widthRatio: 0.18, aspect: 4 / 3, src: "/artists/apink.webp", name: "Apink" },
    { widthRatio: 0.35, aspect: 3 / 2, src: "/artists/theboyz.webp", name: "THE BOYZ" },
    { widthRatio: 0.17, aspect: 1 / 1, src: "/artists/bahiyyih.webp", name: "Bahiyyih" },
    { widthRatio: 0.35, aspect: 4 / 3, src: "/artists/atbo.webp", name: "ATBO" },
    { widthRatio: 0.26, aspect: 3 / 2, src: "/artists/limsejun.webp", name: "Lim Se Jun" },
    { widthRatio: 0.17, aspect: 3 / 5, src: "/artists/tunexx.webp", name: "TUNEXX" },
  ];

  // 12 Column Grid: responsive padding (16px mobile, 24px desktop), 24px gutter
  const gridClass = "grid grid-cols-12 gap-[24px] content-padding";

  return (
    <div className="min-h-screen bg-black">
      {/* Section 1: Hero Title */}
      <section className={gridClass} style={{ paddingTop: "174px" }}>
        <div className="col-span-12">
          <h1
            className="text-center text-5xl md:text-6xl lg:text-7xl font-light text-white"
            style={{ lineHeight: 1.15 }}
          >
            {t("Music. Artists. Global Impact.", "Music. Artists. Global Impact.")}
            <br />
            {t("Building the future of entertainment", "Building the future of entertainment")}
          </h1>
        </div>
      </section>

      {/* Gap: 30px mobile, 90px desktop */}
      <div className="h-[30px] md:h-[90px]" />

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
        <div className="col-span-12 md:col-span-7 md:col-start-2">
          <h2
            className="text-[36px] md:text-4xl lg:text-5xl font-light text-white"
            style={{ lineHeight: 1.2 }}
          >
            {t(
              "Since 2013, we've been discovering and developing artists who define the next generation of K-Pop",
              "Since 2013, we've been discovering and developing artists who define the next generation of K-Pop"
            )}
          </h2>
        </div>
      </section>

      {/* Gap: 30px mobile, 200px desktop */}
      <div className="h-[30px] md:h-[200px]" />

      {/* Section 4: Image Slider */}
      <section
        ref={sliderSectionRef}
        className="relative overflow-hidden py-24 content-padding"
      >
        <motion.div
          className="flex gap-[16px]"
          style={{
            x: sliderX,
            alignItems: "flex-start",
          }}
        >
          {sliderImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 relative overflow-hidden"
              style={{
                width: `calc(${image.widthRatio * (isMobile ? 250 : 100)}vw)`,
                aspectRatio: image.aspect,
              }}
            >
              <Image
                src={image.src}
                alt={image.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </section>

      {/* Gap: 140px mobile, 200px desktop */}
      <div className="h-[140px] md:h-[200px]" />

      {/* Section 5: What We Do */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            {/* Title: Column 1-3 */}
            <div className="col-span-12 md:col-span-3">
              <h2
                className="text-3xl lg:text-4xl font-light text-white"
              >
                {t("What we do", "What we do")}
              </h2>
            </div>
            {/* Image: Column 7-9 */}
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            {/* Description: Column 10-12 */}
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="text-white/50 text-sm md:text-base font-light leading-snug">
                {t(
                  "We lead the global entertainment market through the discovery and development of K-Pop artists. We maximize artist potential through innovative content and systematic management.",
                  "We lead the global entertainment market through the discovery and development of K-Pop artists. We maximize artist potential through innovative content and systematic management."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Vision */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            {/* Title: Column 1-3 */}
            <div className="col-span-12 md:col-span-3">
              <h2
                className="text-3xl lg:text-4xl font-light text-white"
              >
                {t("Vision", "Vision")}
              </h2>
            </div>
            {/* Image: Column 7-9 */}
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            {/* Description: Column 10-12 */}
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="text-white/50 text-sm md:text-base font-light leading-snug">
                {t(
                  "Growing as a creative content company leading the global entertainment industry. We deliver inspiration to fans worldwide, transcending cultural boundaries.",
                  "Growing as a creative content company leading the global entertainment industry. We deliver inspiration to fans worldwide, transcending cultural boundaries."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Mission */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px] items-start">
            {/* Title: Column 1-3 */}
            <div className="col-span-12 md:col-span-3">
              <h2
                className="text-3xl lg:text-4xl font-light text-white"
              >
                {t("Mission", "Mission")}
              </h2>
            </div>
            {/* Image: Column 7-9 */}
            <div className="col-span-12 md:col-span-3 md:col-start-7">
              <div className="bg-white/10 w-full aspect-[16/9]" />
            </div>
            {/* Description: Column 10-12 */}
            <div className="col-span-12 md:col-span-3 md:col-start-10">
              <p className="text-white/50 text-sm md:text-base font-light leading-snug">
                {t(
                  "Creating meaningful experiences that connect artists and fans. Through music, content, and live performances, we create unforgettable moments.",
                  "Creating meaningful experiences that connect artists and fans. Through music, content, and live performances, we create unforgettable moments."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24" />
    </div>
  );
}
