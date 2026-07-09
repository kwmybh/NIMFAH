import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERIES, frameCount, getSeries, photoUrl } from "@/lib/data";

type Params = { id: string };

// Pre-render the four known series (01–04); any other id 404s.
export function generateStaticParams(): Params[] {
  return SERIES.map((s) => ({ id: s.idx }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const series = getSeries(id);
  return { title: series ? series.title : "Series" };
}

export default async function SeriesDetail({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const series = getSeries(id);
  if (!series) notFound();

  const count = frameCount(series);
  const frames = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="detail">
      <Link href="/" className="back">
        ← All artwork
      </Link>
      <h1>{series.title}</h1>
      <p className="meta">
        Series {series.idx} · {series.meta}
      </p>
      <div className="frame-grid">
        {frames.map((f) => {
          const n = String(f).padStart(2, "0");
          return (
            <figure key={f}>
              {/* eslint-disable-next-line @next/next/no-img-element -- royalty-free placeholder, replaced with client work */}
              <img
                loading="lazy"
                src={photoUrl(series.seed, `f${f}`, 720, 900, series.gs)}
                alt={`${series.title} — frame ${n} (placeholder)`}
              />
              <figcaption>
                {n} / {count}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}
