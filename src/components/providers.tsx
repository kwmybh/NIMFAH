"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

// Contexts only. The shared chrome — header, footer, preloader, motion layer — lives in
// SiteChrome, which app/(site)/layout.tsx mounts. Routes outside that group (currently
// /terminal, which brings its own nav, progress bar and frame) get the contexts and
// nothing else, so the theme toggle is still the site's toggle and a visitor's choice
// survives moving between them.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
