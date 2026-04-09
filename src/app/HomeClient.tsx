"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Footer from "@/components/Footer";

function FlowingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 5 }, (_, i) => ({
      baseY: 0.25 + i * 0.13,
      amplitude: 40 + i * 12,
      frequency: 0.003 + i * 0.0004,
      speed: 0.004 + i * 0.001,
      phase: i * 1.5,
      opacity: 0.15 + i * 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const line of lines) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 31, 93, ${line.opacity})`;
        ctx.lineWidth = 1.5;

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            canvas.height * line.baseY +
            Math.sin(x * line.frequency + line.phase) * line.amplitude * Math.sin(time * line.speed) +
            Math.sin(x * line.frequency * 1.8 + line.phase * 0.7) * line.amplitude * 0.5 * Math.cos(time * line.speed * 0.7);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}

const HERO_IMAGES = [
  "/hero/hero-1.png",
  "/hero/hero-2.png",
  "/hero/hero-3.png",
];

const CYCLE_INTERVAL = 3000;

export default function HomeClient() {
  const { t } = useLanguage();
  const [currentImage, setCurrentImage] = useState(0);

  // Image cycling - instant switch
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_IMAGES.length);
    }, CYCLE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="relative bg-black hidden md:flex flex-col justify-between content-padding"
        style={{
          height: "100vh",
          paddingTop: "calc(54px + 40px)",
          paddingBottom: "calc(54px + 40px)",
        }}
      >
        <FlowingLines />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1
              className="text-white font-[family-name:var(--font-aspekta)]"
              style={{
                fontSize: "6.5vw",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              Connecting Talent to the<br />1st Global Stage
            </h1>
          </motion.div>
        </div>

        <div className="relative z-10">
          <div className="grid" style={{ gridTemplateColumns: "repeat(12, 1fr)", gap: "24px" }}>
            <div style={{ gridColumn: "8 / 12" }}>
              <p
                className="text-white/70 font-[family-name:var(--font-aspekta)]"
                style={{ fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.5 }}
              >
                {t(
                  "기획, 제작, 매니지먼트가 유기적으로 연결된 시스템을 통해 아티스트가 글로벌 무대에서 성장하고, 전 세계 팬들과 의미 있게 소통할 수 있도록 지원합니다.",
                  "Through an interconnected system of production, management, and creativity, we empower artists to lead and connect with fans worldwide."
                )}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-white text-black hover:bg-white/85 transition-colors duration-300"
                style={{
                  fontSize: "clamp(14px, 1.1vw, 15px)",
                  fontFamily: "var(--font-aspekta)",
                  fontWeight: 500,
                  marginTop: "32px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  borderRadius: "0px",
                  letterSpacing: "0.02em",
                }}
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: 100vh, scroll down for footer */}
      <div className="relative bg-black md:hidden flex flex-col justify-between content-padding"
        style={{
          height: "100vh",
          paddingTop: "calc(54px + 40px)",
          paddingBottom: "calc(54px + 40px)",
        }}
      >
        <FlowingLines />

        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-[family-name:var(--font-aspekta)]"
            style={{
              fontSize: "clamp(32px, 9vw, 48px)",
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Connecting Talent to the<br />1st Global Stage
          </motion.h1>

          <div
            className="relative overflow-hidden"
            style={{
              aspectRatio: "16 / 9",
              marginTop: "30px",
              marginLeft: "-16px",
              marginRight: "-16px",
              width: "calc(100% + 32px)",
            }}
          >
            <Image
              src={HERO_IMAGES[currentImage]}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 flex flex-col" style={{ gap: "24px", marginTop: "0px" }}>
          <p
            className="text-white/70 font-[family-name:var(--font-aspekta)]"
            style={{ fontSize: "clamp(14px, 4vw, 16px)", lineHeight: 1.5 }}
          >
            {t(
              "2006년부터 IST Entertainment는 음악과 글로벌 문화를 이끌어갈 아티스트를 발굴하고 성장시키며 함께 새로운 가능성을 만들어가고 있습니다.",
              "Since 2006, IST Entertainment has been discovering, developing, and empowering artists who shape the future of music and global culture."
            )}
          </p>
          <Link
            href="/about"
            className="inline-flex items-center justify-center bg-white text-black hover:bg-white/85 transition-colors duration-300 w-fit"
            style={{
              fontSize: "clamp(13px, 3.5vw, 15px)",
              fontFamily: "var(--font-aspekta)",
              fontWeight: 500,
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingTop: "12px",
              paddingBottom: "12px",
              borderRadius: "0px",
              letterSpacing: "0.02em",
            }}
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
