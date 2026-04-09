import type { Metadata } from "next";
import { Suspense } from "react";
import NewsClient from "./NewsClient";

export const metadata: Metadata = {
  title: "Press Releases",
  description:
    "Stay updated with the latest news and announcements from IST Entertainment and our artists.",
  openGraph: {
    title: "Press Releases | IST COMPANY",
    description:
      "Stay updated with the latest news and announcements from IST Entertainment and our artists.",
  },
};

export default function NewsPage() {
  return (
    <Suspense>
      <NewsClient />
    </Suspense>
  );
}
