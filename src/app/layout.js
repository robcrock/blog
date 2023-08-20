import React from "react"
import { Work_Sans, Spline_Sans_Mono } from "next/font/google"
import clsx from "clsx"

import { LIGHT_TOKENS, DARK_TOKENS, BLOG_TITLE } from "../constants"

import Header from "../components/Header"
import Footer from "../components/Footer"
import "./styles.css"
import RespectMotionPreferences from "../components/RespectMotionPreferences/RespectMotionPreferences"

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

function RootLayout({ children }) {
  // TODO: Dynamic theme depending on user preference
  const theme = "light"

  return (
    <RespectMotionPreferences>
      <html
        lang="en"
        className={clsx(mainFont.variable, monoFont.variable)}
        data-color-theme={theme}
        style={theme === "light" ? LIGHT_TOKENS : DARK_TOKENS}
      >
        <body>
          <Header theme={theme} />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </RespectMotionPreferences>
  )
}

export default RootLayout
