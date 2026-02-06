"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import InteractiveGridBg from "@/components/ui/InteractiveGridBg";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      setError("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    if (!agreedToTerms) {
      setError("이용약관에 동의해주세요.");
      return;
    }

    // TODO: 실제 회원가입 로직
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[#f7f7fa] px-5 py-12">
      <InteractiveGridBg />

      {/* 로고 + 브랜딩 */}
      <div className="relative z-10 mb-10 flex flex-col items-center gap-3">
        <Image
          src="/images/Logo.svg"
          alt="spilltea"
          width={140}
          height={48}
          priority
        />
        <p className="text-sm font-medium tracking-tight text-zinc-600">
          커뮤니티에 참여하세요
        </p>
      </div>

      {/* 카드 */}
      <div className="relative z-10 w-full max-w-[400px] rounded-[28px] bg-white px-7 pb-10 pt-9 shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
        <h1 className="text-[26px] font-extrabold tracking-tight text-zinc-900">
          회원가입
        </h1>

        {error && (
          <div className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-[13px] font-medium text-red-500">
            {error}
          </div>
        )}

        {/* Google 가입 */}
        <button
          type="button"
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl border bg-white px-5 py-3.5 text-[14px] font-semibold text-zinc-700 transition-all hover:bg-zinc-50 active:scale-[0.98]"
          style={{ borderColor: "#ebebeb" }}
        >
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google로 가입하기
        </button>

        {/* 구분선 */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-zinc-100" />
          <span className="text-[12px] font-semibold text-zinc-300">또는</span>
          <div className="h-px flex-1 bg-zinc-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이름 + 사용자 이름 2열 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-[13px] font-semibold text-zinc-500"
              >
                이름
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-2xl border-0 bg-zinc-100 px-5 py-3.5 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/30"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-[13px] font-semibold text-zinc-500"
              >
                사용자 이름
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-2xl border-0 bg-zinc-100 px-5 py-3.5 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/30"
                placeholder="username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-semibold text-zinc-500"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-2xl border-0 bg-zinc-100 px-5 py-3.5 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/30"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-semibold text-zinc-500"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-2xl border-0 bg-zinc-100 px-5 py-3.5 text-[15px] text-zinc-900 placeholder-zinc-400 outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/30"
              placeholder="8자 이상"
            />
          </div>

          {/* 이용약관 */}
          <div className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3.5">
            <input
              id="terms"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 h-[18px] w-[18px] rounded-md border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="terms"
              className="text-[13px] leading-snug text-zinc-500"
            >
              <Link href="/terms" className="font-semibold text-zinc-700 hover:underline">
                이용약관
              </Link>{" "}
              및{" "}
              <Link href="/privacy" className="font-semibold text-zinc-700 hover:underline">
                개인정보처리방침
              </Link>
              에 동의합니다
            </label>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="font-cafe24 w-full rounded-2xl py-4 text-[16px] font-bold tracking-wide text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #4280FF 0%, #3D24FF 100%)",
              }}
            >
              가입하기
            </button>
          </div>
        </form>
      </div>

      {/* 하단 링크 */}
      <p className="relative z-10 mt-8 text-[14px] text-zinc-400">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-bold text-zinc-900 hover:underline"
        >
          로그인
        </Link>
      </p>
    </div>
  );
}
