# First 15 — Case Study Page Copy

Source of truth for the page copy at `nimfah.com/work/first-15-last-mile-onboarding`.
Extracted from the full project package. Every string below is final text, not direction —
port it verbatim.

**Visual system tokens** (verified WCAG ratios; do not substitute by eye)

| Token | Hex | Notes |
|---|---|---|
| ink | `#14161A` | page ground |
| slate | `#1F232A` | raised surface |
| graphite | `#2A2F37` | card surface |
| hairline-dark | `#3A4048` | decorative only |
| ivory | `#F4F1EA` | light content surface |
| paper | `#FBFAF7` | elevated card |
| bone | `#E7E2D7` | inset band |
| hairline-light | `#D8D3C8` | decorative only |
| gold | `#B8873B` | dark surfaces ONLY — 2.83:1 on ivory, fails |
| gold-light | `#D9A84E` | small labels on dark |
| gold-deep | `#775418` | the only gold allowed as text on light |
| indigo | `#2F4B8F` | reserved: interactive elements only |
| indigo-light | `#8FA9E6` | links on dark |
| silver | `#A8AEB5` | secondary text on dark |
| mid | `#5F646A` | secondary text on light |

**Type, as built on nimfah.com:** Bodoni Moda (display, never below 28px — high-contrast didone
serifs lose their thin strokes at small sizes) · **Bricolage Grotesque** (UI and body, 18px min —
the site's existing single typeface, used here instead of Inter so the page stays continuous with
the rest of nimfah.com) · IBM Plex Mono (data, tabular figures at 400 and 500).

*The original spec named Inter for UI. Substituting Bricolage is a deliberate decision recorded
here so it doesn't get "corrected" back later.*

**Two rules that govern the build:** indigo appears on interactive elements and nowhere else.
Gold is never text on a light surface.

---

# 2. Portfolio case study page copy

Ready-to-publish copy for nimfah.com. Everything in this section is final text, not direction.

## 2.1 Page metadata

**SEO page title** (64 characters)
`First 15: Scenario-Based Delivery Onboarding | Kwame Yeboah, LXD`

**Meta description** (157 characters)
`A blended Rise 360 and Storyline 360 experience that trains last-mile delivery associates to make safe, service-protecting decisions in the first 15 minutes.`

**URL slug recommendation**
`nimfah.com/work/first-15-last-mile-onboarding`

Rationale: keeps the project name (memorable, quotable in a cover letter), adds the two search terms a
recruiter or L&D lead would actually type (`last-mile`, `onboarding`), and stays short enough to paste
into a LinkedIn message without wrapping. Secondary option if the site uses a flatter structure:
`nimfah.com/first-15`. Set the long slug as canonical and 301 the short one to it, so both work in
conversation.

**Open Graph title** · `First 15 — the first fifteen minutes decide the whole shift`
**Open Graph description** · `A scenario-based onboarding experience for last-mile delivery professionals. Rise 360 + Storyline 360. Design, build, and measurement plan by Kwame Yeboah.`
**Schema.org type** · `CreativeWork` nested in `Person` → `hasCredential` omitted, `author` set to Kwame Yeboah

## 2.2 Hero block

**Eyebrow label** (uppercase, letter-spaced, gold-light)
> Learning Experience Design · Scenario-based onboarding

**Hero headline**
> The first fifteen minutes decide the whole shift.

**Portfolio subtitle**
> A scenario-based onboarding experience for last-mile delivery professionals — designed, art-directed,
> and built end to end.

**Project summary** (74 words)
> First 15 is a blended onboarding experience designed for newly hired delivery associates and dispatch
> coordinators at MileOne Logistics, a realistic fictional carrier created for this project. A Rise 360
> course teaches a three-part decision model; an 8–12 minute Storyline 360 branching scenario puts it
> under pressure. Learners triage a tire-pressure alert, a damaged label, a medical delivery window,
> and an unsafe access note — then see how their choices moved Safety, Service, and Time.

## 2.3 Project facts panel

**Display labels — use these on the page, not the field names below.** A tracked, uppercase
label is a signpost, not a sentence; "Estimated course duration" reads as a form field.

| Field in this table | Label on the page |
|---|---|
| Role and contribution | `ROLE` |
| Project type | `PROJECT TYPE` |
| Client | `CLIENT` |
| Tools used | `TOOLS` |
| Intended audience | `AUDIENCE` |
| Estimated course duration | `DURATION` |
| Learning modality | `MODALITY` |
| Standards | `STANDARDS` |


