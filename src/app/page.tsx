import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WorkCard, type WorkItem } from "@/components/work-card";
import "./about.css";
import "./work.css";

export const metadata: Metadata = {
  title: { absolute: "Kwame Yeboah — Designer who builds" },
  description:
    "Learning experience and product design by Kwame Yeboah. Communication design, design systems, front-end, and scenario-based learning.",
};

// DRAFT COPY — voice and claims to be reviewed by Kwame.
const XP = [
  {
    n: "01",
    co: "Blue Umbrella Software",
    role: "Lead Product Designer · Aug 2022 – present",
    body: "Sole designer on Traveling Jobs, a travel-healthcare staffing marketplace, working with three backend and two front-end engineers across time zones. Built the design system in Figma and Storybook, every component shipped with written usage guidance. Full-time to Feb 2025, on contract since.",
  },
  {
    n: "02",
    co: "State Auto Insurance",
    role: "Software Engineer, then UX Designer · 2021 – 2022",
    body: "Started in engineering, moved to design. Built and maintained the internal design system across Figma and Storybook — from radio buttons and buttons through to form patterns. Now part of Liberty Mutual.",
  },
  {
    n: "03",
    co: "RLG Communications",
    role: "Creative Executive · 2014 – 2017",
    body: "An umbrella title for the work it actually was: UX/UI, graphic design, motion graphics, photography and videography. Led the visual identity for Radio 360 — every element mine, informed by client meetings and audience surveys.",
  },
  {
    n: "04",
    co: "Lando Services",
    role: "UX Designer and Front-End Developer · 2013 – 2014",
    body: "Responsive interfaces on a Node.js backend — CRUD, API integrations, and the tests that kept them honest. Where design and code stopped being two jobs.",
  },
];

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
        <div className="abt-portrait" aria-hidden="true">
          <Image
            src="/portrait/kwame-portrait-1600.webp"
            alt=""
            width={1600}
            height={2000}
            priority
            sizes="(max-width: 720px) 62vw, 42vw"
          />
        </div>
        <div className="abt-wrap">
          <p className="abt-contact">
            <a href="mailto:kwame.nimfah@gmail.com">kwame.nimfah@gmail.com</a>
            <span>Accra — Toronto — Washington DC</span>
          </p>

          <p className="abt-statement">
            I&apos;m a designer who builds. Communication design at KNUST, a masters in interactive
            media at Ohio, then ten years between <em>design systems</em> and front-end code. Hand me
            a messy operational problem and I&apos;ll find the decision hiding inside it.
          </p>

          <p className="abt-pill">Designer who builds</p>
          <p className="abt-subs">
            <span>Kwame Yeboah</span>
            <span>Learning experience design</span>
            <span>Product design</span>
            <span>Front-end</span>
          </p>
          <h1 className="abt-name">
            <span>Nimfah</span>
          </h1>
        </div>
      </section>

      <section className="abt-sec">
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

      <section className="abt-sec">
        <div className="abt-wrap">
          <div className="abt-sechead">
            <h2>I&apos;ve worked at</h2>
            <span className="abt-seclabel">2013 — present</span>
          </div>
          <div className="abt-xp">
            {XP.map((x, i) => (
              <details key={x.n} open={i === 0}>
                <summary>
                  <span className="abt-xp-n">{x.n}</span>
                  <span>
                    <span className="abt-xp-co">{x.co}</span>
                    <span className="abt-xp-role">{x.role}</span>
                  </span>
                  <span className="abt-xp-sign" aria-hidden="true">
                    {i === 0 ? "−" : "+"}
                  </span>
                </summary>
                <div>
                  <p>{x.body}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="abt-wrap">
        <div className="abt-end">
          <a className="abt-btn" href="mailto:kwame.nimfah@gmail.com">
            Shoot a message
          </a>
          <Link className="abt-btn abt-btn-ghost" href="/work">
            See the work
          </Link>
        </div>
      </section>
    </div>
  );
}
