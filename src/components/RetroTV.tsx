import { useState, useEffect } from "react";
import { Power, Eye, EyeOff, Radio, MonitorSpeaker, Volume2 } from "lucide-react";
import type { Program, ThemeDecoration, SeasonMode } from "../types";
import { formatHour } from "../lib/scheduler";

interface RetroTVProps {
  currentProgram: Program | null;
  nextProgram: Program | null;
  channelName: string;
  channelLogo: string;
  accent: string;
  accent2: string;
  isLive: boolean;
  isSeen: boolean;
  onToggleSeen: () => void;
  clock: string;
  themeName: string;
  decoration: ThemeDecoration;
  fontClass: string;
  seasonMode: SeasonMode;
}

export default function RetroTV({
  currentProgram,
  nextProgram,
  channelName,
  channelLogo,
  accent,
  accent2,
  isLive,
  isSeen,
  onToggleSeen,
  clock,
  themeName,
  decoration,
  fontClass,
  seasonMode,
}: RetroTVProps) {
  const [poweredOn, setPoweredOn] = useState(true);
  const [isOff, setIsOff] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [currentEmbed, setCurrentEmbed] = useState(currentProgram?.embedUrl ?? "");
  const [volume, setVolume] = useState(60);

  useEffect(() => {
    const newUrl = currentProgram?.embedUrl ?? "";
    if (newUrl !== currentEmbed) {
      setShowStatic(true);
      const timer = setTimeout(() => {
        setCurrentEmbed(newUrl);
        setShowStatic(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentProgram?.embedUrl, currentEmbed]);

  const handlePower = () => {
    if (poweredOn) {
      setIsOff(true);
      setTimeout(() => {
        setPoweredOn(false);
        setIsOff(false);
      }, 600);
    } else {
      setPoweredOn(true);
    }
  };

  const ledColor = !poweredOn ? "#333" : seasonMode === "halloween" || seasonMode === "dia-muertos" ? "#ff6600" : seasonMode === "navidad" ? "#e63946" : seasonMode === "pre-halloween" ? "#ff6600" : "#00b4ff";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Soft ambient glow — eyestrain-friendly, very dim */}
      <div
        className="absolute inset-0 blur-3xl opacity-10 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
      />

      {/* === TV Body — dark matte carbon === */}
      <div
        className="relative rounded-2xl p-4 sm:p-6 shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #1a1a1e, #14141a, #0f0f11)",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: `0 0 30px ${accent}08, inset 0 1px 2px rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.7)`,
        }}
      >
        {/* === Themed decorative icons on frame === */}
        <div className="absolute top-1.5 left-2 flex gap-0.5 text-[10px] opacity-40 pointer-events-none">
          {decoration.frameIcons.slice(0, 3).map((icon, i) => (
            <span key={i} className="frame-icon-float" style={{ animationDelay: `${i * 0.5}s` }}>{icon}</span>
          ))}
        </div>
        <div className="absolute top-1.5 right-2 flex gap-0.5 text-[10px] opacity-40 pointer-events-none">
          {decoration.frameIcons.slice(3).map((icon, i) => (
            <span key={i} className="frame-icon-float" style={{ animationDelay: `${i * 0.7}s` }}>{icon}</span>
          ))}
        </div>

        {/* Texture dots — speaker grille simulation */}
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 flex gap-1 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-0.5 h-0.5 rounded-full bg-white/8" />
          ))}
        </div>

        {/* === Screen === */}
        <div
          className="relative rounded-lg overflow-hidden bg-black mx-auto"
          style={{
            aspectRatio: "4/3",
            maxWidth: "100%",
            boxShadow: `inset 0 0 80px rgba(0,0,0,0.9), inset 0 0 20px ${accent}08`,
            border: "2px solid #0a0a0c",
          }}
        >
          {/* Vignette — darkened corners, eyestrain-friendly */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.5)",
              background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          {/* Scanlines — subtler for eye comfort */}
          <div className="absolute inset-0 pointer-events-none z-20 scanlines" />
          {/* Soft CRT glow — very dim */}
          <div
            className="absolute inset-0 pointer-events-none z-15"
            style={{ background: `radial-gradient(ellipse at center, ${accent}04, transparent 70%)` }}
          />

          {/* Powered on */}
          {poweredOn && !isOff && (
            <>
              {showStatic ? (
                <div className="absolute inset-0 z-25 tv-static" />
              ) : (
                <>
                  {currentEmbed ? (
                    <iframe
                      key={currentEmbed}
                      src={currentEmbed}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: "none", filter: "brightness(0.85) contrast(1.05)" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentProgram?.titulo ?? "Retro TV"}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                      <p className="text-white/30 text-sm">Sin programación</p>
                    </div>
                  )}
                </>
              )}

              {/* Channel bug */}
              <div
                className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider channel-bug"
                style={{ color: accent, background: "rgba(0,0,0,0.5)", border: `1px solid ${accent}30`, textShadow: `0 0 4px ${accent}60` }}
              >
                {channelLogo}
              </div>

              {/* Live banner */}
              {isLive && currentProgram && (
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded animate-pulse" style={{ background: accent, color: "#000" }}>EN VIVO</span>
                    <p className="text-white/90 text-xs sm:text-sm font-semibold truncate">{currentProgram.titulo}</p>
                  </div>
                  {nextProgram && (
                    <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 truncate">A continuación: {nextProgram.titulo} — {formatHour(nextProgram.horaInicio)}</p>
                  )}
                </div>
              )}

              {/* On-screen clock */}
              <div
                className="absolute top-3 left-3 z-20 text-[10px] font-mono tabular-nums"
                style={{ color: `${accent}cc`, background: "rgba(0,0,0,0.4)", padding: "2px 6px", borderRadius: "3px" }}
              >
                {clock}
              </div>
            </>
          )}

          {/* CRT shutdown */}
          {isOff && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
              <div className="crt-shutdown w-full h-0.5 bg-white" />
            </div>
          )}

          {/* Powered off */}
          {!poweredOn && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-1/3 h-0.5 bg-zinc-800 rounded-full" />
            </div>
          )}
        </div>

        {/* === Control panel — textured buttons === */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            {/* Power button — textured */}
            <button
              onClick={handlePower}
              className="relative w-11 h-11 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center"
              style={{
                background: poweredOn
                  ? `radial-gradient(circle at 30% 30%, ${accent}25, #14141a 70%)`
                  : "radial-gradient(circle at 30% 30%, #2a2a2e, #0f0f11 70%)",
                border: `1px solid ${poweredOn ? accent + "40" : "#2a2a2e"}`,
                boxShadow: poweredOn
                  ? `0 0 8px ${accent}25, inset 0 1px 2px rgba(255,255,255,0.05)`
                  : "inset 0 1px 2px rgba(0,0,0,0.5)",
              }}
              aria-label={poweredOn ? "Apagar TV" : "Encender TV"}
            >
              <Power size={18} className={poweredOn ? "text-white/80" : "text-zinc-600"} />
            </button>

            {/* LED indicator — changes color by season */}
            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: ledColor,
                  boxShadow: poweredOn ? `0 0 6px ${ledColor}, 0 0 12px ${ledColor}40` : "none",
                }}
              />
              <span className="text-[8px] text-zinc-600 uppercase tracking-wider font-mono">PWR</span>
            </div>

            {/* Physical buttons — textured */}
            <div className="hidden sm:flex items-center gap-1 ml-1">
              <button className="w-7 h-7 rounded bg-gradient-to-b from-[#2a2a2e] to-[#14141a] border border-[#2a2a2e] flex items-center justify-center hover:from-[#333] transition-colors active:scale-95" title="Canal anterior">
                <Radio size={12} className="text-zinc-500" />
              </button>
              <button className="w-7 h-7 rounded bg-gradient-to-b from-[#2a2a2e] to-[#14141a] border border-[#2a2a2e] flex items-center justify-center hover:from-[#333] transition-colors active:scale-95" title="Audio">
                <MonitorSpeaker size={12} className="text-zinc-500" />
              </button>
            </div>

            {/* Volume slider — textured */}
            <div className="hidden md:flex items-center gap-1.5 ml-1">
              <Volume2 size={12} className="text-zinc-600" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${accent}40 ${volume}%, #1a1a1e ${volume}%)`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:block text-[10px] font-bold tracking-wider px-2.5 py-1 rounded" style={{ color: `${accent2}aa`, border: `1px solid ${accent2}20`, background: `${accent2}08` }}>
              {channelName}
            </span>
            {currentProgram && (
              <button
                onClick={onToggleSeen}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: isSeen ? `${accent}15` : "rgba(26,26,30,0.6)",
                  border: `1px solid ${isSeen ? accent + "40" : "rgba(255,255,255,0.06)"}`,
                  color: isSeen ? accent : "rgba(255,255,255,0.5)",
                }}
              >
                {isSeen ? <EyeOff size={14} /> : <Eye size={14} />}
                {isSeen ? "Ya Visto" : "Marcar como Visto"}
              </button>
            )}
          </div>
        </div>

        {/* Brand */}
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-[9px] text-zinc-700 tracking-[0.3em] uppercase">RetroToon</span>
          <span className="text-[9px] text-zinc-800">•</span>
          <span className="text-[9px] text-zinc-700 tracking-wider" style={{ fontFamily: fontClass }}>{themeName}</span>
        </div>
      </div>

      {/* Legs */}
      <div className="flex justify-between px-12 max-w-xs mx-auto mt-1.5">
        <div className="w-3.5 h-5 bg-gradient-to-b from-[#1a1a1e] to-[#0f0f11] rounded-b-md" />
        <div className="w-3.5 h-5 bg-gradient-to-b from-[#1a1a1e] to-[#0f0f11] rounded-b-md" />
      </div>
    </div>
  );
}
