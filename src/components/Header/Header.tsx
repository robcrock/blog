"use client"

import React from "react"
import clsx from "clsx"
import { Sun, Moon } from "react-feather"
import Cookies from "js-cookie"

import Logo from "../Logo"
import VisuallyHidden from "../VisuallyHidden"

import styles from "./Header.module.css"
import {
  COLOR_THEME_COOKIE_NAME,
  DARK_TOKENS,
  LIGHT_TOKENS,
} from "../../constants"

function Header({ initialTheme, className, ...delegated }: { initialTheme: 'light' | 'dark', className?: string, [key: string]: any }) {
  const [theme, setTheme] = React.useState(initialTheme)

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    Cookies.set(COLOR_THEME_COOKIE_NAME, newTheme, { expires: 1000 })

    const newTokens = newTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS

    const root = document.documentElement

    root.setAttribute("data-color-theme", newTheme)
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action} onClick={handleToggleTheme}>
          {theme === "light" ? <Moon size="1.5rem" /> : <Sun size="1.5rem" />}
          <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
        </button>
      </div>
    </header>
  )
}

export default Header