"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

type TabType = "successRate" | "points" | "streak";

// 샘플 랭킹 데이터 (50명)
const nicknames = [
  "케이팝 예언자", "차트 마스터", "아이돌 인사이더", "음악 예언가", "트렌드 헌터",
  "팬 탐정", "시상식 구루", "컴백 워처", "차트 분석가", "가십 킹",
  "음방 지킴이", "덕후 대장", "스밍 요정", "팬카페 회장", "뮤비 감독",
  "무대 천재", "직캠 마스터", "앨범 수집가", "콘서트 홀릭", "굿즈 부자",
  "예측 신", "차트인 요정", "음원 강자", "스트리밍 왕", "팬덤 리더",
  "케이팝 박사", "아이돌 평론가", "엔터 전문가", "음악 큐레이터", "트렌드 세터",
  "팬심 분석가", "콘텐츠 킹", "영상 제작자", "포토 마스터", "SNS 인플루언서",
  "음악 전도사", "케이팝 전사", "팬덤 수호자", "덕질 고수", "스밍 전사",
  "차트 정복자", "음원 헌터", "앨범 마스터", "무대 평론가", "퍼포먼스 킹",
  "보컬 감별사", "댄스 전문가", "비주얼 평가단", "팬서비스 왕", "레전드 목격자",
];

const baseData = nicknames.map((name, i) => {
  const totalPredictions = 200 - i * 3;
  const correctPredictions = Math.floor(totalPredictions * (0.9 - i * 0.008));
  return {
    username: `user_${i + 1}`,
    name,
    successRate: Math.round((90 - i * 0.8) * 10) / 10,
    totalPredictions,
    correctPredictions,
    totalPoints: 300000 - i * 5500,
    streak: Math.max(0, 15 - Math.floor(i * 0.3)),
  };
});

// 내 데이터
const myData = {
  username: "my_username",
  name: "나",
  successRate: 65.7,
  totalPredictions: 35,
  correctPredictions: 23,
  totalPoints: 12450,
  streak: 3,
};

