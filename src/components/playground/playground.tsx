// src/components/playground/Playground.tsx
"use client";

import { cn } from "@/lib/utils";

import { PlaygroundProps } from "./types";

export function Playground({
  title,
  description,
  className = "",
  children,
}: PlaygroundProps) {
  return (
    // Spans full grid width for visual impact
    <div
      className={cn(
        "col-span-3 col-start-1 my-8",
        "overflow-hidden rounded-lg border border-border",
        "bg-background",
        className
      )}
    >
      {title && (
        <div className="px-6 py-4 border-b border-border">
          <h3 className="mb-1 text-xl font-bold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
