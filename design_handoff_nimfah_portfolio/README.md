# Handoff: NIMFAH — Portfolio Platform

## Overview
NIMFAH is a minimalist, art-first portfolio platform for a multidisciplinary creative (photographer / creative director). It has three surfaces:

1. **Artwork (home)** — an oversized-wordmark hero over a lead artwork, four interactive multimedia series galleries (photo / video / audio), and a connection-focused footer.
2. **Series detail** — per-series full frame grids (routed, linkable).
3. **Client Vault** — an invite-only portal: sign-in / request-access forms with validation, toast notifications, and a private document list behind a mock session.

Aesthetic: gallery-white editorial minimalism (references: jeffkoons.com hero composition, Atelier Tinika nav structure), one typeface, one restrained green accent, full light/dark theming.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. Your task is to **recreate these designs in the target codebase's existing environment** (Next.js/React, Vue, etc.) using its established patterns and libraries — or, if no environment exists yet, choose the most appropriate stack (a static-friendly React framework such as Next.js or Astro is a good fit) and implement the designs there.

That said, `app/index.html` is a complete, working vanilla implementation — its JS contains reference implementations of every behavior (router, theme persistence, gallery component, WAV/VTT generation, vault flow) that translate 1:1 into framework components.

## Fidelity
**High-fidelity.** Colors, typography, spacing, and interactions are final. Recreate pixel-perfectly. (One exception: all imagery/video/audio are royalty-free placeholders — see Assets.)

## Files
- `app/index.html` — **canonical build.** Self-contained web app: all markup, CSS custom-property theming, and vanilla JS behavior. Read this first.
- `NIMFAH v3.dc.html` — design-tool source of the same design (archive; template + logic class).
- `SeriesGallery.dc.html` — design-tool source of the gallery component (archive).

## Screens / Views

### 1. Artwork (home) — route `#/artwork`
- **Header**: no logo (identity carried by hero wordmark). Theme toggle button (☾/☀, 34×34px) absolute-right. Below: nav row, `justify-content:space-evenly` — Artwork / Vault / Contact(mailto) — 12px, uppercase, letter-spacing .32em, color `--dim2`, active item weight 600 color `--fg`, 8px 10px padding.
- **Hero**: artwork image inset with side padding `clamp(20px, 8vw, 150px)`, aspect-ratio 16/9.5, object-fit cover. Directly below, overlapping upward: the wordmark `NIMFAH` — weight 800, `font-size:clamp(62px,15.4vw,238px)`, line-height .82, letter-spacing -.02em, centered, nowrap, negative top margin `clamp(-30px,-4vw,-78px)`, z-index above image. Below 480px: `font-size:clamp(44px,13.5vw,64px)`, margin-top −10px.
- **Locations line**: "Accra – Toronto – Washington DC" — 12px uppercase, letter-spacing .24em, color `--dim2`, centered, padding `clamp(40px,7vh,84px)` vertical.
- **Galleries**: column of 4 series cards, gap `clamp(40px,7vh,80px)`, max-width 1560px. See Gallery component below.
- **Footer**: centered. "Let's build something enduring" (300 weight, `clamp(24px,2.8vw,40px)`, color `--dim`); email link `studio@nimfah.com` (500, `clamp(17px,1.9vw,24px)`, 2px bottom border in `--accent`); social row Instagram / LinkedIn / VSCO / Client Vault (12px uppercase .2em, `--dim2`; Client Vault has 1px `--accent` bottom border); copyright line 12px uppercase `--dim3`.

