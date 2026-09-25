import type { Metadata } from "next";
import "../../../first15.css";
import { TriageDemo } from "./triage";
import { FlowMap } from "./flow-map";
import { ObjectiveMap } from "./objective-map";

export const metadata: Metadata = {
  title: "First 15: Scenario-Based Delivery Onboarding | Kwame Yeboah, LXD",
  description:
    "A blended Rise 360 and Storyline 360 experience that trains last-mile delivery associates to make safe, service-protecting decisions in the first 15 minutes.",
};

type SectionProps = {
  id: string;
  tone: "dark" | "paper";
  number: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

function Section({ id, tone, number, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className={`f15-section f15-section-${tone}`}>
      <div className="f15-wrap">
        <div className="f15-sec-head">
          <span className="f15-sec-n">{number}</span>
          <span className="f15-eyebrow">{eyebrow}</span>
        </div>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

const SPEC: [string, string][] = [
  ["Branching", "38 slides across 7 scenes · 4 scored decision points · 12 tracked variables"],
  ["Scoring", "Points assigned per choice, so a native results slide reports to the LMS while custom Safety, Service and Time variables drive the coaching"],
  ["Safety gate", "Below 55, a Critical Risk layer interrupts, a two-screen micro-lesson runs, and the learner re-decides with a remediation flag set — so the LMS can tell a first-pass result from a second one"],
  ["Consequence", "Delayed on purpose. Top up the tire and go, and the warning returns at stop nine, on a bridge approach — then the station lead talks to you"],
  ["Debrief", "Replays the learner's path and shows how each choice moved each dimension. Fast-and-exposed gets different coaching from careful-and-costly, because those two people need opposite advice"],
  ["Rise 360", "Six lessons before the scenario for the model; a field guide after, built to reopen on a phone in a van at 6:55 a.m."],
  ["Accessibility", "No timers anywhere · nothing signalled by colour alone · explicit focus order on every slide · captions and transcript · reduced motion set before the story starts"],
  ["Standards", "WCAG 2.1 AA · SCORM 1.2 and 2004 4th Edition · optional xAPI decision-path statements"],
  ["Measurement", "The scenario records a path string for every learner, so the plan surfaces which distractor a cohort picks most. That is a curriculum instrument, not a report"],
];

export default function FirstFifteenLastMileOnboarding() {
  // <article>, not <main>: SiteChrome already wraps every page in <main id="main">, so a
  // <main> here nested a second one inside it — two main landmarks, and a screen reader
  // user cycling landmarks lands on the same region twice.
  return (
    <article className="f15">
      <section className="f15-hero">
        <div className="f15-wrap">
          <div className="f15-rise">
            <div className="f15-rule" />
            <p className="f15-eyebrow">
              Learning Experience Design &nbsp;·&nbsp; Scenario-based onboarding
            </p>
          </div>
          <h1 className="f15-rise">The first fifteen minutes decide the whole shift.</h1>
          <p className="f15-sub f15-rise">
            Onboarding that trains last-mile delivery associates to decide under pressure — not to
            recite a checklist. Designed, art-directed and built end to end.
          </p>

          <div className="f15-ctas">
            <a className="f15-cta f15-cta-1" href="#try">
              <strong>Play the scenario →</strong>
              <em>Four decisions, two minutes, right here on this page.</em>
            </a>
            <a
              className="f15-cta f15-cta-2"
              href="/first-15/learning-design-document.pdf"
              target="_blank"
              rel="noopener"
            >
              <strong>Read the design document ↓</strong>
              <em>23-page PDF: brief, objectives, architecture, measurement.</em>
            </a>
            <a
              className="f15-cta f15-cta-2"
              href="/first-15/decision-guide-job-aid.pdf"
              target="_blank"
              rel="noopener"
            >
              <strong>Take the job aid ↓</strong>
              <em>One page: the triage, the four triggers, the escalation template.</em>
            </a>
            <a
              className="f15-cta f15-cta-3"
              href="/first-15/production-storyboard.xlsx"
              target="_blank"
              rel="noopener"
            >
              <strong>Open the storyboard →</strong>
              <em>Ten annotated screens, developer-handoff standard. Excel download.</em>
            </a>
          </div>
        </div>
      </section>

      <section className="f15-facts" aria-label="Project facts">
        <div className="f15-wrap">
          <dl className="f15-factgrid">
            <div className="f15-fact">
              <dt>Role</dt>
              <dd>Sole designer and developer — brief, objectives, branching architecture, storyboard, art direction, Rise and Storyline build, accessibility, measurement plan</dd>
            </div>
            <div className="f15-fact">
              <dt>Client</dt>
              <dd>MileOne Logistics — a realistic fictional carrier</dd>
            </div>
            <div className="f15-fact">
              <dt>Audience</dt>
              <dd>New delivery associates and newly promoted dispatch coordinators</dd>
            </div>
            <div className="f15-fact">
              <dt>Duration</dt>
              <dd>37–48 min · Rise 19–24 · Storyline 8–12 · field guide 10–12</dd>
            </div>
            <div className="f15-fact">
              <dt>Tools</dt>
              <dd>Storyline 360 · Rise 360 · Figma · Illustrator · Photoshop · Audition · NVDA and VoiceOver</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="f15-disclosure" aria-label="Fictional client disclosure">
        <div className="f15-wrap">
          <p>
            MileOne Logistics is fictional, created for this project. All scenarios and data are
            illustrative. No metrics here are reported outcomes.
          </p>
        </div>
      </section>

      <Section id="challenge" tone="dark" number="01" eyebrow="The Problem" title="The gap isn&apos;t knowledge. It&apos;s deciding.">
        <div className="f15-prose">
          <p>
            A last-mile operation loses more ground in the first fifteen minutes of a shift than in
            the eight hours that follow. Most new associates can recite the pre-shift checklist. What
            they can&apos;t do yet is <b>decide under competing pressure</b> — and that is the one thing a
            checklist cannot teach and a knowledge check cannot measure.
          </p>
          <p className="f15-pull">
            So the design problem wasn&apos;t &quot;build a pre-shift course.&quot; It was: how do you let someone
            practise the first fifteen minutes of a bad morning forty times before it counts?
          </p>
        </div>

        <div className="f15-model">
          <div className="f15-model-card">
            <span className="f15-model-n">Fix</span>
            <p>I can resolve this myself, right now, safely, within policy.</p>
          </div>
          <div className="f15-model-card">
            <span className="f15-model-n">Flag</span>
            <p>Someone else has the authority or the information. Tell them now, completely.</p>
          </div>
          <div className="f15-model-card">
            <span className="f15-model-n">Note</span>
            <p>This doesn&apos;t change today&apos;s plan, but it goes on the record.</p>
          </div>
        </div>
        <p className="f15-model-note">
          Three dispositions, not two. A two-way model makes every right answer &quot;escalate,&quot; which is
          useless as training and untrue to the job. The third creates the middle path where most real
          pre-shift discoveries actually live.
        </p>
      </Section>

      <Section id="try" tone="paper" number="02" eyebrow="The Scenario" title="Four decisions. Fifteen minutes. Try it.">
        <div className="f15-prose">
          <p>
            A working miniature of the Storyline build — the same four decision points, the same three
            tracked dimensions, the same categorical-safety interrupt. Scoring and feedback are taken
            from the design document.
          </p>
        </div>
        <TriageDemo />
      </Section>

      <Section id="build" tone="dark" number="03" eyebrow="How It&apos;s Built" title="A state machine wearing a story.">
        <div className="f15-prose">
          <p>
            The four decision points are not authored preferences. Six objectives had to be assessed,
            each one needing an interaction that teaches it and a piece of evidence that measures it,
            and the scenario is what that requirement produced.
          </p>
        </div>
        <ObjectiveMap />

        <FlowMap />

        <dl className="f15-spec">
          {SPEC.map(([k, v]) => (
            <div className="f15-spec-row" key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className="f15-sb">
          <p className="f15-sb-id">SB-06 &nbsp;·&nbsp; S3.4-DP1-CriticalRisk &nbsp;·&nbsp; one of ten storyboard screens</p>
          <dl>
            <dt>Layout</dt>
            <dd>
              A LAYER, not a slide. Base dims to Ink at 85% over 300ms, no other motion. 2px Crimson{" "}
              <span className="f15-mono">#9E2B2B</span> rule at y=180. &quot;STOP.&quot; display serif 48px
              Paper at x=64 y=216.
            </dd>
            <dt>Audio</dt>
            <dd>One low sub-bass note, −26 LUFS, once, no tail. No voice — the absence of a narrator is more serious than a narrator.</dd>
            <dt>Dev notes</dt>
            <dd>
              Set three layer properties explicitly, because the defaults are wrong. On exit, apply the
              chosen option&rsquo;s authored Safety cost — &minus;20 here, &minus;25 at DP4 — and clamp to
              0&ndash;100. An earlier draft set{" "}
              <span className="f15-mono">varSafetyScore</span> to a flat 60 instead, which meant a learner
              who arrived already below 60 gained points for committing the violation. A gate that can
              raise your score is not a gate. The re-trap that the flat value was there to prevent is
              handled by a guard, not by the number &mdash;{" "}
              <span className="f15-mono">varFloorFired</span> for the accumulation floor,{" "}
              <span className="f15-mono">varRedecidedHere</span> for the gate itself. Keeping those
              separate from <span className="f15-mono">varRemediationFlag</span> matters: the flag is
              the record and has to survive a retry, so a guard sharing it would stop firing on every
              attempt after the first.
            </dd>
            <dt>A11y</dt>
            <dd>The crimson rule is decorative; the word STOP. carries the meaning. Dismissible only via Continue; Escape must not close it.</dd>
          </dl>
        </div>
      </Section>

      <Section id="next" tone="paper" number="04" eyebrow="What I&apos;d Do Next" title="Three honest next steps.">
        <dl className="f15-spec">
          <div className="f15-spec-row">
            <dt>Test</dt>
            <dd>Whether ninety-second triage survives real use. Five think-aloud sessions with associates inside their first three weeks, at a real station, before the shift.</dd>
          </div>
          <div className="f15-spec-row">
            <dt>Improve</dt>
            <dd>Decision four is the weakest branch. Access notes vary too much by station for one scenario to carry — replace the single note with a pool of three, swapped by a random variable.</dd>
          </div>
          <div className="f15-spec-row">
            <dt>Scale</dt>
            <dd>The dashboard, the three-dimension scoring, the remediation pattern and the debrief are a reusable shell. Swap the content layer and it&apos;s a warehouse shift start, a clinic opening, a field-service morning.</dd>
          </div>
        </dl>
        <p className="f15-pull">
          The instructional model was the hard part. The tooling wasn&apos;t. What I&apos;d want a hiring
          manager to take from this is that I can be handed a messy operational problem, find the
          actual performance gap inside it, build a model simple enough to fit on a wallet card — and
          tell you plainly which parts still need testing.
        </p>
      </Section>

      <section className="f15-close" aria-label="Accessibility statement and contact">
        <div className="f15-wrap">
          <p className="f15-close-a11y">
            <strong>Accessibility</strong>
            Designed to WCAG 2.1 AA. Contrast verified for every colour pair, all interactions
            keyboard-operable with a visible focus indicator, nothing conveyed by colour alone,
            narration captioned and available as a transcript, no timed interactions. Tested
            keyboard-only and with NVDA and VoiceOver.
          </p>
          <p className="f15-contact-line">Designing learning that holds up under real conditions.</p>
          <p className="f15-close-sub">
            Available for learning experience design and instructional design roles.
          </p>
          <p className="f15-close-nav">
            <a href="/work">← All work</a>
          </p>
        </div>
      </section>
    </article>
  );
}
