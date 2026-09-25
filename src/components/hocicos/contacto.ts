export const WHATSAPP = "573154148380";

const waLink = (texto: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`;

// No hay sistema de reservas: "Agenda una visita" abre WhatsApp con el mensaje ya escrito.
export const WA_VISITA = waLink(
  "Hola 🐶 Quiero agendar una visita para conocer Hocicos Canosos, el cuidado de Mayte Pet Hotel para perros mayores."
);
export const WA_INFO = waLink("Hola 🐶 Quiero saber más de Hocicos Canosos para mi perro mayor.");

export const registrarContacto = () => {
  const { fbq } = window as Window & { fbq?: (...args: unknown[]) => void };
  if (typeof fbq === "function") {
    fbq("track", "Contact");
  }
};

// Curva de salida suave compartida por todas las entradas de la página.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
