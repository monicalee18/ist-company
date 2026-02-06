"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState } from "react";

interface SwipeCardProps {
  id: string;
  question: string;
  category: string;
  artistName: string;
  imageUrl: string;
  yesPercent: number;
  totalParticipants: number;
  totalPoints: number;
  endsAt: string;
  onSwipe: (direction: "left" | "right", id: string) => void;
  isTop: boolean;
}

export default function SwipeCard({
  id,
  question,
  category,
  artistName,
  imageUrl,
  yesPercent,
  totalParticipants,
  totalPoints,
  endsAt,
  onSwipe,
  isTop,
}: SwipeCardProps) {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-25, 0, 25]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  // YES/NO 오버레이 투명도
  const yesOpacity = useTransform(x, [0, 100, 200], [0, 0.5, 1]);
  const noOpacity = useTransform(x, [-200, -100, 0], [1, 0.5, 0]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;

    if (info.offset.x > threshold) {
      setExitDirection("right");
      onSwipe("right", id); // YES
    } else if (info.offset.x < -threshold) {
      setExitDirection("left");
      onSwipe("left", id); // NO
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x,
        rotate,
        opacity,
        zIndex: isTop ? 10 : 0,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={
        exitDirection
          ? { x: exitDirection === "right" ? 500 : -500, opacity: 0 }
          : {}
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* 카드 컨테이너 */}
      <div className="relative h-full w-full overflow-hidden rounded-[28px]">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        />

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* YES 오버레이 (오른쪽 스와이프) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-emerald-500/30"
          style={{ opacity: yesOpacity }}
        >
          <div className="rounded-2xl border-4 border-emerald-400 px-8 py-4 -rotate-12">
            <span className="text-5xl font-black text-emerald-400">YES</span>
          </div>
        </motion.div>

        {/* NO 오버레이 (왼쪽 스와이프) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-rose-500/30"
          style={{ opacity: noOpacity }}
        >
          <div className="rounded-2xl border-4 border-rose-400 px-8 py-4 rotate-12">
            <span className="text-5xl font-black text-rose-400">NO</span>
          </div>
        </motion.div>

        {/* 콘텐츠 */}
        <div className="absolute inset-x-0 bottom-0 p-6">
          {/* 카테고리 + 아티스트 */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              {category}
            </span>
            <span className="text-sm text-white/80">{artistName}</span>
          </div>

          {/* 질문 */}
          <h2 className="mt-3 text-2xl font-bold leading-tight text-white">
            {question}
          </h2>

          {/* YES/NO 비율 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-emerald-400">YES {yesPercent}%</span>
              <span className="text-rose-400">NO {100 - yesPercent}%</span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/20">
              <div
                className="bg-emerald-500 transition-all"
                style={{ width: `${yesPercent}%` }}
              />
              <div
                className="bg-rose-500 transition-all"
                style={{ width: `${100 - yesPercent}%` }}
              />
            </div>
          </div>

          {/* 통계 */}
          <div className="mt-4 flex items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {totalParticipants.toLocaleString()}명
            </span>
            <span className="flex items-center gap-1">
              🪙 {totalPoints.toLocaleString()}P
            </span>
            <span className="flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {endsAt}
            </span>
          </div>

          {/* 스와이프 힌트 */}
          <div className="mt-6 flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/20 text-rose-400">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <span className="text-xs text-white/50">NO</span>
            </div>
            <div className="text-white/30">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-white/50">YES</span>
            </div>
          </div>
        </div>

        {/* 상단 인디케이터 */}
        <div className="absolute left-0 right-0 top-0 p-4">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              🔥 HOT
            </span>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
