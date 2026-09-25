import {
  Bodoni_Moda,
  Bricolage_Grotesque,
  DM_Sans,
  IBM_Plex_Mono,
  Inter,
  JetBrains_Mono,
  Press_Start_2P,
  Rajdhani,
  Silkscreen,
} from "next/font/google";

// The single typeface for the whole platform. Variable font (weights 300–800 via the
// `wght` axis), self-hosted by next/font. Exposed as the CSS variable `--font-bricolage`,
// which every rule in globals.css references.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  fallback: ["system-ui", "sans-serif"],
});

// First 15 case-study display face. Variable font (weight + optical-size axes), used
// for display type only. Exposed as `--font-bodoni`.
export const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-bodoni",
  fallback: ["Didot", "Times New Roman", "serif"],
});

// First 15 data face (tabular figures). Static font, so weights are listed explicitly.
// Exposed as `--font-plex-mono`.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

// Display / UI / label face for the whole platform. Condensed and squarish — this single
// face carries most of the site's character. Static font, so weights are explicit.
export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rajdhani",
  fallback: ["system-ui", "sans-serif"],
});

// H1, site-wide, everything outside the .f15 case study.
//
// Measured rather than assumed, because this face behaves unlike any other here:
//   · every glyph advances exactly 1.000em — it is monospaced, so a heading is
//     precisely (characters x font-size) wide, and a long H1 has no way to fit
//   · cap-height is 1.000em, against ~0.72em for Rajdhani, so it reads far larger
//     than its px value suggests: size it at roughly 0.7x what a normal sans wants
//   · ascent 1000, descent 0, lineGap 0 — the line box is flush to the baseline
//     and lines collide at line-height 1. Nothing here should sit below ~1.4
//   · the outlines sit on an 8-cell-per-em grid (every path coordinate is a
//     multiple of 125 units), so sizes that are multiples of 8px land on whole
//     source pixels and anything else softens the stems. Hence stepped sizes at
//     breakpoints rather than a fluid clamp()
// One weight only, so font-synthesis is disabled wherever it is used.
export const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-press-start",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});

// Running prose only. Neutral geometric sans, kept out of labels and display type.
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
  fallback: ["system-ui", "sans-serif"],
});

// ── /terminal only ────────────────────────────────────────────────────────────
// The three faces the terminal mockup calls for, self-hosted rather than fetched from
// fonts.googleapis.com at runtime as the source HTML did: same files, one less origin
// on the critical path, and no layout shift while a third party answers. The variables
// are applied on the route's own wrapper, not on <html>, so these bytes are requested
// on /terminal and nowhere else.

// Body, labels and telemetry. Static weights, listed explicitly.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-jetbrains",
  fallback: ["ui-monospace", "SFMono-Regular", "Consolas", "monospace"],
});

// The panel headings — SENSORS, CORE SPECS — at 900 and clamped up to 220px, where the
// weight is the whole effect.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});

// The wordmark. A bitmap face: like Press Start 2P it wants sizes that land on whole
// pixels, and it carries no lowercase worth using — the mockup sets it uppercase.
export const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-silkscreen",
  fallback: ["ui-monospace", "Consolas", "monospace"],
});
