/**
 * URLs de video del canal.
 * ------------------------------------------------------------
 * ESTE es el archivo que hay que editar para que suene y se vea
 * cada programa. Una línea por programa: la clave es el id estable
 * y el valor es la URL DIRECTA del archivo.
 *
 *   "gravity-falls-summerween-t1e12": "PEGA_AQUI_LA_URL_DEL_MP4",
 *
 * Reglas:
 * - Deja "" si todavía no tienes el archivo. El televisor muestra
 *   la carta retro de "Señal no disponible" (no una página rota).
 * - Tiene que ser un archivo que el navegador pueda reproducir en
 *   una etiqueta <video>: .mp4, .webm u .ogg. Un link de YouTube,
 *   Vimeo o una ficha de archive.org no funciona aquí.
 * - No pongas tokens ni claves: este archivo viaja en el frontend.
 *
 * La clave "cortinilla" es opcional y se usa en las pausas cortas
 * entre programas. Si la dejas vacía, esas pausas también muestran
 * la carta de señal.
 */
export const VIDEO_URLS: Record<string, string> = {
  // Pausa entre programas. Un mp4 corto se repite en cada cortinilla.
  "cortinilla": "",

  // iCarly — iScream on Halloween · tarde · 24 min
  "icarly-iscream-on-halloween-t1e7": "",
  // Los Hechiceros de Waverly Place — Halloween · tarde · 22 min
  "los-hechiceros-de-waverly-place-halloween-t3e2": "",
  // Los Hechiceros de Waverly Place — Wizards vs. Werewolves · tarde · 22 min
  "los-hechiceros-de-waverly-place-wizards-vs-werewolves-t3e9": "",
  // ¡Buena Suerte, Charlie! — Scary Had a Little Lamb · tarde · 22 min
  "buena-suerte-charlie-scary-had-a-little-lamb-t2e25": "",
  // ¡Buena Suerte, Charlie! — Le Halloween · tarde · 22 min
  "buena-suerte-charlie-le-halloween-t3e15": "",
  // Zack y Cody: Gemelos en Acción — The Ghost of Suite 613 · tarde · 22 min
  "zack-y-cody-gemelos-en-accion-the-ghost-of-suite-613-t1e19": "",
  // Austin y Ally — Costumes & Courage · tarde · 22 min
  "austin-y-ally-costumes-courage-t2e1": "",
  // Yo Amo a Lizzie — Night of the Day of the Dead · tarde · 22 min
  "yo-amo-a-lizzie-night-of-the-day-of-the-dead-t1e24": "",
  // Girl Meets World — Girl Meets World of Terror · tarde · 22 min
  "girl-meets-world-girl-meets-world-of-terror-t1e11": "",
  // Malcolm — Halloween Approximately · noche · 22 min
  "malcolm-halloween-approximately-t2e2": "",
  // Community — Epidemiology · noche · 22 min
  "community-epidemiology-t2e6": "",
  // Community — Horror Fiction in Seven Spooky Steps · noche · 22 min
  "community-horror-fiction-in-seven-spooky-steps-t3e5": "",
  // Modern Family — Halloween · noche · 22 min
  "modern-family-halloween-t1": "",
  // The Big Bang Theory — The Middle-Earth Paradigm · noche · 22 min
  "the-big-bang-theory-the-middle-earth-paradigm-t1e6": "",
  // Brooklyn Nine-Nine — Halloween · noche · 22 min
  "brooklyn-nine-nine-halloween-t1e6": "",
  // Brooklyn Nine-Nine — Halloween II · noche · 22 min
  "brooklyn-nine-nine-halloween-ii-t2e4": "",
  // Brooklyn Nine-Nine — Halloween III · noche · 22 min
  "brooklyn-nine-nine-halloween-iii-t3e5": "",
  // Gravity Falls — Summerween · tarde · 22 min
  "gravity-falls-summerween-t1e12": "",
  // El Increíble Mundo de Gumball — The Halloween · tarde · 11 min
  "el-increible-mundo-de-gumball-the-halloween-t2e9": "",
  // Un Show Más — Terror Tales of the Park · tarde · 11 min
  "un-show-mas-terror-tales-of-the-park-t3e4": "",
  // Un Show Más — Terror Tales of the Park II · tarde · 11 min
  "un-show-mas-terror-tales-of-the-park-ii-t4e2": "",
  // Phineas y Ferb — Night of the Living Pharmacists · tarde · 22 min
  "phineas-y-ferb-night-of-the-living-pharmacists-t4e29-30": "",
  // Danny Phantom — Fright Night · tarde · 22 min
  "danny-phantom-fright-night-t1e13": "",
  // Los Padrinos Mágicos — Scary Godparents · mañana · 11 min
  "los-padrinos-magicos-scary-godparents-t2e13": "",
  // Bob Esponja — Scaredy Pants · mañana · 11 min
  "bob-esponja-scaredy-pants-t1e13": "",
  // Bob Esponja — Graveyard Shift · mañana · 11 min
  "bob-esponja-graveyard-shift-t2e16": "",
  // Escandalosos — Charlie's Halloween Thing · tarde · 11 min
  "escandalosos-charlie-s-halloween-thing-t3e29": "",
  // Escandalosos — Charlie's Halloween Thing 2 · tarde · 22 min
  "escandalosos-charlie-s-halloween-thing-2-t4e18-19": "",
  // Los Simpson — La Casita del Horror XIV · noche · 22 min
  "los-simpson-treehouse-of-horror-xiv-t15": "",
  // Los Simpson — La Casita del Horror XVII · noche · 22 min
  "los-simpson-treehouse-of-horror-xvii-t18": "",
  // Los Simpson — La Casita del Horror XX · noche · 22 min
  "los-simpson-treehouse-of-horror-xx-t21": "",
  // Kim Possible — October 31st · tarde · 22 min
  "kim-possible-october-31st-t1e14": "",
  // Zoey 101 — Haunted House · tarde · 22 min
  "zoey-101-haunted-house-t2e4-cod-prod-206": "",
  // Victorious — Terror on Cupcake Street · tarde · 22 min
  "victorious-terror-on-cupcake-street-t2e11": "",
  // iCarly — iHalfoween · tarde · 22 min
  "icarly-ihalfoween-t6e4": "",
  // Big Time Rush — Big Time Halloween · tarde · 22 min
  "big-time-rush-big-time-halloween-t2e5": "",
  // Jessie — The Whining · tarde · 22 min
  "jessie-the-whining-t2e1": "",
  // Hannah Montana — Torn Between Two Hannahs · tarde · 22 min
  "hannah-montana-torn-between-two-hannahs-t1e17": "",
  // Es Tan Raven — Don't Have a Cow · tarde · 22 min
  "es-tan-raven-don-t-have-a-cow-t2e2": "",
  // Clarence — Spooky Boo! · tarde · 11 min
  "clarence-spooky-boo-t1e51": "",
  // Kick Buttowski — Kick or Treat · tarde · 11 min
  "kick-buttowski-kick-or-treat-t2e13": "",
  // Star vs. las Fuerzas del Mal — Hungry Larry · tarde · 11 min
  "star-vs-las-fuerzas-del-mal-hungry-larry-t2e11": "",
  // Gravity Falls — Little Gift Shop of Horrors · noche · 22 min
  "gravity-falls-little-gift-shop-of-horrors-t2e6": "",
  // Más Allá del Jardín (Over the Garden Wall) — The Old Grist Mill · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-the-old-grist-mill-miniserie-e1": "",
  // Más Allá del Jardín (Over the Garden Wall) — Hard Times at the Huskin' Bee · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-hard-times-at-the-huskin-bee-miniserie-e2": "",
  // Más Allá del Jardín (Over the Garden Wall) — Schooltown Follies · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-schooltown-follies-miniserie-e3": "",
  // Más Allá del Jardín (Over the Garden Wall) — Songs of the Dark Lantern · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-songs-of-the-dark-lantern-miniserie-e4": "",
  // Más Allá del Jardín (Over the Garden Wall) — Mad Love · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-mad-love-miniserie-e5": "",
  // Más Allá del Jardín (Over the Garden Wall) — Lullaby in Frogland · tarde · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-lullaby-in-frogland-miniserie-e6": "",
  // Más Allá del Jardín (Over the Garden Wall) — The Ringing of the Bell · noche · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-the-ringing-of-the-bell-miniserie-e7": "",
  // Más Allá del Jardín (Over the Garden Wall) — Babes in the Wood · noche · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-babes-in-the-wood-miniserie-e8": "",
  // Más Allá del Jardín (Over the Garden Wall) — Into the Unknown · noche · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-into-the-unknown-miniserie-e9": "",
  // Más Allá del Jardín (Over the Garden Wall) — The Unknown · noche · 11 min
  "mas-alla-del-jardin-over-the-garden-wall-the-unknown-miniserie-e10": "",
  // Halloweentown · tarde · 84 min
  "halloweentown-1998": "",
  // Halloweentown II: La venganza de Kalabar · tarde · 81 min
  "halloweentown-ii-kalabar-s-revenge-2001": "",
  // Abracadabra · tarde · 96 min
  "hocus-pocus-1993": "",
  // Coraline y la puerta secreta · tarde · 100 min
  "coraline-2009": "",
  // El cadáver de la novia · tarde · 77 min
  "corpse-bride-2005": "",
  // ParaNorman · tarde · 92 min
  "paranorman-2012": "",
  // Monster House: La casa de los sustos · tarde · 91 min
  "monster-house-2006": "",
  // Scooby-Doo · tarde · 88 min
  "scooby-doo-2002": "",
  // Escalofríos · noche · 103 min
  "goosebumps-2015": "",
  // Frankenweenie · tarde · 87 min
  "frankenweenie-2012": "",
  // Hotel Transylvania · mañana · 91 min
  "hotel-transylvania-2012": "",
  // Beetlejuice: El súper fantasma · noche · 92 min
  "beetlejuice-1988": "",
  // Trick 'r Treat · noche · 82 min
  "trick-r-treat-2007": "",
  // The Witches · tarde · 91 min
  "the-witches-1990": "",
  // Las brujas · tarde · 106 min
  "the-witches-2020": "",
  // It (Eso) · noche · 135 min
  "it-2017": "",
  // Scream: Grita antes de morir · noche · 111 min
  "scream-1996": "",
  // Chucky: El muñeco diabólico · noche · 87 min
  "child-s-play-1988": "",
  // El conjuro · noche · 112 min
  "the-conjuring-2013": "",
  // La noche del demonio · noche · 103 min
  "insidious-2010": "",
  // Halloween · noche · 106 min
  "halloween-2018": "",
  // Coco · tarde · 105 min
  "coco-2017": "",
  // El libro de la vida · tarde · 95 min
  "the-book-of-life-2014": "",
  // La Leyenda de la Llorona · noche · 82 min
  "leyenda-llorona": "",
  // Mucha Lucha! — Especial Día de Muertos · mañana · 30 min
  "mucha-lucha-dia-de-muertos": "",
  // La Leyenda de la Nahuala · tarde · 90 min
  "leyenda-nahuala": "",
  // La Leyenda de las Momias · noche · 85 min
  "leyenda-momias": "",
  // Mucha Lucha! — Maratón de lucha libre · mañana · 60 min
  "mucha-lucha-maraton": "",
  // Bob Esponja — Navidad ¿Quién? · mañana · 30 min
  "nav-bob-esponja": "",
  // El Grinch · noche · 104 min
  "nav-grinch": "",
  // Hora de Aventura — Especial navideño · mañana · 22 min
  "nav-hora-de-aventura": "",
  // Los chicos del barrio — Navidad · mañana · 22 min
  "nav-hey-arnold": "",
  // Ren y Stimpy — Especial navideño · noche · 22 min
  "nav-ren-stimpy": "",
  // Foster, la casa de los amigos imaginarios — Navidad · mañana · 22 min
  "nav-foster": "",
  // Rudolph, el reno de la nariz roja · tarde · 47 min
  "nav-rudolph": "",
  // Olive, el otro reno · tarde · 45 min
  "nav-olive": "",
  // Chowder — Especial navideño · tarde · 22 min
  "nav-chowder": "",
  // Un Show Más — Navidad en el parque · tarde · 22 min
  "nav-un-show-mas": "",
  // El extraño mundo de Jack · noche · 76 min
  "nav-pesadilla": "",
  // Dragon Ball Z · tarde · 22 min
  "nino-dragon-ball-z": "",
  // Pokémon · mañana · 22 min
  "nino-pokemon": "",
  // Digimon Adventure · mañana · 22 min
  "nino-digimon": "",
  // Las Chicas Superpoderosas · mañana · 22 min
  "nino-chicas-superpoderosas": "",
  // Sailor Moon · tarde · 22 min
  "nino-sailor-moon": "",
  // Sakura Card Captors · tarde · 22 min
  "nino-sakura": "",
  // Samurai Jack · tarde · 22 min
  "nino-samurai-jack": "",
  // Kirby · mañana · 22 min
  "nino-kirby": "",
  // Un Show Más — Verano en el parque · mañana · 22 min
  "ver-un-show-mas": "",
  // Phineas y Ferb · mañana · 22 min
  "ver-phineas": "",
  // Las sombrías aventuras de Billy y Mandy · tarde · 22 min
  "ver-billy-mandy": "",
  // Bob Esponja — Verano en Fondo de Bikini · mañana · 22 min
  "ver-bob-esponja": "",
  // Totally Spies! — Misión de verano · tarde · 22 min
  "ver-spies": "",
  // Dragon Ball · tarde · 22 min
  "ver-dragon-ball": "",
  // Kim Possible — Aventura tropical · tarde · 22 min
  "ver-kim": "",
  // Código: KND · noche · 22 min
  "ver-knd": "",
  // Rocket Power · noche · 22 min
  "ver-rocket": "",
  // Hora de Aventura · noche · 22 min
  "nov-hora-de-aventura": "",
  // Bob Esponja — Clásicos · mañana · 22 min
  "nov-bob-esponja": "",
  // Chowder — Maratón culinario · tarde · 22 min
  "nov-chowder": "",
  // Las Chicas Superpoderosas · tarde · 22 min
  "nov-chicas-superpoderosas": "",
  // Hora de Aventura · mañana · 22 min
  "neu-hora-de-aventura": "",
  // Bob Esponja · mañana · 22 min
  "neu-bob-esponja": "",
  // Un Show Más · tarde · 22 min
  "neu-un-show-mas": "",
  // Las Chicas Superpoderosas · mañana · 22 min
  "neu-chicas-superpoderosas": "",
  // Chowder · tarde · 22 min
  "neu-chowder": "",
  // Foster, la casa de los amigos imaginarios · tarde · 22 min
  "neu-foster": "",
  // Coraje, el perro cobarde · noche · 22 min
  "neu-coraje": "",
  // Invasor Zim · noche · 22 min
  "neu-zim": "",
};

export function videoUrlFor(catalogId: string): string {
  const value = VIDEO_URLS[catalogId];
  return typeof value === "string" ? value.trim() : "";
}
