"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// 피드 필터 칩
const feedFilters = [
  { id: "all", name: "전체" },
  { id: "hot", name: "HOT" },
  { id: "new", name: "NEW" },
  { id: "ending", name: "곧종료" },
  { id: "girl-group", name: "여자 아이돌" },
  { id: "boy-group", name: "남자 아이돌" },
  { id: "group", name: "그룹" },
  { id: "solo", name: "솔로" },
];

// 배지 스타일 정의
const badgeStyles: Record<string, { gradient: string; label: string }> = {
  hot: { gradient: "linear-gradient(180deg, #FF7777 0%, #FF231F 100%)", label: "HOT" },
  new: { gradient: "linear-gradient(180deg, #FFD057 0%, #FFA523 100%)", label: "NEW" },
  ending: { gradient: "linear-gradient(180deg, #60C3FF 0%, #4663FF 100%)", label: "곧 종료" },
};

// 샘플 마켓 데이터 생성 함수
const generateMarkets = (startId: number, count: number) => {
  const templates = [
    { question: "뉴진스, 이번 컴백으로 음원 차트 올킬할까?", filter: ["all", "hot", "girl-group", "group"], badge: "hot" as const },
    { question: "세븐틴, 이번 앨범으로 밀리언셀러 달성할까?", filter: ["all", "new", "boy-group", "group"], badge: "new" as const },
    { question: "아이유, 새 앨범으로 멜론 연간 차트 1위 할까?", filter: ["all", "hot", "solo"], badge: "hot" as const },
    { question: "에스파, 월드투어 전석 매진될까?", filter: ["all", "ending", "girl-group", "group"], badge: "ending" as const },
    { question: "스트레이키즈, 빌보드 200 1위 재진입할까?", filter: ["all", "hot", "boy-group", "group"], badge: "hot" as const },
    { question: "정국, 솔로 앨범으로 그래미 노미네이트될까?", filter: ["all", "new", "solo"], badge: "new" as const },
    { question: "르세라핌, 일본 오리콘 1위 달성할까?", filter: ["all", "ending", "girl-group", "group"], badge: "ending" as const },
    { question: "NCT DREAM, 이번 앨범 더블 밀리언 달성할까?", filter: ["all", "hot", "boy-group", "group"], badge: "hot" as const },
    { question: "태연, 솔로 콘서트 전석 매진될까?", filter: ["all", "new", "solo"], badge: "new" as const },
    { question: "아이브, 다음 컴백으로 음방 1위 할까?", filter: ["all", "hot", "girl-group", "group"], badge: "hot" as const },
    { question: "BTS 진, 솔로 앨범 빌보드 진입할까?", filter: ["all", "ending", "solo"], badge: "ending" as const },
    { question: "ITZY, 미국 투어 전석 매진될까?", filter: ["all", "girl-group", "group"], badge: null },
  ];

  return Array.from({ length: count }, (_, i) => {
    const template = templates[(startId + i) % templates.length];
    return {
      id: String(startId + i),
      question: template.question,
      imageUrl: `https://picsum.photos/seed/market${startId + i}/400/500`,
      yesPercent: Math.floor(Math.random() * 60) + 30,
      totalParticipants: Math.floor(Math.random() * 5000) + 500,
      badge: template.badge,
      filter: template.filter,
    };
  });
};

// 스켈레톤 카드 컴포넌트
function SkeletonCard() {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-200 animate-pulse" style={{ outline: "6px solid white", boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)" }}>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="mb-2 h-4 w-3/4 rounded bg-zinc-300" />
        <div className="mb-2 h-4 w-1/2 rounded bg-zinc-300" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded bg-zinc-300" />
          <div className="h-3 w-20 rounded bg-zinc-300" />
        </div>
      </div>
    </div>
  );
}

