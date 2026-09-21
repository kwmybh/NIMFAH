import Link from "next/link";

// Connection-focused footer, shared across every surface.
export function Footer() {
  return (
    <footer>
      <div className="foot">
        <p className="line">Let&apos;s build something enduring</p>
        <a className="mail" href="mailto:kwame.nimfah@gmail.com">
          kwame.nimfah@gmail.com
        </a>
        <div className="socials">
          <a href="https://www.linkedin.com/in/kwame-yeboah/" target="_blank" rel="noopener">
            LinkedIn
          </a>
          <Link className="vault-link" href="/vault">
            Client Vault
          </Link>
        </div>
        <div className="copy">© 2026 NIMFAH · Accra – Toronto – Washington DC</div>
      </div>
    </footer>
  );
}
