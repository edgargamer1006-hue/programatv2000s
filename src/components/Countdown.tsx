import { useEffect, useState } from "react";
import { getCountdownTarget } from "../data";
import type { SeasonMode } from "../types";

/* ============================================================
 *  CUENTA REGRESIVA
 *  El reloj de segundos vive aquí, no en la app completa.
 *  La meta se calcula con la fecha de America/Mexico_City.
 * ============================================================ */

const MODE_STYLES: Record<SeasonMode, { accent: string; icon: string }> = {
  "pre-halloween": { accent: "#ff6600", icon: "🎃" },
  halloween: { accent: "#ff6600", icon: "👻" },
  "dia-muertos": { accent: "#ff8c00", icon: "💀" },
  navidad: { accent: "#e63946", icon: "🎄" },
  regular: { accent: "#00b4ff", icon: "📺" },
};

export default function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeout = 0;
    const arm = () => {
      const current = new Date();
      setNow(current);
      timeout = window.setTimeout(arm, 1000 - current.getMilliseconds() + 20);
    };
    arm();
    return () => window.clearTimeout(timeout);
  }, []);

  const target = getCountdownTarget(now);
  const diff = target.date.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));
  const styles = MODE_STYLES[target.mode] ?? MODE_STYLES.regular;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden="true">{styles.icon}</span>
        <p className="text-sm uppercase tracking-widest text-white/80 font-semibold">
          Faltan para el {target.name}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tabular-nums">
        <CountdownUnit value={days} label="Días" accent={styles.accent} />
        <span className="text-white/55" aria-hidden="true">:</span>
        <CountdownUnit value={hours} label="Hrs" accent={styles.accent} />
        <span className="text-white/55" aria-hidden="true">:</span>
        <CountdownUnit value={minutes} label="Min" accent={styles.accent} />
        <span className="text-white/55" aria-hidden="true">:</span>
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
          border: `1px solid ${accent}55`,
        }}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] text-white/70 mt-1 uppercase tracking-wider font-semibold">{label}</span>
    </div>
  );
}
