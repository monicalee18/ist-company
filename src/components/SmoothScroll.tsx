"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    (window as unknown as Record<string, unknown>).__lenis = lenis;

    // Add lenis class to html element
    document.documentElement.classList.add("lenis");

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Listen for modal open/close to stop/start Lenis
    const observer = new MutationObserver(() => {
      const modalOpen = document.querySelector("[data-lenis-prevent]");
      if (modalOpen) {
        lenis.stop();
      } else {
        lenis.start();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      lenis.destroy();
      document.documentElement.classList.remove("lenis");
    };
  }, []);

  return <>{children}</>;
}
