"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

// Replaces the five-screen pinned sequence. The reference rotates one large word per
// offer on a single centred screen; it rotates three services, so the analogue here is
// the three disciplines already named on the page rather than invented ones.
//
// A carousel and a scroll-pinned hero are alternative answers to the same question, not
// layers, so the pinned version is removed rather than kept alongside.

const SLIDES = [
  {
    word: "Learning.",
    label: "Learning experience design",
    line: "Scenario-based onboarding, design documents and job aids — the content distributed teams learn from without being taught.",
  },
  {
    word: "Product.",
    label: "Product design",
    line: "Research synthesised into journey maps, patterns and documentation, so a team can see the decision before it builds.",
  },
  {
    word: "Code.",
    label: "Front-end",
    line: "React, TypeScript and CSS — so the thing gets built and shipped, not only specified.",
  },
];

const DWELL = 5500;

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [armed, setArmed] = useState(false);
  const still = useRef(false);
  const hold = useRef(false);

  useEffect(() => {
    still.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reduced motion never auto-advances. WCAG 2.2.2 wants a way to stop moving
    // content; not starting it is the strongest form of that.
    if (still.current) setPlaying(false);
    setArmed(true);
  }, []);

  const go = useCallback((n: number) => {
    setI((c) => (c + n + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = window.setInterval(() => {
      // Pause while the pointer or keyboard focus is inside the hero: advancing a word
      // out from under someone who is reading it is the thing people hate about these.
      if (!hold.current) setI((c) => (c + 1) % SLIDES.length);
    }, DWELL);
    return () => window.clearInterval(t);
  }, [playing]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { go(1); setPlaying(false); }
    if (e.key === "ArrowLeft") { go(-1); setPlaying(false); }
  };

  return (
    <section
      className="cx"
      data-armed={armed ? "true" : "false"}
      onMouseEnter={() => { hold.current = true; }}
      onMouseLeave={() => { hold.current = false; }}
      onFocusCapture={() => { hold.current = true; }}
      onBlurCapture={() => { hold.current = false; }}
      onKeyDown={onKey}
      aria-roledescription="carousel"
      aria-label="Disciplines"
    >
      <div className="bleed cx-inner">
        <h1 className="cx-name">Kwame Yeboah</h1>
        <p className="cx-tag">
          I&apos;m a designer who builds. Hand me a messy operational problem and I&apos;ll
          find the <em>decision</em> hiding inside it.
        </p>

        <div className="cx-stage" aria-live="polite" aria-atomic="true">
          {SLIDES.map((s, n) => (
            <p
              key={s.word}
              className="cx-word"
              data-on={n === i ? "true" : "false"}
              aria-hidden={n === i ? undefined : "true"}
            >
              {s.word}
            </p>
          ))}
        </div>

        <div className="cx-meta">
          <p className="cx-label t-label-sm">{SLIDES[i].label}</p>
          <p className="cx-line">{SLIDES[i].line}</p>
        </div>

        <Link className="cx-jump" href="/work">
          Selected work ↓
        </Link>
      </div>

      <div className="cx-controls">
        <button
          type="button"
          className="cx-btn"
          onClick={() => { go(-1); setPlaying(false); }}
          aria-label="Previous discipline"
        >
          ‹
        </button>

        <span className="cx-rail" aria-hidden="true">
          <span
            className="cx-fill"
            data-running={playing && armed ? "true" : "false"}
            key={`${i}-${playing}`}
            style={{ animationDuration: `${DWELL}ms` }}
          />
        </span>

        <button
          type="button"
          className="cx-btn"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the carousel" : "Play the carousel"}
        >
          {playing ? "❙❙" : "▶"}
        </button>

        <button
          type="button"
          className="cx-btn"
          onClick={() => { go(1); setPlaying(false); }}
          aria-label="Next discipline"
        >
          ›
        </button>

        <p className="cx-count t-label-sm" aria-hidden="true">
          {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
      </div>
    </section>
  );
}
