import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASE_STUDIES, getCaseStudy, type Figure } from "@/lib/case-studies";
import "../../../first15.css";
import "../../../case-study.css";

// One template for the product design case studies brought over from Squarespace. It
// wears First 15's system (the .f15 tokens, sections, spec lists and close) so the work
// index reads as one body of work, and adds only what those pages need that First 15
// doesn't: figures. First 15 keeps its own route; a static segment wins over [slug].

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} | Kwame Yeboah`,
    description: cs.cardMeta,
    openGraph: { images: [{ url: cs.cover.src, width: cs.cover.w, height: cs.cover.h }] },
  };
}

function Fig({ f, priority = false }: { f: Figure; priority?: boolean }) {
  return (
    <figure className={`cs-fig cs-fig-${f.span ?? "wide"}`}>
      <a href={f.src} target="_blank" rel="noopener" className="cs-fig-frame" aria-label={`Open full size: ${f.alt}`}>
        <Image
          src={f.src}
          alt={f.alt}
          width={f.w}
          height={f.h}
          priority={priority}
          sizes={f.span === "half" ? "(max-width: 760px) 92vw, 560px" : "(max-width: 1180px) 92vw, 1100px"}
        />
      </a>
      {f.caption ? <figcaption>{f.caption}</figcaption> : null}
    </figure>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== cs.slug);

  return (
    <article className="f15 cs">
      <section className="f15-hero">
        <div className="f15-wrap">
          <div className="f15-rise">
            <div className="f15-rule" />
            <p className="f15-eyebrow">{cs.kicker}</p>
          </div>
          <h1 className="f15-rise">{cs.headline}</h1>
          <p className="f15-sub f15-rise">{cs.sub}</p>
          <div className="cs-cover f15-rise">
            <Fig f={cs.cover} priority />
          </div>
        </div>
      </section>

      <section className="f15-facts" aria-label="Project facts">
        <div className="f15-wrap">
          <dl className="f15-factgrid">
            {cs.facts.map(([k, v]) => (
              <div className="f15-fact" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="f15-disclosure" aria-label="About this case study">
        <div className="f15-wrap">
          <p>{cs.disclosure}</p>
        </div>
      </section>

      {cs.sections.map((s, i) => (
        <section key={s.id} id={s.id} className={`f15-section f15-section-${i % 2 ? "paper" : "dark"}`}>
          <div className="f15-wrap">
            <div className="f15-sec-head">
              <span className="f15-sec-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="f15-eyebrow">{s.eyebrow}</span>
            </div>
            <h2>{s.title}</h2>
            {s.prose ? (
              <div className="f15-prose">
                {s.prose.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            ) : null}
            {s.pull ? <p className="f15-pull cs-pull">{s.pull}</p> : null}
            {s.points ? (
              <dl className="f15-spec">
                {s.points.map((p) => (
                  <div className="f15-spec-row" key={p.k}>
                    <dt>{p.k}</dt>
                    <dd>{p.v}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            {s.figures ? (
              <div className="cs-figs">
                {s.figures.map((f) => (
                  <Fig f={f} key={f.src} />
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section
        id="next"
        className={`f15-section f15-section-${cs.sections.length % 2 ? "paper" : "dark"}`}
      >
        <div className="f15-wrap">
          <div className="f15-sec-head">
            <span className="f15-sec-n">{String(cs.sections.length + 1).padStart(2, "0")}</span>
            <span className="f15-eyebrow">What I&apos;d Do Next</span>
          </div>
          <h2>Honest next steps.</h2>
          <dl className="f15-spec">
            {cs.next.map((p) => (
              <div className="f15-spec-row" key={p.k}>
                <dt>{p.k}</dt>
                <dd>{p.v}</dd>
              </div>
            ))}
          </dl>
          <p className="f15-pull">{cs.closing}</p>
        </div>
      </section>

      <section className="f15-close" aria-label="More work">
        <div className="f15-wrap">
          <p className="f15-contact-line">More work</p>
          <ul className="cs-more">
            <li>
              <Link href="/work/first-15-last-mile-onboarding">First 15 — scenario-based onboarding ↗</Link>
            </li>
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/work/${o.slug}`}>{o.title} ↗</Link>
              </li>
            ))}
          </ul>
          <p className="f15-close-nav">
            <Link href="/work">← All work</Link>
          </p>
        </div>
      </section>
    </article>
  );
}
