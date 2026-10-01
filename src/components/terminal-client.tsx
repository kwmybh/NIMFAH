"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { inter, jetbrainsMono, silkscreen } from "@/lib/fonts";
import { PixelPortrait } from "@/components/pixel-portrait";
import { Header } from "@/components/header";
import { ThemeToggle } from "@/components/theme-toggle";

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

// Status-bar names for the four panels, in track order.
const PANELS: [string, string][] = [
  ["home", "00 — Intro"],
  ["work", "01 — Work"],
  ["about", "02 — About"],
  ["contact", "03 — Contact"],
];

const SPECS: [string, string][] = [
  ["Design", "Figma · Illustrator · Storyboarding"],
  ["Learning", "Storyline 360 · Rise 360 · Scenario design"],
  ["Build", "React · TypeScript · Next.js · WCAG 2.1 AA"],
  ["Research", "Interviews · journey maps · usability testing"],
];

const ARTEFACTS = [
  { label: "Design document", mark: "PDF", meta: "23 pp ↓", href: "/first-15/learning-design-document.pdf" },
  { label: "Decision guide", mark: "PDF", meta: "1 p ↓", href: "/first-15/decision-guide-job-aid.pdf" },
  { label: "Production storyboard", mark: "XLS", meta: "8 tabs ↓", href: "/first-15/production-storyboard.xlsx" },
];

export function TerminalClient() {
  const track = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLSpanElement>(null);
  const depth = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const xCoord = useRef<HTMLSpanElement>(null);
  const yCoord = useRef<HTMLSpanElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);

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

  // ── the grain ───────────────────────────────────────────────────────────────
  // The mockup's shader, unchanged: a full-screen quad through an orthographic camera,
  // white noise reseeded from u_time. Three.js holds GPU resources that survive a React
  // unmount, so everything created here is disposed on the way out.
  useEffect(() => {
    const host = canvasHost.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    host.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float u_time;
        uniform vec2 u_resolution;

        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }

        void main() {
          vec2 st = gl_FragCoord.xy / u_resolution.xy;
          float noise = random(st + u_time * 0.01);
          gl_FragColor = vec4(vec3(noise), 1.0);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frame = 0;
    // Reduced motion gets the same grain, drawn once and left alone. The texture reseeds
    // from u_time so slowly that a still frame is the same image — which is the honest
    // argument for not running an uncapped loop at all.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = (time: number) => {
      material.uniforms.u_time.value = time * 0.005;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    if (still) renderer.render(scene, camera);
    else frame = requestAnimationFrame(animate);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
      if (still) renderer.render(scene, camera);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className={`tm ${jetbrainsMono.variable} ${inter.variable} ${silkscreen.variable}`}>
      <div className="tm-canvas" ref={canvasHost} aria-hidden="true" />

      {/* The same header every other page uses — same items, same order, same corner.
          This panel track used to carry its own nav (01 Work / 02 About / theme), which
          meant the navigation changed under the visitor the moment they left the home
          page. The wrapper borrows the .tsys tokens the header is styled with; see
          .tm-sitenav in terminal.css for why it paints nothing itself. */}
      <div className="tsys tm-sitenav">
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
          <span>
            Theme <i className="tm-swatch" /> <b className="tm-hex-dark">#9DF133</b>
            <b className="tm-hex-light">#44730D</b>
          </span>
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
        tabIndex={0}
        role="group"
        aria-label="Panels. Scroll horizontally, or use the left and right arrow keys."
      >
        {/* 01 — index */}
        <section className="tm-section tm-section--hero" id="home">
          <div className="tm-section-meta" aria-hidden="true">
            Index_01
          </div>
          {/* The portrait sits behind the type, as on the reference: the figure is the
              ground the heading is set on, not a picture beside it. */}
          <PixelPortrait
            className="tm-portrait"
            src="/portrait/kwame-studio-cutout.webp"
            fallback="/portrait/kwame-studio-pixel.png"
            alt="Kwame Nimfah, in a black knit cap and glasses, looking up and away — rendered as a coarse gray bitmap."
          />
          {/* Role at the top, name at the foot — the structure of the reference the
              owner chose, in NIMFAH's own faces: mono light over the pixel wordmark. */}
          <div className="tm-hero-top tm-index-copy">
            <p className="tm-role">Creative technologist</p>
            <p className="tm-spec">Art &amp; design · Creative coding · Front-end engineering</p>
          </div>
          <div className="tm-hero-foot tm-index-copy">
            <h1 className="tm-name">
              <span className="tm-name-thin">Kwame</span>{" "}
              <span className="tm-pixel-heading">
                Nimfah<span className="tm-accent">.</span>
              </span>
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

        {/* 02 — work */}
        <section className="tm-section tm-section--wide" id="work">
          <div className="tm-section-meta tm-section-meta--work" aria-hidden="true">
            Work_02
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 40, marginBottom: 40, flexWrap: "wrap" }}>
              <h2>First 15</h2>
              <p className="tm-warning">/ Scenario-based onboarding · MileOne Logistics</p>
            </div>
            {/* The panel is a trailer for the case study, not a replacement: the full
                write-up and the index both stay one click away now that this is home. */}
            <div className="tm-panel-links">
              <Link className="tm-cta" href="/work/first-15-last-mile-onboarding">
                Open the case study ↗
              </Link>
              <Link className="tm-cta tm-cta--ghost" href="/work">
                All work ↗
              </Link>
            </div>
            <div className="tm-work-grid">
              {ARTEFACTS.map((a) => (
                <a className="tm-work-item" key={a.href} href={a.href} target="_blank" rel="noopener">
                  <span className="tm-work-mark" aria-hidden="true">
                    {a.mark}
                  </span>
                  <span className="tm-work-meta">{a.meta}</span>
                  <span className="tm-work-label">{a.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 03 — about */}
        <section className="tm-section" id="about">
          <div className="tm-section-meta" aria-hidden="true">
            About_03
          </div>
          <div style={{ display: "flex", gap: 80, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <h2 className="tm-accent">
                Core
                <br />
                Specs
              </h2>
            </div>
            <div style={{ flex: 1, borderLeft: "1px solid var(--accent)", paddingLeft: 40 }}>
              <p style={{ marginBottom: 20, fontSize: 14, lineHeight: 1.6 }}>
                Instructional design rigour, editorial art direction, and enough front-end to ship
                the thing rather than only specify it.
              </p>
              <dl className="tm-data">
                {SPECS.map(([k, v]) => (
                  <div className="tm-data-row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <Link className="tm-cta tm-cta--ghost" href="/about" style={{ marginTop: 24 }}>
                The long version ↗
              </Link>
            </div>
          </div>
        </section>

        {/* 04 — contact */}
        <section className="tm-section" id="contact">
          <div className="tm-section-meta" aria-hidden="true">
            Send_04
          </div>
          <div style={{ textAlign: "center" }}>
            <p className="tm-warning">-- Open channel --</p>
            <h2 className="tm-h2--contact">Establish_link</h2>
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
              <Link href="/about">About.sys</Link>
              <Link href="/work">Work.sys</Link>
              {/* The front door has no footer, so its theme switch lives with the other
                  closing links, as the footer's does on every other page. */}
              <ThemeToggle text />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
