import { useEffect, useState, useCallback, useMemo } from "react";
import { Tv, Calendar, Eye } from "lucide-react";
import RetroTV from "@/components/RetroTV";
import ChannelGuide from "@/components/ChannelGuide";
import SeasonalEffects from "@/components/SeasonalEffects";
import Countdown from "@/components/Countdown";
import { getActiveTheme } from "@/data";
import { getCurrentAndNext, getSeenPrograms, toggleSeen, formatClock, formatHour } from "@/lib/scheduler";
import type { Program } from "@/types";

const RATING_COLORS: Record<string, string> = {
  "TV-Y": "#22c55e", "TV-Y7": "#3b82f6", "TV-G": "#22c55e",
  "TV-PG": "#eab308", "TV-14": "#f97316", "TV-MA": "#ef4444", "PG": "#eab308", "G": "#22c55e",
};

export default function App() {
  const [now, setNow] = useState(new Date());
  const [mode, setMode] = useState<"live" | "guide">("live");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [seenPrograms, setSeenPrograms] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setSeenPrograms(getSeenPrograms());
  }, []);

  const { theme, seasonMode, isSpecialDay } = useMemo(() => getActiveTheme(now), [now]);

  const liveResult = useMemo(() => getCurrentAndNext(theme, now), [theme, now]);

  const activeProgram = mode === "guide" && selectedProgram ? selectedProgram : liveResult.current;
  const nextProgram = mode === "guide" ? null : liveResult.next;
  const isSeen = activeProgram ? seenPrograms.has(activeProgram.id) : false;

  const handleToggleSeen = useCallback(() => {
    if (!activeProgram) return;
    setSeenPrograms(toggleSeen(activeProgram.id));
  }, [activeProgram]);

  const handleGuideToggleSeen = useCallback((id: string) => {
    setSeenPrograms(toggleSeen(id));
  }, []);

  const handleSelectProgram = useCallback((program: Program) => {
    setSelectedProgram(program);
    setMode("guide");
  }, []);

  const clock = formatClock(now);
  const isPreHalloween = seasonMode === "pre-halloween";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} relative overflow-x-hidden ${theme.decoration.backgroundPattern}`}
      style={{ backgroundColor: "#0f0f11" }}
    >
      <SeasonalEffects effect={theme.effect} />

      {/* Ambient glow — very dim */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(ellipse at top, ${theme.accent}06, transparent 60%)` }}
      />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {/* ===== HEADER ===== */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent2}15)`,
                border: `1px solid ${theme.accent}25`,
              }}
            >
              <Tv size={22} style={{ color: `${theme.accent}cc` }} />
            </div>
            <div>
              <h1
                className="text-xl sm:text-2xl font-black tracking-tight text-white/90"
                style={{ fontFamily: theme.fontClass, textShadow: `0 0 12px ${theme.accent}30` }}
              >
                {theme.channelName}
              </h1>
              <p className="text-xs text-white/40 tracking-wider">{theme.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="px-4 py-2 rounded-xl text-xl sm:text-2xl font-mono font-bold tabular-nums"
              style={{
                background: "rgba(26,26,30,0.6)",
                border: `1px solid ${theme.accent}20`,
                color: `${theme.accent}cc`,
                textShadow: `0 0 8px ${theme.accent}30`,
              }}
            >
              {clock}
            </div>
          </div>
        </header>

        {/* ===== Banner temático decorativo ===== */}
        <div
          className="mb-6 px-4 py-2.5 rounded-xl flex items-center justify-center overflow-hidden relative"
          style={{
            background: `linear-gradient(90deg, ${theme.accent}10, ${theme.accent2}10, ${theme.accent}10)`,
            border: `1px solid ${theme.accent}20`,
          }}
        >
          <p
            className="text-xs sm:text-sm font-bold tracking-wider text-center"
            style={{ color: `${theme.accent}dd`, fontFamily: theme.fontClass, textShadow: `0 0 6px ${theme.accent}30` }}
          >
            {theme.decoration.headerBanner}
          </p>
        </div>

        {/* ===== Pre-Halloween teaser card ===== */}
        {isPreHalloween && (
          <div
            className="mb-6 rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,102,0,0.08), rgba(20,20,26,0.6))",
              border: "1px solid rgba(255,102,0,0.20)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-4xl">🎃</span>
                <div>
                  <h3 className="text-lg font-black text-orange-400/90" style={{ fontFamily: "font-creepy" }}>
                    Especial de Halloween
                  </h3>
                  <p className="text-xs text-orange-300/50 mt-0.5">Estreno: 1° de Octubre · 24/7 de Terror</p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <Countdown now={now} />
              </div>
            </div>
          </div>
        )}

        {/* ===== Contenido principal ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Columna izquierda: TV + controles */}
          <div className="flex flex-col gap-5">
            {/* Controles de modo */}
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <button
                onClick={() => setMode("live")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
                style={{
                  background: mode === "live" ? `${theme.accent}20` : "rgba(26,26,30,0.5)",
                  border: `1px solid ${mode === "live" ? theme.accent + "40" : "rgba(255,255,255,0.06)"}`,
                  color: mode === "live" ? `${theme.accent}dd` : "rgba(255,255,255,0.4)",
                }}
              >
                <Tv size={16} />
                En Vivo 24/7
              </button>

              <ChannelGuide
                theme={theme}
                seenPrograms={seenPrograms}
                onToggleSeen={handleGuideToggleSeen}
                onSelectProgram={handleSelectProgram}
                currentProgramId={activeProgram?.id ?? null}
              />
            </div>

            {/* Indicador de modo seleccionado manualmente */}
            {mode === "guide" && selectedProgram && (
              <div className="flex items-center justify-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
                  style={{ background: `${theme.accent2}12`, border: `1px solid ${theme.accent2}25`, color: `${theme.accent2}bb` }}
                >
                  <Calendar size={12} />
                  Modo On Demand: {selectedProgram.titulo}
                </div>
                <button
                  onClick={() => {
                    setMode("live");
                    setSelectedProgram(null);
                  }}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors underline"
                >
                  Volver a En Vivo
                </button>
              </div>
            )}

            {/* Televisor */}
            <RetroTV
              currentProgram={activeProgram}
              nextProgram={nextProgram}
              channelName={theme.channelName}
              channelLogo={theme.channelLogo}
              accent={theme.accent}
              accent2={theme.accent2}
              isLive={mode === "live"}
              isSeen={isSeen}
              onToggleSeen={handleToggleSeen}
              clock={clock}
              themeName={theme.name}
              decoration={theme.decoration}
              fontClass={theme.fontClass}
              seasonMode={seasonMode}
            />

            {/* Sinopsis del programa actual */}
            {activeProgram && (
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(26,26,30,0.5)",
                  border: `1px solid ${theme.accent}12`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: `${theme.accent2}18`, color: `${theme.accent2}cc` }}
                  >
                    {activeProgram.categoria}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/8 text-white/40">
                    {activeProgram.genre}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ background: `${RATING_COLORS[activeProgram.rating] ?? "#888"}20`, color: RATING_COLORS[activeProgram.rating] ?? "#888" }}
                  >
                    {activeProgram.rating}
                  </span>
                  {seenPrograms.has(activeProgram.id) && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/15 text-green-400/80 flex items-center gap-1">
                      <Eye size={10} /> VISTO
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white/90 mb-1">{activeProgram.titulo}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">{activeProgram.sinopsis}</p>
                <p className="text-xs text-white/25">Duración: {activeProgram.duration} minutos</p>
              </div>
            )}
          </div>

          {/* Columna derecha: Sidebar */}
          <aside className="flex flex-col gap-5">
            {/* Cuenta regresiva (visible cuando NO es pre-halloween, que ya tiene su tarjeta) */}
            {!isPreHalloween && (
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(26,26,30,0.5)",
                  border: `1px solid ${theme.accent}15`,
                }}
              >
                <Countdown now={now} />
              </div>
            )}

            {/* Programación actual */}
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(26,26,30,0.5)",
                border: `1px solid ${theme.accent}15`,
              }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-white/30 mb-3">
                Programación de Hoy
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
                {theme.programs
                  .filter((p) => p.dia === 0 || p.dia === now.getDate())
                  .sort((a, b) => a.horaInicio - b.horaInicio)
                  .map((program) => {
                    const isActive = activeProgram?.id === program.id;
                    const isSeenItem = seenPrograms.has(program.id);
                    return (
                      <button
                        key={program.id}
                        onClick={() => handleSelectProgram(program)}
                        className="w-full text-left rounded-lg p-2.5 transition-all hover:scale-[1.02]"
                        style={{
                          background: isActive ? `${theme.accent}12` : "rgba(255,255,255,0.015)",
                          border: `1px solid ${isActive ? theme.accent + "30" : "transparent"}`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="text-[10px] font-mono tabular-nums flex-shrink-0"
                            style={{ color: `${theme.accent}aa` }}
                          >
                            {formatHour(program.horaInicio).replace(":00", "")}
                          </span>
                          <span
                            className="text-xs font-semibold text-white/70 truncate flex-1"
                            style={isSeenItem ? { textDecoration: "line-through", opacity: 0.4 } : {}}
                          >
                            {program.titulo}
                          </span>
                          {isSeenItem && <Eye size={12} className="text-green-400/60 flex-shrink-0" />}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/25">
            RetroToon TV — Simulación de canal retro 24/7 · Tema actual: {theme.name}
          </p>
          <p className="text-[10px] text-white/15 mt-1">
            Los videos actuales son de prueba. Reemplaza las URLs en <code className="text-white/20">src/data.ts</code> para usar contenido real.
          </p>
        </footer>
      </div>
    </div>
  );
}
