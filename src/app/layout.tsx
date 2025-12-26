import { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import "./globals.css";

import Header from "@/components/layout/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "sonner";

export const metadata = {
  title:
    "Robert Crocker - Developer, community builder, and creator of useful things",
  description: "Personal website of Robert Crocker",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="container px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <ThemeProvider>
          <Header />
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
