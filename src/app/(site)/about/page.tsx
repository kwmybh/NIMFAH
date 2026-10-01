import type { Metadata } from "next";
import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { WORK_ITEMS } from "@/lib/work-items";
import { HeroCarousel } from "@/components/hero-carousel";
import { SPECS, SPECS_PITCH } from "@/lib/specs";
import "../../about.css";
import "../../carousel.css";
import "../../work.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "NIMFAH — the studio of creative technologist Kwame Nimfah: art, design and technology.",
};


export default function About() {
  return (
    <div className="abt">
      <HeroCarousel />

      {/* Core specs — moved here from the home page's third panel (1 Oct 2026) and
          rewritten to the hero's three words: Art / Design / Technology. */}
      <section className="abt-sec abt-specs" data-reveal="up" aria-labelledby="specs-h">
        <div className="abt-wrap">
          <div className="abt-sechead">
            <h2 id="specs-h">Core specs</h2>
          </div>
          <div className="abt-specs-body">
            <p className="abt-specs-pitch">{SPECS_PITCH}</p>
            <dl className="abt-specs-list">
              {SPECS.map(([k, v]) => (
                <div className="abt-specs-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="abt-sec" data-reveal="up">
        <div className="abt-wrap">
          <div className="abt-sechead">
            <h2>Selected work</h2>
            <Link href="/portfolio">Portfolio ↗</Link>
          </div>
          <ul className="wc-grid">
            {WORK_ITEMS.map((item, n) => (
              <WorkCard item={item} key={item.href} index={n} headingLevel={3} />
            ))}
          </ul>
        </div>
      </section>

      <section className="abt-wrap" data-reveal="up">
        <div className="abt-end">
          <a className="abt-btn" href="mailto:kwame.nimfah@gmail.com">
            Shoot a message
          </a>
          <Link className="abt-btn abt-btn-ghost" href="/portfolio">
            See the portfolio
          </Link>
          <a
            className="abt-btn abt-btn-ghost"
            href="/cv/Kwame Yeboah - LXD - Resume.pdf"
            target="_blank"
            rel="noopener"
          >
            Résumé ↓
          </a>
        </div>
      </section>
    </div>
  );
}
