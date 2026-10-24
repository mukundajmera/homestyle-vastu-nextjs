'use client';

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
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

/** The needle can turn at most this far from the locked direction, so a drag only reaches neighbouring zones. */
const MAX_TURN = 45;
/** Movement below this (degrees) counts as a tap rather than a drag. */
const TAP_THRESHOLD = 4;
/** Distance from the centre (in SVG units) that still counts as touching the dial. */
const DIAL_RADIUS = 150;

type DragState = { pointerId: number; startAngle: number; needleAngle: number; moved: boolean };

function normaliseAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

/** Shortest signed difference between two angles, from -180 to 180 degrees. */
function signedDelta(angle: number, from: number) {
  return ((angle - from + 540) % 360) - 180;
}

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value));
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
  const dragRef = useRef<DragState | null>(null);

  const visibleIndex = previewIndex ?? lockedIndex;
  const direction = vastuDirections[visibleIndex];
  const isPreviewing = previewIndex !== null;

  function setNeedleAngle(angle: number) {
    needleRef.current?.setAttribute('transform', `rotate(${angle} 160 160)`);
  }

  function setPreview(index: number | null) {
    if (previewIndexRef.current === index) return;
    previewIndexRef.current = index;
    setPreviewIndex(index);
  }

  function lockDirection(index: number) {
    const lockedDirection = vastuDirections[index];
    lockedIndexRef.current = index;
    dragRef.current = null;
    previewIndexRef.current = null;
    setPreviewIndex(null);
    setLockedIndex(index);
    setAnnouncement(`${lockedDirection.name} selected. ${lockedDirection.theme}. ${lockedDirection.question}`);
    setNeedleAngle(lockedDirection.angle);
  }

  /** Abandons a drag and returns the needle to the locked direction. */
  function cancelDrag() {
    dragRef.current = null;
    setPreview(null);
    setNeedleAngle(vastuDirections[lockedIndexRef.current].angle);
  }

  function pointerAngleAt(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return null;
    const bounds = svg.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return null;

    const dx = ((clientX - bounds.left) / bounds.width) * 320 - 160;
    const dy = ((clientY - bounds.top) / bounds.height) * 320 - 160;
    return { angle: normaliseAngle((Math.atan2(dx, -dy) * 180) / Math.PI), distance: Math.hypot(dx, dy) };
  }

  function handlePointerDown(event: PointerEvent<SVGSVGElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    const point = pointerAngleAt(event.clientX, event.clientY);
    if (!point || point.distance > DIAL_RADIUS) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startAngle: point.angle,
      needleAngle: vastuDirections[lockedIndexRef.current].angle,
      moved: false,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    // Hovering without a pressed pointer does nothing: only an active drag moves the needle.
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const point = pointerAngleAt(event.clientX, event.clientY);
    if (!point) return;

    const lockedAngle = vastuDirections[lockedIndexRef.current].angle;
    const turn = clamp(signedDelta(point.angle, drag.startAngle), MAX_TURN);
    if (Math.abs(turn) >= TAP_THRESHOLD) drag.moved = true;
    drag.needleAngle = normaliseAngle(lockedAngle + turn);
    setNeedleAngle(drag.needleAngle);
    setPreview(drag.moved ? snapToDirection(drag.needleAngle) : null);
  }

  function handlePointerUp(event: PointerEvent<SVGSVGElement>) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (drag.moved) {
      lockDirection(snapToDirection(drag.needleAngle));
      return;
    }

    // A tap without a drag locks the direction under the finger or pointer.
    const point = pointerAngleAt(event.clientX, event.clientY);
    if (point && point.distance <= DIAL_RADIUS) lockDirection(snapToDirection(point.angle));
    else cancelDrag();
  }

  function handlePointerCancel(event: PointerEvent<SVGSVGElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    cancelDrag();
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

  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <div className="paper-card relative overflow-hidden rounded-[1.25rem] p-4 sm:p-6">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <svg
          ref={svgRef}
          aria-hidden="true"
          viewBox="0 0 320 320"
          className="relative block h-auto w-full touch-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
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
          <p className="mt-2 text-sm text-foreground">{isPreviewing ? `Previewing ${direction.name}. Release to lock this direction.` : `Selected ${direction.name}. Press and drag the needle a little, or choose a button below, to pick another direction.`}</p>
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
