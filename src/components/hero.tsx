"use client";

import { useEffect, useRef } from "react";

// Subtle parallax: the lead artwork drifts vertically within its clipped frame as the page
// scrolls, so the wordmark reads as lifting off the image. Transform-only (compositor
// friendly), throttled with requestAnimationFrame, and skipped under prefers-reduced-motion
// to honor the design's minimal-motion ethos.
const SCALE = 1.14; // zoom that creates the overflow the image can drift within
const SHIFT = 0.055; // max drift as a fraction of frame height (kept < the scale's overflow)

export function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const img = imgRef.current;
    if (!frame || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    img.style.willChange = "transform";
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 as the frame enters from the bottom → 1 as it leaves past the top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const y = (progress - 0.5) * 2 * rect.height * SHIFT;
      img.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${SCALE})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hero">
      <div className="hero-frame">
        <div className="hero-img" ref={frameRef}>
          {/* eslint-disable-next-line @next/next/no-img-element -- royalty-free placeholder, replaced with client work */}
          <img
            ref={imgRef}
            src="https://picsum.photos/seed/nimfah-a/1800/1070?grayscale"
            alt="Lead artwork — monochrome photograph"
          />
        </div>
      </div>
      <h1 className="wordmark" aria-label="NIMFAH">
        NIMFAH
      </h1>
    </div>
  );
}
