import { enlaceWhatsApp, registrarClicWhatsApp } from "@/lib/conversiones";

// No hay sistema de reservas: "Agenda una visita" abre WhatsApp con el mensaje ya escrito.
// Son funciones y no constantes para que el enlace lleve el código de la campaña con la que llegó la persona.
export const waVisita = () =>
  enlaceWhatsApp("Hola 🐶 Quiero agendar una visita para conocer Hocicos Canosos, el cuidado de Mayte Pet Hotel para perros mayores.");
export const waInfo = () => enlaceWhatsApp("Hola 🐶 Quiero saber más de Hocicos Canosos para mi perro mayor.");

export const registrarContacto = (origen: string) => () => registrarClicWhatsApp(origen);

// Curva de salida suave compartida por todas las entradas de la página.
export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
