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

  if (effect === "none") return null;

  if (reduceMotion && effect === "neon-flicker") {
    return <HalloweenAtmosphere animate={false} />;
  }

  if (reduceMotion) return null;

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
    return <HalloweenAtmosphere animate />;
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

const BATS = [
  { top: "11%", left: "6%", delay: "0s", size: "text-2xl" },
  { top: "20%", left: "16%", delay: "1.4s", size: "text-lg" },
  { top: "8%", right: "22%", delay: "0.6s", size: "text-xl" },
  { top: "18%", right: "8%", delay: "2s", size: "text-lg" },
];

function HalloweenAtmosphere({ animate }: { animate: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div
        className="absolute top-8 right-[6%] w-16 h-16 sm:w-28 sm:h-28 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #f7ffe8 0%, #d5f7b0 42%, #6f9164 70%, transparent 72%)",
          boxShadow: "0 0 36px rgba(190, 255, 170, 0.35)",
          opacity: 0.72,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0a28]/75 via-[#12081c]/30 to-transparent" />
      <div
        className="season-drift absolute top-1/3 left-[12%] w-80 h-56 rounded-full blur-3xl"
        style={{ background: "#ff8c1a", opacity: 0.1, animation: animate ? "fog-drift 22s ease-in-out infinite" : "none" }}
      />
      <div
        className="season-drift absolute bottom-[18%] right-[10%] w-72 h-48 rounded-full blur-3xl"
        style={{ background: "#6b2d9b", opacity: 0.16, animation: animate ? "fog-drift 26s ease-in-out infinite reverse" : "none" }}
      />
      {BATS.map((bat) => (
        <span
          key={`${bat.top}-${bat.left ?? bat.right}`}
          className={`absolute opacity-80 ${bat.size} ${animate ? "bat-fly" : ""}`}
          style={{ top: bat.top, left: bat.left, right: bat.right, animationDelay: bat.delay }}
        >
          🦇
        </span>
      ))}
    </div>
  );
}
