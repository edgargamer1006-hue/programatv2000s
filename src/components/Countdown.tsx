import { useEffect, useState } from "react";
import { getCountdownTarget } from "../data";
import type { ThemeSkin } from "../types";

/* ============================================================
 *  CUENTA REGRESIVA
 *  El reloj de segundos vive aquí, no en la app completa.
 *  La meta se calcula con la fecha de America/Mexico_City.
 *  La etiqueta y las piedras salen del tema visible.
 * ============================================================ */

export default function Countdown({ skin }: { skin: ThemeSkin }) {
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

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-1 text-center">
        <span className="text-lg" aria-hidden="true">{skin.countdownIcon}</span>
        <p className={`${skin.headingFont} text-xl sm:text-2xl leading-tight text-center max-w-full`} style={{ color: skin.headingColor }}>{skin.countdownLabel}</p>
        <p className="text-sm uppercase tracking-widest font-semibold" style={{ color: skin.subColor }}>
          Faltan para el {target.name}
        </p>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl font-bold tabular-nums">
        <CountdownUnit value={days} label="Días" skin={skin} />
        <span style={{ color: skin.colonColor }} aria-hidden="true">:</span>
        <CountdownUnit value={hours} label="Hrs" skin={skin} />
        <span style={{ color: skin.colonColor }} aria-hidden="true">:</span>
        <CountdownUnit value={minutes} label="Min" skin={skin} />
        <span style={{ color: skin.colonColor }} aria-hidden="true">:</span>
        <CountdownUnit value={seconds} label="Seg" skin={skin} />
      </div>
    </div>
  );
}

function CountdownUnit({ value, label, skin }: { value: number; label: string; skin: ThemeSkin }) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`px-2.5 sm:px-3 py-1 min-w-[2.5rem] sm:min-w-[3rem] text-center ${skin.cardClass}`}
        style={{
          color: skin.unitColor,
          background: skin.unitBg,
          border: `1px solid ${skin.unitBorder}`,
          boxShadow: skin.cardGlow,
        }}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="text-[10px] mt-1 uppercase tracking-wider font-semibold" style={{ color: skin.unitLabel }}>{label}</span>
    </div>
  );
}
