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

      {/* Content Layer */}
      <div className="relative z-10 h-full content-padding">
        <div className="h-full grid grid-cols-12 gap-[24px]">
          {/* Top Right - Description (9-10 grid) */}
          <div
            className="col-span-12 md:col-span-2 md:col-start-9 self-start"
            style={{ paddingTop: "calc(54px + 120px)" }}
          >
            <p
              className="text-white font-[family-name:var(--font-geist-mono)]"
              style={{ fontSize: "16px", lineHeight: "normal" }}
            >
              {t(
                "2006년부터, 우리는 가장 혁신적인 스타트업과 신뢰받는 브랜드가 이야기할 가치가 있는 제품을 디자인하고 구축하며 출시하는 것을 도와왔습니다.",
                "Since 2006, we've helped the most innovative startups and reputable brands designs, build, and ship products worth talking about."
              )}
            </p>
          </div>

          {/* Bottom Left - Title */}
          <div
            className="col-span-12 self-end"
            style={{ paddingBottom: "120px" }}
          >
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-12 md:col-start-4 md:col-span-9">
                <h1
                  className="text-white font-semibold capitalize font-[family-name:var(--font-geist-sans)]"
                  style={{ fontSize: "clamp(48px, 6vw, 92px)", lineHeight: 1.05 }}
                >
                  {t("내일의 스타를", "Creating")}
                </h1>
              </div>
              <div className="col-span-12 md:col-start-5 md:col-span-8">
                <h1
                  className="text-white font-semibold capitalize font-[family-name:var(--font-geist-sans)]"
                  style={{ fontSize: "clamp(48px, 6vw, 92px)", lineHeight: 1.05 }}
                >
                  {t("만들어갑니다", "Tomorrow's Stars")}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
