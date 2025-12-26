// src/components/playground/controls/ButtonControl.tsx
"use client";

import { cn } from "@/lib/utils";

import { ButtonControlProps } from "../types";

export function ButtonControl({
  label,
  onClick,
  variant = "primary",
}: ButtonControlProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded font-medium text-sm",
        "transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" && [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "focus:ring-primary",
        ],
        variant === "secondary" && [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
          "focus:ring-secondary",
        ]
      )}
    >
      {label}
    </button>
  );
}