// 썸네일 카드 컴포넌트
function ThumbnailCard({
  id,
  question,
  imageUrl,
  yesPercent,
  totalParticipants,
  badge,
}: {
  id: string;
  question: string;
  imageUrl: string;
  yesPercent: number;
  totalParticipants: number;
  badge: "hot" | "new" | "ending" | null;
}) {
  const badgeStyle = badge ? badgeStyles[badge] : null;

  return (
    <Link href={`/market/${id}`} className="block">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[16px] bg-zinc-200" style={{ outline: "6px solid white", boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)" }}>
        {/* 썸네일 이미지 */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
        <Image
          src={imageUrl}
          alt={question}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        {/* 배지 */}
        {badgeStyle && (
          <div
            className="absolute left-2 top-2 z-20 rounded-full px-2 flex items-center justify-center"
            style={{ background: badgeStyle.gradient, height: "20px" }}
          >
            <span className="font-bold text-white" style={{ fontSize: "11px" }}>{badgeStyle.label}</span>
          </div>
        )}

        {/* 하단 오버레이: 질문 + 정보 */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <p className="mb-2 text-lg font-bold leading-tight text-white drop-shadow-lg line-clamp-3">
            {question}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-xs font-medium text-emerald-400">YES {yesPercent}%</span>
            </div>
            <span className="text-xs text-white/80">{totalParticipants.toLocaleString()}명 참여</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showSearch, setShowSearch] = useState(false);
  const [markets, setMarkets] = useState(() => generateMarkets(1, 8));
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const marketsLengthRef = useRef(8);
  const isFirstMount = useRef(true);

  // 더 많은 데이터 로드
  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    // 로딩 시뮬레이션 (실제로는 API 호출)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const currentLength = marketsLengthRef.current;
    const newMarkets = generateMarkets(currentLength + 1, 8);

    setMarkets((prev) => [...prev, ...newMarkets]);
    marketsLengthRef.current = currentLength + 8;

    // 최대 40개까지만 로드 (테스트용)
    if (currentLength + 8 >= 40) {
      setHasMore(false);
    }

    setIsLoading(false);
    isLoadingRef.current = false;
  }, [hasMore]);

  // Intersection Observer로 무한 스크롤
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingRef.current) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore]);

  // 필터 변경시 리셋 (초기 마운트 제외)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    setMarkets(generateMarkets(1, 8));
    marketsLengthRef.current = 8;
    setHasMore(true);
  }, [activeFilter]);

  // 필터링된 마켓
  const filteredMarkets = markets.filter((market) =>
    market.filter.includes(activeFilter)
  );

  return (
    <>
      {/* 회색 배경 */}
      <div className="fixed inset-0 z-0 bg-[#f7f7fa]" />

      {/* 상단 헤더 - 전체 너비 */}
      <div className="sticky top-0 z-50 bg-[#f7f7fa]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-[1200px] px-6" style={{ paddingTop: "20px", paddingBottom: "10px" }}>
          <div className="flex items-center justify-between">
            <h1
              className="font-cafe24 font-bold text-zinc-900"
              style={{
                fontSize: "32px",
                WebkitTextStroke: "4px white",
                paintOrder: "stroke fill",
              }}
            >
              탐색
            </h1>
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-200"
            >
              <svg
                className="h-5 w-5 text-zinc-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* 검색바 (토글) */}
          {showSearch && (
            <div className="mt-3">
              <input
                type="search"
                placeholder="아티스트, 키워드 검색..."
                autoFocus
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 px-4 text-sm placeholder-zinc-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100"
              />
            </div>
          )}

          {/* 필터 칩 */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {feedFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex shrink-0 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-zinc-900 text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100"
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 그리드 */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-24" style={{ paddingTop: "20px" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMarkets.map((market) => (
              <ThumbnailCard
                key={market.id}
                id={market.id}
                question={market.question}
                imageUrl={market.imageUrl}
                yesPercent={market.yesPercent}
                totalParticipants={market.totalParticipants}
                badge={market.badge}
              />
            ))}

            {/* 스켈레톤 로딩 */}
            {isLoading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
          </div>

          {/* 무한 스크롤 트리거 */}
          {hasMore && <div ref={observerRef} className="h-20" />}

          {/* 더 이상 데이터가 없을 때 */}
          {!hasMore && filteredMarkets.length > 0 && (
            <p className="py-8 text-center text-sm text-zinc-400">
              모든 예측을 불러왔어요
            </p>
          )}

          {filteredMarkets.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <span className="text-4xl">🔍</span>
              <p className="mt-3 text-sm text-zinc-500">해당 필터의 예측이 없어요</p>
            </div>
          )}
      </div>
    </>
  );
}
