"use client";

import { useTheme } from "./theme-provider";

// ☾ in light, ☀ in dark. suppressHydrationWarning covers the one-time glyph mismatch:
// SSR renders the light glyph, but on the client the provider reads the real (possibly
// dark) theme the inline script applied before paint.
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light or dark mode"
      onClick={toggle}
      suppressHydrationWarning
    >
      {theme === "dark" ? "☀" : "☾"}
    </button>
  );
}
