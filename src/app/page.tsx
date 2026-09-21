import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SHOW_HERO_PORTRAIT } from "@/lib/data";
import { WorkCard, type WorkItem } from "@/components/work-card";
import "./about.css";
import "./work.css";

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
      <section className="abt-hero">
        {SHOW_HERO_PORTRAIT ? (
          <div className="abt-portrait" aria-hidden="true">
            <Image src="/portrait/kwame-hero-2400.webp" alt="" fill priority sizes="100vw" />
            <span className="abt-scrim" />
          </div>
        ) : null}

        <div className="abt-hud" aria-hidden="true">
          <span className="abt-col" style={{ left: "25%" }} />
          <span className="abt-col" style={{ left: "50%" }} />
          <span className="abt-col" style={{ left: "75%" }} />
          <span className="abt-tick abt-tick-tl" />
          <span className="abt-tick abt-tick-tr" />
          <span className="abt-tick abt-tick-bl" />
          <span className="abt-tick abt-tick-br" />
        </div>

        <div className="bleed abt-hero-inner">
          <p className="abt-contact t-label-sm" data-reveal="fade" style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}>
            <a href="mailto:kwame.nimfah@gmail.com">kwame.nimfah@gmail.com</a>
          </p>

          <p className="abt-statement t-body-lg" data-reveal="up" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
            I&apos;m a designer who builds. Hand me a messy operational problem and I&apos;ll find the{" "}
            <em>decision</em> hiding inside it — then design, write and ship the thing that helps
            someone make it under pressure.
          </p>

          <div className="abt-id">
            <p className="abt-pill t-label" data-reveal="up" style={{ "--reveal-delay": "0.20s" } as React.CSSProperties}>
              Designer who builds
            </p>
            <p className="abt-subs t-label-sm" data-reveal="up" style={{ "--reveal-delay": "0.26s" } as React.CSSProperties}>
              <span>Kwame Yeboah</span>
              <span>Learning experience design</span>
              <span>Product design</span>
              <span>Front-end</span>
            </p>
            <h1 className="abt-name t-display-1" data-reveal="mask" style={{ "--reveal-delay": "0.32s" } as React.CSSProperties}>
              Nimfah
            </h1>
          </div>
        </div>
      </section>

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
