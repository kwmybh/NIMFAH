"use client";

import { useSyncExternalStore } from "react";
import { MOTION_KEY } from "./motion-init";

// One switch for every continuous animation on the site — the TV static, the portrait
// signal, the pixel clouds, the blinking cursor, the About carousel. WCAG 2.2.2 (Pause,
// Stop, Hide) asks that anything moving for more than five seconds alongside other
// content can be paused; the nav's Motion button is that mechanism, on every page.
//
// No stored choice → follow the device: prefers-reduced-motion starts paused. A choice
// made with the button is stored and wins from then on. The state lives on
// <html data-anim>, set before first paint by motionInitScript, so CSS can read it too.
// (Not data-motion: that one already arms the scroll-reveal layer — see motion.css.)
const EVT = "nimfah-motion";

const read = () => document.documentElement.dataset.anim === "paused";

/** true when continuous motion should be still — a single frame, no loop. */
export function useMotionPaused(): boolean {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener(EVT, cb);
      return () => window.removeEventListener(EVT, cb);
    },
    read,
    () => false,
  );
}

export function setMotionPaused(paused: boolean) {
  const v = paused ? "paused" : "on";
  document.documentElement.setAttribute("data-anim", v);
  try {
    localStorage.setItem(MOTION_KEY, v);
  } catch {
    // storage unavailable — the choice still holds for this page view
  }
  window.dispatchEvent(new Event(EVT));
}
