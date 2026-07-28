import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Melbourne Residential Builder",
    template: "%s | Melbourne Residential Builder",
  },
  description:
    "Considered residential construction, dual occupancy and custom homes across Melbourne.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Melbourne Residential Builder",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
