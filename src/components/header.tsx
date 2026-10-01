"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The wordmark is the home link, hard left — the convention people already know, so
// "Home" doesn't spend one of the three places in the nav. NIMFAH rather than a name:
// the site is the studio's as much as the job search's.
//
// Three destinations and nothing else. The résumé and the light/dark switch live in the
// footer (and in the home page's last panel, which has no footer).
export function Header() {
  const pathname = usePathname();
  const on = (href: string) => pathname.startsWith(href);

  return (
    <header className="nv">
      <Link href="/" className="nv-mark" aria-label="NIMFAH — home">
        NIMFAH
      </Link>

      <div className="nv-box">
        <nav className="nv-pod" aria-label="Primary">
          <Link href="/about" aria-current={on("/about") ? "page" : undefined}>
            About
          </Link>
          <Link href="/work" aria-current={on("/work") || on("/series") ? "page" : undefined}>
            Work
          </Link>
        </nav>
        <a className="nv-btn nv-btn-solid" href="mailto:kwame.nimfah@gmail.com">
          Get in touch
        </a>
      </div>
    </header>
  );
}
