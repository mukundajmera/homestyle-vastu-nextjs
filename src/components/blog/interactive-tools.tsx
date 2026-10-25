'use client';

import { useState } from 'react';

const control = 'min-h-11 rounded border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function CompareTool() {
  const topics = {
    Entrance: ['A Vastu discussion may consider the entrance direction, its position on the wall and the approach.', 'A Feng Shui discussion may consider the door, the way into the home and how the space is read within a chosen school.', 'Which direction reading and entrance details are measured or still uncertain?'],
    Kitchen: ['Traditional Vastu interpretations may discuss the kitchen location and the relationship between cooking and water areas.', 'Feng Shui interpretations may consider the kitchen within the wider layout and the arrangement of its working area.', 'Which services and appliance positions cannot be changed safely?'],
    Bedroom: ['A Vastu discussion may consider the bedroom location and its relationship to the rest of the plan.', 'A Feng Shui discussion may consider the bedroom arrangement within its chosen school and the room’s use.', 'What room dimensions, openings and fixed features shape the available options?'],
    'Plot shape': ['Traditional Vastu may consider the plot outline, proportions, orientation and approach.', 'Feng Shui may consider the form of the site and its surroundings using the selected method.', 'Do the surveyed boundary and dimensions match the plan?']
  } as const;
  const [topic, setTopic] = useState<keyof typeof topics>('Entrance');
  const selected = topics[topic];
  return <section aria-labelledby="compare-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="compare-tool-title" className="font-headline text-2xl font-semibold">Compare by topic</h2>
    <div className="mt-4 flex flex-wrap gap-2" aria-label="Comparison topic">
      {Object.keys(topics).map((item) => <button key={item} type="button" className={control} aria-pressed={topic === item} onClick={() => setTopic(item as keyof typeof topics)}>{item}</button>)}
    </div>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-background p-4"><h3 className="font-semibold">Vastu Shastra perspective</h3><p className="mt-2 text-base leading-7">{selected[0]}</p></div>
      <div className="rounded-lg border border-border bg-background p-4"><h3 className="font-semibold">Feng Shui perspective</h3><p className="mt-2 text-base leading-7">{selected[1]}</p></div>
    </div>
    <p className="mt-4 text-base leading-7"><strong>Ask a consultant:</strong> {selected[2]}</p>
  </section>;
}

const groups = {
  'Legal and boundary': ['Title and ownership records reviewed by a lawyer', 'Permitted land use and approvals checked', 'Surveyed boundary points match the documents'],
  'Access and drainage': ['Road access and width recorded', 'Levels and low points noted', 'Drainage and soil questions raised with a qualified professional'],
  'Traditional Vastu preferences': ['North direction source recorded', 'Plot sides, shape and proportions measured', 'Approach road and entrances marked', 'Building needs and fixed constraints written down']
};
export function PlotChecklistTool() {
  const [checked, setChecked] = useState<string[]>([]);
  const all = Object.values(groups).flat();
  const message = `Plot readiness notes:\n${all.filter((item) => checked.includes(item)).map((item) => `- ${item}`).join('\n') || '- No items selected yet'}`;
  return <section aria-labelledby="plot-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="plot-tool-title" className="font-headline text-2xl font-semibold">Plot readiness checklist</h2>
    <div className="mt-4" role="group" aria-label="Checklist progress"><div className="flex justify-between text-sm font-semibold"><span>{checked.length} of {all.length} items checked</span><span>{Math.round(checked.length / all.length * 100)}%</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-sage transition-[width] motion-reduce:transition-none" style={{ width: `${checked.length / all.length * 100}%` }} /></div></div>
    {Object.entries(groups).map(([group, items]) => <fieldset key={group} className="mt-5"><legend className="font-semibold">{group}</legend><div className="mt-2 grid gap-2 sm:grid-cols-2">{items.map((item) => <label key={item} className="flex min-h-11 items-start gap-3 rounded border border-border bg-background p-3 text-base leading-6"><input className="mt-1 h-4 w-4 accent-primary" type="checkbox" checked={checked.includes(item)} onChange={(event) => setChecked(event.target.checked ? [...checked, item] : checked.filter((value) => value !== item))} />{item}</label>)}</div></fieldset>)}
    <a className={`${control} mt-5 inline-flex items-center`} href={`https://wa.me/919828088678?text=${encodeURIComponent(message)}`} target="_blank" rel="noopener noreferrer">Share checked items on WhatsApp</a>
  </section>;
}

