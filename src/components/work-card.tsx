import Image from "next/image";
import Link from "next/link";

export type WorkItem = {
  href: string;
  title: string;
  category: string;
  meta?: string;
  /** "image" uses a photograph; "plate" composes a typographic face from the
   *  project's own design system, for work that has no screenshot to show. */
  thumb: { kind: "image"; src: string; alt: string } | { kind: "plate" };
};

// The typographic thumbnail for First 15 — ink ground, gold rule, Bodoni display
// and the three tracked dimensions as meters. Real type at any size rather than a
// raster of a screen that doesn't exist yet.
function Plate() {
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

export function WorkCard({ item, index = 0 }: { item: WorkItem; index?: number }) {
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
              sizes="(max-width: 760px) 92vw, 46vw"
              className="wc-img"
            />
          ) : (
            <Plate />
          )}
          <span className="wc-pill">{item.category}</span>
        </div>
        <div className="wc-foot">
          <h3 className="wc-title">{item.title}</h3>
          <span className="wc-visit">
            Visit <i aria-hidden="true">↗</i>
          </span>
        </div>
        {item.meta ? <p className="wc-meta">{item.meta}</p> : null}
      </Link>
    </li>
  );
}
