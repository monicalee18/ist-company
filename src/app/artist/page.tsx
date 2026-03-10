import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { artists } from "@/lib/artists";
import ArtistListClient from "./ArtistListClient";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "Meet IST Entertainment artists. Discover members, discography, and music videos.",
  openGraph: {
    title: "Artists | IST COMPANY",
    description:
      "Meet IST Entertainment artists. Discover members, discography, and music videos.",
  },
};

export default function ArtistPage() {
  if (artists.length === 1) {
    redirect(`/artist/${artists[0].id}`);
  }

  return <ArtistListClient artists={artists} />;
}
