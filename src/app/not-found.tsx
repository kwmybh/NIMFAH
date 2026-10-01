import Link from "next/link";
import "./tsys.css";
import "./work.css";
import { SiteChrome } from "@/components/site-chrome";

// Next's built-in 404 is a bare heading with no landmarks and no way back but the
// browser's. This one wears the site chrome — the same nav, a <main>, the footer.
export default function NotFound() {
  return (
    <SiteChrome>
      <section className="workidx">
        <div className="workidx-head">
          <h1>404</h1>
          <p className="workidx-lede">
            That page doesn&apos;t exist — it may have moved. The <Link href="/portfolio">portfolio</Link>{" "}
            and <Link href="/about">about</Link> pages are good places to start, or go back to
            the <Link href="/">home page</Link>.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
