import type { Bloque, CatalogItem, Category, Rating } from "../types";
import rawHalloween from "./halloween-programacion.json";

interface RawEpisode {
  serie: string;
  titulo_en: string;
  titulo_es_latam: string;
  temporada_episodio: string;
  anio: number;
  duracion_min: number;
  bloque: Bloque;
  descripcion: string;
}

interface RawMovie {
  titulo_en: string;
  titulo_es_latam: string;
  anio: number;
  duracion_min: number;
  bloque: Bloque;
  descripcion: string;
}

const halloweenRaw = rawHalloween as { episodios: RawEpisode[]; peliculas: RawMovie[] };

function slug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

/** Título en español cuando el JSON lo trae confirmado; si no, el inglés. */
function knownSpanish(spanish: string, english: string): string {
  const trimmed = spanish.trim();
  if (!trimmed) return english;
  if (/desconocido/i.test(trimmed)) return english;
  if (/no verificado/i.test(trimmed)) return english;
  return trimmed;
}

function ratingForEpisode(serie: string): Rating {
  if (/simpson|community|malcolm/i.test(serie)) return "TV-14";
  if (/modern family|big bang|brooklyn|hannah|zoey|victorious|icarly|buena suerte|hechiceros|austin|girl meets|es tan raven|jessie|big time|kim possible/i.test(serie)) {
    return "TV-PG";
  }
  return "TV-Y7";
}

function genreForEpisode(serie: string): string {
  if (/simpson|community|malcolm|modern family|big bang|brooklyn|hannah|zoey|victorious|es tan raven|jessie|big time|buena suerte|hechiceros|icarly|austin|girl meets/i.test(serie)) {
    return "Comedia";
  }
  if (/gravity falls|más allá del jardín|over the garden/i.test(serie)) return "Misterio";
  if (/danny phantom|kim possible|kick buttowski/i.test(serie)) return "Acción";
  return "Animación";
}

