"use client";

import { motion, useReducedMotion } from "motion/react";
import { spring } from "@/lib/motion";

/** Renders an architecture as an ordered flow. Steps light up in sequence when scrolled into view. */
export function Pipeline({ steps, label = "Data flow" }: { steps: string[]; label?: string }) {
  const reduce = useReducedMotion();
  return (
    <ol aria-label={label} className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((step, i) => {
        const [name, detail] = step.split(" · ");
        return (
          <motion.li
            key={step}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, y: reduce ? 0 : 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={reduce ? { duration: 0.2 } : { ...spring, delay: i * 0.06 }}
          >
            <span className="inline-flex items-baseline gap-1.5 rounded-md bg-white/[0.04] px-2.5 py-1.5 ring-1 ring-inset ring-graphite">
              <span className="text-[13px] text-bone">{name}</span>
              {detail && <span className="font-mono text-[11px] text-fog">{detail}</span>}
            </span>
            {i < steps.length - 1 && (
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none" className="text-smoke" aria-hidden="true">
                <path d="M0 4h12m0 0L9 1m3 3L9 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
