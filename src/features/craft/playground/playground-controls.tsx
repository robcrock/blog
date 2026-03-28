"use client";

import { cn } from "@/shared/lib/utils";

import { PlaygroundControlsProps } from "./types";

export function PlaygroundControls({
  children,
  className = "",
}: PlaygroundControlsProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>;
}
