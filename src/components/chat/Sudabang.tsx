"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSudabang } from "@/contexts/SudabangContext";

interface GiphyGif {
  id: string;
  images: {
    fixed_height: {
      url: string;
      width: string;
      height: string;
    };
    fixed_height_small: {
      url: string;
    };
  };
  title: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    accuracy?: number;      // 적중률 (0-100)
    totalEarnings?: number; // 총 획득 포인트
  };
  choice?: "YES" | "NO";
  content: string;
  image?: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
  betAmount?: number;       // 베팅 금액
  isAuthor?: boolean;       // 마켓 작성자 여부
}

// 댓글 랭킹 스코어 계산
function calculateCommentScore(comment: Comment): number {
  const betWeight = (comment.betAmount || 0) * 0.5;
  const accuracyWeight = (comment.author.accuracy || 0) * 2;
  const earningsWeight = Math.log10((comment.author.totalEarnings || 0) + 1) * 10;
  const likesWeight = comment.likes * 3;

  return betWeight + accuracyWeight + earningsWeight + likesWeight;
}

// 댓글 정렬 (작성자 최상단 → 스코어 순)
function sortComments(comments: Comment[]): Comment[] {
  return [...comments].sort((a, b) => {
    // 작성자 댓글은 항상 최상단
    if (a.isAuthor && !b.isAuthor) return -1;
    if (!a.isAuthor && b.isAuthor) return 1;

    // 나머지는 스코어 순
    return calculateCommentScore(b) - calculateCommentScore(a);
  });
}

