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
      <div className="flex items-center justify-between border-b border-border bg-card">
        <div role="tablist" aria-label="Source files" className="flex">
          {files.map((f, i) => (
            <button
              key={f.name}
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setActive(i);
                setCopied(false);
              }}
              className={`relative border-r border-border px-4 py-2.5 font-mono text-[11px] tracking-wide transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
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

        <button
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${file.name}`}
          className="mr-2 inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
