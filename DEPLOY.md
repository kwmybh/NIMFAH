# NIMFAH — deploy runbook

> **Superseded in part, 23 Sept 2026.** The August plan was to ship **unindexed** while
> the media was placeholder. That is now the wrong call: the site is live with a real
> case study and a real résumé, and its whole purpose is to be found by someone reading
> an application. The site is indexable and stays that way.
>
> `robots.ts`, `sitemap.ts` and `src/lib/site.ts` now exist, written fresh against the
> current routes rather than applied from the August patch — which also carried the
> noindex. That patch has been deleted; do not go looking for it.
>
> The sitemap lists only routes that resolve. The photography series sit behind
> `SHOW_PHOTOGRAPHY` and currently 404, so they are excluded until the flag flips.
> `/vault` is disallowed in robots.

Status as of 2026-08-20: the app builds clean (14 routes, TypeScript and ESLint pass) and
is deployable today.

```bash
cd ~/Documents/001_PROJECTS/NIMFAH
git checkout -b chore/pre-launch-hardening
git am < /path/to/nimfah-pre-launch-hardening.patch
npm run build          # sanity check
git checkout main && git merge chore/pre-launch-hardening
git push
```

If iCloud is still evicting files, clone fresh somewhere outside `~/Documents` instead:

```bash
git clone https://github.com/kwmybh/NIMFAH.git ~/code/NIMFAH
```

---

## 1. Connect the repo to Vercel

Vercel → **Add New → Project** → import `kwmybh/NIMFAH`.

Framework preset auto-detects as Next.js. Leave build command, output directory, and
install command at their defaults — this is a stock App Router project and needs no
overrides.

---

## 2. Environment variables

Set these in **Project → Settings → Environment Variables**.

| Variable | Value | Environments | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://nimfah.com` | Production | Only once the custom domain is attached. Until then leave it unset — the code falls back to `VERCEL_PROJECT_PRODUCTION_URL` on its own. |
| `SITE_INDEXABLE` | *(leave unset)* | — | Set to `true` **only** when real artwork has replaced the placeholders. See step 5. |

Nothing else is required. There are no secrets, no database, and no API keys — the Vault's
auth is a client-side mock and every surface is static config.

---

## 3. Domain

Project → **Settings → Domains** → add `nimfah.com` and `www.nimfah.com`.

Vercel will show the DNS records to create at your registrar. Point the apex at Vercel's
A record and `www` at the CNAME, then let it redirect `www` → apex (or the reverse — pick
one and be consistent, since `NEXT_PUBLIC_SITE_URL` has to match whichever is canonical).

After the domain resolves, set `NEXT_PUBLIC_SITE_URL` and **redeploy** — metadata,
OG image URLs, and the sitemap all derive from it at build time, so it won't take effect
until a fresh build runs.

---

## 4. Post-deploy verification

```bash
curl -s https://<your-domain>/robots.txt
# expect: User-Agent: *  /  Disallow: /
```

Then check by hand:

- `/` — hero parallax, four galleries, theme toggle persists across reload
- `/series/01` … `/series/04` — frame grids render; `/series/05` 404s
- `/vault` — sign-in validation, toasts, "Seal" clears the session
- `/api/health` — returns OK
- View source on `/` — `<meta name="robots" content="noindex, nofollow, nocache"/>`
- Paste the URL into Slack or iMessage — the branded OG card should render
- **The film reels on series 02 and 04** — these point at
  `interactive-examples.mdn.mozilla.net`, a host Mozilla retired. Confirm whether they
  still play; if not, either repoint them or hide the Reel tab until real footage exists.

Vercel Analytics and Speed Insights are already wired in `layout.tsx` — data starts
flowing on the first production visit, no extra config.

---

## 5. Going live in search (later)

When real photography, film, and audio have replaced the placeholders:

1. Set `SITE_INDEXABLE=true` in Production.
2. Redeploy.
3. Confirm `/robots.txt` now reads `Allow: /` with a `Sitemap:` line.
4. Submit `https://<domain>/sitemap.xml` in Google Search Console.

That single flag controls `robots.txt`, the sitemap contents, and the meta tag together,
so there's no second place to remember.

---

## Known open items

These are tracked separately from deployment — none block a launch, but each is a real
edge on a public site:

- **Vault copy overstates its security.** The UI reads `TLS 1.3 · AES-256-GCM ·
  EPHEMERAL SESSION` and "Ephemeral key exchanged", while any email plus any 6-character
  password unlocks it. The documents behind it are fictional, so nothing leaks — but the
  claim is false on a public page.
- **Request Access goes nowhere.** It collects a real visitor's name, work email, and
  brief, then says "a curator will respond within 48 hours." Nothing is stored or sent.
- **`studio@nimfah.com`** is the site's only contact route, in both the nav and the
  footer. If that mailbox doesn't exist, inbound mail bounces silently.
- **Footer socials** point at `instagram.com`, `linkedin.com`, `vsco.co` — platform home
  pages, not profiles.
- **Third-party media is hotlinked** from `picsum.photos` and `test-videos.co.uk`. Fine
  for a staging URL; it's someone else's bandwidth on a public production site, and the
  page breaks if either rate-limits.
