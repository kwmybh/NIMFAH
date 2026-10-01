"use client";

import { useEffect, useRef } from "react";

/* The analog variant of the hero portrait: the cut-out photo in grayscale, as if played
   from a worn tape. Every few seconds the tracking slips — a handful of horizontal bands
   jump sideways with their red and blue split apart — then the picture settles. A thin
   strip of tracking noise crawls along the bottom of the figure the whole time.

   Subtle by design: bursts last ~280ms, displacement tops out around 24px, and only the
   portrait glitches — the type over it is never touched. Bursts are spaced 2.5–6s apart,
   far below the three-flashes-a-second threshold (WCAG 2.3.1). Reduced motion: one clean
   frame, no bursts, no crawl. */

type Props = { src: string; alt: string; className?: string };

export function AnalogPortrait({ src, alt, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h = host.current;
    const c = canvas.current;
    if (!h || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alive = true;
    let frame = 0;
    let last = 0;
    let burstUntil = 0;
    let nextBurst = performance.now() + 1800;
    let gray: HTMLCanvasElement | null = null;
    let red: HTMLCanvasElement | null = null;
    let blue: HTMLCanvasElement | null = null;

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (!alive) return;
      const W = Math.min(900, img.naturalWidth);
      const H = Math.round((W * img.naturalHeight) / img.naturalWidth);
      c.width = W;
      c.height = H;

      // Three pre-tinted copies: luminance in gray, red only, blue only — the split is
      // then just drawing the tints a few pixels apart.
      const make = (fn: (y: number) => [number, number, number]) => {
        const o = document.createElement("canvas");
        o.width = W;
        o.height = H;
        const x = o.getContext("2d")!;
        x.drawImage(img, 0, 0, W, H);
        const d = x.getImageData(0, 0, W, H);
        for (let i = 0; i < d.data.length; i += 4) {
          const y = 0.2126 * d.data[i] + 0.7152 * d.data[i + 1] + 0.0722 * d.data[i + 2];
          const [r, g, b] = fn(Math.min(255, y * 1.06));
          d.data[i] = r;
          d.data[i + 1] = g;
          d.data[i + 2] = b;
        }
        x.putImageData(d, 0, 0);
        return o;
      };
      gray = make((y) => [y, y, y]);
      red = make((y) => [255, y * 0.35, y * 0.35]);
      blue = make((y) => [y * 0.35, y * 0.7, 255]);
      h.dataset.ready = "true";
      draw(performance.now());
      if (!still) frame = requestAnimationFrame(loop);
    };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const draw = (now: number) => {
      if (!gray || !red || !blue) return;
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);
      const bursting = now < burstUntil;

      if (!bursting) {
        ctx.drawImage(gray, 0, 0);
      } else {
        // Base picture with a faint constant chroma offset while the tape slips…
        ctx.globalAlpha = 0.55;
        ctx.drawImage(red, -3, 0);
        ctx.drawImage(blue, 3, 0);
        ctx.globalAlpha = 1;
        ctx.drawImage(gray, 0, 0);
        // …then 3–6 bands torn sideways, each with its own split.
        const bands = Math.floor(rand(3, 7));
        for (let i = 0; i < bands; i++) {
          const y = Math.floor(rand(0, H * 0.92));
          const bh = Math.floor(rand(4, H * 0.06));
          const dx = Math.round(rand(-24, 24));
          ctx.clearRect(0, y, W, bh);
          ctx.globalAlpha = 0.7;
          ctx.drawImage(red, 0, y, W, bh, dx - 5, y, W, bh);
          ctx.drawImage(blue, 0, y, W, bh, dx + 5, y, W, bh);
          ctx.globalAlpha = 1;
          ctx.drawImage(gray, 0, y, W, bh, dx, y, W, bh);
        }
      }

      // Tracking noise: a thin strip near the bottom of the figure, short bright and
      // dark dashes, drawn only where the figure is (source-atop).
      if (!still) {
        ctx.save();
        ctx.globalCompositeOperation = "source-atop";
        const band = H * 0.86 + Math.sin(now / 900) * H * 0.02;
        for (let i = 0; i < 70; i++) {
          const y = band + rand(-H * 0.012, H * 0.012);
          ctx.fillStyle = Math.random() < 0.6 ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";
          ctx.fillRect(rand(0, W), y, rand(6, 60), 1.5);
        }
        ctx.restore();
      }
    };

    const loop = (now: number) => {
      if (now >= nextBurst) {
        burstUntil = now + rand(220, 320);
        nextBurst = now + rand(2500, 6000);
      }
      // 30fps during a burst, 12fps otherwise — the crawl needs little.
      const step = now < burstUntil ? 33 : 83;
      if (now - last >= step) {
        last = now;
        draw(now);
      }
      frame = requestAnimationFrame(loop);
    };

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [src]);

  return (
    <div ref={host} className={`an-portrait ${className ?? ""}`} role="img" aria-label={alt}>
      <canvas ref={canvas} className="an-portrait-canvas" aria-hidden="true" />
    </div>
  );
}
