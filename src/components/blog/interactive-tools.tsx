'use client';

import { useState } from 'react';

const control = 'min-h-11 rounded border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
const card = 'rounded-lg border border-border bg-background p-4';

const comparison = {
  Entrance: {
    vastu: 'A Vastu discussion may map the doorway against the wall, its measured position, orientation and approach.',
    fengShui: 'A Feng Shui discussion may consider the door and approach within the selected school and the surrounding form.',
    ask: 'How was north established, and which point on the doorway or wall are we using?',
  },
  Kitchen: {
    vastu: 'A Vastu discussion may review the kitchen location and the relation between cooking and water areas.',
    fengShui: 'A Feng Shui discussion may review the kitchen as part of the room arrangement and whole-home layout.',
    ask: 'Where are the cooktop, sink, ventilation and fixed services, and what can safely move?',
  },
  Bedroom: {
    vastu: 'A Vastu discussion may review bedroom location, openings and connection to the rest of the plan.',
    fengShui: 'A Feng Shui discussion may review the room arrangement and bed position using the selected school.',
    ask: 'What are the room dimensions, door and window positions, and fixed constraints?',
  },
  Mirrors: {
    vastu: 'A Vastu discussion may consider mirror placement in relation to room use and the consultant’s method.',
    fengShui: 'A Feng Shui discussion may consider what a mirror reflects and where it sits in the room.',
    ask: 'Can you mark the mirror and show what it reflects from the usual viewing position?',
  },
  Water: {
    vastu: 'A Vastu discussion may consider water features or wet areas alongside the room and directional layout.',
    fengShui: 'A Feng Shui discussion may consider water features in context, using the chosen school and site information.',
    ask: 'What kind of water feature or service is involved, and is it fixed or movable?',
  },
} as const;
type ComparisonTopic = keyof typeof comparison;

export function CompareTool() {
  const [topic, setTopic] = useState<ComparisonTopic>('Entrance');
  const [selected, setSelected] = useState<ComparisonTopic[]>(['Entrance']);
  const row = comparison[topic];
  const prepare = selected.length ? selected : [topic];
  return <section aria-labelledby="compare-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="compare-tool-title" className="font-headline text-2xl font-semibold">Which tradition question should I ask first?</h2>
    <p className="mt-2 text-base leading-7">Select a topic to see how the questions can differ. Traditions include different schools and methods; this is a prompt for discussion, not a verdict.</p>
    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a comparison topic">
      {(Object.keys(comparison) as ComparisonTopic[]).map((item) => <button key={item} type="button" className={control} aria-pressed={topic === item} onClick={() => setTopic(item)}>{item}</button>)}
    </div>
    <div className="mt-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[36rem] text-left text-sm leading-6"><caption className="sr-only">Traditional Vastu and Feng Shui discussion prompts for {topic.toLowerCase()}</caption>
        <thead className="bg-secondary"><tr><th scope="col" className="p-3">Topic</th><th scope="col" className="p-3">Vastu perspective</th><th scope="col" className="p-3">Feng Shui perspective</th></tr></thead>
        <tbody><tr><th scope="row" className="p-3 align-top">{topic}</th><td className="p-3 align-top">{row.vastu}</td><td className="p-3 align-top">{row.fengShui}</td></tr></tbody>
      </table>
    </div>
    <p className="mt-4 text-base leading-7" aria-live="polite"><strong>Question to ask first:</strong> {row.ask}</p>
    <fieldset className="mt-4"><legend className="font-semibold">Build your preparation list</legend><div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">{(Object.keys(comparison) as ComparisonTopic[]).map((item) => <label key={item} className="inline-flex min-h-11 items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" checked={selected.includes(item)} onChange={(event) => setSelected((current) => event.target.checked ? [...current, item] : current.filter((entry) => entry !== item))} />{item}</label>)}</div></fieldset>
    <div className={`${card} mt-4`} aria-live="polite"><h3 className="font-semibold">What to prepare</h3><ul className="mt-2 list-disc space-y-1 pl-5">{prepare.map((item) => <li key={item}>{item}: {comparison[item].ask}</li>)}</ul><p className="mt-2 text-sm leading-6">Bring the same current, north-marked plan to each conversation, with room dimensions, fixed features and any uncertainty noted.</p></div>
  </section>;
}