function ratingForMovie(tituloEn: string): Rating {
  if (/^(It|Scream|Child's Play|The Conjuring|Insidious|Halloween)$/.test(tituloEn)) return "TV-MA";
  if (tituloEn === "Beetlejuice" || tituloEn === "Trick 'r Treat") return "TV-14";
  return "PG";
}

function genreForMovie(bloque: Bloque): string {
  return bloque === "noche" ? "Terror" : "Fantasía";
}

function buildHalloweenCatalog(): CatalogItem[] {
  const used = new Set<string>();
  const take = (base: string) => {
    let id = base || "programa";
    let n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    return id;
  };

  const episodes: CatalogItem[] = halloweenRaw.episodios.map((episode) => {
    const title = knownSpanish(episode.titulo_es_latam, episode.titulo_en);
    return {
      id: take(`${slug(episode.serie)}-${slug(episode.titulo_en)}-${slug(episode.temporada_episodio)}`),
      titulo: `${episode.serie} — ${title}`,
      categoria: "Episodio" as Category,
      sinopsis: `${episode.descripcion} (${episode.temporada_episodio}, ${episode.anio})`,
      genre: genreForEpisode(episode.serie),
      rating: ratingForEpisode(episode.serie),
      duration: Math.max(1, episode.duracion_min),
      bloque: episode.bloque,
    };
  });

  const movies: CatalogItem[] = halloweenRaw.peliculas.map((movie) => ({
    id: take(`${slug(movie.titulo_en)}-${movie.anio}`),
    titulo: knownSpanish(movie.titulo_es_latam, movie.titulo_en),
    categoria: "Película" as Category,
    sinopsis: `${movie.descripcion} (${movie.anio})`,
    genre: genreForMovie(movie.bloque),
    rating: ratingForMovie(movie.titulo_en),
    duration: Math.max(1, movie.duracion_min),
    bloque: movie.bloque,
  }));

  return [...episodes, ...movies];
}

export const halloweenCatalog: CatalogItem[] = buildHalloweenCatalog();

function bloqueFromHour(hour: number): Bloque {
  if (hour >= 6 && hour < 12) return "mañana";
  if (hour >= 12 && hour < 20) return "tarde";
  return "noche";
}

function show(
  id: string,
  titulo: string,
  categoria: Category,
  sinopsis: string,
  genre: string,
  rating: Rating,
  duration: number,
  hour: number,
): CatalogItem {
  return { id, titulo, categoria, sinopsis, genre, rating, duration, bloque: bloqueFromHour(hour) };
}

const diaMuertosExtra: CatalogItem[] = halloweenCatalog.filter((item) =>
  /d[ií]a de muertos|1-2 nov/i.test(item.sinopsis),
);

const diaMuertosOwn: CatalogItem[] = [
  show("leyenda-llorona", "La Leyenda de la Llorona", "Película", "La leyenda mexicana cobra vida.", "Terror", "TV-14", 82, 20),
  show("mucha-lucha-dia-de-muertos", "Mucha Lucha! — Especial Día de Muertos", "Especial", "Los luchadores honran a sus antepasados.", "Comedia", "TV-Y7", 30, 9),
  show("leyenda-nahuala", "La Leyenda de la Nahuala", "Película", "Leo enfrenta a la Nahuala en una vieja casona.", "Aventura", "TV-PG", 90, 16),
  show("leyenda-momias", "La Leyenda de las Momias", "Película", "Aventura en Guanajuato con momias.", "Aventura", "TV-PG", 85, 21),
  show("mucha-lucha-maraton", "Mucha Lucha! — Maratón de lucha libre", "Especial", "Maratón de la serie clásica.", "Comedia", "TV-Y7", 60, 10),
];

export const diaMuertosCatalog: CatalogItem[] = [...diaMuertosOwn, ...diaMuertosExtra];

export const novemberCatalog: CatalogItem[] = [
  show("nov-hora-de-aventura", "Hora de Aventura", "Episodio", "Finn y Jake en Ooo.", "Aventura", "TV-PG", 22, 20),
  show("nov-bob-esponja", "Bob Esponja — Clásicos", "Episodio", "Episodios clásicos de Fondo de Bikini.", "Comedia", "TV-Y7", 22, 8),
  show("nov-chowder", "Chowder — Maratón culinario", "Episodio", "Chowder y sus desventuras en la cocina.", "Comedia", "TV-Y7", 22, 14),
  show("nov-chicas-superpoderosas", "Las Chicas Superpoderosas", "Episodio", "Heroínas de Saltadilla.", "Acción", "TV-Y7", 22, 16),
];

export const navidadCatalog: CatalogItem[] = [
  show("nav-bob-esponja", "Bob Esponja — Navidad ¿Quién?", "Especial", "Bob descubre la Navidad por primera vez.", "Comedia", "TV-Y7", 30, 8),
  show("nav-grinch", "El Grinch", "Película", "El Grinch planea arruinar la Navidad.", "Comedia", "PG", 104, 20),
  show("nav-hora-de-aventura", "Hora de Aventura — Especial navideño", "Especial", "Finn y Jake celebran la Navidad en Ooo.", "Aventura", "TV-PG", 22, 10),
  show("nav-hey-arnold", "Los chicos del barrio — Navidad", "Especial", "Los chicos del barrio celebran las fiestas.", "Comedia", "TV-PG", 22, 9),
  show("nav-ren-stimpy", "Ren y Stimpy — Especial navideño", "Especial", "Caos navideño con Ren y Stimpy.", "Comedia", "TV-14", 22, 22),
  show("nav-foster", "Foster, la casa de los amigos imaginarios — Navidad", "Especial", "Mac y Bloo celebran en la mansión.", "Comedia", "TV-Y7", 22, 11),
  show("nav-rudolph", "Rudolph, el reno de la nariz roja", "Película", "El reno de la nariz roja salva la Navidad.", "Familia", "TV-G", 47, 14),
  show("nav-olive", "Olive, el otro reno", "Película", "Olive viaja al Polo Norte.", "Familia", "TV-G", 45, 15),
  show("nav-chowder", "Chowder — Especial navideño", "Especial", "Chowder prepara un festín navideño.", "Comedia", "TV-Y7", 22, 16),
  show("nav-un-show-mas", "Un Show Más — Navidad en el parque", "Especial", "Mordecai y Rigby organizan la fiesta.", "Comedia", "TV-PG", 22, 18),
  show("nav-pesadilla", "El extraño mundo de Jack", "Película", "Jack Skellington descubre la Navidad.", "Fantasía", "PG", 76, 21),
];

export const kidsCatalog: CatalogItem[] = [
  show("nino-dragon-ball-z", "Dragon Ball Z", "Episodio", "Goku y sus amigos en batallas épicas.", "Acción", "TV-PG", 22, 16),
  show("nino-pokemon", "Pokémon", "Episodio", "Ash y Pikachu en aventuras.", "Aventura", "TV-Y7", 22, 8),
  show("nino-digimon", "Digimon Adventure", "Episodio", "Los niños elegidos y sus digimon.", "Aventura", "TV-Y7", 22, 9),
  show("nino-chicas-superpoderosas", "Las Chicas Superpoderosas", "Episodio", "Bombón, Burbuja y Bellota salvan el mundo.", "Acción", "TV-Y7", 22, 10),
  show("nino-sailor-moon", "Sailor Moon", "Episodio", "Las guerreras de la Luna.", "Magia", "TV-PG", 22, 14),
  show("nino-sakura", "Sakura Card Captors", "Episodio", "Sakura captura las cartas mágicas.", "Magia", "TV-Y7", 22, 15),
  show("nino-samurai-jack", "Samurai Jack", "Episodio", "Jack viaja por un futuro distópico.", "Acción", "TV-PG", 22, 18),
  show("nino-kirby", "Kirby", "Episodio", "Kirby defiende Dream Land.", "Aventura", "TV-Y7", 22, 11),
];

export const summerCatalog: CatalogItem[] = [
  show("ver-un-show-mas", "Un Show Más — Verano en el parque", "Episodio", "El parque bajo el sol del verano.", "Comedia", "TV-PG", 22, 8),
  show("ver-phineas", "Phineas y Ferb", "Episodio", "Los hermanos construyen inventos increíbles.", "Comedia", "TV-Y7", 22, 9),
  show("ver-billy-mandy", "Las sombrías aventuras de Billy y Mandy", "Episodio", "El verano con la Muerte de visita.", "Comedia", "TV-Y7", 22, 15),
  show("ver-bob-esponja", "Bob Esponja — Verano en Fondo de Bikini", "Episodio", "Bob y Patricio disfrutan el sol.", "Comedia", "TV-Y7", 22, 10),
  show("ver-spies", "Totally Spies! — Misión de verano", "Episodio", "Las espías en una misión playera.", "Acción", "TV-Y7", 22, 16),
  show("ver-dragon-ball", "Dragon Ball", "Episodio", "Goku y sus amigos de aventura.", "Acción", "TV-PG", 22, 18),
  show("ver-kim", "Kim Possible — Aventura tropical", "Episodio", "Kim en una misión en la playa.", "Acción", "TV-PG", 22, 14),
  show("ver-knd", "Código: KND", "Episodio", "El Sector V en vacaciones.", "Acción", "TV-Y7", 22, 20),
  show("ver-rocket", "Rocket Power", "Episodio", "Los chicos del surf en Ocean Shores.", "Aventura", "TV-Y7", 22, 21),
];

export const neutralCatalog: CatalogItem[] = [
  show("neu-hora-de-aventura", "Hora de Aventura", "Episodio", "Aventuras de Finn y Jake en Ooo.", "Aventura", "TV-PG", 22, 8),
  show("neu-bob-esponja", "Bob Esponja", "Episodio", "La vida en Fondo de Bikini.", "Comedia", "TV-Y7", 22, 9),
  show("neu-un-show-mas", "Un Show Más", "Episodio", "Mordecai y Rigby en el parque.", "Comedia", "TV-PG", 22, 14),
  show("neu-chicas-superpoderosas", "Las Chicas Superpoderosas", "Episodio", "Heroínas en acción.", "Acción", "TV-Y7", 22, 10),
  show("neu-chowder", "Chowder", "Episodio", "Aventuras culinarias.", "Comedia", "TV-Y7", 22, 15),
  show("neu-foster", "Foster, la casa de los amigos imaginarios", "Episodio", "Amigos imaginarios en la mansión.", "Comedia", "TV-Y7", 22, 16),
  show("neu-coraje", "Coraje, el perro cobarde", "Episodio", "Coraje en Nowhere.", "Terror", "TV-Y7", 22, 20),
  show("neu-zim", "Invasor Zim", "Episodio", "Zim intenta conquistar la Tierra.", "Ciencia ficción", "TV-PG", 22, 21),
];

const CATALOGS: Record<string, CatalogItem[]> = {
  halloween: halloweenCatalog,
  "dia-muertos": diaMuertosCatalog,
  navidad: navidadCatalog,
  dianino: kidsCatalog,
  verano: summerCatalog,
  noviembre: novemberCatalog,
  neutro: neutralCatalog,
};

export function getCatalog(catalogKey: string): CatalogItem[] {
  return CATALOGS[catalogKey] ?? neutralCatalog;
}

/** Todos los ids, sin repetir, para el archivo de URLs. */
export function listCatalogItems(): CatalogItem[] {
  const seen = new Set<string>();
  const all: CatalogItem[] = [];
  for (const items of Object.values(CATALOGS)) {
    for (const item of items) {
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      all.push(item);
    }
  }
  return all;
}