// DiceBear 아바타 생성 함수
function getAvatar(name: string) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`;
}

// 마켓별 샘플 댓글 데이터
const commentsByMarket: Record<string, Comment[]> = {
  "1": [ // 뉴진스 컴백
    // 마켓 작성자 댓글 (최상단 고정)
    { id: "1-0", author: { name: "spilltea 공식", avatar: getAvatar("spilltea 공식") }, content: "📢 이 마켓은 뉴진스의 2026년 3월 공식 컴백 여부를 예측합니다. 공식 발표 기준으로 판정됩니다!", likes: 45, createdAt: "1일 전", isAuthor: true },
    { id: "1-1", author: { name: "민트초코파", avatar: getAvatar("민트초코파") }, choice: "YES", content: "최근 흐름 보면 YES 말고는 답이 없음", likes: 1, createdAt: "10분 전", replies: [
      { id: "1-1-r1", author: { name: "번지팬", avatar: getAvatar("번지팬") }, choice: "YES", content: "@민트초코파 진짜 동의! 이번에 확실함", likes: 3, createdAt: "5분 전" },
      { id: "1-1-r2", author: { name: "케이팝마스터", avatar: getAvatar("케이팝마스터") }, choice: "YES", content: "@민트초코파 맞아 이번엔 확실해", likes: 2, createdAt: "3분 전" },
      { id: "1-1-r3", author: { name: "뉴진스최고", avatar: getAvatar("뉴진스최고") }, choice: "YES", content: "다들 YES로 가는구나 ㅎㅎ", likes: 1, createdAt: "1분 전" },
    ] },
    { id: "1-2", author: { name: "하입보이", avatar: getAvatar("하입보이") }, choice: "YES", content: "뉴진스 컴백 확정이래!!", likes: 12, createdAt: "30분 전", replies: [
      { id: "1-2-r1", author: { name: "소식통", avatar: getAvatar("소식통") }, choice: "YES", content: "@하입보이 어디서 들었어?? 소스좀!", likes: 5, createdAt: "20분 전" },
      { id: "1-2-r2", author: { name: "하입보이", avatar: getAvatar("하입보이") }, choice: "YES", content: "@소식통 트위터에서 봤어 ㅎㅎ", likes: 2, createdAt: "15분 전" },
      { id: "1-2-r3", author: { name: "트위터러", avatar: getAvatar("트위터러") }, choice: "YES", content: "나도 봤음! 신뢰도 높은 계정이던데", likes: 4, createdAt: "10분 전" },
      { id: "1-2-r4", author: { name: "팩트체커", avatar: getAvatar("팩트체커") }, content: "근데 공식은 아니잖아...", likes: 1, createdAt: "8분 전" },
    ] },
    { id: "1-3", author: { name: "내부정보긴", avatar: getAvatar("내부정보긴") }, choice: "NO", content: "감으로는 NO인데... 고민된다", likes: 4, createdAt: "15시간 전" },
    { id: "1-4", author: { name: "예측왕", avatar: getAvatar("예측왕") }, choice: "YES", content: "지금까지 내 예측 적중률 87%임. YES 간다", likes: 25, createdAt: "1시간 전", replies: [
      { id: "1-4-r1", author: { name: "통계러", avatar: getAvatar("통계러") }, choice: "YES", content: "와 87%면 대단한데?? 믿고 따라간다", likes: 8, createdAt: "50분 전" },
      { id: "1-4-r2", author: { name: "의심병", avatar: getAvatar("의심병") }, choice: "NO", content: "자칭 예측왕 너무 많아서...", likes: 3, createdAt: "45분 전" },
      { id: "1-4-r3", author: { name: "예측왕", avatar: getAvatar("예측왕") }, choice: "YES", content: "@의심병 내 프로필 보고 와 ㅋㅋ", likes: 5, createdAt: "40분 전" },
    ] },
    { id: "1-5", author: { name: "하이브워쳐", avatar: getAvatar("하이브워쳐") }, choice: "YES", content: "하이브 내부 분위기 좋다던데 컴백 준비 중인듯", likes: 18, createdAt: "2시간 전", replies: [
      { id: "1-5-r1", author: { name: "업계관계자", avatar: getAvatar("업계관계자") }, choice: "YES", content: "맞아요 저도 비슷한 얘기 들었어요", likes: 7, createdAt: "1시간 50분 전" },
      { id: "1-5-r2", author: { name: "팬계정", avatar: getAvatar("팬계정") }, choice: "YES", content: "제발 사실이길!!!", likes: 4, createdAt: "1시간 30분 전" },
    ] },
    { id: "1-6", author: { name: "냉정분석", avatar: getAvatar("냉정분석") }, choice: "NO", content: "솔직히 3월은 너무 빠름. 4월이나 5월이 현실적", likes: 9, createdAt: "3시간 전", replies: [
      { id: "1-6-r1", author: { name: "긍정이", avatar: getAvatar("긍정이") }, choice: "YES", content: "에이~ 그래도 가능성은 있지", likes: 2, createdAt: "2시간 50분 전" },
      { id: "1-6-r2", author: { name: "냉정분석", avatar: getAvatar("냉정분석") }, choice: "NO", content: "@긍정이 희망회로 돌리지 말고 객관적으로 봐", likes: 3, createdAt: "2시간 40분 전" },
      { id: "1-6-r3", author: { name: "중립파", avatar: getAvatar("중립파") }, content: "둘 다 일리 있음... 나도 고민중", likes: 5, createdAt: "2시간 30분 전" },
      { id: "1-6-r4", author: { name: "긍정이", avatar: getAvatar("긍정이") }, choice: "YES", content: "@냉정분석 그래도 난 믿어볼래!", likes: 1, createdAt: "2시간 20분 전" },
    ] },
    { id: "1-7", author: { name: "뮤비분석가", avatar: getAvatar("뮤비분석가") }, choice: "YES", content: "뮤비 촬영 목격담 있던데 진짜인듯", likes: 14, createdAt: "4시간 전" },
    { id: "1-8", author: { name: "올인러", avatar: getAvatar("올인러") }, choice: "YES", content: "포인트 다 걸었다 YES!!! 🔥🔥🔥", likes: 22, createdAt: "5시간 전", replies: [
      { id: "1-8-r1", author: { name: "겁쟁이", avatar: getAvatar("겁쟁이") }, choice: "YES", content: "와 용기 대단... 난 조금만", likes: 6, createdAt: "4시간 50분 전" },
      { id: "1-8-r2", author: { name: "도박꾼", avatar: getAvatar("도박꾼") }, choice: "YES", content: "나도 올인함 ㅋㅋㅋ 같이 가자!", likes: 8, createdAt: "4시간 40분 전" },
      { id: "1-8-r3", author: { name: "안전파", avatar: getAvatar("안전파") }, choice: "NO", content: "올인은 위험해... 분산투자 해야지", likes: 4, createdAt: "4시간 30분 전" },
    ] },
    { id: "1-9", author: { name: "하니팬", avatar: getAvatar("하니팬") }, choice: "YES", content: "하니 인스타 활동 많아진거 보면 뭔가 있음", likes: 11, createdAt: "6시간 전" },
    { id: "1-10", author: { name: "다니엘팬", avatar: getAvatar("다니엘팬") }, choice: "YES", content: "다니엘이 뭔가 암시했던거 같은데...", likes: 7, createdAt: "7시간 전", replies: [
      { id: "1-10-r1", author: { name: "해석가", avatar: getAvatar("해석가") }, choice: "YES", content: "어떤 암시?? 자세히 알려줘!", likes: 3, createdAt: "6시간 50분 전" },
      { id: "1-10-r2", author: { name: "다니엘팬", avatar: getAvatar("다니엘팬") }, choice: "YES", content: "@해석가 인스타 스토리에 음표 이모지 올렸음", likes: 5, createdAt: "6시간 40분 전" },
    ] },
    { id: "1-11", author: { name: "음악평론가", avatar: getAvatar("음악평론가") }, choice: "YES", content: "뉴진스 트렌드 분석하면 지금이 컴백 적기", likes: 16, createdAt: "8시간 전" },
    { id: "1-12", author: { name: "회의론자2", avatar: getAvatar("회의론자2") }, choice: "NO", content: "다들 YES만 하는거 보면 오히려 불안해짐", likes: 8, createdAt: "9시간 전", replies: [
      { id: "1-12-r1", author: { name: "역발상", avatar: getAvatar("역발상") }, choice: "NO", content: "@회의론자2 ㅇㅈ 대중의 반대로 가야 돈 번다", likes: 4, createdAt: "8시간 50분 전" },
      { id: "1-12-r2", author: { name: "그냥팬", avatar: getAvatar("그냥팬") }, choice: "YES", content: "에이 그건 너무 삐딱한 시각 아님?", likes: 2, createdAt: "8시간 40분 전" },
    ] },
    { id: "1-13", author: { name: "데이터맨", avatar: getAvatar("데이터맨") }, choice: "YES", content: "과거 데이터 분석 결과 3월 컴백 확률 73%", likes: 19, createdAt: "10시간 전" },
    { id: "1-14", author: { name: "직감파", avatar: getAvatar("직감파") }, choice: "NO", content: "뭔가 느낌이 NO야... 설명은 못하겠음", likes: 5, createdAt: "11시간 전" },
    { id: "1-15", author: { name: "초보예측러", avatar: getAvatar("초보예측러") }, content: "첫 예측인데 뭘 골라야 할지 모르겠어요 ㅠㅠ", likes: 3, createdAt: "12시간 전", replies: [
      { id: "1-15-r1", author: { name: "선배", avatar: getAvatar("선배") }, choice: "YES", content: "@초보예측러 처음엔 소액으로 연습해봐!", likes: 2, createdAt: "11시간 50분 전" },
      { id: "1-15-r2", author: { name: "꿀팁러", avatar: getAvatar("꿀팁러") }, choice: "YES", content: "댓글 분위기 보고 따라가도 됨 ㅎㅎ", likes: 1, createdAt: "11시간 40분 전" },
      { id: "1-15-r3", author: { name: "독립파", avatar: getAvatar("독립파") }, choice: "NO", content: "남 따라가지 말고 본인 판단으로!", likes: 3, createdAt: "11시간 30분 전" },
    ] },
  ],
  "2": [ // 로제 그래미
    { id: "2-0", author: { name: "spilltea 공식", avatar: getAvatar("spilltea 공식") }, content: "📢 로제의 그래미 수상 여부를 예측하는 마켓입니다. 시상식 결과 발표 후 판정됩니다.", likes: 32, createdAt: "3일 전", isAuthor: true },
    { id: "2-1", author: { name: "블핑러버", avatar: getAvatar("블핑러버") }, choice: "YES", content: "APT 대박이니까 가능성 있어!", likes: 8, createdAt: "5분 전", replies: [
      { id: "2-1-r1", author: { name: "그래미전문가", avatar: getAvatar("그래미전문가") }, choice: "YES", content: "@블핑러버 노미네이션만 해도 대단한거임", likes: 4, createdAt: "3분 전" },
    ] },
    { id: "2-2", author: { name: "현실주의자", avatar: getAvatar("현실주의자") }, choice: "NO", content: "그래미는 쉽지 않아...", likes: 3, createdAt: "1시간 전" },
  ],
  "3": [ // 화사 음방 1위
    { id: "3-0", author: { name: "spilltea 공식", avatar: getAvatar("spilltea 공식") }, content: "📢 화사의 신곡 음방 1위 달성 여부를 예측합니다.", likes: 28, createdAt: "2일 전", isAuthor: true },
    { id: "3-1", author: { name: "마마무팬", avatar: getAvatar("마마무팬") }, choice: "YES", content: "화사 신곡 너무 좋아 1위 각이다", likes: 15, createdAt: "방금", replies: [
      { id: "3-1-r1", author: { name: "음방러", avatar: getAvatar("음방러") }, choice: "YES", content: "@마마무팬 투표 열심히 하자!!", likes: 6, createdAt: "방금" },
    ] },
    { id: "3-2", author: { name: "차트분석가", avatar: getAvatar("차트분석가") }, choice: "YES", content: "음원 순위 보면 1위 가능", likes: 7, createdAt: "2시간 전" },
    { id: "3-3", author: { name: "회의론자", avatar: getAvatar("회의론자") }, choice: "NO", content: "경쟁이 치열해서 모르겠음", likes: 2, createdAt: "3시간 전" },
  ],
  "4": [ // 정국 신곡
    { id: "4-0", author: { name: "spilltea 공식", avatar: getAvatar("spilltea 공식") }, content: "📢 정국의 2026년 상반기 신곡 발매 여부를 예측합니다.", likes: 41, createdAt: "5일 전", isAuthor: true },
    { id: "4-1", author: { name: "아미", avatar: getAvatar("아미") }, choice: "YES", content: "정국이 뭔가 준비중인거 같아!", likes: 20, createdAt: "1시간 전" },
    { id: "4-2", author: { name: "군백기다림", avatar: getAvatar("군백기다림") }, choice: "NO", content: "군대 있는데 신곡이 나올까?", likes: 5, createdAt: "5시간 전" },
  ],
  "5": [ // 카리나 솔로
    { id: "5-0", author: { name: "spilltea 공식", avatar: getAvatar("spilltea 공식") }, content: "📢 에스파 카리나의 솔로 데뷔 여부를 예측합니다.", likes: 35, createdAt: "4일 전", isAuthor: true },
    { id: "5-1", author: { name: "마이즈", avatar: getAvatar("마이즈") }, choice: "NO", content: "에스파 그룹 활동이 먼저일듯", likes: 6, createdAt: "20분 전" },
    { id: "5-2", author: { name: "솔로기대", avatar: getAvatar("솔로기대") }, choice: "YES", content: "카리나 솔로 보고싶다ㅠㅠ", likes: 9, createdAt: "1시간 전" },
  ],
};

// Skeleton 컴포넌트
function CommentSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

export default function Sudabang() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { isExpanded, setIsExpanded, currentMarketId } = useSudabang();
  const pathname = usePathname();
  const [showGifPicker, setShowGifPicker] = useState(false);
  const [gifSearch, setGifSearch] = useState("");
  const [gifs, setGifs] = useState<GiphyGif[]>([]);
  const [isLoadingGifs, setIsLoadingGifs] = useState(false);
  const [gifOffset, setGifOffset] = useState(0);
  const [hasMoreGifs, setHasMoreGifs] = useState(true);
  const [isLoadingMoreGifs, setIsLoadingMoreGifs] = useState(false);
  const gifScrollRef = useRef<HTMLDivElement>(null);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inlineInputRef = useRef<HTMLTextAreaElement>(null);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);
  const [showCooldownToast, setShowCooldownToast] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ commentId: string; replyId?: string } | null>(null);

  // 토스트 자동 닫기
  useEffect(() => {
    if (!showCooldownToast) return;
    const t = setTimeout(() => setShowCooldownToast(false), 2000);
    return () => clearTimeout(t);
  }, [showCooldownToast]);

  // 마켓 ID가 변경될 때 해당 마켓의 댓글 로드
  useEffect(() => {
    if (!currentMarketId) {
      setComments([]);
      return;
    }

    setIsLoadingComments(true);
    // 실제 API 호출을 시뮬레이션 (300ms 딜레이)
    const timer = setTimeout(() => {
      const marketComments = commentsByMarket[currentMarketId] || [];
      // 댓글 정렬: 작성자 최상단 → 베팅금액/적중률/획득포인트 기반 스코어 순
      setComments(sortComments(marketComments));
      setIsLoadingComments(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentMarketId]);

  // Giphy API 검색 (초기 로드)
  const searchGifs = async (query: string) => {
    setIsLoadingGifs(true);
    setGifOffset(0);
    setHasMoreGifs(true);
    const limit = 12;

    try {
      const endpoint = query.trim()
        ? `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=${limit}&offset=0&rating=g`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=${limit}&offset=0&rating=g`;
      const res = await fetch(endpoint);
      const data = await res.json();
      const results = data.data || [];
      setGifs(results);
      setGifOffset(limit);
      if (results.length < limit) setHasMoreGifs(false);
    } catch (error) {
      console.error("Failed to fetch GIFs:", error);
    }
    setIsLoadingGifs(false);
  };

  // 무한 스크롤 추가 로드
  const loadMoreGifs = useCallback(async () => {
    if (isLoadingMoreGifs || !hasMoreGifs) return;
    setIsLoadingMoreGifs(true);
    const limit = 12;

    try {
      const endpoint = gifSearch.trim()
        ? `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${encodeURIComponent(gifSearch)}&limit=${limit}&offset=${gifOffset}&rating=g`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&limit=${limit}&offset=${gifOffset}&rating=g`;
      const res = await fetch(endpoint);
      const data = await res.json();
      const results = data.data || [];
      setGifs((prev) => [...prev, ...results]);
      setGifOffset((prev) => prev + limit);
      if (results.length < limit) setHasMoreGifs(false);
    } catch (error) {
      console.error("Failed to load more GIFs:", error);
    }
    setIsLoadingMoreGifs(false);
  }, [gifOffset, gifSearch, hasMoreGifs, isLoadingMoreGifs]);

  // GIF 팝업 열릴 때 트렌딩 로드
  useEffect(() => {
    if (showGifPicker) {
      searchGifs("");
    }
  }, [showGifPicker]);

  // GIF 선택 시 댓글로 추가
  const handleSelectGif = (gif: GiphyGif) => {
    if (cooldown > 0) {
      setShowCooldownToast(true);
      return;
    }
    const newGifComment: Comment = {
      id: Date.now().toString(),
      author: { name: "나", avatar: "😎" },
      content: "",
      image: gif.images.fixed_height.url,
      likes: 0,
      createdAt: "방금",
    };

    if (replyingTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo.id
            ? { ...c, replies: [...(c.replies || []), newGifComment] }
            : c
        )
      );
      setExpandedReplies((prev) => new Set(prev).add(replyingTo.id));
      setReplyingTo(null);
    } else {
      setComments([newGifComment, ...comments]);
    }
    setShowGifPicker(false);
    setGifSearch("");
    startCooldown();
  };

  // 쿨다운 시작 (3초)
  const startCooldown = () => {
    setCooldown(3);
    if (cooldownRef.current) clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!);
          cooldownRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // 댓글/답글 작성
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    if (cooldown > 0) {
      setShowCooldownToast(true);
      return;
    }

    const newEntry: Comment = {
      id: Date.now().toString(),
      author: { name: "나", avatar: "😎" },
      content: newComment,
      likes: 0,
      createdAt: "방금",
    };

    if (replyingTo) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo.id
            ? { ...c, replies: [...(c.replies || []), newEntry] }
            : c
        )
      );
      setExpandedReplies((prev) => new Set(prev).add(replyingTo.id));
      setReplyingTo(null);
    } else {
      setComments((prev) => [newEntry, ...prev]);
    }
    setNewComment("");
    if (inputRef.current) inputRef.current.style.height = "32px";
    startCooldown();
  };

  // 추천 페이지에서만 표시
  if (pathname !== "/") {
    return null;
  }

  const commentCount = comments.length;

  // 닫혔을 때: 아무것도 표시하지 않음 (헤더에 버튼 있음)
  if (!isExpanded) {
    return null;
  }

  // 열렸을 때: 전체 패널 표시
  return (
    <aside className="fixed right-0 top-0 z-50 hidden h-screen w-80 flex-col border-l border-zinc-200 bg-white/95 backdrop-blur-sm transition-all lg:flex dark:border-zinc-800 dark:bg-zinc-950/95">
      {/* 헤더 */}
      <div className="flex h-14 items-center justify-between border-b border-zinc-200 px-4 dark:border-zinc-800">
        <h2 className="font-cafe24 text-lg font-bold text-zinc-900 dark:text-white">
          수다방 <span style={{ color: "#4280FF" }}>{commentCount}</span>
        </h2>
        <button
          onClick={() => setIsExpanded(false)}
          className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.1719 2.17188C13.734 0.609778 16.266 0.609778 17.8281 2.17188C19.3899 3.734 19.3901 6.26613 17.8281 7.82812L15.6562 10L17.8281 12.1719C19.3899 13.734 19.3901 16.2661 17.8281 17.8281C16.2661 19.3901 13.734 19.3899 12.1719 17.8281L10 15.6562L7.82812 17.8281C6.26613 19.3901 3.734 19.3899 2.17188 17.8281C0.609778 16.266 0.609778 13.734 2.17188 12.1719L4.34375 10L2.17188 7.82812C0.609778 6.26603 0.609778 3.73397 2.17188 2.17188C3.73397 0.609778 6.26603 0.609778 7.82812 2.17188L10 4.34375L12.1719 2.17188Z" fill="#C1C0C9"/>
          </svg>
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className={`flex-1 overflow-y-auto p-4 ${comments.length === 0 && !isLoadingComments ? 'flex items-center justify-center' : ''}`}>
        {isLoadingComments ? (
          // Skeleton 로딩
          <div className="space-y-5">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        ) : comments.length === 0 ? (
          // 댓글 없음 - 중앙 배치
          <div className="flex flex-col items-center justify-center text-center">
            <span className="text-3xl mb-3">💬</span>
            <span className="text-base font-bold text-zinc-900 dark:text-white">아직 댓글이 없어요</span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">첫 번째로 의견을 남겨보세요!</span>
          </div>
        ) : (
          <div className="space-y-5">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex gap-3">
                {/* 아바타 */}
                <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* 이름 + YES/NO */}
                  <div className="flex items-center gap-[6px]">
                    {comment.isAuthor && (
                      <span className="text-[11px] font-bold text-white bg-blue-500 px-1.5 py-0.5 rounded">
                        📌 작성자
                      </span>
                    )}
                    <span className="font-cafe24 text-sm font-medium text-zinc-900 dark:text-white">
                      {comment.author.name}
                    </span>
                    {comment.choice && (
                      <span
                        className="font-cafe24 text-xs font-bold"
                        style={{ color: comment.choice === "YES" ? "#32B953" : "#FF2931" }}
                      >
                        {comment.choice}
                      </span>
                    )}
                  </div>

                  {/* 내용 */}
                  {comment.content && (
                    <p className="mt-1 text-sm text-black dark:text-zinc-300">
                      {comment.content}
                    </p>
                  )}

                  {/* 이미지 */}
                  {comment.image && (
                    <div className="mt-2 overflow-hidden rounded-lg" style={{ maxWidth: "180px" }}>
                      <img
                        src={comment.image}
                        alt=""
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}

                  {/* 하단: 시간, 답글, 좋아요 */}
                  <div className="mt-2 flex items-center gap-3 text-[13px] text-zinc-500 dark:text-zinc-400">
                    <span>{comment.createdAt}</span>
                    <button
                      className="hover:text-zinc-700 dark:hover:text-zinc-300"
                      onClick={() => {
                        setReplyingTo({ id: comment.id, name: comment.author.name });
                        setTimeout(() => inlineInputRef.current?.focus(), 50);
                      }}
                    >
                      답글
                    </button>
                    <button
                      className="flex items-center gap-1"
                      onClick={() => {
                        setLikedComments((prev) => {
                          const next = new Set(prev);
                          if (next.has(comment.id)) {
                            next.delete(comment.id);
                          } else {
                            next.add(comment.id);
                          }
                          return next;
                        });
                      }}
                    >
                      {likedComments.has(comment.id) ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF2931" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      )}
                      <span style={{ color: likedComments.has(comment.id) ? "#FF2931" : undefined }}>
                        {comment.likes + (likedComments.has(comment.id) ? 1 : 0)}
                      </span>
                    </button>
                    {comment.author.name === "나" && (
                      <button
                        className="hover:text-red-500"
                        onClick={() => setDeleteTarget({ commentId: comment.id })}
                      >
                        삭제
                      </button>
                    )}
                  </div>

                  {/* 답글 토글 버튼 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <button
                      className="mt-2 flex items-center gap-1 text-[13px] font-medium text-zinc-500 dark:text-zinc-400"
                      onClick={() => {
                        setExpandedReplies((prev) => {
                          const next = new Set(prev);
                          if (next.has(comment.id)) {
                            next.delete(comment.id);
                          } else {
                            next.add(comment.id);
                          }
                          return next;
                        });
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="currentColor"
                        style={{
                          transform: expandedReplies.has(comment.id) ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      >
                        <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {expandedReplies.has(comment.id)
                        ? `답글 숨기기`
                        : `답글 ${comment.replies.length}개 보기`}
                    </button>
                  )}
                </div>
              </div>

              {/* 답글 목록 (펼쳐진 경우) */}
              {expandedReplies.has(comment.id) && comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-3 space-y-3 border-l-2 border-zinc-100 pl-3 dark:border-zinc-800">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-2">
                      {/* 작은 아바타 */}
                      <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                        <img
                          src={reply.author.avatar}
                          alt={reply.author.name}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* 이름 + YES/NO */}
                        <div className="flex items-center gap-[6px]">
                          <span className="font-cafe24 text-sm font-medium text-zinc-900 dark:text-white">
                            {reply.author.name}
                          </span>
                          {reply.choice && (
                            <span
                              className="font-cafe24 text-xs font-bold"
                              style={{ color: reply.choice === "YES" ? "#32B953" : "#FF2931" }}
                            >
                              {reply.choice}
                            </span>
                          )}
                        </div>

                        {/* 내용 */}
                        {reply.content && (
                          <p className="mt-1 text-sm text-black dark:text-zinc-300">
                            {reply.content}
                          </p>
                        )}

                        {/* 하단: 시간, 답글, 좋아요 */}
                        <div className="mt-2 flex items-center gap-3 text-[13px] text-zinc-500 dark:text-zinc-400">
                          <span>{reply.createdAt}</span>
                          <button
                            className="hover:text-zinc-700 dark:hover:text-zinc-300"
                            onClick={() => {
                              setReplyingTo({ id: comment.id, name: reply.author.name });
                              setTimeout(() => inlineInputRef.current?.focus(), 50);
                            }}
                          >
                            답글
                          </button>
                          <button
                            className="flex items-center gap-1"
                            onClick={() => {
                              setLikedComments((prev) => {
                                const next = new Set(prev);
                                if (next.has(reply.id)) {
                                  next.delete(reply.id);
                                } else {
                                  next.add(reply.id);
                                }
                                return next;
                              });
                            }}
                          >
                            {likedComments.has(reply.id) ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="#FF2931" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </svg>
                            )}
                            <span style={{ color: likedComments.has(reply.id) ? "#FF2931" : undefined }}>
                              {reply.likes + (likedComments.has(reply.id) ? 1 : 0)}
                            </span>
                          </button>
                          {reply.author.name === "나" && (
                            <button
                              className="hover:text-red-500"
                              onClick={() => setDeleteTarget({ commentId: comment.id, replyId: reply.id })}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 인라인 답글 입력창 */}
              {replyingTo?.id === comment.id && (
                <div className="ml-8 mt-3 pl-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm overflow-hidden">
                      😎
                    </div>
                    <div
                      className="flex flex-1 items-center rounded-[18px]"
                      style={{
                        minHeight: "36px",
                        border: "1px dashed black",
                        backgroundColor: "white",
                        paddingLeft: "12px",
                        paddingRight: "4px",
                        paddingTop: "3px",
                        paddingBottom: "3px",
                        gap: "6px",
                      }}
                    >
                      <textarea
                        ref={inlineInputRef}
                        value={newComment}
                        onChange={(e) => {
                          setNewComment(e.target.value);
                          e.target.style.height = "28px";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && newComment.trim()) {
                            e.preventDefault();
                            handleSubmitComment();
                          }
                          if (e.key === "Escape") {
                            setReplyingTo(null);
                            setNewComment("");
                          }
                        }}
                        placeholder={`@${replyingTo.name}에게 답글...`}
                        rows={1}
                        className="flex-1 min-w-0 bg-transparent text-sm placeholder-zinc-400 focus:outline-none resize-none"
                        style={{ height: "28px", maxHeight: "72px", lineHeight: "18px", padding: "5px 0", overflow: "hidden" }}
                      />
                      <button
                        onClick={handleSubmitComment}
                        className="flex shrink-0 items-center justify-center rounded-full transition-all"
                        style={{
                          width: "26px",
                          height: "26px",
                          background: newComment.trim()
                            ? "linear-gradient(135deg, #4280FF, #3D24FF)"
                            : "#D1D5DB",
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setNewComment("");
                      }}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
                      style={{ marginRight: "4px" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        )}
      </div>

      {/* GIF 선택 팝업 */}
      {showGifPicker && (
        <div className="absolute bottom-24 left-4 right-4 z-10 rounded-xl bg-white shadow-xl border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-700">
          {/* 검색창 */}
          <div className="p-3 border-b border-zinc-200 dark:border-zinc-700">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchGifs(gifSearch)}
                placeholder="GIF 검색..."
                className="flex-1 border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm placeholder-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800"
                style={{ borderRadius: "12px" }}
                onFocus={(e) => (e.target.style.borderColor = "#4280FF")}
                onBlur={(e) => (e.target.style.borderColor = "")}
                autoFocus
              />
              <button
                onClick={() => searchGifs(gifSearch)}
                className="font-cafe24 px-3 py-2 text-sm text-white hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #4280FF, #3D24FF)",
                  boxShadow: "inset 0 0 0 1px #3252EB",
                  borderRadius: "12px",
                }}
              >
                검색
              </button>
              <button
                onClick={() => setShowGifPicker(false)}
                className="text-zinc-500 hover:text-zinc-700"
              >
                ✕
              </button>
            </div>
          </div>

          {/* GIF 그리드 */}
          <div
            ref={gifScrollRef}
            className="p-2 max-h-64 overflow-y-auto"
            onScroll={(e) => {
              const el = e.currentTarget;
              if (el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
                loadMoreGifs();
              }
            }}
          >
            {isLoadingGifs ? (
              <div className="flex items-center justify-center py-8 text-zinc-500">
                로딩 중...
              </div>
            ) : gifs.length === 0 ? (
              <div className="flex items-center justify-center py-8 text-zinc-500">
                검색 결과가 없습니다
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-1">
                  {gifs.map((gif) => (
                    <button
                      key={gif.id}
                      onClick={() => handleSelectGif(gif)}
                      className="overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={gif.images.fixed_height_small.url}
                        alt={gif.title}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
                {isLoadingMoreGifs && (
                  <div className="flex items-center justify-center py-3 text-xs text-zinc-400">
                    로딩 중...
                  </div>
                )}
              </>
            )}
          </div>

          {/* Giphy 로고 */}
          <div className="p-2 border-t border-zinc-200 dark:border-zinc-700 text-center">
            <span className="text-xs text-zinc-400">Powered by GIPHY</span>
          </div>
        </div>
      )}

      {/* 입력창 (답글 모드가 아닐 때만 표시 — 답글은 인라인 입력 사용) */}
      {!replyingTo && (
        <div className="px-4 py-3" style={{ background: "linear-gradient(to top, #B1BFFF, #FFFFFF)" }}>
          <div className="flex items-center gap-2">
            {/* 프로필 */}
            <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-lg overflow-hidden">
              😎
            </div>
            {/* 코멘트 박스 */}
            <div
              className="flex flex-1 items-center rounded-[21px]"
              style={{
                minHeight: "42px",
                border: "1px dashed black",
                backgroundColor: "white",
                paddingLeft: "16px",
                paddingRight: "4px",
                paddingTop: "4px",
                paddingBottom: "4px",
                gap: "8px",
              }}
            >
              <textarea
                ref={inputRef}
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                  e.target.style.height = "32px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && newComment.trim()) {
                    e.preventDefault();
                    handleSubmitComment();
                  }
                }}
                placeholder="말 한마디..."
                rows={1}
                className="flex-1 min-w-0 bg-transparent text-sm placeholder-zinc-400 focus:outline-none resize-none"
                style={{ height: "32px", maxHeight: "90px", lineHeight: "20px", padding: "6px 0", overflow: "hidden" }}
              />
              <div className="flex shrink-0 items-center" style={{ gap: "8px", height: "30px" }}>
                <button
                  onClick={() => setShowGifPicker(!showGifPicker)}
                  className="font-cafe24 shrink-0 text-sm font-bold text-zinc-400 hover:opacity-70"
                >
                  GIF
                </button>
                <button
                  onClick={handleSubmitComment}
                  className="flex shrink-0 items-center justify-center rounded-full transition-all"
                  style={{
                    width: "30px",
                    height: "30px",
                    background: newComment.trim()
                      ? "linear-gradient(135deg, #4280FF, #3D24FF)"
                      : "#D1D5DB",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 쿨다운 토스트 */}
      <AnimatePresence>
        {showCooldownToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-32 left-1/2 -translate-x-1/2 rounded-full bg-zinc-800 px-4 py-2 text-xs text-white shadow-lg whitespace-nowrap"
          >
            잠시 후에 다시 남겨주세요
          </motion.div>
        )}
      </AnimatePresence>

      {/* 삭제 확인 모달 */}
      <AnimatePresence>
        {deleteTarget && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40"
            onClick={() => setDeleteTarget(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="mx-6 w-full max-w-[240px] rounded-2xl bg-white p-5 shadow-xl dark:bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-center text-sm font-medium text-zinc-900 dark:text-white">
                정말 삭제할까요?
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="flex-1 rounded-xl py-2 text-sm font-medium text-zinc-600 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    if (deleteTarget.replyId) {
                      setComments((prev) =>
                        prev.map((c) =>
                          c.id === deleteTarget.commentId
                            ? { ...c, replies: (c.replies || []).filter((r) => r.id !== deleteTarget.replyId) }
                            : c
                        )
                      );
                    } else {
                      setComments((prev) => prev.filter((c) => c.id !== deleteTarget.commentId));
                    }
                    setDeleteTarget(null);
                  }}
                  className="flex-1 rounded-xl py-2 text-sm font-medium text-white"
                  style={{ background: "#FF2931" }}
                >
                  삭제
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
}
