import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHub } from "@/components/icons";
import { PageEnter } from "@/components/page-enter";
import { Pipeline } from "@/components/pipeline";
import { Reveal } from "@/components/reveal";
import { getProject, visibleProjects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return visibleProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: { title: p.title, description: p.summary, images: p.image ? [{ url: p.image.src }] : undefined },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-graphite py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-12 md:py-14">
      <h2 className="t-eyebrow pt-1">{label}</h2>
      <div>{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = visibleProjects.findIndex((p) => p.slug === slug);
  const next = visibleProjects[(idx + 1) % visibleProjects.length];
  const prev = visibleProjects[(idx - 1 + visibleProjects.length) % visibleProjects.length];

  return (
    <PageEnter>
      <article className="px-4 pt-[calc(var(--nav-h)+40px)] pb-24 sm:px-6 md:pt-[calc(var(--nav-h)+64px)]">
        <div className="mx-auto max-w-[1080px]">
          <Link href="/#work" className="pressable group inline-flex items-center gap-1.5 rounded-md text-[14px] text-fog hover:text-paper">
            <ArrowLeft className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5" />
            All work
          </Link>

          <header className="mt-10 max-w-[820px]">
            <p className="t-eyebrow">{project.kicker}</p>
            <h1 className="t-display mt-4 text-balance">{project.title}</h1>
            <p className="mt-6 text-[18px] leading-relaxed text-fog text-pretty md:text-[20px]">{project.summary}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="pressable inline-flex items-center gap-2 rounded-[6px] bg-lime px-4 py-2.5 text-[14px] font-[510] text-void hover:bg-[#eef75a]"
                >
                  <GitHub /> View repository <ArrowUpRight />
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="pressable inline-flex items-center gap-2 rounded-[6px] px-4 py-2.5 text-[14px] text-mist ring-1 ring-inset ring-graphite hover:bg-white/[0.04]"
                >
                  Live demo <ArrowUpRight />
                </a>
              )}
              <span className="font-mono text-[12px] text-ash">
                {project.category} · {project.year}
              </span>
            </div>
          </header>

          <Reveal className="mt-14">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[12px] bg-graphite ring-1 ring-graphite md:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="bg-carbon px-5 py-6">
                  <dt className="sr-only">{m.label}</dt>
                  <dd className="text-[28px] font-[510] leading-none tracking-[-0.03em] text-paper tabular-nums md:text-[34px]">{m.value}</dd>
                  <dd className="mt-2 text-[13px] text-fog">{m.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {project.image && (
            <Reveal className="mt-6">
              <figure className="surface p-2 md:p-3">
                <div className="overflow-hidden rounded-lg ring-1 ring-graphite">
                  <Image
                    src={project.image.src}
                    alt={project.image.alt}
                    width={project.image.width}
                    height={project.image.height}
                    sizes="(min-width: 1080px) 1060px, 100vw"
                    priority
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="px-2 pt-3 pb-1 text-[13px] text-ash">{project.image.alt}</figcaption>
              </figure>
            </Reveal>
          )}

          <div className="mt-16">
            {project.architecture && (
              <Block label="Architecture">
                <Pipeline steps={project.architecture} label={`${project.title} architecture`} />
              </Block>
            )}
            <Block label="The problem">
              <p className="text-[17px] leading-[1.65] text-mist text-pretty">{project.problem}</p>
            </Block>
            <Block label="What I did">
              <ol className="space-y-4">
                {project.approach.map((step, i) => (
                  <li key={i} className="flex gap-4 text-[17px] leading-[1.6] text-mist">
                    <span className="mt-[3px] font-mono text-[12px] text-ash tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-pretty">{step}</span>
                  </li>
                ))}
              </ol>
            </Block>
            <Block label="What it changed">
              <ul className="space-y-4">
                {project.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-4 text-[17px] leading-[1.6] text-mist">
                    <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                    <span className="text-pretty">{o}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block label="Stack">
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full bg-white/[0.05] px-3 py-1.5 text-[13px] text-mist ring-1 ring-inset ring-graphite">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* Wayfinding: never a dead end */}
          <nav aria-label="More projects" className="mt-10 grid gap-3 border-t border-graphite pt-10 sm:grid-cols-2">
            <Link href={`/projects/${prev.slug}`} className="pressable surface group p-5 hover:shadow-[inset_0_0_0_1px_var(--color-smoke)]">
              <span className="flex items-center gap-1.5 text-[13px] text-ash">
                <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" /> Previous
              </span>
              <span className="mt-2 block text-[17px] text-paper">{prev.title}</span>
            </Link>
            <Link href={`/projects/${next.slug}`} className="pressable surface group p-5 text-right hover:shadow-[inset_0_0_0_1px_var(--color-smoke)]">
              <span className="flex items-center justify-end gap-1.5 text-[13px] text-ash">
                Next <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
              <span className="mt-2 block text-[17px] text-paper">{next.title}</span>
            </Link>
          </nav>
        </div>
      </article>
    </PageEnter>
  );
}
