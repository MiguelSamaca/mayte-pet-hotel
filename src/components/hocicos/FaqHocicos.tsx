import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import imgPiola from "@/assets/hocicos/hocicos-piola.webp";
import { Botones, Reveal } from "./animacion";

const PREGUNTAS = [
  {
    p: "¿Y si necesita medicación varias veces al día o algo especial?",
    r: "Sin problema. Nos cuentas su tratamiento completo y llevamos el control de cada dosis y horario.",
  },
  {
    p: "¿Qué pasa si casi no camina o se cansa rápido?",
    r: "Ajustamos los paseos a lo que su cuerpo permita. Cortos, tranquilos y siempre a su ritmo.",
  },
  {
    p: "¿Pueden manejar una dieta o comida específica?",
    r: "Sí. Mantenemos su alimentación tal como en casa para no alterar su digestión ni su rutina.",
  },
  {
    p: "¿Y si nunca lo he dejado con nadie?",
    r: "Lo entendemos, y por eso te invitamos a conocernos antes. Una visita suele ser el mejor primer paso.",
  },
  {
    p: "¿Puedo ver cómo está durante su estadía?",
    r: "Siempre. Te enviamos fotos y videos para que lo veas tranquilo y en paz.",
  },
];

const FaqHocicos = () => (
  <section className="bg-nube py-20 md:py-28">
    <div className="container mx-auto grid max-w-6xl items-start gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr]">
      <Reveal className="lg:sticky lg:top-28">
        <h2 className="text-3xl font-semibold leading-tight text-tinta md:text-5xl">Preguntas frecuentes</h2>
        <img
          src={imgPiola}
          alt="Perra mayor descansando tranquila en su cama"
          loading="lazy"
          className="mt-8 hidden aspect-[4/3] w-full rounded-[2rem] object-cover shadow-xl lg:block"
        />
        <div className="mt-8 hidden lg:block">
          <Botones />
        </div>
      </Reveal>

      <Accordion type="single" collapsible defaultValue="pregunta-0" className="space-y-4">
        {PREGUNTAS.map(({ p, r }, i) => (
          <Reveal key={p} delay={i * 0.06}>
            <AccordionItem
              value={`pregunta-${i}`}
              className="rounded-2xl border-none bg-white px-6 shadow-sm transition-shadow duration-300 data-[state=open]:shadow-lg"
            >
              <AccordionTrigger className="gap-4 py-5 text-left text-lg font-semibold text-tinta hover:no-underline focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-accent">
                {p}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base leading-relaxed text-tinta-suave">{r}</AccordionContent>
            </AccordionItem>
          </Reveal>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FaqHocicos;
