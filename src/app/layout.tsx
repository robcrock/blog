import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Spline_Sans_Mono, Work_Sans } from "next/font/google";
import { cookies } from "next/headers";

import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  BLOG_TITLE,
  COLOR_THEME_COOKIE_NAME,
  DARK_TOKENS,
  LIGHT_TOKENS,
} from "../constants";

import "./styles.css";

import { ThemeProvider } from "@/components/theme-provider";

import RespectMotionPreferences from "../components/RespectMotionPreferences/RespectMotionPreferences";

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
  title: BLOG_TITLE,
  description: "A place for me to share what I'm learning.",
};

function RootLayout({ children }: { children: ReactNode }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  const theme = savedTheme?.value || "light";

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={cn(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={
          theme === "light"
            ? (LIGHT_TOKENS as React.CSSProperties)
            : (DARK_TOKENS as React.CSSProperties)
        }
      >
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </RespectMotionPreferences>
  );
}

export default RootLayout;
