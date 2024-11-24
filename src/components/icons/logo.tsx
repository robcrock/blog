export function Logo(props) {
  return (
    <svg
      width={49}
      height={48}
      viewBox="0 0 49 48"
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
}

export default Logo;
