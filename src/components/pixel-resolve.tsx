"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Work-card thumbnails at rest are drawn as a coarse colour bitmap — the same device as
   the portrait on the front door — and resolve into the real thumbnail when the card is
   hovered or focused: four quick steps up in resolution, then the canvas fades and the
   sharp image underneath is what's left.

   The bitmap is sampled from `source` when given (First 15's thumbnail is live type, not
   an image, so it brings a snapshot of itself), otherwise from the <img> inside.

   Touch screens have no hover, so each card resolves once as it scrolls into view and
   stays resolved. Reduced motion skips the effect: the canvas never draws. */

const REST = 18; // columns at rest: coarse, but the layout of the board still reads
const STEPS = [28, 44, 72]; // columns on the way up, ~70ms apart
const STEP_MS = 70;

type Props = { children: ReactNode; source?: string; className?: string };

export function PixelResolve({ children, source, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h = host.current;
    const c = canvas.current;
    if (!h || !c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let img: HTMLImageElement | null = null;
    let timers: number[] = [];
    let resolved = false;
    const clear = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };

    // Downsample the source into a cols × rows grid, letterboxed the way the visible
    // thumbnail is (object-fit: contain on white), so the bitmap lines up with it.
    const draw = (cols: number) => {
      if (!img || !img.naturalWidth) return;
      const W = h.clientWidth || 4;
      const H = h.clientHeight || 3;
      const rows = Math.max(1, Math.round((cols * H) / W));
      c.width = cols;
      c.height = rows;
      const bg = getComputedStyle(h).backgroundColor || "#fff";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cols, rows);
      const s = Math.min(cols / img.naturalWidth, rows / img.naturalHeight);
      const fit = h.dataset.fit === "cover"
        ? Math.max(cols / img.naturalWidth, rows / img.naturalHeight)
        : s;
      const w = img.naturalWidth * fit;
      const hh = img.naturalHeight * fit;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (cols - w) / 2, (rows - hh) / 2, w, hh);
    };

    const rest = () => {
      clear();
      resolved = false;
      draw(STEPS[0]);
      timers.push(window.setTimeout(() => draw(REST), STEP_MS));
      h.dataset.state = "rest";
    };
    const resolve = () => {
      if (resolved) return;
      clear();
      resolved = true;
      STEPS.forEach((cols, i) => timers.push(window.setTimeout(() => draw(cols), i * STEP_MS)));
      timers.push(window.setTimeout(() => (h.dataset.state = "clear"), STEPS.length * STEP_MS));
    };

    const start = () => {
      draw(REST);
      h.dataset.state = "rest";
      const link = h.closest("a") ?? h;
      const touch = window.matchMedia("(hover: none)").matches;
      if (touch) {
        const io = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              // a beat after it arrives, so the resolve is seen rather than missed
              timers.push(window.setTimeout(resolve, 250));
              io.disconnect();
            }
          },
          { threshold: 0.6 },
        );
        io.observe(h);
        return () => io.disconnect();
      }
      link.addEventListener("pointerenter", resolve);
      link.addEventListener("pointerleave", rest);
      link.addEventListener("focusin", resolve);
      link.addEventListener("focusout", rest);
      return () => {
        link.removeEventListener("pointerenter", resolve);
        link.removeEventListener("pointerleave", rest);
        link.removeEventListener("focusin", resolve);
        link.removeEventListener("focusout", rest);
      };
    };

    let stop: (() => void) | undefined;
    let alive = true;
    const ready = (el: HTMLImageElement) => {
      if (!alive) return;
      img = el;
      stop = start();
    };

    if (source) {
      const el = new Image();
      el.decoding = "async";
      el.onload = () => ready(el);
      el.src = source;
    } else {
      const el = h.querySelector("img");
      if (el) {
        if (el.complete && el.naturalWidth) ready(el);
        else el.addEventListener("load", () => ready(el), { once: true });
      }
    }

    return () => {
      alive = false;
      clear();
      stop?.();
    };
  }, [source]);

  return (
    <div ref={host} className={`px-resolve ${className ?? ""}`} data-state="clear">
      {children}
      <canvas ref={canvas} className="px-resolve-canvas" aria-hidden="true" />
    </div>
  );
}
