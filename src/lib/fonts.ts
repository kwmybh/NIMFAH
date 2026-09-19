import { Bodoni_Moda, Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";

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
