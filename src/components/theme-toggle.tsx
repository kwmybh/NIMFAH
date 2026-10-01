"use client";

import { useTheme } from "./theme-provider";

// The nav's light/dark switch. It names the mode it switches TO, with a half-filled
// square as its mark. Both labels are rendered and CSS shows the right one from
// html[data-theme], so the label is correct from first paint: the server can't know
// the visitor's theme, and React won't patch text it was told to leave alone.
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();
  return (
    <button
      type="button"
      className={`theme-toggle ${className ?? ""}`}
      aria-label="Toggle light or dark mode"
      onClick={toggle}
    >
      <span className="theme-toggle-mark" aria-hidden="true" />
      <span className="theme-to-dark">Dark</span>
      <span className="theme-to-light">Light</span>
    </button>
  );
}
