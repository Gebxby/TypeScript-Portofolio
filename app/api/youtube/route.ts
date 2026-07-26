// app/api/youtube/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = "UCRgN9SE-nP2wimWcY1QiHYg";

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${API_KEY}`
  );

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    return NextResponse.json({ error: "Channel not found" }, { status: 404 });
  }

  return NextResponse.json(data.items[0]);
}
