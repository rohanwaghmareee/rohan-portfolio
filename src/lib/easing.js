// ---------------------------------------------------------------------------
// Small GLSL-style easing helpers shared by the 3D scene.
// They let 3D objects fade in/out inside a window of the global scroll
// progress without needing per-object timelines.
// ---------------------------------------------------------------------------

/** Hermite smoothstep: t in [0,1] at the [a,b] edges of the input range. */
export function smoothstep(value, a, b) {
  const t = Math.max(0, Math.min(1, (value - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

/**
 * Fades an object up between `inA→inB` and back down between `outA→outB`.
 * Returns an opacity-style value in [0, 1]. Example usage for a piece that
 * should exist during the "work" panel (progress ≈ 0.25 → 0.5):
 *
 *   const opacity = fadeWindow(progress, 0.22, 0.3, 0.45, 0.52)
 */
export function fadeWindow(progress, inA, inB, outA, outB) {
  const up = smoothstep(progress, inA, inB)
  const down = 1 - smoothstep(progress, outA, outB)
  return Math.min(up, down)
}

/** Linear interpolation. */
export function lerp(a, b, t) {
  return a + (b - a) * t
}
