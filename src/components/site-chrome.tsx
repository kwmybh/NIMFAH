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
  // .tsys carries the home page's palette, faces and hard-edged geometry onto these
  // pages — see tsys.css. It wraps the chrome as well as the content, because a rounded
  // capsule nav over a squared-off HUD page is the seam it exists to close.
  return (
    <div className="tsys">
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
    </div>
  );
}
