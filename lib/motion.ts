/**
 * Motion presets translated from Apple's damping/response model (see apple-design skill).
 * Motion's `bounce` ≈ 1 − dampingRatio, `duration` ≈ response.
 */
import type { Transition } from "motion/react";

/** Default: critically damped, no overshoot. Use for almost everything. */
export const spring: Transition = { type: "spring", bounce: 0, duration: 0.45 };

/** Snappier variant for small UI (chips, indicators). */
export const springSnappy: Transition = { type: "spring", bounce: 0, duration: 0.3 };

/** Only for interactions that carried momentum (a flick, a drag release). */
export const springMomentum: Transition = { type: "spring", bounce: 0.2, duration: 0.4 };

/** Entrance used by scroll reveals — small travel, no bounce. */
export const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
