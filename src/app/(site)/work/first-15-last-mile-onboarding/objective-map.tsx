// Asset 8 from the media plan (section 15.8): the objective-to-evidence table of
// section 5.3, drawn rather than tabulated.
//
// The argument this picture makes is completeness, not structure. Six objectives, and
// every one of them runs unbroken from a Bloom's level through the interaction that
// teaches it and the evidence that assesses it to the behaviour it supports. A row that
// cannot complete describes an objective that is not measurable, and it does not ship.
// So the drawing is six traces with four stations each, and the thing to notice is that
// none of them stop early.
//
// Inline SVG rather than a Figma export, for the same reasons as the flow map: the
// labels stay real text, they scale, they are selectable, and a screen reader meets
// them in reading order. Colour follows the page's two standing rules — indigo is
// reserved for things you can click, so none appears here; gold on this ground is
// --f15-gold-light at 8.33:1.

type Row = {
  lo: string;
  objective: [string, string];
  bloom: string;
  interaction: [string, string];
  evidence: [string, string];
  behaviour: [string, string];
};

const ROWS: Row[] = [
  {
    lo: "LO1",
    objective: ["Classify five mixed discoveries", "as Fix, Flag or Note"],
    bloom: "Apply",
    interaction: ["Rise L2 process block → sorting activity,", "eight real discoveries → L4 check"],
    evidence: ["Sort pattern · KC4 score · all four dashboard", "cards visited before roll-out"],
    behaviour: ["Reaches a disposition on every pre-shift discovery", "instead of proceeding by default"],
  },
  {
    lo: "LO2",
    objective: ["Distinguish a degrading vehicle", "condition from a stable variance"],
    bloom: "Analyse",
    interaction: ["Rise L3 labelled graphic → tabs (pressure,", "fluid, load, lights) → Decision Point 1"],
    evidence: ["DP1 choice and points · KC2 · remediation", "flag if the Safety floor trips"],
    behaviour: ["Airs up and logs a cold variance; flags a 19-psi", "overnight drop as a suspected leak"],
  },
  {
    lo: "LO3",
    objective: ["Select and justify the safest", "action under competing pressure"],
    bloom: "Evaluate",
    interaction: ["Decision Point 3, priority conflict, with", "consequence layers → Rise L5 scenario"],
    evidence: ["DP3 choice · Safety and Service deltas ·", "debrief justification prompt"],
    behaviour: ["Protects the medical receiving window under", "volume pressure instead of absorbing first"],
  },
  {
    lo: "LO4",
    objective: ["Compose a four-field", "escalation message"],
    bloom: "Create",
    interaction: ["Rise L5 accordion with a worked example", "→ scenario block → DP2 composition"],
    evidence: ["DP2 message variant scored against the", "four-field rubric · Module C reflection"],
    behaviour: ["Escalations arrive complete and actionable;", "no follow-up call needed"],
  },
  {
    lo: "LO5",
    objective: ["Sequence a route protecting", "custody and delivery windows"],
    bloom: "Apply",
    interaction: ["Rise L3 flashcards, custody categories →", "dashboard manifest card → DP3"],
    evidence: ["DP3 sequencing choice · Time budget", "consumed · Service score"],
    behaviour: ["Medical tote sequenced first; volume absorbed", "after commitments are protected"],
  },
  {
    lo: "LO6",
    objective: ["Appraise an access instruction", "against safety policy"],
    bloom: "Evaluate",
    interaction: ["Rise L4 accordion, access-note red flags", "→ Decision Point 4"],
    evidence: ["DP4 choice and Safety delta ·", "documentation sub-choice"],
    behaviour: ["Declines to enter a dwelling; delivers to the", "safest compliant point and documents it"],
  },
];

