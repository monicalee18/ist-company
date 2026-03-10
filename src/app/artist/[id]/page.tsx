import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArtistById } from "@/lib/artists";
import ArtistDetailClient from "./ArtistDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const artist = getArtistById(id);
  if (!artist) return { title: "Artist Not Found" };

  return {
    title: artist.name,
    description: `${artist.name} - IST Entertainment Artist. Members, discography, and music videos.`,
    openGraph: {
      title: `${artist.name} | IST COMPANY`,
      description: `${artist.name} - IST Entertainment Artist. Members, discography, and music videos.`,
    },
  };
}

export default async function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const artist = getArtistById(id);
  if (!artist) notFound();

  return <ArtistDetailClient artist={artist} />;
}
