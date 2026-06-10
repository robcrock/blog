"use client";

import { useEffect, useState } from "react";

import { normalize } from "./math";

/**
 * Native port of the "particles-in-react" sandbox — a like button that
 * pops, shifts color, and scatters twinkling particles. Particle motion
 * runs entirely in CSS; React only owns the particle list.
 */

const MIN_DISTANCE = 32;
const MAX_DISTANCE = 64;
const MIN_FADE_DURATION = 500;
const MAX_FADE_DURATION = 1500;
const MAX_FADE_DELAY = 500;
const MAX_FADE_ADJUST = 200;
const PARTICLE_DELAY = 150;
const NUM_OF_PARTICLES = 20;

const MAX_PARTICLE_AGE =
  MAX_FADE_DURATION + MAX_FADE_DELAY + MAX_FADE_ADJUST + PARTICLE_DELAY;

const random = (min: number, max: number, float = false) => {
  const value = Math.random() * (max - min) + min;
  return float ? value : Math.floor(value);
};

interface Particle {
  id: string;
  angle: number;
  distance: number;
  color: string;
  hueRotation: number;
  fadeDuration: number;
  fadeDelay: number;
  popDuration: number;
  size: number;
  twinkleDuration: number;
  twinkleAmount: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, index) => {
    const angle = normalize(index, 0, count, 0, 360) + random(-40, 40);
    const distance = random(MIN_DISTANCE, MAX_DISTANCE);

    return {
      id: crypto.randomUUID(),
      angle,
      distance,
      color: `hsl(${random(0, 360)} 90% 85%)`,
      hueRotation: random(180, 720),
      fadeDuration:
        normalize(
          distance,
          MIN_DISTANCE,
          MAX_DISTANCE,
          MIN_FADE_DURATION,
          MAX_FADE_DURATION
        ) + random(-200, 200),
      fadeDelay:
        normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 0, MAX_FADE_DELAY) +
        random(0, MAX_FADE_ADJUST),
      popDuration:
        normalize(distance, MIN_DISTANCE, MAX_DISTANCE, 400, 800) +
        random(-200, 200),
      size: random(9, 15),
      twinkleDuration: random(150, 300),
      twinkleAmount: random(0.325, 1, true),
    };
  });
}

const STYLES = `
@keyframes lab-like-twinkle {
  from { opacity: var(--twinkle-amount); }
  to { opacity: 1; }
}
@keyframes lab-like-hue-rotate {
  to { filter: hue-rotate(var(--hue-rotation)); }
}
@keyframes lab-like-fade-out {
  to { opacity: 0; }
}
@keyframes lab-like-fade-from-opaque {
  from { opacity: 1; }
}
@keyframes lab-like-color-shift {
  from { background: var(--from-color); }
}
@keyframes lab-like-disperse {
  to {
    transform: translate(
      calc(cos(var(--angle)) * var(--distance)),
      calc(sin(var(--angle)) * var(--distance))
    );
  }
}
@keyframes lab-like-from-shrunken {
  from { transform: scale(0); }
}
.lab-like-particle {
  position: absolute;
  inset: 0;
  width: var(--size);
  height: var(--size);
  margin: auto;
  border-radius: 50%;
  background: var(--color);
  pointer-events: none;
  animation:
    lab-like-twinkle var(--twinkle-duration) infinite alternate ease-in-out,
    lab-like-fade-out var(--fade-duration) var(--fade-delay) forwards,
    lab-like-hue-rotate 1000ms linear forwards,
    lab-like-disperse var(--pop-duration) forwards cubic-bezier(0.2, 0.56, 0, 1);
}
.lab-like-btn {
  --red: hsl(350deg 100% 50%);
  position: relative;
  padding: 16px;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.lab-like-btn:hover { background: hsl(0deg 0% 100% / 0.1); }
.lab-like-btn:hover path { stroke: var(--red); }
.lab-like-btn svg {
  position: relative;
  display: block;
  width: 3rem;
  height: 3rem;
  overflow: visible;
}
.lab-like-btn path {
  stroke: white;
  stroke-width: 2px;
  stroke-linecap: round;
}
.lab-like-btn.liked svg {
  animation: lab-like-from-shrunken 2000ms var(--pop-circle-duration) backwards linear(0, 0.04 1.1%, 0.156 2.3%, 1.015 8.5%, 1.157 10.4%, 1.217 12.4%, 1.217 13.6%, 1.193 15%, 0.992 21.7%, 0.964 23.5%, 0.952 25.3%, 0.957 27.9%, 1.002 34.7%, 1.01 38.2%, 0.998 51%, 1);
}
.lab-like-btn.liked path {
  fill: var(--red);
  stroke: var(--red);
}
.lab-like-pop-circle {
  --from-color: hsl(350deg 100% 60%);
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background-color: hsl(270deg 100% 80%);
  opacity: 0;
  animation:
    lab-like-from-shrunken var(--pop-circle-duration),
    lab-like-color-shift var(--pop-circle-duration) forwards,
    lab-like-fade-from-opaque 300ms var(--pop-circle-duration) backwards;
}
`;

export function LikeButtonExhibit() {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Dispose of faded-out particles once the button has settled
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setParticles([]);
    }, MAX_PARTICLE_AGE + 200);
    return () => window.clearTimeout(timeoutId);
  }, [isLiked]);

  return (
    <div className="absolute inset-0 grid place-content-center bg-[hsl(210,15%,6%)]">
      <style>{STYLES}</style>
      <button
        type="button"
        className={isLiked ? "lab-like-btn liked" : "lab-like-btn"}
        style={{ "--pop-circle-duration": `${PARTICLE_DELAY}ms` } as React.CSSProperties}
        onClick={() => {
          setIsLiked(!isLiked);
          if (isLiked) return;

          // Particles appear just after the pop circle has popped
          window.setTimeout(() => {
            setParticles((current) => [
              ...current,
              ...generateParticles(NUM_OF_PARTICLES),
            ]);
          }, PARTICLE_DELAY);
        }}
      >
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="lab-like-particle"
            style={
              {
                "--angle": `${particle.angle}deg`,
                "--distance": `${particle.distance}px`,
                "--size": `${particle.size}px`,
                "--fade-duration": `${particle.fadeDuration}ms`,
                "--fade-delay": `${particle.fadeDelay}ms`,
                "--pop-duration": `${particle.popDuration}ms`,
                "--color": particle.color,
                "--hue-rotation": `${particle.hueRotation}deg`,
                "--twinkle-amount": particle.twinkleAmount,
                "--twinkle-duration": `${particle.twinkleDuration}ms`,
              } as React.CSSProperties
            }
          />
        ))}

        {isLiked && <span className="lab-like-pop-circle" />}

        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3.68546 5.43796C8.61936 1.29159 11.8685 7.4309 12.0406 7.4309C12.2126 7.43091 15.4617 1.29159 20.3956 5.43796C26.8941 10.8991 13.5 21.8215 12.0406 21.8215C10.5811 21.8215 -2.81297 10.8991 3.68546 5.43796Z" />
        </svg>

        <span className="sr-only">Like this post</span>
      </button>
    </div>
  );
}