| Field | Value |
|---|---|
| **Role and contribution** | Sole designer and developer. Discovery framing, audience definition, learning objectives, instructional strategy, branching architecture, storyboard, interaction design, visual direction, Rise 360 and Storyline 360 development, accessibility specification, and measurement plan. |
| **Project type** | Self-directed portfolio project · scenario-based onboarding · fictional client brief |
| **Client** | MileOne Logistics — a realistic fictional last-mile carrier created to demonstrate end-to-end learning design |
| **Tools used** | Articulate Storyline 360 · Rise 360 · Review 360 · Figma · Adobe Illustrator · Adobe Photoshop · Adobe Audition · Claude (content structuring, dialogue drafting, QA pass scripting) · Colour Contrast Analyser · NVDA and VoiceOver |
| **Intended audience** | Newly hired last-mile delivery associates (days 1–14) and newly promoted dispatch coordinators |
| **Estimated course duration** | 37–48 minutes total (typically ~45) · Rise 19–24 min · Storyline 8–12 min · Rise field guide 10–12 min |
| **Learning modality** | Self-paced blended eLearning — mobile-responsive Rise 360 for concepts and transfer, desktop-and-tablet Storyline 360 for the branching performance assessment, with a printable job aid and a manager coaching guide for on-the-job reinforcement |
| **Standards** | WCAG 2.1 AA-aligned · SCORM 1.2 and SCORM 2004 4th Edition publish profiles · optional xAPI decision-path statements |

## 2.4 Calls to action

Three primary CTAs, in this order and with this hierarchy. The prototype is the reason anyone is on
the page; it gets the solid button.

**Primary — solid indigo button**
> **View the Prototype →**
> *Play the branching scenario. 8–12 minutes, no login, sound optional.*

**Secondary — outlined button**
> **Download the Design Document ↓**
> *23-page PDF: brief, objectives, architecture, and measurement plan.*

**Tertiary — text link, no rule**
> **Explore the Storyboard →**
> *Ten annotated production screens.*

**Note under the CTAs, for the live page while the prototype is in build:**
> The design document and storyboard are live downloads. The prototype is in build — the
> scenario blueprint and the annotated storyboard show how it works in the meantime.

Microcopy principle: every CTA states what happens next and what it costs the visitor in time or
attention. A recruiter with four minutes will click a button that promises eight minutes; they will
not click "Learn more." Say "in build" rather than "coming soon" — one is a status, the other is
a promise.

## 2.5 The narrative case study

### 1. The Challenge

A last-mile delivery operation loses more service and safety ground in the first fifteen minutes of a
shift than in the eight hours that follow. That window is where an associate finds the tire-pressure
alert, the label they cannot read, the medical delivery with a receiving window, and the dispatch note
that today's volume is heavier than planned. It is also the window where a new hire has the least
context and the most pressure to simply leave.

Conventional onboarding is badly matched to this. It front-loads policy — handbooks, compliance
modules, a checklist to acknowledge — and then sends a nine-day-old associate into a morning that
demands judgment, prioritisation, and the confidence to interrupt a dispatcher. The gap is not
knowledge. Most new associates can recite the pre-shift checklist. The gap is **decision-making under
competing pressure**, which is the one thing a checklist cannot teach and a knowledge check cannot
measure.

So the design problem was not "build a pre-shift course." It was: *how do you let someone practise
the first fifteen minutes of a bad morning forty times before it counts?*

### 2. The Learner and Business Context

MileOne Logistics is a realistic fictional regional carrier: contracted parcel volume plus a growing
medical-courier line, operating out of a set of metro stations with a mixed fleet of cargo vans. Like
the real operations it is modelled on, it runs with high seasonal hiring, a compressed training
window, and dispatch coordinators who are often promoted from the driver's seat with no training in
how to coordinate.

Two audiences share the same fifteen minutes from opposite sides of the radio. The delivery associate
is capable and motivated but overwhelmed — by the handheld, the route sequence, the safety procedure,
the customer notes, and the unfamiliar question of when it is acceptable to interrupt someone. The
dispatch coordinator is six weeks into a promotion, holding fourteen routes, and has learned that
vague escalations cost them their whole morning.

Designing for both at once was the decision that shaped the course. The escalation criteria are not a
driver policy — they are a **shared contract**. Associates learn what a complete escalation contains;
coordinators learn to ask for the same four fields. When both sides of a radio call are trained on the
same model, the model survives contact with the operation.

