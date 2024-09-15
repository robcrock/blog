"use client";

import React from "react";

import { cn } from "@/lib/utils";

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
    <header className={cn(styles.wrapper, className)} {...delegated}>
      <Logo />
    </header>
  );
}

export default Header;
