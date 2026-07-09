"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

// No logo — identity is carried by the hero wordmark. Theme toggle sits absolute-right;
// below it, the primary nav is spaced evenly. The active item is bold (aria-current).
export function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="header-top">
        <ThemeToggle />
      </div>
      <nav className="nav" aria-label="Primary">
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Artwork
        </Link>
        <Link
          href="/vault"
          aria-current={pathname === "/vault" ? "page" : undefined}
        >
          Vault
        </Link>
        <a href="mailto:studio@nimfah.com">Contact</a>
      </nav>
    </header>
  );
}
