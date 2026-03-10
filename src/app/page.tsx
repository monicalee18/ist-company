import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "IST COMPANY",
  description:
    "IST Entertainment - Creative direction, strategic management, and global production for K-Pop artists.",
  openGraph: {
    title: "IST COMPANY",
    description:
      "IST Entertainment - Creative direction, strategic management, and global production for K-Pop artists.",
  },
};

export default function Home() {
  return <HomeClient />;
}
