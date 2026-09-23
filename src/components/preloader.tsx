"use client";

import { useEffect, useState } from "react";

// Measured off the reference: fixed, z-index 10000, ground rgb(157,241,51) — which is
// exactly this system's --acid — with the percentage in Rajdhani 500 at ~24px in
// rgb(7,2,16), exactly --ink. Both tokens were already right; only the component was missing.
//
// One deliberate departure. The reference's own preloader sat at 0% for several minutes
// while 9 of its 17 images never arrived, which strands the entire site behind a green
// screen. A portfolio cannot do that to a hiring manager. So this one tracks real asset
// progress but is bounded: it always completes within CAP_MS whatever the network is
// doing, and it never renders at all until React has mounted, so a visitor without
// scripting sees the page rather than a blank overlay.

const CAP_MS = 2200;
const MIN_MS = 650; // below this it flashes rather than reads as an entrance
const KEY = "nimfah-preloaded";

// A fixed silhouette, not a random one — see the comment where it is used.
const BARS = [
  38, 52, 44, 61, 49, 73, 58, 66, 47, 80, 63, 71,
  55, 86, 68, 77, 59, 91, 72, 83, 64, 95, 76, 100,
];

export function Preloader() {
  // Not rendered during SSR: no scripting means no overlay, rather than an overlay that
  // can never dismiss itself.
  const [mounted, setMounted] = useState(false);
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let skip = false;
    try {
      // Once per session. Coming back from /work should not replay the intro.
      skip = sessionStorage.getItem(KEY) === "1";
    } catch {
      // Private mode, blocked storage — fall through and just play it.
    }
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    setMounted(true);

    const started = performance.now();
    let raf = 0;
    let shown = 0;

    const real = () => {
      const imgs = Array.from(document.images);
      const loaded = imgs.filter((i) => i.complete).length;
      const assets = imgs.length === 0 ? 1 : loaded / imgs.length;
      const elapsed = (performance.now() - started) / CAP_MS;
      // Whichever is further along — so a fast connection finishes early and a stalled
      // one still finishes on the clock. The counter can only ever go up.
      return Math.min(1, Math.max(assets * 0.65 + elapsed * 0.35, elapsed));
    };

    const tick = () => {
      const target = real();
      shown += (target - shown) * 0.12;
      const elapsed = performance.now() - started;
      if (target >= 0.999 && elapsed > MIN_MS) shown = 1;
      setPct(Math.round(shown * 100));
      if (shown >= 0.999) {
        setLeaving(true);
        window.setTimeout(() => {
          setDone(true);
          try { sessionStorage.setItem(KEY, "1"); } catch {}
        }, 620);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted || done) return null;

  // Bars are a fixed, uneven set rather than random: a loader that draws a different
  // silhouette on every visit reads as noise, and re-randomising per render would make
  // it flicker. 24 bars, filled left to right as the percentage advances.
  const bars = BARS.map((h, n) => ({ h, on: (n + 1) / BARS.length <= pct / 100 }));

  return (
    <div className="pre" data-leaving={leaving ? "true" : "false"} aria-hidden="true">
      <div className="pre-card">
        <div className="pre-head">
          <p className="pre-label">Loading</p>
          <p className="pre-pct">{pct}%</p>
        </div>

        <div className="pre-scale">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} data-on={pct >= t ? "true" : "false"}>{t}%</span>
          ))}
        </div>

        <div className="pre-bars">
          {bars.map((b, n) => (
            <i key={n} data-on={b.on ? "true" : "false"} style={{ height: `${b.h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
