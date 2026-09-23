"use client";

import { useState } from "react";

// A playable miniature of the Storyline branching scenario: four decision points,
// three tracked dimensions, and the same categorical-safety interrupt the real
// build uses. Scoring deltas and DP1 feedback are taken from the design document.

type Option = {
  key: string;
  label: string;
  safety: number;
  service: number;
  time: number;
  critical?: boolean;
  verdict: string;
  feedback: string;
};

type Decision = {
  stamp: string;
  place: string;
  setup: string[];
  question: string;
  options: Option[];
};

const DECISIONS: Decision[] = [
  {
    stamp: "7:11 a.m.",
    place: "Van 4412",
    setup: [
      "Rear right is at 61. Spec is 80. Yesterday, same tire, you wrote down 78.",
      "The station compressor is working and there's nobody waiting for it.",
    ],
    question: "What do you do?",
    options: [
      {
        key: "A",
        label: "Air it up to 80, log the reading, and flag the overnight drop to fleet.",
        safety: 15, service: 0, time: -3,
        verdict: "You spent three minutes and bought the whole day.",
        feedback:
          "You made the van safe to move and you put the pattern on record. That second part is the one people skip. 78 to 61 overnight isn't the weather — it's a leak, and a compressor doesn't fix a leak, it just resets the clock on it. Fix and Flag. Some conditions are both.",
      },
      {
        key: "B",
        label: "Air it up to 80 and roll out. It's at spec now.",
        safety: -10, service: -5, time: -2,
        verdict: "You did the safe thing and skipped the useful thing.",
        feedback:
          "Airing it up was right — it made the van safe to move this morning. What it didn't do was tell anyone the tire had moved 17 psi overnight. So the leak stayed in the fleet, and it found you at the least convenient point on your route.",
      },
      {
        key: "C",
        label: "It's only one tire and it's not flat. Drive it and keep an eye on it.",
        safety: -20, service: 0, time: 0, critical: true,
        verdict: "Safety is a gate, not a trade-off.",
        feedback:
          "A tire 19 psi under spec, on the rear axle of a loaded van, carrying 96 stops. Under-inflated tires run hot. A hot tire on a loaded rear axle is how a blowout happens, and a rear blowout in a cargo van is how you lose the vehicle.",
      },
      {
        key: "D",
        label: "Park the van and wait for fleet to clear it before I take it anywhere.",
        safety: 10, service: -15, time: -9,
        verdict: "Right instinct, wrong size.",
        feedback:
          "You read the Risk trigger correctly, and that matters more than the mistake after it. But a compressor was thirty feet away and the spec was one you could hit. The condition was resolvable inside your own authority and reportable — so it was a Fix and a Flag, not a stop.",
      },
    ],
  },
  {
    stamp: "7:13 a.m.",
    place: "Stop 22 · Calloway & Finch",
    setup: [
      "The barcode scans clean. The suite number is under a scuff you can't read — you can make out \"Suite 4\" and then nothing.",
      "It's a signature-required shipment. The building has eleven suites. You've got about four minutes of loading left.",
    ],
    question: "What do you do?",
    options: [
      {
        key: "A",
        label:
          "Scan it as a label exception, photograph it, and message dispatch with the tracking number while I finish loading.",
        safety: 0, service: 15, time: -1,
        verdict: "You solved it without spending the morning on it.",
        feedback:
          "Dispatch had the tracking number, a photograph and the suite fragment before you left the bay — enough to pull the address from the account and send it back while you were still loading. Four fields, no phone call, no second conversation.",
      },
      {
        key: "B",
        label: "Load it. I'm fairly sure it's the fourth floor — I'll work it out when I'm there.",
        safety: 0, service: -15, time: -4,
        verdict: "Eleven suites and a signature.",
        feedback:
          "The consequence arrived at 1:40 p.m., not at 7:13. Four doors, nobody expecting you, and a shipment that can't be left. Twenty-two minutes gone and the package came back to the station anyway.",
      },
      {
        key: "C",
        label: "Set it aside as undeliverable and let the station sort it out.",
        safety: 0, service: -10, time: -2,
        verdict: "You moved the problem instead of solving it.",
        feedback:
          "Nothing unsafe happened, and that counts. But the information needed to fix this was in your hands and in nobody else's — the scuff, the fragment, the tracking number. Handing it back blind costs the customer a day.",
      },
      {
        key: "D",
        label: "Call dispatch and tell them I've got a package with a damaged label.",
        safety: 0, service: 5, time: -4,
        verdict: "Right call, incomplete message.",
        feedback:
          "Escalating was correct. But \"damaged label\" isn't actionable — Renata still needs the tracking number, what you can read, what you can't, and what you need back. A complete escalation ends the conversation. An incomplete one starts three.",
      },
    ],
  },
  {
    stamp: "7:14 a.m.",
    place: "Route 214 · 96 stops",
    setup: [
      "Stop 3 — Ward 7 Dialysis Center. Refrigerated tote. Receiving window 08:00 to 09:30. Your handheld has it sequenced as stop 14, which puts you there around 10:20.",
      "93 standard residential. Volume is 18% over forecast. Two associates are out.",
      "Renata's message: \"Tell me early if something on your route can't move.\"",
    ],
    question: "What do you do?",
    options: [
      {
        key: "A",
        label:
          "Resequence the clinic to first, confirm the window, and message dispatch naming what I can't absorb.",
        safety: 0, service: 15, time: -3,
        verdict: "You protected the commitment and told the truth about the rest.",
        feedback:
          "The tote made the window. And because you named what wouldn't fit while it was still 7:14, dispatch moved eleven residential stops to another route instead of discovering the shortfall at four o'clock.",
      },
      {
        key: "B",
        label: "Absorb the volume and run the route as sequenced. I'll push to make the window.",
        safety: 0, service: -20, time: -2,
        verdict: "You arrived at 10:31.",
        feedback:
          "The window closed at 9:30. A refrigerated tote that misses its receiving window is a custody failure, not a late delivery — it doesn't get delivered tomorrow, it gets destroyed and reordered. Custody items don't get judgment calls applied to them.",
      },
      {
        key: "C",
        label: "Message dispatch that the volume's too high for this route and wait for direction.",
        safety: 0, service: -5, time: -6,
        verdict: "You escalated a problem you could have half-solved.",
        feedback:
          "Renata got a route-level complaint with no proposal attached, and she's holding fourteen of them. Six minutes went to waiting. The resequence was inside your authority — the volume was the only part that needed her.",
      },
      {
        key: "D",
        label: "Resequence the clinic to first and absorb all the extra volume without saying anything.",
        safety: 0, service: 5, time: -2,
        verdict: "Half right, and the half you skipped was hers.",
        feedback:
          "The tote made the window — that was the important one. But 18% over forecast doesn't absorb quietly, and dispatch found out at 4 p.m. that the back of your route wasn't going to happen. Early is the whole value of the escalation.",
      },
    ],
  },
  {
    stamp: "7:15 a.m.",
    place: "Stop 6 · 1140 Pinehurst Ct.",
    setup: [
      "Account note, added 14 months ago: \"Side gate code is 4412. Dog is friendly. If the porch door's unlocked just set it inside.\"",
      "You'll be there around ten. You're deciding now.",
    ],
    question: "What's your plan for this stop?",
    options: [
      {
        key: "A",
        label: "Plan a non-entry delivery now, and flag the note so the account gets corrected.",
        safety: 5, service: 10, time: -2,
        verdict: "You kept the delivery and dropped the liability.",
        feedback:
          "The customer still got their parcel, in a place they agreed to. And the note came off the account, so the next associate — who might be on day three — never has to make this call at all.",
      },
      {
        key: "B",
        label: "Follow the note. The customer asked for this in writing.",
        safety: -25, service: 0, time: 0, critical: true,
        verdict: "A customer cannot authorise you into a dwelling.",
        feedback:
          "The note is 14 months old. It doesn't know who lives there now, who else has the gate code, whether the dog is the same dog, or who is inside at ten in the morning. Written by a customer is not the same as authorised.",
      },
      {
        key: "C",
        label: "Plan to mark it undeliverable when I get there. Not worth the risk.",
        safety: 5, service: -10, time: -1,
        verdict: "Safe, and more expensive than it needed to be.",
        feedback:
          "Declining entry was right. But the choice wasn't enter or refuse — a doorstep delivery with a photograph was available the whole time, and it keeps the customer whole.",
      },
      {
        key: "D",
        label: "I'll see what it looks like when I get there.",
        safety: -10, service: -5, time: 0,
        verdict: "You'll be deciding this at the gate instead.",
        feedback:
          "At ten o'clock, at the gate, with a dog barking and a schedule behind you, is the worst possible moment to work out an authorisation question. You have the note now and nothing is in front of you. Decide now.",
      },
    ],
  },
];

