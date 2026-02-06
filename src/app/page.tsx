"use client";

import { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence, useAnimate } from "framer-motion";
import Link from "next/link";
import { useSudabang } from "@/contexts/SudabangContext";

// D-day를 한글 마감 형식으로 변환
function formatDeadline(dDay: number): string {
  if (dDay === 0) return "오늘 마감";
  if (dDay === 1) return "내일 마감";
  if (dDay <= 7) return `${dDay}일 후 마감`;
  if (dDay <= 14) return "1주 후 마감";
  if (dDay <= 21) return "2주 후 마감";
  if (dDay <= 30) return "3주 후 마감";
  if (dDay <= 60) return "1개월 후 마감";
  if (dDay <= 90) return "2개월 후 마감";
  return "3개월 후 마감";
}

// 샘플 예측 마켓 데이터 (매일 20개)
const initialMarkets = [
  {
    id: "1",
    question: "뉴진스, 3월 안에 컴백할까?",
    artistName: "NewJeans",
    imageUrl: "/images/artists/newjeans.jpg",
    noPercent: 95,
    yesPercent: 5,
    dDay: 60,
    totalPoints: 500,
    participants: 128,
    summary: "이 예측은 뉴진스가 2026년 3월 안에 공식적으로 컴백하는지에 대한 질문입니다.",
    yesCriteria: "공식 음원 / 앨범 / 디지털 싱글 발매",
    noCriteria: "위 조건에 해당하는 컴백이 없는 경우",
    judgmentBasis: ["소속사 공식 공지", "음원 플랫폼 발매 기록", "뉴진스 공식 SNS", "유튜브"],
    disclaimer: "루머, 기사 추측, 비공식 스포는 포함되지 않아요.",
    startDate: "2026.01.15",
    endDate: "2026.03.31",
    resultDate: "2026.04.01",
    trendData: [45, 52, 48, 55, 60, 58, 65, 70, 85, 95],
  },
  {
    id: "2",
    question: "블랙핑크 로제, 그래미 수상할까?",
    artistName: "BLACKPINK Rosé",
    imageUrl: "/images/artists/rose.jpg",
    noPercent: 55,
    yesPercent: 45,
    dDay: 30,
    totalPoints: 320,
    participants: 89,
    summary: "이 예측은 로제가 2026년 그래미 어워드에서 수상하는지에 대한 질문입니다.",
    yesCriteria: "그래미 어워드 본상 또는 부문상 수상",
    noCriteria: "수상하지 못한 경우",
    judgmentBasis: ["그래미 어워드 공식 발표"],
    disclaimer: "노미네이션만으로는 YES 조건을 충족하지 않아요.",
    startDate: "2026.01.01",
    endDate: "2026.02.28",
    resultDate: "2026.03.01",
    trendData: [50, 48, 52, 47, 45, 43, 46, 44, 45, 45],
  },
  {
    id: "3",
    question: "화사, 이번 주 음방 1위 할까?",
    artistName: "Hwasa",
    imageUrl: "/images/artists/hwasa.jpg",
    noPercent: 22,
    yesPercent: 78,
    dDay: 5,
    totalPoints: 180,
    participants: 56,
    summary: "이 예측은 화사가 이번 주 음악방송에서 1위를 차지하는지에 대한 질문입니다.",
    yesCriteria: "주요 음악방송(뮤뱅, 음중, 인기가요 등) 중 1개 이상 1위",
    noCriteria: "1위를 하지 못한 경우",
    judgmentBasis: ["각 음악방송 공식 순위 발표"],
    disclaimer: "실시간 차트 순위와 다를 수 있어요.",
    startDate: "2026.02.01",
    endDate: "2026.02.09",
    resultDate: "2026.02.10",
    trendData: [60, 65, 70, 72, 75, 74, 76, 78, 77, 78],
  },
  {
    id: "4",
    question: "BTS 정국, 3월 내 신곡 발매할까?",
    artistName: "BTS Jungkook",
    imageUrl: "/images/artists/jungkook.jpg",
    noPercent: 44,
    yesPercent: 56,
    dDay: 90,
    totalPoints: 450,
    participants: 234,
    summary: "이 예측은 정국이 2026년 3월 내에 솔로 신곡을 발매하는지에 대한 질문입니다.",
    yesCriteria: "공식 솔로 음원 발매 (피처링 제외)",
    noCriteria: "신곡 발매가 없는 경우",
    judgmentBasis: ["빅히트 공식 공지", "음원 플랫폼 발매 기록"],
    disclaimer: "군 복무 중 발매되는 미공개 곡은 포함됩니다.",
    startDate: "2026.01.20",
    endDate: "2026.03.31",
    resultDate: "2026.04.01",
    trendData: [50, 52, 54, 53, 55, 56, 54, 55, 56, 56],
  },
  {
    id: "5",
    question: "에스파 카리나, 솔로 데뷔할까?",
    artistName: "aespa Karina",
    imageUrl: "/images/artists/karina.jpg",
    noPercent: 66,
    yesPercent: 34,
    dDay: 45,
    totalPoints: 280,
    participants: 145,
    summary: "이 예측은 카리나가 2026년 상반기 내 솔로 데뷔하는지에 대한 질문입니다.",
    yesCriteria: "공식 솔로 앨범 또는 싱글 발매",
    noCriteria: "솔로 데뷔가 없는 경우",
    judgmentBasis: ["SM 엔터테인먼트 공식 발표", "음원 플랫폼"],
    disclaimer: "OST 참여는 솔로 데뷔로 인정되지 않아요.",
    startDate: "2026.01.10",
    endDate: "2026.06.30",
    resultDate: "2026.07.01",
    trendData: [40, 38, 35, 36, 34, 33, 35, 34, 34, 34],
  },
  {
    id: "6",
    question: "아이브, 다음 앨범 밀리언셀러 달성할까?",
    artistName: "IVE",
    imageUrl: "/images/artists/ive.jpg",
    noPercent: 15,
    yesPercent: 85,
    dDay: 40,
    totalPoints: 620,
    participants: 312,
    summary: "아이브의 다음 정규/미니 앨범이 밀리언셀러를 달성하는지에 대한 예측입니다.",
    yesCriteria: "초동 또는 누적 판매량 100만 장 이상",
    noCriteria: "100만 장 미달",
    judgmentBasis: ["한터차트", "써클차트 공식 집계"],
    disclaimer: "키트앨범, 플랫폼앨범 포함 집계됩니다.",
    startDate: "2026.01.20",
    endDate: "2026.04.30",
    resultDate: "2026.05.01",
    trendData: [80, 82, 83, 84, 85, 84, 85, 86, 85, 85],
  },
  {
    id: "7",
    question: "세븐틴, 월드투어 100만 관객 돌파할까?",
    artistName: "SEVENTEEN",
    imageUrl: "/images/artists/seventeen.jpg",
    noPercent: 20,
    yesPercent: 80,
    dDay: 120,
    totalPoints: 890,
    participants: 456,
    summary: "세븐틴 2026 월드투어 누적 관객수가 100만 명을 돌파하는지 예측합니다.",
    yesCriteria: "공식 발표 누적 관객수 100만 명 이상",
    noCriteria: "100만 명 미달",
    judgmentBasis: ["플레디스 공식 발표", "공연 기획사 발표"],
    disclaimer: "온라인 동시 시청자 수는 포함되지 않습니다.",
    startDate: "2026.01.01",
    endDate: "2026.12.31",
    resultDate: "2027.01.05",
    trendData: [75, 76, 78, 77, 79, 80, 79, 80, 80, 80],
  },
  {
    id: "8",
    question: "르세라핌, 빌보드 HOT 100 진입할까?",
    artistName: "LE SSERAFIM",
    imageUrl: "/images/artists/lesserafim.jpg",
    noPercent: 42,
    yesPercent: 58,
    dDay: 35,
    totalPoints: 340,
    participants: 178,
    summary: "르세라핌의 다음 타이틀곡이 빌보드 HOT 100에 진입하는지 예측합니다.",
    yesCriteria: "빌보드 HOT 100 차트 100위 이내 진입",
    noCriteria: "차트 진입 실패",
    judgmentBasis: ["빌보드 공식 차트"],
    disclaimer: "차트 진입 순위와 관계없이 100위 이내면 YES입니다.",
    startDate: "2026.02.01",
    endDate: "2026.04.15",
    resultDate: "2026.04.16",
    trendData: [55, 54, 56, 57, 58, 57, 58, 59, 58, 58],
  },
  {
    id: "9",
    question: "스트레이키즈, 그래미 후보 지명될까?",
    artistName: "Stray Kids",
    imageUrl: "/images/artists/straykids.jpg",
    noPercent: 60,
    yesPercent: 40,
    dDay: 250,
    totalPoints: 560,
    participants: 289,
    summary: "스트레이키즈가 2027 그래미 어워드 후보에 지명되는지 예측합니다.",
    yesCriteria: "그래미 어워드 어떤 부문이든 후보 지명",
    noCriteria: "후보 지명 실패",
    judgmentBasis: ["그래미 어워드 공식 발표"],
    disclaimer: "수상 여부와 관계없이 후보 지명만으로 YES입니다.",
    startDate: "2026.01.01",
    endDate: "2026.11.15",
    resultDate: "2026.11.16",
    trendData: [35, 36, 38, 39, 40, 39, 40, 41, 40, 40],
  },
  {
    id: "10",
    question: "임영웅, 멜론 연간차트 1위 할까?",
    artistName: "임영웅",
    imageUrl: "/images/artists/imyoungwoong.jpg",
    noPercent: 25,
    yesPercent: 75,
    dDay: 300,
    totalPoints: 720,
    participants: 534,
    summary: "임영웅이 2026년 멜론 연간차트 1위를 차지하는지 예측합니다.",
    yesCriteria: "멜론 2026 연간차트 1위",
    noCriteria: "1위 달성 실패",
    judgmentBasis: ["멜론 공식 연간차트"],
    disclaimer: "일간/주간/월간 차트와 다를 수 있습니다.",
    startDate: "2026.01.01",
    endDate: "2026.12.31",
    resultDate: "2027.01.05",
    trendData: [70, 72, 73, 74, 75, 74, 75, 76, 75, 75],
  },
  {
    id: "11",
    question: "엔믹스, 음방 트리플 크라운 달성할까?",
    artistName: "NMIXX",
    imageUrl: "/images/artists/nmixx.jpg",
    noPercent: 38,
    yesPercent: 62,
    dDay: 14,
    totalPoints: 210,
    participants: 98,
    summary: "엔믹스가 이번 컴백으로 음악방송 트리플 크라운을 달성하는지 예측합니다.",
    yesCriteria: "동일 곡으로 같은 음악방송 3회 연속 1위",
    noCriteria: "트리플 크라운 미달성",
    judgmentBasis: ["각 음악방송 공식 발표"],
    disclaimer: "다른 음악방송 1위는 포함되지 않습니다.",
    startDate: "2026.02.01",
    endDate: "2026.03.15",
    resultDate: "2026.03.16",
    trendData: [58, 59, 60, 61, 62, 61, 62, 63, 62, 62],
  },
  {
    id: "12",
    question: "NCT 드림, 정규 3집 더블 밀리언 달성할까?",
    artistName: "NCT DREAM",
    imageUrl: "/images/artists/nctdream.jpg",
    noPercent: 30,
    yesPercent: 70,
    dDay: 50,
    totalPoints: 480,
    participants: 267,
    summary: "NCT 드림 정규 3집이 초동 200만 장을 돌파하는지 예측합니다.",
    yesCriteria: "초동 판매량 200만 장 이상",
    noCriteria: "200만 장 미달",
    judgmentBasis: ["한터차트 초동 집계"],
    disclaimer: "발매 첫 주(7일) 판매량 기준입니다.",
    startDate: "2026.01.25",
    endDate: "2026.04.10",
    resultDate: "2026.04.11",
    trendData: [65, 66, 68, 69, 70, 69, 70, 71, 70, 70],
  },
  {
    id: "13",
    question: "있지 류진, 솔로 데뷔할까?",
    artistName: "ITZY Ryujin",
    imageUrl: "/images/artists/ryujin.jpg",
    noPercent: 55,
    yesPercent: 45,
    dDay: 180,
    totalPoints: 320,
    participants: 156,
    summary: "류진이 2026년 내 솔로 데뷔하는지 예측합니다.",
    yesCriteria: "공식 솔로 앨범/싱글 발매",
    noCriteria: "솔로 데뷔 없음",
    judgmentBasis: ["JYP 공식 발표", "음원 플랫폼"],
    disclaimer: "유닛 활동은 솔로로 인정되지 않습니다.",
    startDate: "2026.01.01",
    endDate: "2026.12.31",
    resultDate: "2027.01.01",
    trendData: [42, 43, 44, 45, 45, 44, 45, 46, 45, 45],
  },
  {
    id: "14",
    question: "투모로우바이투게더, 빌보드 200 1위 할까?",
    artistName: "TXT",
    imageUrl: "/images/artists/txt.jpg",
    noPercent: 35,
    yesPercent: 65,
    dDay: 60,
    totalPoints: 410,
    participants: 198,
    summary: "TXT의 다음 앨범이 빌보드 200 차트 1위를 달성하는지 예측합니다.",
    yesCriteria: "빌보드 200 차트 1위 달성",
    noCriteria: "1위 달성 실패",
    judgmentBasis: ["빌보드 공식 차트"],
    disclaimer: "진입 순위가 아닌 최고 순위 기준입니다.",
    startDate: "2026.02.01",
    endDate: "2026.05.30",
    resultDate: "2026.05.31",
    trendData: [60, 61, 63, 64, 65, 64, 65, 66, 65, 65],
  },
  {
    id: "15",
    question: "블랙핑크, 2026년 완전체 컴백할까?",
    artistName: "BLACKPINK",
    imageUrl: "/images/artists/blackpink.jpg",
    noPercent: 48,
    yesPercent: 52,
    dDay: 200,
    totalPoints: 980,
    participants: 678,
    summary: "블랙핑크 4인 완전체가 2026년 내 컴백하는지 예측합니다.",
    yesCriteria: "4인 완전체 신곡 발매",
    noCriteria: "완전체 컴백 없음",
    judgmentBasis: ["YG 공식 발표", "음원 플랫폼 발매"],
    disclaimer: "솔로/유닛 활동은 포함되지 않습니다.",
    startDate: "2026.01.01",
    endDate: "2026.12.31",
    resultDate: "2027.01.01",
    trendData: [50, 51, 52, 51, 52, 53, 52, 52, 52, 52],
  },
  {
    id: "16",
    question: "아이유, 연기대상 대상 수상할까?",
    artistName: "IU",
    imageUrl: "/images/artists/iu.jpg",
    noPercent: 40,
    yesPercent: 60,
    dDay: 320,
    totalPoints: 540,
    participants: 345,
    summary: "아이유가 2026년 연기대상에서 대상을 수상하는지 예측합니다.",
    yesCriteria: "3사 연기대상 중 대상 수상",
    noCriteria: "대상 수상 실패",
    judgmentBasis: ["KBS/MBC/SBS 연기대상 시상식"],
    disclaimer: "우수상, 최우수상 등은 포함되지 않습니다.",
    startDate: "2026.01.01",
    endDate: "2026.12.30",
    resultDate: "2026.12.31",
    trendData: [55, 56, 58, 59, 60, 59, 60, 61, 60, 60],
  },
  {
    id: "17",
    question: "보이넥스트도어, 음원차트 1위 할까?",
    artistName: "BOYNEXTDOOR",
    imageUrl: "/images/artists/boynextdoor.jpg",
    noPercent: 52,
    yesPercent: 48,
    dDay: 25,
    totalPoints: 190,
    participants: 87,
    summary: "보이넥스트도어가 다음 컴백으로 음원차트 1위를 달성하는지 예측합니다.",
    yesCriteria: "멜론/지니/벅스 중 1개 이상 실시간 1위",
    noCriteria: "1위 달성 실패",
    judgmentBasis: ["각 음원 플랫폼 실시간 차트"],
    disclaimer: "일간/주간 차트가 아닌 실시간 차트 기준입니다.",
    startDate: "2026.02.01",
    endDate: "2026.03.20",
    resultDate: "2026.03.21",
    trendData: [45, 46, 47, 48, 48, 47, 48, 49, 48, 48],
  },
  {
    id: "18",
    question: "키, 솔로 콘서트 전석 매진할까?",
    artistName: "SHINee Key",
    imageUrl: "/images/artists/key.jpg",
    noPercent: 18,
    yesPercent: 82,
    dDay: 20,
    totalPoints: 260,
    participants: 134,
    summary: "키의 2026 솔로 콘서트가 전석 매진되는지 예측합니다.",
    yesCriteria: "전 회차 전석 매진",
    noCriteria: "잔여석 발생",
    judgmentBasis: ["티켓 예매 사이트 공식 발표"],
    disclaimer: "취소표 재판매는 포함되지 않습니다.",
    startDate: "2026.02.01",
    endDate: "2026.03.10",
    resultDate: "2026.03.11",
    trendData: [78, 79, 80, 81, 82, 81, 82, 83, 82, 82],
  },
  {
    id: "19",
    question: "에이티즈, 빌보드 글로벌 1위 할까?",
    artistName: "ATEEZ",
    imageUrl: "/images/artists/ateez.jpg",
    noPercent: 45,
    yesPercent: 55,
    dDay: 45,
    totalPoints: 380,
    participants: 201,
    summary: "에이티즈의 다음 앨범 타이틀곡이 빌보드 글로벌 200 1위를 달성하는지 예측합니다.",
    yesCriteria: "빌보드 글로벌 200 1위",
    noCriteria: "1위 달성 실패",
    judgmentBasis: ["빌보드 공식 차트"],
    disclaimer: "글로벌 Excl. US 차트와 다릅니다.",
    startDate: "2026.02.01",
    endDate: "2026.04.30",
    resultDate: "2026.05.01",
    trendData: [52, 53, 54, 55, 55, 54, 55, 56, 55, 55],
  },
  {
    id: "20",
    question: "더 글로리 시즌2, 넷플릭스 글로벌 1위 할까?",
    artistName: "The Glory",
    imageUrl: "/images/artists/theglory.jpg",
    noPercent: 28,
    yesPercent: 72,
    dDay: 90,
    totalPoints: 650,
    participants: 412,
    summary: "더 글로리 시즌2가 넷플릭스 글로벌 TV 부문 1위를 달성하는지 예측합니다.",
    yesCriteria: "넷플릭스 글로벌 TOP 10 TV 부문 1위",
    noCriteria: "1위 달성 실패",
    judgmentBasis: ["넷플릭스 공식 TOP 10 차트"],
    disclaimer: "한국 차트가 아닌 글로벌 차트 기준입니다.",
    startDate: "2026.02.01",
    endDate: "2026.06.30",
    resultDate: "2026.07.01",
    trendData: [68, 69, 70, 71, 72, 71, 72, 73, 72, 72],
  },
];

