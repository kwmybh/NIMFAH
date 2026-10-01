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
      onClick={toggle}
    >
      <span className="theme-toggle-mark" aria-hidden="true" />
      <span className="theme-to-dark"><span className="vh">Switch to </span><span className="tw">Dark</span><span className="vh"> mode</span></span>
      <span className="theme-to-light"><span className="vh">Switch to </span><span className="tw">Light</span><span className="vh"> mode</span></span>
    </button>
  );
}
