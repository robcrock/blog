"use client";

import { toast } from "sonner";

const VARIANTS = [
  { type: "success", label: "Success", message: "Saved. Everything is in its place." },
  { type: "error", label: "Error", message: "That didn't work. Worth another try." },
  { type: "info", label: "Info", message: "Toasts stack, pause on hover, and time out." },
] as const;

export function ToastExhibit() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {VARIANTS.map(({ type, label, message }) => (
          <button
            key={type}
            type="button"
            onClick={() => toast[type](message)}
            className="h-11 rounded border border-border bg-card px-5 text-base font-medium transition-colors duration-200 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        renders at the viewport edge
      </p>
    </div>
  );
}
