"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Category, Project } from "@/content/projects";
import { spring, springSnappy } from "@/lib/motion";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

type Filter = "All" | Category;

export function Work({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduce = useReducedMotion();
  const filters: Filter[] = ["All", ...categories];

  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter, projects],
  );

  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <section id="work" aria-labelledby="work-title" className="px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Selected work"
          title="Problems I've taken from raw data to a decision."
          lead="Each project starts with a business question and ends with a number someone can act on. Open any card for the full case study."
        />

        {/* Filter chips — the active pill glides between options */}
        <LayoutGroup id="filters">
          <div role="group" aria-label="Filter projects by category" className="-mx-4 mb-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex gap-1 rounded-full bg-carbon p-1 ring-1 ring-inset ring-graphite">
              {filters.map((f) => {
                const selected = filter === f;
                return (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(f)}
                    className={`pressable relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] ${
                      selected ? "text-void" : "text-fog hover:text-mist"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-paper"
                        transition={reduce ? { duration: 0 } : springSnappy}
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">
                      {f}
                      <span className={`ml-1.5 font-mono text-[11px] ${selected ? "text-void/60" : "text-ash"}`}>{count(f)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </LayoutGroup>

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        <Reveal>
        <motion.ul layout={!reduce} className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p, i) => {
              const wide = i === 0 && shown.length % 2 === 1;
              return (
              <motion.li
                key={p.slug}
                layout={!reduce}
                className={wide ? "md:col-span-2" : undefined}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                transition={reduce ? { duration: 0.15 } : spring}
              >
                <ProjectCard project={p} wide={wide} />
              </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
        </Reveal>
      </div>
    </section>
  );
}
