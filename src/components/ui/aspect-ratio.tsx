"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number;
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 16 / 9, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  )
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
