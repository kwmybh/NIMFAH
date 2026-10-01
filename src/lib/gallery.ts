// Graphic design, brought over from the GALLERY page of the old Squarespace site
// (1 Oct 2026). Captions follow the originals'; alt text describes what is on each.
// The source files on Squarespace top out around 600 × 840 — replace them here with
// higher-resolution exports when they turn up, keeping the names.

export type GalleryPiece = {
  slug: string;
  src: string;
  w: number;
  h: number;
  title: string;
  caption: string;
  alt: string;
};

const P = "/media/graphic-design";

export const GALLERY: GalleryPiece[] = [
  {
    slug: "traveling-ghana",
    src: `${P}/traveling-ghana.webp`,
    w: 597,
    h: 843,
    title: "Traveling Ghana",
    caption: "Promotional poster for Ghana tourism.",
    alt: "Traveling Ghana poster on orange: a silhouetted Accra skyline over the title, its G in the colours of the Ghanaian flag, then panels for geography, what you need and what to do.",
  },
  {
    slug: "diversity-is-ohio",
    src: `${P}/diversity-is-ohio.webp`,
    w: 596,
    h: 843,
    title: "Diversity is OHIO",
    caption: "Diversity in Ohio poster for Ohio University, 2018.",
    alt: "Diversity is OHIO poster: raised hands in rainbow colours reaching up from the bottom, with the date, October 24 2018, in a black circle.",
  },
  {
    slug: "logo-design",
    src: `${P}/logo-design.webp`,
    w: 843,
    h: 597,
    title: "Logo design",
    caption: "Logo design.",
    alt: "A sheet of logos: Arc Build Consult, POKS Couture, Embrace Moore, Phantom Technologies, 2nd Home Foundation, Fintina, Bisa, Efreetity, Side Capital, The Institute of Economic Affairs and Project IKO.",
  },
  {
    slug: "heroes-night-2018-ngugi",
    src: `${P}/heroes-night-2018-ngugi.webp`,
    w: 597,
    h: 843,
    title: "Heroes' Night 2018",
    caption: "Promotional poster for the Ohio University African Students' Union Heroes' Night, 2018.",
    alt: "Heroes' Night poster in purple, black and yellow: a high-contrast portrait of the guest speaker, Prof. Ngũgĩ wa Thiong'o, with a $10 ticket badge.",
  },
  {
    slug: "african-heroes-night-2019",
    src: `${P}/african-heroes-night-2019.webp`,
    w: 596,
    h: 843,
    title: "African Heroes Night 2019",
    caption: "Promotional poster for the Ohio University African Students' Union Heroes' Night, 2019.",
    alt: "African Heroes Night poster on red: a gold map of Africa inside a black circle, 'Celebrating Our Roots', music, poetry and dance, April 5th 2019 at Nelson Commons.",
  },
  {
    slug: "heroes-night-2018-chumbow",
    src: `${P}/heroes-night-2018-chumbow.webp`,
    w: 597,
    h: 843,
    title: "Heroes' Night 2018",
    caption: "Promotional poster for the Ohio University African Students' Union Heroes' Night, 2018.",
    alt: "Heroes' Night poster in purple and red: a photograph of the guest speaker, Evelyn Chumbow, with a $10 ticket badge, April 21st 2018 at Walter Rotunda Hall.",
  },
];
