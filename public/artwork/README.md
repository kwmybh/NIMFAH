# Artwork — how to add real images

Every image on the site is a plain path. Drop your files in here and point the config
at them. Files in `public/` are served from the site root, so
`public/artwork/mary-eve/01.jpg` is available at `/artwork/mary-eve/01.jpg`.

All image wiring lives in **`src/lib/data.ts`**. Right now each series uses a
`placeholderFrames(...)` / `placeholder(...)` generator that returns royalty-free
picsum.photos URLs. Replace those calls with your own paths.

## Folders (one per series)

| Series | slug | folder |
| ------ | ---- | ------ |
| 01 · Mary & Eve | `mary-eve` | `public/artwork/mary-eve/` |
| 02 · Adam & Joseph | `adam-joseph` | `public/artwork/adam-joseph/` |
| 03 · Tatted | `tatted` | `public/artwork/tatted/` |
| 04 · Man's Best Friends | `mans-best-friends` | `public/artwork/mans-best-friends/` |

## Steps

1. **Add frame photos.** Put the series' photos in its folder, e.g.
   `public/artwork/mary-eve/01.jpg`, `02.jpg`, … (any order/name you like).

2. **List them in `src/lib/data.ts`.** Replace the `frames:` generator with your paths.
   The **first three** frames preview on the home galleries; the **whole list** fills the
   series-detail grid, and the frame count (`N frames`) is derived from the list length —
   so you never edit a count by hand.

   ```ts
   // before (placeholder)
   frames: placeholderFrames("santamaria", 18, true),
   // after (your files)
   frames: [
     "/artwork/mary-eve/01.jpg",
     "/artwork/mary-eve/02.jpg",
     // …as many as you have
   ],
   ```

3. **Film poster** — replace the `poster:` line with your still,
   e.g. `poster: "/artwork/mary-eve/poster.jpg"`.

4. **Hero (home lead image)** — replace `HERO_IMAGE` near the top of `data.ts`
   with e.g. `export const HERO_IMAGE = "/artwork/hero.jpg";` and drop the file at
   `public/artwork/hero.jpg`.

5. **Reel video + audio** are separate from images: `film` is the reel URL per series
   (swap for your own `.mp4`, local or CDN); the field-recording audio is currently
   synthesized in `src/lib/audio.ts` — replace with real audio + a real captions `.vtt`
   when ready.

## Recommended next step: `next/image`

The site currently uses plain `<img>` tags, which serve images at full size. For real,
high-resolution photography you'll want automatic optimization, responsive sizes, and
lazy-loading — ask to migrate the gallery/detail images to `next/image`.
