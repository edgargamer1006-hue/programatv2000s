import type { MonthTheme, SeasonMode, ThemeDecoration } from "./types";
import { getCatalog } from "./data/catalog";
import { getMexicoDateTime, mexicoWallTime } from "./lib/mexico-time";
import { getDaySchedule } from "./lib/scheduler";
import { skinHalloween, skinHarvest, skinNavidad, skinNino, skinOfrenda, skinSala, skinVerano } from "./theme/skins";

/* ============================================================
 *  DECORACIONES TEMÁTICAS
 * ============================================================ */

const decPreHalloween: ThemeDecoration = {
  frameIcons: ["🍂", "🎃", "🍁", "🌙", "🌾", "📺"],
  headerBanner: "🎃 PRÓXIMAMENTE — ESPECIAL DE HALLOWEEN ESTE 1 DE OCTUBRE 👻",
  backgroundPattern: "pattern-pre-halloween",
  frameAccent: "#ff6600",
};

const decHalloween: ThemeDecoration = {
  frameIcons: ["🎃", "🦇", "👻", "🕸️", "💀", "🕷️"],
  headerBanner: "🎃 ESPECIAL DE TERROR — OCTUBRE 31 DÍAS DE MIEDO 👻",
  backgroundPattern: "pattern-halloween",
  frameAccent: "#ff8c1a",
};

const decDiaMuertos: ThemeDecoration = {
  frameIcons: ["💀", "🌼", "🕯️", "🦋", "🍬", "🌸"],
  headerBanner: "🌼 DÍA DE MUERTOS — TRADICIÓN Y FOLCLOR 🕯️",
  backgroundPattern: "pattern-cempasuchil",
  frameAccent: "#ff8c00",
};

const decNavidad: ThemeDecoration = {
  frameIcons: ["🎄", "⛄", "🎁", "🦌", "⭐", "🔔"],
  headerBanner: "🎄 ESPECIAL NAVIDEÑO — MAGIA DE LA NAVIDAD RETRO ⛄",
  backgroundPattern: "pattern-snow",
  frameAccent: "#e63946",
};

const decKids: ThemeDecoration = {
  frameIcons: ["🎈", "🎮", "⭐", "🚀", "🎯", "🎨"],
  headerBanner: "🎈 ESPECIAL DÍA DEL NIÑO — MARATÓN INFANTIL RETRO 🎮",
  backgroundPattern: "pattern-kids",
  frameAccent: "#00b4ff",
};

const decSummer: ThemeDecoration = {
  frameIcons: ["☀️", "🌴", "🏄", "🌊", "🍦", "🩴"],
  headerBanner: "☀️ VACACIONES DE VERANO — AVENTURAS RETRO 24/7 🏄",
  backgroundPattern: "pattern-summer",
  frameAccent: "#ffbe0b",
};

const decNeutral: ThemeDecoration = {
  frameIcons: ["📺", "💡", "📡", "⭐", "🎬", "🎮"],
  headerBanner: "📺 RETRO TOON NETWORK — PROGRAMACIÓN CLÁSICA 24/7 📡",
  backgroundPattern: "pattern-neutral",
  frameAccent: "#00b4ff",
};

/* ============================================================
 *  TEMAS POR MODO DE TEMPORADA
 *  La programación del día se arma en getActiveTheme.
 * ============================================================ */

const themePreHalloween: MonthTheme = {
  key: "pre-halloween",
  catalogKey: "neutro",
  name: "Pre-Halloween",
  subtitle: "Cuenta regresiva al Especial de Terror",
  accent: "#e8943a",
  accent2: "#f0c060",
  bgGradient: "from-[#1a100c] via-[#3a2218] to-[#1a100c]",
  fontClass: "font-harvest",
  channelName: "RETRO TOON NETWORK",
  channelLogo: "RTN",
  effect: "pre-halloween",
  programs: [],
  decoration: decPreHalloween,
  seasonMode: "pre-halloween",
  skin: skinHarvest,
};

