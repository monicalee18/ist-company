"use client";

import { usePathname } from "next/navigation";
import InteractiveGridBg from "@/components/ui/InteractiveGridBg";

export default function Background() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    // 홈에서는 glow를 숨기고 page.tsx에서 동적 glow 렌더링
    return (
      <>
        <div className="fixed inset-0 z-0 bg-[#f7f7fa]" />
        <InteractiveGridBg hideGlow />
      </>
    );
  }

  return <div className="fixed inset-0 z-0 bg-white" />;
}
