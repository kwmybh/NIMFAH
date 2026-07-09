// Static content config for the platform. There is no server data — every surface is
// driven by these two arrays (mirrors SERIES / DOCS in the canonical design).
// All media are royalty-free placeholders to be swapped for the client's real work.

export type Series = {
  idx: string; // "01"–"04"
  title: string;
  meta: string; // "2023 · 18 frames · Silver gelatin"
  seed: string; // picsum.photos seed
  gs: boolean; // grayscale (monochrome series)
  film: string; // placeholder video URL
  filmMeta: string; // "16mm transfer · 00:15"
  sound: string; // field-recording label
  base: number; // base frequency for the synthesized WAV
  transcript: string; // written transcript for the audio (a11y)
};

export const SERIES: Series[] = [
  {
    idx: "01",
    title: "Mary & Eve",
    meta: "2023 · 18 frames · Silver gelatin",
    seed: "santamaria",
    gs: true,
    film: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    filmMeta: "16mm transfer · 00:15",
    sound: "Accra harbour, dawn",
    base: 110,
    transcript:
      "Transcript — waves against the hull, distant dockworkers, a ship’s bell every few seconds. Ambient, no dialogue.",
  },
  {
    idx: "02",
    title: "Adam & Joseph",
    meta: "2024 · 26 frames · Available light",
    seed: "joseph",
    gs: false,
    film: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    filmMeta: "Super 8 transfer · 00:15",
    sound: "Workshop, mid-morning",
    base: 146,
    transcript:
      "Transcript — a hand plane over timber, rhythmic; a mallet; birdsong through an open door. Ambient, no dialogue.",
  },
  {
    idx: "03",
    title: "Tatted",
    meta: "2025 · 21 frames · Monochrome",
    seed: "tatted",
    gs: true,
    film: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4",
    filmMeta: "16mm transfer · 00:15",
    sound: "Studio session, late night",
    base: 92,
    transcript:
      "Transcript — the hum of a tattoo machine, steady; paper towel; quiet conversation between passes. Ambient, no dialogue.",
  },
  {
    idx: "04",
    title: "Man's Best Friends",
    meta: "2025 · 30 frames · Available light",
    seed: "bestfriends",
    gs: false,
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

// Frame count parsed from the series meta ("… · 18 frames · …") -> 18 / 26 / 21 / 30.
export function frameCount(series: Series): number {
  const match = series.meta.match(/(\d+) frames/);
  return match ? parseInt(match[1], 10) : 0;
}

// picsum.photos seeded placeholder URL builder.
export function photoUrl(
  seed: string,
  suffix: string | number,
  w: number,
  h: number,
  grayscale: boolean,
): string {
  return `https://picsum.photos/seed/${seed}-${suffix}/${w}/${h}${grayscale ? "?grayscale" : ""}`;
}
