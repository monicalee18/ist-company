"use client";

import { motion } from "framer-motion";

const auditionInfo = {
  categories: [
    {
      title: "Vocal",
      titleKo: "보컬",
      description: "노래 실력을 보여주세요. 장르 불문, 본인의 매력을 어필할 수 있는 곡을 선택해주세요.",
    },
    {
      title: "Dance",
      titleKo: "댄스",
      description: "자유 안무 또는 기존 곡의 커버 댄스를 준비해주세요. 개성 있는 퍼포먼스를 보여주세요.",
    },
    {
      title: "Rap",
      titleKo: "랩",
      description: "자작 랩 또는 기존 곡의 커버를 준비해주세요. 플로우와 가사 전달력을 중점적으로 봅니다.",
    },
    {
      title: "Acting",
      titleKo: "연기",
      description: "1분 내외의 자유 연기 또는 지정 대본 연기를 준비해주세요.",
    },
  ],
  requirements: [
    "만 10세 ~ 만 23세 (성별 무관)",
    "국적 불문",
    "기획사 미소속자 또는 계약 만료자",
    "주 3회 이상 연습 참여 가능자",
  ],
  process: [
    { step: "01", title: "온라인 접수", description: "지원서 및 프로필 제출" },
    { step: "02", title: "1차 심사", description: "서류 및 영상 심사" },
    { step: "03", title: "2차 심사", description: "대면 오디션" },
    { step: "04", title: "최종 합격", description: "연습생 계약 체결" },
  ],
};

export default function AuditionPage() {
  const gridClass = "grid grid-cols-12 gap-[24px] content-padding";

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className={gridClass} style={{ paddingTop: "120px" }}>
        <div className="col-span-12 md:col-span-8">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white"
            style={{ lineHeight: 1.1, marginBottom: "20px" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Audition
          </motion.h1>
          <motion.p
            className="text-white/60 text-lg md:text-xl font-light max-w-xl"
            style={{ lineHeight: 1.6 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            IST Entertainment는 열정과 재능을 갖춘 미래의 스타를 찾고 있습니다.
            당신의 꿈을 향한 첫 걸음을 함께 시작하세요.
          </motion.p>
        </div>
      </section>

      {/* Gap */}
      <div className="h-[80px] md:h-[140px]" />

      {/* Categories Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Categories
              </h2>
            </div>
            {/* Category Grid */}
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                {auditionInfo.categories.map((category, index) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-1">
                      {category.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Requirements
              </h2>
            </div>
            {/* Requirements List */}
            <div className="col-span-12 md:col-span-6 md:col-start-4">
              <ul className="space-y-4">
                {auditionInfo.requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4 text-white/70 text-base"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  >
                    <span className="text-[#ff1f5d] mt-1">•</span>
                    <span>{req}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Section Title */}
            <div className="col-span-12 md:col-span-3">
              <h2 className="text-sm text-white/40 tracking-wider uppercase">
                Process
              </h2>
            </div>
            {/* Process Steps */}
            <div className="col-span-12 md:col-span-9 md:col-start-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[24px]">
                {auditionInfo.process.map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  >
                    <span className="text-5xl md:text-6xl font-light text-white/10 block mb-1">
                      {item.step}
                    </span>
                    <h3 className="text-white text-lg font-light mb-1">{item.title}</h3>
                    <p className="text-white/40 text-sm">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10">
        <div className="content-padding" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="grid grid-cols-12 gap-[24px]">
            <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-light text-white"
                style={{ marginBottom: "10px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                지금 바로 지원하세요
              </motion.h2>
              <motion.p
                className="text-white/50 text-base md:text-lg"
                style={{ marginBottom: "20px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                온라인으로 간편하게 오디션에 지원할 수 있습니다.
                <br />
                프로필과 영상을 준비해주세요.
              </motion.p>
              <motion.a
                href="#apply"
                className="text-white text-sm transition-all duration-200"
                style={{
                  height: "24px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                  backgroundColor: "rgba(186, 186, 186, 0.3)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#ff1f5d";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "rgba(186, 186, 186, 0.3)";
                }}
              >
                오디션 지원하기
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-[40px]" />
    </div>
  );
}