### 3. My Design Role

I worked this as a sole practitioner engagement, the way a contract LXD is typically hired: given a
performance problem and a delivery deadline, and expected to return a working experience.

That meant framing the business problem and writing the brief; defining the two personas and the
performance gap; writing measurable objectives and mapping every one to an interaction and a piece of
assessment evidence; choosing the modality split and defending it; architecting the branching scenario
with its variables, thresholds, and remediation logic; storyboarding to developer-handoff standard;
art-directing the visual system, including a palette validated for contrast rather than chosen by eye;
building in Rise 360 and Storyline 360; specifying the accessibility requirements and the test
workflow; and writing the measurement plan that a client would use to decide whether the thing worked.

I also used AI deliberately and narrowly — for first-pass dialogue variants, for structuring the
objective-to-evidence matrix, and for scripting a repetitive QA pass across slide states. The design
decisions, the instructional model, and the writing voice are mine. It is worth being precise about
that distinction, because "AI-enabled workflow" is only a credential if you can say where the judgment
lived.

### 4. Learning Goals and Success Measures

The experience is designed to target four performance behaviours, not four topics: triage a pre-shift
discovery into Fix, Flag, or Note within ninety seconds; apply the four escalation triggers to decide
whether an issue needs someone else; compose an escalation message complete enough to be acted on
without a follow-up question; and sequence a route so that time-sensitive and custody-controlled
deliveries are protected before volume is absorbed.

Success is defined at two levels. Inside the experience, a learner completes by holding Safety at or
above 80, Service at or above 70, and rolling out inside the fifteen-minute window — a combination
that is reachable only by resolving the safety gate, escalating the two genuine triggers, and
declining to escalate the two that are noise. Outside the experience, the proposed measurement plan
would track escalation completeness, pre-shift window duration, and the rate of avoidable
first-attempt service failures in the first thirty days on route.

To be explicit: those operational figures are the measures I would instrument in a live
implementation. This project reports no operational results, because it has no operation.

### 5. Instructional Strategy

The strategy rests on four choices.

**Scenario-based practice as the assessment, not the dessert.** The branching scenario is not a reward
for finishing the module; it *is* the assessment. Every decision point is built as a scored Storyline
question with points assigned per choice, so the LMS receives a defensible score while the learner
experiences a story.

**Consequence before correction.** Choose to top up the tire and go, and the coaching does not appear
immediately — the pressure warning returns at stop nine, on a bridge approach, and *then* the station
lead talks to you. Adults revise a mental model when the model visibly fails, not when they are told
it is wrong. Delayed, causal consequence is the single highest-leverage instructional decision in the
build.

**Three dispositions instead of two.** Fix, Flag, Note gives learners a middle path, which is where
most real pre-shift discoveries actually belong. This directly targets the observed failure mode of
both over- and under-escalation.

**Cognitive load managed by tool.** Concepts, criteria, and worked examples live in Rise, where a
learner can read at their own pace on a phone, re-open a labelled graphic, and stop. Judgment under
pressure lives in Storyline, where state can be tracked and consequence can be staged. Nothing is
taught twice, and nothing is assessed where it was taught.

### 6. Experience Design and Visual Direction

The visual system is a deliberate argument: **operational software does not have to look like
operational software.** The reference points are architectural photography, Japanese spatial restraint,
and editorial fashion layout — a near-black ground, generous negative space, ivory content surfaces
that behave like paper, a single burnished gold accent used structurally rather than decoratively, and
one restrained indigo reserved exclusively for things the learner can act on.

That last rule does most of the work. In this system, **indigo means "you can touch this."** Gold
means "this is a structural or evaluative element" — a rule, a meter, a scene marker. Because the
interaction colour is reserved and never used for emphasis, a learner never has to hunt for what is
clickable, and a keyboard user never has to guess where focus is.

The interface avoids the two clichés of the genre. There is no cartoon office and no stock-photo
handshake: imagery is treated as documentary, high-contrast, and cropped tight on the real objects of
the work — a tote seal, a pressure gauge, a handheld screen, a route sequence. And there are no
gradients, no glassmorphism, and no animation that exists to prove animation is possible. Motion is
used for exactly three jobs: to show state changing, to direct attention to a consequence, and to
transition between scenes.

