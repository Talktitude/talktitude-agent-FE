import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talktitude-agent",
  description: "Talktitude 사담원용 웹서비스",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
