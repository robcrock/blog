"use client";

import { useRef, useState } from "react";

import { clampedNormalize, distanceBetween } from "./math";

interface ProximityValues {
  blur: number;
  translateY: number;
  distance: number;
}

const IDLE: ProximityValues = { blur: 10, translateY: 12, distance: 999 };

export function ProximityRevealExhibit() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<ProximityValues>(IDLE);

  function handlePointerMove(event: React.PointerEvent) {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const box = anchor.getBoundingClientRect();
    const distance = distanceBetween(
      { x: event.clientX, y: event.clientY },
      { x: box.left + box.width / 2, y: box.top + box.height / 2 }
    );

    setValues({
      blur: clampedNormalize(distance, 160, 40, 10, 0),
      translateY: clampedNormalize(distance, 160, 30, 12, 0),
      distance,
    });
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setValues(IDLE)}
      className="absolute inset-0 flex select-none items-center justify-center bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]"
    >
      {/* Static anchor for distance measurement */}
      <div
        ref={anchorRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-px"
      />

      {/* Bauhaus composition that resolves on approach */}
      <div
        className="transition-[filter,transform] duration-75 ease-linear will-change-[filter,transform] motion-reduce:transition-none"
        style={{
          filter: `blur(${values.blur}px)`,
          transform: `translateY(${values.translateY}px)`,
        }}
      >
        <svg width="132" height="120" viewBox="0 0 132 120" aria-hidden>
          <rect x="6" y="52" width="60" height="60" className="fill-foreground" />
          <circle cx="88" cy="44" r="36" className="fill-primary" />
          <polygon
            points="36,52 68,6 100,52"
            fill="none"
            strokeWidth="2.5"
            className="stroke-muted-foreground"
          />
        </svg>
      </div>

      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] tracking-wide text-muted-foreground tabular-nums">
        {values.distance > 900
          ? "move closer"
          : `dist ${values.distance.toFixed(0)}px · blur ${values.blur.toFixed(1)}px`}
      </p>
    </div>
  );
}
