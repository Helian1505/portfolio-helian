import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[70dvh] place-items-center px-4 pt-[var(--nav-h)] text-center">
      <div>
        <p className="t-eyebrow">404</p>
        <h1 className="t-heading mt-4">This page isn&apos;t in the pipeline.</h1>
        <Link href="/" className="pressable mt-8 inline-block rounded-[6px] bg-lime px-5 py-2.5 text-[15px] font-[510] text-void">
          Back home
        </Link>
      </div>
    </section>
  );
}
