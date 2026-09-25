import { motion } from "framer-motion";
import { ChevronDown, Footprints, Home, Pill } from "lucide-react";
import imgBanner from "@/assets/hocicos/hocicos-sofa.webp";
import { Botones, Etiqueta } from "./animacion";
import { EASE } from "./contacto";

const LINEA_1 = "Tu perro ya no es un cachorro.".split(" ");
const LINEA_2 = "Y por eso merece un cuidado hecho a su edad.".split(" ");

const PROMESAS = [
  { icon: Pill, texto: "Sus medicinas a tiempo" },
  { icon: Footprints, texto: "Sus paseos a su ritmo" },
  { icon: Home, texto: "Una rutina como la de casa" },
];

const PalabrasAnimadas = ({
  palabras,
  retraso,
  className = "",
}: {
  palabras: string[];
  retraso: number;
  className?: string;
}) => (
  <span className={`block ${className}`} aria-hidden="true">
    {palabras.map((palabra, i) => (
      <motion.span
        key={i}
        className="mr-[0.25em] inline-block"
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: retraso + i * 0.06, ease: EASE }}
      >
        {palabra}
      </motion.span>
    ))}
  </span>
);

const HeroHocicos = () => (
  <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-tinta md:items-center">
    {/* Foto horizontal encuadrada a la derecha: los peludos quedan al lado del texto y no debajo.
        Con una foto vertical el motivo siempre cae al centro y el titular le tapa la cara. */}
    <div className="absolute inset-0" aria-hidden="true">
      <motion.img
        src={imgBanner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "66% 50%" }}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: "easeOut" }}
      />
      <div className="absolute inset-0 bg-tinta/50 md:hidden" />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-tinta/85 via-tinta/40 to-transparent md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-tinta/75 via-transparent to-transparent" />
    </div>

    <div className="container relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-32 md:pb-24">
      <div className="max-w-2xl text-white">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <Etiqueta claro>Hocicos Canosos · Mayte Pet Hotel</Etiqueta>
        </motion.div>

        <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[4rem]">
          <span className="sr-only">Tu perro ya no es un cachorro. Y por eso merece un cuidado hecho a su edad.</span>
          <PalabrasAnimadas palabras={LINEA_1} retraso={0.15} />
          <PalabrasAnimadas palabras={LINEA_2} retraso={0.4} className="mt-1 text-primary" />
        </h1>

        <motion.p
          className="mt-6 text-lg italic text-white/85 md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          Cuidado especializado para los que ya peinan canas.
        </motion.p>

        <motion.p
          className="mt-4 max-w-xl text-base leading-relaxed text-white/85 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease: EASE }}
        >
          <strong className="font-semibold text-white">Hocicos Canosos</strong> es el cuidado de Mayte Pet Hotel pensado
          para perros mayores: sus medicinas a tiempo, sus paseos a su ritmo y una rutina tan parecida a la de casa que
          casi no notará que te fuiste.
        </motion.p>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.7, ease: EASE }}
        >
          <Botones sobreFoto />
        </motion.div>

        <motion.ul
          className="mt-8 flex flex-wrap gap-2"
          initial="oculto"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 1.25 } } }}
        >
          {PROMESAS.map(({ icon: Icon, texto }) => (
            <motion.li
              key={texto}
              variants={{ oculto: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
              {texto}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>

    <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
      <motion.a
        href="#preocupacion"
        aria-label="Seguir leyendo"
        className="block text-white/70 transition-colors hover:text-white"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.a>
    </div>
  </section>
);

export default HeroHocicos;
