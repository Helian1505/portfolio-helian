"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { spring, springSnappy } from "@/lib/motion";
import { Close, Menu } from "./icons";

const SECTIONS = [
  { id: "work", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Scroll edge: material appears only once content scrolls beneath it
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Wayfinding: highlight the section currently in view
  useEffect(() => {
    if (!onHome) return setActive(null);
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  // Escape closes the sheet and returns focus to its trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`material absolute inset-0 transition-opacity duration-300 ${scrolled || open ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-px bg-graphite transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        aria-hidden="true"
      />
      <nav aria-label="Primary" className="relative mx-auto flex h-[var(--nav-h)] max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="pressable flex items-center gap-2.5 rounded-md py-1 text-[15px] font-[510] tracking-[-0.01em] text-paper">
          <span className="grid size-7 place-items-center rounded-md bg-paper font-mono text-[12px] font-medium text-void" aria-hidden="true">
            HF
          </span>
          <span>{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id} className="relative">
              <Link
                href={href(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className={`pressable relative z-10 block rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                  active === s.id ? "text-paper" : "text-fog hover:text-mist"
                }`}
              >
                {s.label}
              </Link>
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-md bg-white/[0.06]"
                  transition={reduce ? { duration: 0 } : springSnappy}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="pressable hidden rounded-full bg-paper px-4 py-1.5 text-[13px] font-[510] text-void hover:bg-bone sm:inline-block"
          >
            Let&apos;s talk
          </a>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="pressable grid size-9 place-items-center rounded-md text-mist hover:bg-white/5 md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet — anchored to its trigger (top-right), enters and exits along the same path */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="sheet"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={reduce ? { duration: 0.15 } : spring}
            style={{ transformOrigin: "top right" }}
            className="material relative border-b border-graphite md:hidden"
          >
            <ul className="mx-auto flex max-w-[1200px] flex-col px-4 pb-4 pt-1">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <Link
                    href={href(s.id)}
                    onClick={() => setOpen(false)}
                    className="pressable flex items-center justify-between rounded-md px-2 py-3 text-[17px] text-mist hover:bg-white/5"
                  >
                    {s.label}
                    <span className="font-mono text-[12px] text-ash">/{s.id}</span>
                  </Link>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="pressable block rounded-full bg-paper px-4 py-2.5 text-center text-[15px] font-[510] text-void"
                >
                  Let&apos;s talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
