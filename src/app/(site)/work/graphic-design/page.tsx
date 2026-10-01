import type { Metadata } from "next";
import Link from "next/link";
import { GALLERY } from "@/lib/gallery";
import { GalleryGrid } from "@/components/gallery-grid";
import "../../../work.css";
import "../../../gallery.css";

export const metadata: Metadata = {
  title: "Graphic design",
  description:
    "Posters and logo identities by Kwame Nimfah — Ghana tourism, Ohio University and the African Students' Union's Heroes' Night.",
  openGraph: { images: [{ url: "/work/graphic-design/cover.webp", width: 1600, height: 1200 }] },
};

// The graphic design gallery, brought over from the old Squarespace site. Not a case
// study: the pieces are the point, so the page is a header and a grid. Each tile opens
// the piece large in a dialog (components/gallery-grid.tsx).
export default function GraphicDesign() {
  return (
    <section className="workidx gal">
      <div className="workidx-head">
        <p className="gal-kicker">
          <Link href="/work">← All work</Link>
        </p>
        <h1 data-reveal="mask">Graphic design</h1>
        <p className="workidx-lede">
          Posters and identities — Ghana tourism, Ohio University, and three years of the
          African Students&apos; Union&apos;s Heroes&apos; Night. Select a piece to see it large.
        </p>
      </div>
      <GalleryGrid pieces={GALLERY} />
    </section>
  );
}
