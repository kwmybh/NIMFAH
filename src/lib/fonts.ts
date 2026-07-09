import { Bricolage_Grotesque } from "next/font/google";

// The single typeface for the whole platform. Variable font (weights 300–800 via the
// `wght` axis), self-hosted by next/font. Exposed as the CSS variable `--font-bricolage`,
// which every rule in globals.css references.
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
  fallback: ["system-ui", "sans-serif"],
});
