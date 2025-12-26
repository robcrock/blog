// src/components/playground/controls/SelectControl.tsx
"use client";

import { cn } from "@/lib/utils";

import { SelectControlProps } from "../types";

export function SelectControl<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: SelectControlProps<T>) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          "px-3 py-2 w-full rounded",
          "border bg-background border-input",
          "text-sm text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "cursor-pointer"
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
