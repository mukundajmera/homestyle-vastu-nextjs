'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { propertyServices, whatsappLink } from '@/lib/services-data';
import { Button } from '@/components/ui/button';

export function PropertyExplorer() {
  const [activeId, setActiveId] = useState(propertyServices[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const index = propertyServices.findIndex((item) => item.id === activeId);
  const active = propertyServices[index];
  const Icon = active.icon;

  function selectByOffset(offset: number, focus = true) {
    const next = (index + offset + propertyServices.length) % propertyServices.length;
    setActiveId(propertyServices[next].id);
    if (focus) tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      selectByOffset(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      selectByOffset(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      selectByOffset(-index);
    } else if (event.key === 'End') {
      event.preventDefault();
      selectByOffset(propertyServices.length - 1 - index);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
      <div role="tablist" aria-label="Property types" aria-orientation="vertical" className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {propertyServices.map((item, i) => {
          const selected = item.id === activeId;
          const ItemIcon = item.icon;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="property-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={onKeyDown}
              className={cn(
                'group flex shrink-0 items-center gap-3 rounded border px-4 py-3 text-left text-[17px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                selected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-secondary/40'
              )}
            >
              <span
                className={cn(
                  'grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors',
                  selected ? 'bg-white/15 text-white' : 'bg-secondary text-primary group-hover:bg-accent/10'
                )}
              >
                <ItemIcon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap">{item.tab}</span>
            </button>
          );
        })}
      </div>

      <div
        id="property-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active.id}`}
        tabIndex={0}
        className="paper-card flex flex-col p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:p-10"
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-primary">
            <Icon className="h-7 w-7" aria-hidden="true" />
          </span>
          <span className="tag-pill">{active.tag}</span>
        </div>
        <h3 className="font-headline text-2xl font-semibold md:text-3xl">{active.title}</h3>
        <p className="mt-3 text-[17px] font-semibold leading-[29px] text-terracotta-ink">{active.lead}</p>
        <p className="mt-4 leading-[29px] text-foreground/85">{active.text}</p>

        <div className="mt-6 rounded border border-dashed border-border bg-secondary p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.09em] text-foreground/70">Helpful to have ready</p>
          <p className="mt-1 leading-[29px] text-foreground">{active.bring}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 px-6 font-semibold">
            <a href={whatsappLink(`Hello, I would like to ask about ${active.title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              Ask about this
            </a>
          </Button>
          <Link
            href={`/services#${active.id}`}
            className="inline-flex h-12 items-center justify-center rounded-md px-4 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Full details <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
