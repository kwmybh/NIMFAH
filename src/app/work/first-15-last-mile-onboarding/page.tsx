import type { Metadata } from "next";
import "../../first15.css";

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

// Narrative section shell. "dark" is the ink ground; "paper" is the ivory band, where gold
// and secondary text switch to their light-surface tokens (see first15.css).
function Section({ id, tone, number, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className={`f15-section f15-section-${tone}`}>
      <div className="f15-wrap">
        <div className="f15-sec-head">
          <span className="f15-sec-n">{number}</span>
          <span className="f15-eyebrow">{eyebrow}</span>
        </div>
        <h2>{title}</h2>
        <div className="f15-prose">{children}</div>
      </div>
    </section>
  );
}

export default function FirstFifteenLastMileOnboarding() {
  return (
    <main className="f15">
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
            A scenario-based onboarding experience for last-mile delivery professionals — designed,
            art-directed, and built end to end.
          </p>
          <p className="f15-summary">
            <b>First 15</b>{" "}
            is a blended onboarding experience designed for newly hired delivery
            associates and dispatch coordinators at MileOne Logistics, a realistic fictional carrier
            created for this project. A Rise&nbsp;360 course teaches a three-part decision model; an
            8–12 minute Storyline&nbsp;360 branching scenario puts it under pressure. Learners triage
            a tire-pressure alert, a damaged label, a medical delivery window, and an unsafe access
            note — then see how their choices moved <b>Safety</b>, <b>Service</b>, and <b>Time</b>.
          </p>

          <div className="f15-ctas">
            <a className="f15-cta f15-cta-1" href="#build">
              <strong>View the Prototype →</strong>
              <em>Play the branching scenario. 8–12 minutes, no login, sound optional.</em>
            </a>
            <a className="f15-cta f15-cta-2" href="/first-15/learning-design-document.pdf">
              <strong>Download the Design Document ↓</strong>
              <em>23-page PDF: brief, objectives, architecture, and measurement plan.</em>
            </a>
            <a className="f15-cta f15-cta-3" href="/first-15/production-storyboard.xlsx">
              <strong>Explore the Storyboard →</strong>
              <em>Ten annotated production screens.</em>
            </a>
          </div>
          <p className="f15-cta-note">
            The design document and storyboard are live downloads. The prototype is in build — the
            scenario blueprint and the annotated storyboard show how it works in the meantime.
          </p>
        </div>
      </section>

      <section className="f15-facts" aria-label="Project facts">
        <div className="f15-wrap">
          <dl className="f15-factgrid">
            <div className="f15-fact f15-fact-wide">
              <dt>Role</dt>
              <dd>Sole designer and developer. Discovery framing, audience definition, learning objectives, instructional strategy, branching architecture, storyboard, interaction design, visual direction, Rise 360 and Storyline 360 development, accessibility specification, and measurement plan.</dd>
            </div>
            <div className="f15-fact">
              <dt>Project type</dt>
              <dd>Self-directed portfolio project · scenario-based onboarding · fictional client brief</dd>
            </div>
            <div className="f15-fact">
              <dt>Client</dt>
              <dd>MileOne Logistics — a realistic fictional last-mile carrier created to demonstrate end-to-end learning design</dd>
            </div>
            <div className="f15-fact">
              <dt>Tools</dt>
              <dd>Articulate Storyline 360 · Rise 360 · Review 360 · Figma · Adobe Illustrator · Adobe Photoshop · Adobe Audition · Claude (content structuring, dialogue drafting, QA pass scripting) · Colour Contrast Analyser · NVDA and VoiceOver</dd>
            </div>
            <div className="f15-fact">
              <dt>Audience</dt>
              <dd>Newly hired last-mile delivery associates (days 1–14) and newly promoted dispatch coordinators</dd>
            </div>
            <div className="f15-fact">
              <dt>Duration</dt>
              <dd>37–48 minutes total (typically ~45) · Rise 19–24 min · Storyline 8–12 min · Rise field guide 10–12 min</dd>
            </div>
            <div className="f15-fact">
              <dt>Modality</dt>
              <dd>Self-paced blended eLearning — mobile-responsive Rise 360 for concepts and transfer, desktop-and-tablet Storyline 360 for the branching performance assessment, with a printable job aid and a manager coaching guide for on-the-job reinforcement</dd>
            </div>
            <div className="f15-fact">
              <dt>Standards</dt>
              <dd>WCAG 2.1 AA-aligned · SCORM 1.2 and SCORM 2004 4th Edition publish profiles · optional xAPI decision-path statements</dd>
            </div>
          </dl>
        </div>
      </section>

      <Section id="challenge" tone="dark" number="01" eyebrow="The Challenge" title="The gap isn&apos;t knowledge. It&apos;s deciding.">
          <p>A last-mile delivery operation loses more service and safety ground in the first fifteen minutes of a shift than in the eight hours that follow. That window is where an associate finds the tire-pressure alert, the label they cannot read, the medical delivery with a receiving window, and the dispatch note that today&apos;s volume is heavier than planned. It is also the window where a new hire has the least context and the most pressure to simply leave.</p>
          <p>Conventional onboarding is badly matched to this. It front-loads policy — handbooks, compliance modules, a checklist to acknowledge — and then sends a nine-day-old associate into a morning that demands judgment, prioritisation, and the confidence to interrupt a dispatcher. The gap is not knowledge. Most new associates can recite the pre-shift checklist. The gap is <b>decision-making under competing pressure</b>, which is the one thing a checklist cannot teach and a knowledge check cannot measure.</p>
          <p>So the design problem was not &quot;build a pre-shift course.&quot; It was: <em>how do you let someone practise the first fifteen minutes of a bad morning forty times before it counts?</em></p>
      </Section>

      <Section id="context" tone="paper" number="02" eyebrow="The Learner and Business Context" title="Two people share the same fifteen minutes from opposite sides of a radio.">
          <p>MileOne Logistics is a realistic fictional regional carrier: contracted parcel volume plus a growing medical-courier line, operating out of a set of metro stations with a mixed fleet of cargo vans. Like the real operations it is modelled on, it runs with high seasonal hiring, a compressed training window, and dispatch coordinators who are often promoted from the driver&apos;s seat with no training in how to coordinate.</p>
          <p>Two audiences share the same fifteen minutes from opposite sides of the radio. The delivery associate is capable and motivated but overwhelmed — by the handheld, the route sequence, the safety procedure, the customer notes, and the unfamiliar question of when it is acceptable to interrupt someone. The dispatch coordinator is six weeks into a promotion, holding fourteen routes, and has learned that vague escalations cost them their whole morning.</p>
          <p>Designing for both at once was the decision that shaped the course. The escalation criteria are not a driver policy — they are a <b>shared contract</b>. Associates learn what a complete escalation contains; coordinators learn to ask for the same four fields. When both sides of a radio call are trained on the same model, the model survives contact with the operation.</p>
      </Section>

      <Section id="role" tone="dark" number="03" eyebrow="My Design Role" title="Sole practitioner, end to end.">
          <p>I worked this as a sole practitioner engagement, the way a contract LXD is typically hired: given a performance problem and a delivery deadline, and expected to return a working experience.</p>
          <p>That meant framing the business problem and writing the brief; defining the two personas and the performance gap; writing measurable objectives and mapping every one to an interaction and a piece of assessment evidence; choosing the modality split and defending it; architecting the branching scenario with its variables, thresholds, and remediation logic; storyboarding to developer-handoff standard; art-directing the visual system, including a palette validated for contrast rather than chosen by eye; building in Rise 360 and Storyline 360; specifying the accessibility requirements and the test workflow; and writing the measurement plan that a client would use to decide whether the thing worked.</p>
          <p>I also used AI deliberately and narrowly — for first-pass dialogue variants, for structuring the objective-to-evidence matrix, and for scripting a repetitive QA pass across slide states. The design decisions, the instructional model, and the writing voice are mine. It is worth being precise about that distinction, because &quot;AI-enabled workflow&quot; is only a credential if you can say where the judgment lived.</p>
      </Section>

      <Section id="model" tone="paper" number="04" eyebrow="Learning Goals and Instructional Strategy" title="Three dispositions, never two.">
          <p>The experience is designed to target four performance behaviours, not four topics: triage a pre-shift discovery into Fix, Flag, or Note within ninety seconds; apply the four escalation triggers to decide whether an issue needs someone else; compose an escalation message complete enough to be acted on without a follow-up question; and sequence a route so that time-sensitive and custody-controlled deliveries are protected before volume is absorbed.</p>
          <p>Success is defined at two levels. Inside the experience, a learner completes by holding Safety at or above 80, Service at or above 70, and rolling out inside the fifteen-minute window — a combination that is reachable only by resolving the safety gate, escalating the two genuine triggers, and declining to escalate the two that are noise. Outside the experience, the proposed measurement plan would track escalation completeness, pre-shift window duration, and the rate of avoidable first-attempt service failures in the first thirty days on route.</p>
          <p>To be explicit: those operational figures are the measures I would instrument in a live implementation. This project reports no operational results, because it has no operation.</p>
          <h3>Instructional Strategy</h3>
          <p>The strategy rests on four choices.</p>
          <p><b>Scenario-based practice as the assessment, not the dessert.</b> The branching scenario is not a reward for finishing the module; it <em>is</em> the assessment. Every decision point is built as a scored Storyline question with points assigned per choice, so the LMS receives a defensible score while the learner experiences a story.</p>
          <p><b>Consequence before correction.</b> Choose to top up the tire and go, and the coaching does not appear immediately — the pressure warning returns at stop nine, on a bridge approach, and <em>then</em> the station lead talks to you. Adults revise a mental model when the model visibly fails, not when they are told it is wrong. Delayed, causal consequence is the single highest-leverage instructional decision in the build.</p>
          <p><b>Three dispositions instead of two.</b> Fix, Flag, Note gives learners a middle path, which is where most real pre-shift discoveries actually belong. This directly targets the observed failure mode of both over- and under-escalation.</p>
          <p><b>Cognitive load managed by tool.</b> Concepts, criteria, and worked examples live in Rise, where a learner can read at their own pace on a phone, re-open a labelled graphic, and stop. Judgment under pressure lives in Storyline, where state can be tracked and consequence can be staged. Nothing is taught twice, and nothing is assessed where it was taught.</p>
      </Section>

      <Section id="build" tone="dark" number="05" eyebrow="Storyline 360 Build Highlights" title="A state machine wearing a story.">
          <p>The scenario is a state machine wearing a story. Four numeric and eight supporting variables track Safety, Service, and the remaining time budget, plus the learner&apos;s choice at each decision point, the count of escalations raised, a remediation flag, and a concatenated path string such as <span className="f15-mono">1B-2A-3C-4A</span>. Thirty-eight slides across seven scenes.</p>
          <p>A few constructions a developer will recognise as the real work:</p>
          <ul>
            <li><b>A hub-and-spoke shift-start dashboard</b> with four inspectable cards. The &quot;Roll out&quot; control is disabled until all four have a Visited state, which enforces a complete pre-shift review without a single instruction telling the learner to look at everything.</li>
            <li><b>Points assigned per choice</b> on graded Pick One questions, so a native results slide produces a defensible LMS score while the custom Safety, Service, and Time variables drive the coaching.</li>
            <li><b>A safety floor rather than a wrong-answer trap.</b> When Safety drops to 55 or below, a Critical Risk layer interrupts, a two-screen micro-lesson runs, and the learner re-decides that point with a remediation flag set — so the LMS can distinguish &quot;got it right&quot; from &quot;got there on the second pass.&quot;</li>
            <li><b>A three-dimension debrief</b> that replays the learner&apos;s path and shows how each choice moved each dimension, followed by pattern-specific feedback. A learner who was fast and exposed gets different coaching from one who was careful and costly — because those two people need opposite advice.</li>
            <li><b>A learner-controlled motion and audio preference set on screen two</b>, stored in variables that suppress animation and narration for the rest of the experience.</li>
          </ul>
      </Section>

      <Section id="rise" tone="paper" number="06" eyebrow="Rise 360 Companion Experience" title="Rise reflows. Storyline scales. That&apos;s the whole argument.">
          <p>Rise carries two jobs that Storyline is genuinely worse at.</p>
          <p>Before the scenario, <em>Prepare for the Shift</em> teaches the decision model in six short lessons using blocks chosen for instructional reason: a labelled graphic over a photographed van bay for the pre-shift inspection zones, because spatial knowledge should be learned spatially; a sorting activity that forces learners to place eight real discoveries into Fix, Flag, and Note, because the model is only learned when it is applied to ambiguous cases; flashcards for the four escalation triggers, because that is genuinely recall; and a Rise scenario block for one short escalation conversation, as a low-stakes rehearsal before the high-stakes one.</p>
          <p>After the scenario, <em>Field Guide and Transfer Toolkit</em> is built to be re-opened on a phone in a van at 6:55 a.m. — which is why it is Rise and not a PDF. It holds the one-page decision guide as a downloadable attachment, the escalation message template, a short reflection prompt, and a manager coaching guide with five questions a supervisor can ask in a four-minute ride-along conversation.</p>
          <p>The tool choice is the argument: Rise reflows for mobile and Storyline scales. The reading a learner does on a phone belongs in Rise. The branching state a learner generates belongs in Storyline.</p>
      </Section>

      <Section id="assessment" tone="dark" number="07" eyebrow="Assessment and Feedback Design" title="Name the consequence before naming the rule.">
          <p>Assessment is designed to evaluate judgment, which means no item in this experience can be answered by remembering a sentence from a previous screen.</p>
          <p>A short confidence check opens the scenario — five slider items on how sure the learner is about specific decisions — and repeats at the end, so the debrief can show a confidence shift alongside a performance score. Rise carries four embedded knowledge checks on the criteria themselves. The Storyline scenario carries the performance assessment: four decision points, points assigned by choice, 80% to pass.</p>
          <p>Feedback follows one rule throughout — <b>name the consequence before naming the rule.</b> Not &quot;Incorrect. Safety issues must be escalated,&quot; but &quot;You made your first eleven stops. On the twelfth, the pressure warning came back on a bridge approach, and you spent forty minutes on the shoulder waiting for roadside. A nineteen-psi overnight drop is a leak, not the weather. That made it a Flag.&quot;</p>
          <p>Every distractor is a real mistake a reasonable person makes under pressure, and the feedback for each addresses the specific reasoning behind it rather than restating policy.</p>
      </Section>

      <Section id="system" tone="paper" number="08" eyebrow="Experience Design and Visual Direction" title="Operational software doesn&apos;t have to look like operational software.">
          <p>The visual system is a deliberate argument: <b>operational software does not have to look like operational software.</b> The reference points are architectural photography, Japanese spatial restraint, and editorial fashion layout — a near-black ground, generous negative space, ivory content surfaces that behave like paper, a single burnished gold accent used structurally rather than decoratively, and one restrained indigo reserved exclusively for things the learner can act on.</p>
          <p>That last rule does most of the work. In this system, <b>indigo means &quot;you can touch this.&quot;</b> Gold means &quot;this is a structural or evaluative element&quot; — a rule, a meter, a scene marker. Because the interaction colour is reserved and never used for emphasis, a learner never has to hunt for what is clickable, and a keyboard user never has to guess where focus is.</p>
          <p>The interface avoids the two clichés of the genre. There is no cartoon office and no stock-photo handshake: imagery is treated as documentary, high-contrast, and cropped tight on the real objects of the work — a tote seal, a pressure gauge, a handheld screen, a route sequence. And there are no gradients, no glassmorphism, and no animation that exists to prove animation is possible. Motion is used for exactly three jobs: to show state changing, to direct attention to a consequence, and to transition between scenes.</p>
          <p>Every colour pair in the system was checked with a contrast calculator rather than an eye. Three of my first-pass tokens failed WCAG AA and were replaced — the burnished gold in particular is beautiful on charcoal at 5.66:1 and illegible on ivory at 2.83:1, so a darkened variant carries any gold that has to appear as text on a light surface. The published palette in the design document lists the measured ratio for every pair.</p>
      </Section>

      <Section id="access" tone="dark" number="09" eyebrow="Accessibility and Inclusive Design" title="Designed in, then tested. Not retrofitted.">
          <p>Accessibility shaped the design rather than auditing it. The concrete consequences: no real-time timers anywhere in the experience, so the pressure is narrative and a learner using assistive technology is not penalised for reading speed; every status communicated by an icon and a word as well as a colour, so the Safety, Service, and Time meters never depend on hue; a focus indicator built as an ivory ring with a dark inner stroke so that it is visible on charcoal, ivory, and indigo alike; focus order set explicitly on every Storyline slide, with decorative art marked decorative so a screen-reader user hears the decision, not the background; captions and a downloadable transcript for all narration; and a reduced-motion preference the learner sets before the story starts.</p>
          <p>Inclusive representation was specified, not assumed: the cast spans age, gender, body type, ethnicity, and visible assistive equipment, and no character&apos;s competence correlates with their identity. The dispatcher who handles escalations best is the newest coordinator in the building.</p>
          <p>The plan and the test workflow — keyboard-only pass, NVDA on Chrome, VoiceOver on iOS Safari, 200% text zoom, contrast verification of every pair — are documented in full in the design document.</p>
      </Section>

      <Section id="measure" tone="paper" number="10" eyebrow="Measurement Plan" title="The cheapest instrument is the one that improves the course.">
          <p>The proposed measurement plan works across four levels, mapped loosely to Kirkpatrick because that is the language most L&amp;D stakeholders share.</p>
          <p>At the reaction level, it would track completion, time in module, drop-off point, and a two-question relevance rating. At the learning level, the pre-and-post confidence shift, the Storyline performance score, and — the most useful artefact in the whole plan — the <b>decision-path distribution</b>. Because the scenario records a path string for every learner, the plan would surface which specific distractor the cohort selects most often. That is a curriculum instrument, not a report: if 60% of learners top up the tire and drive, the gap is in how Lesson 3 teaches the difference between a leak and a temperature variance, and the fix is one Rise screen.</p>
          <p>At the behaviour level, it would use a manager observation checklist during the first ride-along and sample escalation messages for completeness against the four fields. At the results level, it would propose watching pre-shift window duration, avoidable first-attempt failures, and preventable roadside events across the first thirty days on route.</p>
          <p>Every measure in that plan is a proposed measure. In a live implementation, I would validate the baseline before promising a delta — and I would expect the first version of the escalation-completeness rubric to need revision after twenty real messages.</p>
      </Section>

      <Section id="storyboard" tone="dark" number="11" eyebrow="The Storyboard" title="Ten screens, to developer-handoff standard.">
          <p>Each screen carries purpose, visual layout with coordinates, exact on-screen copy, narration direction, interaction behaviour, developer notes, accessibility and alt-text notes, and design rationale. A separate eLearning developer could build the prototype from it without a conversation.</p>
          <div className="f15-sb">
            <p className="f15-sb-id">SB-06 &nbsp;·&nbsp; S3.4-DP1-CriticalRisk &nbsp;·&nbsp; Scene 3</p>
            <dl>
              <dt>Purpose</dt>
              <dd>Interrupt a decision that would have ended the shift. The only immediate consequence in the build.</dd>
              <dt>Layout</dt>
              <dd>A LAYER, not a slide. Base dims to Ink at 85% over 300ms, no other motion. 2px Crimson <span className="f15-mono">#9E2B2B</span> rule at y=180. &quot;STOP.&quot; display serif 48px Paper at x=64 y=216. Body 20px Ivory, max width 760px.</dd>
              <dt>Copy</dt>
              <dd className="f15-sb-copy">STOP. A tire 19 psi under spec, on the rear axle of a loaded van, carrying 96 stops. Under-inflated tires run hot. A hot tire on a loaded rear axle is how a blowout happens, and a rear blowout in a cargo van is how you lose the vehicle. This isn&apos;t a service decision or a time decision. Safety is a gate, not a trade-off.</dd>
              <dt>Audio</dt>
              <dd>One low sub-bass note, −26 LUFS, once, no tail. No voice — the absence of a narrator is more serious than a narrator.</dd>
              <dt>Dev notes</dt>
              <dd>Set three layer properties explicitly, because the defaults are wrong: prevent clicking the base layer, hide other slide layers, pause the base timeline. Set focus to the layer on show. Restore <span className="f15-mono">varSafetyScore</span> to 60 at the end of the micro-lesson — above the floor of 55, below the 80 threshold. Without it, re-deciding with option B lands at 50 and re-trips forever.</dd>
              <dt>A11y</dt>
              <dd>The crimson rule is decorative; the word STOP. carries the meaning. Focus order: STOP., body, closing statement, Continue last. Dismissible only via Continue; Escape must not close it.</dd>
              <dt>Rationale</dt>
              <dd>Every other consequence is delayed on purpose, because delayed causal feedback revises a mental model. This one is immediate, because an interrupt is the correct form for a categorical violation — and delaying it would imply the gate is negotiable.</dd>
            </dl>
          </div>
          <p>One of ten. The full storyboard ships as a workbook with tabs for the scoring matrix, the variable list, trigger sets in execution order, a gotchas sheet naming six bugs already found in this design, and a 60-item QA checklist.</p>
      </Section>

      <Section id="next" tone="paper" number="12" eyebrow="What I Would Test, Improve, and Scale" title="Three honest next steps.">
          <p><b>What I would test first.</b> Whether the ninety-second triage claim survives real use. The framework is designed around a time box, and if new associates cannot actually reach a disposition in ninety seconds on a cold February morning, the framework needs a fourth disposition or a simpler trigger set. I would run five think-aloud sessions with associates inside their first three weeks, at a real station, before the shift.</p>
          <p><b>What I would improve.</b> The fourth decision point is the weakest link in the current branch. Customer access notes vary enormously by station and by contract, and one scenario cannot carry that variance. In a live build, I would replace the single note with a small pool of three swapped in by a random variable, so a second attempt is not a memory test.</p>
          <p><b>What I would scale.</b> The architecture generalises: the dashboard, the three-dimension scoring, the remediation pattern, and the debrief are a reusable shell. Swapping the content layer produces a first-fifteen-minutes experience for a warehouse shift start, a clinic opening, or a field-service morning, at a fraction of the original build cost. That reusability is the thing I would actually pitch to a director of L&amp;D: not this course, but the pattern and the production system behind it.</p>
      </Section>

      <Section id="reflection" tone="dark" number="13" eyebrow="Final Reflection" title="The model was the hard part. The tooling wasn&apos;t.">
          <p>The most useful thing I learned building this is that the instructional model was the hard part, and the tooling was not. My first version of the decision framework had two dispositions — handle it or escalate it — and it produced a scenario where every correct answer was &quot;escalate,&quot; which is both useless as training and untrue to the job. Adding &quot;Note&quot; as a third disposition fixed the instruction, the branching, and the scoring in one move, because it created a middle path where most real pre-shift discoveries actually live.</p>
          <p>The second thing: designing the accessibility requirements first made the experience better for everyone. Removing the real-time timer, which I added early because pressure felt authentic, forced me to create pressure through consequence instead — and consequence is what teaches. The constraint improved the design.</p>
          <p>What I would want a hiring manager to take from this project is not that I can operate Storyline. It is that I can be handed a messy operational problem, find the actual performance gap inside it, build a model simple enough to fit on a wallet card, and then produce something learners will finish and managers will reinforce — and that I will tell you plainly which parts of it still need to be tested.</p>
      </Section>
    </main>
  );
}
