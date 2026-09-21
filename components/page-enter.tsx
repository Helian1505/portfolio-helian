"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { spring } from "@/lib/motion";

/** Route entrance: rises from where the card was (below), same axis it leaves on. */
export function PageEnter({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduce ? { duration: 0.2 } : spring}
    >
      {children}
    </motion.div>
  );
}
