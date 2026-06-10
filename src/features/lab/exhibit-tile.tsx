import { Link } from "next-view-transitions";

import type { Exhibit } from "./registry";
import { SandboxFrame } from "./sandbox-frame";

interface ExhibitTileProps {
  exhibit: Exhibit;
}

export function ExhibitTile({ exhibit }: ExhibitTileProps) {
  const { number, slug, title, description, hint, Component, src, frameScale } =
    exhibit;

  return (
    <article className="flex flex-col border-b border-r border-border bg-card">
      {/* Live canvas — freely interactive, not wrapped in a link */}
      <div
        className="relative h-64 overflow-hidden"
        style={{ viewTransitionName: `lab-canvas-${slug}` }}
      >
        {Component ? (
          <Component />
        ) : src ? (
          <SandboxFrame src={src} title={title} scale={frameScale} />
        ) : null}
      </div>

      {/* Catalog plate */}
      <div className="flex grow items-start justify-between gap-4 border-t border-border p-4">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {number}
            </span>
            <Link
              href={`/lab/${slug}`}
              className="group inline-flex items-baseline gap-2 rounded font-medium transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <h3 className="text-base">{title}</h3>
              <span
                aria-hidden
                className="font-mono text-[11px] text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                {"</>"}
              </span>
            </Link>
          </div>
          <p className="mt-1 text-pretty text-sm text-muted-foreground">
            {description}
          </p>
        </div>

        {hint && (
          <span className="shrink-0 pt-0.5 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
    </article>
  );
}
