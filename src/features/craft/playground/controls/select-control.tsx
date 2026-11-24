// src/components/playground/controls/SelectControl.tsx
"use client";

import { useId } from "react";

import { cn } from "@/shared/lib/utils";

import { SelectControlProps } from "../types";

export function SelectControl<T extends string | number>({
  label,
  value,
  onChange,
  options,
}: SelectControlProps<T>) {
  const selectId = useId();

  return (
    <div className="space-y-2">
      <label htmlFor={selectId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={selectId}
        name={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={cn(
          "min-h-11 w-full rounded px-3 py-2",
          "border-input border bg-background",
          "text-base text-foreground sm:text-sm",
          "focus:ring-ring focus:outline-hidden focus:ring-2 focus:ring-offset-2",
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
