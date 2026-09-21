Read `docs/design-system.md` and `src/app/tokens.css` first. Every value you need is
measured and recorded there — don't invent sizes, colours or easings, and don't guess
where the doc is specific.

## Part 1 — foundation

In `src/lib/fonts.ts`, add two `next/font/google` faces alongside the existing three:

- `Rajdhani`, weights 400/500/600/700, CSS variable `--font-rajdhani`
- `DM_Sans`, weights 400/500, CSS variable `--font-dm-sans`

Keep Bricolage, Bodoni Moda and IBM Plex Mono exactly as they are. Bricolage is still
referenced by `first15.css`, and Bodoni and Plex Mono are scoped to that case study —
removing any of them breaks it.

Add both new `.variable` classes to the `<html>` element in `src/app/layout.tsx`, next to
the three already there.

Import `./tokens.css` at the top of `src/app/globals.css`, before anything else. Then
rewrite the `:root` and `[data-theme="dark"]` blocks in `globals.css` so the existing
semantic names source from the new tokens rather than holding their own hex values:

- `--bg` → `var(--ink)`
- `--fg` → `var(--paper)`
- `--accent` → `var(--acid)`
- `--dim`, `--dim2`, `--dim3` → `var(--muted)`

Leave `--surface`, `--line`, `--line2` and `--linestrong` as they are. Don't delete the
light theme — the toggle still works — but dark is the default and the one that has to be
right.

Set the body font stack to `var(--body)` (DM Sans) and any UI/heading defaults to
`var(--display)` (Rajdhani). Do not touch anything under `.f15` in `first15.css`.

## Part 2 — the hero, full bleed

`src/app/page.tsx` and `src/app/about.css`.

The problem to fix: everything currently sits inside a centred 1180px `.abt-wrap`. The
reference has no centred wrap — content runs edge to edge with a 32px gutter, which is
what `.bleed` in `tokens.css` does.

- Replace `.abt-wrap` usage in the hero with `.bleed`. The hero becomes
  `min-height: 100svh` and full viewport width.
- The portrait becomes the **background of the whole hero**, not a panel on the right:
  `position: absolute; inset: 0`, `object-fit: cover`, with a `--scrim-55` overlay so
  type stays legible on it. Everything else sits above it.
- NIMFAH uses the `.t-display-1` role — `var(--fs-d1)`, weight 500, line-height 0.8,
  tracking −0.03em, uppercase. It should run close to the full width at 1440px. Anchor it
  to the bottom-left of the hero.
- The contact line, statement, pill and sub-labels sit above it in the same bleed,
  left-aligned.
- Pill: solid `var(--acid)`, black text, `.t-label`, zero radius.
- Sub-labels and contact line: `.t-label-sm`, `var(--muted)`.
- Statement: `.t-body-lg`, `var(--paper)`, max 46ch, with the one accented word in
  `var(--acid)`.

## Part 3 — the nav

`src/components/header.tsx`. Currently `justify-content: space-evenly` across 1313px,
which leaves two items floating in the middle.

Replace with: a `NIMFAH` wordmark pinned hard left in `.t-label`, and the two links
pinned hard right. Same 32px gutter as the hero, `position: fixed`, transparent
background, above the hero. Keep the theme toggle.

## Constraints

- Zero border-radius anywhere — the reference has none.
- Hairlines are 0.5px or 1px only.
- Use only the four motion pairings in section 5 of the design system doc.
- Don't install any packages.
- Don't touch `first15.css`, `work.css` or the case study route.
- Run `npx tsc --noEmit` and `npm run build` when you're done.
- Tell me anything in the doc you couldn't implement rather than substituting something.

Stop after Part 3. The cursor, scroll engine, counters and preloader come next, and they
need the composition settled first.
