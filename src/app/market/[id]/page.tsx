"use client";

import { useRouter } from "next/navigation";

// 샘플 마켓 상세 데이터
const marketData = {
  id: "1",
  question: "뉴진스, 3월 안에 컴백할 수 있을까?",
  description:
    "뉴진스의 2024년 첫 컴백 시기를 예측합니다. 3월 31일까지 공식 컴백(앨범 발매 또는 싱글 발매)이 이루어지면 YES, 그렇지 않으면 NO로 결정됩니다.",
  category: "K-POP",
  yesPercent: 67,
  noPercent: 33,
  totalParticipants: 2847,
  totalPoints: 142350,
  yesPoints: 95375,
  noPoints: 46975,
  endsAt: "2024년 3월 31일 23:59",
  createdAt: "2024년 1월 15일",
  createdBy: "spilltea_official",
  isHot: true,
};

// 샘플 댓글 데이터
const comments = [
  {
    id: "c1",
    author: { name: "뉴진스러버", username: "nj_lover" },
    content: "민희진 대표가 인스타에서 힌트 줬잖아요! 3월 초 컴백 확실할 듯 🔥",
    choice: "YES",
    likes: 234,
    createdAt: "2시간 전",
  },
  {
    id: "c2",
    author: { name: "케이팝분석가", username: "kpop_analyst" },
    content: "하이브 내부 사정이 복잡해서 4월로 밀릴 가능성도 있어요. 신중하게 봐야 할 듯",
    choice: "NO",
    likes: 156,
    createdAt: "3시간 전",
  },
  {
    id: "c3",
    author: { name: "차트지킴이", username: "chart_watcher" },
    content: "음원 사재기 논란 이후로 하이브가 조심스러워하는 것 같은데... 그래도 뉴진스라면!",
    choice: "YES",
    likes: 89,
    createdAt: "5시간 전",
  },
  {
    id: "c4",
    author: { name: "연예기자", username: "ent_reporter" },
    content: "업계 소식통에 따르면 MV 촬영은 이미 완료됐다고 합니다. 3월 중순 유력!",
    choice: "YES",
    likes: 312,
    createdAt: "8시간 전",
  },
];

export default function MarketDetailPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* 뒤로가기 */}
      <button
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        뒤로가기
      </button>

      {/* 마켓 정보 카드 */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        {/* 카테고리 + HOT */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            {marketData.category}
          </span>
          {marketData.isHot && (
            <span className="flex items-center gap-1 text-sm font-medium text-orange-500">
              🔥 HOT
            </span>
          )}
        </div>

        {/* 질문 */}
        <h1 className="mt-4 text-xl font-bold leading-tight text-zinc-900 dark:text-white">
          {marketData.question}
        </h1>

        {/* 설명 */}
        <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
          {marketData.description}
        </p>

        {/* YES/NO 투표 현황 */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              YES {marketData.yesPercent}%
            </span>
            <span className="font-bold text-rose-600 dark:text-rose-400">
              NO {marketData.noPercent}%
            </span>
          </div>
          <div className="mt-2 flex h-4 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div
              className="bg-emerald-500 transition-all"
              style={{ width: `${marketData.yesPercent}%` }}
            />
            <div
              className="bg-rose-500 transition-all"
              style={{ width: `${marketData.noPercent}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{marketData.yesPoints.toLocaleString()}P</span>
            <span>{marketData.noPoints.toLocaleString()}P</span>
          </div>
        </div>

        {/* 예측 참여 버튼 */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-xl bg-emerald-500 py-4 text-lg font-bold text-white transition-all hover:bg-emerald-600 active:scale-[0.98]">
            YES 예측하기
          </button>
          <button className="flex-1 rounded-xl bg-rose-500 py-4 text-lg font-bold text-white transition-all hover:bg-rose-600 active:scale-[0.98]">
            NO 예측하기
          </button>
        </div>

        {/* 통계 */}
        <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-800">
          <div className="text-center">
            <p className="text-lg font-bold text-zinc-900 dark:text-white">
              {marketData.totalParticipants.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">참여자</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-zinc-900 dark:text-white">
              {marketData.totalPoints.toLocaleString()}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">총 포인트</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-zinc-900 dark:text-white">
              3일
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">남은 시간</p>
          </div>
        </div>

        {/* 마감일 */}
        <p className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          마감: {marketData.endsAt}
        </p>
      </div>

      {/* 커뮤니티 토론 */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            💬 썰 풀기 ({comments.length})
          </h2>
          <select className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800">
            <option>인기순</option>
            <option>최신순</option>
          </select>
        </div>

        {/* 댓글 작성 */}
        <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <textarea
            placeholder="이 예측에 대한 의견을 남겨주세요..."
            className="w-full resize-none border-none bg-transparent text-sm placeholder-zinc-400 focus:outline-none dark:text-white"
            rows={2}
          />
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                YES 지지
              </button>
              <button className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                NO 지지
              </button>
            </div>
            <button className="rounded-lg bg-purple-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-purple-700">
              작성
            </button>
          </div>
        </div>

        {/* 댓글 목록 */}
        <div className="mt-4 space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {comment.author.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        comment.choice === "YES"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      }`}
                    >
                      {comment.choice}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {comment.content}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-zinc-500 hover:text-rose-500 dark:text-zinc-400">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {comment.likes}
                    </button>
                    <button className="text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
                      답글
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 더 보기 */}
        <button className="mt-4 w-full rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800">
          더 많은 댓글 보기
        </button>
      </div>
    </div>
  );
}
