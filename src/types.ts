export type Category = "Episodio" | "Película" | "Especial";

export type Rating = "TV-Y" | "TV-Y7" | "TV-G" | "TV-PG" | "TV-14" | "TV-MA" | "PG" | "G";

/* ============================================================
 *  MODO DE TEMPORADA — Determina el skin/tema activo
 *  ------------------------------------------------------------
 *  pre-halloween: Septiembre — TV neutra + teaser de Halloween
 *  halloween:     1 Oct – 31 Oct — Terror completo
 *  dia-muertos:   1 Nov – 2 Nov — Folclor mexicano
 *  navidad:       15 Dic – 6 Ene — Especial navideño
 *  regular:       Resto del año — Estética retro clásica
 * ============================================================ */
export type SeasonMode =
  | "pre-halloween"
  | "halloween"
  | "dia-muertos"
  | "navidad"
  | "regular";

/** Identidad visual. Independiente del calendario: septiembre, verano y el resto tienen la suya. */
export type SkinId = "harvest" | "halloween" | "ofrenda" | "navidad" | "nino" | "verano" | "sala";

export interface ThemeSkin {
  id: SkinId;
  rootClass: string;
  pageBg: string;
  cabinetClass: string;
  bezelClass: string;
  feetClass: string;
  panelClass: string;
  cardClass: string;
  crest: string;
  flicker: boolean;
  countdownLabel: string;
  countdownIcon: string;
  headingFont: string;
  headingColor: string;
  titleColor: string;
  bannerColor: string;
  daypartColor: string;
  clockColor: string;
  clockBg: string;
  clockBorder: string;
  unitColor: string;
  unitBg: string;
  unitBorder: string;
  unitLabel: string;
  colonColor: string;
  subColor: string;
  cardIdle: string;
  cardActive: string;
  cardBorder: string;
  cardGlow: string;
  guideBg: string;
  guideIdle: string;
  buttonBg: string;
  buttonText: string;
  brandColor: string;
  mutedColor: string;
  led: string;
}

export type Bloque = "mañana" | "tarde" | "noche";

/** Pieza de catálogo, sin horario. El scheduler le asigna el minuto de inicio. */
export interface CatalogItem {
  id: string;
  titulo: string;
  categoria: Category;
  sinopsis: string;
  genre: string;
  rating: Rating;
  /** Duración en minutos. */
  duration: number;
  bloque: Bloque;
}

/** Programa ya colocado en la barra del día (horario de la Ciudad de México). */
export interface Program {
  /** Único dentro del día: catalogId + minuto de inicio. */
  id: string;
  /** Id estable. Sirve para la URL de video y para "ya visto". */
  catalogId: string;
  titulo: string;
  categoria: Category;
  sinopsis: string;
  genre: string;
  rating: Rating;
  duration: number;
  bloque: Bloque;
  /** Minuto del día (0–1439) en America/Mexico_City. */
  startMinute: number;
  /**
   * URL directa al archivo de video (.mp4, .webm, .ogg).
   * Cadena vacía: el televisor muestra la carta de "señal no disponible".
   */
  videoUrl: string;
}

export interface ThemeDecoration {
  frameIcons: string[];
  headerBanner: string;
  backgroundPattern: string;
  frameAccent: string;
}

export interface MonthTheme {
  key: string;
  /** Qué catálogo arma la programación de este tema. */
  catalogKey: string;
  name: string;
  subtitle: string;
  accent: string;
  accent2: string;
  bgGradient: string;
  fontClass: string;
  channelName: string;
  channelLogo: string;
  effect: "snow" | "papel-picado" | "neon-flicker" | "cempasuchil" | "none" | "summer" | "pre-halloween";
  programs: Program[];
  decoration: ThemeDecoration;
  seasonMode: SeasonMode;
  skin: ThemeSkin;
}
