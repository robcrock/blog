"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Native port of the "animated-timer" sandbox — a countdown pill whose
 * ring drains and hand sweeps via SMIL, both triggered by the play
 * button through SMIL's element-id event syntax.
 */

const PLAY_ID = "lab-timer-play";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${minutes}:${String(remaining).padStart(2, "0")}`;
};

export function TimerExhibit() {
  const animateRef = useRef<SVGElement>(null);
  const [startTime, setStartTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;
    const intervalId = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
        }
        return Math.max(0, prev - 1);
      });
    }, 1000);
    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  const adjustTime = (delta: number) => {
    const nextTime = Math.max(0, timeLeft + delta);
    setTimeLeft(nextTime);
    setStartTime(nextTime);
  };

  const buttonClasses =
    "rounded-full border border-[#313131] bg-[#222222] px-3 py-1 text-sm font-medium text-[#eeeeee] transition-opacity duration-200 hover:bg-[#2a2a2a] disabled:opacity-50";

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#191919]">
      <div className="flex w-[240px] items-center justify-between gap-4 rounded-full bg-black pr-5 text-[#f6a11e]">
        <svg viewBox="0 0 24 24" width="56" strokeWidth="1.5">
          <g fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="6" opacity="0.2" />
            <circle
              cx="12"
              cy="12"
              r="6"
              strokeLinecap="round"
              strokeDasharray="38"
              strokeDashoffset="0"
              transform="rotate(-90 12 12)"
            >
              <animate
                ref={animateRef}
                attributeName="stroke-dashoffset"
                from="0"
                to="38"
                fill="freeze"
                begin={`${PLAY_ID}.click`}
              />
            </circle>
          </g>
          <line
            x1="12"
            y1="8"
            x2="12"
            y2="10"
            stroke="currentColor"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="-360 12 12"
              dur={`${startTime}s`}
              begin={`${PLAY_ID}.click`}
            />
          </line>
        </svg>
        <p className="text-2xl font-medium tabular-nums">
          {formatTime(timeLeft)}
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-1.5">
        <button
          type="button"
          className={buttonClasses}
          disabled={isRunning}
          onClick={() => adjustTime(-10)}
          aria-label="Subtract ten seconds"
        >
          −
        </button>
        <button
          type="button"
          id={PLAY_ID}
          className={buttonClasses}
          disabled={isRunning}
          onClick={() => {
            if (timeLeft !== startTime) {
              setTimeLeft(startTime);
            }
            animateRef.current?.setAttribute("dur", `${startTime}s`);
            setIsRunning(!isRunning);
          }}
        >
          Play
        </button>
        <button
          type="button"
          className={buttonClasses}
          disabled={isRunning}
          onClick={() => adjustTime(10)}
          aria-label="Add ten seconds"
        >
          +
        </button>
      </div>
    </div>
  );
}