interface SwipeCardProps {
  market: typeof initialMarkets[0];
  onSwipe: (direction: "left" | "right", id: string) => void;
  onSkip?: () => void;
  onDragDirection?: (direction: "left" | "right" | null) => void;
  isTop: boolean;
}

export interface SwipeCardRef {
  triggerSwipe: (direction: "left" | "right") => void;
  triggerSkip: () => void;
  openDetail: () => void;
  closeDetail: () => void;
}

// 드래그 강도에 따른 피드백 메시지
const getSwipeFeedback = (intensity: number, percent: number, isYes: boolean) => {
  const absIntensity = Math.abs(intensity);
  if (absIntensity < 60) {
    // 살짝 + 중간
    return percent > 50 ? "분위기상 이쪽" : "소신 있는 선택";
  } else {
    // 많이 + 확정
    return percent > 50 ? "확신에 찬 선택!" : "이 선택... 용기 있다";
  }
};

const SwipeCard = forwardRef<SwipeCardRef, SwipeCardProps>(({ market, onSwipe, onSkip, onDragDirection, isTop }, ref) => {
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [scope, animate] = useAnimate();
  const swipedRef = useRef(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const [dragIntensity, setDragIntensity] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -100, 0, 100, 300], [0, 1, 1, 1, 0]);

  const yesOpacity = useTransform(x, [0, 50, 100], [0, 0.8, 1]);
  const noOpacity = useTransform(x, [-100, -50, 0], [1, 0.8, 0]);

  // 드래그 방향 및 강도 추적 (스와이프 완료 후에는 무시)
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (swipedRef.current) return;
      setDragIntensity(latest);
      if (latest > 3) {
        onDragDirection?.("right");
      } else if (latest < -3) {
        onDragDirection?.("left");
      } else {
        onDragDirection?.(null);
      }
    });
    return () => unsubscribe();
  }, [x, onDragDirection]);

  // 프로그래밍 방식으로 스와이프/스킵 트리거
  useImperativeHandle(ref, () => ({
    triggerSwipe: async (direction: "left" | "right") => {
      swipedRef.current = true;
      onDragDirection?.(null);
      const targetX = direction === "right" ? 500 : -500;
      await animate(scope.current, { x: targetX, rotate: direction === "right" ? 15 : -15, opacity: 0 }, { duration: 0.55, ease: "easeOut" });
      setExitDirection(direction);
      onSwipe(direction, market.id);
    },
    triggerSkip: async () => {
      swipedRef.current = true;
      onDragDirection?.(null);
      await animate(scope.current, { y: -600, scale: 0.8, opacity: 0 }, { duration: 0.4, ease: "easeOut" });
      onSkip?.();
    },
    openDetail: () => setShowDetail(true),
    closeDetail: () => setShowDetail(false),
  }), [animate, scope, market.id, onSwipe, onSkip, onDragDirection]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (showDetail) return; // 상세 열려 있으면 스와이프 무시
    const threshold = 100;
    if (info.offset.x > threshold) {
      swipedRef.current = true;
      onDragDirection?.(null);
      setExitDirection("right");
      onSwipe("right", market.id);
    } else if (info.offset.x < -threshold) {
      swipedRef.current = true;
      onDragDirection?.(null);
      setExitDirection("left");
      onSwipe("left", market.id);
    }
  };

  // 인터랙티브 라인 그래프 렌더링
  const renderTrendGraph = () => {
    const yesData = market.trendData || [];
    const noData = yesData.map(v => 100 - v);
    const dates = ["1/28", "1/29", "1/30", "1/31", "2/1", "2/2", "2/3", "2/4", "2/5", "2/6"];

    const width = 300;
    const height = 120;
    const padding = { top: 10, right: 10, bottom: 20, left: 30 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Y축 0-100% 고정
    const getY = (value: number) => padding.top + chartHeight - (value / 100) * chartHeight;
    const getX = (index: number) => padding.left + (index / (yesData.length - 1)) * chartWidth;

    // 라인 path 생성
    const createPath = (data: number[]) => {
      return data.map((value, i) => {
        const x = getX(i);
        const y = getY(value);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      }).join(" ");
    };

    const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
      if (!chartRef.current) return;
      const rect = chartRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - padding.left;
      const index = Math.round((x / chartWidth) * (yesData.length - 1));
      if (index >= 0 && index < yesData.length) {
        setHoveredIndex(index);
      }
    };

    const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
      if (!chartRef.current) return;
      const rect = chartRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left - padding.left;
      const index = Math.round((x / chartWidth) * (yesData.length - 1));
      if (index >= 0 && index < yesData.length) {
        setHoveredIndex(index);
      }
    };

    return (
      <div className="relative">
        <svg
          ref={chartRef}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setHoveredIndex(null)}
          className="cursor-crosshair"
        >
          {/* 그리드 라인 */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1={padding.left}
                y1={getY(value)}
                x2={width - padding.right}
                y2={getY(value)}
                stroke="rgba(255,255,255,0.1)"
                strokeDasharray="2,2"
              />
              <text
                x={padding.left - 5}
                y={getY(value)}
                fill="rgba(255,255,255,0.4)"
                fontSize="9"
                textAnchor="end"
                dominantBaseline="middle"
              >
                {value}%
              </text>
            </g>
          ))}

          {/* NO 라인 (빨간색) */}
          <path
            d={createPath(noData)}
            fill="none"
            stroke="#FF2931"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* YES 라인 (초록색) */}
          <path
            d={createPath(yesData)}
            fill="none"
            stroke="#32B953"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 호버 시 수직선 & 점 */}
          {hoveredIndex !== null && (
            <>
              <line
                x1={getX(hoveredIndex)}
                y1={padding.top}
                x2={getX(hoveredIndex)}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              {/* YES 점 */}
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(yesData[hoveredIndex])}
                r="5"
                fill="#32B953"
                stroke="white"
                strokeWidth="2"
              />
              {/* NO 점 */}
              <circle
                cx={getX(hoveredIndex)}
                cy={getY(noData[hoveredIndex])}
                r="5"
                fill="#FF2931"
                stroke="white"
                strokeWidth="2"
              />
            </>
          )}

          {/* X축 날짜 (처음, 중간, 끝) */}
          {[0, Math.floor(yesData.length / 2), yesData.length - 1].map((i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - 5}
              fill="rgba(255,255,255,0.4)"
              fontSize="9"
              textAnchor="middle"
            >
              {dates[i]}
            </text>
          ))}
        </svg>

        {/* 호버 툴팁 */}
        {hoveredIndex !== null && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${((hoveredIndex / (yesData.length - 1)) * 100)}%`,
              top: "-8px",
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="backdrop-blur-md text-center whitespace-nowrap"
              style={{
                background: "rgba(0,0,0,0.8)",
                borderRadius: "8px",
                padding: "6px 10px",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div className="text-[10px] text-white/60 mb-1">{dates[hoveredIndex]}</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-emerald-400 font-bold text-xs">{yesData[hoveredIndex]}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-rose-400 font-bold text-xs">{noData[hoveredIndex]}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 범례 */}
        <div className="flex items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <span className="w-3 h-[2px] bg-emerald-500 rounded" />
            <span className="text-[11px] text-white/60">YES</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-[2px] bg-rose-500 rounded" />
            <span className="text-[11px] text-white/60">NO</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={scope}
      className="absolute inset-0 flex items-center justify-center"
      style={{ x, rotate, opacity, zIndex: isTop ? 10 : 0 }}
      drag={isTop && !showDetail ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={exitDirection && !scope.current ? { x: exitDirection === "right" ? 500 : -500, opacity: 0 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      {/* 카드 프레임 */}
      <div
        className="relative w-full h-full"
      >
        {/* White Stroke (뒤) */}
        <div className="absolute inset-0 rounded-[32px] bg-white" style={{ zIndex: 0 }} />

        {/* 이미지 컨테이너 */}
        <div
          className="absolute overflow-hidden rounded-[24px] bg-black"
          style={{ top: "10px", right: "10px", bottom: "10px", left: "10px", zIndex: 1, boxShadow: "0 0 10px rgba(0, 0, 0, 0.6)" }}
        >
          {/* 배경 이미지 */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${market.imageUrl})` }}
          />

          {/* YES 오버레이 */}
          {!showDetail && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ opacity: yesOpacity, background: "linear-gradient(90deg, rgba(241,245,4,0.4), rgba(50,185,83,0.4))", paddingBottom: "140px" }}
            >
              <div className="rounded-xl border-4 px-8 py-4 -rotate-12" style={{ borderColor: "rgba(50,185,83,0.7)", background: "linear-gradient(90deg, rgba(241,245,4,0.5), rgba(50,185,83,0.5))" }}>
                <span className="font-cafe24 text-5xl font-black text-white">YES!</span>
              </div>
              <div className="mt-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                <span className="font-cafe24 text-sm text-white">
                  {getSwipeFeedback(dragIntensity, market.yesPercent, true)}
                </span>
              </div>
            </motion.div>
          )}

          {/* NO 오버레이 */}
          {!showDetail && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ opacity: noOpacity, background: "linear-gradient(90deg, rgba(255,41,49,0.4), rgba(255,27,248,0.4))", paddingBottom: "140px" }}
            >
              <div className="rounded-xl border-4 px-8 py-4 rotate-12" style={{ borderColor: "rgba(255,41,49,0.7)", background: "linear-gradient(90deg, rgba(255,41,49,0.5), rgba(255,27,248,0.5))" }}>
                <span className="font-cafe24 text-5xl font-black text-white">NO!</span>
              </div>
              <div className="mt-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm">
                <span className="font-cafe24 text-sm text-white">
                  {getSwipeFeedback(dragIntensity, market.noPercent, false)}
                </span>
              </div>
            </motion.div>
          )}

          {/* 상단: SKIP 버튼 */}
          {!showDetail && (
            <div className="absolute left-4 top-4" style={{ zIndex: 20 }}>
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  await animate(scope.current, { y: -600, scale: 0.8, opacity: 0 }, { duration: 0.4, ease: "easeOut" });
                  onSkip?.();
                }}
                className="font-cafe24 text-sm font-bold text-white hover:opacity-80"
                style={{
                  textShadow: `-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black,
                               -2px 0 0 black, 2px 0 0 black, 0 -2px 0 black, 0 2px 0 black`,
                }}
              >
                SKIP
              </button>
            </div>
          )}

          {/* 메인 콘텐츠 */}
          {!showDetail && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-5 pt-20">
              <div className="flex items-center gap-1 font-bold text-white/80" style={{ fontSize: "15px" }}>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatDeadline(market.dDay)}</span>
              </div>
              <div className="mt-1 flex items-start" style={{ gap: "16px" }}>
                <h2 className="flex-1 font-bold text-white" style={{ fontSize: "24px" }}>
                  {market.question}
                </h2>
                {/* 상세 보기 아이콘 (위 화살표) */}
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDetail(true); }}
                  className="flex shrink-0 items-center justify-center border-2 border-white/70 hover:border-white transition-colors rounded-full"
                  style={{ width: "32px", height: "32px" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.80736 2.01018C9.93499 1.99788 10.0635 1.99794 10.1911 2.01018C10.2059 2.01158 10.2205 2.01335 10.2351 2.01506C10.2815 2.02055 10.3277 2.0278 10.3738 2.03655C10.3957 2.04071 10.4175 2.04535 10.4392 2.05022C10.4755 2.05839 10.5117 2.06734 10.5476 2.07756C10.5732 2.08485 10.5986 2.09273 10.6238 2.101C10.6537 2.11082 10.6831 2.12196 10.7126 2.13323C10.7436 2.14504 10.7743 2.15705 10.8044 2.17034C10.8153 2.17514 10.8258 2.18095 10.8367 2.18596C10.9618 2.24377 11.0797 2.31366 11.1892 2.39495C11.209 2.4096 11.2294 2.42342 11.2488 2.43889L16.2488 6.43889C17.1112 7.12888 17.2512 8.38692 16.5613 9.24944C15.8713 10.1119 14.6132 10.2519 13.7507 9.56194L11.9997 8.16057V16.0004C11.9997 17.105 11.1043 18.0004 9.99974 18.0004C8.89517 18.0004 7.99974 17.105 7.99974 16.0004V8.16057L6.24877 9.56194C5.38624 10.2519 4.12821 10.1119 3.43822 9.24944C2.74831 8.38692 2.88823 7.12888 3.75072 6.43889L8.75072 2.43889C8.76985 2.42359 8.78977 2.40945 8.80931 2.39495C8.91879 2.31364 9.03679 2.24381 9.16185 2.18596C9.1727 2.18095 9.18316 2.17515 9.19408 2.17034C9.22424 2.15704 9.25496 2.14506 9.28587 2.13323C9.31537 2.12195 9.34485 2.11083 9.37474 2.101C9.39993 2.09272 9.42529 2.08486 9.45091 2.07756C9.48682 2.06733 9.523 2.05841 9.55931 2.05022C9.58101 2.04534 9.60278 2.04072 9.62474 2.03655C9.67077 2.02778 9.71699 2.02058 9.76341 2.01506C9.77803 2.01334 9.79265 2.01159 9.80736 2.01018Z" fill="rgba(255,255,255,0.7)"/>
                  </svg>
                </button>
              </div>
              <div
                className="relative flex overflow-hidden rounded-full"
                style={{ marginTop: "24px", height: "28px", border: "2px solid white", backgroundColor: "rgba(255, 255, 255, 0.1)", marginBottom: "12px" }}
              >
                <div
                  className="flex items-center justify-start font-bold transition-all whitespace-nowrap"
                  style={{ width: `${market.noPercent}%`, fontSize: "13px", paddingLeft: "10px", background: market.noPercent >= market.yesPercent ? "linear-gradient(90deg, #FF2931, #FF1BF8)" : "transparent", color: market.noPercent < market.yesPercent ? "rgba(255, 255, 255, 0.6)" : "white" }}
                >
                  <span className="font-cafe24">NO {market.noPercent}%</span>
                </div>
                <div
                  className="flex items-center justify-end font-bold transition-all whitespace-nowrap"
                  style={{ width: `${market.yesPercent}%`, fontSize: "13px", paddingRight: "10px", background: market.yesPercent >= market.noPercent ? "linear-gradient(90deg, #F1F504, #32B953)" : "transparent", color: market.yesPercent < market.noPercent ? "rgba(255, 255, 255, 0.6)" : "white" }}
                >
                  <span className="font-cafe24">YES {market.yesPercent}%</span>
                </div>
                <div className="absolute top-0 bottom-0" style={{ left: "50%", width: "2px", backgroundColor: "rgba(255, 255, 255, 0.6)" }} />
              </div>
              <div className="flex items-center gap-4 text-white/70" style={{ fontSize: "13px", marginBottom: "40px" }}>
                <span className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>{market.participants.toLocaleString()}명 참여</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px] font-bold leading-none">P</span>
                  <span>누적 {market.totalPoints.toLocaleString()}포인트</span>
                </span>
              </div>
            </div>
          )}

          {/* 상세 오버레이 - 글래스모피즘 + 패럴랙스 */}
          {showDetail && (
            <div className="absolute inset-0 flex flex-col overflow-hidden">
              {/* 배경 이미지 - 고정 */}
              <div
                className="absolute inset-0"
                style={{
                  background: `url(${market.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: "scale(1.05)",
                }}
              />
              {/* 어두운 오버레이 (배경 가독성) */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              {/* 상단 고정 헤더 - 글래스모피즘 */}
              <div
                className="flex items-start gap-3 p-4 shrink-0 relative z-10 backdrop-blur-xl"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderBottom: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <h3 className="flex-1 text-xl font-bold text-white leading-snug tracking-tight drop-shadow-lg">{market.question}</h3>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowDetail(false); }}
                  className="flex shrink-0 items-center justify-center backdrop-blur-md transition-all hover:scale-110 rounded-full"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 2C11.1045 2.00014 12 2.89552 12 4V11.8389L13.751 10.4385C14.6135 9.74871 15.8716 9.88854 16.5615 10.751C17.2513 11.6134 17.1113 12.8715 16.249 13.5615L11.249 17.5615C11.2249 17.5808 11.1986 17.5972 11.1738 17.6152C11.0686 17.6919 10.9563 17.7583 10.8369 17.8135C10.8261 17.8185 10.8156 17.8243 10.8047 17.8291C10.7745 17.8424 10.7438 17.8544 10.7129 17.8662C10.6834 17.8775 10.6539 17.8886 10.624 17.8984C10.5992 17.9066 10.5741 17.9137 10.5488 17.9209C10.5112 17.9316 10.4736 17.9417 10.4355 17.9502C10.4158 17.9546 10.396 17.9591 10.376 17.9629C10.33 17.9717 10.2837 17.9779 10.2373 17.9834C10.2217 17.9852 10.2062 17.9878 10.1904 17.9893C10.0631 18.0014 9.93499 18.0015 9.80762 17.9893C9.79125 17.9877 9.77504 17.9854 9.75879 17.9834C9.71432 17.978 9.67008 17.9713 9.62598 17.9629C9.60369 17.9587 9.58159 17.9542 9.55957 17.9492C9.52324 17.941 9.48709 17.9321 9.45117 17.9219C9.42554 17.9146 9.4002 17.9067 9.375 17.8984C9.34344 17.8881 9.31238 17.8763 9.28125 17.8643C9.25376 17.8537 9.22611 17.8438 9.19922 17.832C9.1783 17.8229 9.15836 17.8117 9.1377 17.8018C9.07803 17.7732 9.02007 17.7422 8.96387 17.708C8.93784 17.6922 8.91119 17.6773 8.88574 17.6602C8.86795 17.6482 8.85137 17.6346 8.83398 17.6221C8.8063 17.6022 8.77786 17.583 8.75098 17.5615L3.75098 13.5615C2.88849 12.8715 2.74857 11.6135 3.43848 10.751C4.12849 9.8886 5.38654 9.7486 6.24902 10.4385L8 11.8389V4C8 2.89543 8.89543 2 10 2Z" fill="rgba(255,255,255,0.8)"/>
                  </svg>
                </button>
              </div>

              {/* 스크롤 영역 */}
              <div
                ref={detailScrollRef}
                className="detail-scroll flex-1 overflow-y-auto px-4 relative z-10"
                style={{ WebkitOverflowScrolling: "touch", paddingTop: "10px", paddingBottom: "40px" }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

                  {/* 카테고리 1: 이슈 내용, 기준, 판단 근거 */}
                  <div
                    className="backdrop-blur-xl relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "24px",
                      padding: "16px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* 마감일 + 요약 */}
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formatDeadline(market.dDay)} · 기준일 {market.endDate}</span>
                    </div>
                    <p className="text-[15px] text-white/90 leading-relaxed mb-4">{market.summary}</p>

                    {/* YES/NO 기준 */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
                      <div style={{ background: "linear-gradient(135deg, rgba(50,185,83,0.2) 0%, rgba(50,185,83,0.05) 100%)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(50,185,83,0.3)" }}>
                        <div className="font-bold text-emerald-400 mb-1 text-sm">YES 기준</div>
                        <div className="text-white/85 text-[14px]">{market.yesCriteria}</div>
                      </div>
                      <div style={{ background: "linear-gradient(135deg, rgba(255,41,49,0.2) 0%, rgba(255,41,49,0.05) 100%)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,41,49,0.3)" }}>
                        <div className="font-bold text-rose-400 mb-1 text-sm">NO 기준</div>
                        <div className="text-white/85 text-[14px]">{market.noCriteria}</div>
                      </div>
                    </div>

                    {/* 판단 근거 */}
                    <div className="font-bold text-white mb-2 text-sm">판단 근거</div>
                    <ul className="text-white/70 space-y-1 mb-3">
                      {market.judgmentBasis.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-[14px]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-white/40 italic">{market.disclaimer}</p>
                  </div>

                  {/* 카테고리 2: YES 비율 추이 */}
                  <div
                    className="backdrop-blur-xl relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "24px",
                      padding: "16px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* 현재 YES/NO 비율 */}
                    <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
                      <div
                        className="flex-1 text-center"
                        style={{ background: "linear-gradient(135deg, rgba(50,185,83,0.2) 0%, rgba(50,185,83,0.05) 100%)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(50,185,83,0.3)" }}
                      >
                        <div className="text-2xl font-bold text-emerald-400">{market.yesPercent}%</div>
                        <div className="text-xs text-white/60 mt-1">현재 YES</div>
                      </div>
                      <div
                        className="flex-1 text-center"
                        style={{ background: "linear-gradient(135deg, rgba(255,41,49,0.2) 0%, rgba(255,41,49,0.05) 100%)", borderRadius: "12px", padding: "12px", border: "1px solid rgba(255,41,49,0.3)" }}
                      >
                        <div className="text-2xl font-bold text-rose-400">{market.noPercent}%</div>
                        <div className="text-xs text-white/60 mt-1">현재 NO</div>
                      </div>
                    </div>

                    {/* 그래프 */}
                    <div className="font-bold text-white mb-1 text-sm">YES/NO 비율 추이</div>
                    <p className="text-xs text-white/50 mb-3">그래프를 터치하거나 호버하면 상세 비율을 확인할 수 있어요</p>
                    {renderTrendGraph()}
                  </div>

                  {/* 카테고리 3: 예측 타임라인 */}
                  <div
                    className="backdrop-blur-xl relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.15)",
                      borderRadius: "24px",
                      padding: "16px",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    <div className="font-bold text-white mb-4 text-sm">예측 타임라인</div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #32B953 0%, #2AA548 100%)" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-[14px]">예측 시작</div>
                          <div className="text-xs text-white/50">{market.startDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #F1F504 0%, #E5C800 100%)" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-[14px]">예측 마감</div>
                          <div className="text-xs text-white/50">{market.endDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #A855F7 0%, #7C3AED 100%)" }}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-white text-[14px]">결과 확정</div>
                          <div className="text-xs text-white/50">{market.resultDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* 포인트 정산 안내 */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-[13px] text-white/50 leading-relaxed">
                        예측 결과에 따라 베팅한 포인트가 정산됩니다. 맞추면 보상을, 틀리면 베팅한 포인트를 잃게 됩니다.
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

SwipeCard.displayName = "SwipeCard";

export default function Home() {
  const [markets, setMarkets] = useState(initialMarkets.slice(0, 5));
  const [betAmount, setBetAmount] = useState(5);
  const [totalPoints, setTotalPoints] = useState(500);
  const [showResult, setShowResult] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<{ choice: "YES" | "NO" } | null>(null);
  const { isExpanded: isSudabangExpanded, setIsExpanded, setCurrentMarketId } = useSudabang();
  const [showTeaPopup, setShowTeaPopup] = useState(false);
  const [dragDirection, setDragDirection] = useState<"left" | "right" | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(true);
  const topCardRef = useRef<SwipeCardRef>(null);
  const [glowColor, setGlowColor] = useState<"yes" | "no">("yes");
  const [completeGif] = useState(() => {
    const gifs = [
      "/images/complete.gif",
      "/images/complete2.gif",
      "/images/complete4.gif",
      "/images/complete5.gif",
      "/images/complete6.gif",
    ];
    return gifs[Math.floor(Math.random() * gifs.length)];
  });

  // Glow 색상 순환 (드래그 중이 아닐 때만)
  useEffect(() => {
    if (dragDirection) return;
    const interval = setInterval(() => {
      setGlowColor((prev) => (prev === "yes" ? "no" : "yes"));
    }, 3500);
    return () => clearInterval(interval);
  }, [dragDirection]);

  // 드래그 방향에 따른 활성 glow 색상
  const activeGlow = dragDirection === "right" ? "yes" : dragDirection === "left" ? "no" : glowColor;

  // 현재 카드 ID를 수다방에 전달
  useEffect(() => {
    if (markets.length > 0) {
      setCurrentMarketId(markets[0].id);
    } else {
      setCurrentMarketId(null);
    }
  }, [markets, setCurrentMarketId]);

  const handleSwipe = useCallback((direction: "left" | "right", id: string) => {
    const choice = direction === "right" ? "YES" : "NO";
    setLastSwipe({ choice });
    setShowResult(true);
    setDragDirection(null); // 드래그 방향 초기화
    setTotalPoints((prev) => prev - betAmount);
    setTimeout(() => setShowResult(false), 1200);
    setTimeout(() => {
      setDragDirection(null); // 카드 제거 후 다시 초기화
      setMarkets((prev) => prev.filter((m) => m.id !== id));
    }, 300);
  }, [betAmount]);

  // 애니메이션과 함께 스와이프 (버튼/키보드용)
  const handleAnimatedSwipe = useCallback((direction: "left" | "right") => {
    setDragDirection(null); // 드래그 방향 초기화
    if (topCardRef.current) {
      topCardRef.current.triggerSwipe(direction);
    }
  }, []);

  // Skip 기능 - 베팅 없이 카드 넘기기
  const handleSkip = useCallback(() => {
    setDragDirection(null); // 드래그 방향 초기화
    setMarkets((prev) => {
      if (prev.length > 0) {
        return prev.slice(1);
      }
      return prev;
    });
  }, []);

  // 애니메이션과 함께 스킵 (키보드/버튼용)
  const handleAnimatedSkip = useCallback(() => {
    if (topCardRef.current) {
      topCardRef.current.triggerSkip();
    }
  }, []);

  // 키보드 이벤트 핸들러
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 입력 필드에 포커스가 있으면 무시
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // 팝업이 열려있을 때 특정 키 처리
      if (showTeaPopup) {
        if (e.key === "Escape" || e.key === " ") {
          e.preventDefault();
          setShowTeaPopup(false);
        }
        return;
      }

      // 일반 상태에서 키보드 조작
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          topCardRef.current?.openDetail(); // 상세 열기
          break;
        case "ArrowDown":
          e.preventDefault();
          topCardRef.current?.closeDetail(); // 상세 닫기
          break;
        case "ArrowLeft":
          e.preventDefault();
          handleAnimatedSwipe("left"); // NO
          break;
        case "ArrowRight":
          e.preventDefault();
          handleAnimatedSwipe("right"); // YES
          break;
        case "s":
        case "S":
          e.preventDefault();
          handleAnimatedSkip(); // Skip
          break;
        case " ":
          e.preventDefault();
          setShowTeaPopup(true); // 포인트 변경 팝업
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleAnimatedSwipe, handleAnimatedSkip, showTeaPopup]);

  if (markets.length === 0) {
    return (
      <div className="relative min-h-screen">
        {/* 상단 헤더 */}
        <header
          className="fixed left-0 top-0 right-0 z-30 flex items-center justify-between px-6 transition-all duration-300 md:left-56"
          style={{ paddingTop: "20px", paddingBottom: "10px" }}
        >
          <h1
            className="font-cafe24 font-bold text-zinc-900"
            style={{
              fontSize: "32px",
              WebkitTextStroke: "4px white",
              paintOrder: "stroke fill",
            }}
          >
            오늘의 스필
          </h1>
          <div className="flex items-center" style={{ gap: "8px" }}>
            {/* 모은 포인트 */}
            <Link
              href="/points"
              className="flex items-center gap-2 rounded-full px-4 backdrop-blur-sm hover:opacity-90 transition-opacity"
              style={{
                height: "44px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(255, 255, 255, 1)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span>🔮</span>
              <span className="font-cafe24 font-bold text-zinc-900" style={{ fontSize: "15px" }}>{totalPoints}P</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "-4px" }}>
                <path d="M5 2L8 6L5 10" stroke="#C1C0C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            {/* 수다방 버튼 없음 - 카드가 없으면 수다방도 없음 */}
          </div>
        </header>

        {/* 완료 화면 */}
        <div className={`fixed inset-0 z-20 flex flex-col items-center justify-center transition-all duration-300 md:left-56 ${
          isSudabangExpanded ? "sudabang-offset-expanded" : "sudabang-offset-collapsed"
        }`}>
          <div className="text-center">
            <img
              src={completeGif}
              alt="완료"
              className="mx-auto rounded-2xl"
              style={{ width: "180px", height: "auto" }}
            />
            <h2 className="mt-4 font-cafe24 text-2xl font-bold text-zinc-900">
              끝!
            </h2>
            <p className="mt-2 text-zinc-600">내일 새로운 예측이 올라와요</p>
            <Link
              href="/explore"
              className="relative mt-6 inline-block rounded-full px-6 py-3 font-cafe24 font-medium text-white hover:opacity-90 transition-opacity"
              style={{ background: "linear-gradient(to bottom, #4280FF, #3D24FF)", border: "1px solid #3D24FF" }}
            >
              {/* 블러 그림자 */}
              <span
                className="absolute inset-0 -z-10 rounded-full blur-xl opacity-60 translate-y-2"
                style={{ background: "linear-gradient(to bottom, #4280FF, #3D24FF)" }}
              />
              더 많은 스필 탐색하기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Glow 위치 (수다방 상태에 따라 조정)
  const glowPosition = `top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 md:left-[calc(50%+112px)] ${
    isSudabangExpanded ? "lg:left-[calc(50%-48px)]" : ""
  }`;

  return (
    <div className="relative min-h-screen">
      {/* Dynamic YES/NO Glow */}
      <div
        className={`pointer-events-none fixed z-[1] rounded-full transition-all duration-[2000ms] ${glowPosition}`}
        style={{
          width: "90vw",
          height: "90vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background: "radial-gradient(circle, #F1F504 0%, #32B953 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: activeGlow === "yes" ? 0.5 : 0,
        }}
      />
      <div
        className={`pointer-events-none fixed z-[1] rounded-full transition-all duration-[2000ms] ${glowPosition}`}
        style={{
          width: "90vw",
          height: "90vw",
          maxWidth: "900px",
          maxHeight: "900px",
          background: "radial-gradient(circle, #FF2931 0%, #FF1BF8 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: activeGlow === "no" ? 0.5 : 0,
        }}
      />

      {/* 상단 헤더 */}
      <header
        className={`fixed left-0 top-0 z-30 flex items-center justify-between px-6 transition-all duration-300 md:left-56 ${
          isSudabangExpanded ? "right-0 lg:right-80" : "right-0"
        }`}
        style={{ paddingTop: "20px", paddingBottom: "10px" }}
      >
        <h1
          className="font-cafe24 font-bold text-zinc-900"
          style={{
            fontSize: "32px",
            WebkitTextStroke: "4px white",
            paintOrder: "stroke fill",
          }}
        >
          오늘의 스필
        </h1>
        <div className="flex items-center" style={{ gap: "8px" }}>
          {/* 모은 포인트 */}
          <Link
            href="/points"
            className="flex items-center gap-2 rounded-full px-4 backdrop-blur-sm hover:opacity-90 transition-opacity"
            style={{
              height: "44px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              border: "1px solid rgba(255, 255, 255, 1)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <span>🔮</span>
            <span className="font-cafe24 font-bold text-zinc-900" style={{ fontSize: "15px" }}>{totalPoints}P</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "-4px" }}>
              <path d="M5 2L8 6L5 10" stroke="#C1C0C9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* 수다방 버튼 - 수다방이 열려있으면 숨김 */}
          {!isSudabangExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center justify-center rounded-full backdrop-blur-sm"
              style={{
                width: "44px",
                height: "44px",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                border: "1px solid rgba(255, 255, 255, 1)",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span style={{ fontSize: "20px" }}>💬</span>
            </button>
          )}
        </div>
      </header>

      {/* 스와이프 결과 토스트 */}
      {showResult && lastSwipe && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`fixed top-20 z-50 -translate-x-1/2 rounded-full px-6 py-3 font-cafe24 font-bold text-white shadow-lg left-1/2 md:left-[calc(50%+112px)] ${
            isSudabangExpanded ? "lg:left-[calc(50%-48px)]" : ""
          }`}
          style={{
            background: lastSwipe.choice === "YES"
              ? "linear-gradient(90deg, #F1F504, #32B953)"
              : "linear-gradient(90deg, #FF2931, #FF1BF8)",
          }}
        >
          {lastSwipe.choice} 베팅 완료! -{betAmount}P
        </motion.div>
      )}

      {/* 카드 + 버튼 영역 - 뷰포트 중앙 고정 (수다방 상태에 따라 동적 조정) */}
      <div
        className={`fixed inset-0 z-20 flex flex-col items-center transition-all duration-300 md:left-56 ${
          isSudabangExpanded ? "sudabang-offset-expanded" : "sudabang-offset-collapsed"
        }`}
        style={{ top: "74px", paddingTop: "10px" }}
      >
        {/* 카드 영역 - 반응형: 좌우 16px 마진, 바텀네비 고려 */}
        <div
          className="relative w-[calc(100vw-32px)] max-w-[399px] h-[calc(100dvh-200px)] max-h-[649px]"
          style={{ aspectRatio: "399/649" }}
        >
          {markets
            .slice(0, 3)
            .reverse()
            .map((market, index, arr) => {
              const isTop = index === arr.length - 1;
              return (
                <SwipeCard
                  key={market.id}
                  ref={isTop ? topCardRef : null}
                  market={market}
                  onSwipe={handleSwipe}
                  onSkip={handleSkip}
                  onDragDirection={isTop ? setDragDirection : undefined}
                  isTop={isTop}
                />
              );
            })}

          {/* 하단 버튼 영역 - 이미지 하단과 버튼 중앙 정렬 */}
          <div
            className="absolute left-1/2 z-20 flex items-center justify-center"
            style={{ bottom: "12px", transform: "translate(-50%, 50%)", gap: "24px" }}
          >
          {/* NO 버튼 */}
          <button
            onClick={() => handleAnimatedSwipe("left")}
            className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${
              dragDirection === "right" ? "opacity-0 scale-90" : "hover:scale-[1.15] active:scale-95"
            }`}
            style={{
              width: "70px",
              height: "70px",
              transform: dragDirection === "left" ? "scale(1.15)" : undefined,
              background: dragDirection === "left" ? "linear-gradient(90deg, #FF2931, #FF1BF8)" : "white",
            }}
          >
            {dragDirection === "left" ? (
              <span className="font-cafe24 font-black text-white" style={{ fontSize: "22px" }}>
                NO
              </span>
            ) : (
              <>
                <span
                  className="absolute font-cafe24 font-black"
                  style={{
                    fontSize: "22px",
                    WebkitTextStroke: "4px #B2001D",
                    color: "transparent",
                  }}
                >
                  NO
                </span>
                <span
                  className="relative font-cafe24 font-black"
                  style={{
                    fontSize: "22px",
                    background: "linear-gradient(90deg, #FF2931, #FF1BF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  NO
                </span>
              </>
            )}
          </button>

          {/* 포인트 베팅 */}
          <div
            onClick={() => setShowTeaPopup(true)}
            className={`relative flex items-center justify-center transition-all duration-200 cursor-pointer ${
              dragDirection ? "opacity-0 scale-90" : "hover:scale-[1.15]"
            }`}
            style={{ width: "64px", height: "64px" }}
          >
            <img
              src="/images/crystal_ball.png"
              alt="포인트"
              className="absolute inset-0"
              style={{ width: "64px", height: "64px" }}
            />
            <span
              className="relative font-cafe24 font-bold text-center leading-tight"
              style={{
                fontSize: "15px",
                color: "black",
                textShadow: `-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white,
                             -2px 0 0 white, 2px 0 0 white, 0 -2px 0 white, 0 2px 0 white`,
              }}
            >
              {betAmount}P
            </span>
          </div>

          {/* YES 버튼 */}
          <button
            onClick={() => handleAnimatedSwipe("right")}
            className={`relative flex items-center justify-center rounded-full shadow-lg transition-all duration-200 ${
              dragDirection === "left" ? "opacity-0 scale-90" : "hover:scale-[1.15] active:scale-95"
            }`}
            style={{
              width: "70px",
              height: "70px",
              transform: dragDirection === "right" ? "scale(1.15)" : undefined,
              background: dragDirection === "right" ? "linear-gradient(90deg, #F1F504, #32B953)" : "white",
            }}
          >
            {dragDirection === "right" ? (
              <span className="font-cafe24 font-black text-white" style={{ fontSize: "22px" }}>
                YES
              </span>
            ) : (
              <>
                <span
                  className="absolute font-cafe24 font-black"
                  style={{
                    fontSize: "22px",
                    WebkitTextStroke: "4px #217C00",
                    color: "transparent",
                  }}
                >
                  YES
                </span>
                <span
                  className="relative font-cafe24 font-black"
                  style={{
                    fontSize: "22px",
                    background: "linear-gradient(90deg, #F1F504, #32B953)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  YES
                </span>
              </>
            )}
          </button>
          </div>
        </div>

      </div>

      {/* 포인트 변경 팝업 */}
      <AnimatePresence>
        {showTeaPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowTeaPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 overflow-hidden rounded-3xl bg-white p-6 dark:bg-zinc-900 md:left-[calc(50%+112px)] ${
                isSudabangExpanded ? "lg:left-[calc(50%-48px)]" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-center font-cafe24 text-lg font-bold text-zinc-900 dark:text-white">
                베팅할 포인트
              </h3>

              {/* 포인트 아이콘 + 현재 선택 */}
              <div className="mt-4 flex flex-col items-center">
                <img
                  src="/images/crystal_ball.png"
                  alt="포인트"
                  className="h-16 w-16"
                />
                <span className="mt-2 font-cafe24 text-3xl font-bold text-zinc-900 dark:text-white">
                  {betAmount}P
                </span>
              </div>

              {/* 포인트 선택 버튼들 */}
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[1, 3, 5, 10].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setBetAmount(amount)}
                    className={`rounded-xl py-3 font-cafe24 font-bold transition-all ${
                      betAmount === amount
                        ? "bg-pink-500 text-white"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>

              {/* 올인 버튼 */}
              <button
                onClick={() => setBetAmount(totalPoints)}
                className={`mt-2 w-full rounded-xl py-3 font-cafe24 font-bold transition-all ${
                  betAmount === totalPoints
                    ? "bg-pink-500 text-white"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                🔥 올인 {totalPoints}P
              </button>

              {/* 보유 포인트 표시 */}
              <div className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
                보유: {totalPoints}P
              </div>

              {/* 확인 버튼 */}
              <button
                onClick={() => setShowTeaPopup(false)}
                className="mt-4 w-full rounded-xl bg-zinc-900 py-3 font-cafe24 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                확인
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 키보드 단축키 바 - md 이하에서만 표시 */}
      {showKeyboardHelp ? (
        <div
          className={`fixed left-0 z-40 hidden items-center justify-center transition-all duration-300 lg:flex md:left-56 ${
            isSudabangExpanded ? "right-0 lg:right-80" : "right-0"
          }`}
          style={{ bottom: "30px" }}
        >
          <div className="flex items-center" style={{ gap: "16px" }}>
            <button
              onClick={() => setShowKeyboardHelp(false)}
              className="flex items-center justify-center rounded-full bg-zinc-900 text-white font-medium"
              style={{ height: "24px", padding: "0 12px", fontSize: "13px" }}
            >
              숨기기
            </button>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900" style={{ width: "20px", height: "20px" }}>
                <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>NO</span>
            </div>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900" style={{ width: "20px", height: "20px" }}>
                <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>YES</span>
            </div>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900" style={{ width: "20px", height: "20px" }}>
                <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              </span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>상세</span>
            </div>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900" style={{ width: "20px", height: "20px" }}>
                <svg style={{ width: "10px", height: "10px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>닫기</span>
            </div>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900 font-bold text-zinc-900" style={{ width: "20px", height: "20px", fontSize: "10px" }}>S</span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>SKIP</span>
            </div>
            <div className="flex items-center" style={{ gap: "5px" }}>
              <span className="flex items-center justify-center rounded-md border-2 border-zinc-900 font-bold text-zinc-900" style={{ height: "20px", minWidth: "40px", fontSize: "10px" }}>SPACE</span>
              <span className="font-bold text-zinc-900" style={{ fontSize: "13px" }}>포인트 선택</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowKeyboardHelp(true)}
          className="fixed z-40 hidden items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-all lg:flex"
          style={{ bottom: "30px", right: "24px", height: "32px", padding: "0 16px" }}
        >
          단축키 보기
        </button>
      )}
    </div>
  );
}
