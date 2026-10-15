/**
 * URLs de video del canal.
 * ------------------------------------------------------------
 * Cada clave es el id del programa. El valor es la URL DIRECTA
 * del archivo (.mp4) que la etiqueta <video> puede reproducir.
 *
 * Las que ya están llenas apuntan a Internet Archive: copias en
 * dominio público de Estados Unidos o con licencia CC, revisadas
 * en la ficha del ítem. La lista y la nota de licencia viven en
 * src/data/public-domain.ts.
 *
 * Para cambiar un archivo, sustituye la URL. Déjala en "" si no
 * hay archivo: ese horario muestra "Señal no disponible".
 * No pongas tokens ni páginas de YouTube o de archive.org;
 * tiene que ser el mp4.
 *
 * "cortinilla" suena en las pausas de unos minutos entre programas.
 */
import { CORTINILLA_URL, PD_WORKS, pdUrl } from "./public-domain";

export const VIDEO_URLS: Record<string, string> = {
  cortinilla: CORTINILLA_URL,
  ...Object.fromEntries(PD_WORKS.map((work) => [work.id, pdUrl(work.id)])),
};

export function videoUrlFor(catalogId: string): string {
  const value = VIDEO_URLS[catalogId];
  return typeof value === "string" ? value.trim() : "";
}
