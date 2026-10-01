import type { WorkItem } from "@/components/work-card";
import { WORK_ITEMS } from "@/lib/work-items";
import { GALLERY } from "@/lib/gallery";

/* The Portfolio hub (1 Oct 2026): every kind of work Kwame makes, one category per
   tile. Built to grow — Photography, Web design, Video, 3D and so on are each one
   entry here plus a page (see "Adding a category" below). A category with no work
   is simply not listed.

   Adding a category
     1. Add an entry to CATEGORIES with its id (the URL segment), copy, cover and size.
     2. Either give it `items` (cards, shown by the shared category page) or point
        `href` at a page of its own (as Graphic design does with its gallery).
     3. Add src/app/(site)/portfolio/<id>/page.tsx — for an items category, copy
        ux-ui/page.tsx and change the id.
   The hub's asymmetric grid places tiles by `size`; see portfolio.css. */

export type TileSize = "lg" | "md" | "wide" | "tall";

export type Category = {
  id: string;
  title: string;
  blurb: string;
  size: TileSize;
  cover: { kind: "image"; src: string; alt: string } | { kind: "plate" };
  /** Cards shown on the category's page. Empty when the category has its own page. */
  items: WorkItem[];
  /** "6 pieces", "2 case studies" */
  count: string;
};

const byHref = (href: string) => WORK_ITEMS.find((w) => w.href === href)!;

const UX: WorkItem[] = [byHref("/portfolio/traveling-jobs"), byHref("/portfolio/ghanaweb-reenvisioned")];
const LXD: WorkItem[] = [byHref("/portfolio/first-15-last-mile-onboarding")];

export const CATEGORIES: Category[] = [
  {
    id: "lxd-id",
    title: "LXD/ID",
    blurb: "Learning experience and instructional design: scenario-based onboarding, design documents and job aids.",
    size: "lg",
    cover: { kind: "plate" },
    items: LXD,
    count: `${LXD.length} case study`,
  },
  {
    id: "ux-ui",
    title: "UX/UI",
    blurb: "Product design from research to high fidelity: a marketplace for traveling nurses and a personalised news feed.",
    size: "md",
    cover: {
      kind: "image",
      src: "/media/portfolio/ux-ui-cover.webp",
      alt: "The Traveling Jobs sign-up screen on a laptop, overlapped by the GhanaWeb Re:Envisioned app on two phones.",
    },
    items: UX,
    count: `${UX.length} case studies`,
  },
  {
    id: "graphic-design",
    title: "Graphic design",
    blurb: "Posters and identities — Ghana tourism, Ohio University, and the African Students' Union's Heroes' Night.",
    size: "md",
    cover: {
      kind: "image",
      src: "/media/graphic-design/cover.webp",
      alt: "Three posters side by side: Traveling Ghana, Heroes' Night 2018 and African Heroes Night 2019.",
    },
    items: [],
    count: `${GALLERY.length} pieces`,
  },
];

export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

/** The category a project page belongs to — for its "← back" link. */
export function categoryOf(href: string): Category | undefined {
  return CATEGORIES.find((c) => c.items.some((i) => i.href === href) || `/portfolio/${c.id}` === href);
}
