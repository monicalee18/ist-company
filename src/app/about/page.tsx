import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Since 2006, IST Entertainment has been building a strong foundation for artists through creative direction, strategic management, and global production.",
  openGraph: {
    title: "About | IST COMPANY",
    description:
      "Since 2006, IST Entertainment has been building a strong foundation for artists through creative direction, strategic management, and global production.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
