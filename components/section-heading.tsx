import { Reveal } from "./reveal";

export function SectionHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl md:mb-16">
      <p className="t-eyebrow mb-4">{eyebrow}</p>
      <h2 className="t-heading text-balance">{title}</h2>
      {lead && <p className="mt-5 text-[17px] leading-relaxed text-fog text-pretty">{lead}</p>}
    </Reveal>
  );
}
