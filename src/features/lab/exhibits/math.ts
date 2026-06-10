export interface Point {
  x: number;
  y: number;
}

export const clamp = (value: number, min = 0, max = 1): number => {
  if (min > max) [min, max] = [max, min];
  return Math.max(min, Math.min(max, value));
};

export const normalize = (
  value: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number => {
  const t = (value - currentMin) / (currentMax - currentMin);
  return (newMax - newMin) * t + newMin;
};

export const clampedNormalize = (
  value: number,
  currentMin: number,
  currentMax: number,
  newMin = 0,
  newMax = 1
): number =>
  clamp(normalize(value, currentMin, currentMax, newMin, newMax), newMin, newMax);

export const distanceBetween = (p1: Point, p2: Point): number => {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX ** 2 + deltaY ** 2);
};
