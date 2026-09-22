"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

// The reference's hero is not one screen — it is 4,449px of scroll (5.4 viewports) with
// the stage pinned while the name assembles across it. A static hero with a fade-up is a
// different kind of object, which is why matching the palette and the typefaces never
// closed the gap.
//
// Hand-rolled rather than GSAP/ScrollTrigger: one scroll listener, one rAF, and styles
// written straight to four layer nodes. No dependency, and nothing here needs a timeline.

// Each layer owns a window of the 0..1 scroll progress. `in` is where it starts arriving,
// `hold` where it is fully present, `out` where it starts leaving, `gone` where it has.
// Windows overlap on purpose: the outgoing line is still leaving as the next arrives.
type Layer = { key: string; in: number; hold: number; out: number; gone: number };

const LAYERS: Layer[] = [
  { key: "intro",   in: 0.00, hold: 0.00, out: 0.14, gone: 0.26 },
  { key: "first",   in: 0.20, hold: 0.32, out: 0.44, gone: 0.54 },
  { key: "second",  in: 0.48, hold: 0.60, out: 0.70, gone: 0.78 },
  { key: "resolve", in: 0.74, hold: 0.86, out: 1.10, gone: 1.20 },
];

// Smoothstep rather than linear: layers ease in and out of their own windows, so the
// sequence reads as one continuous move instead of four crossfades.
const smooth = (t: number) => t * t * (3 - 2 * t);
const span = (p: number, a: number, b: number) =>
  b === a ? (p >= b ? 1 : 0) : Math.min(1, Math.max(0, (p - a) / (b - a)));

export function HeroSequence() {
  const wrap = useRef<HTMLElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const w = wrap.current;
    const s = stage.current;
    if (!w || !s) return;

    // Reduced motion gets the whole hero at once, unpinned: the section collapses to one
    // screen and every layer sits visible. The content is the point; the choreography is not.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      w.dataset.seq = "static";
      return;
    }
    w.dataset.seq = "live";

    const nodes = LAYERS.map((l) => ({
      l,
      el: s.querySelector<HTMLElement>(`[data-layer="${l.key}"]`),
    })).filter((n): n is { l: Layer; el: HTMLElement } => n.el !== null);

    let raf = 0;

    const paint = () => {
      raf = 0;
      const rect = w.getBoundingClientRect();
      const travel = w.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / travel));

      for (const { l, el } of nodes) {
        const arrive = smooth(span(p, l.in, l.hold));
        const leave = smooth(span(p, l.out, l.gone));
        const present = arrive * (1 - leave);

        // Arriving lifts from below and leaving continues upward — one direction of travel
        // through the whole sequence, so it reads as the page moving past a fixed frame
        // rather than each line bouncing in and back out.
        const y = (1 - arrive) * 44 - leave * 44;
        el.style.opacity = String(present);
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
        el.style.visibility = present < 0.004 ? "hidden" : "visible";
      }

      // Exposed for the HUD rules and anything else that wants the raw progress.
      s.style.setProperty("--p", p.toFixed(4));
    };

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="hs" ref={wrap}>
      <h1 className="hs-sr">Kwame Yeboah — designer who builds</h1>
      <div className="hs-stage" ref={stage}>
        <div className="hs-hud" aria-hidden="true">
          <span className="hs-col" style={{ left: "25%" }} />
          <span className="hs-col" style={{ left: "50%" }} />
          <span className="hs-col" style={{ left: "75%" }} />
          <span className="hs-tick hs-tl" />
          <span className="hs-tick hs-tr" />
          <span className="hs-tick hs-bl" />
          <span className="hs-tick hs-br" />
        </div>

        <div className="hs-layer" data-layer="intro">
          <div className="bleed hs-inner">
            <p className="hs-contact t-label-sm">
              <a href="mailto:kwame.nimfah@gmail.com">kwame.nimfah@gmail.com</a>
            </p>
            <p className="hs-statement t-body-lg">
              I&apos;m a designer who builds. Hand me a messy operational problem and I&apos;ll
              find the <em>decision</em> hiding inside it — then design, write and ship the
              thing that helps someone make it under pressure.
            </p>
          </div>
        </div>

        <div className="hs-layer hs-layer-name" data-layer="first">
          <div className="bleed hs-inner">
            <p className="hs-word" aria-hidden="true">Kwame</p>
          </div>
        </div>

        <div className="hs-layer hs-layer-name" data-layer="second">
          <div className="bleed hs-inner">
            <p className="hs-word" aria-hidden="true">Yeboah</p>
          </div>
        </div>

        <div className="hs-layer" data-layer="resolve">
          <div className="bleed hs-inner hs-inner-resolve">
            <p className="hs-pill t-label">Designer who builds</p>
            <p className="hs-subs t-label-sm">
              <span>Learning experience design</span>
              <span>Product design</span>
              <span>Front-end</span>
            </p>
            <p className="hs-mark t-display-1" aria-hidden="true">Nimfah</p>
            <Link className="hs-jump t-label-sm" href="/work">
              Selected work ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
