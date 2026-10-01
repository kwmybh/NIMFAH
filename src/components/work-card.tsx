import Image from "next/image";
import Link from "next/link";

export type WorkItem = {
  href: string;
  title: string;
  category: string;
  meta?: string;
  /** "image" uses a photograph; "plate" composes a typographic face from the
   *  project's own design system, for work that has no screenshot to show. */
  thumb: { kind: "image"; src: string; alt: string; wideSrc?: string } | { kind: "plate" };
};

// The typographic thumbnail for First 15 — ink ground, gold rule, Bodoni display
// and the three tracked dimensions as meters. Real type at any size rather than a
// raster of a screen that doesn't exist yet.
export function Plate() {
  return (
    <div className="wc-plate" aria-hidden="true">
      <span className="wc-plate-rule" />
      <p className="wc-plate-label">Decision 01 / 04 · 7:11 a.m.</p>
      <p className="wc-plate-head">
        Rear right is at 61.
        <br />
        Spec is 80.
      </p>
      <div className="wc-plate-meters">
        {[
          { k: "Safety", w: "70%", tone: "ok" },
          { k: "Service", w: "70%", tone: "ok" },
          { k: "Time", w: "100%", tone: "warn" },
        ].map((m) => (
          <div className="wc-plate-meter" key={m.k}>
            <span className="wc-plate-mk">{m.k}</span>
            <span className="wc-plate-mt">
              <i className={m.tone} style={{ width: m.w }} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// The card's title level depends on what sits above it, so the page decides rather than
// the component: directly under the page h1 it is an h2, and under a section heading of
// its own — Photography — it is an h3. Hard-coding h3 meant that with photography
// archived the index ran h1 → h3, skipping a level nobody had announced.
export function WorkCard({
  item,
  index = 0,
  headingLevel = 2,
}: {
  item: WorkItem;
  index?: number;
  headingLevel?: 2 | 3;
}) {
  const Title = headingLevel === 3 ? "h3" : "h2";
  return (
    <li
      className="wc"
      data-reveal="up"
      style={{ "--reveal-delay": `${0.06 * index}s` } as React.CSSProperties}
    >
      <Link href={item.href} className="wc-link">
        <div className="wc-thumb">
          {item.thumb.kind === "image" ? (
            <Image
              src={item.thumb.src}
              alt={item.thumb.alt}
              fill
              sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 380px"
              className="wc-img"
            />
          ) : (
            <Plate />
          )}
          {/* A banner-shaped version for where the card runs full width (the Work
              index's last row). display:none elsewhere — which also keeps it out of the
              accessibility tree, so only one of the two is ever announced. */}
          {item.thumb.kind === "image" && item.thumb.wideSrc ? (
            <Image
              src={item.thumb.wideSrc}
              alt={item.thumb.alt}
              fill
              sizes="(max-width: 1100px) 92vw, 1200px"
              className="wc-img wc-img-wide"
            />
          ) : null}
          {/* Hover/focus: accent corner brackets draw into the frame. Decorative. */}
          <span className="wc-corner wc-corner-tl" aria-hidden="true" />
          <span className="wc-corner wc-corner-tr" aria-hidden="true" />
          <span className="wc-corner wc-corner-bl" aria-hidden="true" />
          <span className="wc-corner wc-corner-br" aria-hidden="true" />
          <span className="wc-pill">{item.category}</span>
        </div>
        <div className="wc-foot">
          <Title className="wc-title">{item.title}</Title>
          <span className="wc-visit">
            Visit <i aria-hidden="true">↗</i>
          </span>
        </div>
        {item.meta ? <p className="wc-meta">{item.meta}</p> : null}
      </Link>
    </li>
  );
}
