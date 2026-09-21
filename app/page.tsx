import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Featured } from "@/components/featured";
import { Hero } from "@/components/hero";
import { Stack } from "@/components/stack";
import { Work } from "@/components/work";
import { categories, visibleProjects } from "@/content/projects";

export default function Home() {
  const featured = visibleProjects.find((p) => p.featured) ?? visibleProjects[0];
  return (
    <>
      <Hero />
      {featured && <Featured project={featured} />}
      <Work projects={visibleProjects} categories={categories} />
      <Stack />
      <About />
      <Contact />
    </>
  );
}
