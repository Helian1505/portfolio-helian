import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-graphite px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-4 text-[13px] text-ash sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="font-mono text-[12px]">Built with Next.js · Deployed on Vercel</p>
        <a href="#top" className="pressable text-fog hover:text-paper">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
