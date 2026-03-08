"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden bg-black" style={{ height: "100vh" }}>
      {/* Fullscreen Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-main.jpg"
          alt="IST Entertainment"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Dim Overlay - #5B0019 50% */}
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(91, 0, 25, 0.5)" }} />
      </div>

      {/* Content Layer - Mobile */}
      <div className="relative z-10 h-full content-padding md:hidden">
        <div className="grid grid-cols-12 gap-[24px]" style={{ paddingTop: "calc(78px + 80px)" }}>
          {/* Title - left aligned */}
          <div className="col-span-12">
            <h1
              className="text-white capitalize font-en"
              style={{ fontSize: "54px", lineHeight: 1.05, fontWeight: 600, marginBottom: "8px" }}
            >
              Creating
              <br />
              Tomorrow&apos;s Stars
            </h1>
          </div>

          {/* Description - col 1-10, 24px gap handled by grid */}
          <div className="col-span-10">
            <p
              className="text-white font-[family-name:var(--font-geist-mono)]"
              style={{ fontSize: "16px", lineHeight: 1.4 }}
            >
              {t(
                "2006년부터 IST Entertainment는 음악과 글로벌 문화를 이끌어갈 아티스트를 발굴하고 성장시키며 함께 새로운 가능성을 만들어가고 있습니다",
                "Since 2006, IST Entertainment has been discovering, developing, and empowering artists who shape the future of music and global culture"
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Content Layer - Desktop */}
      <div className="relative z-10 h-full content-padding hidden md:block">
        <div className="h-full grid grid-cols-12 gap-[24px]">
          {/* Top Right - Description (9-10 grid) */}
          <div
            className="col-span-2 col-start-9 self-start"
            style={{ paddingTop: "calc(54px + 120px)" }}
          >
            <p
              className="text-white font-[family-name:var(--font-geist-mono)]"
              style={{ fontSize: "16px", lineHeight: "normal" }}
            >
              {t(
                "2006년부터 IST Entertainment는 음악과 글로벌 문화를 이끌어갈 아티스트를 발굴하고 성장시키며 함께 새로운 가능성을 만들어가고 있습니다",
                "Since 2006, IST Entertainment has been discovering, developing, and empowering artists who shape the future of music and global culture"
              )}
            </p>
          </div>

          {/* Bottom Left - Title */}
          <div
            className="col-span-12 self-end"
            style={{ paddingBottom: "120px" }}
          >
            <div className="grid grid-cols-12 gap-0">
              <div className="col-start-4 col-span-9">
                <h1
                  className="text-white font-semibold capitalize font-[family-name:var(--font-geist-sans)]"
                  style={{ fontSize: "clamp(48px, 6vw, 92px)", lineHeight: 1.05 }}
                >
                  Creating
                </h1>
              </div>
              <div className="col-start-5 col-span-8">
                <h1
                  className="text-white font-semibold capitalize font-[family-name:var(--font-geist-sans)]"
                  style={{ fontSize: "clamp(48px, 6vw, 92px)", lineHeight: 1.05 }}
                >
                  Tomorrow&apos;s Stars
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
