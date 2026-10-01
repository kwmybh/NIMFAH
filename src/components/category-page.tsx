import Link from "next/link";
import type { Category } from "@/lib/portfolio";
import { WorkCard } from "./work-card";

// The page behind a category tile, for categories made of cards (UX/UI, LXD/ID…).
// Graphic design has its own gallery page instead.
export function CategoryPage({ cat }: { cat: Category }) {
  return (
    <section className="workidx pf-cat">
      <div className="workidx-head">
        <p className="gal-kicker">
          <Link href="/portfolio">← Portfolio</Link>
        </p>
        <h1 data-reveal="mask">{cat.title}</h1>
        <p className="workidx-lede">{cat.blurb}</p>
      </div>
      <ul className="wc-grid pf-cards">
        {cat.items.map((item, n) => (
          <WorkCard item={item} key={item.href} index={n} />
        ))}
      </ul>
    </section>
  );
}
