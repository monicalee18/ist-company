"use client";

import Link from "next/link";

interface MarketCardProps {
  id: string;
  question: string;
  category: string;
  yesPercent: number;
  totalParticipants: number;
  totalPoints: number;
  endsAt: string;
  imageUrl?: string;
  isHot?: boolean;
}

export default function MarketCard({
  id,
  question,
  category,
  yesPercent,
  totalParticipants,
  totalPoints,
  endsAt,
  imageUrl,
  isHot,
}: MarketCardProps) {
  const noPercent = 100 - yesPercent;

  return (
    <Link
      href={`/market/${id}`}
      className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {/* 상단: 카테고리 + HOT 뱃지 */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          {category}
        </span>
        {isHot && (
          <span className="flex items-center gap-1 text-xs font-medium text-orange-500">
            <span>🔥</span> HOT
          </span>
        )}
      </div>

      {/* 질문 */}
      <h3 className="mt-3 font-semibold leading-snug text-zinc-900 dark:text-white" style={{ fontSize: "15px" }}>
        {question}
      </h3>

      {/* YES/NO 비율 바 */}
      <div className="mt-1.5">
        <div className="flex h-10 overflow-hidden rounded-xl">
          <button
            className="flex flex-1 items-center justify-center gap-1 bg-emerald-500 text-sm font-bold text-white transition-all hover:bg-emerald-600"
            style={{ flexBasis: `${Math.max(yesPercent, 15)}%` }}
            onClick={(e) => e.preventDefault()}
          >
            <span>YES</span>
            <span className="text-emerald-100">{yesPercent}%</span>
          </button>
          <button
            className="flex flex-1 items-center justify-center gap-1 bg-rose-500 text-sm font-bold text-white transition-all hover:bg-rose-600"
            style={{ flexBasis: `${Math.max(noPercent, 15)}%` }}
            onClick={(e) => e.preventDefault()}
          >
            <span>NO</span>
            <span className="text-rose-100">{noPercent}%</span>
          </button>
        </div>
      </div>

      {/* 하단 정보 */}
      <div className="mt-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {totalParticipants.toLocaleString()}명
          </span>
          <span className="flex items-center gap-1">
            <span>🪙</span>
            {totalPoints.toLocaleString()}P
          </span>
        </div>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {endsAt}
        </span>
      </div>
    </Link>
  );
}
