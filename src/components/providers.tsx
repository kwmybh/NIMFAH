"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { Header } from "./header";
import { Footer } from "./footer";

// Client boundary that owns the shared chrome (skip link, header, footer) and the theme +
// toast contexts. Server-rendered page content is passed through as `children`.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </ToastProvider>
    </ThemeProvider>
  );
}
