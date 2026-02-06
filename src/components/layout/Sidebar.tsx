"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "스필",
    emoji: "🔥",
    activeEmoji: "💓",
  },
  {
    href: "/explore",
    label: "탐색",
    emoji: "🧭",
    activeEmoji: "👀",
  },
  {
    href: "/ranking",
    label: "랭킹",
    emoji: "👑",
    activeEmoji: "🤘",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-56 flex-col border-r border-zinc-200 bg-white/95 backdrop-blur-sm md:flex dark:border-zinc-800 dark:bg-zinc-950/95">
      {/* 로고 */}
      <div className="flex h-20 items-center px-5 pt-5">
        <Link href="/">
          <img
            src="/images/Logo.svg"
            alt="SPILL OTEA"
            className="w-full max-w-[100px]"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            const isLast = index === navItems.length - 1;
            return (
              <li
                key={item.href}
                className={!isLast ? "border-dashed-custom pb-1" : ""}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-3 text-lg font-medium transition-colors font-cafe24 ${
                    isActive
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                  style={{ fontSize: "18px" }}
                >
                  <span className="text-lg">{isActive ? item.emoji : item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive && <span className="ml-1">{item.activeEmoji}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 프로필 섹션 */}
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <Link
          href="/profile"
          className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-lg dark:bg-zinc-700">
            ⚽
          </div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 font-cafe24">
            트렌드냠냠러기
          </span>
        </Link>
        <button
          onClick={() => router.push("/login")}
          className="mt-2 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          로그아웃
        </button>
      </div>
    </aside>
  );
}
