"use client";

import { useRef, useEffect, useState } from "react";

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("intro-played")) {
      setVisible(false);
      return;
    }
    sessionStorage.setItem("intro-played", "true");

    const container = containerRef.current;
    if (!container) return;

    const panels = container.children as HTMLCollectionOf<HTMLDivElement>;
    const topPanel = panels[0];
    const bottomPanel = panels[1];
    const leftPanel = panels[2];
    const rightPanel = panels[3];

    const easing = "cubic-bezier(0.76, 0, 0.24, 1)";
    const duration = 1400;

    requestAnimationFrame(() => {
      setTimeout(() => {
        topPanel.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
          { duration, easing, fill: "forwards" }
        );
        bottomPanel.animate(
          [{ transform: "translateY(0)" }, { transform: "translateY(100%)" }],
          { duration, easing, fill: "forwards" }
        );
        leftPanel.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(-100%)" }],
          { duration, easing, fill: "forwards" }
        );
        rightPanel.animate(
          [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
          { duration, easing, fill: "forwards" }
        );

        setTimeout(() => {
          setVisible(false);
        }, duration + 300);
      }, 400);
    });
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "15%",
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "15%",
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          backgroundColor: "white",
        }}
      />
    </div>
  );
}
