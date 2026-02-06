"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import Sudabang from "@/components/chat/Sudabang";
import Background from "@/components/layout/Background";
import { SudabangProvider } from "@/contexts/SudabangContext";

const AUTH_ROUTES = ["/login", "/signup"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <SudabangProvider>
      <Background />
      <Sidebar />
      <main className="relative z-10 min-h-screen pb-20 md:pb-0 md:pl-56">
        {children}
      </main>
      <Sudabang />
      <BottomNav />
    </SudabangProvider>
  );
}
