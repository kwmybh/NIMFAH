"use client";

import { useSyncExternalStore } from "react";

// Trial switch for the hide-and-reveal nav (1 Oct 2026). Off by default: the live site
// keeps the fixed bar. ?nav=reveal turns the trial on and ?nav=fixed turns it off; the
// choice is kept for the tab (sessionStorage), so it survives clicking around the site.
const KEY = "nimfah-nav";
const EVT = "nimfah-nav";

const read = (): boolean => {
  try {
    const q = new URLSearchParams(window.location.search).get("nav");
    if (q === "reveal" || q === "fixed") sessionStorage.setItem(KEY, q);
    return sessionStorage.getItem(KEY) === "reveal";
  } catch {
    return new URLSearchParams(window.location.search).get("nav") === "reveal";
  }
};

export function useNavReveal(): boolean {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      window.addEventListener(EVT, cb);
      return () => {
        window.removeEventListener("popstate", cb);
        window.removeEventListener(EVT, cb);
      };
    },
    read,
    () => false,
  );
}
