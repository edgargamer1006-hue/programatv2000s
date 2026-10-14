import type { MonthTheme, Program, Rating, SeasonMode, ThemeDecoration } from "./types";

/* ============================================================
 *  PROGRAMACIÓN POR MES / FESTIVIDAD
 *  ------------------------------------------------------------
 *  Cada mes (o rango festivo) tiene su propio tema visual y
 *  su lista de programas. Los `embedUrl` son URLs de prueba.
 *  Busca `// REEMPLAZAR:` para sustituirlas por enlaces reales.
 * ============================================================ */

const T = "https://archive.org/download/hora-de-aventuras-temporada-10-caderia-salvaje/Hora%20de%20aventuras%20Temporada%2010%20-%20Temporada%2010%20-%201.ia.mp4";

const THUMB_HORROR = "https://images.pexels.com/photos/29208812/pexels-photo-29208812.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_HORROR2 = "https://images.pexels.com/photos/29208812/pexels-photo-29208812.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_HORROR3 = "https://images.pexels.com/photos/3135473/pexels-photo-3135473.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_CARTOON = "https://images.pexels.com/photos/3221533/pexels-photo-3221533.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_CARTOON2 = "https://images.pexels.com/photos/31715353/pexels-photo-31715353.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_CARTOON3 = "https://images.pexels.com/photos/32014936/pexels-photo-32014936.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_XMAS = "https://images.pexels.com/photos/14755718/pexels-photo-14755718.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_XMAS2 = "https://images.pexels.com/photos/383646/pexels-photo-383646.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";
const THUMB_XMAS3 = "https://images.pexels.com/photos/761005/pexels-photo-761005.jpeg?auto=compress&cs=tinysrgb&h=200&w=356";

function prog(
  id: string, dia: number, horaInicio: number, titulo: string,
  categoria: Program["categoria"], sinopsis: string,
  genre: string, rating: Rating, thumbnailUrl: string, duration: number,
  skinTag?: SeasonMode, embedUrl: string = T
): Program {
  return { id, dia, horaInicio, titulo, categoria, sinopsis, embedUrl, genre, rating, thumbnailUrl, duration, skinTag };
}

/* ---------- OCTUBRE — Halloween ---------- */
const octoberPrograms: Program[] = [
  prog("oct-01", 0, 0, "Un Show Más — Cuentos de Terror", "Episodio", "Mordecai y Rigby enfrentan pesadillas en el parque.", "Terror", "TV-PG", THUMB_HORROR, 22, "halloween"),
  prog("oct-02", 0, 2, "Billy y Mandy — Peligro Iminente", "Episodio", "La Muerte llega a la casa de Billy y Mandy.", "Terror", "TV-Y7", THUMB_HORROR2, 22, "halloween"),
  prog("oct-03", 0, 4, "Gravedad Cero — Summerween", "Episodio", "Los misterios de Gravity Falls en Halloween.", "Misterio", "TV-Y7", THUMB_HORROR3, 22, "halloween"),
  prog("oct-04", 0, 6, "Coraline", "Película", "Una niña descubre un mundo espeluznante detrás de una puerta.", "Terror", "PG", THUMB_HORROR, 100, "halloween"),
  prog("oct-05", 0, 9, "Monster House", "Película", "Una casa viviente aterroriza al vecindario.", "Terror", "PG", THUMB_HORROR2, 91, "halloween"),
  prog("oct-06", 0, 12, "Las Sombrías Aventuras de Billy y Mandy", "Especial", "Maratón de episodios de terror de la saga.", "Terror", "TV-Y7", THUMB_HORROR3, 90, "halloween"),
  prog("oct-07", 0, 15, "Invader Zim — Halloween Espectral", "Episodio", "Zim traba el apocalipsis en noche de brujas.", "Ciencia Ficción", "TV-PG", THUMB_HORROR, 22, "halloween"),
  prog("oct-08", 0, 18, "Danny Phantom — La Furia de Fantasmas", "Episodio", "Danny enfrenta una invasión espectral.", "Acción", "TV-Y7", THUMB_HORROR2, 22, "halloween"),
  prog("oct-09", 0, 20, "Courage the Cowardly Dog — Miedo", "Episodio", "Courage enfrenta a las criaturas de Nowhere.", "Terror", "TV-Y7", THUMB_HORROR3, 22, "halloween"),
  prog("oct-10", 0, 22, "Pesadilla antes de Navidad", "Película", "Jack Skellington descubre la Navidad.", "Fantasía", "PG", THUMB_HORROR, 76, "halloween"),
];

