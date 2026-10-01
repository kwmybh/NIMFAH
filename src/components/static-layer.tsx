"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/lib/motion";
import { noiseTiles } from "@/lib/noise-tiles";

/* The TV-static variant's background: fine live snow and CRT scanlines across the
   viewport, very faint. Drawn over the page (pointer-events none), never applied to
   it, so text is never blurred or shifted — only lightly grained.

   `strength` scales it: 1 on the home hero, lower over reading pages. Half resolution,
   ~12fps. Reduced motion: one still frame. */

export function StaticLayer({ className, strength = 1 }: { className?: string; strength?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = paused; // reduced motion or the nav Motion switch — see lib/motion.ts
    const tiles = noiseTiles();

    const S = 2;
    const size = () => {
      c.width = Math.ceil(window.innerWidth / S);
      c.height = Math.ceil(window.innerHeight / S);
    };
    size();

    const draw = () => {
      const W = c.width;
      const H = c.height;
      const dark = document.documentElement.dataset.theme === "dark";
      ctx.clearRect(0, 0, W, H);
      const tile = tiles[Math.floor(Math.random() * tiles.length)];
      const pat = ctx.createPattern(tile, "repeat");
      if (pat) {
        ctx.save();
        ctx.translate(-Math.random() * tile.width, -Math.random() * tile.height);
        ctx.globalAlpha = (dark ? 0.09 : 0.07) * strength;
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, W + tile.width, H + tile.height);
        ctx.restore();
      }
      ctx.globalAlpha = (dark ? 0.22 : 0.06) * strength;
      ctx.fillStyle = "#000";
      for (let y = 0; y < H; y += 2) ctx.fillRect(0, y, W, 1);
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      if (now - last > 83) {
        last = now;
        draw();
      }
      frame = requestAnimationFrame(loop);
    };
    if (still) draw();
    else frame = requestAnimationFrame(loop);

    const onResize = () => {
      size();
      draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [strength, paused]);

  return <canvas ref={canvas} className={`signal-layer ${className ?? ""}`} aria-hidden="true" />;
}
