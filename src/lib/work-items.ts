import type { WorkItem } from "@/components/work-card";
import { CASE_STUDIES } from "@/lib/case-studies";

// Every case study, in the order the Work index and the About page show them.
// First 15 leads; the product design studies follow, newest first; graphic design last.
export const WORK_ITEMS: WorkItem[] = [
  {
    href: "/work/first-15-last-mile-onboarding",
    title: "First 15 — scenario-based onboarding for last-mile delivery",
    category: "Case study",
    meta: "A blended Rise 360 and Storyline 360 experience that trains new delivery associates to decide under pressure. Playable scenario, design document, developer-handoff storyboard.",
    thumb: { kind: "plate" },
  },
  ...CASE_STUDIES.map<WorkItem>((c) => ({
    href: `/work/${c.slug}`,
    title: c.title,
    category: "Case study",
    meta: c.cardMeta,
    thumb: { kind: "image", src: c.cover.src, alt: c.cover.alt },
  })),
  {
    href: "/work/graphic-design",
    title: "Graphic design — posters and identities",
    category: "Graphic design",
    meta: "Posters for Ghana tourism, Ohio University and the African Students' Union's Heroes' Night, and a sheet of logo identities.",
    thumb: {
      kind: "image",
      src: "/work/graphic-design/cover.webp",
      wideSrc: "/work/graphic-design/cover-wide.webp",
      alt: "Posters side by side — Traveling Ghana, Diversity is OHIO, Heroes' Night and African Heroes Night — with a sheet of logos.",
    },
  },
];
