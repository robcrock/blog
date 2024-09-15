"use client";

import React from "react";

import clsx from "clsx";

import Logo from "../Logo";
import styles from "./Header.module.css";

function Header({
  className,
  ...delegated
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <header className={clsx(styles.wrapper, className)} {...delegated}>
      <Logo />
    </header>
  );
}

export default Header;
