"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center content-padding"
      style={{ paddingTop: "78px" }}
    >
      <h1
        className="font-light text-center"
        style={{ fontSize: "44px", lineHeight: 1.1, color: "var(--accent)" }}
      >
        Something went wrong
      </h1>
      <p
        className="text-white/50 text-center"
        style={{
          marginTop: "16px",
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
          maxWidth: "400px",
        }}
      >
        An unexpected error occurred.
        <br />
        Please try again.
      </p>
      <button
        onClick={reset}
        className="text-white/60 hover:text-white transition-colors underline underline-offset-4"
        style={{ marginTop: "32px", fontSize: "14px" }}
      >
        Try again
      </button>
    </div>
  );
}
