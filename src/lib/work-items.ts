import type { WorkItem } from "@/components/work-card";
import { CASE_STUDIES } from "@/lib/case-studies";

// Every project, in the order the About page shows them; lib/portfolio.ts files them
// into categories for the Portfolio hub.
// First 15 leads; the product design studies follow, newest first; graphic design last.
export const WORK_ITEMS: WorkItem[] = [
  {
    href: "/portfolio/first-15-last-mile-onboarding",
    title: "First 15 — scenario-based onboarding for last-mile delivery",
    category: "LXD/ID",
    meta: "A blended Rise 360 and Storyline 360 experience that trains new delivery associates to decide under pressure. Playable scenario, design document, developer-handoff storyboard.",
    thumb: { kind: "plate" },
  },
  ...CASE_STUDIES.map<WorkItem>((c) => ({
    href: `/portfolio/${c.slug}`,
    title: c.title,
    category: "UX/UI",
    meta: c.cardMeta,
    thumb: { kind: "image", src: c.cover.src, alt: c.cover.alt },
  })),
  {
    href: "/portfolio/graphic-design",
    title: "Graphic design — posters and identities",
    category: "Graphic design",
    meta: "Posters for Ghana tourism, Ohio University and the African Students' Union's Heroes' Night, and a sheet of logo identities.",
    thumb: {
      kind: "image",
      src: "/media/graphic-design/cover.webp",
      wideSrc: "/media/graphic-design/cover-wide.webp",
      alt: "Posters side by side — Traveling Ghana, Diversity is OHIO, Heroes' Night and African Heroes Night — with a sheet of logos.",
    },
  },
];
