export const normalize = (
  number,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  // First, normalize the value between 0 and 1.
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  // Next, transpose that value to our desired scale.
  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
};

export const convertDegreesToRadians = (angle) => (angle * Math.PI) / 180;

export const convertPolarToCartesian = (angle, distance) => {
  const angleInRadians = convertDegreesToRadians(angle);
  const x = Math.cos(angleInRadians) * distance;
  const y = Math.sin(angleInRadians) * distance;

  return [x, y];
};
