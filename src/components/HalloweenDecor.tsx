/** Telarañas fijas en las esquinas. No se animan, así que valen con reduced-motion. */
export default function HalloweenDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      <Cobweb className="cobweb absolute -top-1 -left-1 w-20 h-20 sm:w-28 sm:h-28" />
      <Cobweb className="cobweb absolute -top-1 -right-1 w-20 h-20 sm:w-28 sm:h-28 -scale-x-100" />
      <Cobweb className="cobweb absolute -bottom-2 -left-1 w-16 h-16 sm:w-24 sm:h-24 -scale-y-100 opacity-70" />
      <Cobweb className="cobweb absolute -bottom-2 -right-1 w-16 h-16 sm:w-24 sm:h-24 -scale-x-100 -scale-y-100 opacity-70" />
    </div>
  );
}

function Cobweb({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M4 4 L96 28 M4 4 L78 96 M4 4 L40 96 M4 4 L96 62" />
      <path d="M18 10 Q40 22 28 46 Q18 28 18 10" />
      <path d="M32 14 Q58 30 46 58" />
      <path d="M48 18 Q74 36 70 64" />
    </svg>
  );
}