/* ---------- NOVIEMBRE 1-2 — Día de Muertos ---------- */
const diaMuertosPrograms: Program[] = [
  prog("muertos-01", 1, 0, "Coco", "Película", "Miguel viaja a la Tierra de los Muertos.", "Fantasía", "PG", THUMB_CARTOON, 105, "dia-muertos"),
  prog("muertos-02", 1, 3, "El Libro de la Vida", "Película", "Manolo lucha por el amor entre dos mundos.", "Fantasía", "PG", THUMB_CARTOON2, 95, "dia-muertos"),
  prog("muertos-03", 1, 6, "La Leyenda de la Llorona", "Película", "La leyenda mexicana cobra vida.", "Terror", "TV-14", THUMB_HORROR3, 82, "dia-muertos"),
  prog("muertos-04", 1, 9, "Mucha Lucha! — Especial Día de Muertos", "Especial", "Los luchadores honran a sus antepasados.", "Comedia", "TV-Y7", THUMB_CARTOON3, 30, "dia-muertos"),
  prog("muertos-05", 1, 12, "La Leyenda de la Nahuala", "Película", "Leo enfrenta a la Nahuala en una vieja casona.", "Aventura", "TV-PG", THUMB_CARTOON, 90, "dia-muertos"),
  prog("muertos-06", 2, 0, "Coco (Repetición)", "Película", "Segunda emisión de Coco.", "Fantasía", "PG", THUMB_CARTOON2, 105, "dia-muertos"),
  prog("muertos-07", 2, 3, "El Libro de la Vida (Repetición)", "Película", "Segunda emisión.", "Fantasía", "PG", THUMB_CARTOON3, 95, "dia-muertos"),
  prog("muertos-08", 2, 6, "La Leyenda de las Momias", "Película", "Aventura en Guanajuato con momias.", "Aventura", "TV-PG", THUMB_HORROR, 85, "dia-muertos"),
  prog("muertos-09", 2, 9, "Mucha Lucha! — Lucha Libre Marathon", "Especial", "Maratón de la serie clásica.", "Comedia", "TV-Y7", THUMB_CARTOON2, 60, "dia-muertos"),
];

/* ---------- NOVIEMBRE (resto) — Retro Neutro ---------- */
const novemberNeutralPrograms: Program[] = [
  prog("nov-n-01", 0, 0, "Hora de Aventura — Capítulo Aleatorio", "Episodio", "Finn y Jake en Ooo.", "Aventura", "TV-PG", THUMB_CARTOON, 22),
  prog("nov-n-02", 0, 6, "Bob Esponja — Clásicos", "Episodio", "Episodios clásicos de Fondo de Bikini.", "Comedia", "TV-Y7", THUMB_CARTOON2, 22),
  prog("nov-n-03", 0, 12, "Chowder — Maratón Culinario", "Episodio", "Chowder y sus desventuras en la cocina.", "Comedia", "TV-Y7", THUMB_CARTOON3, 22),
  prog("nov-n-04", 0, 18, "Las Chicas Superpoderosas — Z", "Episodio", "Heroínas de Ciudad Saltador.", "Acción", "TV-Y7", THUMB_CARTOON, 22),
];

