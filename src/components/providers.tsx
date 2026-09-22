"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { Header } from "./header";
import { Footer } from "./footer";
import { Cursor } from "./cursor";
import { Preloader } from "./preloader";
import { DotTrail } from "./dot-trail";
import { ScrollProgress, ScrollReveal } from "./scroll";

// Client boundary that owns the shared chrome (skip link, header, footer), the theme +
// toast contexts, and the motion layer. Server-rendered page content is passed through
// as `children` — the reveal observer reads [data-reveal] off the DOM precisely so that
// pages can opt in with an attribute instead of becoming client components.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Preloader />
        <ScrollProgress />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ScrollReveal />
        <DotTrail />
        <Cursor />
      </ToastProvider>
    </ThemeProvider>
  );
}