const compass = [
  ['N', 'A traditional reading may consider the northern approach in relation to the full plan.'], ['NE', 'A traditional reading may discuss this zone in the context of the whole home.'], ['E', 'A traditional reading may consider the eastern wall and the entrance position.'], ['SE', 'A traditional reading may discuss this area alongside the room layout.'], ['S', 'A traditional reading may consider the southern approach in its chosen method.'], ['SW', 'A traditional reading may discuss this zone in relation to adjoining spaces.'], ['W', 'A traditional reading may consider the western wall and the approach.'], ['NW', 'A traditional reading may discuss this area within the complete plan.']
] as const;
export function EntranceExplorerTool() {
  const [direction, setDirection] = useState('N');
  const current = compass.find(([point]) => point === direction)?.[1];
  return <section aria-labelledby="entrance-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="entrance-tool-title" className="font-headline text-2xl font-semibold">Entrance direction explorer</h2>
    <p className="mt-2 text-base leading-7">Choose the wall your main entrance faces. This describes a traditional consideration, not a verdict.</p>
    <div role="group" aria-label="Entrance direction" className="mx-auto mt-5 grid max-w-sm grid-cols-4 gap-2">{compass.map(([point]) => <button key={point} type="button" className={control} aria-pressed={direction === point} onClick={() => setDirection(point)}>{point}</button>)}</div>
    <p className="mt-5 text-base leading-7"><strong>{direction}:</strong> {current}</p>
    <div className="mt-4 rounded-lg border border-border bg-background p-4"><h3 className="font-semibold">Practical checks</h3><p className="mt-2 text-base leading-7">Check ventilation, clear access, lighting and safe entry at the doorway. Note steps, door swing, visibility and any obstruction; ask a qualified professional about building or electrical changes.</p></div>
    <div className="mt-4 rounded-lg border border-border bg-background p-4"><h3 className="font-semibold">Kitchen question</h3><p className="mt-2 text-base leading-7">Where are the sink and cooktop in relation to each other? Check that the kitchen has working ventilation, safe appliance clearances and practical access to water and power before considering any change.</p></div>
  </section>;
}

const planChecks = ['North is marked and its source is noted', 'All relevant floors are included', 'Outside and room dimensions are shown', 'Every room has a clear label', 'Entrances, doors, windows and fixed features are marked', 'Scale is shown or the plan is labelled not to scale', 'Questions are written down'];
export function PlanReadinessTool() {
  const [answers, setAnswers] = useState<Record<string, boolean | undefined>>({});
  const missing = planChecks.filter((item) => answers[item] !== true);
  return <section aria-labelledby="plan-tool-title" className="paper-card my-10 rounded-xl border border-border p-5 sm:p-7">
    <h2 id="plan-tool-title" className="font-headline text-2xl font-semibold">Plan readiness check</h2>
    <p className="mt-2 text-base leading-7">Mark each item yes or no. Unanswered items will also appear in the preparation list.</p>
    <div className="mt-4 space-y-3">{planChecks.map((item) => <fieldset key={item} className="flex flex-wrap items-center justify-between gap-2 rounded border border-border bg-background p-3"><legend className="sr-only">{item}</legend><span className="min-w-0 flex-1 text-base leading-6">{item}</span><div className="flex gap-2">{(['Yes', 'No'] as const).map((answer) => <button key={answer} type="button" className={control} aria-pressed={answers[item] === (answer === 'Yes')} onClick={() => setAnswers({ ...answers, [item]: answer === 'Yes' })}>{answer}</button>)}</div></fieldset>)}</div>
    <div className="mt-5 rounded-lg border border-border bg-background p-4" aria-live="polite"><h3 className="font-semibold">{missing.length ? 'Items to prepare or confirm' : 'Your plan checklist is complete'}</h3>{missing.length ? <ul className="mt-2 list-disc pl-5">{missing.map((item) => <li key={item}>{item}</li>)}</ul> : <p className="mt-2">All listed items are marked yes. You can still note uncertainties alongside the plan.</p>}</div>
  </section>;
}
