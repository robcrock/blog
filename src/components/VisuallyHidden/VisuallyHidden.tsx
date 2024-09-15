import React from "react";

import { cn } from "@/lib/utils";

import styles from "./VisuallyHidden.module.css";

function VisuallyHidden({
  as: Element = "span",
  className,
  children,
  ...delegated
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <Element className={cn(styles.wrapper, className)} {...delegated}>
      {children}
    </Element>
  );
}

export default VisuallyHidden;
