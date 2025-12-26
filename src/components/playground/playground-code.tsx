// src/components/playground/PlaygroundCode.tsx
"use client";

import { cn } from "@/lib/utils";

import { PlaygroundCodeProps } from "./types";

export function PlaygroundCode({
  code,
  language = "css",
  className = "",
}: PlaygroundCodeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden mt-4 rounded",
        "bg-gray-100 dark:bg-gray-900",
        "border border-border",
        className
      )}
    >
      <pre className="overflow-x-auto p-4 text-sm md:text-base">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
