// src/components/playground/PlaygroundCanvas.tsx
"use client";

import { cn } from "@/lib/utils";

import { PlaygroundCanvasProps } from "./types";

export function PlaygroundCanvas({
  children,
  className = "",
  backgroundPattern = "none",
  fullWidth = false,
}: PlaygroundCanvasProps) {
  return (
    <div
      className={cn(
        "relative min-h-[300px] flex items-center justify-center",
        "rounded overflow-hidden",
        backgroundPattern === "dots" &&
          "bg-[radial-gradient(hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] [background-size:20px_20px]",
        backgroundPattern === "grid" &&
          "bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:20px_20px]",
        className
      )}
      data-pattern={backgroundPattern}
    >
      {children}
    </div>
  );
}
