"use client";

import { useRef, useEffect } from "react";

/*
 * Interactive grid background for auth pages.
 * - Thin-line grid that warps near the cursor
 * - Points ease back to rest with subtle noise
 * - Retina-aware canvas rendering
 */

const CELL = 40; // grid cell size (px)
const RADIUS = 220; // mouse influence radius
const STRENGTH = 35; // max displacement (px)
const EASE = 0.1; // lerp factor (lower = smoother)
const LINE_ALPHA = 0.035; // grid line opacity

interface Point {
  ox: number;
  oy: number;
  x: number;
  y: number;
}

interface InteractiveGridBgProps {
  glowClassName?: string;
  hideGlow?: boolean;
}

export default function InteractiveGridBg({ glowClassName, hideGlow }: InteractiveGridBgProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;

    let cols = 0;
    let rows = 0;
    let points: Point[] = [];
    let raf = 0;
    let t = 0;
    let dpr = 1;

    // --- resize & build grid ---
    function init() {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / CELL) + 2;
      rows = Math.ceil(h / CELL) + 2;
      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = c * CELL;
          const oy = r * CELL;
          points.push({ ox, oy, x: ox, y: oy });
        }
      }
    }

    // cheap pseudo-noise (no library)
    function noise(a: number, b: number, phase: number) {
      return (
        Math.sin(a * 0.015 + phase) * Math.cos(b * 0.015 + phase * 0.7) * 1.2
      );
    }

    // --- animation loop ---
    function frame() {
      t += 0.004;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // update positions
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = mx - p.ox;
        const dy = my - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // target = original + mouse push + noise
        let tx = p.ox + noise(p.ox, p.oy, t);
        let ty = p.oy + noise(p.oy, p.ox, t + 50);

        if (dist < RADIUS) {
          const force = Math.pow(1 - dist / RADIUS, 2); // quadratic falloff
          const angle = Math.atan2(dy, dx);
          tx -= Math.cos(angle) * force * STRENGTH;
          ty -= Math.sin(angle) * force * STRENGTH;
        }

        p.x += (tx - p.x) * EASE;
        p.y += (ty - p.y) * EASE;
      }

      // draw
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(0, 0, 0, ${LINE_ALPHA})`;
      ctx.lineWidth = 1;

      // horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r * cols + c];
          if (c === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // vertical lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r * cols + c];
          if (r === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    init();
    frame();

    // event listeners (window-level so pointer-events:none on canvas works)
    const onResize = () => init();
    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) mouse.current = { x: touch.clientX, y: touch.clientY };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Circular blue glow */}
      {!hideGlow && (
        <div
          className={`absolute rounded-full opacity-40 ${glowClassName || "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"}`}
          style={{
            width: "90vw",
            height: "90vw",
            maxWidth: "900px",
            maxHeight: "900px",
            background: "radial-gradient(circle, #4280FF 0%, #1a3fff 40%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      )}

      {/* Grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
