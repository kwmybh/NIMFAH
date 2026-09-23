import type { Metadata } from "next";
import Link from "next/link";
import { WorkCard, type WorkItem } from "@/components/work-card";
import { HeroCarousel } from "@/components/hero-carousel";
import "../about.css";
import "../carousel.css";
import "../work.css";

export const metadata: Metadata = {
  title: { absolute: "Kwame Yeboah — Designer who builds" },
  description:
    "Learning experience and product design by Kwame Yeboah. Communication design, design systems, front-end, and scenario-based learning.",
};

const FEATURED: WorkItem = {
  href: "/work/first-15-last-mile-onboarding",
  title: "First 15 — scenario-based onboarding for last-mile delivery",
  category: "Case study",
  meta: "A blended Rise 360 and Storyline 360 experience that trains new delivery associates to decide under pressure.",
  thumb: { kind: "plate" },
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
            <WorkCard item={FEATURED} />
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
