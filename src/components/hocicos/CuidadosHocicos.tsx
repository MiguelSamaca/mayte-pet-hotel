import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { Camera, Footprints, HeartHandshake, Home, Moon, PawPrint, Pill } from "lucide-react";
import imgPaseo from "@/assets/hocicos/hocicos-paseo.webp";
import imgSonrisa from "@/assets/hocicos/hocicos-sonrisa.webp";
import imgJuguete from "@/assets/hocicos/hocicos-juguete.webp";
import imgPisos from "@/assets/hocicos/morita-pisos.webp";
import imgUnoAUno from "@/assets/hocicos/hocicos-uno-a-uno.webp";
import imgDescanso from "@/assets/hocicos/hocicos-descanso.webp";
import imgCompania from "@/assets/hocicos/hocicos-compania.webp";
import { Etiqueta, Reveal } from "./animacion";
import { EASE } from "./contacto";

const CUIDADOS = [
  {
    icon: Footprints,
    titulo: "Paseos a su ritmo, no al nuestro",
    texto:
      "Caminatas adaptadas a su condición física. Sin apurarlo, sin exigirle de más. Le damos el tiempo que necesita para oler, reconocer su entorno y hacer sus necesidades con tranquilidad. A esta edad, ese momento es sagrado y aquí se respeta.",
    img: imgPaseo,
    alt: "Perro mayor paseando con correa sobre el pasto",
    posicion: "50% 40%",
  },
  {
    icon: Home,
    titulo: "Su rutina, casi intacta",
    texto:
      "Respetamos sus horarios de comida, descanso y salidas para que su día aquí se sienta como el de casa. Mientras menos cambie su mundo, más tranquilo se queda.",
    img: imgSonrisa,
    alt: "Perro mayor sonriendo dentro del hotel",
    posicion: "50% 35%",
  },
  {
    icon: Pill,
    titulo: "Sus medicinas, nunca a destiempo",
    texto:
      "Llevamos el control de cada dosis y cada horario. Tú nos cuentas su tratamiento; nosotros nos aseguramos de que no se le pase ni una toma.",
    img: imgJuguete,
    alt: "Perro mayor de hocico canoso descansando tranquilo",
    posicion: "50% 40%",
  },
  {
    icon: PawPrint,
    titulo: "Pisos entapetados",
    texto:
      "Para que sus articulaciones no sufran. Nada de resbalones ni esfuerzos de más: camina firme y seguro en cada paso.",
    img: imgPisos,
    alt: "Perra mayor recostada sobre el piso acolchado del hotel",
    posicion: "50% 50%",
  },
  {
    icon: HeartHandshake,
    titulo: "Atención uno a uno",
    texto: "No es un salón lleno de perros. Es cuidado cercano, con alguien pendiente de él de verdad.",
    img: imgUnoAUno,
    alt: "Cuidadora de Mayte Pet Hotel junto a un labrador mayor de hocico canoso",
    posicion: "50% 28%",
  },
  {
    icon: Moon,
    titulo: "Calma de verdad",
    texto: "Un ambiente silencioso y amable, sin el bullicio que a su edad agota.",
    img: imgDescanso,
    alt: "Perro mayor arropado con una cobija en su cama",
    posicion: "50% 60%",
  },
  {
    icon: Camera,
    titulo: "Comunicación constante",
    texto: "Fotos y videos para que lo veas comiendo, descansando y tranquilo. Para que tú también estés en paz.",
    img: imgCompania,
    alt: "Dos perros mayores descansando juntos",
    posicion: "50% 50%",
  },
];
const DURACION = 6000;

