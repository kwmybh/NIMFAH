"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { MotionToggle } from "./motion-toggle";
import { useNavReveal } from "@/lib/nav-mode";

// A full-width bar on a hairline: brand at left (the home link), numbered destinations
// and the light/dark switch in the centre, one solid action at right. Hovering a link
// draws slanted brackets either side of it; the current page keeps them.
//
// Three destinations and nothing else. The résumé lives in the footer.
const LINKS = [
  { href: "/work", n: "01", label: "Work", match: ["/work", "/series"] },
  { href: "/about", n: "02", label: "About", match: ["/about"] },
];

function Bracket({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`nv-br${flip ? " nv-br-r" : ""}`}
      viewBox="0 0 6 25"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M5.5 0.5L0.5 7.5V24.5" stroke="currentColor" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const reveal = useNavReveal();

  return (
    <>
      {/* ?nav=reveal trial: an invisible strip along the top edge. Pointing at it
          brings the bar down; the bar stays while the pointer or focus is inside it. */}
      {reveal ? <div className="nv-zone" aria-hidden="true" /> : null}
    <header className="nv" data-reveal={reveal ? "true" : undefined}>
      <Link href="/" className="nv-brand" aria-label="NIMFAH — home">
        <span className="nv-mark">
          NIMFAH<span className="nv-dot">.</span>
        </span>
        <span className="nv-tag" aria-hidden="true">
          Portfolio/2026
        </span>
      </Link>

      <nav className="nv-pod" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.match.some((m) => pathname.startsWith(m)) ? "page" : undefined}
          >
            <Bracket />
            <span className="nv-lbl">
              <span className="nv-n" aria-hidden="true">
                {l.n}/
              </span>
              {l.label}
            </span>
            <Bracket flip />
          </Link>
        ))}
        <ThemeToggle className="nv-theme" />
        <MotionToggle className="nv-theme nv-motion" />
      </nav>

      <a className="nv-cta" href="mailto:kwame.nimfah@gmail.com">
        <span className="nv-cta-long">Get in touch</span>
        <span className="nv-cta-short">Contact</span>
      </a>
    </header>
    </>
  );
}
