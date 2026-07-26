// /lib/getYoutubeData.ts

export async function getYoutubeChannelData() {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCRgN9SE-nP2wimWcY1QiHYg&key=AIzaSyCjbQfAbHOTk1sbfzXEm3uZD5Y-RIv0Qio`
    );
  
    if (!res.ok) throw new Error("Failed to fetch YouTube data");
  
    const data = await res.json();
    return data.items[0]; // channel info
  }
  