// 순위별 숫자 스타일 (1-3등은 그라데이션)
const getRankStyle = (rank: number): React.CSSProperties => {
  if (rank === 1) {
    return {
      background: "linear-gradient(180deg, #FFE14A 0%, #D78E34 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    };
  }
  if (rank === 2) {
    return {
      background: "linear-gradient(180deg, #D1DCE5 0%, #829CBC 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    };
  }
  if (rank === 3) {
    return {
      background: "linear-gradient(180deg, #FFA97F 0%, #DD6837 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    };
  }
  if (rank <= 5) return { color: "#4663FF" };
  if (rank <= 10) return { color: "#5A75FF" };
  return { color: "#9CA3AF" };
};

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState<TabType>("successRate");

  // 탭에 따라 정렬된 데이터
  const sortedData = useMemo(() => {
    const sorted = [...baseData].sort((a, b) => {
      switch (activeTab) {
        case "successRate":
          return b.successRate - a.successRate;
        case "points":
          return b.totalPoints - a.totalPoints;
        case "streak":
          return b.streak - a.streak;
        default:
          return 0;
      }
    });
    return sorted.map((user, index) => ({ ...user, rank: index + 1 }));
  }, [activeTab]);

  // 내 순위 계산
  const myRank = useMemo(() => {
    const allUsers = [...baseData, myData].sort((a, b) => {
      switch (activeTab) {
        case "successRate":
          return b.successRate - a.successRate;
        case "points":
          return b.totalPoints - a.totalPoints;
        case "streak":
          return b.streak - a.streak;
        default:
          return 0;
      }
    });
    return allUsers.findIndex((u) => u.username === myData.username) + 1;
  }, [activeTab]);

  // 탭에 따른 메인 값 표시
  const getMainValue = (user: typeof baseData[0]) => {
    switch (activeTab) {
      case "successRate":
        return `${user.successRate}%`;
      case "points":
        return `${user.totalPoints.toLocaleString()}P`;
      case "streak":
        return `${user.streak}연승`;
    }
  };

  const tabs: { key: TabType; label: string }[] = [
    { key: "successRate", label: "성공률" },
    { key: "points", label: "포인트" },
    { key: "streak", label: "연속 적중" },
  ];

  return (
    <>
      {/* 회색 배경 */}
      <div className="fixed inset-0 z-0 bg-[#f7f7fa]" />

      <div className="relative z-10 mx-auto max-w-2xl px-6" style={{ paddingTop: "20px" }}>
        {/* 헤더 */}
        <div className="mb-6">
          <h1
            className="font-cafe24 font-bold text-zinc-900"
            style={{
              fontSize: "32px",
              WebkitTextStroke: "4px white",
              paintOrder: "stroke fill",
            }}
          >
            랭킹
          </h1>
        </div>

        {/* 탭 */}
        <div className="mb-6 flex rounded-full bg-zinc-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-zinc-900 shadow"
                  : "text-zinc-500 hover:text-zinc-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TOP 3 포디움 */}
        <div className="mb-6 flex items-end justify-center" style={{ gap: "24px" }}>
          {/* 2등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #D1DCE5 0%, #829CBC 100%)",
                  filter: "blur(4px)",
                  opacity: 0.8,
                }}
              />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-gray-300 to-slate-400" />
            </div>
            <div className="mt-2 text-center">
              <span
                className="font-cafe24 text-2xl font-extrabold"
                style={getRankStyle(2)}
              >
                2
              </span>
              <p className="mt-1 text-sm font-bold text-zinc-900 font-cafe24">
                {sortedData[1]?.name}
              </p>
              <p className="font-bold font-cafe24" style={{ fontSize: "13px", color: "#4663FF" }}>
                {sortedData[1] && getMainValue(sortedData[1])}
              </p>
            </div>
            <div className="mt-2 h-16 w-20 rounded-t-xl bg-gradient-to-b from-gray-200 to-gray-300" />
          </div>

          {/* 1등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/images/crown.gif"
                alt="1st place crown"
                width={54}
                height={54}
                className="absolute top-0 left-0 z-10"
                unoptimized
              />
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #FFE14A 0%, #D78E34 100%)",
                  filter: "blur(4px)",
                  opacity: 0.8,
                }}
              />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500" />
            </div>
            <div className="mt-2 text-center">
              <span
                className="font-cafe24 text-3xl font-extrabold"
                style={getRankStyle(1)}
              >
                1
              </span>
              <p className="mt-1 font-bold text-zinc-900 font-cafe24">
                {sortedData[0]?.name}
              </p>
              <p className="font-bold font-cafe24" style={{ fontSize: "13px", color: "#4663FF" }}>
                {sortedData[0] && getMainValue(sortedData[0])}
              </p>
            </div>
            <div className="mt-2 h-24 w-24 rounded-t-xl bg-gradient-to-b from-yellow-300 to-amber-400" />
          </div>

          {/* 3등 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #FFA97F 0%, #DD6837 100%)",
                  filter: "blur(4px)",
                  opacity: 0.8,
                }}
              />
              <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-orange-300 to-amber-600" />
            </div>
            <div className="mt-2 text-center">
              <span
                className="font-cafe24 text-2xl font-extrabold"
                style={getRankStyle(3)}
              >
                3
              </span>
              <p className="mt-1 text-sm font-bold text-zinc-900 font-cafe24">
                {sortedData[2]?.name}
              </p>
              <p className="font-bold font-cafe24" style={{ fontSize: "13px", color: "#4663FF" }}>
                {sortedData[2] && getMainValue(sortedData[2])}
              </p>
            </div>
            <div className="mt-2 h-12 w-16 rounded-t-xl bg-gradient-to-b from-orange-300 to-amber-500" />
          </div>
        </div>

        {/* 랭킹 리스트 */}
        <div className="bg-white p-4 mb-24" style={{ borderRadius: "28px", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)" }}>
          <div className="space-y-2">
            {sortedData.map((user) => (
                <Link
                  key={user.username}
                  href={`/user/${user.username}`}
                  className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-zinc-50"
                >
                  {/* 순위 숫자 */}
                  <div className="flex items-center justify-center w-10">
                    <span
                      className="font-cafe24 text-lg font-bold"
                      style={getRankStyle(user.rank)}
                    >
                      {user.rank <= 3 ? `#${user.rank}` : user.rank}
                    </span>
                  </div>

                  {/* 프로필 이미지 */}
                  <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />

                  {/* 유저 정보 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-bold text-zinc-900 font-cafe24">
                      {user.name}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {user.correctPredictions}/{user.totalPredictions} 적중
                    </p>
                  </div>

                  {/* 메인 값 + 화살표 */}
                  <div className="flex items-center gap-1">
                    <span className="text-base font-bold font-cafe24" style={{ color: "#4D4A4E" }}>
                      {getMainValue(user)}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M5 2L8 6L5 10" stroke="#C1C0C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </Link>
            ))}
          </div>
        </div>

        {/* 내 순위 */}
        <div
          className="sticky bottom-20 mt-4 bg-white p-4"
          style={{ borderRadius: "28px", boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center gap-3">
            {/* 내 순위 숫자 */}
            <div className="flex items-center justify-center w-10">
              <span
                className="font-cafe24 text-lg font-bold"
                style={getRankStyle(myRank)}
              >
                {myRank}
              </span>
            </div>

            {/* 프로필 이미지 */}
            <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />

            {/* 내 정보 */}
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-zinc-900 font-cafe24">{myData.name}</p>
              <p className="text-sm text-zinc-400">
                {myData.correctPredictions}/{myData.totalPredictions} 적중
              </p>
            </div>

            {/* 메인 값 */}
            <div className="flex items-center gap-1">
              <span className="text-base font-bold font-cafe24" style={{ color: "#4D4A4E" }}>
                {getMainValue(myData)}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M5 2L8 6L5 10" stroke="#C1C0C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
