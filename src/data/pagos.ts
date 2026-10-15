/**
 * Botón "Invítame un café".
 *
 * Pega aquí SOLO la URL pública de tu link de cobro de Mercado Pago.
 * Ejemplo:
 *   export const MERCADO_PAGO_URL = "https://mpago.la/xxxxxxxx";
 *
 * Déjalo en "" hasta que lo tengas. No pongas access tokens, client
 * secrets ni claves: este archivo se incluye en el frontend y cualquiera
 * puede leerlo.
 */
export const MERCADO_PAGO_URL = "";

/** Devuelve la URL solo si es http(s). Si está vacía o no es un enlace, null. */
export function mercadoPagoHref(): string | null {
  const raw = MERCADO_PAGO_URL.trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