### 2. Gallery component (used 4×)
Card: 1px `--line` border, `--surface` background, padding `clamp(16px,2.4vw,30px)`.
- **Head**: "SERIES 01" (12px, .22em, uppercase, `--accent`) + title (h2, **800** — matches the wordmark weight, `clamp(24px,3vw,40px)`, letter-spacing −.02em) + right-aligned meta (12px `--dim`).
- **Stage**: aspect-ratio 16/10, black background, 1px border. Holds one of: photo (`<img>` cover), video (cover, poster, captions track, "REEL / 01" badge top-left on rgba(10,10,11,.55)), or sound (animated 46-bar level-meter canvas + "FIELD RECORDING" label block bottom-left).
- **Transport** (video/sound only — gets the `hidden` attribute on photo frames; CSS includes `.transport[hidden]{display:none}` so the flex rule doesn't override it): 44px round play button (1px `--accent` border, fills `--accent` on hover); time readout `0:00 / 0:15`; seek range (flex:1, accent-color); CC toggle (video only, `aria-pressed`, accent border when on); mute button; 76px volume range. Below 640px the row wraps and the seek slider becomes full-width (order 5).
- **Caption strip**: 13px/1.65 `--dim`, `aria-live=polite` — describes current item; sound shows a written transcript.
- **Tab rail**: `role=tablist`; 5 tabs — Frame 01 / Reel / Frame 02 / Sound / Frame 03 — 12px uppercase .12em with glyph (▣ ▶ ♪), 1px border; selected = accent border + accent text + accent 8% background. Roving tabindex, Arrow/Home/End keyboard nav.
- **"View all frames →"** (500 13px, accent underline) → series detail route.

### 3. Series detail — route `#/series/<idx>` (01–04)
"← All artwork" back button; h1 title (800, `clamp(34px,5.4vw,76px)`); meta line "Series 01 · 2023 · 18 frames · Silver gelatin" (13px `--dim`); frame grid `repeat(auto-fill, minmax(260px,1fr))`, gap `clamp(10px,1.2vw,18px)`, each cell an aspect-ratio 4/5 cover image with "01 / 18" figcaption (12px `--dim3`). Frame counts parse from the series meta: 18 / 26 / 21 / 30. Images lazy-load.

### 4. Client Vault — route `#/vault`
Centered column, max-width 440px.
- Title block: "CLIENT VAULT" (13px, .34em) + "Private creative direction · invite only" (12px `--dim2`).
- Context line: "A private room for commissioned direction — pitches, edits, and prints shared one client at a time." (13px/1.6 `--dim`, centered, max-width 340px).
- Card (1px `--linestrong` border): two tabs (Sign In / Request Access — flex:1, 13px, active gets 2px `--fg` bottom border). Sign In: Email + Passphrase fields (label 12px `--dim2`; input 15px, bottom-border-only 1px `--linestrong`, focus → `--fg`); solid submit "Establish Session →" (inverted: `--fg` bg / `--bg` text, 14px padding). Request Access: Name + Work email + Brief (textarea rows=3); outlined submit "Transmit Request →". Fine print: "TLS 1.3 · AES-256-GCM · EPHEMERAL SESSION" 11px `--dim3` with accent dot.
- **Authed state** replaces card: header row "SESSION EPHEMERAL" (accent dot) + "Seal ✕" button; 4 document rows (type chip PDF/KEY in 1px border, 11px; name 500 14px ellipsized; meta 12px `--dim3`; ↓ arrow), separated by `--line2` hairlines.

## Interactions & Behavior
- **Routing**: hash-based — `#/artwork`, `#/vault`, `#/series/01`…`04`. Back/forward supported (`hashchange`). Unknown → artwork. Per-route `document.title` ("NIMFAH — Artwork", series title, etc.). Scroll-to-top on navigate. In a framework, use its router with equivalent paths (`/`, `/vault`, `/series/[id]`).
- **Theme**: toggle light/dark; persist (localStorage key `nimfah-theme`); first visit honors `prefers-color-scheme`. Toggle glyph: ☾ in light, ☀ in dark.
- **Gallery**: selecting a tab stops current media, swaps stage content, resets transport. Play/pause toggles glyph ▶/❚❚ and aria-label. Seek maps 0–1000 → currentTime. Volume 0 implies muted. CC toggles the video's text track `showing`/`hidden`. Sound-bars animate only while playing and not under `prefers-reduced-motion`.
- **Vault validation**: email must match `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`; passphrase ≥ 6 chars; request form requires all three fields. Errors → error toast; success → success toast + authed state. Session persists in sessionStorage (`nimfah-vault`); "Seal" clears it. **Production note**: replace with real auth (the mock is intentionally client-side only).
- **Toasts**: fixed bottom-right, 330px, stacked; auto-dismiss 4.8s; `aria-live=polite` container. Left 2px tint border + code: success `#39B54A` "200", error `#E5484D` "422", info `#8a8a92` "···".
- **Placeholder-only actions**: vault document rows fire a "Decrypting…" toast (no real files yet).
- **Animations**: keep minimal — color/border transitions ~0.3s ease on hover/focus; respect `prefers-reduced-motion` globally (the reference CSS disables all animation under it).

## State Management
- `route` (current view + optional series id) — URL-driven.
- `theme` ('light'|'dark') — localStorage.
- Per-gallery: `activeItem` (0–4), `playing`, `muted`, `volume`, `ccOn`.
- Vault: `authTab` ('signin'|'request'), `authed` (sessionStorage), form field values.
- Toasts: array of `{kind,title,msg}` with auto-expiry.
- No server data; all content is static config (see `SERIES`, `DOCS` arrays in `app/index.html`).

## Design Tokens
One typeface: **Bricolage Grotesque** (Google Fonts; weights 300–800). No serif, no mono.

Light theme (default):
- `--bg` #FFFFFF · `--fg` #101013 · `--dim` #4c4c53 · `--dim2` #66666e · `--dim3` #6e6e75
- `--surface` #F6F6F4 · `--line` rgba(0,0,0,.14) · `--line2` rgba(0,0,0,.08) · `--linestrong` rgba(0,0,0,.36)
- `--accent` **#2E7D17** (deep green — chosen for ≥4.5:1 contrast on white)

Dark theme:
- `--bg` #0A0A0B · `--fg` #F4F3EE · `--dim` #9a9aa2 · `--dim2` #8f8f97 · `--dim3` #7a7a82
- `--surface` #101012 · `--line` rgba(255,255,255,.12) · `--line2` rgba(255,255,255,.07) · `--linestrong` rgba(255,255,255,.24)
- `--accent` **#5FE12C** (volt green — dark surfaces only)

Status colors: success #39B54A · error #E5484D · warn #F5A623.
Type scale: 12px labels (never smaller) → 13–15px body → clamp()-based display sizes (see per-screen specs). Letter-spacing: .32em nav / .2–.24em small caps / −.02 to −.03em display.
Spacing: fluid `clamp()` values throughout (see specs); no fixed grid step. Radius: 0 everywhere except circular buttons/dots. Shadows: toasts only (`0 14px 34px rgba(0,0,0,.18)`).

## Accessibility (must preserve)
Skip link; semantic landmarks; `lang="en"`; all interactive elements are real buttons/links with `:focus-visible` outlines; WCAG-AA contrast in both themes; 24px+ hit targets; roving-tabindex tablists; captions track on video; written transcripts for audio; `aria-live` captions and toasts; `prefers-reduced-motion` support; H1→H2 heading order.

## Screenshots
Reference captures in `screenshots/` (light theme unless noted): home hero, gallery photo state, gallery sound state, series detail grid, vault sign-in, home hero (dark). Note: video stages capture black in these tools — see the live `app/index.html` for video states.

## Assets
All media are **royalty-free placeholders to be replaced with the client's real work**:
- Photos: `picsum.photos` seeded URLs (`?grayscale` for monochrome series).
- Video: test-videos.co.uk (Jellyfish clip) and MDN CC0 flower clip.
- Audio: generated at runtime (22s WAV synthesized in JS — see `makeWav()`); captions VTT also generated at runtime (`makeVtt()`).
- No logo/favicon/OG image exists yet — the wordmark is set in Bricolage Grotesque 800.

## Suggested implementation order
1. Scaffold routes + theme provider (tokens above as CSS custom properties).
2. Static home page (header/hero/wordmark/footer).
3. Gallery component (photo → video → audio, transport, tablist).
4. Series detail route.
5. Vault UI with mock auth, then swap in real auth (NextAuth/Supabase/etc.).
6. Replace placeholder media; add favicon + OG image; deploy.
