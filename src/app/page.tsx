"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {/* Fullscreen Hero Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Placeholder gradient - replace with actual artist image */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800" />

        {/* Hero Image - uncomment and add actual image path when available */}
        {/*
        <Image
          src="/hero-main.jpg"
          alt="IST Artist"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        */}

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-4 px-4 md:pb-6 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Tagline or Artist Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4">
            <span className="block">Creating</span>
            <span className="block text-white/70">Tomorrow&apos;s Stars</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/50 text-sm md:text-base max-w-md">
            IST Entertainment represents the next generation of K-Pop artists,
            shaping the future of global entertainment.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
