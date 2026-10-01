"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { inter, jetbrainsMono, silkscreen } from "@/lib/fonts";
import { PixelPortrait } from "@/components/pixel-portrait";
import { Header } from "@/components/header";
import { SwellText } from "@/components/swell-text";
import { AnalogPortrait } from "@/components/analog-portrait";
import { SignalLayer } from "@/components/signal-layer";
import { StaticPortrait } from "@/components/static-portrait";
import { StaticLayer } from "@/components/static-layer";
import { BroadcastPortrait } from "@/components/broadcast-portrait";
import { BroadcastLayer } from "@/components/broadcast-layer";
import { useSignal } from "@/lib/signal";
import { CategoryGrid } from "@/components/category-tile";
import { CATEGORIES } from "@/lib/portfolio";
import { SPECS, SPECS_PITCH } from "@/lib/specs";
import { useMotionPaused } from "@/lib/motion";

/* The mockup's four panels, its HUD, its lerped wheel track and its WebGL grain, built
   as written. What is NOT carried over is its content: PROJECT_NEON_VOID, SYSTEM_HAPTIC
   and ORBITAL_ARCHIVE over Unsplash stock, archive@null.com, a placeholder LinkedIn,
   "+14.2 GB" and a set of London coordinates. A portfolio is the one document where
   invented work is not a placeholder, it is a claim.

   So: the three cards in the work grid are the three artefacts that exist and download,
   the panel headings name the one case study that exists, and every link resolves.

   The interaction bill this design runs up — wheel-only scrolling, 10px type, a
   crosshair over everything — is listed at the foot of terminal.css. */

// The hero's foot: short facts, square-marked. Location-agnostic on purpose.
const FACTS = ["Design + code", "Open to roles & commissions"];

// Status-bar names for the panels, in track order.
const PANELS: [string, string][] = [
  ["home", "00 — Intro"],
  ["portfolio", "01 — Portfolio"],
  ["about", "02 — About"],
];

