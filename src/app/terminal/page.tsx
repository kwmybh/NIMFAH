import type { Metadata } from "next";
import "../terminal.css";
import { TerminalClient } from "./terminal-client";

// A second reading of the same portfolio, kept as its own route rather than swapped in
// over the homepage. Everything on it is real and every link goes somewhere; what it
// does not have is the depth of /work, so it sits alongside rather than replacing.
export const metadata: Metadata = {
  title: "Terminal",
  description:
    "Kwame Yeboah — learning experience design, product design and front-end, in four panels.",
  // The same content already lives at nimfah.com in longer form. Pointing the canonical
  // at the homepage keeps the two from competing for the same query.
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function TerminalPage() {
  // Outside the (site) group, so this page owns the landmarks the chrome would
  // otherwise provide. The <main> landmark is the panel track itself, inside
  // TerminalClient — the mockup's #main-container — so there is exactly one.
  return <TerminalClient />;
}
