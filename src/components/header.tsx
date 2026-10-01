"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { MotionToggle } from "./motion-toggle";

// A full-width bar on a hairline: brand at left (the home link), numbered destinations
// and the light/dark switch in the centre, one solid action at right. Hovering a link
// draws slanted brackets either side of it; the current page keeps them.
//
// Three destinations and nothing else. The résumé lives in the footer.
const LINKS = [
  { href: "/portfolio", n: "01", label: "Portfolio", match: ["/portfolio", "/series"] },
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

  return (
    <header className="nv">
      {/* Brand, then the display settings (1 Oct 2026: they replaced the dated
          "Portfolio/2026" tag, and left the corner cluster). */}
      <div className="nv-left">
        <Link href="/" className="nv-brand" aria-label="NIMFAH — home">
          <span className="nv-mark">
            NIMFAH<span className="nv-dot blink">_</span>
          </span>
        </Link>
        <div className="nv-ctl" role="group" aria-label="Display settings">
          <ThemeToggle className="ctl-btn" />
          <MotionToggle className="ctl-btn" />
        </div>
      </div>

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
      </nav>

      <a className="nv-cta" href="mailto:kwame.nimfah@gmail.com">
        <span className="nv-cta-long">Get in touch</span>
        <span className="nv-cta-short">Contact</span>
      </a>
    </header>
  );
}
