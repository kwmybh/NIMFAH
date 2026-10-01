"use client";

import { useEffect, useRef } from "react";

/* A portrait drawn as a live bitmap: the photo is sampled down to a coarse grid, each
   cell quantized to a handful of grey levels and jittered, then scaled back up with
   nearest-neighbour so every cell stays a hard square. The reference is the hero on
   mauriciojuba.com, which does the same thing in a 100-column 2D canvas.

   The source is a cut-out (transparent background), so the figure carries the noise
   and the ground stays near-black with only a sparse flicker — the photo never brings
   its own backdrop into the page.

   Colours come from the page's --bg and --fg, so the ground matches either theme
   without a second asset; the figure keeps photographic order in both.

   Reduced motion draws one frame and stops. Without JavaScript the baked PNG (the same
   treatment, rendered once at build time) shows instead. */

type Props = {
  src: string; // transparent cut-out
  fallback: string; // baked pixel PNG, same aspect
  alt: string;
  cols?: number;
  levels?: number;
  fps?: number;
  className?: string;
};

function readColor(el: Element, name: string, fallback: [number, number, number]) {
  const v = getComputedStyle(el).getPropertyValue(name).trim();
  const m = v.match(/^#([0-9a-f]{6})$/i);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255] as [number, number, number];
}

export function PixelPortrait({
  src,
  fallback,
  alt,
  cols = 100,
  levels = 7,
  fps = 10,
  className,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    const h = host.current;
    if (!c || !h) return;
    const ctx = c.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let frame = 0;
    let last = 0;
    let alive = true;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (!alive) return;
      const rows = Math.round((cols * img.naturalHeight) / img.naturalWidth);
      c.width = cols;
      c.height = rows;

      // Sample once: luminance and coverage per cell.
      const probe = document.createElement("canvas");
      probe.width = cols;
      probe.height = rows;
      const p = probe.getContext("2d")!;
      p.imageSmoothingQuality = "high";
      p.drawImage(img, 0, 0, cols, rows);
      const px = p.getImageData(0, 0, cols, rows).data;
      const n = cols * rows;
      const lum = new Float32Array(n);
      const cov = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const a = px[i * 4 + 3] / 255;
        const y = (0.2126 * px[i * 4] + 0.7152 * px[i * 4 + 1] + 0.0722 * px[i * 4 + 2]) / 255;
        lum[i] = Math.pow(y, 0.75); // lift the midtones so skin reads on a dark ground
        cov[i] = a;
      }

      const out = ctx.createImageData(cols, rows);
      const draw = () => {
        const bg = readColor(h, "--bg", [14, 14, 14]);
        const fg = readColor(h, "--fg", [236, 233, 228]);
        // The figure is a photograph, so it keeps photographic order — shadows dark,
        // light light — in either theme. Only the ground follows the page.
        const lightGround = bg[0] + bg[1] + bg[2] > fg[0] + fg[1] + fg[2];
        const lo = lightGround ? fg : bg;
        const hi = lightGround ? bg : fg;
        const d = out.data;
        for (let i = 0; i < n; i++) {
          const a = cov[i];
          let v = lum[i] + (Math.random() - 0.5) * 0.16 * a;
          v = Math.round(Math.min(1, Math.max(0, v)) * (levels - 1)) / (levels - 1);
          const t = 0.04 + v * 0.82;
          const cover = Math.min(1, a * 1.4);
          // The ground is transparent so the page (and its grain) shows through; a few
          // cells catch the light at random, the way the reference's backdrop flickers.
          const spark = cover < 0.05 && Math.random() < 0.035 ? Math.random() * 0.3 : 0;
          for (let k = 0; k < 3; k++) {
            d[i * 4 + k] = spark ? fg[k] : lo[k] + (hi[k] - lo[k]) * t;
          }
          d[i * 4 + 3] = 255 * (spark || cover);
        }
        ctx.putImageData(out, 0, 0);
      };

      h.dataset.ready = "true";
      draw();
      if (still) return;
      const step = 1000 / fps;
      const loop = (t: number) => {
        if (t - last >= step) {
          last = t;
          draw();
        }
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    };

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [src, cols, levels, fps]);

  return (
    <div ref={host} className={`px-portrait ${className ?? ""}`} role="img" aria-label={alt}>
      {/* eslint-disable-next-line @next/next/no-img-element -- a 3KB PNG scaled with
          image-rendering: pixelated; next/image would resample it smooth. */}
      <img className="px-portrait-fallback" src={fallback} alt="" aria-hidden="true" />
      <canvas ref={canvas} className="px-portrait-canvas" aria-hidden="true" />
    </div>
  );
}
