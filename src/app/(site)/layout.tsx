import type { ReactNode } from "react";
import "../tsys.css";
import { SiteChrome } from "@/components/site-chrome";

// A route group: the parentheses keep it out of the URL, so these pages stay at /,
// /work and /series while gaining the shared chrome that /terminal does not want.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
