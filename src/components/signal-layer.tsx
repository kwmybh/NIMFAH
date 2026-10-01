"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/lib/motion";

/* The analog variant's background: a faint VHS tracking layer over the whole viewport.
   A few hairline tracking lines drift down the screen; every so often a band of tape
   noise crawls through, its edge split red/blue. Subtle — the layer sits at a few
   percent opacity and never moves or blurs the page content; it is drawn over it, not
   applied to it.

   Fixed, pointer-events none, and half resolution. Reduced motion: one still frame. */

// `strength` scales every alpha: 1 on the home hero, lower over reading pages.
export function SignalLayer({ className, strength = 1 }: { className?: string; strength?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const paused = useMotionPaused();

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = paused; // reduced motion or the nav Motion switch — see lib/motion.ts

    const S = 2; // half resolution
    const size = () => {
      c.width = Math.ceil(window.innerWidth / S);
      c.height = Math.ceil(window.innerHeight / S);
    };
    size();

    const lines = Array.from({ length: 5 }, () => ({ y: Math.random(), v: 0.004 + Math.random() * 0.01 }));
    let band = -0.2;
    let bandNext = performance.now() + 2500;
    let frame = 0;
    let last = performance.now();
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const draw = () => {
      const W = c.width;
      const H = c.height;
      const dark = document.documentElement.dataset.theme === "dark";
      const ink = dark ? "255,255,255" : "20,20,20";
      ctx.clearRect(0, 0, W, H);

      // drifting tracking hairlines, broken into dashes
      for (const l of lines) {
        const y = l.y * H;
        for (let x = 0; x < W; x += rand(8, 40)) {
          ctx.fillStyle = `rgba(${ink},${rand(0.04, 0.16) * strength})`;
          ctx.fillRect(x, y, rand(4, 30), 1);
        }
      }
      // the crawling noise band, red/blue split at its edges
      if (band > -0.1 && band < 1.1) {
        const y0 = band * H;
        const bh = H * 0.05;
        for (let i = 0; i < 260; i++) {
          ctx.fillStyle = `rgba(${ink},${rand(0.04, 0.26) * strength})`;
          ctx.fillRect(rand(0, W), y0 + rand(0, bh), rand(2, 24), 1);
        }
        ctx.fillStyle = `rgba(255,40,60,${0.16 * strength})`;
        ctx.fillRect(0, y0 - 1, W, 1);
        ctx.fillStyle = `rgba(40,120,255,${0.16 * strength})`;
        ctx.fillRect(0, y0 + bh + 1, W, 1);
      }
    };

    const loop = (now: number) => {
      if (now - last > 66) {
        const dt = (now - last) / 1000;
        last = now;
        for (const l of lines) {
          l.y += l.v * dt * 6;
          if (l.y > 1) l.y = 0;
        }
        if (band > -0.1 && band < 1.1) band += dt * 0.18;
        else if (now > bandNext) {
          band = -0.09;
          bandNext = now + rand(6000, 12000);
        }
        draw();
      }
      frame = requestAnimationFrame(loop);
    };
    if (still) draw();
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