Every colour pair in the system was checked with a contrast calculator rather than an eye. Three of my
first-pass tokens failed WCAG AA and were replaced — the burnished gold in particular is beautiful on
charcoal at 5.66:1 and illegible on ivory at 2.83:1, so a darkened variant carries any gold that has
to appear as text on a light surface. The published palette in the design document lists the measured
ratio for every pair.

### 7. Storyline 360 Build Highlights

The scenario is a state machine wearing a story. Four numeric and eight supporting variables track
Safety, Service, and the remaining time budget, plus the learner's choice at each decision point, the
count of escalations raised, a remediation flag, and a concatenated path string such as `1B-2A-3C-4A`.

A few constructions a developer will recognise as the real work:

- **A hub-and-spoke shift-start dashboard** with four inspectable cards. The "Roll out" control is
  disabled until all four have a Visited state, which enforces a complete pre-shift review without a
  single instruction telling the learner to look at everything.
- **Points assigned per choice** on graded Pick One questions, so a native results slide produces a
  defensible LMS score while the custom Safety, Service, and Time variables drive the coaching.
- **A safety floor rather than a wrong-answer trap.** When Safety drops to 55 or below, a Critical
  Risk layer interrupts, a two-screen micro-lesson runs, and the learner re-decides that point with a
  remediation flag set — so the LMS can distinguish "got it right" from "got there on the second pass."
- **A three-dimension debrief** that replays the learner's path and shows how each choice moved each
  dimension, followed by pattern-specific feedback. A learner who was fast and exposed gets different
  coaching from one who was careful and costly — because those two people need opposite advice.
- **A learner-controlled motion and audio preference set on screen two**, stored in variables that
  suppress animation and narration for the rest of the experience.

### 8. Rise 360 Companion Experience

Rise carries two jobs that Storyline is genuinely worse at.

Before the scenario, *Prepare for the Shift* teaches the decision model in six short lessons using
blocks chosen for instructional reason: a labelled graphic over a photographed van bay for the
pre-shift inspection zones, because spatial knowledge should be learned spatially; a sorting activity
that forces learners to place eight real discoveries into Fix, Flag, and Note, because the model is
only learned when it is applied to ambiguous cases; flashcards for the four escalation triggers,
because that is genuinely recall; and a Rise scenario block for one short escalation conversation, as
a low-stakes rehearsal before the high-stakes one.

After the scenario, *Field Guide and Transfer Toolkit* is built to be re-opened on a phone in a van at
6:55 a.m. — which is why it is Rise and not a PDF. It holds the one-page decision guide as a
downloadable attachment, the escalation message template, a short reflection prompt, and a manager
coaching guide with five questions a supervisor can ask in a four-minute ride-along conversation.

The tool choice is the argument: Rise reflows for mobile and Storyline scales. The reading a learner
does on a phone belongs in Rise. The branching state a learner generates belongs in Storyline.

### 9. Assessment and Feedback Design

Assessment is designed to evaluate judgment, which means no item in this experience can be answered
by remembering a sentence from a previous screen.

A short confidence check opens the scenario — five slider items on how sure the learner is about
specific decisions — and repeats at the end, so the debrief can show a confidence shift alongside a
performance score. Rise carries four embedded knowledge checks on the criteria themselves. The
Storyline scenario carries the performance assessment: four decision points, points assigned by
choice, 80% to pass.

Feedback follows one rule throughout — **name the consequence before naming the rule.** Not "Incorrect.
Safety issues must be escalated," but "You made your first eleven stops. On the twelfth, the pressure
warning came back on a bridge approach, and you spent forty minutes on the shoulder waiting for
roadside. A nineteen-psi overnight drop is a leak, not the weather. That made it a Flag."

Every distractor is a real mistake a reasonable person makes under pressure, and the feedback for each
addresses the specific reasoning behind it rather than restating policy.

### 10. Accessibility and Inclusive Design

Accessibility shaped the design rather than auditing it. The concrete consequences: no real-time
timers anywhere in the experience, so the pressure is narrative and a learner using assistive
technology is not penalised for reading speed; every status communicated by an icon and a word as well
as a colour, so the Safety, Service, and Time meters never depend on hue; a focus indicator built as
an ivory ring with a dark inner stroke so that it is visible on charcoal, ivory, and indigo alike;
focus order set explicitly on every Storyline slide, with decorative art marked decorative so a
screen-reader user hears the decision, not the background; captions and a downloadable transcript for
all narration; and a reduced-motion preference the learner sets before the story starts.

