import { motion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { Etiqueta, Reveal } from "./animacion";
import { EASE } from "./contacto";

const LUGARES = ["Movimiento", "Otros perros", "Actividad todo el día"];
const NECESITA = ["Calma", "Paciencia", "Respeto por su ritmo", "Que su día se parezca al que tiene en casa"];
const RESULTADOS = ["No se confunde", "No se estresa", "No se deprime por tu ausencia"];

const lista = { visible: { transition: { staggerChildren: 0.12 } } };
const item = {
  oculto: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// "Por qué un viejito necesita otro cuidado", contado como comparación lado a lado.
const ContrasteHocicos = () => (
  <section className="bg-white py-20 md:py-28">
    <div className="container mx-auto max-w-6xl px-4">
      <Reveal className="mx-auto max-w-3xl text-center">
        <Etiqueta>Por qué un viejito necesita otro cuidado</Etiqueta>
        <h2 className="mt-5 text-3xl font-semibold leading-tight text-tinta md:text-5xl">
          A cierta edad, un perro no necesita más juego. <span className="text-accent">Necesita más comprensión.</span>
        </h2>
      </Reveal>

      <div className="relative mt-14 grid gap-6 md:grid-cols-2 md:gap-12">
        <Reveal x={-40} y={0} className="flex flex-col rounded-[2rem] bg-nube p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tinta-suave">La mayoría de los lugares</p>
          <p className="mt-3 text-2xl font-semibold text-tinta">Tratan a todos los perros igual</p>
          <motion.ul
            variants={lista}
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-6 space-y-3"
          >
            {LUGARES.map((texto) => (
              <motion.li key={texto} variants={item} className="flex items-center gap-3 text-lg text-tinta-suave">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tinta/10">
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </span>
                {texto}
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-auto border-t border-tinta/10 pt-6 text-tinta-suave">
            <p className="mt-8">Para un cachorro eso es diversión.</p>
            <p className="mt-1 text-lg font-semibold text-tinta">Para un perro mayor, muchas veces es estrés.</p>
          </div>
        </Reveal>

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <motion.span
            aria-hidden="true"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-sm font-bold uppercase text-tinta shadow-xl ring-8 ring-white"
            initial={{ scale: 0, rotate: -90 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          >
            vs
          </motion.span>
        </div>

        <Reveal x={40} y={0} delay={0.15} className="flex flex-col rounded-[2rem] bg-tinta p-8 text-nube md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">Un hocico canoso necesita otra cosa</p>
          <motion.ul
            variants={lista}
            initial="oculto"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-6 space-y-3"
          >
            {NECESITA.map((texto) => (
              <motion.li key={texto} variants={item} className="flex items-center gap-3 text-lg">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-tinta">
                  <Check className="h-4 w-4" aria-hidden="true" />
                </span>
                {texto}
              </motion.li>
            ))}
          </motion.ul>
          <div className="mt-auto border-t border-nube/15 pt-6">
            <p className="mt-8 text-nube/80">Cuando nada cambia demasiado:</p>
            <motion.ul
              variants={lista}
              initial="oculto"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {RESULTADOS.map((texto) => (
                <motion.li
                  key={texto}
                  variants={item}
                  className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-nube"
                >
                  {texto}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

export default ContrasteHocicos;
