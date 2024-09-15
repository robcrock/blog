import React from "react";

import { cn } from "@/lib/utils";

import styles from "./Slider.module.css";

export function Slider({
  className,
  ...delegated
}: {
  className?: string;
  [key: string]: any;
}) {
  return (
    <input
      type="range"
      className={cn(styles.slider, className)}
      {...delegated}
    />
  );
}

export default Slider;
