"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/lib/artists";

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/artist/${artist.id}`}
        className="block relative overflow-hidden"
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src={artist.photo}
            alt={artist.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: hovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.4)",
            transition: "background-color 0.3s ease",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[40vw] max-w-[200px] aspect-[300/53] relative">
            <Image
              src={artist.logo}
              alt={artist.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ArtistListClient({ artists }: { artists: Artist[] }) {
  return (
    <div
      className="min-h-screen bg-black"
      style={{ paddingTop: "78px" }}
    >
      {/* Header */}
      <div
        className="content-padding"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-light text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Artists
        </motion.h1>
      </div>

      {/* Artist Grid */}
      <div className="content-padding grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px] pb-[60px]">
        {artists.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} index={index} />
        ))}
      </div>
    </div>
  );
}
