// Kept out of lib/motion.ts ("use client") so the root layout, a server component, gets
// the plain string. Sets <html data-anim> before first paint — see lib/motion.ts.
export const MOTION_KEY = "nimfah-motion";

export const motionInitScript = `(function(){var d=document.documentElement;try{d.setAttribute("data-anim",localStorage.getItem("${MOTION_KEY}")||(matchMedia("(prefers-reduced-motion: reduce)").matches?"paused":"on"));}catch(e){d.setAttribute("data-anim","on");}})();`;
