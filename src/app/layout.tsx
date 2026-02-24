import { ReactNode } from "react";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://robcrock.com"),
  title: {
    default: "Robert Crocker - Craft obsessed developer who designs.",
    template: "%s | Robert Crocker",
  },
  description:
    "Personal website of Robert Crocker. I build useful things, write about web development, and share interactive experiments.",
  keywords: [
    "web development",
    "frontend",
    "react",
    "next.js",
    "typescript",
    "design",
    "craft",
    "portfolio",
  ],
  authors: [{ name: "Robert Crocker" }],
  creator: "Robert Crocker",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://robcrock.com",
    title: "Robert Crocker - Craft obsessed developer who designs.",
    description:
      "Personal website of Robert Crocker. I build useful things, write about web development, and share interactive experiments.",
    siteName: "Robert Crocker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Robert Crocker - Craft obsessed developer who designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Robert Crocker - Craft obsessed developer who designs.",
    description:
      "Personal website of Robert Crocker. I build useful things, write about web development, and share interactive experiments.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/icons/icon.svg",
    apple: "/icons/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="//unpkg.com/react-grab/dist/index.global.js"
              crossOrigin="anonymous"
              strategy="beforeInteractive"
            />
            <Script
              src="https://mcp.figma.com/mcp/html-to-design/capture.js"
              async
            />
          </>
        )}
      </head>
      <body className="container px-4 mx-auto max-w-6xl">
        <ThemeProvider>
          <Header />
          <main className="relative z-10">{children}</main>
          <Footer />
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
