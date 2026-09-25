"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/components/theme-provider";
import { inter, jetbrainsMono, silkscreen } from "@/lib/fonts";

/* The mockup's four panels, its HUD, its lerped wheel track and its WebGL grain, built
   as written. What is NOT carried over is its content: PROJECT_NEON_VOID, SYSTEM_HAPTIC
   and ORBITAL_ARCHIVE over Unsplash stock, archive@null.com, a placeholder LinkedIn,
   "+14.2 GB" and a set of London coordinates. A portfolio is the one document where
   invented work is not a placeholder, it is a claim.

   So: the three cards in the work grid are the three artefacts that exist and download,
   the panel headings name the one case study that exists, and every link resolves.

   The interaction bill this design runs up — wheel-only scrolling, 10px type, a
   crosshair over everything — is listed at the foot of terminal.css. */

const FACTS: [string, string][] = [
  ["Discipline", "Learning experience design"],
  ["Also", "Product design · front-end"],
  ["Stack", "React · TypeScript · CSS"],
  ["Status", "Open to roles"],
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
  const bar = useRef<HTMLDivElement>(null);
  const depth = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const xCoord = useRef<HTMLSpanElement>(null);
  const yCoord = useRef<HTMLSpanElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();

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

    const paint = () => {
      const span = el.scrollWidth - el.clientWidth;
      const pct = span > 0 ? (el.scrollLeft / span) * 100 : 0;
      if (bar.current) bar.current.style.width = `${pct}%`;
      if (depth.current) depth.current.textContent = `${Math.round(pct)}%`;
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

  // ── HUD clock and pointer readout ───────────────────────────────────────────
  // The mockup repaints hundredths from inside a rAF loop. Kept, and folded into the
  // same loop as the coordinates so it is one loop rather than two.
  useEffect(() => {
    let frame = 0;
    let timer = 0;
    const pad = (n: number) => n.toString().padStart(2, "0");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stamp = (withHundredths: boolean) => {
      const now = new Date();
      if (!clock.current) return;
      clock.current.textContent =
        `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` +
        (withHundredths ? `:${pad(Math.floor(now.getMilliseconds() / 10))}` : "");
    };

    if (still) {
      // Hundredths repainted sixty times a second is motion, and it is the kind nobody
      // can read anyway. Reduced motion gets a clock that ticks once a second.
      stamp(false);
      timer = window.setInterval(() => stamp(false), 1000);
    } else {
      const tick = () => {
        stamp(true);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    const onMove = (e: PointerEvent) => {
      if (xCoord.current) xCoord.current.textContent = (e.clientX / window.innerWidth).toFixed(3);
      if (yCoord.current) yCoord.current.textContent = (e.clientY / window.innerHeight).toFixed(3);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
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

  // Nav jumps scroll the track, so they travel the same path as every other input and
  // land on the same snap point.
  const jump = useCallback((id: string) => {
    const section = document.getElementById(id);
    const el = track.current;
    if (!section || !el) return;
    el.scrollTo({ left: section.offsetLeft - el.offsetLeft });
  }, []);

  return (
    <div className={`tm ${jetbrainsMono.variable} ${inter.variable} ${silkscreen.variable}`}>
      <div className="tm-canvas" ref={canvasHost} aria-hidden="true" />

      <nav className="tm-nav" aria-label="Panels">
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            jump("work");
          }}
        >
          <span>01</span>Work
        </a>
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            jump("about");
          }}
        >
          <span>02</span>About
        </a>
        <button type="button" className="tm-theme-toggle" onClick={toggle} suppressHydrationWarning>
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </nav>

      {/* Corner rules, a build string and a pointer readout: decorative, and told so. */}
      <div className="tm-hud" aria-hidden="true">
        <div className="tm-corner tm-corner--tl" />
        <div className="tm-hud-label tm-hud-label--center">Nimfah // terminal view</div>
        <div className="tm-corner tm-corner--tr" />

        <div className="tm-hud-label tm-hud-label--left">
          L-Coord: <span ref={yCoord}>0.000</span>
        </div>
        <div />
        <div className="tm-hud-label tm-hud-label--right">
          R-Coord: <span ref={xCoord}>0.000</span>
        </div>

        <div className="tm-corner tm-corner--bl" />
        <div className="tm-hud-label tm-hud-label--center">© 2026 Nimfah</div>
        <div className="tm-corner tm-corner--br" />
      </div>

      <div className="tm-telemetry" aria-hidden="true">
        <div>
          <span className="tm-status-dot" /> Connection: secure
        </div>
        <div>
          <span ref={clock}>00:00:00:00</span>
        </div>
        <div>
          Scan_depth: <span ref={depth}>0%</span>
        </div>
      </div>

      <div className="tm-progress-track" aria-hidden="true">
        <div className="tm-progress-bar" ref={bar} />
      </div>

      <main className="tm-main" ref={track}>
        {/* 01 — index */}
        <section className="tm-section" id="home">
          <div className="tm-section-meta" aria-hidden="true">
            Index_01
          </div>
          <div style={{ maxWidth: 1000 }}>
            <p className="tm-warning" style={{ marginBottom: 20 }}>
              [ Learning experience design ]
            </p>
            {/* The visible wordmark stays exactly as designed. What changes is what the
                heading *says*: this is the only h1 on the front door of a job-search
                portfolio, and it read as the site's name rather than the person's. The
                title element already says "Kwame Yeboah — Learning experience design";
                the heading now agrees with it, for search and for anyone arriving by
                screen reader. The trailing cursor is decoration and is hidden from
                assistive tech rather than announced as an underscore. */}
            <h1 className="tm-pixel-heading">
              <span className="tm-vh">Kwame Yeboah, learning experience design. </span>
              Nimfah<span className="tm-accent tm-cursor" aria-hidden="true">_</span>
            </h1>
            <div className="tm-desc">
              Kwame Yeboah. A designer who builds — hand me a messy operational problem and
              I&rsquo;ll find the decision hiding inside it, then ship the thing that teaches it.
            </div>
            <dl className="tm-data tm-data--narrow">
              {FACTS.map(([k, v]) => (
                <div className="tm-data-row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
