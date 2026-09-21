// Static content config for the platform. There is no server data — every surface is
// driven by these arrays. Images are explicit lists of paths per series (swap the
// placeholder generators below for your own files — see public/artwork/README.md).

export type Series = {
  idx: string; // "01"–"04"
  slug: string; // url-safe folder name under /public/artwork
  title: string;
  year: string; // "2023"
  medium: string; // "Silver gelatin"
  frames: string[]; // the series' photos; first three preview on the home galleries,
  //                    the full list fills the series-detail grid. Count derives from here.
  poster: string; // film reel poster image
  film: string; // reel video URL
  filmMeta: string; // "16mm transfer · 00:15"
  sound: string; // field-recording label
  base: number; // base frequency for the synthesized WAV
  transcript: string; // written transcript for the audio (a11y)
};

// --- Placeholder generators --------------------------------------------------
// TEMPORARY: royalty-free picsum.photos URLs so the site looks complete before the
// client's real work is added. To use your own images, drop files in
// public/artwork/<slug>/ and replace the `placeholderFrames(...)` / `placeholder(...)`
// calls below with paths, e.g. frames: ["/artwork/mary-eve/01.jpg", ...].
function placeholder(seed: string, w: number, h: number, mono: boolean): string {
  return `https://picsum.photos/seed/${seed}/${w}/${h}${mono ? "?grayscale" : ""}`;
}
function placeholderFrames(seed: string, count: number, mono: boolean): string[] {
  return Array.from({ length: count }, (_, i) =>
    placeholder(`${seed}-f${i + 1}`, 1000, 1250, mono),
  );
}

// ARCHIVED, 21 Sept 2026. The photography is not finished — three of the four series
// are still picsum placeholders — and nimfah.com's job right now is the learning-design
// work. Flip this to true to bring the series back: the /work section and the
// /series/[id] routes both key off it. Nothing has been deleted.
export const SHOW_PHOTOGRAPHY = false;

// ARCHIVED, 21 Sept 2026. The placeholder portrait wasn't serving the hero — the type
// carries it better alone for now. Files stay in public/portrait/; flip this to true to
// bring the image back, or point it at a proper self-portrait when one exists.
export const SHOW_HERO_PORTRAIT = false;

// The lead artwork behind the home wordmark. Replace with e.g. "/artwork/hero.jpg".
export const HERO_IMAGE = "/artwork/mary-eve/05.jpg";

export const SERIES: Series[] = [
  {
    idx: "01",
    slug: "mary-eve",
    title: "Mary & Eve",
    year: "2023",
    medium: "Silver gelatin",
    frames: [
      "/artwork/mary-eve/01.jpg",
      "/artwork/mary-eve/02.jpg",
      "/artwork/mary-eve/03.jpg",
    ],
    poster: placeholder("santamaria-film", 1280, 800, true),
    film: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    filmMeta: "16mm transfer · 00:15",
    sound: "Accra harbour, dawn",
    base: 110,
    transcript:
      "Transcript — waves against the hull, distant dockworkers, a ship’s bell every few seconds. Ambient, no dialogue.",
  },
  {
    idx: "02",
    slug: "adam-joseph",
    title: "Adam & Joseph",
    year: "2024",
    medium: "Available light",
    frames: placeholderFrames("joseph", 26, false),
    poster: placeholder("joseph-film", 1280, 800, false),
    film: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    filmMeta: "Super 8 transfer · 00:15",
    sound: "Workshop, mid-morning",
    base: 146,
    transcript:
      "Transcript — a hand plane over timber, rhythmic; a mallet; birdsong through an open door. Ambient, no dialogue.",
  },
  {
    idx: "03",
    slug: "tatted",
    title: "Tatted",
    year: "2025",
    medium: "Monochrome",
    frames: placeholderFrames("tatted", 21, true),
    poster: placeholder("tatted-film", 1280, 800, true),
    film: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    filmMeta: "16mm transfer · 00:15",
    sound: "Studio session, late night",
    base: 92,
    transcript:
      "Transcript — the hum of a tattoo machine, steady; paper towel; quiet conversation between passes. Ambient, no dialogue.",
  },
  {
    idx: "04",
    slug: "mans-best-friends",
    title: "Man's Best Friends",
    year: "2025",
    medium: "Available light",
    frames: placeholderFrames("bestfriends", 30, false),
    poster: placeholder("bestfriends-film", 1280, 800, false),
    film: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    filmMeta: "Super 8 transfer · 00:15",
    sound: "Park, early morning",
    base: 130,
    transcript:
      "Transcript — paws on gravel, a shaken collar, distant fetch calls across the field. Ambient, no dialogue.",
  },
];

export type Doc = {
  n: string; // name
  t: string; // type chip (PDF / KEY)
  m: string; // meta
};

export const DOCS: Doc[] = [
  { n: "Mary & Eve — Print Edition Pitch", t: "PDF", m: "24 pp · 2 days ago" },
  { n: "Tatted — Gallery Concept", t: "KEY", m: "40 pp · 5 days ago" },
  { n: "Man's Best Friends — Book Dummy", t: "PDF", m: "56 pp · 1 week ago" },
  { n: "Adam & Joseph — Exhibition", t: "PDF", m: "32 pp · 3 weeks ago" },
];

export function getSeries(idx: string): Series | undefined {
  return SERIES.find((s) => s.idx === idx);
}

// "2023 · 18 frames · Silver gelatin" — frame count stays in sync with `frames`.
export function seriesMeta(s: Series): string {
  return `${s.year} · ${s.frames.length} frames · ${s.medium}`;
}
