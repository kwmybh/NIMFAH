"use client";

import type { ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";
import { Cursor } from "./cursor";
import { Preloader } from "./preloader";
import { DotTrail } from "./dot-trail";
import { ScrollProgress, ScrollReveal } from "./scroll";

// The shared chrome, lifted out of Providers so a route can decline it by living
// outside the (site) group. Server-rendered page content passes through as `children` —
// the reveal observer reads [data-reveal] off the DOM precisely so pages can opt in
// with an attribute instead of becoming client components.
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
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
    </>
  );
}
