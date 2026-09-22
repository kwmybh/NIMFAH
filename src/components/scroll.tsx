"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Two scroll behaviours, both dependency-free.
//
// ScrollReveal is a single IntersectionObserver over every [data-reveal] on the page,
// rather than a wrapper component. That keeps the pages server-rendered: a section opts
// in with an attribute instead of becoming a client component. Elements are unobserved
// once revealed — nothing re-hides on the way back up, because a section that flickers
// out as you scroll past reads as a bug, not a flourish.
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (nodes.length === 0) return;

    // Reduced motion: show everything immediately. The content is the point; the
    // entrance is not.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => { n.dataset.revealed = "true"; });
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => { n.dataset.revealed = "true"; });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.revealed = "true";
          io.unobserve(el);
        }
      },
      // -12% on the bottom edge so a section commits after it has properly entered,
      // not the instant one pixel of it clears the fold.
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );

    // Anything already on screen reveals without waiting for a scroll that may never
    // come. Guarded on a real viewport: in a background tab or a hidden panel
    // innerHeight is 0, every rect measures against zero, nothing passes, and
    // IntersectionObserver does not fire there either — which would leave the page
    // blank until the tab was scrolled.
    const pass = () => {
      const h = window.innerHeight;
      if (h === 0) return false;
      for (const n of nodes) {
        if (n.dataset.revealed === "true") continue;
        if (n.getBoundingClientRect().top < h * 0.88) {
          n.dataset.revealed = "true";
          io.unobserve(n);
        } else {
          io.observe(n);
        }
      }
      return true;
    };

    const measured = pass();

    // If there was no viewport to measure, run the pass again as soon as there is one.
    const onVisible = () => { if (pass()) document.removeEventListener("visibilitychange", onVisible); };
    if (!measured) document.addEventListener("visibilitychange", onVisible);

    // Last resort. If nothing at all has revealed after five seconds, the observer is
    // not doing its job for a reason worth not guessing at — so show everything. A
    // portfolio that skips an animation is fine; a portfolio that is blank is not.
    // Scoped to "nothing revealed" rather than a blanket timer, so a section the
    // visitor simply has not scrolled to yet still gets its entrance.
    const failsafe = window.setTimeout(() => {
      if (nodes.some((n) => n.dataset.revealed === "true")) return;
      nodes.forEach((n) => { n.dataset.revealed = "true"; });
    }, 5000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [pathname]);

  return null;
}

// A 1px acid hairline across the top of the viewport. The design system allows itself
// hairlines and uses acid structurally, so progress gets a rule rather than a bar.
// Width is written straight to the node; no state, no re-render per scroll event.
export function ScrollProgress() {
  useEffect(() => {
    const el = document.getElementById("scroll-progress");
    if (!el) return;

    let raf = 0;
    const paint = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(paint); };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <span id="scroll-progress" className="progress" aria-hidden="true" />;
}
