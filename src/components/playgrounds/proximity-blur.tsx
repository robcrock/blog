import { useCallback, useEffect, useRef, useState } from "react";

// --- Types ---
interface Point {
  x: number;
  y: number;
}

interface LayerConfig {
  count: number;
  radius: number;
  size: number;
  hue: number;
  lightness: number;
  rotate: number;
}

interface DebugOverlayProps {
  distance: number;
  blur: number;
  translateY: number;
}

interface ProximityValues {
  blur: number;
  translateY: number;
  distance: number;
}

// --- Utilities ---
const clamp = (value: number, min = 0, max = 1): number => {
  if (min > max) [min, max] = [max, min];
  return Math.max(min, Math.min(max, value));
};

const normalize = (
  number: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number => {
  const standardNormalization =
    (number - currentMin) / (currentMax - currentMin);
  return (newMax - newMin) * standardNormalization + newMin;
};

const clampedNormalize = (
  value: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number => {
  return clamp(
    normalize(value, currentMin, currentMax, newMin, newMax),
    newMin,
    newMax
  );
};

const getDistanceBetweenPoints = (p1: Point, p2: Point): number => {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};

// --- Debug overlay showing distance ---
function DebugOverlay({ distance, blur, translateY }: DebugOverlayProps) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: -128,
        left: "50%",
        transform: "translateX(-50%)",
        fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
        fontSize: 16,
        color: "hsl(210deg 15% 50%)",
        whiteSpace: "nowrap",
        letterSpacing: "0.02em",
        display: "flex",
        gap: 16,
      }}
    >
      <span>
        dist:{" "}
        <span style={{ color: "hsl(210deg 15% 72%)" }}>
          {distance.toFixed(0)}px
        </span>
      </span>
      <span>
        blur:{" "}
        <span style={{ color: "hsl(210deg 15% 72%)" }}>
          {blur.toFixed(1)}px
        </span>
      </span>
      <span>
        y:{" "}
        <span style={{ color: "hsl(210deg 15% 72%)" }}>
          {translateY.toFixed(1)}px
        </span>
      </span>
    </div>
  );
}

// --- Main component ---
export function ProximityBlur() {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [values, setValues] = useState<ProximityValues>({
    blur: 8,
    translateY: 16,
    distance: 300,
  });

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const cursorPoint = { x: event.clientX, y: event.clientY };
    const box = anchor.getBoundingClientRect();
    const centerPoint = {
      x: box.left + box.width / 2,
      y: box.top + box.height / 2,
    };

    const distance = getDistanceBetweenPoints(cursorPoint, centerPoint);

    const blur = clampedNormalize(distance, 200, 60, 8, 0);
    const translateY = clampedNormalize(distance, 200, 40, 16, 0);

    setValues({ blur, translateY, distance });
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [handlePointerMove]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px 148px",
        background: "hsl(210deg 15% 6%)",
        borderRadius: 12,
        position: "relative",
        overflow: "hidden",
        minHeight: 420,
        userSelect: "none",
      }}
    >
      {/* Subtle grid background */}
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
          marginBottom: 32,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          position: "relative",
        }}
      >
        Move your cursor closer
      </p>

      {/* The interactive element */}
      <div
        style={{
          position: "relative",
          width: 180,
          height: 220,
          cursor: "pointer",
        }}
      >
        {/* Static anchor for distance calculation - does not move with the image */}
        <div
          ref={anchorRef}
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 1,
            height: 1,
            pointerEvents: "none",
            visibility: "hidden",
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            filter: `blur(${values.blur}px)`,
            transform: `translateY(${values.translateY}px)`,
            transition: "filter 0.05s linear, transform 0.05s linear",
            willChange: "filter, transform",
          }}
        >
          <img
            src="/images/posts/cursor-interactions/succulent.png"
            alt="A succulent in a small pot"
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              marginTop: "64px",
            }}
          />
        </div>

        <DebugOverlay
          distance={values.distance}
          blur={values.blur}
          translateY={values.translateY}
        />
      </div>

      {/* Distance ring visualization */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 400,
          height: 400,
          marginLeft: -200,
          marginTop: -170,
          borderRadius: "50%",
          border: "1px dashed hsl(210deg 15% 16%)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -30,
          borderRadius: "50%",
          border: "1px dashed hsl(185deg 40% 24%)",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />
    </div>
  );
}
