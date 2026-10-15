interface SignalFallbackProps {
  title?: string;
  detail?: string;
}

/** Carta retro cuando no hay archivo o el video no carga. */
export default function SignalFallback({ title, detail }: SignalFallbackProps) {
  return (
    <div className="absolute inset-0 z-10 tv-static">
      <div className="absolute inset-0 flex items-center justify-center p-6 pb-16">
        <div
          className="max-w-md text-center rounded-lg px-6 py-5"
          style={{ background: "rgba(0,0,0,0.78)", border: "1px solid rgba(255,255,255,0.28)" }}
        >
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-white/80 mb-2">Retro Toon</p>
          <p className="text-2xl sm:text-3xl font-black text-white leading-tight">Señal no disponible</p>
          {title && <p className="mt-3 text-sm font-semibold text-white/90">{title}</p>}
          <p className="mt-2 text-xs text-white/75">
            {detail ?? "Este horario todavía no tiene un video cargado."}
          </p>
        </div>
      </div>
    </div>
  );
}
