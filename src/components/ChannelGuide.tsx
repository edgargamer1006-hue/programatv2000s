import { useEffect, useRef, useState } from "react";
import { Check, Play, Film, Tv, Sparkles, X, Star } from "lucide-react";
import type { Program, MonthTheme } from "../types";
import { seenKey } from "../lib/scheduler";
import { formatHourLabel, formatMexicoDate, formatMinute12 } from "../lib/mexico-time";
import MexicoClock from "./MexicoClock";

interface ChannelGuideProps {
  theme: MonthTheme;
  now: Date;
  minuteOfDay: number;
  seenPrograms: Set<string>;
  onToggleSeen: (id: string) => void;
  onSelectProgram: (program: Program) => void;
  currentProgramId: string | null;
}

const RATING_COLORS: Record<string, string> = {
  "TV-Y": "#22c55e",
  "TV-Y7": "#3b82f6",
  "TV-G": "#22c55e",
  "TV-PG": "#eab308",
  "TV-14": "#f97316",
  "TV-MA": "#ef4444",
  PG: "#eab308",
  G: "#22c55e",
};

const PX_PER_HOUR = 120;

export default function ChannelGuide({
  theme,
  now,
  minuteOfDay,
  seenPrograms,
  onToggleSeen,
  onSelectProgram,
  currentProgramId,
}: ChannelGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  const programs = theme.programs;
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = Math.floor(minuteOfDay / 60);

  useEffect(() => {
    if (!isOpen || !bodyScrollRef.current) return;
    const scrollTarget = Math.max(0, (currentHour - 2) * PX_PER_HOUR);
    bodyScrollRef.current.scrollLeft = scrollTarget;
    if (headerScrollRef.current) headerScrollRef.current.scrollLeft = scrollTarget;
  }, [isOpen, currentHour]);

  const categoryIcon = (cat: string) => {
    if (cat === "Película") return <Film size={12} aria-hidden="true" />;
    if (cat === "Especial") return <Sparkles size={12} aria-hidden="true" />;
    return <Tv size={12} aria-hidden="true" />;
  };

  const handleOpen = () => {
    setSelectedProgram(programs.find((program) => program.id === currentProgramId) ?? programs[0] ?? null);
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accent2}20)`,
          border: `1px solid ${theme.accent}66`,
          color: theme.accent,
        }}
      >
        <Tv size={16} aria-hidden="true" />
        Guía de canales
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col">
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2"
            style={{ borderColor: theme.accent, background: `linear-gradient(90deg, ${theme.accent}18, ${theme.accent2}12)` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{ background: theme.accent, color: "#000" }}
              >
                {theme.channelLogo}
              </div>
              <div>
                <h2 className={`text-lg sm:text-xl font-black text-white ${theme.fontClass}`}>Guía de programación</h2>
                <p className="text-xs text-white/75">{theme.channelName} — {theme.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MexicoClock className="hidden sm:block text-sm font-mono tabular-nums" style={{ color: theme.accent }} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                style={{ border: `1px solid ${theme.accent}55` }}
                aria-label="Cerrar guía"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex border-b overflow-hidden flex-shrink-0" style={{ borderColor: `${theme.accent}33`, background: "rgba(0,0,0,0.4)" }}>
                <div className="w-48 flex-shrink-0 px-3 py-2 text-xs font-bold uppercase tracking-wider border-r text-white" style={{ borderColor: `${theme.accent}33` }}>
                  Programa
                </div>
                <div ref={headerScrollRef} className="flex-1 overflow-x-hidden">
                  <div className="flex" style={{ width: `${24 * PX_PER_HOUR}px` }}>
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="flex-shrink-0 px-2 py-2 text-xs font-mono text-center border-r"
                        style={{
                          width: PX_PER_HOUR,
                          borderColor: `${theme.accent}22`,
                          color: hour === currentHour ? theme.accent : "rgba(255,255,255,0.75)",
                          background: hour === currentHour ? `${theme.accent}14` : "transparent",
                        }}
                      >
                        {formatHourLabel(hour).replace(":00", "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 flex overflow-hidden">
                <div className="w-48 flex-shrink-0 overflow-y-auto custom-scrollbar border-r" style={{ borderColor: `${theme.accent}33` }}>
                  {programs.map((program) => {
                    const isCurrent = currentProgramId === program.id;
                    const isSelected = selectedProgram?.id === program.id;
                    const isSeen = seenPrograms.has(seenKey(program));
                    return (
                      <button
                        key={program.id}
                        type="button"
                        onClick={() => setSelectedProgram(program)}
                        className="w-full text-left px-3 h-[72px] border-b transition-colors overflow-hidden"
                        style={{
                          borderColor: `${theme.accent}22`,
                          background: isSelected ? `${theme.accent}20` : isCurrent ? `${theme.accent}10` : "transparent",
                          borderLeft: isSelected ? `3px solid ${theme.accent}` : "3px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span style={{ color: "#fff" }}>{categoryIcon(program.categoria)}</span>
                          <span className="text-[9px] font-mono px-1 rounded" style={{ background: `${RATING_COLORS[program.rating] ?? "#888"}22`, color: RATING_COLORS[program.rating] ?? "#ddd" }}>
                            {program.rating}
                          </span>
                          {isSeen && <Check size={10} className="text-green-300" aria-hidden="true" />}
                        </div>
                        <p className="text-xs font-semibold text-white truncate" style={isSeen ? { textDecoration: "line-through", opacity: 0.6 } : undefined}>
                          {program.titulo}
                        </p>
                        <p className="text-[10px] text-white/70 mt-0.5">{formatMinute12(program.startMinute)} · {program.duration} min</p>
                      </button>
                    );
                  })}
                </div>

                <div
                  ref={bodyScrollRef}
                  className="flex-1 overflow-auto custom-scrollbar"
                  onScroll={(event) => {
                    if (headerScrollRef.current) headerScrollRef.current.scrollLeft = event.currentTarget.scrollLeft;
                  }}
                >
                  <div className="relative" style={{ width: `${24 * PX_PER_HOUR}px` }}>
                    <div
                      className="absolute top-0 bottom-0 z-10 pointer-events-none"
                      style={{
                        left: `${(minuteOfDay / 60) * PX_PER_HOUR}px`,
                        width: "2px",
                        background: theme.accent,
                      }}
                    />
                    {programs.map((program) => {
                      const isCurrent = currentProgramId === program.id;
                      const isSelected = selectedProgram?.id === program.id;
                      const widthPx = (program.duration / 60) * PX_PER_HOUR;
                      const leftPx = (program.startMinute / 60) * PX_PER_HOUR;
                      return (
                        <div key={program.id} className="relative border-b h-[72px]" style={{ borderColor: `${theme.accent}14` }}>
                          <div className="absolute inset-0 flex">
                            {hours.map((hour) => (
                              <div
                                key={hour}
                                className="flex-shrink-0 h-full border-r"
                                style={{
                                  width: PX_PER_HOUR,
                                  borderColor: `${theme.accent}10`,
                                  background: hour === currentHour ? `${theme.accent}08` : "transparent",
                                }}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedProgram(program)}
                            className="absolute top-1.5 h-[60px] rounded-md px-2 py-1 text-left overflow-hidden"
                            style={{
                              left: `${leftPx}px`,
                              width: `${widthPx}px`,
                              background: isSelected
                                ? `linear-gradient(135deg, ${theme.accent}44, ${theme.accent2}30)`
                                : isCurrent
                                  ? `linear-gradient(135deg, ${theme.accent}30, ${theme.accent2}18)`
                                  : "rgba(255,255,255,0.06)",
                              border: `1px solid ${isSelected ? theme.accent : "rgba(255,255,255,0.16)"}`,
                            }}
                          >
                            <p className="text-[10px] font-bold text-white truncate">{program.titulo}</p>
                            <p className="text-[9px] text-white/75 truncate">{program.genre}</p>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="lg:w-96 flex-shrink-0 border-t lg:border-t-0 lg:border-l overflow-y-auto custom-scrollbar"
              style={{ borderColor: `${theme.accent}33`, background: "rgba(0,0,0,0.5)" }}
            >
              {selectedProgram ? (
                <div className="p-5">
                  <div className="relative rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center" style={{ border: `1px solid ${theme.accent}55`, background: `linear-gradient(160deg, ${theme.accent}55, #140810 72%)` }}>
                    <span className="text-5xl" aria-hidden="true">
                      {selectedProgram.categoria === "Película" ? "🎬" : selectedProgram.categoria === "Especial" ? "✨" : "📺"}
                    </span>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold" style={{ background: RATING_COLORS[selectedProgram.rating] ?? "#888", color: "#000" }}>
                      {selectedProgram.rating}
                    </div>
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-black/70 text-white">
                      {categoryIcon(selectedProgram.categoria)}
                      {selectedProgram.categoria}
                    </div>
                  </div>

                  <h3 className={`text-lg font-black text-white mb-2 ${theme.fontClass}`}>{selectedProgram.titulo}</h3>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ background: `${theme.accent}28` }}>
                      {formatMinute12(selectedProgram.startMinute)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/85">{selectedProgram.genre}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/85">{selectedProgram.duration} min</span>
                    {seenPrograms.has(seenKey(selectedProgram)) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-300 flex items-center gap-1">
                        <Check size={11} aria-hidden="true" /> Visto
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">{selectedProgram.sinopsis}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectProgram(selectedProgram);
                        setIsOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`, color: "#000" }}
                    >
                      <Play size={16} aria-hidden="true" /> Ver ahora
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleSeen(seenKey(selectedProgram))}
                      aria-label={seenPrograms.has(seenKey(selectedProgram)) ? "Quitar de vistos" : "Marcar como visto"}
                      aria-pressed={seenPrograms.has(seenKey(selectedProgram))}
                      className="px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{
                        background: seenPrograms.has(seenKey(selectedProgram)) ? "rgba(34,197,94,0.18)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${seenPrograms.has(seenKey(selectedProgram)) ? "rgba(34,197,94,0.55)" : "rgba(255,255,255,0.18)"}`,
                        color: seenPrograms.has(seenKey(selectedProgram)) ? "#86efac" : "#fff",
                      }}
                    >
                      {seenPrograms.has(seenKey(selectedProgram)) ? <Check size={16} /> : <Star size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-white/75 text-sm">Selecciona un programa para ver los detalles.</div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-4 sm:px-6 py-2 border-t text-xs" style={{ borderColor: `${theme.accent}28`, background: "rgba(0,0,0,0.4)" }}>
            <span className="text-white/70">{programs.length} programas · {theme.channelName}</span>
            <span className="font-mono capitalize" style={{ color: theme.accent }}>{formatMexicoDate(now)}</span>
          </div>
        </div>
      )}
    </>
  );
}
