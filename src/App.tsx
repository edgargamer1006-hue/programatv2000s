import { useCallback, useMemo, useState } from "react";
import { Tv, Calendar, Eye, Coffee } from "lucide-react";
import RetroTV from "@/components/RetroTV";
import ChannelGuide from "@/components/ChannelGuide";
import SeasonalEffects from "@/components/SeasonalEffects";
import Countdown from "@/components/Countdown";
import MexicoClock from "@/components/MexicoClock";
import HalloweenDecor from "@/components/HalloweenDecor";
import { getActiveTheme } from "@/data";
import { mercadoPagoHref } from "@/data/pagos";
import { getCurrentAndNext, getSeenPrograms, toggleSeen, seenKey } from "@/lib/scheduler";
import { daypartLabel, formatMinute12, getMexicoDateTime } from "@/lib/mexico-time";
import { useMexicoMinute } from "@/lib/hooks";
import type { Program } from "@/types";

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

export default function App() {
  const now = useMexicoMinute();
  const minuteOfDay = getMexicoDateTime(now).minuteOfDay;
  const [mode, setMode] = useState<"live" | "guide">("live");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [seenPrograms, setSeenPrograms] = useState<Set<string>>(() => getSeenPrograms());

  const { theme, seasonMode } = useMemo(() => getActiveTheme(now), [now]);
  const liveResult = useMemo(
    () => getCurrentAndNext(theme.programs, now),
    [theme.programs, now],
  );

  const activeProgram = mode === "guide" && selectedProgram ? selectedProgram : liveResult.current;
  const nextProgram = mode === "guide" ? null : liveResult.next;
  const isSeen = activeProgram ? seenPrograms.has(seenKey(activeProgram)) : false;
  const cafeHref = mercadoPagoHref();

  const handleToggleSeen = useCallback(() => {
    if (!activeProgram) return;
    setSeenPrograms(toggleSeen(seenKey(activeProgram)));
  }, [activeProgram]);

  const handleGuideToggleSeen = useCallback((id: string) => {
    setSeenPrograms(toggleSeen(id));
  }, []);

  const handleSelectProgram = useCallback((program: Program) => {
    setSelectedProgram(program);
    setMode("guide");
  }, []);

  const schedule = theme.programs;
  const haunted = seasonMode === "halloween";
  let lastDaypart = "";

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} relative overflow-x-hidden ${theme.decoration.backgroundPattern} ${haunted ? "theme-halloween" : ""}`}
      style={{ backgroundColor: haunted ? "#07040e" : "#0f0f11" }}
    >
      <SeasonalEffects effect={theme.effect} />
      {haunted && <HalloweenDecor />}

      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ background: `radial-gradient(ellipse at top, ${theme.accent}06, transparent 60%)` }}
      />

      <div className="relative z-20 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent2}15)`,
                border: `1px solid ${theme.accent}40`,
              }}
            >
              <Tv size={22} style={{ color: theme.accent }} aria-hidden="true" />
            </div>
            <div>
              <h1 className={`text-xl sm:text-2xl font-black tracking-tight text-white ${theme.fontClass}`}>
                {theme.channelName}
              </h1>
              <p className="text-xs text-white/75 tracking-wider">{theme.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CafeButton href={cafeHref} accent={theme.accent} />
            <MexicoClock
              className={`px-4 py-2 text-xl sm:text-2xl font-mono font-bold tabular-nums ${haunted ? "tomb-card" : "rounded-xl"}`}
              style={haunted ? {
                background: "linear-gradient(180deg, #3a2258, #140a1c)",
                border: "1px solid #ff8c1a",
                color: "#ffe7c2",
                boxShadow: "0 0 14px rgba(255,140,26,0.28)",
              } : {
                background: "rgba(26,26,30,0.6)",
                border: `1px solid ${theme.accent}55`,
                color: theme.accent,
              }}
            />
          </div>
        </header>

        <div
          className="mb-6 px-4 py-2.5 rounded-xl flex items-center justify-center overflow-hidden relative"
          style={{
            background: `linear-gradient(90deg, ${theme.accent}14, ${theme.accent2}14, ${theme.accent}14)`,
            border: `1px solid ${theme.accent}40`,
          }}
        >
          <p className={`font-bold tracking-wider text-center ${haunted ? "text-sm sm:text-base text-[#ffe7c2]" : `text-xs sm:text-sm ${theme.fontClass}`}`} style={haunted ? undefined : { color: theme.accent }}>
            {theme.decoration.headerBanner}
          </p>
        </div>

        {seasonMode === "pre-halloween" && (
          <div
            className="mb-6 rounded-2xl p-5 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(255,102,0,0.08), rgba(20,20,26,0.6))",
              border: "1px solid rgba(255,102,0,0.35)",
            }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-4xl" aria-hidden="true">🎃</span>
                <div>
                  <h2 className="text-lg font-black text-orange-300 font-creepy">Especial de Halloween</h2>
                  <p className="text-xs text-orange-100/80 mt-0.5">Estreno: 1 de octubre · 24/7 de terror</p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <Countdown />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <button
                type="button"
                onClick={() => setMode("live")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
                style={{
                  background: mode === "live" ? `${theme.accent}24` : "rgba(26,26,30,0.5)",
                  border: `1px solid ${mode === "live" ? theme.accent + "66" : "rgba(255,255,255,0.14)"}`,
                  color: mode === "live" ? theme.accent : "rgba(255,255,255,0.82)",
                }}
              >
                <Tv size={16} aria-hidden="true" />
                En vivo 24/7
              </button>

              <ChannelGuide
                theme={theme}
                now={now}
                minuteOfDay={minuteOfDay}
                seenPrograms={seenPrograms}
                onToggleSeen={handleGuideToggleSeen}
                onSelectProgram={handleSelectProgram}
                currentProgramId={activeProgram?.id ?? null}
              />
            </div>

            {mode === "guide" && selectedProgram && (
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-white/90"
                  style={{ background: `${theme.accent2}18`, border: `1px solid ${theme.accent2}44` }}
                >
                  <Calendar size={12} aria-hidden="true" />
                  Modo bajo demanda: {selectedProgram.titulo}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMode("live");
                    setSelectedProgram(null);
                  }}
                  className="text-xs text-white/80 hover:text-white transition-colors underline"
                >
                  Volver a en vivo
                </button>
              </div>
            )}

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
              themeName={theme.name}
              decoration={theme.decoration}
              fontClass={theme.fontClass}
              seasonMode={seasonMode}
            />

            {activeProgram && (
              <div
                className={haunted ? "haunted-panel rounded-2xl p-5" : "rounded-xl p-5"}
                style={haunted ? undefined : { background: "rgba(26,26,30,0.5)", border: `1px solid ${theme.accent}28` }}
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ background: `${theme.accent2}22`, color: "#fff" }}>
                    {activeProgram.categoria}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-white/80">
                    {activeProgram.genre}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{
                      background: `${RATING_COLORS[activeProgram.rating] ?? "#888"}22`,
                      color: RATING_COLORS[activeProgram.rating] ?? "#ddd",
                    }}
                  >
                    {activeProgram.rating}
                  </span>
                  {isSeen && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-300 flex items-center gap-1">
                      <Eye size={10} aria-hidden="true" /> Visto
                    </span>
                  )}
                </div>
                <h2 className={haunted ? "font-creepy text-2xl text-[#ffe7c2] leading-tight mb-2" : "text-lg font-bold text-white mb-1"}>{activeProgram.titulo}</h2>
                <p className="text-sm text-white/80 leading-relaxed mb-3">{activeProgram.sinopsis}</p>
                <p className="text-xs text-white/70">
                  {formatMinute12(activeProgram.startMinute)} – {formatMinute12(activeProgram.startMinute + activeProgram.duration)}
                  {" · "}
                  {activeProgram.duration} min
                </p>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-5">
            {seasonMode !== "pre-halloween" && (
              <div className={haunted ? "haunted-panel rounded-2xl p-5" : "rounded-2xl p-5"} style={haunted ? undefined : { background: "rgba(26,26,30,0.5)", border: `1px solid ${theme.accent}28` }}>
                <Countdown />
              </div>
            )}

            <div className={haunted ? "haunted-panel rounded-2xl p-5" : "rounded-2xl p-5"} style={haunted ? undefined : { background: "rgba(26,26,30,0.5)", border: `1px solid ${theme.accent}28` }}>
              <h2 className={haunted ? "font-creepy text-2xl text-[#ffb067] leading-none mb-3" : "text-xs font-bold uppercase tracking-wider text-white/75 mb-3"}>
                Programación de hoy
              </h2>
              <div className="space-y-2 max-h-[28rem] overflow-y-auto custom-scrollbar pr-1">
                {schedule.map((program) => {
                  const daypart = daypartLabel(program.startMinute);
                  const showDaypart = daypart !== lastDaypart;
                  lastDaypart = daypart;
                  const isActive = activeProgram?.id === program.id;
                  const itemSeen = seenPrograms.has(seenKey(program));
                  return (
                    <div key={program.id}>
                      {showDaypart && (
                        <p className={haunted ? "text-[11px] font-bold uppercase tracking-wider text-[#d4ffb8] pt-2 pb-1" : "text-[10px] font-bold uppercase tracking-wider text-white/60 pt-2 pb-1"}>{daypart}</p>
                      )}
                      <button
                        type="button"
                        onClick={() => handleSelectProgram(program)}
                        className={`w-full text-left p-2.5 transition-colors ${haunted ? "tomb-card" : "rounded-lg"}`}
                        style={{
                          background: haunted
                            ? isActive
                              ? "linear-gradient(180deg, rgba(255,140,26,0.32), rgba(32,14,48,0.95))"
                              : "linear-gradient(180deg, rgba(36,20,52,0.95), rgba(12,6,18,0.95))"
                            : isActive ? `${theme.accent}18` : "rgba(255,255,255,0.03)",
                          border: `1px solid ${isActive ? theme.accent : haunted ? "rgba(214,196,255,0.4)" : "transparent"}`,
                          boxShadow: haunted && isActive ? "0 0 12px rgba(182,255,138,0.22)" : undefined,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tabular-nums flex-shrink-0 text-white/80">
                            {formatMinute12(program.startMinute)}
                          </span>
                          <span
                            className="text-xs font-semibold text-white/90 truncate flex-1"
                            style={itemSeen ? { textDecoration: "line-through", opacity: 0.55 } : undefined}
                          >
                            {program.titulo}
                          </span>
                          {itemSeen && <Eye size={12} className="text-green-300 flex-shrink-0" aria-hidden="true" />}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <footer className="mt-10 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-white/70">
            Retro Toon TV — Canal retro 24/7 · Horario de la Ciudad de México · {theme.name}
          </p>
        </footer>
      </div>
    </div>
  );
}

function CafeButton({ href, accent }: { href: string | null; accent: string }) {
  const className = "inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-white";
  const style = {
    background: `${accent}24`,
    border: `1px solid ${accent}66`,
  };
  const label = (
    <>
      <Coffee size={16} aria-hidden="true" />
      Invítame un café
    </>
  );
  if (!href) {
    return (
      <button type="button" className={className} style={style} aria-disabled="true">
        {label}
      </button>
    );
  }
  return (
    <a className={className} style={style} href={href} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  );
}