const plotGroups = {
  'Legal and boundary': ['Title and ownership records reviewed by a property lawyer', 'Permitted land use and approvals checked with the relevant authority', 'Surveyed boundary points compared with the documents'],
  'Access and site': ['Road access, width and entry recorded', 'Levels, low points and visible drainage routes noted', 'Soil, grading and storm-water questions raised with a qualified professional'],
  'Plan and traditional discussion': ['North direction source recorded on the survey', 'Measured sides, shape and boundary outline available', 'Approach road and neighbouring features marked', 'Building needs, budget and fixed constraints written down'],
};
const plotItems = Object.values(plotGroups).flat();
export function PlotChecklistTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const missing = plotItems.filter((item) => !checked.includes(item));
  const percent = Math.round(checked.length / plotItems.length * 100);
  const message = `Jaipur plot visit preparation (${percent}% checked)\nReady: ${checked.length ? checked.map((item) => `- ${item}`).join('\n') : '- No checks marked complete'}\nStill to ask or confirm: ${missing.length ? missing.map((item) => `- ${item}`).join('\n') : '- None from this list'}\nThese notes organise due diligence; they do not determine whether to buy.`;
  return <section aria-labelledby="plot-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="plot-tool-title" className="font-headline text-2xl font-semibold">Plot visit readiness check</h2>
    <p className="mt-2 text-base leading-7">Mark what you have verified. Unchecked items become questions to resolve during independent property due diligence.</p>
    <div className="mt-4" role="group" aria-label="Plot checklist progress"><div className="flex justify-between text-sm font-semibold"><span>{checked.length} of {plotItems.length} items verified</span><span>{percent}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-sage transition-[width] motion-reduce:transition-none" style={{ width: `${percent}%` }} /></div></div>
    {Object.entries(plotGroups).map(([group, items]) => <fieldset key={group} className="mt-5"><legend className="font-semibold">{group}</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{items.map((item) => <label key={item} className="flex min-h-11 items-start gap-3 rounded border border-border bg-background p-3 text-base leading-6"><input className="mt-1 h-4 w-4 accent-primary" type="checkbox" checked={checked.includes(item)} onChange={(event) => setChecked((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item))} />{item}</label>)}</div></fieldset>)}
    <div className={`${card} mt-5`} aria-live="polite"><h3 className="font-semibold">Readiness summary: {percent}% of listed checks verified</h3><p className="mt-1 text-sm leading-6">{missing.length ? `${missing.length} question${missing.length === 1 ? '' : 's'} remain for the site visit or relevant professional.` : 'All listed checks are marked verified. Confirm document and survey details with the relevant professionals.'}</p><ul className="mt-2 list-disc space-y-1 pl-5">{missing.map((item) => <li key={item}>{item}</li>)}</ul></div>
    <a className={`${control} mt-5 inline-flex items-center`} href={`https://wa.me/919828088678?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Share readiness notes on WhatsApp</a>
  </section>;
}

const entranceInfo = {
  N: ['A north-facing road is one orientation to record; consultants may discuss the exact doorway position or pada (segment) using their stated method.', 'Keep the approach, threshold and door swing clear.', 'Wall length, door width and distance to both corners; verify north and note the source.'],
  NE: ['A north-east-facing approach may be discussed as a directional zone; how a pada is identified depends on the wall measurement and chosen method.', 'Keep the entry route and any steps visible and unobstructed.', 'Wall endpoints, opening width, corner offsets and how NE was established.'],
  E: ['An east-facing road can prompt discussion of the door’s measured segment and approach; schools may use different segment methods.', 'Check daylight, door swing and safe clear access.', 'Wall length, opening position from both corners, gate and north reference.'],
  SE: ['For a south-east-facing approach, a consultant may explain how their method divides and reads that wall; the direction alone does not settle a recommendation.', 'Keep the entrance path clear and note nearby services or walls.', 'Wall length, door width, corner offsets and compass or survey source.'],
  S: ['A south-facing road may be reviewed by mapping the actual opening to the wall and noting the selected pada approach.', 'Check lighting, steps, visibility and a clear route through the door.', 'Door opening, full wall length, distance to corners and verified orientation.'],
  SW: ['For a south-west-facing approach, ask which directional divisions and measurement convention the consultant uses.', 'Keep the approach and threshold clear; record fixed columns or boundary walls.', 'Wall endpoints, door width, corner offsets and source of the SW reading.'],
  W: ['A west-facing road is a starting label; the exact position along the wall and the school-specific method are also relevant.', 'Note door swing, lighting, visibility and any obstruction on the route.', 'Wall length, opening position, gate approach and how west was measured.'],
  NW: ['A north-west-facing approach may be discussed against a measured wall segment; ask how the consultant defines the zone or pada.', 'Keep the entrance path and turning space clear.', 'Wall dimensions, opening width, corner offsets and the source used to identify NW.'],
} as const;
const compassPoints = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
type CompassPoint = typeof compassPoints[number];
export function EntranceExplorerTool() {
  const [direction, setDirection] = useState<CompassPoint>('N');
  const [note, clear, measure] = entranceInfo[direction];
  return <section aria-labelledby="entrance-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="entrance-tool-title" className="font-headline text-2xl font-semibold">Main entrance direction explorer</h2>
    <p className="mt-2 text-base leading-7">Choose the direction of the road-facing entrance wall. Direction is a starting point; interpretations vary by method and measured position.</p>
    <div role="group" aria-label="Road-facing entrance direction" className="mx-auto mt-5 grid max-w-sm grid-cols-4 gap-2">{compassPoints.map((point) => <button key={point} type="button" className={control} aria-pressed={direction === point} onClick={() => setDirection(point)}>{point}</button>)}</div>
    <div className={`${card} mt-5`} aria-live="polite"><h3 className="font-semibold">{direction} road-facing wall: traditional discussion</h3><p className="mt-2 text-base leading-7">{note}</p><h4 className="mt-4 font-semibold">What to keep clear</h4><p className="mt-1 leading-7">{clear}</p><h4 className="mt-4 font-semibold">What to measure</h4><p className="mt-1 leading-7">{measure}</p><h4 className="mt-4 font-semibold">Ask your consultant</h4><p className="mt-1 leading-7">How do you define and measure the pada on this wall, and what additional plan or site information do you need?</p></div>
    <p className="mt-4 text-sm leading-6">These are traditional discussion notes, not a prediction or a substitute for safe access, building rules or qualified technical advice.</p>
  </section>;
}

const planChecks = ['North is marked and its source or uncertainty is noted', 'Every floor relevant to the question is included and labelled', 'Outside dimensions and room measurements are shown with units', 'Each room has a clear everyday-use label', 'Entrances, doors, windows, stairs and balconies are marked', 'Structural walls and fixed plumbing, gas or electrical features are marked', 'The drawing is dated and marked to scale or not to scale', 'Two or three focused questions and project stage are written down'];
export function PlanReadinessTool() {
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const [copied, setCopied] = useState(false);
  const ready = planChecks.filter((item) => answers[item] === true).length;
  const missing = planChecks.filter((item) => answers[item] !== true);
  const checklist = `Online Vastu floor plan review checklist (${ready}/${planChecks.length} ready)\n${planChecks.map((item) => `${answers[item] === true ? '[x]' : '[ ]'} ${item}`).join('\n')}`;
  async function copyChecklist() {
    await navigator.clipboard.writeText(checklist);
    setCopied(true);
  }
  return <section aria-labelledby="plan-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="plan-tool-title" className="font-headline text-2xl font-semibold">Online Vastu plan readiness check</h2>
    <p className="mt-2 text-base leading-7">Mark each item yes or no. The score counts confirmed items; unanswered and no answers remain in the copyable checklist.</p>
    <div className="mt-4 space-y-3">{planChecks.map((item) => <fieldset key={item} className="flex flex-wrap items-center justify-between gap-2 rounded border border-border bg-background p-3"><legend className="sr-only">{item}</legend><span className="min-w-0 flex-1 text-base leading-6">{item}</span><div className="flex gap-2">{(['Yes', 'No'] as const).map((answer) => <button key={answer} type="button" className={control} aria-pressed={answers[item] === (answer === 'Yes')} onClick={() => setAnswers((current) => ({ ...current, [item]: answer === 'Yes' }))}>{answer}</button>)}</div></fieldset>)}</div>
    <div className={`${card} mt-5`} aria-live="polite"><h3 className="font-semibold">Plan readiness: {ready} of {planChecks.length} details confirmed ({Math.round(ready / planChecks.length * 100)}%)</h3><p className="mt-1 leading-7">{missing.length ? 'Prepare or confirm these details before sharing the plan:' : 'All listed details are marked ready. Note any uncertain measurements separately.'}</p>{missing.length > 0 && <ul className="mt-2 list-disc space-y-1 pl-5">{missing.map((item) => <li key={item}>{item}</li>)}</ul>}</div>
    <button type="button" className={`${control} mt-4`} onClick={copyChecklist}>Copy plan checklist</button><span className="ml-3 text-sm" aria-live="polite">{copied ? 'Checklist copied.' : ''}</span>
  </section>;
}
