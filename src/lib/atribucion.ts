/**
 * Atribución de campañas: guarda de dónde llegó la persona (UTM, fbclid, gclid)
 * para que cada contacto por WhatsApp o formulario lleve su origen.
 *
 * Se guarda la última campaña por la que llegó (último toque) durante 30 días,
 * así una persona que vuelve directo al sitio sigue asociada al anuncio que la trajo.
 */

const CLAVE = "mp_atribucion";
const VIGENCIA_DIAS = 30;
const PARAMETROS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"] as const;

type Parametro = (typeof PARAMETROS)[number];
export type Atribucion = Partial<Record<Parametro, string>> & { landing?: string; fecha?: string };

/** Llamar una vez al cargar la app, antes de renderizar. */
export function capturarAtribucion(): void {
  try {
    const query = new URLSearchParams(window.location.search);
    const nueva: Atribucion = {};
    for (const p of PARAMETROS) {
      const valor = query.get(p);
      if (valor) nueva[p] = valor.slice(0, 200);
    }
    if (Object.keys(nueva).length === 0) return;
    nueva.landing = window.location.pathname;
    nueva.fecha = new Date().toISOString();
    window.localStorage.setItem(CLAVE, JSON.stringify(nueva));
  } catch {
    // Sin almacenamiento (modo privado): la atribución se pierde, el sitio sigue funcionando.
  }
}

export function leerAtribucion(): Atribucion {
  try {
    const guardada = JSON.parse(window.localStorage.getItem(CLAVE) || "{}") as Atribucion;
    if (guardada.fecha && Date.now() - Date.parse(guardada.fecha) > VIGENCIA_DIAS * 864e5) return {};
    return guardada;
  } catch {
    return {};
  }
}

/**
 * Código corto que viaja en el mensaje de WhatsApp para que Catalina sepa de dónde llegó cada persona.
 * Ejemplos: META-M1-A5 (campaña M1, anuncio A5), GOOGLE-G1, WEB (llegó sin campaña).
 * Las campañas se nombran HOTEL_VAC26_M1_... y los anuncios empiezan por su código (A5, R1, C4-B).
 */
export function codigoReferencia(atribucion: Atribucion = leerAtribucion()): string {
  const fuente = atribucion.gclid
    ? "GOOGLE"
    : atribucion.fbclid
      ? "META"
      : (atribucion.utm_source || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!fuente) return "WEB";
  const campana = (atribucion.utm_campaign || "").toUpperCase().match(/(?:^|_)([MG]\d+)(?:_|$)/)?.[1];
  const anuncio = (atribucion.utm_content || "").toUpperCase().match(/^([A-Z]\d+(?:-[A-Z])?)/)?.[1];
  return [fuente, campana, anuncio].filter(Boolean).join("-").slice(0, 30);
}