Inclusive representation was specified, not assumed: the cast spans age, gender, body type, ethnicity,
and visible assistive equipment, and no character's competence correlates with their identity. The
dispatcher who handles escalations best is the newest coordinator in the building.

The plan and the test workflow — keyboard-only pass, NVDA on Chrome, VoiceOver on iOS Safari, 200%
text zoom, contrast verification of every pair — are documented in full in the design document.

### 11. Measurement Plan

The proposed measurement plan works across four levels, mapped loosely to Kirkpatrick because that is
the language most L&D stakeholders share.

At the reaction level, it would track completion, time in module, drop-off point, and a two-question
relevance rating. At the learning level, the pre-and-post confidence shift, the Storyline performance
score, and — the most useful artefact in the whole plan — the **decision-path distribution**. Because
the scenario records a path string for every learner, the plan would surface which specific distractor
the cohort selects most often. That is a curriculum instrument, not a report: if 60% of learners top
up the tire and drive, the gap is in how Lesson 3 teaches the difference between a leak and a
temperature variance, and the fix is one Rise screen.

At the behaviour level, it would use a manager observation checklist during the first ride-along and
sample escalation messages for completeness against the four fields. At the results level, it would
propose watching pre-shift window duration, avoidable first-attempt failures, and preventable
roadside events across the first thirty days on route.

Every measure in that plan is a proposed measure. In a live implementation, I would validate the
baseline before promising a delta — and I would expect the first version of the escalation-completeness
rubric to need revision after twenty real messages.

### 12. What I Would Test, Improve, and Scale

**What I would test first.** Whether the ninety-second triage claim survives real use. The framework is
designed around a time box, and if new associates cannot actually reach a disposition in ninety seconds
on a cold February morning, the framework needs a fourth disposition or a simpler trigger set. I would
run five think-aloud sessions with associates inside their first three weeks, at a real station, before
the shift.

**What I would improve.** The fourth decision point is the weakest link in the current branch. Customer
access notes vary enormously by station and by contract, and one scenario cannot carry that variance.
In a live build, I would replace the single note with a small pool of three swapped in by a random
variable, so a second attempt is not a memory test.

**What I would scale.** The architecture generalises: the dashboard, the three-dimension scoring, the
remediation pattern, and the debrief are a reusable shell. Swapping the content layer produces a
first-fifteen-minutes experience for a warehouse shift start, a clinic opening, or a field-service
morning, at a fraction of the original build cost. That reusability is the thing I would actually pitch
to a director of L&D: not this course, but the pattern and the production system behind it.

### 13. Final Reflection

The most useful thing I learned building this is that the instructional model was the hard part, and
the tooling was not. My first version of the decision framework had two dispositions — handle it or
escalate it — and it produced a scenario where every correct answer was "escalate," which is both
useless as training and untrue to the job. Adding "Note" as a third disposition fixed the instruction,
the branching, and the scoring in one move, because it created a middle path where most real pre-shift
discoveries actually live.

The second thing: designing the accessibility requirements first made the experience better for
everyone. Removing the real-time timer, which I added early because pressure felt authentic, forced me
to create pressure through consequence instead — and consequence is what teaches. The constraint
improved the design.

What I would want a hiring manager to take from this project is not that I can operate Storyline. It is
that I can be handed a messy operational problem, find the actual performance gap inside it, build a
model simple enough to fit on a wallet card, and then produce something learners will finish and
managers will reinforce — and that I will tell you plainly which parts of it still need to be tested.

## 2.6 Page footer elements

**Fictional-client disclosure** (place directly below the hero facts panel, at 14px, in secondary text)
> MileOne Logistics is a fictional organisation created for this project. All scenarios, characters,
> and data are illustrative. No proprietary or client information is represented, and no metrics in
> this case study are reported outcomes.

**Accessibility statement** (full text in §13.9; short version for the page)
> This project was designed to WCAG 2.1 AA. Contrast ratios were verified for every colour pair, all
> interactions are keyboard-operable with a visible focus indicator, no information is conveyed by
> colour alone, narration is captioned and available as a transcript, and there are no timed
> interactions. The prototype was tested keyboard-only and with NVDA and VoiceOver.

**Next-project navigation** · `Next case study →` and `All work →`
**Contact block** · `Designing learning for operational teams. Available for LXD and instructional design roles. → Get in touch`
