import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.khan.co.kr",
      },
      {
        protocol: "https",
        hostname: "image.starnewskorea.com",
      },
      {
        protocol: "https",
        hostname: "image.inews24.com",
      },
    ],
  },
};

export default nextConfig;
