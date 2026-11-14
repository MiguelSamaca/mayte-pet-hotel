import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CalendarCheck, MessageCircle, PawPrint } from "lucide-react";
import { EASE, registrarContacto, waInfo, waVisita } from "./contacto";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
}

// Aparece al entrar en pantalla, una sola vez.
export const Reveal = ({ children, className, delay = 0, x = 0, y = 28 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);

export const Etiqueta = ({ children, claro = false }: { children: ReactNode; claro?: boolean }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] ${
      claro ? "bg-white/15 text-white backdrop-blur-sm" : "bg-accent/10 text-accent"
    }`}
  >
    <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
    {children}
  </span>
);

export const Botones = ({ sobreFoto = false, centrado = false }: { sobreFoto?: boolean; centrado?: boolean }) => (
  <div className={`flex flex-col gap-3 sm:flex-row ${centrado ? "sm:justify-center" : ""}`}>
    <motion.a
      href={waVisita()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={registrarContacto("hocicos_agenda_visita")}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground shadow-[0_14px_34px_-12px_hsl(var(--accent)/0.75)] transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
    >
      <CalendarCheck className="h-5 w-5" aria-hidden="true" />
      Agenda una visita
    </motion.a>
    <motion.a
      href={waInfo()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={registrarContacto("hocicos_escribenos")}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 px-8 py-4 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 ${
        sobreFoto ? "border-white/80 text-white hover:bg-white/10" : "border-accent text-accent hover:bg-accent/5"
      }`}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      Escríbenos por WhatsApp
    </motion.a>
  </div>
);

interface PalabraProps {
  children: ReactNode;
  progreso: MotionValue<number>;
  rango: [number, number];
  destacada: boolean;
  oscuro: boolean;
}

const Palabra = ({ children, progreso, rango, destacada, oscuro }: PalabraProps) => {
  const opacity = useTransform(progreso, rango, [0.15, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.25em] inline-block ${destacada ? (oscuro ? "text-primary" : "text-accent") : ""}`}
    >
      {children}
    </motion.span>
  );
};

interface TextoScrollProps {
  texto: string;
  className?: string;
  destacarDesde?: number;
  oscuro?: boolean;
}

// Frase que se enciende palabra por palabra a medida que se hace scroll.
export const TextoScroll = ({ texto, className, destacarDesde, oscuro = false }: TextoScrollProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const palabras = texto.split(" ");

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palabras.map((palabra, i) => (
          <Palabra
            key={i}
            progreso={scrollYProgress}
            rango={[i / palabras.length, (i + 1) / palabras.length]}
            destacada={destacarDesde !== undefined && i >= destacarDesde}
            oscuro={oscuro}
          >
            {palabra}
          </Palabra>
        ))}
      </span>
    </p>
  );
};
