import { useEffect, useState } from "react";
import { getMexicoDateTime } from "./mexico-time";

/** Cambia una vez por minuto de Ciudad de México. No mueve el reloj de segundos. */
export function useMexicoMinute(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timeout = 0;

    const arm = () => {
      const current = new Date();
      const { second } = getMexicoDateTime(current);
      const wait = (60 - second) * 1000 - current.getMilliseconds() + 40;
      timeout = window.setTimeout(() => {
        setNow(new Date());
        arm();
      }, Math.max(250, wait));
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") setNow(new Date());
    };

    arm();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return now;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
