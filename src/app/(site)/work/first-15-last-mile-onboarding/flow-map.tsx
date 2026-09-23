// The branching map from section 8.1 of the design document, drawn rather than listed.
//
// Inline SVG, not an exported image: the labels stay real text, so they scale, they are
// selectable, and a screen reader meets them in reading order rather than meeting one
// paragraph of alt text standing in for the whole structure. The figure carries a longer
// description as well, because the *shape* is the argument here — sixteen branches with
// one route through them — and shape is what alt text is worst at.
//
// Colour follows the page's two standing rules: indigo is reserved for things you can
// click, so none appears here; gold on this ground is --f15-gold-light at 8.6:1.

const DP = [
  { x: 254, n: "DP1", label: "Vehicle", stamp: "7:11", opts: ["Air up · log · flag", "Air up and roll", "Drive and monitor", "Park and wait"] },
  { x: 468, n: "DP2", label: "Label", stamp: "7:13", opts: ["Exception · photo · flag", "Load, sort later", "Set aside", "Call, no tracking"] },
  { x: 682, n: "DP3", label: "Priority", stamp: "7:14", opts: ["Resequence · confirm", "Absorb and push", "Wait for volume", "Resequence, silent"] },
  { x: 896, n: "DP4", label: "Access", stamp: "7:19", opts: ["Plan non-entry · flag", "Follow the note", "Mark undeliverable", "Decide at the gate"] },
];

const ROW_Y = [112, 148, 184, 220];   // A B C D
const HUB_Y = 166;                     // the fan-in point on each station
const CHIP_W = 168;   // the longest option label measures 160
const CRITICAL: Record<number, number> = { 0: 2, 3: 1 };   // DP index -> categorical option

