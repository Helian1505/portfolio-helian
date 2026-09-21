import Image from "next/image";
import { profile } from "@/content/profile";
import { Reveal } from "./reveal";

const TIMELINE = [
  { when: "2026", what: "Qversity Data Engineering program", where: "End-to-end ELT lakehouse project" },
  { when: "2024 — now", what: "Product Compliance Analyst", where: "Dollar City · 5 LATAM markets" },
  { when: "2024 — 2026", what: "Data Management Analyst (volunteer)", where: "AI Expedition" },
  { when: "2023 — 2024", what: "Product Compliance Support", where: "Dollar City" },
  { when: "2022", what: "B.A. Economics & International Business", where: "Universidad Icesi · Ser Pilo Paga scholar" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-graphite px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <Reveal className="md:sticky md:top-[calc(var(--nav-h)+32px)] md:self-start">
          <div className="surface overflow-hidden p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={profile.photo}
                alt={`${profile.fullName}, smiling, arms crossed, wearing a navy shirt`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-4 font-mono text-[12px] text-ash">
            {profile.fullName} · {profile.location}
          </p>
        </Reveal>

        <div>
          <Reveal>
            <p className="t-eyebrow mb-4">About</p>
            <h2 id="about-title" className="t-heading text-balance">
              An economist who learned to build the pipes.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {profile.about.map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="text-[17px] leading-[1.65] text-mist text-pretty">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <h3 className="t-eyebrow mb-5">Path</h3>
            <ol className="border-l border-graphite">
              {TIMELINE.map((t) => (
                <li key={t.what} className="relative pb-7 pl-6 last:pb-0">
                  <span className="absolute -left-[4.5px] top-[7px] size-2 rounded-full bg-smoke ring-4 ring-void" aria-hidden="true" />
                  <p className="font-mono text-[12px] text-ash">{t.when}</p>
                  <p className="mt-1 text-[15px] text-paper">{t.what}</p>
                  <p className="text-[14px] text-fog">{t.where}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
