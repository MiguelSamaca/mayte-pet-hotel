import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgMetodo from "@/assets/hocicos/hocicos-metodo.webp";
import { Reveal } from "./animacion";
import { EASE } from "./contacto";

const PASOS = [
  { fuerte: "Escuchamos su historia", resto: " — su salud, sus medicinas, sus mañas, sus miedos." },
  { fuerte: "Adaptamos su rutina", resto: " a la que tiene en casa." },
  { fuerte: "Respetamos su ritmo", resto: " en cada paseo, comida y descanso." },
  { fuerte: "Cuidamos su tratamiento", resto: " al detalle." },
  { fuerte: "Te mantenemos cerca", resto: " con reportes durante toda su estadía." },
];

// Método en línea de tiempo: la línea se dibuja y cada paso se "enciende" al pasar por él.
const MetodoHocicos = () => {
  const lineaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineaRef, offset: ["start 70%", "end 60%"] });
  const escala = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto grid max-w-6xl items-start gap-16 px-4 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div className="relative">
              <img
                src={imgMetodo}
                alt="Cuidadora de Mayte Pet Hotel acompañando a un perro mayor"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-[2rem] object-cover object-[50%_22%] shadow-2xl"
              />
              <motion.div
                className="absolute -bottom-6 right-4 max-w-[16rem] rounded-2xl bg-white p-5 shadow-xl lg:-right-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Nuestro método</p>
                <p className="mt-1 font-semibold text-tinta">Antes de recibirlo, lo conocemos.</p>
              </motion.div>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="text-3xl font-semibold leading-tight text-tinta md:text-5xl">
              No improvisamos con un viejito. <span className="text-accent">Lo entendemos primero.</span>
            </h2>
          </Reveal>

          <div ref={lineaRef} className="relative mt-12">
            <div aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-0.5 bg-nube-oscura" />
            <motion.div
              aria-hidden="true"
              style={{ scaleY: escala }}
              className="absolute bottom-6 left-[23px] top-6 w-0.5 origin-top bg-accent"
            />
            <ol>
              {PASOS.map((paso, i) => (
                <li key={paso.fuerte} className="relative pb-10 pl-20 last:pb-0">
                  <motion.span
                    className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent text-lg font-bold"
                    initial={{ backgroundColor: "#ffffff", color: "#8d41c6" }}
                    whileInView={{ backgroundColor: "#8d41c6", color: "#ffffff" }}
                    viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                    transition={{ duration: 0.4 }}
                  >
                    {i + 1}
                  </motion.span>
                  <Reveal y={16}>
                    <p className="pt-2 text-xl leading-relaxed text-tinta-suave">
                      <strong className="font-semibold text-tinta">{paso.fuerte}</strong>
                      {paso.resto}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetodoHocicos;
