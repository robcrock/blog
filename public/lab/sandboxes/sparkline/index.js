import { normalize } from "./utils.js";

const SVG_WIDTH = 200;
const SVG_HEIGHT = 100;

function drawSparkLine(svg, values) {
  svg.setAttribute("width", SVG_WIDTH);
  svg.setAttribute("height", SVG_HEIGHT);

  const yScale = (val) => normalize(val, 0, 20, SVG_HEIGHT, 0);
  const xScale = (val) => normalize(val, 0, values.length - 1, 0, SVG_WIDTH);

  const pointsString = values.reduce((acc, cur, i) => {
    const xScaled = xScale(i);
    const yScaled = yScale(cur);

    acc += `${xScaled},${yScaled} `;
    return acc;
  }, "");

  const polyline = svg.querySelector("polyline");
  polyline.setAttribute("points", pointsString);
}

const data = [
  0, 5, 12, 11, 18, 5, 2, 13, 19, 20, 15, 14, 5, 6, 9, 1, 16, 20, 10, 1,
];

drawSparkLine(document.querySelector("svg"), data);