const START = { safety: 70, service: 70, time: 15 };

export function TriageDemo() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(START);
  const [chosen, setChosen] = useState<Option | null>(null);
  const [critical, setCritical] = useState<Option | null>(null);
  const [remediatedAt, setRemediatedAt] = useState<number[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const d = DECISIONS[step];

  function choose(o: Option) {
    // A categorical violation interrupts every time it is chosen, independently of the
    // accumulation floor — the remediation flag guards the floor, not the gate. Only a
    // second attempt at the SAME decision passes through.
    if (o.critical && !remediatedAt.includes(step)) {
      setCritical(o);
      return;
    }
    setScore((s) => ({
      safety: Math.max(0, Math.min(100, s.safety + o.safety)),
      service: Math.max(0, Math.min(100, s.service + o.service)),
      time: s.time + o.time,
    }));
    setPath((p) => [...p, `${step + 1}${o.key}`]);
    setChosen(o);
  }

  function next() {
    setChosen(null);
    if (step === DECISIONS.length - 1) setDone(true);
    else setStep((s) => s + 1);
  }

  function clearCritical() {
    // The violation carries its own authored safety cost (-20 at DP1, -25 at DP4) and that
    // cost is applied on the way out of the interrupt. It used to set safety to a flat 60,
    // which meant a learner who arrived at DP4 already below 60 was *rewarded* for trying
    // to enter the dwelling. A gate that can raise your score is not a gate.
    const penalty = critical ? critical.safety : 0;
    setScore((s) => ({ ...s, safety: Math.max(0, Math.min(100, s.safety + penalty)) }));
    setRemediatedAt((r) => (r.includes(step) ? r : [...r, step]));
    setCritical(null);
  }

  function restart() {
    setStep(0); setScore(START); setChosen(null);
    setCritical(null); setRemediatedAt([]); setPath([]); setDone(false);
  }

  const passed = score.safety >= 80 && score.service >= 70 && score.time > 0;
  let pattern: string;
  if (passed) pattern = "Clean shift. You held the safety gate, protected the commitments, and rolled out inside the window.";
  else if (score.safety < 70) pattern = "Fast and exposed. You moved quickly and left risk behind you. The coaching you need is about the gate, not the clock.";
  else if (score.time <= 0) pattern = "Careful and costly. Your judgment was sound and it cost more time than the shift had. The coaching you need is about proportion.";
  else pattern = "Mixed. You got the gate right and left service on the table — the escalations were the gap.";
  if (remediatedAt.length > 0)
    pattern = "The gate decides this one. You were stopped, and a stop is not a score you can climb back from inside the same attempt — the rest of the run is coaching.";

  // The flag used to read "Passed with remediation" whenever an interrupt had fired, even on
  // a failing run — so the debrief could print "Standard not met." and "Passed with
  // remediation" one line apart. It now reports the interrupt; the verdict reports the score.
  // With the violation's own cost applied, no tripped run can reach Safety 80, which is the
  // point: the copy calls safety a gate, and a gate you can trip and still clear is not one.
  const tripped = remediatedAt.map((i) => i + 1).join(" and ");
  const flag =
    remediatedAt.length === 0
      ? null
      : `Safety gate tripped at decision ${tripped}. A categorical violation ends the first-pass result for the attempt — you finish it for the coaching, and the record carries the interrupt, not just the final score.`;

  return (
    <div className="f15-demo">
      <div className="f15-demo-meters" aria-live="polite">
        {[
          { k: "Safety", v: score.safety, max: 100, suffix: "", target: 80 },
          { k: "Service", v: score.service, max: 100, suffix: "", target: 70 },
          { k: "Time left", v: score.time, max: 15, suffix: " min", target: 1 },
        ].map((m) => (
          <div className="f15-meter" key={m.k}>
            <div className="f15-meter-head">
              <span>{m.k}</span>
              <b className={m.v < m.target ? "under" : undefined}>
                {m.v}
                {m.suffix}
              </b>
            </div>
            <div className="f15-meter-track">
              <span
                className={m.v < m.target ? "under" : undefined}
                style={{ width: `${Math.max(0, Math.min(100, (m.v / m.max) * 100))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {critical ? (
        <div className="f15-demo-critical" role="alertdialog" aria-label="Critical risk">
          <p className="f15-stop">STOP.</p>
          <p className="f15-demo-verdict">{critical.verdict}</p>
          <p>{critical.feedback}</p>
          <p className="f15-demo-note">
            This is the only immediate consequence in the build. Every other consequence is delayed on
            purpose — but an interrupt is the right form for a categorical violation, and delaying it
            would imply the gate is negotiable.
          </p>
          <button type="button" className="f15-demo-btn" onClick={clearCritical}>
            Decide again →
          </button>
        </div>
      ) : done ? (
        <div className="f15-demo-debrief">
          <p className="f15-demo-eyebrow">Debrief</p>
          <p className="f15-demo-verdict">{passed ? "Standard met." : "Standard not met."}</p>
          <p>{pattern}</p>
          <dl className="f15-demo-path">
            <dt>Final path</dt>
            <dd><span className="f15-mono">{path.join("-")}</span></dd>
            <dt>Standard</dt>
            <dd>Safety ≥ 80 · Service ≥ 70 · rolled out inside 15 minutes</dd>
            {flag ? (
              <>
                <dt>Flag</dt>
                <dd>{flag}</dd>
              </>
            ) : null}
          </dl>
          <button type="button" className="f15-demo-btn" onClick={restart}>
            Run it again →
          </button>
        </div>
      ) : chosen ? (
        <div className="f15-demo-feedback">
          <p className="f15-demo-eyebrow">
            {chosen.safety + chosen.service > 10 ? "Consequence" : "What happened next"}
          </p>
          <p className="f15-demo-verdict">{chosen.verdict}</p>
          <p>{chosen.feedback}</p>
          <button type="button" className="f15-demo-btn" onClick={next}>
            {step === DECISIONS.length - 1 ? "See the debrief →" : "Next decision →"}
          </button>
        </div>
      ) : (
        <div className="f15-demo-scene">
          <p className="f15-demo-eyebrow">
            Decision {String(step + 1).padStart(2, "0")} of 04 &nbsp;·&nbsp; {d.stamp} &nbsp;·&nbsp;{" "}
            {d.place}
          </p>
          {d.setup.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
          <p className="f15-demo-q">{d.question}</p>
          <ul className="f15-demo-options">
            {d.options.map((o) => (
              <li key={o.key}>
                <button type="button" onClick={() => choose(o)}>
                  <span className="f15-demo-key">{o.key}</span>
                  <span>{o.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
