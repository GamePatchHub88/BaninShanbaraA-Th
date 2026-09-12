export function OrnamentDivider() {
  return (
    <svg
      className="ornament-divider"
      viewBox="0 0 240 24"
      width="240"
      height="24"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="96" y2="12" stroke="currentColor" strokeWidth="1" />
      <polygon
        points="120,2 128,12 120,22 112,12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="120" cy="12" r="2.4" fill="currentColor" />
      <line x1="144" y1="12" x2="240" y2="12" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function CornerMotif({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
      <path
        d="M2 2 L2 40 M2 2 L40 2"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M2 2 Q 2 30 30 30"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <polygon
        points="14,14 20,8 26,14 20,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
