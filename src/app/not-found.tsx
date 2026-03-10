import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center content-padding"
      style={{ paddingTop: "78px" }}
    >
      <p
        className="tracking-widest"
        style={{ fontSize: "clamp(3.5rem, 13vw, 7rem)", marginBottom: "16px", color: "var(--accent)", lineHeight: 1, fontWeight: 400 }}
      >
        404
      </p>
      <h1
        className="text-white font-light text-center"
        style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", lineHeight: 1.2 }}
      >
        Page not found
      </h1>
      <p
        className="text-white/50 text-center"
        style={{
          marginTop: "16px",
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          maxWidth: "400px",
        }}
      >
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="text-white/60 hover:text-white transition-colors underline underline-offset-4"
        style={{ marginTop: "48px", fontSize: "14px" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
