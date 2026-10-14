import type { Program, MonthTheme } from "../types";

/* ============================================================
 *  LÓGICA DE PROGRAMACIÓN 24/7
 *  ------------------------------------------------------------
 *  Determina qué programa está "transmitiendo" basado en
 *  la hora actual del sistema, y cuál viene después.
 * ============================================================ */

/**
 * Devuelve el programa que se transmite ahora y el siguiente.
 * Busca el programa con la horaInicio más cercana (≤ hora actual).
 */
export function getCurrentAndNext(
  theme: MonthTheme,
  date: Date
): { current: Program | null; next: Program | null } {
  const programs = theme.programs;
  if (!programs || programs.length === 0) {
    return { current: null, next: null };
  }

  const now = new Date(date);
  const currentHour = now.getHours();
  const currentDay = now.getDate();

  // Filtrar programas del día (o dia=0 = cualquier día)
  const daySpecific = programs.filter((p) => p.dia === currentDay);
  const anyDay = programs.filter((p) => p.dia === 0);
  const available = [...daySpecific, ...anyDay];

  if (available.length === 0) {
    return { current: null, next: null };
  }

  // Ordenar por horaInicio
  const sorted = [...available].sort((a, b) => a.horaInicio - b.horaInicio);

  // Buscar el programa actual (horaInicio <= currentHour)
  let current: Program | null = null;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].horaInicio <= currentHour) {
      current = sorted[i];
      break;
    }
  }

  // Si no hay programa actual (todas las horas > currentHour), tomar el último
  if (!current && sorted.length > 0) {
    current = sorted[sorted.length - 1];
  }

  // Buscar el siguiente
  let next: Program | null = null;
  if (current) {
    const currentIdx = sorted.findIndex((p) => p.id === current!.id);
    if (currentIdx >= 0 && currentIdx < sorted.length - 1) {
      next = sorted[currentIdx + 1];
    } else {
      // Siguiente del día siguiente (el primero)
      next = sorted[0];
    }
  }

  return { current, next };
}

/* ============================================================
 *  PERSISTENCIA DE "YA VISTO" — localStorage
 *  ------------------------------------------------------------
 *  Guarda los IDs de programas marcados como vistos.
 * ============================================================ */

const SEEN_KEY = "retro-tv-seen-programs";

export function getSeenPrograms(): Set<string> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

export function toggleSeen(programId: string): Set<string> {
  const seen = getSeenPrograms();
  if (seen.has(programId)) {
    seen.delete(programId);
  } else {
    seen.add(programId);
  }
  try {
    localStorage.setItem(SEEN_KEY, JSON.stringify([...seen]));
  } catch {
    // ignore
  }
  return seen;
}

/* ============================================================
 *  FORMATO DE HORA
 * ============================================================ */

export function formatHour(hour: number): string {
  const h = hour % 24;
  const period = h < 12 ? "AM" : "PM";
  const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${display}:00 ${period}`;
}

export function formatClock(date: Date): string {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  const s = date.getSeconds().toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}
