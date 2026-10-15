/** Todo el canal vive en el horario de la Ciudad de México, no en el reloj del visitante. */
export const MEXICO_TZ = "America/Mexico_City";

const DAY_MINUTES = 24 * 60;

const partFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: MEXICO_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
});

export interface MexicoDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  /** Minutos desde la medianoche local, 0–1439. */
  minuteOfDay: number;
}

function readParts(date: Date): Record<string, number> {
  const parts: Record<string, number> = {};
  for (const part of partFormatter.formatToParts(date)) {
    if (part.type === "literal") continue;
    parts[part.type] = Number(part.value);
  }
  return parts;
}

export function getMexicoDateTime(date: Date): MexicoDateTime {
  const parts = readParts(date);
  let hour = parts.hour ?? 0;
  if (hour === 24) hour = 0;
  const minute = parts.minute ?? 0;
  const second = parts.second ?? 0;
  return {
    year: parts.year ?? 1970,
    month: parts.month ?? 1,
    day: parts.day ?? 1,
    hour,
    minute,
    second,
    minuteOfDay: hour * 60 + minute,
  };
}

export function mexicoDateKey(date: Date): string {
  const p = getMexicoDateTime(date);
  const month = String(p.month).padStart(2, "0");
  const day = String(p.day).padStart(2, "0");
  return `${p.year}-${month}-${day}`;
}

/**
 * Instante UTC que corresponde a una hora de pared en Ciudad de México.
 * month es 1–12.
 */
export function mexicoWallTime(
  year: number,
  month: number,
  day: number,
  hour = 0,
  minute = 0,
  second = 0,
): Date {
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, second);
  const parts = readParts(new Date(utcGuess));
  let zonedHour = parts.hour ?? 0;
  if (zonedHour === 24) zonedHour = 0;
  const asUtc = Date.UTC(
    parts.year ?? year,
    (parts.month ?? month) - 1,
    parts.day ?? day,
    zonedHour,
    parts.minute ?? 0,
    parts.second ?? 0,
  );
  const offset = asUtc - utcGuess;
  return new Date(utcGuess - offset);
}

export function formatMexicoClock(date: Date): string {
  const p = getMexicoDateTime(date);
  const hh = String(p.hour).padStart(2, "0");
  const mm = String(p.minute).padStart(2, "0");
  const ss = String(p.second).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function formatMexicoDate(date: Date): string {
  return new Intl.DateTimeFormat("es-MX", {
    timeZone: MEXICO_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

/** Encabezados de la guía: "3:00 PM". */
export function formatHourLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  const period = h < 12 ? "AM" : "PM";
  const display = h % 12 === 0 ? 12 : h % 12;
  return `${display}:00 ${period}`;
}

/** Hora de un programa con minutos: "3:22 PM". */
export function formatMinute12(minuteOfDay: number): string {
  const total = ((minuteOfDay % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  const h24 = Math.floor(total / 60);
  const minute = total % 60;
  const period = h24 < 12 ? "AM" : "PM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function daypartLabel(startMinute: number): string {
  if (startMinute < 6 * 60) return "Madrugada";
  if (startMinute < 12 * 60) return "Mañana";
  if (startMinute < 20 * 60) return "Tarde";
  return "Noche";
}
