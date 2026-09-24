import type { Metadata } from "next";
import { SERIES, SHOW_PHOTOGRAPHY } from "@/lib/data";
import { WorkCard, type WorkItem } from "@/components/work-card";
import "../../work.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected learning experience design, product design and photography by Kwame Yeboah.",
};

const CASE_STUDIES: WorkItem[] = [
  {
    href: "/work/first-15-last-mile-onboarding",
    title: "First 15 — scenario-based onboarding for last-mile delivery",
    category: "Case study",
    meta: "A blended Rise 360 and Storyline 360 experience that trains new delivery associates to decide under pressure. Playable scenario, design document, developer-handoff storyboard.",
    thumb: { kind: "plate" },
  },
];

export default function WorkIndex() {
  const photography: WorkItem[] = (SHOW_PHOTOGRAPHY ? SERIES : []).map((s) => ({
    href: `/series/${s.idx}`,
    title: s.title,
    category: "Photography",
    meta: `${s.medium} · ${s.year}`,
    thumb: { kind: "image", src: s.frames[0], alt: `${s.title} — lead frame` },
  }));

  return (
    <section className="workidx">
      <div className="workidx-head">
        <h1 data-reveal="mask">Work</h1>
        <p className="workidx-lede" data-reveal="up" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          Learning and product design, documented end to end — the problem, the decisions, and the
          artefacts a team could actually build from.
        </p>
      </div>

      <ul className="wc-grid">
        {CASE_STUDIES.map((i, n) => (
          <WorkCard item={i} key={i.href} index={n} />
        ))}
      </ul>

      {photography.length > 0 ? (
        <>
          <div className="workidx-head workidx-head2">
            <h2 className="workidx-h2">Photography</h2>
            <p className="workidx-lede">Four series.</p>
          </div>

          <ul className="wc-grid">
            {photography.map((i, n) => (
              <WorkCard item={i} key={i.href} index={n} headingLevel={3} />
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
