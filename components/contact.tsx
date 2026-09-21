"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { profile } from "@/content/profile";
import { springSnappy } from "@/lib/motion";
import { Check, Copy, GitHub, LinkedIn, Mail } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-graphite px-4 py-28 sm:px-6 md:py-40">
      <div className="hero-floor pointer-events-none absolute inset-0 -z-10 rotate-180" aria-hidden="true" />
      <Reveal className="mx-auto max-w-[760px] text-center">
        <p className="t-eyebrow mb-4">Contact</p>
        <h2 id="contact-title" className="t-display text-balance">
          Have data that should be answering questions?
        </h2>
        <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-relaxed text-fog">{profile.availability}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="pressable inline-flex items-center gap-2 rounded-[6px] bg-lime px-5 py-2.5 text-[15px] font-[510] tracking-[-0.011em] text-void hover:bg-[#eef75a]"
          >
            <Mail /> Email me
          </a>
          <button
            type="button"
            onClick={copy}
            className="pressable inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 font-mono text-[13px] text-mist ring-1 ring-inset ring-graphite hover:bg-white/[0.04] hover:ring-smoke"
            aria-label={copied ? "Email copied" : `Copy email address ${profile.email}`}
          >
            <span className="relative grid size-4 place-items-center">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={copied ? "check" : "copy"}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.6, filter: reduce ? "none" : "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.6, filter: reduce ? "none" : "blur(2px)" }}
                  transition={reduce ? { duration: 0.1 } : springSnappy}
                  className={copied ? "text-lime" : ""}
                >
                  {copied ? <Check /> : <Copy />}
                </motion.span>
              </AnimatePresence>
            </span>
            {profile.email}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-[14px]">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="pressable inline-flex items-center gap-2 text-fog hover:text-paper">
            <LinkedIn /> LinkedIn
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="pressable inline-flex items-center gap-2 text-fog hover:text-paper">
            <GitHub /> GitHub
          </a>
        </div>
      </Reveal>
    </section>
  );
}
