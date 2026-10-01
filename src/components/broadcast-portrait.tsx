"use client";

import { useEffect, useRef } from "react";
import { interferenceTile } from "@/lib/interference";

/* The broadcast-interference variant of the hero portrait: the photo in its own colour,
   received over the air on a weak signal. A faint ghost of the picture sits a little to
   the right (multipath — the same signal arriving twice), its red and blue edges drift
   apart and back, and a woven interference pattern crawls across it. Now and then the
   reception fades for a moment and the ghost strengthens.

   Only the figure carries it (source-atop); the type over it is untouched. ~15fps.
   Reduced motion: one still frame. */

type Props = { src: string; alt: string; className?: string };

export function BroadcastPortrait({ src, alt, className }: Props) {
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
    let fadeUntil = 0;
    let nextFade = performance.now() + 3200;
    let colour: HTMLCanvasElement | null = null;
    let red: HTMLCanvasElement | null = null;
    let blue: HTMLCanvasElement | null = null;
    const weave = interferenceTile();

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (!alive) return;
      const W = Math.min(720, img.naturalWidth);
      const H = Math.round((W * img.naturalHeight) / img.naturalWidth);
      c.width = W;
      c.height = H;
      const make = (keep: "all" | "r" | "b") => {
        const o = document.createElement("canvas");
        o.width = W;
        o.height = H;
        const x = o.getContext("2d")!;
        x.drawImage(img, 0, 0, W, H);
        if (keep !== "all") {
          const d = x.getImageData(0, 0, W, H);
          for (let i = 0; i < d.data.length; i += 4) {
            if (keep === "r") { d.data[i + 1] *= 0.25; d.data[i + 2] *= 0.25; }
            else { d.data[i] *= 0.25; d.data[i + 1] *= 0.6; }
          }
          x.putImageData(d, 0, 0);
        }
        return o;
      };
      colour = make("all");
      red = make("r");
      blue = make("b");
      h.dataset.ready = "true";
      draw(performance.now());
      if (!still) frame = requestAnimationFrame(loop);
    };

    const draw = (now: number) => {
      if (!colour || !red || !blue) return;
      const W = c.width;
      const H = c.height;
      const t = now / 1000;
      const fading = now < fadeUntil;
      const split = 2 + 2 * Math.sin(t * 1.3) + (fading ? 3 : 0);
      const wobble = Math.round(Math.sin(t * 7.1) * (fading ? 3 : 0.6));

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);
      // ghost first, faint, to the right
      ctx.globalAlpha = fading ? 0.42 : 0.24;
      ctx.drawImage(colour, 16 + wobble, 0);
      // chroma split
      ctx.globalAlpha = 0.6;
      ctx.drawImage(red, -split + wobble, 0);
      ctx.drawImage(blue, split + wobble, 0);
      // the picture itself
      ctx.globalAlpha = fading ? 0.8 : 0.9;
      ctx.drawImage(colour, wobble, 0);

      // woven interference, crawling, on the figure only
      ctx.globalCompositeOperation = "source-atop";
      const pat = ctx.createPattern(weave, "repeat");
      if (pat) {
        ctx.save();
        ctx.translate((t * 18) % weave.width, (t * 9) % weave.height);
        ctx.globalAlpha = fading ? 0.16 : 0.09;
        ctx.fillStyle = pat;
        ctx.fillRect(-weave.width, -weave.height, W + 2 * weave.width, H + 2 * weave.height);
        ctx.restore();
      }
      // fine scanlines
      ctx.globalAlpha = 0.12;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = (now: number) => {
      if (now >= nextFade) {
        fadeUntil = now + 400 + Math.random() * 400;
        nextFade = now + 4000 + Math.random() * 5000;
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
  }, [src]);

  return (
    <div ref={host} className={`an-portrait ${className ?? ""}`} role="img" aria-label={alt}>
      <canvas ref={canvas} className="an-portrait-canvas" aria-hidden="true" />
    </div>
  );
}
