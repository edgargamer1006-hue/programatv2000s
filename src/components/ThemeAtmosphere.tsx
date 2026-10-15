import { useMemo, type ReactNode } from "react";
import type { SkinId } from "../types";
import { usePrefersReducedMotion } from "../lib/hooks";
import HalloweenDecor from "./HalloweenDecor";

interface ThemeAtmosphereProps {
  skinId: SkinId;
}

export default function ThemeAtmosphere({ skinId }: ThemeAtmosphereProps) {
  const reduceMotion = usePrefersReducedMotion();

  if (skinId === "halloween") {
    return (
      <>
        <HalloweenDecor />
        <HalloweenSky animate={!reduceMotion} />
      </>
    );
  }
  if (skinId === "harvest") return <HarvestSky animate={!reduceMotion} />;
  if (skinId === "ofrenda") return <OfrendaSky animate={!reduceMotion} />;
  if (skinId === "navidad") return <NavidadSky animate={!reduceMotion} />;
  if (skinId === "nino") return <NinoSky animate={!reduceMotion} />;
  if (skinId === "verano") return <VeranoSky animate={!reduceMotion} />;
  return <SalaSky />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      {children}
    </div>
  );
}

function HalloweenSky({ animate }: { animate: boolean }) {
  const bats = [
    { top: "11%", left: "6%", delay: "0s", size: "text-2xl" },
    { top: "20%", left: "16%", delay: "1.4s", size: "text-lg" },
    { top: "8%", right: "22%", delay: "0.6s", size: "text-xl" },
    { top: "18%", right: "8%", delay: "2s", size: "text-lg" },
  ];
  return (
    <Frame>
      <div
        className="absolute top-8 right-[6%] w-16 h-16 sm:w-28 sm:h-28 rounded-full"
        style={{
          background: "radial-gradient(circle at 35% 35%, #f7ffe8 0%, #d5f7b0 42%, #6f9164 70%, transparent 72%)",
          boxShadow: "0 0 36px rgba(190, 255, 170, 0.35)",
          opacity: 0.72,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#1a0a28]/75 via-[#12081c]/30 to-transparent" />
      <div className="absolute top-1/3 left-[12%] w-80 h-56 rounded-full blur-3xl" style={{ background: "#ff8c1a", opacity: 0.1, animation: animate ? "fog-drift 22s ease-in-out infinite" : "none" }} />
      <div className="absolute bottom-[18%] right-[10%] w-72 h-48 rounded-full blur-3xl" style={{ background: "#6b2d9b", opacity: 0.16, animation: animate ? "fog-drift 26s ease-in-out infinite reverse" : "none" }} />
      {bats.map((bat) => (
        <span key={`${bat.top}-${bat.left ?? bat.right}`} className={`absolute opacity-80 ${bat.size} ${animate ? "bat-fly" : ""}`} style={{ top: bat.top, left: bat.left, right: bat.right, animationDelay: bat.delay }}>
          🦇
        </span>
      ))}
    </Frame>
  );
}

function HarvestSky({ animate }: { animate: boolean }) {
  const leaves = [
    { top: "14%", left: "8%", glyph: "🍁", delay: "0s" },
    { top: "28%", left: "18%", glyph: "🍂", delay: "0.8s" },
    { top: "12%", right: "14%", glyph: "🍁", delay: "0.4s" },
    { top: "32%", right: "8%", glyph: "🍂", delay: "1.2s" },
  ];
  return (
    <Frame>
      <div className="absolute -top-10 left-[8%] w-40 h-40 sm:w-56 sm:h-56 rounded-full" style={{ background: "radial-gradient(circle, #ffb15a 0%, #e8782a 42%, transparent 70%)", opacity: 0.55 }} />
      <span className="absolute bottom-[8%] left-[4%] text-3xl opacity-80">🎃</span>
      <span className="absolute bottom-[6%] right-[5%] text-2xl opacity-70">🎃</span>
      {leaves.map((leaf) => (
        <span key={`${leaf.top}${leaf.left ?? leaf.right}`} className={`absolute text-2xl opacity-80 ${animate ? "leaf-sway" : ""}`} style={{ top: leaf.top, left: leaf.left, right: leaf.right, animationDelay: leaf.delay }}>
          {leaf.glyph}
        </span>
      ))}
    </Frame>
  );
}

function OfrendaSky({ animate }: { animate: boolean }) {
  const colors = ["#e23d8c", "#ffb000", "#6b2d8b", "#ff4fa3", "#ffd27a", "#9b2d9b"];
  return (
    <Frame>
      <div className="absolute top-0 left-0 right-0 flex justify-around items-start h-12">
        {colors.map((color, index) => (
          <div key={color + index} className={`papel-picado ${animate ? "" : ""}`} style={{ background: color, animationDelay: `${index * 0.15}s`, animation: animate ? undefined : "none" }} />
        ))}
      </div>
      <span className="absolute top-14 left-[5%] text-3xl">💀</span>
      <span className="absolute top-16 right-[6%] text-2xl">💀</span>
      <span className={`absolute top-24 left-[14%] text-2xl ${animate ? "candle-flicker" : ""}`}>🕯️</span>
      <span className={`absolute top-20 right-[16%] text-2xl ${animate ? "candle-flicker" : ""}`} style={{ animationDelay: "0.6s" }}>🕯️</span>
      <span className="absolute bottom-[10%] left-[8%] text-2xl opacity-80">🌼</span>
      <span className="absolute bottom-[14%] right-[10%] text-3xl opacity-80">🌼</span>
    </Frame>
  );
}

function NavidadSky({ animate }: { animate: boolean }) {
  const bulbs = ["#e23b4a", "#f0c14a", "#1f8a4c", "#fff6e4", "#e23b4a", "#5ee0c0", "#f0c14a", "#fff6e4"];
  const flakes = useMemo(() => Array.from({ length: animate ? 16 : 8 }, (_, index) => ({
    id: index,
    left: `${(index * 17) % 100}%`,
    top: animate ? "-8%" : `${8 + (index * 13) % 70}%`,
    delay: `${(index % 6) * 0.7}s`,
    size: 8 + (index % 4) * 3,
  })), [animate]);
  return (
    <Frame>
      <div className="absolute top-1 left-0 right-0 flex justify-around px-2">
        {bulbs.map((color, index) => (
          <span key={color + index} className={`w-2.5 h-2.5 rounded-full ${animate ? "light-twinkle" : ""}`} style={{ background: color, boxShadow: `0 0 8px ${color}`, animationDelay: `${index * 0.2}s` }} />
        ))}
      </div>
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className={`absolute rounded-full bg-white/80 ${animate ? "flake-fall" : ""}`}
          style={{ left: flake.left, top: flake.top, width: flake.size, height: flake.size, animationDelay: flake.delay, animationDuration: `${10 + (flake.id % 5)}s` }}
        />
      ))}
    </Frame>
  );
}

