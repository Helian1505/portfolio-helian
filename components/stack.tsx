import { profile } from "@/content/profile";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="border-t border-graphite px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto max-w-[1200px]">
        <SectionHeading
          eyebrow="Toolkit"
          title="The stack, grouped by the job it does."
          lead="Tools change. What stays is the order: model the data correctly, test it, then make it readable."
        />
        <div className="grid gap-px overflow-hidden rounded-[12px] bg-graphite ring-1 ring-graphite sm:grid-cols-2 lg:grid-cols-4">
          {profile.stack.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05} className="bg-carbon p-6">
              <h3 className="font-mono text-[12px] uppercase tracking-[0.02em] text-fog">
                <span className="mr-2 text-ash">0{i + 1}</span>
                {g.group}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="text-[15px] text-mist">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
