import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const range = (start: number, end?: number, step: number = 1) => {
  let output: number[] = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const clamp = (value: number, min = 0, max = 1): number => {
  if (min > max) {
    [min, max] = [max, min] as [number, number];
  }

  return Math.max(min, Math.min(max, value));
};

export const normalize = (
  number: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
): number => {
  const standardNormalization =
    (number - currentScaleMin) / (currentScaleMax - currentScaleMin);

  return (newScaleMax - newScaleMin) * standardNormalization + newScaleMin;
};

export const clampedNormalize = (
  value: number,
  currentScaleMin: number,
  currentScaleMax: number,
  newScaleMin = 0,
  newScaleMax = 1
): number => {
  return clamp(
    normalize(
      value,
      currentScaleMin,
      currentScaleMax,
      newScaleMin,
      newScaleMax
    ),
    newScaleMin,
    newScaleMax
  );
};

export function getDistanceBetweenPoints(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

/** Linear interpolation between a and b by t (0–1). */
export const lerp = (a: number, b: number, t: number): number =>
  a + t * (b - a);

// ============================================================================
// PERLIN NOISE IMPLEMENTATION - HEAVILY COMMENTED
// ============================================================================

// ============================================================================
// PERMUTATION TABLE
// ============================================================================

/**
 * The permutation table is the "secret sauce" of Perlin noise.
 * 
 * It's a shuffled array of numbers 0-255, doubled to 512 entries to avoid
 * expensive modulo operations. This table provides pseudo-random but
 * DETERMINISTIC values - the same input always gives the same output.
 * 
 * Ken Perlin chose these specific 256 values through careful testing to
 * ensure good statistical distribution. The table acts as a hash function:
 * given any grid coordinate, it produces a repeatable "random" index.
 * 
 * Why doubled? When we look up perm[x + something], we might exceed 255.
 * By doubling the table, we avoid bounds checking: perm[300] just wraps
 * around naturally since perm[300] === perm[300 & 255] === perm[44].
 */
const PERLIN_PERM: number[] = (() => {
  // The classic Perlin permutation - these exact 256 values are canonical
  const p: number[] = [
    151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
    140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234,
    75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149,
    56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166,
    77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46,
    245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208,
    89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186,
    3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212,
    207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
    152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253,
    19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251,
    34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14,
    239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50,
    45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128,
    195, 78, 66, 215, 61, 156, 180,
  ];
  
  // Double the permutation table for overflow safety
  // perm[i] === perm[i + 256] for all i in 0..255
  const perm: number[] = new Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  return perm;
})();

// ============================================================================
// FADE FUNCTION (Smoothstep)
// ============================================================================

/**
 * Perlin's improved smoothstep function: 6t⁵ - 15t⁴ + 10t³
 * 
 * This "fade" or "ease" curve is CRITICAL for smooth noise.
 * 
 * Problem it solves: If we used linear interpolation directly, we'd see
 * visible grid artifacts - harsh transitions at integer boundaries.
 * 
 * The fade curve has these magical properties:
 * - f(0) = 0 and f(1) = 1 (endpoints match)
 * - f'(0) = 0 and f'(1) = 0 (first derivative is zero at endpoints)
 * - f''(0) = 0 and f''(1) = 0 (second derivative is zero at endpoints)
 * 
 * This means the curve "lands softly" at both ends with zero velocity
 * AND zero acceleration, creating seamless continuity across grid cells.
 * 
 * Original Perlin (1985) used 3t² - 2t³, but the improved version (2002)
 * uses this quintic polynomial for even smoother results.
 * 
 * @param t - Input value (0 to 1)
 * @returns Smoothed value with continuous first and second derivatives
 */
function perlinFade(t: number): number {
  // Expanded: t³(6t² - 15t + 10) = 6t⁵ - 15t⁴ + 10t³
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// ============================================================================
// GRADIENT FUNCTION
// ============================================================================

/**
 * Compute the dot product between a pseudo-random gradient and the offset vector.
 * 
 * This is the heart of Perlin noise. At each grid point, we imagine a
 * "gradient arrow" pointing in one of 4 directions (in 2D). We compute
 * how much our sample point "agrees" with that gradient.
 * 
 * The 4 possible 2D gradients (selected by hash & 3):
 *   h=0: ( 1,  1) → returns  x + y
 *   h=1: (-1,  1) → returns -x + y  
 *   h=2: ( 1, -1) → returns  x - y (actually y - x due to swap)
 *   h=3: (-1, -1) → returns -x - y (actually -y - x)
 * 
 * Why these specific gradients? They're unit-length-ish vectors pointing
 * to the corners of a square. Using only 4 directions (instead of arbitrary
 * angles) makes the math fast while still producing organic-looking noise.
 * 
 * The bit manipulation:
 * - (h & 1) flips sign of first component
 * - (h & 2) flips sign of second component
 * - (h < 2) swaps which axis is "primary"
 * 
 * @param hash - A pseudo-random value from the permutation table
 * @param x - X offset from the grid point to the sample point
 * @param y - Y offset from the grid point to the sample point
 * @returns Dot product of gradient and offset vector
 */
function perlinGrad(hash: number, x: number, y: number): number {
  const h = hash & 3;  // Use only bottom 2 bits → values 0, 1, 2, or 3
  
  // Swap x and y for half the cases (adds variation)
  const u = h < 2 ? x : y;
  const v = h < 2 ? y : x;
  
  // Apply sign flips based on hash bits
  // (h & 1) === 0 means "keep positive", else negate
  // (h & 2) === 0 means "keep positive", else negate
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

// ============================================================================
// MAIN PERLIN NOISE FUNCTION
// ============================================================================

/**
 * Generate 2D Perlin noise at the given coordinates.
 * 
 * The algorithm:
 * 1. Find which grid cell contains (x, y)
 * 2. Find the 4 corners of that cell
 * 3. At each corner, compute a gradient dot product
 * 4. Blend the 4 values using smooth interpolation
 * 
 * Visual intuition: Imagine a grid of arrows (gradients). Each arrow
 * "influences" nearby points based on direction and distance. Points
 * near an arrow pointing toward them get positive values; points near
 * arrows pointing away get negative values. The smooth blending creates
 * organic, cloud-like patterns.
 * 
 * @param x - X coordinate (can be any real number)
 * @param y - Y coordinate (can be any real number)
 * @returns Noise value roughly in range [-1, 1]
 */
export function perlin2D(x: number, y: number): number {
  // ========== STEP 1: Find grid cell coordinates ==========
  // The & 255 wraps coordinates to [0, 255], making noise tile seamlessly
  const xi = Math.floor(x) & 255;  // Integer X, wrapped to byte range
  const yi = Math.floor(y) & 255;  // Integer Y, wrapped to byte range
  
  // ========== STEP 2: Find position within the cell ==========
  // These are the fractional parts: how far into the cell is our point?
  // Both xf and yf are in range [0, 1)
  const xf = x - Math.floor(x);    // X fraction (distance from left edge)
  const yf = y - Math.floor(y);    // Y fraction (distance from bottom edge)
  
  // ========== STEP 3: Apply smoothstep to fractions ==========
  // This prevents visible grid artifacts by smoothing transitions
  const u = perlinFade(xf);        // Smoothed X interpolation weight
  const v = perlinFade(yf);        // Smoothed Y interpolation weight
  
  // ========== STEP 4: Hash the 4 corner coordinates ==========
  // Double-lookup into permutation table creates pseudo-random hash
  // for each corner of the grid cell
  //
  //   (xi, yi+1) -------- (xi+1, yi+1)
  //       ab                   bb
  //       |                     |
  //       |     (xf, yf)        |
  //       |         •           |
  //       |                     |
  //   (xi, yi) ---------- (xi+1, yi)
  //       aa                   ba
  //
  const aa = PERLIN_PERM[PERLIN_PERM[xi    ] + yi    ];  // Bottom-left
  const ab = PERLIN_PERM[PERLIN_PERM[xi    ] + yi + 1];  // Top-left
  const ba = PERLIN_PERM[PERLIN_PERM[xi + 1] + yi    ];  // Bottom-right
  const bb = PERLIN_PERM[PERLIN_PERM[xi + 1] + yi + 1];  // Top-right
  
  // ========== STEP 5: Compute gradient dot products ==========
  // For each corner, compute how much our point "agrees" with that
  // corner's gradient. Note the offset adjustments:
  // - Bottom-left corner:  offset is (xf, yf)
  // - Bottom-right corner: offset is (xf - 1, yf)     ← we're 1 unit right of it
  // - Top-left corner:     offset is (xf, yf - 1)     ← we're 1 unit above it
  // - Top-right corner:    offset is (xf - 1, yf - 1) ← we're diagonally away
  
  // ========== STEP 6: Blend everything together ==========
  // Bilinear interpolation using our smooth weights u and v:
  // 1. Lerp bottom edge: blend aa and ba by u
  // 2. Lerp top edge: blend ab and bb by u
  // 3. Lerp between the two results by v
  return lerp(
    lerp(perlinGrad(aa, xf, yf),     perlinGrad(ba, xf - 1, yf), u),      // Bottom edge
    lerp(perlinGrad(ab, xf, yf - 1), perlinGrad(bb, xf - 1, yf - 1), u),  // Top edge
    v  // Blend top and bottom
  );
}

// ============================================================================
// FRACTAL BROWNIAN MOTION (fBm) - LAYERED NOISE
// ============================================================================

/**
 * Fractal Brownian Motion - combines multiple "octaves" of Perlin noise.
 * 
 * Single Perlin noise looks smooth but uniform. Real natural phenomena
 * (clouds, terrain, wood grain) have detail at multiple scales. fBm
 * achieves this by layering noise at different frequencies.
 * 
 * Each octave:
 * - Doubles in frequency (more detail)
 * - Halves in amplitude (less influence)
 * 
 * The result: Large-scale shapes from low-frequency octaves, fine detail
 * from high-frequency octaves. Like looking at a mountain range that has
 * both massive peaks AND tiny rocks.
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param octaves - Number of noise layers (1-8 typical)
 * @param persistence - How much each octave contributes (0.5 typical)
 * @param lacunarity - Frequency multiplier between octaves (2.0 typical)
 * @returns Combined noise value
 */
function fbm(
  x: number,
  y: number,
  octaves: number = 4,
  persistence: number = 0.5,
  lacunarity: number = 2.0
): number {
  let total = 0;          // Accumulated noise value
  let amplitude = 1;      // Current octave's contribution strength
  let frequency = 1;      // Current octave's zoom level
  let maxValue = 0;       // For normalizing the result
  
  for (let i = 0; i < octaves; i++) {
    // Sample noise at current frequency, scale by current amplitude
    total += perlin2D(x * frequency, y * frequency) * amplitude;
    
    // Track max possible value for normalization
    maxValue += amplitude;
    
    // Prepare for next octave
    amplitude *= persistence;  // Reduce influence
    frequency *= lacunarity;   // Increase detail
  }
  
  // Normalize to roughly [-1, 1] range
  return total / maxValue;
}