const themeHalloween: MonthTheme = {
  key: "halloween",
  catalogKey: "halloween",
  name: "Especial de Halloween",
  subtitle: "Canal del Terror — 24/7 Espeluznante",
  accent: "#ff8c1a",
  accent2: "#d6c4ff",
  bgGradient: "from-[#07040e] via-[#1a0b28] to-[#07040e]",
  fontClass: "font-creepy",
  channelName: "RETRO TOON HORROR",
  channelLogo: "RTH",
  effect: "neon-flicker",
  programs: [],
  decoration: decHalloween,
  seasonMode: "halloween",
  skin: skinHalloween,
};

const themeDiaMuertos: MonthTheme = {
  key: "dia-muertos",
  catalogKey: "dia-muertos",
  name: "Especial Día de Muertos",
  subtitle: "Tradición y folclor latinoamericano",
  accent: "#ffb000",
  accent2: "#ff8ac4",
  bgGradient: "from-[#160810] via-[#3a1428] to-[#160810]",
  fontClass: "font-festive",
  channelName: "RETRO TOON TRADICIÓN",
  channelLogo: "RTT",
  effect: "cempasuchil",
  programs: [],
  decoration: decDiaMuertos,
  seasonMode: "dia-muertos",
  skin: skinOfrenda,
};

const themeNavidad: MonthTheme = {
  key: "navidad",
  catalogKey: "navidad",
  name: "Especial Navideño",
  subtitle: "Magia de la Navidad retro 24/7",
  accent: "#e23b4a",
  accent2: "#f0c14a",
  bgGradient: "from-[#0c1612] via-[#14281c] to-[#0c1612]",
  fontClass: "font-christmas",
  channelName: "RETRO TOON NAVIDAD",
  channelLogo: "RTN",
  effect: "snow",
  programs: [],
  decoration: decNavidad,
  seasonMode: "navidad",
  skin: skinNavidad,
};

const themeKids: MonthTheme = {
  key: "dianino",
  catalogKey: "dianino",
  name: "Especial Día del Niño",
  subtitle: "Maratón infantil retro",
  accent: "#3ec6ff",
  accent2: "#ffe566",
  bgGradient: "from-[#12162b] via-[#1c2448] to-[#12162b]",
  fontClass: "font-cartoon",
  channelName: "RETRO TOON KIDS",
  channelLogo: "RTK",
  effect: "summer",
  programs: [],
  decoration: decKids,
  seasonMode: "regular",
  skin: skinNino,
};

const themeSummer: MonthTheme = {
  key: "verano",
  catalogKey: "verano",
  name: "Vacaciones de Verano",
  subtitle: "Aventuras de verano retro 24/7",
  accent: "#ffd15c",
  accent2: "#5ee0d0",
  bgGradient: "from-[#1a1028] via-[#3a1840] to-[#1a1028]",
  fontClass: "font-surf",
  channelName: "RETRO TOON SUMMER",
  channelLogo: "RTS",
  effect: "summer",
  programs: [],
  decoration: decSummer,
  seasonMode: "regular",
  skin: skinVerano,
};

const themeNeutral: MonthTheme = {
  key: "neutro",
  catalogKey: "neutro",
  name: "Retro Toon Channel",
  subtitle: "Programación clásica 24/7",
  accent: "#ffb067",
  accent2: "#c5ccd6",
  bgGradient: "from-[#161412] via-[#221e1a] to-[#161412]",
  fontClass: "font-y2k",
  channelName: "RETRO TOON NETWORK",
  channelLogo: "RTN",
  effect: "none",
  programs: [],
  decoration: decNeutral,
  seasonMode: "regular",
  skin: skinSala,
};

const themeNovember: MonthTheme = {
  ...themeNeutral,
  key: "noviembre",
  catalogKey: "noviembre",
  name: "Retro Toon Channel",
  subtitle: "Programación clásica de noviembre",
};

