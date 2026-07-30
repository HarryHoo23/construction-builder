import type { Metadata } from "next";
import { Bebas_Neue, Geist } from "next/font/google";
import { BRAND_COPY, ROOT_METADATA_COPY } from "@/lib/copy";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: ROOT_METADATA_COPY.defaultTitle,
    template: ROOT_METADATA_COPY.titleTemplate,
  },
  description: ROOT_METADATA_COPY.description,
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: BRAND_COPY.companyName,
    images: [
      {
        url: "/og.png",
        width: 1672,
        height: 940,
        alt: ROOT_METADATA_COPY.socialAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "scroll-smooth", bebasNeue.variable, "font-sans", geist.variable)}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
