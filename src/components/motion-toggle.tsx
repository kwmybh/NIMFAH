"use client";

import { setMotionPaused, useMotionPaused } from "@/lib/motion";

// Pause / play for the site's continuous motion (WCAG 2.2.2). The visible word names the
// action the button will take and the hidden word completes it into the accessible name
// ("Pause motion" / "Play motion") — so the spoken name always contains the visible text
// (2.5.3), which a fixed name with aria-pressed could not do.
export function MotionToggle({ className }: { className?: string }) {
  const paused = useMotionPaused();
  return (
    <button
      type="button"
      className={`motion-toggle ${className ?? ""}`}
      onClick={() => setMotionPaused(!paused)}
    >
      <span className={`motion-glyph ${paused ? "is-play" : "is-pause"}`} aria-hidden="true" />
      <span className="motion-word">{paused ? "Play" : "Pause"}</span>
      <span className="vh"> motion</span>
    </button>
  );
}
