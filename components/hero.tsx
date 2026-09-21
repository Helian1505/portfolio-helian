"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { profile } from "@/content/profile";
import { spring } from "@/lib/motion";
import { ArrowRight, GitHub, LinkedIn } from "./icons";

const STATS = [
  { value: "87k+", label: "transactions modeled" },
  { value: "66k+", label: "customers segmented" },
  { value: "5", label: "LATAM markets at work" },
];

export function Hero() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.07, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 14, filter: reduce ? "none" : "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: reduce ? { duration: 0.2 } : spring },
  };

  return (
    <section className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+64px)] pb-20 md:pt-[calc(var(--nav-h)+96px)] md:pb-28">
      <div className="hero-floor pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grid-texture pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-[980px] flex-col items-center px-4 text-center sm:px-6"
      >
        {/* Portrait + availability */}
        <motion.div variants={item} className="mb-8 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="relative size-24 overflow-hidden rounded-full ring-1 ring-graphite md:size-28">
              <Image
                src={profile.photo}
                alt={`Portrait of ${profile.fullName}`}
                fill
                priority
                sizes="112px"
                className="object-cover object-[50%_22%] scale-[1.35]"
              />
            </div>
            <span className="absolute bottom-1 right-1 grid size-5 place-items-center rounded-full bg-void" aria-hidden="true">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2.5 rounded-full bg-lime" />
              </span>
            </span>
          </div>
          <p className="t-eyebrow">
            {profile.role} · {profile.location}
          </p>
        </motion.div>

        <motion.h1 variants={item} className="t-display text-balance">
          {profile.headline}
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-[640px] text-[17px] leading-[1.6] text-fog text-pretty md:text-[18px]">
          {profile.intro}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#work"
            className="pressable group inline-flex items-center gap-2 rounded-[6px] bg-lime px-5 py-2.5 text-[15px] font-[510] tracking-[-0.011em] text-void shadow-[0_1px_1px_rgba(0,0,0,0.08),0_3px_2px_rgba(0,0,0,0.04)] hover:bg-[#eef75a]"
          >
            See the work
            <ArrowRight className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
          </Link>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="pressable inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[15px] text-mist ring-1 ring-inset ring-graphite hover:bg-white/[0.04] hover:ring-smoke"
          >
            <GitHub /> GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pressable inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[15px] text-mist ring-1 ring-inset ring-graphite hover:bg-white/[0.04] hover:ring-smoke"
          >
            <LinkedIn /> LinkedIn
          </a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-16 grid w-full max-w-[720px] grid-cols-3 divide-x divide-graphite border-y border-graphite"
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-5 sm:px-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-[22px] font-[510] leading-none sm:text-[28px] tracking-[-0.03em] text-paper tabular-nums">{s.value}</dd>
              <dd className="text-[12px] leading-snug text-fog sm:text-[13px]">{s.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
