"use client";

import { useTheme } from "./theme-provider";

// The light/dark switch (in the corner cluster, components/site-controls.tsx). Its
// spoken name says the mode it switches TO; the visible mark is a half-filled square. Both labels are rendered and CSS shows the right one from
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
      <span className="theme-to-dark vh-wrap"><span className="vh">Switch to dark mode</span></span>
      <span className="theme-to-light vh-wrap"><span className="vh">Switch to light mode</span></span>
    </button>
  );
}
