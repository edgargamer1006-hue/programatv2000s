import { useMemo } from "react";
import { usePrefersReducedMotion } from "../lib/hooks";

interface SeasonalEffectsProps {
  effect: "snow" | "papel-picado" | "neon-flicker" | "cempasuchil" | "none" | "summer" | "pre-halloween";
}

export default function SeasonalEffects({ effect }: SeasonalEffectsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const particles = useMemo(() => {
    if (reduceMotion) return [];
    if (effect === "snow") {
      return Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 8,
        size: 2 + Math.random() * 3,
        glyph: "",
      }));
    }
    if (effect === "cempasuchil") {
      return Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 8,
        size: 8 + Math.random() * 6,
        glyph: "🌼",
      }));
    }
    if (effect === "pre-halloween") {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 8,
        size: 8 + Math.random() * 6,
        glyph: i % 3 === 0 ? "🕸️" : i % 3 === 1 ? "🦇" : "🕷️",
      }));
    }
    return [];
  }, [effect, reduceMotion]);

  if (effect === "none" || reduceMotion) return null;

  if (effect === "snow") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="season-drift absolute rounded-full bg-white opacity-50"
            style={{
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `snowfall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  if (effect === "cempasuchil") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="season-drift absolute opacity-60"
            style={{
              left: `${particle.left}%`,
              fontSize: `${particle.size}px`,
              animation: `snowfall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          >
            {particle.glyph}
          </div>
        ))}
        <div className="absolute top-0 left-0 right-0 flex justify-around items-center h-10">
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
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-orange-900/10" />
        <div
          className="season-drift absolute top-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl"
          style={{ background: "#ff6600", opacity: 0.08, animation: "fog-drift 20s ease-in-out infinite" }}
        />
        <div
          className="season-drift absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{ background: "#9b2d9b", opacity: 0.08, animation: "fog-drift 25s ease-in-out infinite reverse" }}
        />
      </div>
    );
  }

  if (effect === "pre-halloween") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-500/10 to-transparent" />
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="season-drift absolute opacity-40"
            style={{
              left: `${particle.left}%`,
              fontSize: `${particle.size}px`,
              animation: `snowfall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          >
            {particle.glyph}
          </div>
        ))}
      </div>
    );
  }

  if (effect === "summer") {
    return (
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
        <div className="season-drift absolute top-10 right-10 text-5xl opacity-40" style={{ animation: "sway 4s ease-in-out infinite" }}>
          ☀️
        </div>
      </div>
    );
  }

  return null;
}
