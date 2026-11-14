/**
 * Conversiones del sitio: clic a WhatsApp y registro en formularios.
 *
 * Cada conversión se avisa a la vez al píxel de Meta (navegador), a la Conversions API
 * (servidor, con el mismo event_id para que Meta no la cuente doble) y a Google Ads.
 * El mensaje de WhatsApp lleva un código de referencia con la campaña de origen.
 */
import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";
import { codigoReferencia, leerAtribucion } from "@/lib/atribucion";

export const WHATSAPP = "573154148380";

// Google Ads, cuenta Mayte Pet Boutique (560-765-2186).
const GOOGLE_ADS = "AW-16848646222";
const CONVERSION_WHATSAPP = `${GOOGLE_ADS}/F1HjCK7KwrgdEM7gh-I-`;
const CONVERSION_FORMULARIO = `${GOOGLE_ADS}/PxIlCL2pybgdEM7gh-I-`;

type Ventana = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
};

const nuevoEventId = (prefijo: string) => `${prefijo}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const leerCookie = (nombre: string) => document.cookie.match(new RegExp(`(^| )${nombre}=([^;]+)`))?.[2];

/** Datos del navegador que Meta usa para unir el evento del servidor con el de la persona. */
export function datosNavegador() {
  const atribucion = leerAtribucion();
  // Si la cookie _fbc todavía no existe pero llegó con fbclid, se arma con el formato que pide Meta.
  const fbc = leerCookie("_fbc") ?? (atribucion.fbclid ? `fb.1.${Date.now()}.${atribucion.fbclid}` : undefined);
  return {
    fbp: leerCookie("_fbp"),
    fbc,
    client_ua: navigator.userAgent,
    event_source_url: window.location.href,
    atribucion,
    ref: codigoReferencia(atribucion),
  };
}

/** Enlace de WhatsApp con el mensaje prellenado y el código de origen al final. */
export function enlaceWhatsApp(texto: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`${texto}\n\n(Ref: ${codigoReferencia()})`)}`;
}

/** Llamar en el onClick de cualquier botón que abra WhatsApp. `origen` dice qué botón fue. */
export function registrarClicWhatsApp(origen: string): void {
  const w = window as Ventana;
  const eventId = nuevoEventId("wa");
  const datos = datosNavegador();

  w.fbq?.("track", "Contact", { content_name: origen, content_category: datos.ref }, { eventID: eventId });
  w.gtag?.("event", "conversion", { send_to: CONVERSION_WHATSAPP });

  // Copia por servidor: no se pierde con bloqueadores de anuncios. Si falla, el clic sigue igual.
  supabase.functions
    .invoke("track-event", { body: { event_name: "Contact", event_id: eventId, origen, ...datos } })
    .catch(() => undefined);
}

type LeadBase = { email: string; nombre: string | null; telefono?: string | null; origen: string };

/**
 * Guarda el lead con su origen (código de referencia y parámetros de campaña).
 * Si la base todavía no tiene esas columnas, lo guarda sin ellas para no perder el contacto.
 */
export async function guardarLead(base: LeadBase) {
  const atribucion = leerAtribucion();
  const conOrigen = { ...base, ref: codigoReferencia(atribucion), atribucion };
  // ref y atribucion vienen de la migración 20261114120000_leads_atribucion; quitar el cast
  // cuando se regeneren los tipos de Supabase con esas columnas.
  const { error } = await supabase.from("leads").insert(conOrigen as unknown as TablesInsert<"leads">);
  if (!error) return { error: null };
  const faltaColumna = /column|schema cache/i.test(error.message);
  return faltaColumna ? await supabase.from("leads").insert(base) : { error };
}

/**
 * Registro en un formulario. Devuelve lo que hay que mandarle a notify-lead para que el evento
 * del servidor lleve el mismo event_id y la misma atribución que el del navegador.
 */
export function registrarFormulario(origen: string, evento: "Lead" | "CompleteRegistration" = "Lead") {
  const w = window as Ventana;
  const eventId = nuevoEventId("lead");
  const datos = datosNavegador();

  w.fbq?.("track", evento, { content_name: origen, content_category: datos.ref }, { eventID: eventId });
  w.gtag?.("event", "conversion", { send_to: CONVERSION_FORMULARIO });

  return { event_name: evento, event_id: eventId, ...datos };
}
