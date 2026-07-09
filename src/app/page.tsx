import type { Metadata } from "next";
import { SERIES } from "@/lib/data";
import { SeriesGallery } from "@/components/series-gallery";
import { Hero } from "@/components/hero";

export const metadata: Metadata = {
  // `absolute` because the root-segment page doesn't inherit the layout's title template.
  title: { absolute: "NIMFAH — Artwork" },
};

// Artwork (home): oversized wordmark over a lead artwork, then the four series galleries.
export default function Home() {
  return (
    <section>
      <Hero />

      <p className="locations">Accra – Toronto – Washington DC</p>

      <div className="galleries">
        {SERIES.map((s) => (
          <SeriesGallery key={s.idx} cfg={s} />
        ))}
      </div>
    </section>
  );
}
