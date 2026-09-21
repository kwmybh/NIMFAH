import {
  Bodoni_Moda,
  Bricolage_Grotesque,
  DM_Sans,
  IBM_Plex_Mono,
  Rajdhani,
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

// Running prose only. Neutral geometric sans, kept out of labels and display type.
export const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-dm-sans",
  fallback: ["system-ui", "sans-serif"],
});
