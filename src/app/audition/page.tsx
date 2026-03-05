"use client";

import { motion } from "framer-motion";

const auditionInfo = {
  categories: [
    {
      title: "보컬",
      description: "노래 실력을 보여주세요. 장르 불문, 본인의 매력을 어필할 수 있는 곡을 선택해주세요.",
    },
    {
      title: "댄스",
      description: "자유 안무 또는 기존 곡의 커버 댄스를 준비해주세요. 개성 있는 퍼포먼스를 보여주세요.",
    },
    {
      title: "랩",
      description: "자작 랩 또는 기존 곡의 커버를 준비해주세요. 플로우와 가사 전달력을 중점적으로 봅니다.",
    },
    {
      title: "연기",
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
  return (
    <div className="min-h-screen bg-black" style={{ paddingTop: '78px', paddingBottom: '24px' }}>
      <div className="max-w-6xl mx-auto" style={{ paddingLeft: '24px', paddingRight: '24px' }}>
        {/* Page Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Audition
          </h1>
          <div className="w-20 h-[1px] bg-white/30 mb-8" />
          <p className="text-white/60 text-lg max-w-2xl">
            IST Entertainment는 열정과 재능을 갖춘 미래의 스타를 찾고 있습니다.
            당신의 꿈을 향한 첫 걸음을 함께 시작하세요.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.section
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-sm text-white/50 tracking-wider mb-8">
            AUDITION CATEGORIES
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {auditionInfo.categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="p-6 border border-white/10 hover:border-white/30 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-xl text-white mb-3">{category.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Requirements */}
        <motion.section
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-sm text-white/50 tracking-wider mb-8">
            REQUIREMENTS
          </h2>
          <ul className="space-y-4">
            {auditionInfo.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-4 text-white/70">
                <span className="text-[#ff1f5d]">•</span>
                {req}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Process */}
        <motion.section
          className="mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-sm text-white/50 tracking-wider mb-8">
            AUDITION PROCESS
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {auditionInfo.process.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <span className="text-4xl font-light text-white/20 block mb-2">
                  {item.step}
                </span>
                <h3 className="text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.description}</p>
                {index < auditionInfo.process.length - 1 && (
                  <div className="hidden md:block absolute top-6 right-0 w-full h-[1px] bg-white/10 transform translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          className="text-center py-16 border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6">
            지금 바로 지원하세요
          </h2>
          <p className="text-white/50 mb-8 max-w-md mx-auto">
            온라인으로 간편하게 오디션에 지원할 수 있습니다.
            프로필과 영상을 준비해주세요.
          </p>
          <a
            href="#apply"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors"
          >
            오디션 지원하기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </motion.section>
      </div>
    </div>
  );
}
