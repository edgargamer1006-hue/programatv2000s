import { useEffect, useState, type CSSProperties } from "react";
import { formatMexicoClock } from "../lib/mexico-time";

interface MexicoClockProps {
  className?: string;
  style?: CSSProperties;
}

/** Reloj de pared de la Ciudad de México. Se actualiza solo, sin redibujar la app. */
export default function MexicoClock({ className, style }: MexicoClockProps) {
  const [text, setText] = useState(() => formatMexicoClock(new Date()));

  useEffect(() => {
    let timeout = 0;
    const arm = () => {
      const current = new Date();
      setText(formatMexicoClock(current));
      timeout = window.setTimeout(arm, 1000 - current.getMilliseconds() + 20);
    };
    arm();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <time className={className} style={style} dateTime={text}>
      {text}
    </time>
  );
}
