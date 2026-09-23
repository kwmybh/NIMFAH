"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme-provider";

/* Four panels, all of it real. The original shipped PROJECT_NEON_VOID, SYSTEM_HAPTIC
   and ORBITAL_ARCHIVE over Unsplash stock, archive@null.com, a LinkedIn placeholder,
   "+14.2 GB" and a set of coordinates in London. None of that is his, and a portfolio
   is the one document where invented work is not a placeholder, it is a claim.

   There is one case study, so the work panel shows one case study. The three-up grid
   the design wants is filled by the three artefacts that actually exist and actually
   download. */

const FACTS = [
  ["Discipline", "Learning experience design"],
  ["Also", "Product design · front-end"],
  ["Stack", "React · TypeScript · CSS"],
  ["Status", "Open to roles"],
];

const SPECS = [
  ["Design", "Figma · Illustrator · Storyboarding"],
  ["Learning", "Storyline 360 · Rise 360 · Scenario design"],
  ["Build", "React · TypeScript · Next.js · WCAG 2.1 AA"],
  ["Research", "Interviews · journey maps · usability testing"],
];

const ARTEFACTS = [
  { label: "Design document", meta: "23 pp · PDF", href: "/first-15/learning-design-document.pdf" },
  { label: "Decision guide", meta: "1 p · PDF", href: "/first-15/decision-guide-job-aid.pdf" },
  { label: "Production storyboard", meta: "8 tabs · XLSX", href: "/first-15/production-storyboard.xlsx" },
];

const PANELS = ["Index", "Work", "About", "Contact"];

