import type { Metadata } from "next";
import Link from "next/link";
import { WorkCard } from "@/components/work-card";
import { WORK_ITEMS } from "@/lib/work-items";
import { HeroCarousel } from "@/components/hero-carousel";
import "../../about.css";
import "../../carousel.css";
import "../../work.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "NIMFAH — the studio of creative technologist Kwame Nimfah: art and design, creative coding and front-end engineering.",
};


export default function About() {
  return (
    <div className="abt">
      <HeroCarousel />

      <section className="abt-sec" data-reveal="up">
        <div className="abt-wrap">
          <div className="abt-sechead">
            <h2>Selected work</h2>
            <Link href="/work">All work ↗</Link>
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
          <Link className="abt-btn abt-btn-ghost" href="/work">
            See the work
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
