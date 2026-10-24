export function BrandMark({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14.5" stroke="#C86142" strokeWidth="1.5" />
      <rect x="9" y="9" width="14" height="14" stroke="#2B2623" strokeWidth="1.5" />
      <path d="M16 9V23M9 16H23" stroke="#2B2623" strokeWidth="1" strokeOpacity=".5" />
      <rect x="16" y="9" width="7" height="7" fill="#D97706" />
    </svg>
  );
}
