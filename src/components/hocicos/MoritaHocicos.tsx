import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Footprints,
  Heart,
  Quote,
  Sparkles,
  Stethoscope,
  Sunrise,
} from "lucide-react";
import moritaPrincipal from "@/assets/hocicos/morita-principal.webp";
import moritaCompanera from "@/assets/hocicos/morita-companera.webp";
import moritaSentada from "@/assets/hocicos/morita-sentada.webp";
import moritaJuego from "@/assets/hocicos/morita-juego.webp";
import moritaDescanso from "@/assets/hocicos/morita-descanso.webp";
import moritaAmigos from "@/assets/hocicos/morita-amigos.webp";
import moritaMirada from "@/assets/hocicos/morita-mirada.webp";
import { Reveal, TextoScroll } from "./animacion";
import { EASE } from "./contacto";

const GALERIA = [
  { src: moritaPrincipal, alt: "Morita, golden retriever de 12 años, recostada y sonriendo", posicion: "50% 50%" },
  { src: moritaCompanera, alt: "Morita sonriendo mientras otra perrita descansa detrás", posicion: "50% 60%" },
  { src: moritaSentada, alt: "Morita sentada, atenta y tranquila", posicion: "50% 30%" },
  { src: moritaJuego, alt: "Morita jugando con un juguete", posicion: "50% 40%" },
];

const CONDICIONES = [
  "Displasia de cadera",
  "Enfermedad articular degenerativa crónica",
  "Síndrome de cauda equina",
];

const DIA_A_DIA = [
  {
    icon: Footprints,
    texto:
      "Cada paseo lo pensamos para ella: rutas sin peldaños ni bordillos, giros siempre amplios para que no perdiera el equilibrio, y toda la paciencia del mundo para que oliera y avanzara a su ritmo, sin un solo afán.",
  },
  {
    icon: Sunrise,
    texto:
      "En las mañanas frías, antes de salir, la dejábamos dar unos pasos adentro para que calentara sus articulaciones. En las noches, calor en la columna y la cadera para calmar el dolor.",
  },
  {
    icon: Heart,
    texto:
      "Su comida, medida exacta para cuidar su peso. Sus medicinas, siempre a la hora justa. Cuando quería jugar, nos agachábamos a su nivel y sobre piso firme, para que se entusiasmara sin riesgo de caerse. Y para cuidar sus articulaciones desde adentro, le dábamos las gelatinas de colágeno que preparamos aquí para nuestros abuelitos.",
  },
  {
    icon: Stethoscope,
    texto:
      "Nos aseguramos de que nada le faltara: hasta su acupunturista vino al hotel a hacerle sus sesiones, para que su tratamiento contra el dolor no se interrumpiera ni un día. Y mantuvimos contacto directo con sus tutores, con su veterinaria de siempre y con contactos de emergencia en Bogotá, por si acaso.",
  },
];

const INCLUYO = [
  "Paseos sin escalones y con giros amplios",
  "Calentamiento matutino de articulaciones",
  "Terapia de calor nocturna",
  "Comida medida y medicamentos puntuales",
  "Juego seguro a su nivel",
  "Gelatinas de colágeno de la casa",
  "Sesiones de acupuntura dentro del hotel",
  "Coordinación con su veterinaria y contactos de emergencia",
];

