# NIMFAH — Design System

Extracted by measuring computed styles on curtisdesignr.me (21 Sept 2026, 1440×900),
then adapted for NIMFAH. Every value below is measured, not estimated.

These are values and patterns observed from a published page — the implementation here
is our own. Nothing is copied from that site's source.

---

## 1. Typefaces

Both are Google Fonts, open licence, free to self-host through `next/font/google`.

| Role | Face | Notes |
|---|---|---|
| Display / UI / labels | **Rajdhani** | Condensed, squarish, technical. Weights 400–700. This single face carries almost the entire visual character — it is the HUD feel. |
| Body copy | **DM Sans** | Neutral geometric sans. Weights 400–500. Used only for running prose. |

Ratio observed: Rajdhani on ~1133 elements, DM Sans on ~539. Display face dominates.

**Replaces:** Bricolage Grotesque (too soft and humanist for this idiom).
**Keeps:** Bodoni Moda and IBM Plex Mono stay scoped to the First 15 case study only.

---

## 2. Colour

> Token names `--panel` and `--edge` avoid a collision with `--surface` and `--line`,
> which `globals.css` already defines.

Measured hex values, by frequency of use.

| Token | Value | Use | Count |
|---|---|---|---|
| `--ink` | `#070210` | Page ground. Near-black with a **violet cast** — not neutral, not pure black. | 467 |
| `--black` | `#000000` | Secondary ground, overlays, pill text. | 477 |
| `--paper` | `#F5F0EB` | Primary text. Warm off-white, never pure white for body. | 506 |
| `--white` | `#FFFFFF` | Reserved for peak emphasis only. | 388 |
| `--acid` | `#9DF133` | **The accent.** Structural and interactive, never decorative. | 186 |
| `--muted` | `#747785` | Secondary text. Grey with a violet lean, matching the ground. | 982 |
| `--coral` | `#F75049` | Single warm counter-accent. One word in the hero, one category pill. | 67 |
| `--panel` | `#131418` | Raised panels. | 19 |
| `--edge` | `#25272F` | Hairlines and borders. | 8 |
| `--scrim-35` | `rgba(0,0,0,0.35)` | Image scrim, light. | 144 |
| `--scrim-55` | `rgba(0,0,0,0.55)` | Image scrim, heavy — under overlaid type. | 126 |

**Note:** `--muted` is the single most-used colour on the page (982 uses). The system is
mostly grey text on near-black, with acid used sparingly. Restraint is the point.

Against NIMFAH's current `--accent: #5fe12c`: close, but `#9DF133` is yellower and reads
warmer against the violet ground. Adopt `#9DF133`.

---

## 3. Type scale

Rajdhani, uppercase, with **line-height 0.8** on everything above 40px — very tight.
Tracking is **negative on display** and **positive on labels**. The rule is roughly
−3% of font size on display, +13% on small tracked labels.

| Step | Size | Weight | Tracking | Line-height | Use |
|---|---|---|---|---|---|
| `display-1` | 200px | 500 | −6px | 0.80 | Full-bleed wordmark |
| `display-2` | 120px | 400 | −7.2px | 0.80 | Secondary hero type |
| `display-3` | 80px | 500 | −2px | 0.80 | Section headings |
| `display-4` | 56px | 500 | normal | 0.86 | Sub-headings |
| `numeral` | 100px | 500 | −2px | 1.00 | Odometer counters |
| `title` | 40px | 600 | −1.6px | 0.80 | Card titles |
| `item` | 20px | 500 | normal | 1.00 | Project names |
| `label` | 16px | 700 | **+2.08px** | 1.00 | Tracked uppercase metadata |
| `label-sm` | 14px | 600 | +0.28px | 1.43 | Nav, buttons |

Body, DM Sans:

| Step | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| `body-lg` | 20px | 500 | −0.6px | 1.50 |
| `body` | 16px | 400 | normal | 1.60 |
| `body-sm` | 12.5px | 400 | normal | 1.80 |

Fluid: clamp between a mobile step and the desktop value rather than using these as fixed.

---

## 4. Geometry

- **Border radius: 0 everywhere.** Not one rounded corner on the entire page.
- **Borders: 0.5px and 1px solid only.** Hairlines, never heavier.
- **Page gutter: 32px.** Content runs 1376px inside a 1440px viewport.
- **No centred max-width wrap.** Sections are full-bleed; the gutter is the only inset.
  This is the structural difference from what NIMFAH currently does.

