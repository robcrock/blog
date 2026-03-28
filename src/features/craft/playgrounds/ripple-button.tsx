import type { CSSProperties, ReactNode } from "react";
import { useCallback, useRef, useState } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonComponentProps {
  children?: ReactNode;
  style?: CSSProperties;
}

function RippleButtonComponent({
  children = "Click me",
  style = {},
}: RippleButtonComponentProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const nextId = useRef(0);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // Respect reduced motion preferences
      if (
        !window.matchMedia("(prefers-reduced-motion: no-preference)").matches
      ) {
        return;
      }

      const button = buttonRef.current;
      if (!button) return;

      const bb = button.getBoundingClientRect();
      const x = event.clientX - bb.left;
      const y = event.clientY - bb.top;
      const id = nextId.current++;

      setRipples((prev) => [...prev, { id, x, y }]);
    },
    []
  );

  const handleAnimationEnd = useCallback(
    (id: number, animationName: string) => {
      // Only remove after the fade completes, not after grow
      if (animationName === "rippleFade") {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }
    },
    []
  );

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "12px 32px",
        fontSize: 15,
        fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: "white",
        background: "hsl(210deg 15% 14%)",
        border: "1px solid hsl(210deg 15% 22%)",
        borderRadius: 8,
        cursor: "pointer",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          onAnimationEnd={(e) => handleAnimationEnd(ripple.id, e.animationName)}
          style={{
            position: "absolute",
            width: 100,
            height: 100,
            left: ripple.x,
            top: ripple.y,
            translate: "-50% -50%",
            borderRadius: "50%",
            background: "white",
            opacity: 0.15,
            pointerEvents: "none",
            animation:
              "rippleGrow 400ms forwards cubic-bezier(0.4, 0.4, 0, 1), rippleFade 400ms 200ms forwards",
          }}
        />
      ))}
    </button>
  );
}

// --- Demo wrapper ---
export function RippleButtonDemo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        padding: "64px 20px",
        background: "hsl(210deg 15% 6%)",
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Inject keyframes */}
      <style>{`
        @keyframes rippleGrow {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        @keyframes rippleFade {
          to { opacity: 0; }
        }
      `}</style>

      {/* Subtle dot grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(210deg 15% 14%) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Label */}
      <p
        style={{
          fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
          fontSize: 12,
          color: "hsl(210deg 15% 40%)",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          margin: 0,
          position: "relative",
        }}
      >
        Click anywhere on the button
      </p>

      {/* Button variants */}
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <RippleButtonComponent>Click me</RippleButtonComponent>
        <RippleButtonComponent
          style={{
            background: "hsl(185deg 50% 18%)",
            borderColor: "hsl(185deg 40% 28%)",
            padding: "12px 48px",
          }}
        >
          Submit
        </RippleButtonComponent>
        <RippleButtonComponent
          style={{
            background: "transparent",
            borderColor: "hsl(210deg 15% 28%)",
            borderStyle: "dashed",
          }}
        >
          Ghost variant
        </RippleButtonComponent>
      </div>

      {/* Explanation */}
      <p
        style={{
          fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
          fontSize: 11,
          color: "hsl(210deg 15% 32%)",
          textAlign: "center",
          maxWidth: 380,
          lineHeight: 1.6,
          margin: 0,
          position: "relative",
        }}
      >
        The ripple spawns at your exact click coordinates. Two staggered
        animations — grow then fade — create the expanding wave effect.
      </p>
    </div>
  );
}
