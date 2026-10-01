"use client";

import { ThemeToggle } from "./theme-toggle";
import { MotionToggle } from "./motion-toggle";

// Settings, not destinations (1 Oct 2026): the light/dark and pause/play switches
// moved out of the nav into a small cluster pinned to the bottom-right corner of every
// page. Icon-only; each keeps its full spoken name ("Switch to dark mode", "Pause
// motion") in visually-hidden text, and Pause stays one Tab stop from anywhere
// (WCAG 2.2.2 wants it easy to reach).
export function SiteControls() {
  return (
    <aside className="ctl" aria-label="Display settings">
      <ThemeToggle className="ctl-btn" />
      <MotionToggle className="ctl-btn" />
    </aside>
  );
}
