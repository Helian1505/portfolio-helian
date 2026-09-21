import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { profile } from "@/content/profile";
import "./globals.css";

// Self-hosted variable fonts: no build-time network dependency, no layout shift
const inter = localFont({
  src: [
    { path: "./fonts/Inter-Variable.woff2", weight: "100 900", style: "normal" },
    { path: "./fonts/Inter-Variable-LatinExt.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});
const mono = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "100 800",
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${profile.name} — ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.intro,
  authors: [{ name: profile.fullName, url: profile.links.linkedin }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description: profile.headline,
    images: [{ url: "/projects/qversity.png", width: 1411, height: 798 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#08090a", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body id="top" className="min-h-dvh">
        {/* If JS never runs, reveal-on-scroll content must still be visible */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-paper focus:px-3 focus:py-2 focus:text-[13px] focus:text-void"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
