import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Copia por servidor (Conversions API de Meta) del clic en WhatsApp que el navegador manda al píxel.
// Lleva el mismo event_id que el evento del navegador, así Meta lo cuenta una sola vez,
// y llega aunque la persona tenga un bloqueador de anuncios.

const PIXEL_ID = "915339354347019";
// Solo eventos que el sitio dispara desde un clic. Los de formulario los manda notify-lead.
const EVENTOS_PERMITIDOS = ["Contact"];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const responder = (cuerpo: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(cuerpo), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { event_name, event_id, origen, ref, fbp, fbc, client_ua, event_source_url } = await req.json();

    if (!EVENTOS_PERMITIDOS.includes(event_name) || typeof event_id !== "string" || event_id.length > 80) {
      return responder({ sent: false, reason: "evento no permitido" }, 400);
    }

    const META_TOKEN = Deno.env.get("META_CONVERSIONS_API_TOKEN");
    if (!META_TOKEN) return responder({ sent: false, reason: "sin token" });

    const client_ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    const evento = {
      event_name,
      event_id,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      event_source_url: typeof event_source_url === "string" ? event_source_url.slice(0, 500) : "https://maytepethotel.com/",
      user_data: {
        ...(client_ip ? { client_ip_address: client_ip } : {}),
        ...(client_ua ? { client_user_agent: String(client_ua).slice(0, 500) } : {}),
        ...(fbc ? { fbc: String(fbc).slice(0, 300) } : {}),
        ...(fbp ? { fbp: String(fbp).slice(0, 300) } : {}),
      },
      custom_data: {
        ...(origen ? { content_name: String(origen).slice(0, 60) } : {}),
        ...(ref ? { content_category: String(ref).slice(0, 40) } : {}),
      },
    };

    const res = await fetch(`https://graph.facebook.com/v22.0/${PIXEL_ID}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [evento], access_token: META_TOKEN }),
    });
    const datos = await res.json();
    if (!res.ok) {
      console.error("Meta CAPI error:", JSON.stringify(datos));
      return responder({ sent: false, status: res.status, error: datos?.error ?? datos });
    }
    return responder({ sent: true, events_received: datos.events_received });
  } catch (err) {
    console.error("track-event failed:", err);
    return responder({ sent: false, reason: String(err) }, 500);
  }
});
