"use client";

import { useSyncExternalStore } from "react";

// Which look the hero and backgrounds wear. "pixel" is the bitmap portrait over drifting
// pixel clouds; "analog" is the VHS variant — tracking bands and RGB split.
//
// On trial (branch try/analog-signal, 1 Oct 2026). DEFAULT_SIGNAL is the one switch:
// keep "analog" to adopt it, set "pixel" to shelve it. Either way, ?signal=pixel or
// ?signal=analog on any URL shows the other look for comparison.
export type Signal = "pixel" | "analog";
export const DEFAULT_SIGNAL: Signal = "analog";

const read = (): Signal => {
  const q = new URLSearchParams(window.location.search).get("signal");
  return q === "pixel" || q === "analog" ? q : DEFAULT_SIGNAL;
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
