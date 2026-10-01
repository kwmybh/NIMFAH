import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/portfolio";
import { Plate } from "./work-card";

// One category on the Portfolio hub: cover, number, title, count, a line of copy.
// `size` (from lib/portfolio.ts) sets the tile's footprint in the asymmetric grid.
export function CategoryTile({
  cat,
  index,
  headingLevel = 2,
}: {
  cat: Category;
  index: number;
  headingLevel?: 2 | 3;
}) {
  const Title = headingLevel === 3 ? "h3" : "h2";
  return (
    <li className="pf-tile" data-size={cat.size}>
      <Link href={`/portfolio/${cat.id}`} className="pf-link">
        <span className="pf-cover">
          {cat.cover.kind === "image" ? (
            <Image
              src={cat.cover.src}
              alt={cat.cover.alt}
              fill
              sizes={cat.size === "lg" ? "(max-width: 700px) 92vw, 66vw" : "(max-width: 700px) 92vw, 34vw"}
              className="pf-img"
            />
          ) : (
            <Plate />
          )}
          <span className="wc-corner wc-corner-tl" aria-hidden="true" />
          <span className="wc-corner wc-corner-tr" aria-hidden="true" />
          <span className="wc-corner wc-corner-bl" aria-hidden="true" />
          <span className="wc-corner wc-corner-br" aria-hidden="true" />
        </span>
        <span className="pf-text">
          <span className="pf-meta">
            <span className="pf-idx" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pf-count">{cat.count}</span>
          </span>
          <Title className="pf-title">
            {cat.title} <i aria-hidden="true">↗</i>
          </Title>
          <span className="pf-blurb">{cat.blurb}</span>
        </span>
      </Link>
    </li>
  );
}

export function CategoryGrid({ cats, headingLevel = 2 }: { cats: Category[]; headingLevel?: 2 | 3 }) {
  return (
    <ul className="pf-grid">
      {cats.map((c, n) => (
        <CategoryTile cat={c} index={n} key={c.id} headingLevel={headingLevel} />
      ))}
    </ul>
  );
}
