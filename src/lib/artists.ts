export interface ArtistMember {
  name: string;
  nameKo: string;
  birth: string;
  photo: string;
}

export interface ArtistAlbum {
  title: string;
  type: string;
  release: string;
  cover: string;
}

export interface ArtistMusicVideo {
  title: string;
  youtubeId: string;
}

export interface Artist {
  id: string;
  name: string;
  logo: string;
  photo: string;
  socials: {
    tiktok?: string;
    instagram?: string;
    x?: string;
    youtube?: string;
    website?: string;
  };
  members: ArtistMember[];
  albums: ArtistAlbum[];
  musicVideos: ArtistMusicVideo[];
}

export const artists: Artist[] = [
  {
    id: "tunexx",
    name: "TUNEXX",
    logo: "/artists/tunexx-logo.svg",
    photo: "/artists/tunexx.jpg",
    socials: {
      tiktok: "https://www.tiktok.com/@tunexx_official",
      instagram: "https://www.instagram.com/tunexx_official",
      x: "https://x.com/TUNEXX_official",
      youtube: "https://www.youtube.com/@official_TUNEXX",
      website: "https://www.tunexx.co.kr",
    },
    members: [
      { name: "Donggyu", nameKo: "동규", birth: "2005.03.16", photo: "/artists/tunexx-members/donggyu.jpg" },
      { name: "Inhu", nameKo: "인후", birth: "2005.01.22", photo: "/artists/tunexx-members/inhu.jpg" },
      { name: "Taira", nameKo: "타이라", birth: "2005.04.03", photo: "/artists/tunexx-members/taira.jpg" },
      { name: "Sungjun", nameKo: "성준", birth: "2005.07.18", photo: "/artists/tunexx-members/sungjun.jpg" },
      { name: "Zeon", nameKo: "제온", birth: "2005.07.20", photo: "/artists/tunexx-members/zeon.jpg" },
      { name: "Sihwan", nameKo: "시환", birth: "2005.11.28", photo: "/artists/tunexx-members/sihwan.jpg" },
      { name: "Arctic", nameKo: "아틱", birth: "2008.10.09", photo: "/artists/tunexx-members/arctic.jpg" },
    ],
    albums: [
      { title: "Set By Us Only", type: "1st Mini Album", release: "2026.02.17", cover: "/artists/tunexx-albums/set-by-us-only.jpg" },
    ],
    musicVideos: [
      { title: "UNSET", youtubeId: "cQESe4Jc0rE" },
    ],
  },
];

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

export function getAllArtistIds(): string[] {
  return artists.map((a) => a.id);
}
