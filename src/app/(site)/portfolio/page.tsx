import type { Metadata } from "next";
import { CATEGORIES } from "@/lib/portfolio";
import { CategoryGrid } from "@/components/category-tile";
import "../../work.css";
import "../../portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "The portfolio of creative technologist Kwame Nimfah — graphic design, UX/UI and learning design, one hub per discipline.",
};

// The hub (1 Oct 2026, replaces the Work index): one tile per category of work, laid
// out asymmetrically. Categories, their order and their tile sizes live in
// lib/portfolio.ts.
export default function Portfolio() {
  return (
    <section className="workidx pf">
      <div className="workidx-head">
        <h1 data-reveal="mask">Portfolio</h1>
        <p className="workidx-lede" data-reveal="up" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          Everything I make, by discipline — art, design and technology, each with its own room.
        </p>
      </div>
      <CategoryGrid cats={CATEGORIES} />
    </section>
  );
}
