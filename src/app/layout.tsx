import React from "react"
import { Work_Sans, Spline_Sans_Mono } from "next/font/google"
import clsx from "clsx"
import { cookies } from "next/headers"
import { ReactNode } from "react"

import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  BLOG_TITLE,
  COLOR_THEME_COOKIE_NAME,
} from "../constants"

import Header from "../components/Header"
import Footer from "../components/Footer"
import "./styles.css"
import RespectMotionPreferences from "../components/RespectMotionPreferences/RespectMotionPreferences"
import { ThemeProvider } from "@/components/theme-provider"

const mainFont = Work_Sans({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family",
})
const monoFont = Spline_Sans_Mono({
  subsets: ["latin"],
  display: "fallback",
  weight: "variable",
  variable: "--font-family-mono",
})

export const metadata = {
  title: BLOG_TITLE,
  description: "A place for me to share what I'm learning.",
}

function RootLayout({ children }: { children: ReactNode }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME)
  const theme = savedTheme?.value || "light"

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS as React.CSSProperties : DARK_TOKENS as React.CSSProperties}
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
  )
}

export default RootLayout
