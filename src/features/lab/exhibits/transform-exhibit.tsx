"use client";

import { useCallback, useRef, useState } from "react";

import { clampedNormalize } from "./math";

export function TransformExhibit() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setActive(true);
    // x position → rotation, y position → scale
    setRotate(clampedNormalize(e.clientX - rect.left, 0, rect.width, -24, 24));
    setScale(clampedNormalize(e.clientY - rect.top, 0, rect.height, 1.25, 0.75));
  }, []);

  const handlePointerLeave = useCallback(() => {
    setActive(false);
    setRotate(0);
    setScale(1);
  }, []);

  return (
    <div
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="absolute inset-0 flex cursor-crosshair items-center justify-center bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]"
    >
      {/* Ghost of the identity state */}
      <div
        aria-hidden
        className="pointer-events-none absolute size-20 rounded border border-dashed border-border"
      />

      <div
        className={`size-20 rounded bg-primary motion-reduce:transition-none ${
          active
            ? "transition-transform duration-75 ease-linear"
            : "transition-transform duration-300 ease-[cubic-bezier(0.165,0.84,0.44,1)]"
        }`}
        style={{ transform: `rotate(${rotate}deg) scale(${scale})` }}
      />

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground tabular-nums">
        rotate({rotate.toFixed(0).padStart(3, "\u2007")}deg) scale(
        {scale.toFixed(2)})
      </p>
    </div>
  );
}
