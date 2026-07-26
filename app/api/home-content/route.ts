import { NextRequest, NextResponse } from "next/server";
import { getHomeContent, saveHomeContent } from "@/lib/homeContent";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const getConfiguredPassword = () => {
  if (process.env.ADMIN_PASSWORD) {
    return process.env.ADMIN_PASSWORD;
  }

  return process.env.NODE_ENV === "production" ? "" : "admin123";
};

const isAuthorized = (request: NextRequest) => {
  const configuredPassword = getConfiguredPassword();
  const providedPassword = request.headers.get("x-admin-token") ?? "";

  return Boolean(configuredPassword) && providedPassword === configuredPassword;
};

export async function GET() {
  try {
    return NextResponse.json(await getHomeContent());
  } catch (error) {
    return NextResponse.json({ error: "Failed to read homepage content." }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Invalid admin password." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const content = await saveHomeContent(payload);

    return NextResponse.json({ content, message: "Homepage content saved." });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save homepage content." }, { status: 500 });
  }
}
