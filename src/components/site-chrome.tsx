"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { SignalLayer } from "./signal-layer";
import { StaticLayer } from "./static-layer";
import { BroadcastLayer } from "./broadcast-layer";
import { useSignal } from "@/lib/signal";
import { Footer } from "./footer";
import { SiteControls } from "./site-controls";
import { Preloader } from "./preloader";
import { ScrollProgress, ScrollReveal } from "./scroll";

// The shared chrome, lifted out of Providers so a route can decline it by living
// outside the (site) group. Server-rendered page content passes through as `children` —
// the reveal observer reads [data-reveal] off the DOM precisely so pages can opt in
// with an attribute instead of becoming client components.
export function SiteChrome({ children }: { children: ReactNode }) {
  const signal = useSignal();
  // The background signal runs on About and the Work index only — never on a case
  // study, where the work itself has to read clean.
  const pathname = usePathname();
  const textured = pathname === "/about" || pathname === "/work";
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
      {textured && signal === "vhs" ? <SignalLayer strength={0.45} /> : null}
      {textured && signal === "static" ? <StaticLayer strength={0.5} /> : null}
      {textured && signal === "broadcast" ? <BroadcastLayer strength={0.5} /> : null}
      <main id="main">{children}</main>
      <Footer />
      <SiteControls />
      <ScrollReveal />
    </div>
  );
}
