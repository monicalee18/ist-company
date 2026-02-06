import Link from "next/link";

// 샘플 프로필 데이터
const userProfile = {
  name: "케이팝 러버",
  username: "kpop_lover_88",
  bio: "뉴진스 팬 | 예측은 내 직감을 믿어요 🎯",
  rank: 42,
  totalPoints: 12450,
  successRate: 65.7,
  totalPredictions: 35,
  correctPredictions: 23,
  streak: 3,
  joinedAt: "2024년 1월",
};

// 내 예측 기록
const myPredictions = [
  {
    id: "1",
    question: "뉴진스, 3월 안에 컴백할 수 있을까?",
    myChoice: "YES",
    betAmount: 500,
    currentPercent: 67,
    status: "진행중",
    endsAt: "3일 후",
  },
  {
    id: "2",
    question: "화사, 이번 주 음방 1위 할까?",
    myChoice: "YES",
    betAmount: 300,
    currentPercent: 78,
    status: "진행중",
    endsAt: "5일 후",
  },
  {
    id: "3",
    question: "아이브, 신곡으로 음원 올킬 할까?",
    myChoice: "YES",
    betAmount: 1000,
    result: "적중",
    reward: 1850,
    status: "완료",
  },
  {
    id: "4",
    question: "세븐틴, 빌보드 200 1위 달성할까?",
    myChoice: "NO",
    betAmount: 500,
    result: "실패",
    reward: 0,
    status: "완료",
  },
  {
    id: "5",
    question: "BTS 뷔, 1월 솔로곡 발매할까?",
    myChoice: "YES",
    betAmount: 800,
    result: "적중",
    reward: 1520,
    status: "완료",
  },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      {/* 프로필 헤더 */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          {/* 프로필 이미지 */}
          <div className="h-24 w-24 shrink-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
              <div>
                <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {userProfile.name}
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                  @{userProfile.username}
                </p>
              </div>
              <button className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
                프로필 수정
              </button>
            </div>

            <p className="mt-3 text-zinc-700 dark:text-zinc-300">
              {userProfile.bio}
            </p>

            {/* 통계 카드 */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl bg-purple-50 p-3 text-center dark:bg-purple-900/20">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {userProfile.successRate}%
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">성공률</p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3 text-center dark:bg-emerald-900/20">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {userProfile.totalPoints.toLocaleString()}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">포인트</p>
              </div>
              <div className="rounded-xl bg-amber-50 p-3 text-center dark:bg-amber-900/20">
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  #{userProfile.rank}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">랭킹</p>
              </div>
              <div className="rounded-xl bg-rose-50 p-3 text-center dark:bg-rose-900/20">
                <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  🔥 {userProfile.streak}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">연승</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="mt-6 flex border-b border-zinc-200 dark:border-zinc-800">
        <button className="flex-1 border-b-2 border-purple-600 py-3 text-sm font-medium text-purple-600 dark:border-purple-400 dark:text-purple-400">
          내 예측 ({userProfile.totalPredictions})
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          포인트 내역
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300">
          뱃지
        </button>
      </div>

      {/* 예측 기록 */}
      <div className="mt-4 space-y-3">
        {myPredictions.map((prediction) => (
          <Link
            key={prediction.id}
            href={`/market/${prediction.id}`}
            className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-zinc-900 dark:text-white">
                  {prediction.question}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      prediction.myChoice === "YES"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    }`}
                  >
                    {prediction.myChoice}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    {prediction.betAmount}P 베팅
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                {prediction.status === "진행중" ? (
                  <>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      진행중
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {prediction.endsAt}
                    </p>
                  </>
                ) : prediction.result === "적중" ? (
                  <>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      ✅ 적중!
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      +{prediction.reward}P
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-zinc-400">
                      ❌ 실패
                    </p>
                    <p className="text-xs text-rose-500">
                      -{prediction.betAmount}P
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 더 보기 */}
      <div className="mt-6 flex justify-center">
        <button className="rounded-full border border-zinc-300 px-6 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800">
          더 많은 예측 보기
        </button>
      </div>
    </div>
  );
}
