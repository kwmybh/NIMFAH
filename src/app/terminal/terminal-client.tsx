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

// 0.075 per frame, as the mockup sets it. The lag is the effect.
const EASE = 0.075;

export function TerminalClient() {
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const depth = useRef<HTMLSpanElement>(null);
  const clock = useRef<HTMLSpanElement>(null);
  const xCoord = useRef<HTMLSpanElement>(null);
  const yCoord = useRef<HTMLSpanElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const target = useRef(0);
  const { theme, toggle } = useTheme();

  // ── the track ───────────────────────────────────────────────────────────────
  // One rAF loop owns the transform, the progress bar and the readouts, all written
  // straight to the DOM. Through React state this would be sixty re-renders a second
  // of the whole page.
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let current = 0;
    let frame = 0;
    const max = () => Math.max(0, el.scrollWidth - window.innerWidth);

    const onWheel = (e: WheelEvent) => {
      target.current = Math.min(Math.max(0, target.current + e.deltaY), max());
    };
    const onResize = () => {
      target.current = Math.min(target.current, max());
    };

    const tick = () => {
      current += (target.current - current) * EASE;
      el.style.transform = `translateX(-${current}px)`;

      const span = max();
      const pct = span > 0 ? (current / span) * 100 : 0;
      if (bar.current) bar.current.style.width = `${pct}%`;
      if (depth.current) depth.current.textContent = `${Math.round(pct)}%`;

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ── HUD clock and pointer readout ───────────────────────────────────────────
  // The mockup repaints hundredths from inside a rAF loop. Kept, and folded into the
  // same loop as the coordinates so it is one loop rather than two.
  useEffect(() => {
    let frame = 0;
    const pad = (n: number) => n.toString().padStart(2, "0");

    const tick = () => {
      const now = new Date();
      if (clock.current) {
        clock.current.textContent =
          `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}:` +
          pad(Math.floor(now.getMilliseconds() / 10));
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (xCoord.current) xCoord.current.textContent = (e.clientX / window.innerWidth).toFixed(3);
      if (yCoord.current) yCoord.current.textContent = (e.clientY / window.innerHeight).toFixed(3);
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
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
    const animate = (time: number) => {
      material.uniforms.u_time.value = time * 0.005;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
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

  // Nav jumps set the same target the wheel does, so the lerp carries the page there.
  const jump = useCallback((id: string) => {
    const section = document.getElementById(id);
    const el = track.current;
    if (!section || !el) return;
    target.current = Math.min(section.offsetLeft, Math.max(0, el.scrollWidth - window.innerWidth));
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
            <h1 className="tm-pixel-heading">
              Nimfah<span className="tm-accent tm-cursor">_</span>
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
            <Link className="tm-cta" href="/work/first-15-last-mile-onboarding">
              Open the case study ↗
            </Link>
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
              <Link href="/">Index.sys</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
