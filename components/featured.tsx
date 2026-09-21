"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import type { Project } from "@/content/projects";
import { ArrowRight } from "./icons";
import { Pipeline } from "./pipeline";
import { Reveal } from "./reveal";

/**
 * Apple-style "product render" band: the flagship project fills the width and settles into place
 * as it scrolls in. Scroll-linked values are spring-smoothed so they never jump.
 */
export function Featured({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 170, damping: 30, mass: 0.6 });
  const scale = useTransform(smooth, [0, 1], [0.94, 1]);
  const opacity = useTransform(smooth, [0, 0.6], [0.4, 1]);

  return (
    <section aria-labelledby="featured-title" className="relative px-4 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mx-auto mb-10 max-w-[760px] text-center">
          <p className="t-eyebrow mb-4">Featured · {project.category}</p>
          <h2 id="featured-title" className="t-heading text-balance">
            {project.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-relaxed text-fog text-pretty">{project.summary}</p>
          <div className="mt-8 flex justify-center">
            <Link
              href={`/projects/${project.slug}`}
              className="pressable group inline-flex items-center gap-1.5 text-[15px] text-mist hover:text-paper"
            >
              Read the case study
              <ArrowRight className="transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>

        <motion.div
          ref={ref}
          style={reduce ? undefined : { scale, opacity }}
          className="surface relative overflow-hidden p-3 will-change-transform sm:p-4 md:p-6"
        >
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(208,214,224,0.05),transparent)]"
            aria-hidden="true"
          />
          {project.architecture && (
            <div className="relative mb-4 md:mb-6">
              <Pipeline steps={project.architecture} label={`${project.title} architecture`} />
            </div>
          )}
          {project.image && (
            <div className="relative overflow-hidden rounded-lg ring-1 ring-graphite">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1200px) 1150px, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}
          <dl className="relative mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-graphite md:mt-6 md:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="bg-carbon px-4 py-4 md:px-5">
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-[24px] font-[510] leading-none tracking-[-0.025em] text-paper tabular-nums md:text-[28px]">
                  {m.value}
                </dd>
                <dd className="mt-2 text-[13px] text-fog">{m.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