export function TerminalClient() {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLSpanElement>(null);
  const depth = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const xCoord = useRef<HTMLSpanElement>(null);
  const yCoord = useRef<HTMLSpanElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const signal = useSignal();
  const paused = useMotionPaused();

  // ── the track ───────────────────────────────────────────────────────────────
  // A real scroller, not a transform driven by a wheel listener. It looks identical and
  // it is the whole accessibility story: arrow keys, Home/End, PageUp/PageDown, a
  // draggable scrollbar, touch and trackpad, and a browser that can bring a focused
  // element into view by itself. The lerp owned one input device and locked out every
  // other — a phone reached panel 01 and stopped.
  //
  // A vertical wheel is mapped across by hand. Browsers only do that for themselves when
  // a container has no vertical scroll of its own, and these panels may.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    // The status bar's SCRL readout (0.00–1.00) and the name of the panel in view.
    const paint = () => {
      const span = el.scrollWidth - el.clientWidth;
      const t = span > 0 ? el.scrollLeft / span : 0;
      if (depth.current) depth.current.textContent = t.toFixed(2);
      if (section.current) {
        const mid = el.scrollLeft + el.clientWidth / 2;
        let label = PANELS[0][1];
        for (const [id, name] of PANELS) {
          const p = document.getElementById(id);
          if (p && p.offsetLeft - el.offsetLeft <= mid) label = name;
        }
        section.current.textContent = label;
      }
    };
    paint();

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const panel = el.querySelector<HTMLElement>(".tm-section");
      // A panel tall enough to scroll keeps its own wheel; only pass the gesture
      // sideways once the reader is at the end of it.
      if (panel && panel.scrollHeight > panel.clientHeight + 1) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  // ── status bar: clock and pointer readout ──────────────────────────────────
  // The visitor's own local time and UTC offset — the site is location-agnostic, so
  // the clock belongs to whoever is reading. It ticks once a second; nothing finer
  // is legible anyway, and it keeps the bar still under reduced motion.
  useEffect(() => {
    const pad = (n: number) => n.toString().padStart(2, "0");
    const stamp = () => {
      const now = new Date();
      if (!clock.current) return;
      const off = -now.getTimezoneOffset() / 60;
      const sign = off < 0 ? "−" : "+";
      const offStr = Number.isInteger(off) ? pad(Math.abs(off)) : Math.abs(off).toFixed(1);
      clock.current.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${sign}${offStr}`;
    };
    stamp();
    const timer = window.setInterval(stamp, 1000);

    const onMove = (e: PointerEvent) => {
      if (xCoord.current) xCoord.current.textContent = String(Math.round(e.clientX));
      if (yCoord.current) yCoord.current.textContent = String(Math.round(e.clientY));
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  // ── the pixel clouds ────────────────────────────────────────────────────────
  // Replaces the Three.js white-noise grain (1 Oct 2026). Soft clouds of light drift
  // across the whole hero, drawn on a coarse grid and dithered at their edges so they
  // read as pixels, not gradients. A 2D canvas a tenth the size of the screen, scaled
  // up with nearest-neighbour — no WebGL, and no 600KB library on the front door.
  //
  // Each cloud is a soft blob on a slow Lissajous path; the field is their sum, run
  // against a fixed random threshold per cell so the falloff breaks into scattered cells. Colour
  // comes from the page (--fg on --bg), so it follows the theme. Reduced motion draws
  // one frame and stops.
  useEffect(() => {
    if (signal !== "pixel") return;
    const host = canvasHost.current;
    if (!host) return;
    const c = document.createElement("canvas");
    host.appendChild(c);
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const CELL = 10; // screen pixels per cloud pixel
    const BLOBS = [
      { x: 0.16, y: 0.24, r: 0.12, ax: 0.08, ay: 0.05, sx: 0.031, sy: 0.023, k: 1 },
      { x: 0.52, y: 0.16, r: 0.1, ax: 0.1, ay: 0.04, sx: 0.019, sy: 0.029, k: 0.8 },
      { x: 0.93, y: 0.28, r: 0.11, ax: 0.06, ay: 0.07, sx: 0.025, sy: 0.017, k: 0.9 },
      { x: 0.32, y: 0.78, r: 0.13, ax: 0.12, ay: 0.05, sx: 0.015, sy: 0.027, k: 0.7 },
      { x: 0.78, y: 0.84, r: 0.12, ax: 0.08, ay: 0.06, sx: 0.022, sy: 0.02, k: 0.8 },
    ];

    let cols = 0;
    let rows = 0;
    let img: ImageData | null = null;
    let seeds = new Float32Array(0);
    const size = () => {
      cols = Math.ceil(window.innerWidth / CELL);
      rows = Math.ceil(window.innerHeight / CELL);
      c.width = cols;
      c.height = rows;
      img = ctx.createImageData(cols, rows);
      // One random threshold per cell, fixed: the clouds' edges break into a scatter
      // that holds still while the clouds move through it, rather than a fizz.
      seeds = new Float32Array(cols * rows).map(() => Math.random());
    };
    size();

    const rgb = (name: string, fb: number[]) => {
      const m = getComputedStyle(host).getPropertyValue(name).trim().match(/^#([0-9a-f]{6})$/i);
      if (!m) return fb;
      const n = parseInt(m[1], 16);
      return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    };

    const draw = (t: number) => {
      if (!img) return;
      const fg = rgb("--fg", [236, 233, 228]);
      // dark clouds on a light ground read heavier than light on dark, so they get less
      const alpha = document.documentElement.dataset.theme === "dark" ? 24 : 15;
      const aspect = cols / rows;
      const pos = BLOBS.map((b) => ({
        x: (b.x + b.ax * Math.sin(t * b.sx)) * aspect,
        y: b.y + b.ay * Math.cos(t * b.sy),
        r2: b.r * b.r * aspect,
        k: b.k,
      }));
      const d = img.data;
      for (let y = 0; y < rows; y++) {
        const fy = y / rows;
        for (let x = 0; x < cols; x++) {
          const fx = (x / cols) * aspect;
          let v = 0;
          for (const b of pos) {
            const dx = fx - b.x;
            const dy = fy - b.y;
            v += b.k * Math.exp(-(dx * dx + dy * dy) / b.r2);
          }
          // cut the faint tail so the clouds have gaps between them, dither what is
          // left against each cell's fixed threshold, and quantize to four steps
          const f = Math.max(0, (v - 0.18) / 0.82);
          const lvl = Math.min(4, Math.floor(f * 4 + seeds[y * cols + x]));
          const i = (y * cols + x) * 4;
          d[i] = fg[0];
          d[i + 1] = fg[1];
          d[i + 2] = fg[2];
          d[i + 3] = lvl * alpha;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    let frame = 0;
    let last = 0;
    const still = paused; // reduced motion or the nav Motion switch — see lib/motion.ts
    const loop = (now: number) => {
      if (now - last > 66) {
        // ~15fps is plenty for something this slow
        last = now;
        draw(now / 1000);
      }
      frame = requestAnimationFrame(loop);
    };
    if (still) draw(0);
    else frame = requestAnimationFrame(loop);

    // redraw on theme change so a still frame follows the new colours too
    const mo = new MutationObserver(() => draw(last / 1000));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const onResize = () => {
      size();
      draw(last / 1000);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      c.remove();
    };
  }, [signal, paused]);

  return (
    <div className={`tm ${jetbrainsMono.variable} ${inter.variable} ${silkscreen.variable}`}>
      <div className="tm-canvas" ref={canvasHost} aria-hidden="true" />
      {signal === "vhs" ? <SignalLayer /> : null}
      {signal === "static" ? <StaticLayer /> : null}
      {signal === "broadcast" ? <BroadcastLayer /> : null}

      {/* The same header every other page uses — same items, same order, same corner.
          This panel track used to carry its own nav (01 Work / 02 About / theme), which
          meant the navigation changed under the visitor the moment they left the home
          page. The wrapper borrows the .tsys tokens the header is styled with; see
          .tm-sitenav in terminal.css for why it paints nothing itself. */}
      <div className="tsys tm-sitenav">
        <a className="skip" href="#panels">
          Skip to content
        </a>
        <Header />
      </div>

      {/* The status bar: scroll position, pointer, the panel in view, theme and the
          visitor's local time. Decorative readouts, so hidden from assistive tech. */}
      <div className="tm-status" aria-hidden="true">
        <div className="tm-status-l">
          <span>
            Scrl <b ref={depth}>0.00</b>
          </span>
          <span>
            Crsr <b ref={xCoord}>0</b>.<b ref={yCoord}>0</b>
          </span>
        </div>
        <div className="tm-status-c">
          <b ref={section}>00 — Intro</b>
        </div>
        <div className="tm-status-r">
          <b ref={clock}>00:00:00</b>
        </div>
      </div>

      {/* The panel track is a real scroll container — overflow-x auto, scroll-snap-type
          x mandatory, panels snapping to start — which is what buys touch, trackpad,
          wheel, scrollbar and reduced-motion support without writing any of them. The
          one thing it did not buy is the keyboard: a browser scrolls a scroll container
          with the arrow keys only once that container can hold focus, and a bare <main>
          cannot. tabIndex makes it focusable, and the label is what a screen reader
          announces when focus lands on a region that is otherwise just a box. SC 2.1.1
          asks for the operation, not for a particular mechanism, and this is the
          cheapest mechanism that already exists in every browser. */}
      <main
        className="tm-main"
        ref={track}
        id="panels"
        tabIndex={0}
        aria-label="Panels. Scroll horizontally, or use the left and right arrow keys."
      >
        {/* 01 — index */}
        <section className="tm-section tm-section--hero" id="home">
          <div className="tm-section-meta" aria-hidden="true">
            Index_01
          </div>
          {/* The portrait sits behind the type, as on the reference: the figure is the
              ground the heading is set on, not a picture beside it. */}
          {signal === "broadcast" ? (
            <BroadcastPortrait
              className="tm-portrait"
              src="/portrait/kwame-studio-cutout.webp"
              alt="Kwame Nimfah, in a black knit cap and glasses, looking up and away — in colour, as if received on a weak broadcast signal."
            />
          ) : signal === "static" ? (
            <StaticPortrait
              className="tm-portrait"
              src="/portrait/kwame-studio-cutout.webp"
              alt="Kwame Nimfah, in a black knit cap and glasses, looking up and away — in grayscale, through TV static and scanlines."
            />
          ) : signal === "vhs" ? (
            <AnalogPortrait
              className="tm-portrait"
              src="/portrait/kwame-studio-cutout.webp"
              alt="Kwame Nimfah, in a black knit cap and glasses, looking up and away — in grayscale, as if played from a worn videotape."
            />
          ) : (
          <PixelPortrait
              className="tm-portrait"
              src="/portrait/kwame-studio-cutout.webp"
              fallback="/portrait/kwame-studio-pixel.png"
              alt="Kwame Nimfah, in a black knit cap and glasses, looking up and away — rendered as a coarse gray bitmap."
            />
          )}
          {/* Role at the top, name at the foot — the structure of the reference the
              owner chose, in NIMFAH's own faces: mono light over the pixel wordmark. */}
          <div className="tm-hero-top tm-index-copy">
            <p className="tm-role">
              <SwellText text="Creative technologist" base={300} peak={700} delay={0.15} />
            </p>
            <p className="tm-spec">Art / Design / Technology</p>
          </div>
          <div className="tm-hero-foot tm-index-copy">
            {/* KWAME retired 1 Oct 2026: the hero is the wordmark alone, heavy, in the
                accent, its letters thinning toward the cursor. */}
            <h1 className="tm-name">
              <SwellText text="NIMFAH_" label="NIMFAH" base={900} peak={380} radius={180} className="tm-wordmark" delay={0.35} />
            </h1>
            <ul className="tm-facts">
              {FACTS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <p className="tm-scroll-cue" aria-hidden="true">
            ▶ Scroll
          </p>
        </section>

        {/* 02 — portfolio: the hub's category tiles, sized to one screen (1 Oct 2026).
            The list borrows the .tsys tokens the tiles are styled with — see
            .tm-pf in terminal.css. */}
        <section className="tm-section" id="portfolio">
          <div className="tm-section-meta tm-section-meta--work" aria-hidden="true">
            Portfolio_02
          </div>
          <div className="tm-work-panel">
            <div className="tm-work-head">
              <h2>Portfolio</h2>
              <Link className="tm-cta tm-cta--ghost" href="/portfolio">
                Open the portfolio ↗
              </Link>
            </div>
            <div className="tsys tm-pf">
              <CategoryGrid cats={CATEGORIES} headingLevel={3} />
            </div>
          </div>
        </section>

        {/* 03 — about + contact on one screen (1 Oct 2026): the core specs on the left,
            the open channel on the right. */}
        <section className="tm-section" id="about">
          <div className="tm-section-meta" aria-hidden="true">
            About_03
          </div>
          <div className="tm-about">
            <div className="tm-about-l">
              <h2 className="tm-accent">About</h2>
              <p className="tm-about-pitch">{SPECS_PITCH}</p>
              <dl className="tm-data tm-specs">
                {SPECS.map(([k, v]) => (
                  <div className="tm-data-row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link className="tm-cta tm-cta--ghost" href="/about">
                The long version ↗
              </Link>
            </div>
            <div className="tm-about-r">
              <p className="tm-warning">-- Open channel --</p>
              <h3 className="tm-link-h">Establish_link</h3>
              <a className="tm-email" href="mailto:kwame.nimfah@gmail.com">
                kwame.nimfah@gmail.com
              </a>
              <div className="tm-links">
                <a href="mailto:kwame.nimfah@gmail.com">Email.sys</a>
                <a href="/cv/Kwame Yeboah - LXD - Resume.pdf" target="_blank" rel="noopener">
                  Resume.sys
                </a>
                <a href="https://www.linkedin.com/in/kwame-yeboah/" target="_blank" rel="noopener">
                  LinkedIn.sys
                </a>
                <Link href="/portfolio">Portfolio.sys</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