export function TerminalClient() {
  const track = useRef<HTMLDivElement>(null);
  const [panel, setPanel] = useState(0);
  const [progress, setProgress] = useState(0);
  const [clock, setClock] = useState("--:--:--");
  const { theme, toggle } = useTheme();

  // One interval at 1Hz. The original repainted a hundredths-of-a-second counter from
  // inside a requestAnimationFrame loop — sixty repaints a second of a digit nobody can
  // read, next to two other uncapped loops.
  useEffect(() => {
    const tick = () => setClock(new Date().toTimeString().slice(0, 8));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? (el.scrollLeft / max) * 100 : 0);
    setPanel(Math.round(el.scrollLeft / el.clientWidth));
  }, []);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const n = Math.max(0, Math.min(PANELS.length - 1, i));
    el.scrollTo({ left: n * el.clientWidth });
  }, []);

  // The scroller handles arrows, Home, End and PageUp/PageDown natively once it holds
  // focus. These are here so the keys work from anywhere on the page, which is what
  // someone who has just landed will try first.
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const map: Record<string, number> = {
        ArrowRight: panel + 1, ArrowLeft: panel - 1,
        PageDown: panel + 1, PageUp: panel - 1,
        Home: 0, End: PANELS.length - 1,
      };
      if (!(e.key in map)) return;
      e.preventDefault();
      go(map[e.key]);
    },
    [panel, go],
  );

  return (
    <div className="tm relative h-[100svh] w-full overflow-hidden" onKeyDown={onKeyDown}>
      <div className="tm-grain pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      {/* ── HUD frame ── decorative, and told so: it is corner rules and a build
          string, and a screen reader reading it would learn nothing. */}
      <div className="pointer-events-none fixed inset-0 z-30 p-5" aria-hidden="true">
        <div className="relative h-full w-full">
          <span className="absolute left-0 top-0 h-5 w-5 border-l border-t" style={{ borderColor: "var(--tm-accent)" }} />
          <span className="absolute right-0 top-0 h-5 w-5 border-r border-t" style={{ borderColor: "var(--tm-accent)" }} />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l" style={{ borderColor: "var(--tm-accent)" }} />
          <span className="absolute bottom-0 right-0 h-5 w-5 border-b border-r" style={{ borderColor: "var(--tm-accent)" }} />
          <p className="absolute left-2 top-2 hidden whitespace-nowrap text-[12px] uppercase tracking-[0.18em] lg:block"
             style={{ color: "var(--tm-accent)" }}>
            Nimfah · terminal view
          </p>
          <p className="absolute left-1 top-1/2 hidden -translate-y-1/2 text-[12px] uppercase tracking-[0.18em] [writing-mode:vertical-rl] sm:block"
             style={{ color: "var(--tm-accent)" }}>
            Panel {panel + 1} / {PANELS.length}
          </p>
          <p className="absolute right-1 top-1/2 hidden -translate-y-1/2 rotate-180 text-[12px] uppercase tracking-[0.18em] [writing-mode:vertical-rl] sm:block"
             style={{ color: "var(--tm-accent)" }}>
            {PANELS[panel]}
          </p>
        </div>
      </div>

      {/* ── nav ── */}
      <nav className="fixed right-4 top-4 z-40 flex items-center gap-1 border p-1 backdrop-blur sm:right-10 sm:top-10 sm:gap-2 sm:p-2"
           style={{ borderColor: "var(--tm-edge)", background: "var(--tm-glass)" }}
           aria-label="Panels">
        {PANELS.map((p, i) => (
          <button
            key={p}
            type="button"
            onClick={() => go(i)}
            aria-current={panel === i ? "true" : undefined}
            className="min-h-[36px] px-2 text-[12px] font-bold uppercase tracking-[0.1em] sm:px-3"
            style={panel === i
              ? { background: "var(--tm-accent)", color: "var(--tm-bg)" }
              : { color: "var(--tm-fg)" }}
          >
            <span style={{ color: panel === i ? "var(--tm-bg)" : "var(--tm-warning)" }}>
              {String(i + 1).padStart(2, "0")}
            </span>{" "}
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={toggle}
          suppressHydrationWarning
          className="min-h-[36px] border px-2 text-[12px] font-bold uppercase tracking-[0.1em] sm:px-3"
          style={{ borderColor: "var(--tm-edge)", color: "var(--tm-fg)" }}
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>
        <Link
          href="/"
          className="min-h-[36px] px-2 text-[12px] font-bold uppercase tracking-[0.1em] sm:px-3"
          style={{ color: "var(--tm-fg)" }}
        >
          Exit ↗
        </Link>
      </nav>

      {/* ── the track ── */}
      <div
        ref={track}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-label="Panels, scroll horizontally or use the arrow keys"
        className="tm-track relative z-10 flex h-full w-full overflow-x-auto overflow-y-hidden"
      >
        {/* 01 — index */}
        <section className="tm-panel relative flex h-full w-full shrink-0 flex-col justify-center px-6 py-24 sm:px-16 lg:px-24">
          <p className="tm-ghost pointer-events-none absolute left-[5%] top-[12%] hidden select-none text-[20vw] sm:block" aria-hidden="true">01</p>
          <div className="relative max-w-2xl">
            <p className="mb-5 text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--tm-warning)" }}>
              Learning experience design
            </p>
            <h1 className="text-[clamp(28px,7vw,64px)] uppercase leading-[1.1]">
              Kwame Yeboah<span className="tm-blink" style={{ color: "var(--tm-accent)" }}>_</span>
            </h1>
            <p className="mt-6 max-w-md border-l-2 pl-5 text-[14px] leading-[1.7] tracking-normal normal-case"
               style={{ borderColor: "var(--tm-warning)" }}>
              I&rsquo;m a designer who builds. Hand me a messy operational problem and I&rsquo;ll find the{" "}
              <em className="not-italic" style={{ color: "var(--tm-accent)" }}>decision</em> hiding inside it.
            </p>
            <dl className="mt-10 max-w-sm border p-4" style={{ borderColor: "var(--tm-edge)", background: "var(--tm-glass)" }}>
              {FACTS.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b py-1.5 last:border-b-0" style={{ borderColor: "var(--tm-edge)" }}>
                  <dt className="text-[12px] uppercase tracking-[0.12em] opacity-70">{k}</dt>
                  <dd className="text-right text-[12px] uppercase tracking-[0.12em]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 02 — work */}
        <section className="tm-panel relative flex h-full w-full shrink-0 flex-col justify-center px-6 py-24 sm:px-16 lg:px-24">
          <p className="tm-ghost pointer-events-none absolute left-[5%] top-[12%] hidden select-none text-[20vw] sm:block" aria-hidden="true">02</p>
          <div className="relative w-full max-w-5xl">
            <div className="mb-8 flex flex-wrap items-baseline gap-x-8 gap-y-2">
              <h2 className="text-[clamp(32px,6vw,72px)] uppercase leading-none tracking-[-0.02em]">First 15</h2>
              <p className="text-[12px] uppercase tracking-[0.16em]" style={{ color: "var(--tm-warning)" }}>
                Scenario-based onboarding
              </p>
            </div>
            <p className="mb-8 max-w-xl text-[14px] leading-[1.7] tracking-normal normal-case">
              A blended Rise 360 and Storyline 360 experience that trains last-mile delivery associates to
              decide under pressure. Built for MileOne Logistics, a realistic fictional carrier — designed,
              art-directed and built end to end.
            </p>
            <Link href="/work/first-15-last-mile-onboarding"
                  className="mb-10 inline-block min-h-[44px] border px-5 py-3 text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ background: "var(--tm-accent)", borderColor: "var(--tm-accent)", color: "var(--tm-bg)" }}>
              Open the case study ↗
            </Link>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ARTEFACTS.map((a) => (
                <li key={a.href}>
                  <a href={a.href} target="_blank" rel="noopener"
                     className="flex min-h-[96px] flex-col justify-between border p-4"
                     style={{ borderColor: "var(--tm-edge)", background: "var(--tm-glass)" }}>
                    <span className="text-[13px] uppercase tracking-[0.1em]">{a.label}</span>
                    <span className="text-[12px] uppercase tracking-[0.1em]" style={{ color: "var(--tm-accent)" }}>
                      {a.meta} ↓
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 — about */}
        <section className="tm-panel relative flex h-full w-full shrink-0 flex-col justify-center px-6 py-24 sm:px-16 lg:px-24">
          <p className="tm-ghost pointer-events-none absolute left-[5%] top-[12%] hidden select-none text-[20vw] sm:block" aria-hidden="true">03</p>
          <div className="relative flex w-full max-w-5xl flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
            <h2 className="text-[clamp(32px,6vw,72px)] uppercase leading-none tracking-[-0.02em] lg:flex-1"
                style={{ color: "var(--tm-accent)" }}>
              Core<br />specs
            </h2>
            <div className="border-l pl-6 lg:flex-1" style={{ borderColor: "var(--tm-accent)" }}>
              <p className="mb-5 text-[14px] leading-[1.7] tracking-normal normal-case">
                Instructional design rigour, editorial art direction, and enough front-end to ship the thing
                rather than only specify it.
              </p>
              <dl className="border p-4" style={{ borderColor: "var(--tm-edge)", background: "var(--tm-glass)" }}>
                {SPECS.map(([k, v]) => (
                  <div key={k} className="flex flex-col gap-0.5 border-b py-2 last:border-b-0 sm:flex-row sm:justify-between sm:gap-6"
                       style={{ borderColor: "var(--tm-edge)" }}>
                    <dt className="text-[12px] uppercase tracking-[0.12em]" style={{ color: "var(--tm-accent)" }}>{k}</dt>
                    <dd className="text-[12px] uppercase tracking-[0.1em] sm:text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 04 — contact */}
        <section className="tm-panel relative flex h-full w-full shrink-0 flex-col items-center justify-center px-6 py-24 text-center sm:px-16">
          <p className="tm-ghost pointer-events-none absolute left-[5%] top-[12%] hidden select-none text-[20vw] sm:block" aria-hidden="true">04</p>
          <div className="relative">
            <p className="mb-4 text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--tm-warning)" }}>
              Open channel
            </p>
            <h2 className="mb-8 text-[clamp(30px,7vw,84px)] uppercase leading-none tracking-[-0.02em]">
              Get in touch
            </h2>
            <a href="mailto:kwame.nimfah@gmail.com"
               className="inline-block min-h-[44px] border-b-2 pb-1 text-[clamp(15px,3vw,26px)] tracking-normal normal-case"
               style={{ borderColor: "var(--tm-accent)", color: "var(--tm-fg)" }}>
              kwame.nimfah@gmail.com
            </a>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <a href="/cv/Kwame Yeboah - LXD - Resume.pdf" target="_blank" rel="noopener"
                 className="min-h-[44px] text-[12px] uppercase tracking-[0.14em]" style={{ color: "var(--tm-accent)" }}>
                Résumé ↓
              </a>
              <a href="https://www.linkedin.com/in/kwame-yeboah/" target="_blank" rel="noopener"
                 className="min-h-[44px] text-[12px] uppercase tracking-[0.14em]" style={{ color: "var(--tm-accent)" }}>
                LinkedIn ↗
              </a>
              <Link href="/work" className="min-h-[44px] text-[12px] uppercase tracking-[0.14em]" style={{ color: "var(--tm-accent)" }}>
                All work ↗
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* ── telemetry + progress ── */}
      <div className="pointer-events-none fixed bottom-4 left-4 right-4 z-40 flex items-center gap-4 sm:bottom-10 sm:left-10 sm:right-10">
        <p className="flex shrink-0 items-center gap-2 text-[12px] uppercase tracking-[0.14em]">
          <span className="tm-blink inline-block h-1.5 w-1.5" style={{ background: "var(--tm-warning)" }} aria-hidden="true" />
          <span className="tabular-nums">{clock}</span>
        </p>
        <div className="h-px flex-1" style={{ background: "var(--tm-edge)" }} aria-hidden="true">
          <div className="h-full transition-[width] duration-150" style={{ width: `${progress}%`, background: "var(--tm-accent)" }} />
        </div>
        <p className="shrink-0 text-[12px] uppercase tracking-[0.14em] tabular-nums">
          {String(panel + 1).padStart(2, "0")} / {String(PANELS.length).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
