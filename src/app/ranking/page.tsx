"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

type TabType = "successRate" | "points" | "streak";

// 샘플 랭킹 데이터
const baseData = [
  {
    username: "kpop_oracle",
    name: "케이팝 예언자",
    successRate: 87.5,
    totalPredictions: 156,
    correctPredictions: 137,
    totalPoints: 284500,
    streak: 12,
  },
  {
    username: "chart_master",
    name: "차트 마스터",
    successRate: 84.2,
    totalPredictions: 203,
    correctPredictions: 171,
    totalPoints: 256800,
    streak: 8,
  },
  {
    username: "idol_insider",
    name: "아이돌 인사이더",
    successRate: 82.1,
    totalPredictions: 178,
    correctPredictions: 146,
    totalPoints: 219400,
    streak: 5,
  },
  {
    username: "music_prophet",
    name: "음악 예언가",
    successRate: 79.8,
    totalPredictions: 134,
    correctPredictions: 107,
    totalPoints: 187200,
    streak: 3,
  },
  {
    username: "trend_hunter",
    name: "트렌드 헌터",
    successRate: 78.4,
    totalPredictions: 167,
    correctPredictions: 131,
    totalPoints: 165800,
    streak: 6,
  },
  {
    username: "fan_detective",
    name: "팬 탐정",
    successRate: 76.9,
    totalPredictions: 143,
    correctPredictions: 110,
    totalPoints: 142500,
    streak: 2,
  },
  {
    username: "award_guru",
    name: "시상식 구루",
    successRate: 75.2,
    totalPredictions: 89,
    correctPredictions: 67,
    totalPoints: 128900,
    streak: 4,
  },
  {
    username: "comeback_watcher",
    name: "컴백 워처",
    successRate: 74.6,
    totalPredictions: 118,
    correctPredictions: 88,
    totalPoints: 115600,
    streak: 1,
  },
  {
    username: "chart_analyzer",
    name: "차트 분석가",
    successRate: 73.1,
    totalPredictions: 156,
    correctPredictions: 114,
    totalPoints: 98700,
    streak: 0,
  },
  {
    username: "gossip_king",
    name: "가십 킹",
    successRate: 71.8,
    totalPredictions: 201,
    correctPredictions: 144,
    totalPoints: 87400,
    streak: 2,
  },
];

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

const getBadgeStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "from-yellow-300 to-amber-500 ring-4 ring-yellow-200 dark:ring-yellow-900";
    case 2:
      return "from-gray-300 to-slate-400 ring-2 ring-gray-200 dark:ring-gray-700";
    case 3:
      return "from-orange-300 to-amber-600 ring-2 ring-orange-200 dark:ring-orange-900";
    default:
      return "from-purple-400 to-pink-400";
  }
};

const getRankEmoji = (rank: number) => {
  switch (rank) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return null;
  }
};

const getPodiumColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-400 dark:bg-yellow-600";
    case 2:
      return "bg-gray-300 dark:bg-gray-600";
    case 3:
      return "bg-orange-400 dark:bg-orange-600";
    default:
      return "bg-zinc-300";
  }
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

  // 탭에 따른 서브 값 표시
  const getSubValue = (user: typeof baseData[0]) => {
    switch (activeTab) {
      case "successRate":
        return `${user.totalPoints.toLocaleString()}P`;
      case "points":
        return `${user.successRate}%`;
      case "streak":
        return `${user.successRate}%`;
    }
  };

  // 포디움 값 표시
  const getPodiumValue = (user: typeof baseData[0]) => {
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

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
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
            🏆 예측왕 랭킹
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            가장 정확한 예측을 하는 유저들
          </p>
        </div>

        {/* 탭 */}
        <div className="mb-6 flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TOP 3 포디움 */}
        <div className="mb-8 flex items-end justify-center gap-3">
          {/* 2등 */}
          <div className="flex flex-col items-center">
            <div className={`h-16 w-16 rounded-full bg-gradient-to-br ${getBadgeStyle(2)}`} />
            <div className="mt-2 text-center">
              <p className="text-lg">🥈</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {sortedData[1]?.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {sortedData[1] && getPodiumValue(sortedData[1])}
              </p>
            </div>
            <div className={`mt-2 h-16 w-20 rounded-t-lg ${getPodiumColor(2)}`} />
          </div>

          {/* 1등 */}
          <div className="flex flex-col items-center">
            <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${getBadgeStyle(1)}`} />
            <div className="mt-2 text-center">
              <p className="text-2xl">🥇</p>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {sortedData[0]?.name}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                {sortedData[0] && getPodiumValue(sortedData[0])}
              </p>
            </div>
            <div className={`mt-2 h-24 w-24 rounded-t-lg ${getPodiumColor(1)}`} />
          </div>

          {/* 3등 */}
          <div className="flex flex-col items-center">
            <div className={`h-14 w-14 rounded-full bg-gradient-to-br ${getBadgeStyle(3)}`} />
            <div className="mt-2 text-center">
              <p className="text-lg">🥉</p>
              <p className="text-sm font-medium text-zinc-900 dark:text-white">
                {sortedData[2]?.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {sortedData[2] && getPodiumValue(sortedData[2])}
              </p>
            </div>
            <div className={`mt-2 h-12 w-16 rounded-t-lg ${getPodiumColor(3)}`} />
          </div>
        </div>

        {/* 전체 랭킹 목록 */}
        <div className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          {sortedData.map((user, index) => (
            <Link
              key={user.username}
              href={`/user/${user.username}`}
              className={`flex items-center gap-4 p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${
                index !== sortedData.length - 1 ? "border-b border-zinc-100 dark:border-zinc-800" : ""
              }`}
            >
              {/* 순위 */}
              <div className="flex h-8 w-8 items-center justify-center">
                {getRankEmoji(user.rank) ? (
                  <span className="text-xl">{getRankEmoji(user.rank)}</span>
                ) : (
                  <span className="text-lg font-bold text-zinc-400">{user.rank}</span>
                )}
              </div>

              {/* 프로필 */}
              <div className={`h-12 w-12 shrink-0 rounded-full bg-gradient-to-br ${getBadgeStyle(user.rank)}`} />

              {/* 유저 정보 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-zinc-900 dark:text-white">
                    {user.name}
                  </p>
                  {user.streak >= 5 && (
                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                      🔥 {user.streak}연승
                    </span>
                  )}
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  @{user.username} · {user.correctPredictions}/{user.totalPredictions} 적중
                </p>
              </div>

              {/* 메인 값 */}
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {getMainValue(user)}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {getSubValue(user)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 내 순위 */}
        <div className="sticky bottom-16 md:bottom-4 mt-4 rounded-2xl border-2 border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center">
              <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{myRank}</span>
            </div>
            <div className="h-12 w-12 shrink-0 rounded-full bg-gradient-to-br from-green-400 to-emerald-500" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-zinc-900 dark:text-white">{myData.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                @{myData.username} · {myData.correctPredictions}/{myData.totalPredictions} 적중
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {getMainValue(myData)}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {getSubValue(myData)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
