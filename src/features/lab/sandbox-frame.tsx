"use client";

import { useEffect, useRef, useState } from "react";

interface SandboxFrameProps {
  src: string;
  title: string;
  /**
   * Renders the iframe at 1/scale size and scales it down, giving
   * demos designed for a full browser window a larger virtual
   * viewport so nothing overflows the fixed-height tile.
   */
  scale?: number;
}

/**
 * Lazily mounts a sandboxed demo iframe the first time the tile
 * approaches the viewport, so dozens of live demos don't all boot
 * on page load. Once mounted it stays mounted — browsers throttle
 * offscreen iframes, and remounting would flash a reload.
 */
export function SandboxFrame({ src, title, scale = 1 }: SandboxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const inverse = `${100 / scale}%`;

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Sits behind the transparent iframe while its styles stream in */}
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
      {mounted && (
        <iframe
          src={src}
          title={title}
          className="relative border-0"
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: inverse,
            height: inverse,
            transform: scale === 1 ? undefined : `scale(${scale})`,
            transformOrigin: "top left",
          }}
        />
      )}
    </div>
  );
}
