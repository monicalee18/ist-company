import type { Metadata } from "next";
import AuditionClient from "./AuditionClient";

export const metadata: Metadata = {
  title: "Audition",
  description:
    "Join IST Entertainment. Apply for vocal, dance, rap, and acting auditions. We're looking for the next generation of K-Pop stars.",
  openGraph: {
    title: "Audition | IST COMPANY",
    description:
      "Join IST Entertainment. Apply for vocal, dance, rap, and acting auditions. We're looking for the next generation of K-Pop stars.",
  },
};

export default function AuditionPage() {
  return <AuditionClient />;
}
