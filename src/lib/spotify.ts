// Spotify API 유틸리티

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let accessToken: string | null = null;
let tokenExpiry: number = 0;

// Access Token 발급 (Client Credentials Flow)
async function getAccessToken(): Promise<string> {
  // 토큰이 유효하면 재사용
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error("Spotify credentials not configured");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify access token");
  }

  const data = await response.json();
  accessToken = data.access_token;
  // 토큰 만료 시간 설정 (약간의 여유를 두고)
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return accessToken;
}

// 아티스트 검색 및 이미지 가져오기
export async function searchArtist(artistName: string): Promise<{
  name: string;
  imageUrl: string | null;
  spotifyUrl: string | null;
} | null> {
  try {
    const token = await getAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        artistName
      )}&type=artist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      console.error("Spotify search failed:", response.status);
      return null;
    }

    const data = await response.json();
    const artist = data.artists?.items?.[0];

    if (!artist) {
      return null;
    }

    return {
      name: artist.name,
      imageUrl: artist.images?.[0]?.url || null, // 가장 큰 이미지
      spotifyUrl: artist.external_urls?.spotify || null,
    };
  } catch (error) {
    console.error("Error searching artist:", error);
    return null;
  }
}

// 여러 아티스트 이미지 한번에 가져오기
export async function getArtistImages(
  artistNames: string[]
): Promise<Map<string, string | null>> {
  const results = new Map<string, string | null>();

  await Promise.all(
    artistNames.map(async (name) => {
      const artist = await searchArtist(name);
      results.set(name, artist?.imageUrl || null);
    })
  );

  return results;
}
