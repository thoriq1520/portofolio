import type { Metadata, Viewport } from "next";
import "./globals.css";

import { MotionShell } from "@/components/motion-shell";
import { ogImage, profile, siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | ${profile.role}`,
    template: `%s | ${profile.name}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/images/tfa-logo.svg", type: "image/svg+xml" }],
    shortcut: "/images/tfa-logo.svg",
  },
  keywords: [
    profile.name,
    "Software Engineer",
    "Software Engineer Indonesia",
    "Backend Developer",
    "Full Stack Developer",
    "QA Engineer",
    "Golang Developer",
    "Java Spring Boot Developer",
    "React Developer",
    "Next.js Portfolio",
    "Bandung Software Engineer",
  ],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: siteDescription,
    url: "/",
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio cover`,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.role}`,
    description: siteDescription,
    images: [{ url: ogImage, alt: `${profile.name} portfolio cover` }],
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#f3f3f3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme')==='dark'?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t}catch{}` }} />
      </head>
      <body>
        <MotionShell>{children}</MotionShell>
      </body>
    </html>
  );
}
