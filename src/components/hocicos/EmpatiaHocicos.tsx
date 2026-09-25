import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgEmpatia from "@/assets/hocicos/hocicos-hero.webp";
import { Reveal, TextoScroll } from "./animacion";
import { EASE } from "./contacto";

const MIEDOS = [
  "Que lejos de casa se sienta confundido.",
  "Que esté triste sin ti.",
  "Que alguien lo apure en el paseo o se le pase una medicina.",
  "Que el cambio le pegue más fuerte que antes… porque a su edad, todo pega más fuerte.",
];

const EmpatiaHocicos = () => {
  const fotoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: fotoRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="preocupacion" className="scroll-mt-20 bg-nube py-20 md:py-28">
      <div className="container mx-auto grid max-w-6xl items-start gap-14 px-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <div ref={fotoRef} className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl">
              <motion.img
                src={imgEmpatia}
                alt="Perro mayor de hocico canoso mirando a la cámara"
                loading="lazy"
                style={{ y }}
                className="absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="text-2xl font-semibold text-tinta-suave md:text-3xl">Sabemos lo que de verdad te preocupa.</h2>
          </Reveal>

          <TextoScroll
            texto="No te da miedo viajar. Te da miedo dejarlo."
            destacarDesde={5}
            className="mt-6 text-4xl font-bold leading-tight text-tinta md:text-6xl"
          />

          <ul className="mt-10 space-y-3">
            {MIEDOS.map((miedo, i) => (
              <motion.li
                key={miedo}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
                className="flex items-start gap-4 rounded-2xl border border-tinta/10 bg-white p-5 shadow-sm"
              >
                <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <p className="text-lg leading-relaxed text-tinta">{miedo}</p>
              </motion.li>
            ))}
          </ul>

          <Reveal className="mt-10">
            <p className="text-xl leading-relaxed text-tinta md:text-2xl">
              Ese es el miedo que entendemos.{" "}
              <span className="font-semibold">
                Y por eso existe{" "}
                <span className="relative inline-block whitespace-nowrap">
                  Hocicos Canosos
                  <svg
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-2 left-0 h-3 w-full"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M2 9 C 50 2, 150 2, 198 8"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4, ease: EASE }}
                    />
                  </svg>
                </span>
                .
              </span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EmpatiaHocicos;