// Vitrina interactiva: pestañas que avanzan solas mientras la sección está en pantalla.
const CuidadosHocicos = () => {
  const reducir = useReducedMotion();
  const seccionRef = useRef<HTMLElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const botonesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const enPantalla = useInView(seccionRef, { amount: 0.3 });
  const [activo, setActivo] = useState(0);
  const [pausa, setPausa] = useState(false);
  const autoplay = !reducir && !pausa && enPantalla;

  useEffect(() => {
    if (!enPantalla) return;
    CUIDADOS.forEach(({ img }) => {
      const precarga = new Image();
      precarga.src = img;
    });
  }, [enPantalla]);

  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => setActivo((a) => (a + 1) % CUIDADOS.length), DURACION);
    return () => clearTimeout(t);
  }, [activo, autoplay]);

  // En celular la lista es un carril horizontal: mantener visible la pestaña activa sin mover la página.
  useEffect(() => {
    const lista = listaRef.current;
    const boton = botonesRef.current[activo];
    if (!lista || !boton || lista.scrollWidth <= lista.clientWidth) return;
    lista.scrollTo({ left: boton.offsetLeft - lista.clientWidth / 2 + boton.clientWidth / 2, behavior: "smooth" });
  }, [activo]);

  const alPresionarTecla = (e: KeyboardEvent<HTMLDivElement>) => {
    const pasos: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (!(e.key in pasos)) return;
    e.preventDefault();
    const siguiente = (activo + pasos[e.key] + CUIDADOS.length) % CUIDADOS.length;
    setActivo(siguiente);
    botonesRef.current[siguiente]?.focus();
  };

  const actual = CUIDADOS[activo];

  return (
    <section ref={seccionRef} className="bg-nube py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Etiqueta>Nuestro diferencial</Etiqueta>
          <h2 className="mt-5 text-3xl font-semibold text-tinta md:text-5xl">Así cuidamos a un hocico canoso</h2>
        </Reveal>

        <div
          className="mt-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10"
          onMouseEnter={() => setPausa(true)}
          onMouseLeave={() => setPausa(false)}
          onFocus={() => setPausa(true)}
          onBlur={() => setPausa(false)}
        >
          <div
            ref={listaRef}
            role="tablist"
            aria-label="Cuidados de Hocicos Canosos"
            onKeyDown={alPresionarTecla}
            className="relative -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {CUIDADOS.map(({ icon: Icon, titulo }, i) => {
              const seleccionado = i === activo;
              return (
                <button
                  key={titulo}
                  ref={(el) => {
                    botonesRef.current[i] = el;
                  }}
                  id={`cuidado-tab-${i}`}
                  role="tab"
                  aria-selected={seleccionado}
                  aria-controls="cuidado-panel"
                  tabIndex={seleccionado ? 0 : -1}
                  onClick={() => setActivo(i)}
                  className={`relative flex shrink-0 cursor-pointer snap-start items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 lg:gap-4 lg:px-5 lg:py-4 ${
                    seleccionado ? "bg-white shadow-lg" : "bg-white/50 hover:bg-white"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      seleccionado ? "bg-accent text-accent-foreground" : "bg-accent/10 text-accent"
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span
                    className={`whitespace-nowrap font-semibold lg:whitespace-normal ${
                      seleccionado ? "text-tinta" : "text-tinta-suave"
                    }`}
                  >
                    {titulo}
                  </span>
                  {seleccionado && autoplay && (
                    <motion.span
                      key={`progreso-${activo}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-1 origin-left bg-primary"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: DURACION / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div
            id="cuidado-panel"
            role="tabpanel"
            aria-labelledby={`cuidado-tab-${activo}`}
            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-tinta shadow-2xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[36rem]"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={actual.img}
                src={actual.img}
                alt={actual.alt}
                style={{ objectPosition: actual.posicion }}
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/45 to-transparent" />
            <AnimatePresence mode="wait">
              <motion.div
                key={activo}
                className="absolute inset-x-0 bottom-0 p-6 text-white md:p-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="text-sm font-semibold tracking-[0.2em] text-primary">
                  {String(activo + 1).padStart(2, "0")} / {String(CUIDADOS.length).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-2xl font-semibold md:text-3xl">{actual.titulo}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">{actual.texto}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuidadosHocicos;
