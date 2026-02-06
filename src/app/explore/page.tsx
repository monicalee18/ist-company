import MarketCard from "@/components/market/MarketCard";

// 카테고리 데이터
const categories = [
  { id: "kpop", name: "K-POP", emoji: "🎤", count: 45 },
  { id: "chart", name: "차트", emoji: "📊", count: 23 },
  { id: "music-show", name: "음악방송", emoji: "📺", count: 18 },
  { id: "awards", name: "시상식", emoji: "🏆", count: 12 },
  { id: "drama", name: "드라마", emoji: "🎬", count: 15 },
  { id: "variety", name: "예능", emoji: "😂", count: 9 },
  { id: "movie", name: "영화", emoji: "🎥", count: 7 },
  { id: "celeb", name: "연예인", emoji: "⭐", count: 21 },
];

// 샘플 마켓 데이터
const recentMarkets = [
  {
    id: "10",
    question: "세븐틴, 이번 앨범으로 밀리언셀러 달성할까?",
    category: "K-POP",
    yesPercent: 89,
    totalParticipants: 3456,
    totalPoints: 172800,
    endsAt: "1주 후 마감",
    isHot: false,
  },
  {
    id: "11",
    question: "더 글로리 시즌2, 넷플릭스 글로벌 1위 할까?",
    category: "드라마",
    yesPercent: 76,
    totalParticipants: 4521,
    totalPoints: 226050,
    endsAt: "방영 후 1주",
    isHot: true,
  },
  {
    id: "12",
    question: "아이브, 다음 컴백에서 음원 올킬 할까?",
    category: "K-POP",
    yesPercent: 68,
    totalParticipants: 2189,
    totalPoints: 109450,
    endsAt: "컴백 후 1주",
    isHot: false,
  },
];

const closingSoonMarkets = [
  {
    id: "20",
    question: "엔믹스, 이번 주 음방 1위 할까?",
    category: "음악방송",
    yesPercent: 52,
    totalParticipants: 1234,
    totalPoints: 61700,
    endsAt: "오늘 마감",
    isHot: true,
  },
  {
    id: "21",
    question: "임영웅, 이번 주 멜론 일간차트 1위 유지할까?",
    category: "차트",
    yesPercent: 94,
    totalParticipants: 2876,
    totalPoints: 143800,
    endsAt: "내일 마감",
    isHot: false,
  },
];

export default function ExplorePage() {
  return (
    <>
      {/* 회색 배경 */}
      <div className="fixed inset-0 z-0 bg-[#f7f7fa]" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-6">
      {/* 검색바 */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
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
          <input
            type="search"
            placeholder="아티스트, 이슈, 키워드 검색..."
            className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 py-3 pl-12 pr-4 text-sm placeholder-zinc-400 focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-100 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-purple-500 dark:focus:ring-purple-900"
          />
        </div>
      </div>

      {/* 카테고리 그리드 */}
      <section className="mb-8">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
          카테고리
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-purple-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-purple-700"
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
                {cat.name}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {cat.count}개
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 곧 마감되는 마켓 */}
      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
            <span>⏰</span> 곧 마감
          </h2>
          <button className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
            전체보기
          </button>
        </div>
        <div className="space-y-4">
          {closingSoonMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </section>

      {/* 최근 등록된 마켓 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white">
            <span>✨</span> 새로 올라온 예측
          </h2>
          <button className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400">
            전체보기
          </button>
        </div>
        <div className="space-y-4">
          {recentMarkets.map((market) => (
            <MarketCard key={market.id} {...market} />
          ))}
        </div>
      </section>

      {/* 인기 키워드 */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
          🔍 인기 검색어
        </h2>
        <div className="flex flex-wrap gap-2">
          {["뉴진스", "블랙핑크", "BTS", "에스파", "아이브", "세븐틴", "스트레이키즈", "르세라핌"].map((keyword) => (
            <button
              key={keyword}
              className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-purple-100 hover:text-purple-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
            >
              {keyword}
            </button>
          ))}
        </div>
      </section>
    </div>
    </>
  );
}
