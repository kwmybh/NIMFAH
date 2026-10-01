"use client";

import { useSyncExternalStore } from "react";

// Which look the hero and backgrounds wear:
//   "pixel"  — the bitmap portrait over drifting pixel clouds (live on main)
//   "static" — TV static and scanlines (option 01 from the analog board)
//   "vhs"    — tape tracking slips with red/blue split (the first analog try)
//   "broadcast" — colour, a multipath ghost, chroma drift, woven interference (option 03)
//
// Static adopted as the default, 1 Oct 2026 (trialled on branch try/analog-signal).
// DEFAULT_SIGNAL is the one switch:
// set it to the look to adopt. Any URL takes ?signal=pixel, static, vhs or broadcast
// to compare.
export type Signal = "pixel" | "static" | "vhs" | "broadcast";
export const DEFAULT_SIGNAL: Signal = "static";

const read = (): Signal => {
  const q = new URLSearchParams(window.location.search).get("signal");
  return q === "pixel" || q === "static" || q === "vhs" || q === "broadcast" ? q : DEFAULT_SIGNAL;
};

export function useSignal(): Signal {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb);
      return () => window.removeEventListener("popstate", cb);
    },
    read,
    () => DEFAULT_SIGNAL,
  );
}
