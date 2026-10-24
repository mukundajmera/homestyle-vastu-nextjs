'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export type JourneyStep = { step: string; title: string; text: string };

export function JourneyStepper({ steps }: { steps: JourneyStep[] }) {
  const [current, setCurrent] = useState(0);
  const active = steps[current];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      <ol className="grid gap-3" aria-label="Consultation steps">
        {steps.map((item, i) => {
          const done = i < current;
          const selected = i === current;
          return (
            <li key={item.step}>
              <button
                type="button"
                onClick={() => setCurrent(i)}
                aria-current={selected ? 'step' : undefined}
                className={cn(
                  'flex w-full items-center gap-4 rounded border px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  selected ? 'border-primary bg-card' : 'border-transparent bg-transparent hover:border-border hover:bg-card/70'
                )}
              >
                <span
                  className={cn(
                    'grid h-11 w-11 shrink-0 place-items-center rounded font-headline text-lg font-semibold transition-colors',
                    selected ? 'bg-primary text-primary-foreground' : done ? 'bg-sage text-white' : 'bg-secondary text-primary'
                  )}
                  aria-hidden="true"
                >
                  {item.step}
                </span>
                <span className={cn('text-[17px] font-semibold', selected ? 'text-foreground' : 'text-foreground/85')}>{item.title}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="paper-card relative overflow-hidden p-8 md:p-10" aria-live="polite">
        <div className="absolute inset-x-0 top-0 h-1 bg-secondary" aria-hidden="true">
          <div
            className="h-full bg-gradient-to-r from-accent to-primary transition-all duration-500"
            style={{ width: `${((current + 1) / steps.length) * 100}%` }}
          />
        </div>
        <p className="eyebrow mb-3">
          Step {active.step} of {steps.length.toString().padStart(2, '0')}
        </p>
        <h3 className="font-headline text-2xl font-semibold md:text-3xl">{active.title}</h3>
        <p className="mt-4 text-[17px] leading-[29px] text-foreground/85">{active.text}</p>
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="rounded-md px-3 py-2 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-40 disabled:no-underline"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            disabled={current === steps.length - 1}
            className="rounded-md bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next step
          </button>
        </div>
      </div>
    </div>
  );
}
