"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

export function Logo(props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-full bg-gray-500/50" />;
  }

  return resolvedTheme === "dark" ? (
    <DarkLogo {...props} />
  ) : (
    <LightLogo {...props} />
  );
}

const LightLogo = (props) => {
  // LightLogo SVG component remains unchanged
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 7.034L38.615 43.39a1 1 0 01-.764 1.644H8v-38z"
        fill="#000"
        fillOpacity={0.6}
      />
      <g filter="url(#filter0_d_185_3550)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.02 6.966H8v31h18.02v-.009C34.34 37.683 41 30.86 41 22.483c0-8.377-6.66-15.2-14.98-15.474v-.043z"
          fill="#000"
          fillOpacity={0.6}
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_185_3550"
          x={0}
          y={0.965637}
          width={48}
          height={47.0001}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.984912 0 0 0 0 0.984912 0 0 0 0 0.984912 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_185_3550"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_185_3550"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

const DarkLogo = (props) => {
  // DarkLogo SVG component remains unchanged
  return (
    <svg
      width={48}
      height={46}
      viewBox="0 0 48 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 5.069l30.615 36.355a1 1 0 01-.764 1.645H8v-38z"
        fill="#fff"
        fillOpacity={0.6}
      />
      <g filter="url(#filter0_d_353_853)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.02 5H8v31h18.02v-.008C34.34 35.718 41 28.894 41 20.517c0-8.377-6.66-15.2-14.98-15.474V5z"
          fill="#fff"
          fillOpacity={0.6}
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_353_853"
          x={0}
          y={-1}
          width={49}
          height={47.0001}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2} />
          <feGaussianBlur stdDeviation={4} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.984912 0 0 0 0 0.984912 0 0 0 0 0.984912 0 0 0 0.25 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_353_853"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_353_853"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Logo;
