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

export interface Program {
  id: string;
  dia: number;
  horaInicio: number;
  titulo: string;
  categoria: Category;
  sinopsis: string;
  embedUrl: string;
  genre: string;
  rating: Rating;
  thumbnailUrl: string;
  duration: number;
  skinTag?: SeasonMode;
}

export interface ThemeDecoration {
  frameIcons: string[];
  headerBanner: string;
  backgroundPattern: string;
  frameAccent: string;
}

export interface MonthTheme {
  key: string;
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
}
