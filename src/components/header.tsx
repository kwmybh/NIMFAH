"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

// Two links, after the reference site: About (home) and Work. Contact lives on the
// About page and in the footer; the Vault is footer-only.
export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="header-top">
        <ThemeToggle />
      </div>
      <nav className="nav" aria-label="Primary">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          About
        </Link>
        <Link
          href="/work"
          aria-current={pathname.startsWith("/work") || pathname.startsWith("/series") ? "page" : undefined}
        >
          Work
        </Link>
      </nav>
    </header>
  );
}
