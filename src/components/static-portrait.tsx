"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/lib/motion";
import { noiseTiles } from "@/lib/noise-tiles";

/* The TV-static variant of the hero portrait: the cut-out in grayscale on a set that
   can't quite hold the channel. Live snow crawls over the figure and every third line
   is darkened like a CRT's scanlines; once in a while the snow thickens for a beat, as
   if the signal dipped. Only the figure carries it (source-atop) — the page around it
   and the type over it stay clean.

   Snow is drawn from pre-rendered tiles at ~15fps. Reduced motion: one still frame. */

type Props = { src: string; alt: string; className?: string };

export function StaticPortrait({ src, alt, className }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const h = host.current;
    const c = canvas.current;
    if (!h || !c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = paused; // reduced motion or the nav Motion switch — see lib/motion.ts

    let alive = true;
    let frame = 0;
    let last = 0;
    let dipUntil = 0;
    let nextDip = performance.now() + 3000;
    let gray: HTMLCanvasElement | null = null;
    const tiles = noiseTiles();

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (!alive) return;
      const W = Math.min(720, img.naturalWidth);
      const H = Math.round((W * img.naturalHeight) / img.naturalWidth);
      c.width = W;
      c.height = H;
      const o = document.createElement("canvas");
      o.width = W;
      o.height = H;
      const x = o.getContext("2d")!;
      x.drawImage(img, 0, 0, W, H);
      const d = x.getImageData(0, 0, W, H);
      for (let i = 0; i < d.data.length; i += 4) {
        const y = Math.min(255, (0.2126 * d.data[i] + 0.7152 * d.data[i + 1] + 0.0722 * d.data[i + 2]) * 1.08);
        d.data[i] = d.data[i + 1] = d.data[i + 2] = y;
      }
      x.putImageData(d, 0, 0);
      gray = o;
      h.dataset.ready = "true";
      draw(performance.now());
      if (!still) frame = requestAnimationFrame(loop);
    };

    const draw = (now: number) => {
      if (!gray) return;
      const W = c.width;
      const H = c.height;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(gray, 0, 0);

      ctx.globalCompositeOperation = "source-atop";
      // snow
      const dip = now < dipUntil;
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      const pat = ctx.createPattern(tile, "repeat");
      if (pat) {
        ctx.save();
        ctx.translate(-Math.random() * tile.width, -Math.random() * tile.height);
        ctx.globalAlpha = dip ? 0.55 : 0.26;
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, W + tile.width, H + tile.height);
        ctx.restore();
      }
      // scanlines: every third line darkened
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      if (now >= nextDip) {
        dipUntil = now + 160 + Math.random() * 180;
        nextDip = now + 3500 + Math.random() * 5000;
      }
      if (now - last >= 66) {
        last = now;
        draw(now);
      }
      frame = requestAnimationFrame(loop);
    };

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [src, paused]);

  return (
    <div ref={host} className={`an-portrait ${className ?? ""}`} role="img" aria-label={alt}>
      <canvas ref={canvas} className="an-portrait-canvas" aria-hidden="true" />
    </div>
  );
}
