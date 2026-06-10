export const normalize = (
  value,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1
) => {
  const standardNormalization =
    (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (
    (newScaleMax - newScaleMin) * standardNormalization + newScaleMin
  );
};

export const exponentialNormalize = (
  value,
  currentScaleMin,
  currentScaleMax,
  newScaleMin = 0,
  newScaleMax = 1,
  exponent = 2
) => {
  const normalizedInput =
    (value - currentScaleMin) / (currentScaleMax - currentScaleMin);

  const exponentialOutput = Math.pow(normalizedInput, exponent);

  return (
    newScaleMin + (newScaleMax - newScaleMin) * exponentialOutput
  );
};