/* ============================================================
 *  LÓGICA DE TEMPORADAS — fecha de America/Mexico_City
 * ============================================================ */

export function getSeasonMode(date: Date): SeasonMode {
  const { month, day } = getMexicoDateTime(date);

  if (month === 9) return "pre-halloween";
  if (month === 10) return "halloween";
  if (month === 11 && day <= 2) return "dia-muertos";
  if ((month === 12 && day >= 15) || (month === 1 && day <= 6)) return "navidad";
  return "regular";
}

function themeByKey(key: string): MonthTheme | null {
  switch (key) {
    case "pre-halloween":
      return themePreHalloween;
    case "halloween":
      return themeHalloween;
    case "dia-muertos":
      return themeDiaMuertos;
    case "navidad":
      return themeNavidad;
    case "dianino":
      return themeKids;
    case "verano":
      return themeSummer;
    case "neutro":
      return themeNeutral;
    default:
      return null;
  }
}

export function getActiveTheme(date: Date, previewKey?: string | null): { theme: MonthTheme; seasonMode: SeasonMode; isSpecialDay: boolean; preview: boolean } {
  const forced = previewKey ? themeByKey(previewKey) : null;
  const mode = getSeasonMode(date);
  const { month } = getMexicoDateTime(date);

  let base: MonthTheme;
  if (forced) {
    base = forced;
  } else switch (mode) {
    case "pre-halloween":
      base = themePreHalloween;
      break;
    case "halloween":
      base = themeHalloween;
      break;
    case "dia-muertos":
      base = themeDiaMuertos;
      break;
    case "navidad":
      base = themeNavidad;
      break;
    default:
      if (month === 4) base = themeKids;
      else if (month === 7 || month === 8) base = themeSummer;
      else if (month === 11) base = themeNovember;
      else base = themeNeutral;
  }

  const programs = getDaySchedule(base.catalogKey, date, getCatalog(base.catalogKey));
  const isSpecialDay = mode !== "regular" || month === 4 || month === 7 || month === 8;
  return {
    theme: { ...base, programs },
    seasonMode: forced ? forced.seasonMode : mode,
    isSpecialDay,
    preview: Boolean(forced),
  };
}

/* ============================================================
 *  CONTADOR — siguiente evento en horario de México
 *  ------------------------------------------------------------
 *  Septiembre:          → Halloween (1 oct)
 *  Octubre:             → Día de Muertos (1 nov)
 *  1–2 nov y hasta 14 dic → Navidad (15 dic)
 *  15 dic – 6 ene:      → fin del especial (6 ene)
 *  Resto del año:       → Halloween (1 oct)
 * ============================================================ */

export function getCountdownTarget(date: Date): { name: string; date: Date; mode: SeasonMode } {
  const { year, month, day } = getMexicoDateTime(date);
  const at = (y: number, m: number, d: number) => mexicoWallTime(y, m, d, 0, 0, 0);

  if (month === 9) return { name: "Especial de Halloween", date: at(year, 10, 1), mode: "pre-halloween" };
  if (month === 10) return { name: "Especial de Día de Muertos", date: at(year, 11, 1), mode: "halloween" };
  if (month === 11 && day <= 2) return { name: "Especial de Navidad", date: at(year, 12, 15), mode: "dia-muertos" };
  if (month === 11 || (month === 12 && day < 15)) {
    return { name: "Especial de Navidad", date: at(year, 12, 15), mode: "regular" };
  }
  if (month === 12 && day >= 15) {
    return { name: "Fin del Especial Navideño", date: at(year + 1, 1, 6), mode: "navidad" };
  }
  if (month === 1 && day <= 6) {
    return { name: "Fin del Especial Navideño", date: at(year, 1, 6), mode: "navidad" };
  }
  return { name: "Especial de Halloween", date: at(year, 10, 1), mode: "regular" };
}

export function getNextBigSpecial(date: Date): { name: string; date: Date } {
  const target = getCountdownTarget(date);
  return { name: target.name, date: target.date };
}
