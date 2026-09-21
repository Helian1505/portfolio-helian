import type { MetadataRoute } from "next";
import { visibleProjects } from "@/content/projects";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: "monthly", priority: 1 },
    ...visibleProjects.map((p) => ({ url: `${base}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
