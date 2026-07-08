import type { Metadata } from "next";
import "./globals.css";

import { profile, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.objective,
  keywords: [
    "Thoriq Fadhilah Ajiji",
    "Software Engineer",
    "Backend Developer",
    "Full Stack Developer",
    "Next.js Portfolio",
  ],
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.objective,
    url: siteUrl,
    siteName: `${profile.name} Portfolio`,
    type: "website",
    images: [
      {
        url: "/images/og-cover.webp",
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio cover`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: profile.objective,
    images: ["/images/og-cover.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
    >
      <body>{children}</body>
    </html>
  );
}
