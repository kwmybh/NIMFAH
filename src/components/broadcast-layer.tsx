"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/lib/motion";
import { interferenceTile } from "@/lib/interference";

/* The broadcast variant's background: the woven interference pattern drifting faintly
   across the viewport, with a pair of red/blue hairlines (a ghosted line of picture)
   sliding slowly down it. Drawn over the page, never applied to it.
   `strength` scales it — 1 on home, lower on reading pages. ~12fps; one frame under
   reduced motion. */

export function BroadcastLayer({ className, strength = 1 }: { className?: string; strength?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = paused; // reduced motion or the nav Motion switch — see lib/motion.ts
    const weave = interferenceTile();

    const size = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    size();

    const draw = (now: number) => {
      const W = c.width;
      const H = c.height;
      const t = now / 1000;
      const dark = document.documentElement.dataset.theme === "dark";
      ctx.clearRect(0, 0, W, H);
      const pat = ctx.createPattern(weave, "repeat");
      if (pat) {
        ctx.save();
        ctx.translate((t * 12) % weave.width, (t * 6) % weave.height);
        ctx.globalAlpha = (dark ? 0.06 : 0.05) * strength;
        ctx.globalCompositeOperation = dark ? "screen" : "multiply";
        ctx.fillStyle = pat;
        ctx.fillRect(-weave.width, -weave.height, W + 2 * weave.width, H + 2 * weave.height);
        ctx.restore();
      }
      const y = ((t * 0.05) % 1.2 - 0.1) * H;
      ctx.globalAlpha = 0.22 * strength;
      ctx.fillStyle = "rgb(255,50,70)";
      ctx.fillRect(0, y, W, 1);
      ctx.fillStyle = "rgb(40,120,255)";
      ctx.fillRect(6, y + 3, W, 1);
      ctx.globalAlpha = 1;
    };

    let frame = 0;
    let last = 0;
    const loop = (now: number) => {
      if (now - last > 83) {
        last = now;
        draw(now);
      }
      frame = requestAnimationFrame(loop);
    };
    if (still) draw(0);
    else frame = requestAnimationFrame(loop);

    const onResize = () => size();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [strength, paused]);

  return <canvas ref={canvas} className={`signal-layer ${className ?? ""}`} aria-hidden="true" />;
}
