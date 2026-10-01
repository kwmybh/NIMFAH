"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

// v2 since 1 Oct 2026, when light became the default: the old key held "dark" for anyone
// who had ever loaded the site under the dark default, not only people who chose it.
export const THEME_KEY = "nimfah-theme-v2";

// Inline script injected into <head> so the theme is applied before first paint (no flash).
// Light is the default (1 Oct 2026). A persisted choice from the footer switch still wins.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_KEY}")||"light";document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lazy initializer reads the attribute the inline script already set on the client,
  // so hydration matches without a post-mount flip. On the server there is no document,
  // so we fall back to "light" (the SSR default); the toggle button suppresses the
  // resulting one-time attribute mismatch.
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== "undefined") {
      const attr = document.documentElement.getAttribute("data-theme");
      if (attr === "dark" || attr === "light") return attr;
    }
    return "light";
  });

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // localStorage unavailable (private mode / disabled) — theme still applies in-session.
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
