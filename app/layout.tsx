import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gabriel Fenanlampir | Portfolio",
  description:
    "Portfolio of Gabriel Selwas Aboyaman Fenanlampir, a computer science student focused on frontend engineering, UI design, and creative technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