---

## 5. Motion

Four measured pairings. Use these, not invented ones.

| Purpose | Duration | Easing | Observed |
|---|---|---|---|
| Transforms, hover lifts | `0.3s` | `cubic-bezier(0, 0, 0.2, 1)` (decelerate) | 42 uses — the workhorse |
| Large positional moves | `0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) | 9 uses |
| Colour changes | `0.3s` | `ease-out` | 21 uses |
| Opacity | `0.15s` | `ease` | 15 uses |
| Accordion open/close | `0.3s` | `ease-out` on `grid-template-rows` | 7 uses |

The accordion trick: animate `grid-template-rows` from `0fr` to `1fr` rather than height.
That is how it opens smoothly without a fixed height.

---

## 6. Custom cursor

Measured recipe:

- A `position: fixed`, **60×60**, square (radius 0) element at `z-index: 60`.
- `mix-blend-mode: difference` — which is why it inverts whatever it passes over.
- The **native cursor is not hidden**. `body { cursor: auto }`, and zero elements set
  `cursor: none`. The ring accompanies the real pointer rather than replacing it.
- Class name suggests it doubles as a scroll-progress ring.

Implement with rAF lerp toward the pointer, not a direct assignment — the lag is the effect.

---

## 7. Component patterns

- **Nav** — wordmark hard left, bracketed MENU button hard right. Not a centred row.
- **Pill** — solid acid fill, black text, Rajdhani 700 tracked uppercase, zero radius.
  Coral variant for one category only.
- **Work card** — full-bleed image on its own saturated ground, category pill bottom-left,
  then a hairline row beneath with the name left and `VISIT ↗` right. No blurb.
- **Vertical text** — letters stacked as individual spans, not `writing-mode`.
- **Counters** — digit columns that roll; each digit is a column translated on reveal.
- **HUD marks** — corner ticks and hairline column rules over the full bleed.

---

## 8. Where NIMFAH deliberately differs

- One case study, not thirty. The work index is typographic where it has no screenshot.
- The First 15 case study keeps its own art direction — ink/gold/Bodoni — as a
  self-contained world. Per-project art direction is in the reference too.
- No Awwwards badge, no borrowed copy, no logo.

---

## 9. Motion layer as built (`src/app/motion.css`, `src/components/cursor.tsx`, `scroll.tsx`)

Three things shipped, and three measured items deliberately did not. Both lists matter —
an unrecorded omission looks like an oversight later.

**Shipped**

- **Cursor.** 60×60, radius 0, `z-index: 60`, `mix-blend-mode: difference`, native cursor
  left visible. Position written to the node from a rAF lerp (factor `0.18`), never through
  React state. Verified against the live page: over the wordmark the border inverts on the
  glyph and stays light on the ground; over a nav link the square fills and inverts the
  whole label.
- **Scroll reveals.** One `IntersectionObserver` over `[data-reveal]`, `rootMargin`
  `0 0 -12% 0`, unobserved once revealed. Pages opt in with an attribute and stay server
  components. Anything above 88% of the viewport at mount reveals without waiting.
- **Scroll progress.** 1px acid hairline, `transform: scaleX()` from a rAF-throttled
  scroll listener.

**Deviations, marked in the CSS**

- Reveal opacity runs `0.6s` expo-out, not the measured `0.15s ease`. The measured pairing
  is tuned for hover feedback; under a 0.6s positional move a 0.15s fade finishes first and
  reads as unfinished.
- The reference's cursor class name suggests it doubles as a scroll-progress ring. That was
  inferred from a name, not measured, so progress is a separate hairline rather than an
  invented arc.

**Not built, with reasons**

- **Vertical stacked scroll cue** — no room. At 1280 the wordmark occupies x 28→1252,
  y 440→768 of an 800px hero. A cue could only overlap the type.
- **Overlay menu** — the nav is two links. An overlay for two links is machinery, not motion.
- **Odometer counters** — there is no number on the site for them to count. The case study's
  meters already animate and belong to the scenario, not to the chrome.

**Failure mode guarded.** The hidden state is gated on `[data-motion="on"]`, set by a one-line
inline script in `<head>`. With scripting off or that script blocked, nothing is ever hidden —
the page renders complete rather than blank.
