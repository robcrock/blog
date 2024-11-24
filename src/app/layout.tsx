import React, { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
});

const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
});

export const metadata = {
  title:
    "Robert Crocker - Developer, community builder, and creator of useful things",
  description: "Personal website of Robert Crocker",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${mainFont.variable} ${monoFont.variable}`}
    >
      <body className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
