"use client";

import { useEffect, useRef } from "react";

// The reference runs seven canvases; the one that carries the pointer is its
// `dot-trail-canvas`. This is that: a fixed, pointer-events-none canvas under the
// blend-mode cursor square, emitting a decaying trail as the pointer moves.
//
// Squares, not circles. The system's border-radius is 0 everywhere by measurement, and a
// round particle is the one shape that would give the effect away as borrowed from
// somewhere else.

type Dot = { x: number; y: number; born: number; size: number };

const LIFE = 620;   // ms a dot survives
const MAX = 70;     // ring-buffer cap; beyond this the oldest is overwritten
const MIN_STEP = 9; // px the pointer must travel before another dot is laid down

export function DotTrail() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;

    // No pointer, no trail. Reduced motion gets nothing rather than a cheaper version.
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const ctx = cv.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = 1;
    const size = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.floor(window.innerWidth * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width = `${window.innerWidth}px`;
      cv.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();

    // The trail colour is read from --acid-fg rather than hard-coded, because bright
    // acid on the light ground is 1.23:1 — a trail nobody can see. Re-read when the
    // theme attribute changes so a toggle takes effect on the next frame.
    let rgb = "157, 241, 51";
    const readAccent = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue("--acid-fg").trim();
      const m = /^#?([0-9a-f]{6})$/i.exec(v);
      if (m) {
        const n = parseInt(m[1], 16);
        rgb = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
        return;
      }
      const p = /rgba?\(([^)]+)\)/.exec(v);
      if (p) rgb = p[1].split(",").slice(0, 3).map((x) => x.trim()).join(", ");
    };
    readAccent();
    const themeWatch = new MutationObserver(readAccent);
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const dots: Dot[] = [];
    let head = 0;
    let lastX = -999;
    let lastY = -999;
    let raf = 0;
    let idle = 0;

    const move = (e: PointerEvent) => {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (dx * dx + dy * dy < MIN_STEP * MIN_STEP) return;
      lastX = e.clientX;
      lastY = e.clientY;
      // Size tracks pointer speed, so a flick lays a heavier trail than a drift.
      const speed = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 90);
      const d: Dot = { x: e.clientX, y: e.clientY, born: performance.now(), size: 3 + speed * 5 };
      if (dots.length < MAX) dots.push(d);
      else { dots[head] = d; head = (head + 1) % MAX; }
      idle = 0;
    };

    const frame = () => {
      const now = performance.now();
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let alive = 0;
      for (const d of dots) {
        const age = (now - d.born) / LIFE;
        if (age >= 1) continue;
        alive++;
        // Fade and shrink together; ease-out so the tail thins quickly and lingers faintly.
        const k = 1 - age;
        const a = k * k * 0.85;
        const s = d.size * k;
        ctx.fillStyle = `rgba(${rgb}, ${a.toFixed(3)})`;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
      // Stop burning frames once the trail has fully decayed and the pointer is still.
      if (alive === 0 && ++idle > 30) { raf = 0; return; }
      raf = requestAnimationFrame(frame);
    };

    const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };
    const onMove = (e: PointerEvent) => { move(e); kick(); };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", size, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      themeWatch.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", size);
    };
  }, []);

  return <canvas ref={ref} className="dot-trail" aria-hidden="true" />;
}
