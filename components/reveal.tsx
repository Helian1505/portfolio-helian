"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { spring } from "@/lib/motion";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered entrance. Small travel (16px), critically damped spring, runs once.
 * Reduced motion → opacity only, no translation.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? { duration: 0.2 } : { ...spring, delay }}
    >
      {children}
    </Tag>
  );
}
