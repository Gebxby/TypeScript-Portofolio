const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
]);

const EMBED_BASE_URL = "https://www.youtube.com/embed";

export function toYouTubeEmbedUrl(input: string) {
  if (!input) {
    return null;
  }

  const candidate = input.trim();
  if (!candidate) {
    return null;
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(candidate);
  } catch {
    return null;
  }

  if (!YOUTUBE_HOSTS.has(parsedUrl.hostname)) {
    return null;
  }

  let videoId = "";
  const pathParts = parsedUrl.pathname.split("/").filter(Boolean);

  if (parsedUrl.hostname === "youtu.be") {
    videoId = pathParts[0] ?? "";
  } else if (pathParts[0] === "watch") {
    videoId = parsedUrl.searchParams.get("v") ?? "";
  } else if (pathParts[0] === "embed" || pathParts[0] === "shorts" || pathParts[0] === "live") {
    videoId = pathParts[1] ?? "";
  }

  if (!videoId) {
    return null;
  }

  return `${EMBED_BASE_URL}/${videoId}`;
}
