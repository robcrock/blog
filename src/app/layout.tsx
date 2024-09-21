import React, { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";

import "./styles.css";

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
    <html lang="en" className={`${mainFont.variable} ${monoFont.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