/* ---------- DICIEMBRE 15 – ENERO 6 — Navidad ---------- */
const decemberPrograms: Program[] = [
  prog("dec-01", 0, 0, "Bob Esponja — Navidad ¿Quién?", "Especial", "Bob descubre la Navidad por primera vez.", "Comedia", "TV-Y7", THUMB_XMAS, 30, "navidad"),
  prog("dec-02", 0, 2, "El Grinch", "Película", "El Grinch planea arruinar la Navidad.", "Comedia", "PG", THUMB_XMAS2, 104, "navidad"),
  prog("dec-03", 0, 4, "Hora de Aventura — Especial Navideño", "Especial", "Finn y Jake celebran la Navidad en Ooo.", "Aventura", "TV-PG", THUMB_XMAS3, 22, "navidad"),
  prog("dec-04", 0, 6, "Los Chicos del Barrio — Navidad", "Especial", "Los chicos celebran las fiestas del barrio.", "Comedia", "TV-PG", THUMB_XMAS, 22, "navidad"),
  prog("dec-05", 0, 8, "Ren y Stimpy — Especial Navideño", "Especial", "Caos navideño con Ren y Stimpy.", "Comedia", "TV-14", THUMB_XMAS2, 22, "navidad"),
  prog("dec-06", 0, 10, "Foster — Navidad", "Especial", "Mac y Bloo celebran en la mansión.", "Comedia", "TV-Y7", THUMB_XMAS3, 22, "navidad"),
  prog("dec-07", 0, 12, "Rudolph el Reno", "Película", "El reno de la nariz roja salva la Navidad.", "Familia", "TV-G", THUMB_XMAS, 47, "navidad"),
  prog("dec-08", 0, 14, "Olive, el Otro Reno", "Película", "Olive viaja al Polo Norte.", "Familia", "TV-G", THUMB_XMAS2, 45, "navidad"),
  prog("dec-09", 0, 16, "Chowder — Especial Navideño", "Especial", "Chowder prepara un festín navideño.", "Comedia", "TV-Y7", THUMB_XMAS3, 22, "navidad"),
  prog("dec-10", 0, 18, "Un Show Más — Navidad en el Parque", "Especial", "Mordecai y Rigby organizan la fiesta.", "Comedia", "TV-PG", THUMB_XMAS, 22, "navidad"),
  prog("dec-11", 0, 20, "Pesadilla antes de Navidad", "Película", "Jack Skellington y la Navidad.", "Fantasía", "PG", THUMB_XMAS2, 76, "navidad"),
  prog("dec-12", 0, 22, "El Grinch (Repetición)", "Película", "El clásico animado de Jim Carrey.", "Comedia", "PG", THUMB_XMAS3, 104, "navidad"),
];