export function FlowMap() {
  return (
    <figure className="f15-flow">
      <div
        className="f15-flow-scroll"
        tabIndex={0}
        role="group"
        aria-label="Scenario flow diagram, scrollable horizontally"
      >
        <svg viewBox="0 0 1180 392" className="f15-flow-svg" role="img" aria-labelledby="flowT flowD">
          <title id="flowT">Branching map of the First 15 scenario</title>
          <desc id="flowD">
            A shift-start dashboard leads to four decision points, each offering four branches, which
            converge on a performance debrief. Two branches are categorical safety violations — drive
            on the under-inflated tire at decision one, and follow the access note into the dwelling at
            decision four. Each interrupts the scenario, runs a two-screen micro-lesson, and returns
            the learner to the same decision with that option disabled and points capped. The
            preferred route, one option at each of the four decisions, is traced through in gold.
          </desc>

          <defs>
            <marker id="f15-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" className="f15-flow-arrowhead" />
            </marker>
            <marker id="f15-arrow-gold" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" className="f15-flow-arrowhead-gold" />
            </marker>
            <marker id="f15-arrow-crimson" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L8 4 L0 8 z" className="f15-flow-arrowhead-crimson" />
            </marker>
          </defs>

          {/* legend */}
          <g>
            <line x1="20" y1="34" x2="52" y2="34" className="f15-flow-gold" />
            <text x="60" y="38" className="f15-flow-legend">Preferred route</text>
            <line x1="180" y1="34" x2="212" y2="34" className="f15-flow-crit" />
            <text x="220" y="38" className="f15-flow-legend">Categorical gate — interrupts, then returns</text>
            <line x1="520" y1="34" x2="552" y2="34" className="f15-flow-edge" />
            <text x="560" y="38" className="f15-flow-legend">The other fourteen branches</text>
          </g>

          {/* the hub */}
          <g>
            <rect x="18" y="136" width="112" height="60" rx="3" className="f15-flow-box" />
            <text x="74" y="162" textAnchor="middle" className="f15-flow-station-t">Dashboard</text>
            <text x="74" y="180" textAnchor="middle" className="f15-flow-sub">4 cards · gated</text>
          </g>
          <line
            x1="130"
            y1={HUB_Y}
            x2={DP[0].x - CHIP_W / 2 - 8}
            y2={HUB_Y}
            className="f15-flow-gold"
            markerEnd="url(#f15-arrow-gold)"
          />

          {/* decision points */}
          {DP.map((d, di) => (
            <g key={d.n}>
              <line
                x1={d.x - CHIP_W / 2 - 8}
                y1={ROW_Y[0] - 13}
                x2={d.x - CHIP_W / 2 - 8}
                y2={ROW_Y[3] + 13}
                className="f15-flow-rail"
              />
              <text x={d.x - CHIP_W / 2} y="78" className="f15-flow-dp-n">{d.n}</text>
              <text x={d.x - CHIP_W / 2 + 34} y="78" className="f15-flow-dp-l">{d.label}</text>
              <text x={d.x + CHIP_W / 2} y="78" textAnchor="end" className="f15-flow-stamp">{d.stamp}</text>
              <line x1={d.x - CHIP_W / 2} y1="86" x2={d.x + CHIP_W / 2} y2="86" className="f15-flow-rule" />

              {d.opts.map((o, oi) => {
                const crit = CRITICAL[di] === oi;
                const cls = crit
                  ? "f15-flow-chip f15-flow-chip-crit"
                  : oi === 0
                    ? "f15-flow-chip f15-flow-chip-pref"
                    : "f15-flow-chip";
                return (
                  <g key={o}>
                    <rect x={d.x - CHIP_W / 2} y={ROW_Y[oi] - 13} width={CHIP_W} height="26" rx="2" className={cls} />
                    <text x={d.x - CHIP_W / 2 + 9} y={ROW_Y[oi] + 4} className="f15-flow-opt">
                      <tspan className="f15-flow-key">{"ABCD"[oi]}</tspan>
                      <tspan dx="8">{o}</tspan>
                    </text>
                  </g>
                );
              })}

              {/* every non-categorical branch converges on the next station */}
              {d.opts.map((o, oi) => {
                if (CRITICAL[di] === oi) return null;
                const x1 = d.x + CHIP_W / 2;
                const x2 = di === DP.length - 1 ? 1010 : DP[di + 1].x - CHIP_W / 2 - 8;
                const y1 = ROW_Y[oi];
                const mid = x1 + (x2 - x1) / 2;
                return (
                  <path
                    key={`e-${o}`}
                    d={`M${x1} ${y1} C${mid} ${y1} ${mid} ${HUB_Y} ${x2} ${HUB_Y}`}
                    className={oi === 0 ? "f15-flow-gold" : "f15-flow-edge"}
                    markerEnd={oi === 0 ? "url(#f15-arrow-gold)" : "url(#f15-arrow)"}
                  />
                );
              })}
            </g>
          ))}

          {/* the two categorical gates: out, down, and back to the same decision */}
          {[
            { x: DP[0].x, oi: 2, code: "1C" },
            { x: DP[3].x, oi: 1, code: "4B" },
          ].map((g) => {
            const y = ROW_Y[g.oi];
            const boxY = 320;
            return (
              <g key={g.code}>
                <path
                  d={`M${g.x + CHIP_W / 2} ${y} C${g.x + 140} ${y} ${g.x + 96} ${boxY + 21} ${g.x + 50} ${boxY + 21}`}
                  className="f15-flow-crit"
                  markerEnd="url(#f15-arrow-crimson)"
                />
                <rect x={g.x - 100} y={boxY} width="150" height="42" rx="3" className="f15-flow-critbox" />
                <text x={g.x - 90} y={boxY + 18} className="f15-flow-critt">STOP · {g.code}</text>
                <text x={g.x - 90} y={boxY + 33} className="f15-flow-sub">micro-lesson · 40s</text>
                <path
                  d={`M${g.x - 100} ${boxY + 21} C${g.x - 175} ${boxY + 21} ${g.x - CHIP_W / 2 - 70} ${y} ${g.x - CHIP_W / 2 - 8} ${y}`}
                  className="f15-flow-crit f15-flow-crit-return"
                  markerEnd="url(#f15-arrow-crimson)"
                />
                <text x={g.x - 180} y={boxY - 10} className="f15-flow-sub">re-decide · capped 15</text>
              </g>
            );
          })}

          {/* debrief */}
          <g>
            <rect x="1010" y="136" width="90" height="60" rx="3" className="f15-flow-box" />
            <text x="1055" y="162" textAnchor="middle" className="f15-flow-station-t">Debrief</text>
            <text x="1055" y="180" textAnchor="middle" className="f15-flow-sub">5 layers</text>
          </g>
        </svg>
      </div>
      <figcaption>
        Four decision points, sixteen branches, two categorical gates that interrupt and return, and one
        preferred route traced through a structure visibly larger than it. The scoring model was verified
        by enumerating every reachable run — which is how the gate that could <em>raise</em> a
        learner&rsquo;s safety score was found, three drafts after it was written.
      </figcaption>
    </figure>
  );
}
