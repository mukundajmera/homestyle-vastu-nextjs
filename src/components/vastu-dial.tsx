'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { cn } from '@/lib/utils';
import { whatsappLink } from '@/lib/services-data';
import { vastuDirections } from '@/lib/vastu-directions';

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

function snapToDirection(angle: number) {
  return Math.round(angle / 45) % vastuDirections.length;
}

export function VastuDial() {
  const [lockedIndex, setLockedIndex] = useState(1); // North-East is the initial selection.
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(1);
  const [announcement, setAnnouncement] = useState('');
  const svgRef = useRef<SVGSVGElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const focusRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const previewIndexRef = useRef<number | null>(null);
  const lockedIndexRef = useRef(1);
  const pointerAngleRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const lastPointerTypeRef = useRef<string | null>(null);

  const visibleIndex = previewIndex ?? lockedIndex;
  const direction = vastuDirections[visibleIndex];
  const isPreviewing = previewIndex !== null;

  function setNeedleAngle(angle: number) {
    needleRef.current?.setAttribute('transform', `rotate(${angle} 160 160)`);
  }

  function lockDirection(index: number) {
    const lockedDirection = vastuDirections[index];
    lockedIndexRef.current = index;
    pointerAngleRef.current = null;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    previewIndexRef.current = null;
    setPreviewIndex(null);
    setLockedIndex(index);
    setAnnouncement(`${lockedDirection.name} selected. ${lockedDirection.theme}. ${lockedDirection.question}`);
    setNeedleAngle(lockedDirection.angle);
  }

  function pointToDirection(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const bounds = svg.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return null;

    const x = ((clientX - bounds.left) / bounds.width) * 320;
    const y = ((clientY - bounds.top) / bounds.height) * 320;
    const dx = x - 160;
    const dy = y - 160;
    if (Math.hypot(dx, dy) > 150) return null;

    const angle = (Math.atan2(dx, -dy) * 180) / Math.PI;
    return { angle: (angle + 360) % 360, index: snapToDirection((angle + 360) % 360) };
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    lastPointerTypeRef.current = event.pointerType;
    if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;

    const point = pointToDirection(event.clientX, event.clientY);
    if (!point) {
      clearPreview();
      return;
    }
    pointerAngleRef.current = point.angle;
    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      if (pointerAngleRef.current === null) return;
      setNeedleAngle(pointerAngleRef.current);
      const nextPreview = snapToDirection(pointerAngleRef.current);
      if (previewIndexRef.current !== nextPreview) {
        previewIndexRef.current = nextPreview;
        setPreviewIndex(nextPreview);
      }
    });
  }

  function clearPreview() {
    pointerAngleRef.current = null;
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    previewIndexRef.current = null;
    setPreviewIndex(null);
    setNeedleAngle(vastuDirections[lockedIndexRef.current].angle);
  }

  function handlePointerLeave() {
    clearPreview();
  }

  function handlePointerUp(event: PointerEvent<SVGSVGElement>) {
    lastPointerTypeRef.current = event.pointerType;
    if (event.pointerType === 'touch') {
      const point = pointToDirection(event.clientX, event.clientY);
      if (point) lockDirection(point.index);
    }
  }

  function handleClick(event: MouseEvent<SVGSVGElement>) {
    if (lastPointerTypeRef.current === 'touch') {
      lastPointerTypeRef.current = null;
      return;
    }
    const point = pointToDirection(event.clientX, event.clientY);
    if (point) lockDirection(point.index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') nextIndex = (index + 1) % vastuDirections.length;
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') nextIndex = (index - 1 + vastuDirections.length) % vastuDirections.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = vastuDirections.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setFocusedIndex(nextIndex);
    focusRefs.current[nextIndex]?.focus();
  }

  useEffect(() => () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <div className="paper-card relative overflow-hidden rounded-[1.25rem] p-4 sm:p-6">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <svg
          ref={svgRef}
          aria-hidden="true"
          viewBox="0 0 320 320"
          className="relative block h-auto w-full touch-manipulation"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerUp={handlePointerUp}
          onClick={handleClick}
        >
          <circle cx="160" cy="160" r="150" stroke="#C86142" strokeOpacity=".35" strokeWidth="1" />
          <circle cx="160" cy="160" r="128" stroke="#C86142" strokeOpacity=".5" strokeWidth="1.25" />
          <circle cx="160" cy="160" r="104" stroke="#4A5D4E" strokeOpacity=".4" strokeWidth="1" strokeDasharray="2 5" />

          <path data-direction={direction.name} d={sectorPath(direction.angle)} fill="#D97706" fillOpacity=".18" className="motion-safe:transition-all motion-safe:duration-500" />

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

          {vastuDirections.map(({ label, angle }, i) => {
            const p = polar(angle, 141);
            const cardinal = label.length === 1;
            const isSelected = i === visibleIndex;
            return (
              <g key={label}>
                <circle cx={p.x} cy={p.y} r="15" fill={isSelected ? '#C86142' : '#FFFFFF'} stroke="#C86142" strokeOpacity=".4" className="motion-safe:transition-colors motion-safe:duration-300" />
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

          <g ref={needleRef} transform={`rotate(${vastuDirections[lockedIndex].angle} 160 160)`} className="dial-needle !animate-none" aria-hidden="true">
            <path d="M160 52L168 160L160 150L152 160L160 52Z" fill="#B05A07" />
            <path d="M160 268L152 160L160 170L168 160L160 268Z" fill="#4A5D4E" fillOpacity=".75" />
          </g>
          <circle cx="160" cy="160" r="5" fill="#2B2623" />
        </svg>

        <div className="relative mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8" role="group" aria-label="Choose a compass direction">
          {vastuDirections.map(({ label, name }, i) => (
            <button
              key={label}
              ref={(element) => { focusRefs.current[i] = element; }}
              type="button"
              onClick={() => lockDirection(i)}
              onFocus={() => setFocusedIndex(i)}
              onKeyDown={(event) => handleKeyDown(event, i)}
              tabIndex={i === focusedIndex ? 0 : -1}
              aria-pressed={i === lockedIndex}
              aria-label={`${label} ${name}`}
              className={cn(
                'rounded-md border py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                i === lockedIndex ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white text-foreground hover:border-accent hover:text-terracotta-ink'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="relative mt-4 rounded-lg bg-secondary/70 p-4">
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-terracotta-ink">{direction.name} side</p>
          <p className="mt-1 font-semibold text-foreground">{direction.theme}</p>
          <p className="mt-1 leading-7 text-foreground">{direction.question}</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{direction.note}</p>
          <p className="mt-2 text-sm text-foreground">{isPreviewing ? `Previewing ${direction.name}. Click or tap to lock this direction.` : `Selected ${direction.name}. Move over the compass to preview another direction.`}</p>
          <a
            href={whatsappLink(`Hello, I would like to ask about the ${direction.name} side of my property.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Ask about the {direction.name} side
          </a>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      </div>
      <figcaption className="sr-only">Illustrative compass and nine-zone grid. The highlighted sector and text identify the preview or selected direction. Not a property drawing.</figcaption>
    </figure>
  );
}
