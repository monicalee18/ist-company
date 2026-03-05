"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Artist data - to be updated with actual artist info
const artist = {
  name: "Artist Name",
  nameKo: "아티스트 이름",
  debut: "2025",
  description: `아티스트 소개 내용이 들어갑니다.
  아티스트의 특징, 음악 스타일, 활동 이력 등을 작성합니다.`,
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
  },
};

export default function ArtistPage() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Full screen artist image */}
      <section className="relative h-screen">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Placeholder gradient - replace with actual artist image */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800" />

          {/* Artist Image - uncomment when available */}
          {/*
          <Image
            src="/artist-main.jpg"
            alt={artist.name}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          */}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        </motion.div>

        {/* Artist Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 content-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-2">
              {artist.name}
            </h1>
            <p className="text-white/50 text-lg md:text-xl">
              {artist.nameKo}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Artist Info Section */}
      <section className="py-20 md:py-32 content-padding">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid md:grid-cols-2 gap-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Left - Description */}
            <div>
              <h2 className="text-sm text-white/50 tracking-wider mb-6">
                ABOUT
              </h2>
              <p className="text-white/80 leading-relaxed whitespace-pre-line text-lg">
                {artist.description}
              </p>
            </div>

            {/* Right - Details & Socials */}
            <div>
              <h2 className="text-sm text-white/50 tracking-wider mb-6">
                INFO
              </h2>
              <div className="space-y-4 mb-10">
                <div className="flex items-center py-3 border-b border-white/10">
                  <span className="text-white/40 w-24">Debut</span>
                  <span className="text-white">{artist.debut}</span>
                </div>
              </div>

              {/* Social Links */}
              <h2 className="text-sm text-white/50 tracking-wider mb-6">
                FOLLOW
              </h2>
              <div className="flex gap-6">
                <a
                  href={artist.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={artist.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href={artist.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Placeholder */}
      <section className="py-20 content-padding border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-sm text-white/50 tracking-wider mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            GALLERY
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div
                key={item}
                className="aspect-square bg-white/5 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/20 text-sm">Photo {item}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
