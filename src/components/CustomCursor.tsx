"use client";

import { useRef, useEffect } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const circle = circleRef.current;
    if (!dot || !circle) return;

    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      circle.style.display = "none";
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const update = () => {
      const { x, y } = pos.current;
      // Both centered on cursor using translate(-50%, -50%)
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
      rafId.current = requestAnimationFrame(update);
    };

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest(
        "a, button, [role='button'], input[type='submit'], select, [data-clickable]"
      );
      const next = !!clickable;

      if (next !== isHovering.current) {
        isHovering.current = next;
        if (next) {
          dot.style.width = "1px";
          dot.style.height = "1px";
          circle.style.width = "34px";
          circle.style.height = "34px";
          circle.style.opacity = "1";
        } else {
          dot.style.width = "14px";
          dot.style.height = "14px";
          circle.style.width = "0px";
          circle.style.height = "0px";
          circle.style.opacity = "0";
        }
      }
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      circle.style.opacity = "0";
      circle.style.width = "0px";
      circle.style.height = "0px";
      dot.style.width = "14px";
      dot.style.height = "14px";
      isHovering.current = false;
    };

    const onMouseEnter = () => {
      dot.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", checkHover);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId.current = requestAnimationFrame(update);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", checkHover);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  const centered = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    pointerEvents: "none" as const,
    zIndex: 99999,
    willChange: "left, top, width, height",
  };

  return (
    <>
      {/* Default dot cursor - 14px */}
      <div
        ref={dotRef}
        style={{
          ...centered,
          width: "14px",
          height: "14px",
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          transition:
            "width 0.2s cubic-bezier(0.23, 1, 0.32, 1), height 0.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
        }}
      />
      {/* Hover circle - 34px stroke */}
      <div
        ref={circleRef}
        style={{
          ...centered,
          width: "0px",
          height: "0px",
          opacity: 0,
          backgroundColor: "transparent",
          border: "1px solid var(--accent)",
          transition:
            "width 0.25s cubic-bezier(0.23, 1, 0.32, 1), height 0.25s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.2s ease",
        }}
      />
    </>
  );
}
