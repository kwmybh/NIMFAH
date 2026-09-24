"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

// Chrome after the current reference: a circular monogram hard left, a floating
// capsule of links in the centre, and pill actions right. The previous header was
// edge-pinned text on a transparent bar, which belonged to the zero-radius system.
export function Header() {
  const pathname = usePathname();
  const on = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="nv">
      <Link href="/" className="nv-mark" aria-label="Nimfah — home">
        <span aria-hidden="true">KY</span>
      </Link>

      <nav className="nv-pod" aria-label="Primary">
        <Link href="/about" aria-current={on("/about") ? "page" : undefined}>
          About
        </Link>
        <Link href="/work" aria-current={on("/work") || on("/series") ? "page" : undefined}>
          Work
        </Link>
      </nav>

      <div className="nv-actions">
        <ThemeToggle />
        <a
          className="nv-btn"
          href="/cv/Kwame Yeboah - LXD - Resume.pdf"
          target="_blank"
          rel="noopener"
        >
          Résumé
        </a>
        <a className="nv-btn nv-btn-solid" href="mailto:kwame.nimfah@gmail.com">
          Get in touch
        </a>
      </div>
    </header>
  );
}
