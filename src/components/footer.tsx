import Link from "next/link";

// The reference closes on a footer-dock: a large call to action, then letter-spaced link
// columns under tracked headings, then a baseline row — full-bleed and left-aligned, not
// a centred stack. Every destination here is real; nothing is a placeholder.
export function Footer() {
  return (
    <footer className="fd">
      <div className="bleed fd-top">
        <p className="fd-eyebrow t-label-sm">Let&apos;s build something enduring</p>
        <a className="fd-shout" href="mailto:kwame.nimfah@gmail.com">
          Shoot a message
        </a>
      </div>

      <div className="bleed fd-cols">
        <div className="fd-col">
          <p className="fd-h t-label-sm">Direct</p>
          <a href="mailto:kwame.nimfah@gmail.com">kwame.nimfah@gmail.com</a>
          <a href="/cv/Kwame Yeboah - LXD - Resume.pdf" target="_blank" rel="noopener">
            Download CV <i aria-hidden="true">↓</i>
          </a>
        </div>

        <div className="fd-col">
          <p className="fd-h t-label-sm">Elsewhere</p>
          <a href="https://www.linkedin.com/in/kwame-yeboah/" target="_blank" rel="noopener">
            LinkedIn <i aria-hidden="true">↗</i>
          </a>
          <Link href="/work">Work</Link>
        </div>
      </div>

      <div className="bleed fd-base">
        <span>© 2026 Nimfah</span>
        <span>Kwame Yeboah</span>
      </div>
    </footer>
  );
}
