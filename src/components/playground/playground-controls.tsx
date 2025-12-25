"use client";

import { cn } from "@/lib/utils";

import { PlaygroundControlsProps } from "./types";

export function PlaygroundControls({
  children,
  className = "",
}: PlaygroundControlsProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}
