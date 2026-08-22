"use client";

import { useState } from "react";

import { Check, Copy } from "lucide-react";

import type { HighlightedFile } from "./exhibit-sources";

interface ExhibitCodeProps {
  files: HighlightedFile[];
}

/**
 * Read-only source viewer: one tab per file, Shiki-highlighted HTML,
 * copy button per file. Highlighting happens at build time; this
 * component only switches tabs and copies raw code.
 */
export function ExhibitCode({ files }: ExhibitCodeProps) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  if (files.length === 0) return null;

  const file = files[active];

  const copy = async () => {
    await navigator.clipboard.writeText(file.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-sm border border-border">
      {/* File tabs */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] border-b border-border bg-card">
        <div className="min-w-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div
            role="tablist"
            aria-label="Source files"
            className="flex w-max min-w-full"
          >
            {files.map((f, i) => (
              <button
                key={f.name}
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setCopied(false);
                }}
                className={`focus-visible:ring-ring relative min-h-11 shrink-0 border-r border-border px-4 py-2.5 font-mono text-[11px] tracking-wide transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${
                  i === active
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f.name}
                {i === active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px bg-background"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${file.name}`}
          className="focus-visible:ring-ring z-10 inline-flex min-h-11 min-w-[4.75rem] items-center justify-center gap-1.5 border-l border-border bg-card px-2 font-mono text-[11px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          {copied ? (
            <>
              <Check aria-hidden className="size-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy aria-hidden className="size-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {files.length > 1 && (
        <p className="border-b border-border bg-muted/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground sm:hidden">
          <span aria-hidden>↔</span> Swipe file tabs
        </p>
      )}

      {/* Highlighted source (build-time Shiki output) */}
      <div
        role="tabpanel"
        className="lab-code max-h-[32rem] overflow-auto"
        // Shiki output is generated at build time from repo-owned sources
        dangerouslySetInnerHTML={{ __html: file.html }}
      />
    </div>
  );
}
