"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_IMAGE } from "@/lib/data";

// Subtle parallax: the lead artwork drifts vertically within its clipped frame as the page
// scrolls, so the wordmark reads as lifting off the image. The transform is applied to the
// `.hero-parallax` layer that wraps the fill <Image>, so it's independent of next/image's
// internals. rAF-throttled, and skipped under prefers-reduced-motion.
const SCALE = 1.14; // zoom that creates the overflow the image can drift within
const SHIFT = 0.055; // max drift as a fraction of frame height (kept < the scale's overflow)

export function Hero() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const layer = layerRef.current;
    if (!frame || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    layer.style.willChange = "transform";
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // 0 as the frame enters from the bottom → 1 as it leaves past the top.
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      const y = (progress - 0.5) * 2 * rect.height * SHIFT;
      layer.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${SCALE})`;
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
          <div className="hero-parallax" ref={layerRef}>
            <Image
              src={HERO_IMAGE}
              alt="Lead artwork — monochrome photograph"
              fill
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <h1 className="wordmark" aria-label="NIMFAH">
        NIMFAH
      </h1>
    </div>
  );
}
