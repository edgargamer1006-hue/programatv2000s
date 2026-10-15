import type { Bloque, CatalogItem, Program } from "../types";
import { videoUrlFor } from "../data/video-urls";
import { getMexicoDateTime, mexicoDateKey } from "./mexico-time";
import { seededShuffle } from "./prng";

const DAY_MINUTES = 24 * 60;

/**
 * Franjas del día en Ciudad de México.
 * La noche cruza la medianoche: 00:00–06:00 y 20:00–24:00.
 * Las películas de terror del catálogo viven en el bloque "noche".
 */
const WINDOWS: { bloque: Bloque; start: number; end: number }[] = [
  { bloque: "noche", start: 0, end: 6 * 60 },
  { bloque: "mañana", start: 6 * 60, end: 12 * 60 },
  { bloque: "tarde", start: 12 * 60, end: 20 * 60 },
  { bloque: "noche", start: 20 * 60, end: DAY_MINUTES },
];

const BUMPER_TITLES = ["Cortinilla del canal", "Ident Retro Toon", "Continuidad"];

function toProgram(item: CatalogItem, startMinute: number): Program {
  return {
    id: `${item.id}@${startMinute}`,
    catalogId: item.id,
    titulo: item.titulo,
    categoria: item.categoria,
    sinopsis: item.sinopsis,
    genre: item.genre,
    rating: item.rating,
    duration: item.duration,
    bloque: item.bloque,
    startMinute,
    videoUrl: videoUrlFor(item.id),
  };
}

function bumper(startMinute: number, duration: number, bloque: Bloque, index: number): Program {
  const title = BUMPER_TITLES[index % BUMPER_TITLES.length];
  return {
    id: `cortinilla@${startMinute}`,
    catalogId: "cortinilla",
    titulo: title,
    categoria: "Especial",
    sinopsis: "Pausa breve de continuidad entre programas.",
    genre: "Continuidad",
    rating: "TV-G",
    duration,
    bloque,
    startMinute,
    videoUrl: videoUrlFor("cortinilla"),
  };
}

function poolFor(catalog: readonly CatalogItem[], bloque: Bloque, seed: string): CatalogItem[] {
  const own = catalog.filter((item) => item.bloque === bloque && item.duration > 0);
  const source = own.length > 0 ? own : catalog.filter((item) => item.duration > 0);
  return seededShuffle(source, `${seed}|${bloque}`);
}

/**
 * Llena 24 horas seguidas, sin huecos ni empalmes.
 * La semilla incluye la fecha de Ciudad de México: el mismo día se ve
 * igual en todas partes, y el día siguiente rota el orden.
 * Si el siguiente título no cabe en lo que queda de la franja, se toma
 * otro más corto y el largo espera a la siguiente franja del mismo bloque.
 * El hueco final se tapa con cortinillas de unos minutos.
 */
export function buildDaySchedule(catalog: readonly CatalogItem[], seed: string): Program[] {
  const queues: Record<Bloque, CatalogItem[]> = {
    mañana: poolFor(catalog, "mañana", seed),
    tarde: poolFor(catalog, "tarde", seed),
    noche: poolFor(catalog, "noche", seed),
  };
  const programs: Program[] = [];
  let bumperCount = 0;

  for (const window of WINDOWS) {
    const queue = queues[window.bloque];
    let minute = window.start;
    let guard = 0;

    while (minute < window.end && guard < 2000) {
      guard += 1;
      const remaining = window.end - minute;
      const fitAt = queue.findIndex((item) => item.duration <= remaining);

      if (fitAt >= 0) {
        const [item] = queue.splice(fitAt, 1);
        programs.push(toProgram(item, minute));
        minute += item.duration;
        queue.push(item);
        continue;
      }

      const len = remaining <= 8 ? remaining : 5;
      programs.push(bumper(minute, len, window.bloque, bumperCount));
      bumperCount += 1;
      minute += len;
    }
  }

  return programs;
}

const scheduleCache = new Map<string, Program[]>();

export function getDaySchedule(
  catalogKey: string,
  date: Date,
  catalog: readonly CatalogItem[],
): Program[] {
  const cacheKey = `${catalogKey}|${mexicoDateKey(date)}`;
  const cached = scheduleCache.get(cacheKey);
  if (cached) return cached;
  const schedule = buildDaySchedule(catalog, cacheKey);
  scheduleCache.set(cacheKey, schedule);
  return schedule;
}

export function getCurrentAndNext(
  programs: readonly Program[],
  date: Date,
): { current: Program | null; next: Program | null } {
  if (programs.length === 0) return { current: null, next: null };

  const mx = getMexicoDateTime(date);
  const nowSec = mx.minuteOfDay * 60 + mx.second;
  let index = -1;

  for (let i = 0; i < programs.length; i++) {
    const start = programs[i].startMinute * 60;
    const end = start + programs[i].duration * 60;
    if (nowSec >= start && nowSec < end) {
      index = i;
      break;
    }
  }

  if (index < 0) {
    index = 0;
    for (let i = programs.length - 1; i >= 0; i--) {
      if (programs[i].startMinute * 60 <= nowSec) {
        index = i;
        break;
      }
    }
  }

  const current = programs[index];
  const next = programs[(index + 1) % programs.length];
  return { current, next };
}

/** Segundos ya emitidos de este programa, según el reloj de México. */
export function elapsedSecondsInProgram(program: Program, date = new Date()): number {
  const mx = getMexicoDateTime(date);
  const nowSec = mx.minuteOfDay * 60 + mx.second;
  let elapsed = nowSec - program.startMinute * 60;
  if (elapsed < 0) elapsed += DAY_MINUTES * 60;
  return elapsed;
}

/**
 * "Ya visto" sigue al episodio, no a cada horario en que sale.
 * Las cortinillas son pausas, así que cada una se marca sola.
 */
export function seenKey(program: Program): string {
  return program.catalogId === "cortinilla" ? program.id : program.catalogId;
}

const SEEN_KEY = "retro-tv-seen-programs";

export function getSeenPrograms(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set();
  }
}

export function toggleSeen(programId: string): Set<string> {
  const seen = getSeenPrograms();
  if (seen.has(programId)) seen.delete(programId);
  else seen.add(programId);
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    // El modo privado puede rechazar localStorage. La marca vive solo en memoria.
  }
  return seen;
}
