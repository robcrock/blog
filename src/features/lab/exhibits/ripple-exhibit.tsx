"use client";

import { useCallback, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function RippleExhibit() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(0);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    // Respect reduced motion preferences
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    const bb = button.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      { id: nextId.current++, x: event.clientX - bb.left, y: event.clientY - bb.top },
    ]);
  }, []);

  const handleAnimationEnd = useCallback((id: number, animationName: string) => {
    // Remove only after the fade completes, not after grow
    if (animationName === "labRippleFade") {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(hsl(var(--muted-foreground)/0.12)_1px,transparent_1px)] [background-size:24px_24px]">
      <style>{`
        @keyframes labRippleGrow {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        @keyframes labRippleFade {
          to { opacity: 0; }
        }
      `}</style>

      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className="relative overflow-hidden rounded bg-foreground px-8 py-3 text-base font-medium text-background transition-transform duration-150 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Click me
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            onAnimationEnd={(e) => handleAnimationEnd(ripple.id, e.animationName)}
            className="pointer-events-none absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background opacity-20"
            style={{
              left: ripple.x,
              top: ripple.y,
              animation:
                "labRippleGrow 400ms forwards cubic-bezier(0.4, 0.4, 0, 1), labRippleFade 400ms 200ms forwards",
            }}
          />
        ))}
      </button>
    </div>
  );
}
