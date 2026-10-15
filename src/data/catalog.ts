import type { CatalogItem } from "../types";
import { pdCatalog } from "./public-domain";

/**
 * Lo que sale al aire es solo dominio público con archivo real.
 * Los títulos con copyright (iCarly, Gravity Falls, etc.) no entran
 * a la barra: sin mp4 solo mostrarían "Señal no disponible".
 *
 * Noche de Halloween y de Día de Muertos: películas de terror.
 * Mañana y tarde: cortos. El resto del año usa los mismos cortos,
 * y de noche un largo más ligero más Superman.
 */

const mananaSuave = [
  "steamboat-willie-1928",
  "plane-crazy-1929",
  "betty-ajedrez-1932",
  "betty-maravillas-1934",
  "betty-bambu-1932",
  "betty-ruido-1935",
  "popeye-simbad-1936",
  "superman-gigante-artico",
  "superman-monstruos-mecanicos",
];

const tardeSusto = [
  "danza-esqueletos-1929",
  "casa-embrujada-1929",
  "minnie-the-moocher-1932",
  "betty-rascal-1932",
  "superman-momia",
  "superman-cientifico-loco",
  "superman-terremoto",
  "superman-volcan",
  "superman-feria",
  "superman-subsuelo",
];

const nocheTerror = [
  "notld-1968",
  "nosferatu-1922",
  "caligari-1920",
  "fantasma-opera-1925",
  "colina-embrujada-1959",
  "carnaval-almas-1962",
  "tienda-horrores-1960",
  "murcielago-1959",
  "white-zombie-1932",
];

const nocheGotica = [
  "nosferatu-1922",
  "caligari-1920",
  "fantasma-opera-1925",
  "white-zombie-1932",
  "murcielago-1959",
  "carnaval-almas-1962",
];

const diaMuertosDia = [
  "danza-esqueletos-1929",
  "casa-embrujada-1929",
  "minnie-the-moocher-1932",
  "betty-rascal-1932",
  "superman-momia",
  "betty-ajedrez-1932",
];

export const halloweenCatalog: CatalogItem[] = [
  ...pdCatalog(mananaSuave, "mañana"),
  ...pdCatalog(tardeSusto, "tarde"),
  ...pdCatalog(nocheTerror, "noche"),
];

export const diaMuertosCatalog: CatalogItem[] = [
  ...pdCatalog(diaMuertosDia, "mañana"),
  ...pdCatalog(["danza-esqueletos-1929", "casa-embrujada-1929", "minnie-the-moocher-1932", "superman-subsuelo", "betty-maravillas-1934"], "tarde"),
  ...pdCatalog(nocheGotica, "noche"),
];

const cortosDia = [...mananaSuave, ...tardeSusto.filter((id) => id !== "superman-subsuelo")];

export const neutralCatalog: CatalogItem[] = [
  ...pdCatalog(mananaSuave, "mañana"),
  ...pdCatalog(tardeSusto.filter((id) => !id.startsWith("superman-momia")), "tarde"),
  ...pdCatalog(["tienda-horrores-1960", "superman-cientifico-loco", "superman-monstruos-mecanicos", "superman-subsuelo", "popeye-simbad-1936"], "noche"),
];

export const novemberCatalog: CatalogItem[] = neutralCatalog;

export const navidadCatalog: CatalogItem[] = [
  ...pdCatalog(cortosDia.slice(0, 8), "mañana"),
  ...pdCatalog(cortosDia.slice(8), "tarde"),
  ...pdCatalog(["popeye-simbad-1936", "superman-gigante-artico", "steamboat-willie-1928", "plane-crazy-1929"], "noche"),
];

export const kidsCatalog: CatalogItem[] = [
  ...pdCatalog(["steamboat-willie-1928", "plane-crazy-1929", "betty-ajedrez-1932", "betty-maravillas-1934", "popeye-simbad-1936", "superman-gigante-artico"], "mañana"),
  ...pdCatalog(["superman-monstruos-mecanicos", "superman-cientifico-loco", "superman-volcan", "casa-embrujada-1929", "betty-bambu-1932", "betty-ruido-1935"], "tarde"),
  ...pdCatalog(["superman-terremoto", "superman-feria", "superman-subsuelo", "danza-esqueletos-1929"], "noche"),
];

export const summerCatalog: CatalogItem[] = [
  ...pdCatalog(["steamboat-willie-1928", "plane-crazy-1929", "betty-bambu-1932", "betty-ruido-1935", "popeye-simbad-1936"], "mañana"),
  ...pdCatalog(["superman-gigante-artico", "superman-volcan", "superman-monstruos-mecanicos", "betty-maravillas-1934", "betty-ajedrez-1932"], "tarde"),
  ...pdCatalog(["superman-terremoto", "superman-cientifico-loco", "superman-feria", "plane-crazy-1929"], "noche"),
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
