import { useEffect, useState } from "react";
import { getCountdownTarget } from "../data";
import type { SeasonMode } from "../types";

/* ============================================================
 *  CUENTA REGRESIVA INTELIGENTE
 *  ------------------------------------------------------------
 *  Cambia automáticamente el objetivo según la temporada:
 *  - Pre-Halloween: cuenta hacia el 1 de Octubre (Halloween)
 *  - Halloween (Oct): cuenta hacia el 1 de Nov (Día de Muertos)
 *  - Día de Muertos (1-2 Nov): cuenta hacia el 15 Dic (Navidad)
 *  - Resto: cuenta hacia el próximo Halloween
 * ============================================================ */

const MODE_STYLES: Record<SeasonMode, { accent: string; accent2: string; icon: string }> = {
  "pre-halloween": { accent: "#ff6600", accent2: "#cc4400", icon: "🎃" },
  "halloween": { accent: "#ff6600", accent2: "#9b2d9b", icon: "👻" },
  "dia-muertos": { accent: "#ff8c00", accent2: "#9b2d9b", icon: "💀" },
  "navidad": { accent: "#e63946", accent2: "#06d6a0", icon: "🎄" },
  "regular": { accent: "#00b4ff", accent2: "#ff006e", icon: "📺" },
};

export default function Countdown({ now }: { now: Date }) {
  const [target, setTarget] = useState(() => getCountdownTarget(now));

  useEffect(() => {
    setTarget(getCountdownTarget(now));
  }, [now]);

  const diff = target.date.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  const styles = MODE_STYLES[target.mode] ?? MODE_STYLES["regular"];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-lg">{styles.icon}</span>
        <p className="text-sm uppercase tracking-widest text-white/50">
          Faltan para el {target.name}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tabular-nums">
        <CountdownUnit value={days} label="Días" accent={styles.accent} />
        <span className="text-white/20">:</span>
        <CountdownUnit value={hours} label="Hrs" accent={styles.accent} />
        <span className="text-white/20">:</span>
        <CountdownUnit value={minutes} label="Min" accent={styles.accent} />
        <span className="text-white/20">:</span>
        <CountdownUnit value={seconds} label="Seg" accent={styles.accent} />
      </div>
    </div>
  );
}

function CountdownUnit({ value, label, accent }: { value: number; label: string; accent: string }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="rounded-lg px-2.5 sm:px-3 py-1 min-w-[2.5rem] sm:min-w-[3rem] text-center text-white"
        style={{
          background: "rgba(26,26,30,0.8)",
          border: `1px solid ${accent}25`,
          boxShadow: `inset 0 0 8px ${accent}10`,
        }}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/30 mt-1 uppercase tracking-wider">{label}</span>
    </div>
  );
}
