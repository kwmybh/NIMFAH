"use client";

import { useEffect, useRef } from "react";

/* Variable-weight type that answers the pointer: each letter's weight eases toward
   `peak` as the cursor comes within `radius` px of it, and back to `base` as it leaves.
   The reference does this on its hero name; here it runs on any line of Rubik.

   Letters also rise in once on load, staggered (CSS: .swell-ch, --i). The visible
   letters are aria-hidden and the whole string is given to assistive tech once.
   Reduced motion: no rise, no swell — the line renders at its base weight. */

type Props = {
  text: string;
  base: number;
  peak: number;
  radius?: number;
  className?: string;
  /** What a screen reader hears, when the visible text carries decoration (NIMFAH_). */
  label?: string;
  delay?: number; // seconds before the first letter rises
};

export function SwellText({ text, label, base, peak, radius = 140, className, delay = 0 }: Props) {
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const h = host.current;
    if (!h) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const chars = Array.from(h.querySelectorAll<HTMLSpanElement>(".swell-ch"));
    const w = chars.map(() => base);
    let px = -9999;
    let py = -9999;
    let frame = 0;

    const tick = () => {
      let moving = false;
      chars.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const t = Math.max(0, 1 - d / radius);
        const target = base + (peak - base) * t * t * (3 - 2 * t);
        w[i] += (target - w[i]) * 0.18;
        if (Math.abs(target - w[i]) > 0.5) moving = true;
        el.style.fontVariationSettings = `"wght" ${Math.round(w[i])}`;
        el.style.fontWeight = String(Math.round(w[i] / 100) * 100);
      });
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      px = py = -9999;
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [base, peak, radius]);

  return (
    <span ref={host} className={`swell ${className ?? ""}`}>
      <span aria-hidden="true">
        {Array.from(text).map((ch, i) => (
          <span
            key={i}
            className="swell-ch"
            style={
              {
                "--i": i,
                "--d": `${delay}s`,
                fontVariationSettings: `"wght" ${base}`,
                fontWeight: base,
              } as React.CSSProperties
            }
          >
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
      <span className="tm-vh">{label ?? text}</span>
    </span>
  );
}