const lista = { visible: { transition: { staggerChildren: 0.08 } } };
const item = {
  oculto: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const GaleriaMorita = () => {
  const reducir = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [seleccion, setSeleccion] = useState(0);
  const [pausa, setPausa] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const alSeleccionar = () => setSeleccion(emblaApi.selectedScrollSnap());
    alSeleccionar();
    emblaApi.on("select", alSeleccionar);
    return () => {
      emblaApi.off("select", alSeleccionar);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || reducir || pausa) return;
    const t = setInterval(() => emblaApi.scrollNext(), 4500);
    return () => clearInterval(t);
  }, [emblaApi, reducir, pausa]);

  const anterior = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const siguiente = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div
      className="relative mt-12"
      onMouseEnter={() => setPausa(true)}
      onMouseLeave={() => setPausa(false)}
      onPointerDown={() => setPausa(true)}
    >
      <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carrusel" aria-label="Fotos de Morita">
        <div className="flex">
          {GALERIA.map((foto, i) => (
            <div
              key={foto.alt}
              className="min-w-0 shrink-0 grow-0 basis-[86%] px-2 md:basis-[64%] md:px-3"
              aria-roledescription="diapositiva"
              aria-label={`${i + 1} de ${GALERIA.length}`}
            >
              <motion.img
                src={foto.src}
                alt={foto.alt}
                loading="lazy"
                draggable={false}
                style={{ objectPosition: foto.posicion }}
                animate={{ scale: i === seleccion ? 1 : 0.9, opacity: i === seleccion ? 1 : 0.45 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="aspect-[4/3] w-full select-none rounded-[1.75rem] object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={anterior}
          aria-label="Foto anterior"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-nube/30 text-nube transition hover:bg-nube/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex">
          {GALERIA.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a la foto ${i + 1}`}
              aria-current={i === seleccion}
              className="flex h-11 w-7 cursor-pointer items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${
                  i === seleccion ? "w-6 bg-primary" : "w-2 bg-nube/40"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          onClick={siguiente}
          aria-label="Foto siguiente"
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-nube/30 text-nube transition hover:bg-nube/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

const MoritaHocicos = () => (
  <section id="morita" className="overflow-hidden bg-tinta py-20 text-nube md:py-28">
    <div className="container mx-auto max-w-6xl px-4">
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-nube/80">
          Golden retriever · 12 años
        </span>
        <h2 className="mt-5 text-4xl font-semibold md:text-6xl">La historia de Morita</h2>
        <p className="mt-5 text-lg italic text-nube/80 md:text-xl">
          12 años, hija única, y un cuerpo que ya no la acompaña como antes.
        </p>
      </Reveal>
    </div>

    <GaleriaMorita />

    <div className="container mx-auto max-w-6xl px-4">
      <Reveal className="mx-auto mt-16 max-w-3xl">
        <p className="text-lg leading-relaxed text-nube/90 md:text-xl">
          Morita es una golden retriever de 12 años. En casa es hija única: consentida, tranquila, siempre acompañada.
          Pero su cuerpo ya no la sigue como quisiera. Vive con displasia de cadera, enfermedad articular degenerativa
          crónica y síndrome de cauda equina. Sus patitas traseras —y a veces las delanteras— le fallan. Se resbala. Le
          cuesta girar, no puede retroceder ni subir un escalón. Y cuando se cae, levantarse es toda una hazaña.
        </p>
      </Reveal>
      <motion.ul
        variants={lista}
        initial="oculto"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="mx-auto mt-6 flex max-w-3xl flex-wrap gap-2"
        aria-label="Condiciones de Morita"
      >
        {CONDICIONES.map((condicion) => (
          <motion.li
            key={condicion}
            variants={item}
            className="rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium"
          >
            {condicion}
          </motion.li>
        ))}
      </motion.ul>

      <Reveal className="mx-auto mt-24 max-w-4xl text-center">
        <p className="text-3xl font-semibold leading-tight md:text-5xl">
          Recibir a Morita no era recibir a una perra más.{" "}
          <span className="text-primary">Era comprometerse con cada detalle.</span>
        </p>
      </Reveal>

      {/* Los primeros días */}
      <div className="mt-20 grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <Reveal x={-40} y={0}>
          <img
            src={moritaDescanso}
            alt="Morita durmiendo sobre su cobija"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </Reveal>
        <Reveal x={40} y={0} delay={0.1}>
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-nube/80">
            Los primeros días
          </span>
          <p className="mt-5 text-2xl leading-relaxed md:text-3xl">
            Fue la Morita de casa: reservada, quietecita, observando desde lejos.
          </p>
          <p className="mt-4 text-xl font-semibold text-primary md:text-2xl">No la apuramos. Le dimos tiempo.</p>
        </Reveal>
      </div>

      {/* El día a día */}
      <Reveal className="mt-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Cada detalle, pensado para ella</p>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {DIA_A_DIA.map(({ icon: Icon, texto }, i) => (
          <Reveal
            key={i}
            delay={i * 0.08}
            className="h-full rounded-3xl border border-nube/10 bg-white/5 p-7 transition-colors hover:bg-white/10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-5 leading-relaxed text-nube/90">{texto}</p>
          </Reveal>
        ))}
      </div>

      {/* El giro */}
      <div className="mt-24 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15"
        >
          <Sparkles className="h-8 w-8 text-primary" aria-hidden="true" />
        </motion.div>
        <Reveal delay={0.2}>
          <p className="mt-6 text-4xl font-semibold md:text-6xl">Y entonces pasó algo hermoso.</p>
        </Reveal>
      </div>

      {/* A los pocos días */}
      <div className="mt-16 grid items-center gap-8 md:grid-cols-2 md:gap-14">
        <Reveal x={40} y={0} delay={0.1} className="md:order-2">
          <img
            src={moritaAmigos}
            alt="Morita sentada compartiendo el espacio con otros perros"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </Reveal>
        <Reveal x={-40} y={0} className="md:order-1">
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.16em] text-tinta">
            A los pocos días
          </span>
          <p className="mt-5 text-lg leading-relaxed text-nube/90 md:text-xl">
            Morita, que en casa casi no socializa por ser hija única, empezó a soltarse. Con los otros perros se animó.
            Se puso atenta. A los pocos días ya quería jugar, salir cuando todos salían, participar en todo. Cosas que no
            hace en casa. Cosas que no hizo los primeros días. Se movió más, se animó más, y sus articulaciones lo
            agradecieron.
          </p>
        </Reveal>
      </div>

      <TextoScroll
        oscuro
        texto="El cambio no fue el lugar. Fue el cuidado."
        destacarDesde={6}
        className="mx-auto mt-28 max-w-4xl text-center text-4xl font-bold leading-tight md:text-6xl"
      />

      <Reveal className="mt-24 rounded-[2rem] bg-nube p-8 text-tinta md:p-12">
        <h3 className="text-2xl font-semibold md:text-3xl">El cuidado de Morita incluyó:</h3>
        <motion.ul
          variants={lista}
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {INCLUYO.map((texto) => (
            <motion.li key={texto} variants={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-tinta-suave">{texto}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Reveal>

      <Reveal className="relative mt-10 overflow-hidden rounded-[2rem] border border-nube/10 bg-white/5 p-8 md:p-12">
        <Quote className="absolute -right-6 -top-6 h-44 w-44 text-primary/10" aria-hidden="true" />
        <figure className="relative grid items-center gap-8 md:grid-cols-[auto_1fr]">
          <img
            src={moritaMirada}
            alt="Morita mirando a la cámara"
            loading="lazy"
            className="mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-primary/60 md:h-44 md:w-44"
          />
          <div>
            <blockquote className="text-xl italic leading-relaxed md:text-2xl">
              “Mil gracias, Catalina, por tantos cuidados y dedicación con Morita durante estos días. Sé que no es cualquier
              responsabilidad, y para nosotros es una tranquilidad saber que está rodeada de tanto cariño, como en su casa.
              Estoy feliz de encontrar un sitio donde puede volver y sabemos que estará en las mejores manos.”
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-nube/70">
              — Tutores de Morita
            </figcaption>
          </div>
        </figure>
      </Reveal>
    </div>
  </section>
);

export default MoritaHocicos;
