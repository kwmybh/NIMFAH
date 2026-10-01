"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// A full-width bar on a hairline: brand at left (the home link), numbered destinations
// in the centre, one solid action at right. Structure borrowed from a reference the
// owner chose; the face, colour and copy are NIMFAH's own.
//
// Three destinations and nothing else. The résumé and the light/dark switch live in the
// footer (and in the home page's last panel, which has no footer).
const LINKS = [
  { href: "/work", n: "01", label: "Work", match: ["/work", "/series"] },
  { href: "/about", n: "02", label: "About", match: ["/about"] },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="nv">
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
            <span className="nv-n" aria-hidden="true">
              {l.n}/
            </span>
            {l.label}
          </Link>
        ))}
      </nav>

      <a className="nv-cta" href="mailto:kwame.nimfah@gmail.com">
        Get in touch
      </a>
    </header>
  );
}