function NinoSky({ animate }: { animate: boolean }) {
  const balloons = [
    { top: "10%", left: "5%", glyph: "🎈", delay: "0s" },
    { top: "22%", left: "12%", glyph: "🎈", delay: "0.5s" },
    { top: "8%", right: "7%", glyph: "🎈", delay: "0.8s" },
    { top: "24%", right: "14%", glyph: "🎈", delay: "0.2s" },
  ];
  const bits = ["#ff4f9a", "#3ec6ff", "#ffe566", "#b6ff4a", "#ff8ad4"];
  return (
    <Frame>
      {balloons.map((item) => (
        <span key={`${item.top}${item.left ?? item.right}`} className={`absolute text-3xl ${animate ? "balloon-bob" : ""}`} style={{ top: item.top, left: item.left, right: item.right, animationDelay: item.delay }}>
          {item.glyph}
        </span>
      ))}
      {bits.map((color, index) => (
        <span key={color} className="absolute w-2 h-2 rounded-sm opacity-80" style={{ background: color, top: `${18 + index * 8}%`, left: index % 2 === 0 ? "4%" : undefined, right: index % 2 === 1 ? "4%" : undefined, transform: `rotate(${index * 18}deg)` }} />
      ))}
    </Frame>
  );
}

function VeranoSky({ animate }: { animate: boolean }) {
  return (
    <Frame>
      <div className="absolute top-6 right-[8%] w-20 h-20 sm:w-28 sm:h-28 rounded-full" style={{ background: "radial-gradient(circle, #fff4c4 0%, #ffd15c 40%, #ff8a3a 68%, transparent 72%)", boxShadow: "0 0 36px rgba(255, 209, 92, 0.45)" }} />
      <span className={`absolute bottom-[18%] left-[3%] text-5xl origin-bottom ${animate ? "leaf-sway" : ""}`}>🌴</span>
      <span className={`absolute bottom-[14%] right-[4%] text-4xl origin-bottom ${animate ? "leaf-sway" : ""}`} style={{ animationDelay: "0.8s" }}>🌴</span>
      <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: "linear-gradient(180deg, transparent, rgba(14,110,120,0.45))" }} />
    </Frame>
  );
}

function SalaSky() {
  return (
    <Frame>
      <div className="absolute top-[18%] -left-10 w-56 h-72 rounded-full blur-2xl" style={{ background: "rgba(255,176,103,0.28)" }} />
      <div className="absolute top-10 right-[6%] w-24 h-36 rounded-t-full opacity-40" style={{ background: "linear-gradient(180deg, rgba(190,210,230,0.35), transparent)", border: "2px solid rgba(220,226,234,0.25)" }} />
      <span className="absolute bottom-[12%] left-[6%] text-3xl opacity-80">🪴</span>
    </Frame>
  );
}
