/**
 * Neutral product mark (not the Snowflake trademark logo).
 */
export function ProductMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`text-sf-primary ${className}`}
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="38" height="38" rx="8" className="stroke-slate-200" strokeWidth="1" fill="white" />
      <path d="M12 20h16M20 12v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}