// x origin of each column. The gutter is 16 throughout, and the last column ends at
// 1164, which is 16 in from the 1180 frame.
// Bloom sits at 276 rather than 246 because the objective column needs 210: rendered
// headlessly in the real face, Bricolage 600/11px runs ~6.4px per character, and six
// objective lines overran a 180px column, the worst by 35px. "Evaluate", the widest
// Bloom value, still clears the 62px that leaves it.
const COL = { lo: 16, obj: 50, bloom: 276, act: 354, ev: 606, beh: 872 };
const STATIONS = [COL.lo, COL.bloom, COL.act, COL.ev, COL.beh];

const ROW_TOP = (i: number) => 104 + i * 64;
const L1 = 22;   // first text line, below the rule
const L2 = 35;   // second
const RULE_X1 = 16;
const RULE_X2 = 1164;
const LAST_RULE = ROW_TOP(ROWS.length - 1) + 64;

const HEADS: [number, string][] = [
  [COL.lo, "Objective"],
  [COL.bloom, "Bloom"],
  [COL.act, "Interaction that teaches it"],
  [COL.ev, "Evidence that assesses it"],
  [COL.beh, "Workplace behaviour supported"],
];

export function ObjectiveMap() {
  return (
    <figure className="f15-omap">
      <div
        className="f15-omap-scroll"
        tabIndex={0}
        role="group"
        aria-label="Objective mapping diagram, scrollable horizontally"
      >
        <svg viewBox="0 0 1180 512" className="f15-omap-svg" role="img" aria-labelledby="omapT omapD">
          <title id="omapT">Objective-to-evidence map for the First 15 curriculum</title>
          <desc id="omapD">
            Six learning objectives, each traced left to right across four stations: its level in
            Bloom&rsquo;s taxonomy, the course interaction that teaches it, the assessment evidence that
            measures it, and the workplace behaviour it supports. Every one of the six traces completes
            all four stations. An objective whose row cannot complete is not measurable and is cut
            rather than shipped.
          </desc>

          {/* column headings */}
          {HEADS.map(([x, label]) => (
            <text key={label} x={x} y="86" className="f15-omap-head">
              {label}
            </text>
          ))}

          {/* the traces */}
          {ROWS.map((r, i) => {
            const top = ROW_TOP(i);
            return (
              <g key={r.lo}>
                <line x1={RULE_X1} y1={top} x2={RULE_X2} y2={top} className="f15-omap-trace" />
                {STATIONS.map((x, si) => (
                  <circle
                    key={x}
                    cx={x}
                    cy={top}
                    r={si === 0 ? 3.5 : 2.5}
                    className={si === 0 ? "f15-omap-origin" : "f15-omap-station"}
                  />
                ))}

                <text x={COL.lo} y={top + L1} className="f15-omap-lo">{r.lo}</text>

                <text x={COL.obj} y={top + L1} className="f15-omap-obj">{r.objective[0]}</text>
                <text x={COL.obj} y={top + L2} className="f15-omap-obj">{r.objective[1]}</text>

                <text x={COL.bloom} y={top + L1} className="f15-omap-bloom">{r.bloom}</text>

                <text x={COL.act} y={top + L1} className="f15-omap-cell">{r.interaction[0]}</text>
                <text x={COL.act} y={top + L2} className="f15-omap-cell">{r.interaction[1]}</text>

                <text x={COL.ev} y={top + L1} className="f15-omap-cell">{r.evidence[0]}</text>
                <text x={COL.ev} y={top + L2} className="f15-omap-cell">{r.evidence[1]}</text>

                <text x={COL.beh} y={top + L1} className="f15-omap-cell">{r.behaviour[0]}</text>
                <text x={COL.beh} y={top + L2} className="f15-omap-cell">{r.behaviour[1]}</text>
              </g>
            );
          })}

          <line x1={RULE_X1} y1={LAST_RULE} x2={RULE_X2} y2={LAST_RULE} className="f15-omap-trace" />
        </svg>
      </div>
      <figcaption>
        Every objective traced to an interaction, a piece of assessment evidence, and an observable
        workplace behaviour. The point of the picture is that none of the six rows stops early &mdash; if
        a row cannot complete, the objective is not measurable, and it gets cut rather than shipped.
      </figcaption>
    </figure>
  );
}
