'use client';

import { useState } from 'react';
import { MapPin, Globe, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { whatsappLink } from '@/lib/services-data';

type Format = { id: string; label: string; title: string; text: string };

export function FormatToggle({ formats }: { formats: ReadonlyArray<Format> }) {
  const [selected, setSelected] = useState(formats[0].id);
  const active = formats.find((item) => item.id === selected) ?? formats[0];
  const Icon = active.id === 'on-site' ? MapPin : Globe;

  return (
    <div className="paper-card p-6 md:p-10">
      <div role="radiogroup" aria-label="Consultation format" className="inline-flex w-full flex-col gap-2 rounded border border-border bg-secondary p-1.5 sm:w-auto sm:flex-row">
        {formats.map((item) => {
          const isSelected = item.id === selected;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(item.id)}
              className={cn(
                'rounded px-5 py-3 text-[17px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                isSelected ? 'border border-border bg-card text-primary' : 'border border-transparent text-foreground/85 hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex gap-5" aria-live="polite">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary text-primary">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-headline text-2xl font-semibold">{active.title}</h3>
          <p className="mt-3 text-[17px] leading-[29px] text-foreground/85">{active.text}</p>
          <a
            href={whatsappLink(`Hello, I would like to ask about an ${active.label.toLowerCase()} consultation.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center rounded text-[17px] font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            Ask which format suits my property
          </a>
        </div>
      </div>
    </div>
  );
}
