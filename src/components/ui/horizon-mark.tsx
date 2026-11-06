export function HorizonMark({ className }: { className?: string }) {
  return <svg className={`horizon-mark ${className ?? ''}`} viewBox="0 0 600 600" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" focusable="false">
    <circle cx="300" cy="300" r="284" />
    <path d="M16 300h568M16 318c161 10 278 83 550 60M84 490c149-101 285-126 490-117M238 300a62 62 0 0 1 124 0" />
    <circle cx="300" cy="300" r="246" strokeDasharray="2 12" opacity=".5" />
  </svg>;
}