/* ---------- ABRIL — Día del Niño ---------- */
const aprilPrograms: Program[] = [
  prog("apr-01", 0, 0, "Dragon Ball Z — Maratón Saiyan", "Episodio", "Goku y sus amigos en batallas épicas.", "Acción", "TV-PG", THUMB_CARTOON, 22, "regular"),
  prog("apr-02", 0, 3, "Pokemon — Liga Naranja", "Episodio", "Ash y Pikachu en aventuras.", "Aventura", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("apr-03", 0, 6, "Digimon Adventure", "Episodio", "Los niños elegidos y sus digimons.", "Aventura", "TV-Y7", THUMB_CARTOON3, 22, "regular"),
  prog("apr-04", 0, 9, "Las Supernenas — Maratón", "Episodio", "Burbuja, Bellota y Cacto salvan el mundo.", "Acción", "TV-Y7", THUMB_CARTOON, 22, "regular"),
  prog("apr-05", 0, 12, "Sailor Moon — Clásicos", "Episodio", "Las guerreras de la Luna.", "Magia", "TV-PG", THUMB_CARTOON2, 22, "regular"),
  prog("apr-06", 0, 15, "Card Captor Sakura", "Episodio", "Sakura captura las cartas mágicas.", "Magia", "TV-Y7", THUMB_CARTOON3, 22, "regular"),
  prog("apr-07", 0, 18, "Samurai Jack", "Episodio", "Jack viaja por el futuro distópico.", "Acción", "TV-PG", THUMB_CARTOON, 22, "regular"),
  prog("apr-08", 0, 21, "Kirby: Derecho a Soñar", "Episodio", "Kirby defiende Dream Land.", "Aventura", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
];

/* ---------- JULIO-AGOSTO — Vacaciones de Verano ---------- */
const summerPrograms: Program[] = [
  prog("sum-01", 0, 0, "Un Show Más — Verano en el Parque", "Episodio", "El parque bajo el sol del verano.", "Comedia", "TV-PG", THUMB_CARTOON, 22, "regular"),
  prog("sum-02", 0, 2, "Phineas y Ferb — Aventuras de Verano", "Episodio", "Los hermanos construyen inventos increíbles.", "Comedia", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("sum-03", 0, 5, "Las Sombrías Aventuras de Billy y Mandy", "Episodio", "El verano con la Muerte de fiesta.", "Terror", "TV-Y7", THUMB_CARTOON3, 22, "regular"),
  prog("sum-04", 0, 8, "Bob Esponja — Verano en Fondo de Bikini", "Episodio", "Bob y Patricio disfrutan el sol.", "Comedia", "TV-Y7", THUMB_CARTOON, 22, "regular"),
  prog("sum-05", 0, 11, "Totally Spies! — Misión de Verano", "Episodio", "Las espías en misión playera.", "Acción", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("sum-06", 0, 14, "Dragon Ball — Saga de la piscina", "Episodio", "Goku descansa en la playa.", "Acción", "TV-PG", THUMB_CARTOON3, 22, "regular"),
  prog("sum-07", 0, 17, "Kim Possible — Aventura Tropical", "Episodio", "Kim en misión en la playa.", "Acción", "TV-PG", THUMB_CARTOON, 22, "regular"),
  prog("sum-08", 0, 20, "Código: KND — Verano Operativo", "Episodio", "Sector V en vacaciones.", "Acción", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("sum-09", 0, 23, "Rocket Power — Surf Extremo", "Episodio", "Los chicos del surf en Ocean Shores.", "Aventura", "TV-Y7", THUMB_CARTOON3, 22, "regular"),
];

/* ---------- MODO NEUTRO (resto del año) ---------- */
const neutralPrograms: Program[] = [
  prog("neu-01", 0, 0, "Hora de Aventura", "Episodio", "Aventuras de Finn y Jake en Ooo.", "Aventura", "TV-PG", THUMB_CARTOON, 22, "regular"),
  prog("neu-02", 0, 3, "Bob Esponja", "Episodio", "La vida en Fondo de Bikini.", "Comedia", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("neu-03", 0, 6, "Un Show Más", "Episodio", "Mordecai y Rigby en el parque.", "Comedia", "TV-PG", THUMB_CARTOON3, 22, "regular"),
  prog("neu-04", 0, 9, "Las Supernenas", "Episodio", "Heroínas en acción.", "Acción", "TV-Y7", THUMB_CARTOON, 22, "regular"),
  prog("neu-05", 0, 12, "Chowder", "Episodio", "Aventuras culinarias.", "Comedia", "TV-Y7", THUMB_CARTOON2, 22, "regular"),
  prog("neu-06", 0, 15, "Foster, la Casa de los Amigos Imaginarios", "Episodio", "Amigos imaginarios en la mansión.", "Comedia", "TV-Y7", THUMB_CARTOON3, 22, "regular"),
  prog("neu-07", 0, 18, "Coraje el Perro Cobarde", "Episodio", "Coraje en Nowhere.", "Terror", "TV-Y7", THUMB_CARTOON, 22, "regular"),
  prog("neu-08", 0, 21, "Invader Zim", "Episodio", "Zim intenta conquistar la Tierra.", "Ciencia Ficción", "TV-PG", THUMB_CARTOON2, 22, "regular"),
];

/* ============================================================
 *  DECORACIONES TEMÁTICAS
 *  ============================================================ */

const decPreHalloween: ThemeDecoration = {
  frameIcons: ["🎃", "🕷️", "🕸️", "🌙", "⭐", "📺"],
  headerBanner: "🎃 PRÓXIMAMENTE — ESPECIAL DE HALLOWEEN ESTE 1 DE OCTUBRE 👻",
  backgroundPattern: "pattern-pre-halloween",
  frameAccent: "#ff6600",
};

const decHalloween: ThemeDecoration = {
  frameIcons: ["🎃", "👻", "🦇", "💀", "🕷️", "🕸️"],
  headerBanner: "🎃 ESPECIAL DE TERROR — OCTUBRE 31 DÍAS DE MIEDO 👻",
  backgroundPattern: "pattern-halloween",
  frameAccent: "#ff6600",
};

const decDiaMuertos: ThemeDecoration = {
  frameIcons: ["💀", "🌼", "🕯️", "🦋", "🍬", "🎃"],
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
  frameIcons: ["☀️", "🏖️", "🏄", "🌊", "🍦", "🩴"],
  headerBanner: "☀️ VACACIONES DE VERANO — AVENTURAS RETRO 24/7 🏄",
  backgroundPattern: "pattern-summer",
  frameAccent: "#ffbe0b",
};

const decNeutral: ThemeDecoration = {
  frameIcons: ["📺", "🎮", "📡", "⭐", "🎬", "🎥"],
  headerBanner: "📺 RETRO TOON NETWORK — PROGRAMACIÓN CLÁSICA 24/7 📡",
  backgroundPattern: "pattern-neutral",
  frameAccent: "#00b4ff",
};

/* ============================================================
 *  TEMAS POR MODO DE TEMPORADA
 *  ============================================================ */

const themePreHalloween: MonthTheme = {
  key: "pre-halloween", name: "Pre-Halloween", subtitle: "Cuenta regresiva al Especial de Terror",
  accent: "#ff6600", accent2: "#cc4400",
  bgGradient: "from-[#0f0f11] via-[#1a1a1e] to-[#0f0f11]",
  fontClass: "font-creepy", channelName: "RETRO TOON NETWORK", channelLogo: "RTN",
  effect: "pre-halloween", programs: neutralPrograms, decoration: decPreHalloween,
  seasonMode: "pre-halloween",
};

const themeHalloween: MonthTheme = {
  key: "halloween", name: "Especial de Halloween", subtitle: "Canal del Terror — 24/7 Espeluznante",
  accent: "#ff6600", accent2: "#9b2d9b",
  bgGradient: "from-[#0f0f11] via-[#1a0a1e] to-[#0f0f11]",
  fontClass: "font-creepy", channelName: "RETRO TOON HORROR", channelLogo: "RTH",
  effect: "neon-flicker", programs: octoberPrograms, decoration: decHalloween,
  seasonMode: "halloween",
};

const themeDiaMuertos: MonthTheme = {
  key: "dia-muertos", name: "Especial Día de Muertos", subtitle: "Tradición y Folclore Latinoamericano",
  accent: "#ff8c00", accent2: "#9b2d9b",
  bgGradient: "from-[#0f0f11] via-[#1a1018] to-[#0f0f11]",
  fontClass: "font-festive", channelName: "RETRO TOON TRADICIÓN", channelLogo: "RTT",
  effect: "cempasuchil", programs: diaMuertosPrograms, decoration: decDiaMuertos,
  seasonMode: "dia-muertos",
};

const themeNavidad: MonthTheme = {
  key: "navidad", name: "Especial Navideño", subtitle: "Magia de la Navidad Retro 24/7",
  accent: "#e63946", accent2: "#06d6a0",
  bgGradient: "from-[#0f0f11] via-[#0a1a12] to-[#0f0f11]",
  fontClass: "font-christmas", channelName: "RETRO TOON NAVIDAD", channelLogo: "RTN",
  effect: "snow", programs: decemberPrograms, decoration: decNavidad,
  seasonMode: "navidad",
};

const themeKids: MonthTheme = {
  key: "dianino", name: "Especial Día del Niño", subtitle: "Maratón Infantil Retro",
  accent: "#00b4ff", accent2: "#ffbe0b",
  bgGradient: "from-[#0f0f11] via-[#0a1420] to-[#0f0f11]",
  fontClass: "font-cartoon", channelName: "RETRO TOON KIDS", channelLogo: "RTK",
  effect: "summer", programs: aprilPrograms, decoration: decKids,
  seasonMode: "regular",
};

const themeSummer: MonthTheme = {
  key: "verano", name: "Vacaciones de Verano", subtitle: "Aventuras de Verano Retro 24/7",
  accent: "#ffbe0b", accent2: "#ff6b00",
  bgGradient: "from-[#0f0f11] via-[#1a140a] to-[#0f0f11]",
  fontClass: "font-cartoon", channelName: "RETRO TOON SUMMER", channelLogo: "RTS",
  effect: "summer", programs: summerPrograms, decoration: decSummer,
  seasonMode: "regular",
};

const themeNeutral: MonthTheme = {
  key: "neutro", name: "Retro Toon Channel", subtitle: "Programación Clásica 24/7",
  accent: "#00b4ff", accent2: "#ff006e",
  bgGradient: "from-[#0f0f11] via-[#1a1a1e] to-[#0f0f11]",
  fontClass: "font-retro", channelName: "RETRO TOON NETWORK", channelLogo: "RTN",
  effect: "none", programs: neutralPrograms, decoration: decNeutral,
  seasonMode: "regular",
};

/* ============================================================
 *  LÓGICA DE TEMPORADAS — Determina el modo activo según fecha
 *  ============================================================ */

export function getSeasonMode(date: Date): SeasonMode {
  const m = date.getMonth() + 1;
  const d = date.getDate();

  if (m === 9) return "pre-halloween";
  if (m === 10) return "halloween";
  if (m === 11 && d <= 2) return "dia-muertos";
  if ((m === 12 && d >= 15) || (m === 1 && d <= 6)) return "navidad";
  return "regular";
}

export function getActiveTheme(date: Date): { theme: MonthTheme; seasonMode: SeasonMode; isSpecialDay: boolean } {
  const mode = getSeasonMode(date);
  const m = date.getMonth() + 1;

  let theme: MonthTheme;
  switch (mode) {
    case "pre-halloween":
      theme = themePreHalloween;
      break;
    case "halloween":
      theme = themeHalloween;
      break;
    case "dia-muertos":
      theme = themeDiaMuertos;
      break;
    case "navidad":
      theme = themeNavidad;
      break;
    default:
      if (m === 4) theme = themeKids;
      else if (m === 7 || m === 8) theme = themeSummer;
      else if (m === 11) theme = { ...themeNeutral, programs: novemberNeutralPrograms };
      else theme = themeNeutral;
  }

  const isSpecial = mode !== "regular" || [4, 7, 8].includes(m);
  return { theme, seasonMode: mode, isSpecialDay: isSpecial };
}

/* ============================================================
 *  CONTADOR INTELIGENTE — Siguiente evento según la fecha
 *  ------------------------------------------------------------
 *  Antes del 1 Oct:        → Halloween (1 Oct)
 *  1 Oct – 31 Oct:         → Día de Muertos (1 Nov)
 *  1 Nov – 2 Nov:          → Navidad (15 Dic)
 *  3 Nov – 14 Dic:         → Navidad (15 Dic)
 *  15 Dic – 6 Ene:         → Fin del especial (6 Ene)
 *  7 Ene – 30 Sep:         → Halloween (1 Oct)
 * ============================================================ */

export function getCountdownTarget(date: Date): { name: string; date: Date; mode: SeasonMode } {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();

  const halloween = new Date(y, 9, 1, 0, 0, 0);
  const diaMuertos = new Date(y, 10, 1, 0, 0, 0);
  const navidad = new Date(y, 11, 15, 0, 0, 0);
  const finNavidad = new Date(y + 1, 0, 6, 0, 0, 0);
  const nextHalloween = new Date(y + 1, 9, 1, 0, 0, 0);

  if (m === 9) return { name: "Especial de Halloween", date: halloween, mode: "pre-halloween" };
  if (m === 10) return { name: "Especial de Día de Muertos", date: diaMuertos, mode: "halloween" };
  if (m === 11 && d <= 2) return { name: "Especial de Navidad", date: navidad, mode: "dia-muertos" };
  if (m === 11 && d >= 3) return { name: "Especial de Navidad", date: navidad, mode: "regular" };
  if (m === 12 && d < 15) return { name: "Especial de Navidad", date: navidad, mode: "regular" };
  if (m === 12 && d >= 15) return { name: "Fin del Especial Navideño", date: finNavidad, mode: "navidad" };
  if (m === 1 && d <= 6) return { name: "Fin del Especial Navideño", date: finNavidad, mode: "navidad" };
  return { name: "Especial de Halloween", date: nextHalloween, mode: "regular" };
}

/* ============================================================
 *  DEPRECADO — Mantener compatibilidad
 * ============================================================ */

export function getNextBigSpecial(date: Date): { name: string; date: Date } {
  const t = getCountdownTarget(date);
  return { name: t.name, date: t.date };
}
