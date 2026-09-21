"use client";

import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import type { Project } from "@/content/projects";
import { ArrowRight } from "./icons";

const MAX_CHIPS = 4;

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Spotlight follows the pointer 1:1 — written straight to CSS vars, no re-render
  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const extra = project.stack.length - MAX_CHIPS;

  return (
    <Link
      ref={ref}
      href={`/projects/${project.slug}`}
      onPointerMove={onMove}
      className="pressable group surface relative flex h-full flex-col overflow-hidden p-6 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-quint)] hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_var(--color-smoke)] md:p-7"
    >
      {/* Pointer spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(360px circle at var(--x, 50%) var(--y, 0%), rgba(255,255,255,0.055), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <span className="t-eyebrow truncate">{project.kicker}</span>
        <span className="shrink-0 font-mono text-[12px] text-ash">{project.year}</span>
      </div>

      <div className={`relative ${wide ? "md:grid md:flex-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-end md:gap-12" : "contents"}`}>
      <div className="relative mt-8">
        <p className={`text-[44px] font-[510] leading-none tracking-[-0.04em] text-paper tabular-nums ${wide ? "md:text-[72px]" : "md:text-[52px]"}`}>
          {project.heroMetric.value}
        </p>
        <p className="mt-2 text-[13px] text-fog">{project.heroMetric.label}</p>
      </div>

      <div className={`relative mt-8 ${wide ? "" : "flex-1"}`}>
        <h3 className="text-[20px] font-[510] leading-snug tracking-[-0.015em] text-paper">{project.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-fog">{project.summary}</p>
      </div>
      </div>

      <div className="relative mt-6 flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5" aria-label="Tools used">
          {project.stack.slice(0, MAX_CHIPS).map((s) => (
            <li key={s} className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[12px] text-mist">
              {s}
            </li>
          ))}
          {extra > 0 && <li className="rounded-full px-1.5 py-1 text-[12px] text-ash">+{extra}</li>}
        </ul>
        <span className="grid size-8 shrink-0 place-items-center rounded-full text-fog ring-1 ring-inset ring-graphite transition-colors duration-200 group-hover:bg-paper group-hover:text-void group-hover:ring-paper">
          <ArrowRight />
          <span className="sr-only">Open case study</span>
        </span>
      </div>
    </Link>
  );
}
