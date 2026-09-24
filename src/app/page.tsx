import type { Metadata } from "next";
import "./terminal.css";
import { TerminalClient } from "@/components/terminal-client";

// The front door, as of 24 Sept 2026. This was /terminal, a second reading of the
// portfolio kept alongside the About-led home; it is now the home itself, and that page
// has moved to /about. Both still exist and both are reachable — the four panels lead to
// /work, the case study and /about — so nothing was traded away for the entrance.
//
// It sits outside the (site) group deliberately: the group's header, footer, preloader,
// cursor and reveal layer would all fight a full-viewport HUD that brings its own nav,
// progress bar and frame.
export const metadata: Metadata = {
  title: { absolute: "Kwame Yeboah — Learning experience design" },
  description:
    "Learning experience design, product design and front-end by Kwame Yeboah — scenario-based learning, design systems, and the case study to prove it.",
};

export default function Home() {
  // The <main> landmark is the panel track itself, inside TerminalClient.
  return <TerminalClient />;
}
