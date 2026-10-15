import { useEffect, useRef, useState } from "react";
import { Power, Eye, EyeOff, Radio, Volume2, VolumeX } from "lucide-react";
import type { Program, ThemeDecoration, SeasonMode } from "../types";
import { elapsedSecondsInProgram } from "../lib/scheduler";
import { formatMinute12 } from "../lib/mexico-time";
import MexicoClock from "./MexicoClock";
import SignalFallback from "./SignalFallback";

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
  themeName,
  decoration,
  fontClass,
  seasonMode,
}: RetroTVProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [poweredOn, setPoweredOn] = useState(true);
  const [isOff, setIsOff] = useState(false);
  const [showStatic, setShowStatic] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [volume, setVolume] = useState(60);
  const [muted, setMuted] = useState(false);
  const [mediaError, setMediaError] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);

  const videoUrl = currentProgram?.videoUrl.trim() ?? "";

  useEffect(() => {
    setMediaError(false);
    setNeedsGesture(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShowStatic(false);
      return;
    }
    setShowStatic(true);
    const timer = window.setTimeout(() => setShowStatic(false), 650);
    return () => window.clearTimeout(timer);
  }, [currentProgram?.id]);

  const seekAndPlay = () => {
    const video = videoRef.current;
    if (!video || !poweredOn || !currentProgram || !videoUrl) return;
    const duration = video.duration;
    if (isLive && Number.isFinite(duration) && duration > 0) {
      const elapsed = elapsedSecondsInProgram(currentProgram);
      const target = elapsed % duration;
      video.currentTime = Math.min(target, Math.max(0, duration - 0.25));
    } else if (!isLive) {
      video.currentTime = 0;
    }
    video.volume = volume / 100;
    video.muted = muted || volume === 0;
    video.play().then(() => {
      setNeedsGesture(false);
    }).catch(() => {
      video.muted = true;
      setNeedsGesture(true);
      video.play().catch(() => {});
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume / 100;
    if (!needsGesture) video.muted = muted || volume === 0;
  }, [volume, muted, needsGesture, showStatic, videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || showStatic || !poweredOn || video.readyState < 1) return;
    seekAndPlay();
    // seekAndPlay lee el volumen y el modo en vivo de este render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLive, currentProgram?.id, showStatic, poweredOn]);

  const handlePower = () => {
    if (poweredOn) {
      setIsOff(true);
      videoRef.current?.pause();
      window.setTimeout(() => {
        setPoweredOn(false);
        setIsOff(false);
      }, 600);
    } else {
      setPoweredOn(true);
    }
  };

  const activateSound = () => {
    const video = videoRef.current;
    setMuted(false);
    setNeedsGesture(false);
    if (!video) return;
    video.muted = false;
    video.volume = Math.max(volume, 20) / 100;
    if (volume === 0) setVolume(60);
    video.play().catch(() => {});
  };

  const ledColor = !poweredOn
    ? "#333"
    : seasonMode === "halloween" || seasonMode === "dia-muertos" || seasonMode === "pre-halloween"
      ? "#ff6600"
      : seasonMode === "navidad"
        ? "#e63946"
        : "#00b4ff";

  const showVideo = Boolean(videoUrl) && !mediaError && !showStatic;
  const haunted = seasonMode === "halloween";

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div
        className="absolute inset-0 blur-3xl opacity-10 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${haunted ? "#b6ff8a" : accent}, transparent 70%)` }}
      />

      <div
        className={haunted ? "haunted-cabinet relative rounded-[1.7rem] p-3 sm:p-5" : "relative rounded-2xl p-4 sm:p-6 shadow-2xl"}
        style={haunted ? undefined : {
          background: "linear-gradient(145deg, #1a1a1e, #14141a, #0f0f11)",
          border: "1px solid rgba(255,255,255,0.04)",
          boxShadow: `0 0 30px ${accent}08, inset 0 1px 2px rgba(255,255,255,0.05), 0 16px 48px rgba(0,0,0,0.7)`,
        }}
      >
        {haunted && (
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl drop-shadow" aria-hidden="true">🎃</span>
        )}
        <div className={`absolute top-2 left-3 flex gap-1 pointer-events-none ${haunted ? "text-base" : "text-[10px] opacity-60"}`} aria-hidden="true">
          {decoration.frameIcons.slice(0, 3).map((icon, i) => (
            <span key={i} className="frame-icon-float" style={{ animationDelay: `${i * 0.5}s` }}>{icon}</span>
          ))}
        </div>
        <div className={`absolute top-2 right-3 flex gap-1 pointer-events-none ${haunted ? "text-base" : "text-[10px] opacity-60"}`} aria-hidden="true">
          {decoration.frameIcons.slice(3).map((icon, i) => (
            <span key={i} className="frame-icon-float" style={{ animationDelay: `${i * 0.7}s` }}>{icon}</span>
          ))}
        </div>

        <div
          className={`relative rounded-lg overflow-hidden bg-black mx-auto mt-4 ${haunted ? "haunted-bezel crt-flicker" : ""}`}
          style={{
            aspectRatio: "4/3",
            boxShadow: haunted ? undefined : `inset 0 0 80px rgba(0,0,0,0.9), inset 0 0 20px ${accent}08`,
            border: haunted ? undefined : "2px solid #0a0a0c",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.7), inset 0 0 20px rgba(0,0,0,0.5)",
              background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.4) 100%)",
            }}
          />
          <div className="absolute inset-0 pointer-events-none z-20 scanlines" />

          {poweredOn && !isOff && (
            <>
              {showStatic && <div className="absolute inset-0 z-25 tv-static" />}
              {!showStatic && showVideo && (
                <video
                  ref={videoRef}
                  key={`${currentProgram?.id ?? "vacio"}|${videoUrl}`}
                  className="absolute inset-0 w-full h-full bg-black object-contain"
                  src={videoUrl}
                  playsInline
                  loop
                  preload="auto"
                  onLoadedMetadata={seekAndPlay}
                  onError={() => setMediaError(true)}
                />
              )}
              {!showStatic && !showVideo && (
                <SignalFallback
                  title={currentProgram?.titulo}
                  detail={mediaError ? "No se pudo reproducir el video." : undefined}
                />
              )}

              {needsGesture && showVideo && (
                <button
                  type="button"
                  onClick={activateSound}
                  className="absolute inset-0 z-30 flex items-end justify-center pb-16"
                  aria-label="Activar sonido"
                >
                  <span className="px-4 py-2 rounded-full text-sm font-bold text-white bg-black/75 border border-white/30">
                    Toca para escuchar
                  </span>
                </button>
              )}

              <div
                className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider channel-bug"
                style={{ color: accent, background: "rgba(0,0,0,0.55)", border: `1px solid ${accent}55` }}
              >
                {channelLogo}
              </div>

              {isLive && currentProgram && (
                <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-2" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88), transparent)" }}>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded live-pulse" style={{ background: accent, color: "#000" }}>EN VIVO</span>
                    <p className="text-white text-xs sm:text-sm font-semibold truncate">{currentProgram.titulo}</p>
                  </div>
                  {nextProgram && (
                    <p className="text-white/80 text-[10px] sm:text-xs mt-0.5 truncate">
                      A continuación: {nextProgram.titulo} — {formatMinute12(nextProgram.startMinute)}
                    </p>
                  )}
                </div>
              )}

              <MexicoClock
                className="absolute top-3 left-3 z-20 text-[10px] font-mono tabular-nums"
                style={{ color: accent, background: "rgba(0,0,0,0.55)", padding: "2px 6px", borderRadius: "3px" }}
              />
            </>
          )}

          {isOff && (
            <div className="absolute inset-0 z-40 flex items-center justify-center bg-black">
              <div className="crt-shutdown w-full h-0.5 bg-white" />
            </div>
          )}

          {!poweredOn && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="w-1/3 h-0.5 bg-zinc-800 rounded-full" />
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePower}
              className="relative w-11 h-11 rounded-full transition-all duration-200 active:scale-90 flex items-center justify-center"
              style={{
                background: poweredOn
                  ? `radial-gradient(circle at 30% 30%, ${accent}25, #14141a 70%)`
                  : "radial-gradient(circle at 30% 30%, #2a2a2e, #0f0f11 70%)",
                border: `1px solid ${poweredOn ? accent + "66" : "#2a2a2e"}`,
                boxShadow: poweredOn ? `0 0 8px ${accent}25, inset 0 1px 2px rgba(255,255,255,0.05)` : "inset 0 1px 2px rgba(0,0,0,0.5)",
              }}
              aria-label={poweredOn ? "Apagar televisor" : "Encender televisor"}
              aria-pressed={poweredOn}
            >
              <Power size={18} className={poweredOn ? "text-white" : "text-zinc-400"} />
            </button>

            <div className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: ledColor,
                  boxShadow: poweredOn ? `0 0 6px ${ledColor}, 0 0 12px ${ledColor}40` : "none",
                }}
              />
              <span className="text-[8px] text-zinc-400 uppercase tracking-wider font-mono">PWR</span>
            </div>

            <button
              type="button"
              disabled
              className="hidden sm:flex w-7 h-7 rounded bg-gradient-to-b from-[#2a2a2e] to-[#14141a] border border-[#3a3a40] items-center justify-center"
              aria-label="Sintonizador"
            >
              <Radio size={12} className="text-zinc-300" />
            </button>

            <button
              type="button"
              onClick={() => {
                if (muted || volume === 0) activateSound();
                else setMuted(true);
              }}
              className="w-7 h-7 rounded bg-gradient-to-b from-[#2a2a2e] to-[#14141a] border border-[#3a3a40] flex items-center justify-center hover:from-[#333] transition-colors active:scale-95"
              aria-label={muted || volume === 0 ? "Activar sonido" : "Silenciar"}
              aria-pressed={muted || volume === 0}
            >
              {muted || volume === 0 ? <VolumeX size={12} className="text-zinc-200" /> : <Volume2 size={12} className="text-zinc-200" />}
            </button>

            <div className="flex items-center gap-1.5 ml-1">
              <input
                type="range"
                min={0}
                max={100}
                value={muted ? 0 : volume}
                aria-label="Volumen"
                onChange={(event) => {
                  const next = Number(event.target.value);
                  setVolume(next);
                  setMuted(next === 0);
                  setNeedsGesture(false);
                  const video = videoRef.current;
                  if (!video) return;
                  video.muted = next === 0;
                  video.volume = next / 100;
                  if (poweredOn && next > 0) video.play().catch(() => {});
                }}
                className="w-20 h-1 appearance-none rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${accent} ${muted ? 0 : volume}%, #3a3a42 ${muted ? 0 : volume}%)`,
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden lg:block text-[10px] font-bold tracking-wider px-2.5 py-1 rounded text-white/80" style={{ border: `1px solid ${accent2}55`, background: `${accent2}14` }}>
              {channelName}
            </span>
            {currentProgram && (
              <button
                type="button"
                onClick={onToggleSeen}
                aria-pressed={isSeen}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: isSeen ? `${accent}22` : "rgba(26,26,30,0.6)",
                  border: `1px solid ${isSeen ? accent + "66" : "rgba(255,255,255,0.14)"}`,
                  color: isSeen ? accent : "rgba(255,255,255,0.88)",
                }}
              >
                {isSeen ? <EyeOff size={14} /> : <Eye size={14} />}
                {isSeen ? "Ya visto" : "Marcar como visto"}
              </button>
            )}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-center gap-2">
          <span className={`text-[10px] tracking-[0.3em] uppercase ${haunted ? "text-[#ffb067]" : "text-zinc-400"}`}>RetroToon</span>
          <span className={`text-[10px] ${haunted ? "text-[#d4ffb8]" : "text-zinc-500"}`}>•</span>
          <span className={`text-[10px] tracking-wider ${haunted ? "text-[#ffe7c2] font-semibold" : `text-zinc-300 ${fontClass}`}`}>{themeName}</span>
        </div>
      </div>

      <div className="flex justify-between px-12 max-w-xs mx-auto mt-1.5" aria-hidden="true">
        <div className={`w-3.5 h-5 rounded-b-md ${haunted ? "bg-gradient-to-b from-[#6a3d1c] to-[#1c100a]" : "bg-gradient-to-b from-[#1a1a1e] to-[#0f0f11]"}`} />
        <div className={`w-3.5 h-5 rounded-b-md ${haunted ? "bg-gradient-to-b from-[#6a3d1c] to-[#1c100a]" : "bg-gradient-to-b from-[#1a1a1e] to-[#0f0f11]"}`} />
      </div>
    </div>
  );
}
