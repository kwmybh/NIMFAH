"use client";

import { useEffect, useRef } from "react";

// The reference site's most identifiable move, implemented from measurement rather than
// impression: a 60x60 square (radius 0) at z-index 60 with mix-blend-mode: difference,
// which is why it inverts whatever it passes over. The native cursor is NOT hidden —
// the reference sets `body { cursor: auto }` and no element sets `cursor: none`. The
// square accompanies the real pointer; it does not replace it.
//
// Position is written straight to the element in a rAF loop, never through React state,
// so the lerp costs no re-renders. The lag IS the effect — a direct assignment reads as
// a sticker on the pointer.
export function Cursor() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Pointer-coarse devices have no hover, and a lagging square with no pointer to
    // follow is noise. Reduced motion gets nothing at all rather than a jumpy version.
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || still.matches) return;

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, label';
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    let seen = false;

    const frame = () => {
      // 0.18 was picked by eye against the reference's trail length: high enough to keep
      // up with a fast flick, low enough that the square is visibly behind the pointer.
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      el.style.transform = `translate3d(${x - 30}px, ${y - 30}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        // Jump to the pointer on the first move so the square doesn't sail in from
        // the middle of the screen on page load.
        seen = true;
        x = tx;
        y = ty;
        el.dataset.on = "true";
      }
      const over = (e.target as Element | null)?.closest?.(INTERACTIVE);
      el.dataset.hot = over ? "true" : "false";
    };

    const leave = () => { el.dataset.on = "false"; };
    const enter = () => { if (seen) el.dataset.on = "true"; };
    const down = () => { el.dataset.down = "true"; };
    const up = () => { el.dataset.down = "false"; };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  return <div ref={ref} className="cursor" aria-hidden="true" data-on="false" />;
}
