const DIRECTIONS = [
  { label: 'N', angle: 0 },
  { label: 'NE', angle: 45 },
  { label: 'E', angle: 90 },
  { label: 'SE', angle: 135 },
  { label: 'S', angle: 180 },
  { label: 'SW', angle: 225 },
  { label: 'W', angle: 270 },
  { label: 'NW', angle: 315 },
];

function polar(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: 160 + radius * Math.cos(rad), y: 160 + radius * Math.sin(rad) };
}

export function VastuDial() {
  return (
    <figure className="relative mx-auto w-full max-w-[30rem]">
      <div className="paper-card relative overflow-hidden rounded-[1.25rem] p-4 sm:p-6">
        <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
        <svg
          aria-hidden="true"
          viewBox="0 0 320 320"
          className="relative block h-auto w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="160" cy="160" r="150" stroke="#C86142" strokeOpacity=".35" strokeWidth="1" />
          <circle cx="160" cy="160" r="128" stroke="#C86142" strokeOpacity=".5" strokeWidth="1.25" />
          <circle cx="160" cy="160" r="104" stroke="#4A5D4E" strokeOpacity=".4" strokeWidth="1" strokeDasharray="2 5" />

          {Array.from({ length: 72 }).map((_, i) => {
            const major = i % 9 === 0;
            const a = polar(i * 5, 128);
            const b = polar(i * 5, major ? 118 : 123);
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="#C86142"
                strokeOpacity={major ? 0.9 : 0.4}
                strokeWidth={major ? 1.5 : 1}
              />
            );
          })}

          {/* nine-zone grid at the centre */}
          <g stroke="#C86142" strokeOpacity=".5" strokeWidth="1">
            <rect x="100" y="100" width="120" height="120" fill="#FFFFFF" fillOpacity=".7" />
            <path d="M140 100V220M180 100V220M100 140H220M100 180H220" />
          </g>
          <rect x="140" y="140" width="40" height="40" fill="#D97706" fillOpacity=".22" stroke="#D97706" strokeWidth="1.5" />
          <rect x="180" y="100" width="40" height="40" fill="#4A5D4E" fillOpacity=".16" />
          <rect x="100" y="180" width="40" height="40" fill="#C86142" fillOpacity=".14" />

          {DIRECTIONS.map(({ label, angle }) => {
            const p = polar(angle, 141);
            const cardinal = label.length === 1;
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={cardinal ? 11 : 9}
                fontWeight={cardinal ? 700 : 600}
                letterSpacing="0.08em"
                fill={cardinal ? '#2B2623' : '#9E4225'}
                fontFamily="var(--font-body), sans-serif"
              >
                {label}
              </text>
            );
          })}

          <g className="dial-needle">
            <path d="M160 52L168 160L160 150L152 160L160 52Z" fill="#B05A07" />
            <path d="M160 268L152 160L160 170L168 160L160 268Z" fill="#4A5D4E" fillOpacity=".75" />
          </g>
          <circle cx="160" cy="160" r="5" fill="#2B2623" />
        </svg>
        <div className="relative mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border/70 pt-3 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          <span>Illustrative direction dial</span>
          <span className="rounded bg-sage/10 px-2 py-1 text-sage">North-East / Ishanya</span>
        </div>
      </div>
      <figcaption className="sr-only">An abstract compass and nine-zone grid illustration, not a property drawing.</figcaption>
    </figure>
  );
}

export function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14.5" stroke="#C86142" strokeWidth="1.5" />
      <rect x="9" y="9" width="14" height="14" stroke="#2B2623" strokeWidth="1.5" />
      <path d="M16 9V23M9 16H23" stroke="#2B2623" strokeWidth="1" strokeOpacity=".5" />
      <rect x="16" y="9" width="7" height="7" fill="#D97706" />
    </svg>
  );
}
