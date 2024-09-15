import React from "react";

import { cn } from "@/lib/utils";

import styles from "./Card.module.css";

function Card({
  children,
  className,
  ...delegated
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <div className={cn(styles.wrapper, className)} {...delegated}>
      {children}
    </div>
  );
}

export default Card;
