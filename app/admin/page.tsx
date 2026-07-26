import { getHomeContent } from "@/lib/homeContent";
import AdminContentEditor from "./AdminContentEditor";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin | Gabriel Portfolio",
};

export default async function AdminPage() {
  const content = await getHomeContent();
  const passwordHint = process.env.ADMIN_PASSWORD
    ? "Using ADMIN_PASSWORD from environment."
    : process.env.NODE_ENV === "production"
      ? "Set ADMIN_PASSWORD in production to enable saving."
      : "Local default password: admin123";

  return <AdminContentEditor initialContent={content} passwordHint={passwordHint} />;
}
