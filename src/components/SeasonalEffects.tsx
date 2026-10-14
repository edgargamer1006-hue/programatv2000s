import { useMemo } from "react";

interface SeasonalEffectsProps {
  effect: "snow" | "papel-picado" | "neon-flicker" | "cempasuchil" | "none" | "summer" | "pre-halloween";
}

/* ============================================================
 *  EFECTOS VISUALES ESTACIONALES
 *  ------------------------------------------------------------
 *  Nieve, papel picado, neón, cempasúchil, pre-halloween.
 *  Renderiza partículas animadas con CSS puro.
 *  Todos los efectos usan opacidad baja para ser eyestrain-friendly.
 * ============================================================ */
export default function SeasonalEffects({ effect }: SeasonalEffectsProps) {
  const particles = useMemo(() => {
    if (effect === "snow") {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 5 + Math.random() * 10,
        size: 2 + Math.random() * 3,
      }));
    }
    if (effect === "cempasuchil") {
      return Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 8,
        size: 6 + Math.random() * 6,
      }));
    }
    if (effect === "pre-halloween") {
      return Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 8 + Math.random() * 10,
        size: 4 + Math.random() * 6,
      }));
    }
    return [];
  }, [effect]);

  if (effect === "snow") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white opacity-50"
            style={{
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (effect === "cempasuchil") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute opacity-50"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            🌼
          </div>
        ))}
        <div className="absolute top-0 left-0 right-0 flex justify-around items-center h-10 pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <div
              key={i}
              className="papel-picado"
              style={{
                animationDelay: `${i * 0.2}s`,
                background: ["#ff8c00", "#e63946", "#9b2d9b", "#ffd23f", "#06d6a0"][i % 5],
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (effect === "neon-flicker") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-transparent to-orange-900/5" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-orange-500/3 to-transparent" />
        <div
          className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-8"
          style={{ background: "#ff6600", animation: "fog-drift 20s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-8"
          style={{ background: "#9b2d9b", animation: "fog-drift 25s ease-in-out infinite reverse" }}
        />
      </div>
    );
  }

  if (effect === "pre-halloween") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {/* Subtle fog */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/5 to-transparent" />
        <div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-8"
          style={{ background: "#ff6600", animation: "fog-drift 25s ease-in-out infinite" }}
        />
        {/* Floating spooky particles — spider webs, tiny bats */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute opacity-25"
            style={{
              left: `${p.left}%`,
              fontSize: `${p.size}px`,
              animation: `snowfall ${p.duration}s linear ${p.delay}s infinite`,
            }}
          >
            {p.id % 3 === 0 ? "🕸️" : p.id % 3 === 1 ? "🦇" : "🕷️"}
          </div>
        ))}
      </div>
    );
  }

  if (effect === "summer") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        <div className="absolute top-10 right-10 text-5xl opacity-30" style={{ animation: "sway 4s ease-in-out infinite" }}>
          ☀️
        </div>
      </div>
    );
  }

  return null;
}
