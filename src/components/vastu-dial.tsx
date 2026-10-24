'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { whatsappLink } from '@/lib/services-data';
import { PERSON_NAME } from '@/lib/site';

const DIRECTIONS = [
  { label: 'N', name: 'North', angle: 0 },
  { label: 'NE', name: 'North-East', angle: 45 },
  { label: 'E', name: 'East', angle: 90 },
  { label: 'SE', name: 'South-East', angle: 135 },
  { label: 'S', name: 'South', angle: 180 },
  { label: 'SW', name: 'South-West', angle: 225 },
  { label: 'W', name: 'West', angle: 270 },
  { label: 'NW', name: 'North-West', angle: 315 },
];

/** Rounded so server and client render identical SVG attributes (avoids hydration drift). */
function round(value: number) {
  return Math.round(value * 100) / 100;
}

function polar(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: round(160 + radius * Math.cos(rad)), y: round(160 + radius * Math.sin(rad)) };
}

/** Wedge covering one of the eight directions, centred on its angle. */
function sectorPath(angle: number) {
  const start = polar(angle - 22.5, 128);
  const end = polar(angle + 22.5, 128);
  return `M160 160L${start.x} ${start.y}A128 128 0 0 1 ${end.x} ${end.y}Z`;
}

export function VastuDial() {
  const [selected, setSelected] = useState(1); // North-East is the default focus
  const direction = DIRECTIONS[selected];

  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <div className="paper-card relative overflow-hidden rounded-[1.25rem] p-4 sm:p-6">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <svg aria-hidden="true" viewBox="0 0 320 320" className="relative block h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="160" cy="160" r="150" stroke="#C86142" strokeOpacity=".35" strokeWidth="1" />
          <circle cx="160" cy="160" r="128" stroke="#C86142" strokeOpacity=".5" strokeWidth="1.25" />
          <circle cx="160" cy="160" r="104" stroke="#4A5D4E" strokeOpacity=".4" strokeWidth="1" strokeDasharray="2 5" />

          <path d={sectorPath(direction.angle)} fill="#D97706" fillOpacity=".18" className="transition-all duration-500" />

          {Array.from({ length: 72 }).map((_, i) => {
            const major = i % 9 === 0;
            const a = polar(i * 5, 128);
            const b = polar(i * 5, major ? 118 : 123);
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#C86142" strokeOpacity={major ? 0.9 : 0.4} strokeWidth={major ? 1.5 : 1} />;
          })}

          <g stroke="#C86142" strokeOpacity=".5" strokeWidth="1">
            <rect x="100" y="100" width="120" height="120" fill="#FFFFFF" fillOpacity=".7" />
            <path d="M140 100V220M180 100V220M100 140H220M100 180H220" />
          </g>

          {DIRECTIONS.map(({ label, angle }, i) => {
            const p = polar(angle, 141);
            const cardinal = label.length === 1;
            const isSelected = i === selected;
            return (
              <g key={label}>
                <circle cx={p.x} cy={p.y} r="15" fill={isSelected ? '#C86142' : '#FFFFFF'} stroke="#C86142" strokeOpacity=".4" className="transition-colors duration-300" />
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={cardinal ? 14 : 12}
                  fontWeight={700}
                  letterSpacing="0.04em"
                  fill={isSelected ? '#FFFFFF' : cardinal ? '#2B2623' : '#7A3219'}
                  fontFamily="var(--font-body), sans-serif"
                >
                  {label}
                </text>
              </g>
            );
          })}

          <g className="dial-needle">
            <path d="M160 52L168 160L160 150L152 160L160 52Z" fill="#B05A07" />
            <path d="M160 268L152 160L160 170L168 160L160 268Z" fill="#4A5D4E" fillOpacity=".75" />
          </g>
          <circle cx="160" cy="160" r="5" fill="#2B2623" />
        </svg>

        <div className="relative mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {DIRECTIONS.map(({ label, name }, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={i === selected}
              aria-label={`${label} ${name}`}
              className={cn(
                'rounded-md border py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                i === selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white text-foreground hover:border-accent hover:text-terracotta-ink'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-4 rounded-lg bg-secondary/70 p-4" aria-live="polite">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-terracotta-ink">{direction.name} side</p>
          <p className="mt-1 leading-7 text-foreground">
            Select a direction to see the question it prompts. Ask about this side of your property in a conversation with {PERSON_NAME}.
          </p>
          <a
            href={whatsappLink(`Hello, I would like to ask about the ${direction.name} side of my property.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Ask about the {direction.name} side
          </a>
        </div>
      </div>
      <figcaption className="sr-only">An illustrative compass and nine-zone grid. Not a property drawing.</figcaption>
    </figure>
  );
}
