import { useState, useRef, useEffect } from "react";
import { Check, Play, Film, Tv, Sparkles, X, Clock, Star } from "lucide-react";
import type { Program, MonthTheme } from "../types";
import { formatHour } from "../lib/scheduler";

interface ChannelGuideProps {
  theme: MonthTheme;
  seenPrograms: Set<string>;
  onToggleSeen: (id: string) => void;
  onSelectProgram: (program: Program) => void;
  currentProgramId: string | null;
}

/* ============================================================
 *  GUÍA DE CANALES — Estilo EPG (Electronic Program Guide)
 *  ------------------------------------------------------------
 *  Pantalla completa estilo guía de TV por cable de los 2000s
 *  (Sky/DIRECTV): cuadrícula de horarios, lista de programas,
 *  barra de tiempo arriba, panel de detalles abajo.
 * ============================================================ */

const RATING_COLORS: Record<string, string> = {
  "TV-Y": "#22c55e",
  "TV-Y7": "#3b82f6",
  "TV-G": "#22c55e",
  "TV-PG": "#eab308",
  "TV-14": "#f97316",
  "TV-MA": "#ef4444",
  "PG": "#eab308",
  "G": "#22c55e",
};

export default function ChannelGuide({
  theme,
  seenPrograms,
  onToggleSeen,
  onSelectProgram,
  currentProgramId,
}: ChannelGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current time when opening
  useEffect(() => {
    if (isOpen && scrollRef.current) {
      const now = new Date();
      const hour = now.getHours();
      const scrollTarget = Math.max(0, (hour - 2) * 120);
      scrollRef.current.scrollLeft = scrollTarget;
    }
  }, [isOpen]);

  const programs = theme.programs
    .filter((p) => p.dia === 0 || p.dia === new Date().getDate())
    .sort((a, b) => a.horaInicio - b.horaInicio);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();

  const categoryIcon = (cat: string) => {
    if (cat === "Película") return <Film size={12} />;
    if (cat === "Especial") return <Sparkles size={12} />;
    return <Tv size={12} />;
  };

  const handleOpen = () => {
    setSelectedProgram(programs.find((p) => p.id === currentProgramId) ?? programs[0] ?? null);
    setIsOpen(true);
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accent2}20)`,
          border: `1px solid ${theme.accent}40`,
          color: theme.accent,
        }}
      >
        <Tv size={16} />
        Guía de Canales
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col">
          {/* === Header bar === */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2"
            style={{
              borderColor: theme.accent,
              background: `linear-gradient(90deg, ${theme.accent}15, ${theme.accent2}10)`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
                style={{
                  background: theme.accent,
                  color: "#000",
                  fontFamily: theme.fontClass,
                }}
              >
                {theme.channelLogo}
              </div>
              <div>
                <h2
                  className="text-lg sm:text-xl font-black text-white"
                  style={{ fontFamily: theme.fontClass, textShadow: `0 0 8px ${theme.accent}50` }}
                >
                  Guía de Programación
                </h2>
                <p className="text-xs text-white/50">{theme.channelName} — {theme.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="hidden sm:flex items-center gap-2 text-sm font-mono tabular-nums"
                style={{ color: theme.accent }}
              >
                <Clock size={16} />
                {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                style={{ border: `1px solid ${theme.accent}30` }}
              >
                <X size={18} className="text-white/70" />
              </button>
            </div>
          </div>

          {/* === Body: grid + details === */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* === Left: Schedule Grid === */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Time header */}
              <div
                className="flex border-b overflow-hidden flex-shrink-0"
                style={{ borderColor: `${theme.accent}20`, background: "rgba(0,0,0,0.4)" }}
              >
                <div
                  className="w-48 flex-shrink-0 px-3 py-2 text-xs font-bold uppercase tracking-wider border-r"
                  style={{ borderColor: `${theme.accent}20`, color: theme.accent }}
                >
                  Programa
                </div>
                <div ref={scrollRef} className="flex-1 overflow-x-auto custom-scrollbar">
                  <div className="flex" style={{ width: "2880px" }}>
                    {hours.map((h) => (
                      <div
                        key={h}
                        className="w-[120px] flex-shrink-0 px-2 py-2 text-xs font-mono text-center border-r"
                        style={{
                          borderColor: `${theme.accent}10`,
                          color: h === currentHour ? theme.accent : "rgba(255,255,255,0.4)",
                          background: h === currentHour ? `${theme.accent}10` : "transparent",
                        }}
                      >
                        {formatHour(h).replace(":00", "")}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedule rows */}
              <div className="flex-1 flex overflow-hidden">
                {/* Program names column */}
                <div className="w-48 flex-shrink-0 overflow-y-auto custom-scrollbar border-r" style={{ borderColor: `${theme.accent}20` }}>
                  {programs.map((p) => {
                    const isCurrent = currentProgramId === p.id;
                    const isSelected = selectedProgram?.id === p.id;
                    const isSeen = seenPrograms.has(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProgram(p)}
                        className="w-full text-left px-3 py-3 border-b transition-all"
                        style={{
                          borderColor: `${theme.accent}10`,
                          background: isSelected ? `${theme.accent}15` : isCurrent ? `${theme.accent}08` : "transparent",
                          borderLeft: isSelected ? `3px solid ${theme.accent}` : "3px solid transparent",
                        }}
                      >
                        <div className="flex items-center gap-1.5 mb-1">
                          <span style={{ color: theme.accent2 }}>{categoryIcon(p.categoria)}</span>
                          <span className="text-[9px] font-mono px-1 rounded" style={{ background: `${RATING_COLORS[p.rating] ?? "#888"}20`, color: RATING_COLORS[p.rating] ?? "#888" }}>
                            {p.rating}
                          </span>
                          {isSeen && <Check size={10} className="text-green-400" />}
                        </div>
                        <p
                          className="text-xs font-semibold text-white/80 truncate"
                          style={isSeen ? { textDecoration: "line-through", opacity: 0.5 } : {}}
                        >
                          {p.titulo}
                        </p>
                        <p className="text-[10px] text-white/30 mt-0.5">{p.genre} · {p.duration}min</p>
                      </button>
                    );
                  })}
                </div>

                {/* Time grid */}
                <div className="flex-1 overflow-auto custom-scrollbar relative">
                  <div style={{ width: "2880px" }}>
                    {/* Current time indicator */}
                    <div
                      className="absolute top-0 bottom-0 z-10 pointer-events-none"
                      style={{
                        left: `${currentHour * 120 + (currentMinute / 60) * 120}px`,
                        width: "2px",
                        background: theme.accent,
                        boxShadow: `0 0 8px ${theme.accent}`,
                      }}
                    >
                      <div
                        className="absolute -top-0 -left-1 w-3 h-3 rounded-full"
                        style={{ background: theme.accent, boxShadow: `0 0 6px ${theme.accent}` }}
                      />
                    </div>

                    {programs.map((p) => {
                      const isCurrent = currentProgramId === p.id;
                      const isSelected = selectedProgram?.id === p.id;
                      const widthPx = (p.duration / 60) * 120;
                      const leftPx = p.horaInicio * 120;
                      return (
                        <div
                          key={p.id}
                          className="border-b h-[72px] flex items-center"
                          style={{ borderColor: `${theme.accent}08` }}
                        >
                          {/* Hour cells background */}
                          {hours.map((h) => (
                            <div
                              key={h}
                              className="w-[120px] flex-shrink-0 h-full border-r"
                              style={{
                                borderColor: `${theme.accent}05`,
                                background: h === currentHour ? `${theme.accent}05` : "transparent",
                              }}
                            />
                          ))}
                          {/* Program block overlay */}
                          <div
                            onClick={() => setSelectedProgram(p)}
                            className="absolute h-[60px] rounded-md px-2 py-1 cursor-pointer transition-all hover:scale-105 overflow-hidden"
                            style={{
                              left: `${leftPx}px`,
                              width: `${widthPx}px`,
                              top: "auto",
                              background: isSelected
                                ? `linear-gradient(135deg, ${theme.accent}30, ${theme.accent2}20)`
                                : isCurrent
                                  ? `linear-gradient(135deg, ${theme.accent}20, ${theme.accent2}10)`
                                  : "rgba(255,255,255,0.04)",
                              border: `1px solid ${isSelected ? theme.accent + "60" : isCurrent ? theme.accent + "30" : "rgba(255,255,255,0.08)"}`,
                            }}
                          >
                            <p className="text-[10px] font-bold text-white/90 truncate">{p.titulo}</p>
                            <p className="text-[9px] text-white/40 truncate">{p.genre}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* === Right/Bottom: Details panel === */}
            <div
              className="lg:w-96 flex-shrink-0 border-t lg:border-t-0 lg:border-l overflow-y-auto custom-scrollbar"
              style={{
                borderColor: `${theme.accent}20`,
                background: "rgba(0,0,0,0.5)",
              }}
            >
              {selectedProgram ? (
                <div className="p-5">
                  {/* Thumbnail */}
                  <div
                    className="relative rounded-lg overflow-hidden mb-4 aspect-video"
                    style={{ border: `1px solid ${theme.accent}30` }}
                  >
                    <img
                      src={selectedProgram.thumbnailUrl}
                      alt={selectedProgram.titulo}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    {/* Rating badge */}
                    <div
                      className="absolute top-2 right-2 px-2 py-0.5 rounded text-xs font-bold"
                      style={{
                        background: RATING_COLORS[selectedProgram.rating] ?? "#888",
                        color: "#000",
                      }}
                    >
                      {selectedProgram.rating}
                    </div>
                    {/* Category badge */}
                    <div
                      className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: "rgba(0,0,0,0.7)", color: theme.accent }}
                    >
                      {categoryIcon(selectedProgram.categoria)}
                      {selectedProgram.categoria}
                    </div>
                  </div>

                  {/* Title & info */}
                  <h3
                    className="text-lg font-black text-white mb-2"
                    style={{ fontFamily: theme.fontClass }}
                  >
                    {selectedProgram.titulo}
                  </h3>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                      style={{ background: `${theme.accent}15`, color: theme.accent }}
                    >
                      <Clock size={11} /> {formatHour(selectedProgram.horaInicio)}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      {selectedProgram.genre}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      {selectedProgram.duration} min
                    </span>
                    {seenPrograms.has(selectedProgram.id) && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 flex items-center gap-1">
                        <Check size={11} /> Visto
                      </span>
                    )}
                  </div>

                  {/* Synopsis */}
                  <p className="text-sm text-white/60 leading-relaxed mb-4">
                    {selectedProgram.sinopsis}
                  </p>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onSelectProgram(selectedProgram);
                        setIsOpen(false);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${theme.accent}, ${theme.accent2})`,
                        color: "#000",
                      }}
                    >
                      <Play size={16} /> Ver Ahora
                    </button>
                    <button
                      onClick={() => onToggleSeen(selectedProgram.id)}
                      className="px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                      style={{
                        background: seenPrograms.has(selectedProgram.id)
                          ? "rgba(34,197,94,0.15)"
                          : "rgba(255,255,255,0.05)",
                        border: `1px solid ${seenPrograms.has(selectedProgram.id) ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.1)"}`,
                        color: seenPrograms.has(selectedProgram.id) ? "#22c55e" : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {seenPrograms.has(selectedProgram.id) ? <Check size={16} /> : <Star size={16} />}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center text-white/30 text-sm">
                  Selecciona un programa para ver los detalles.
                </div>
              )}
            </div>
          </div>

          {/* === Footer bar === */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-2 border-t text-xs"
            style={{ borderColor: `${theme.accent}15`, background: "rgba(0,0,0,0.4)" }}
          >
            <span className="text-white/30">
              {programs.length} programas · {theme.channelName}
            </span>
            <span style={{ color: theme.accent }} className="font-mono">
              {new Date().toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
