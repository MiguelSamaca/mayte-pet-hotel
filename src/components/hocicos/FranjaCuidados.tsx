import { motion, useReducedMotion } from "framer-motion";
import { PawPrint } from "lucide-react";

const TITULOS = [
  "Paseos a su ritmo",
  "Su rutina, casi intacta",
  "Sus medicinas, nunca a destiempo",
  "Pisos entapetados",
  "Atención uno a uno",
  "Calma de verdad",
  "Comunicación constante",
];

const Fila = ({ oculta = false }: { oculta?: boolean }) => (
  <div className="flex shrink-0 items-center" aria-hidden={oculta || undefined}>
    {TITULOS.map((titulo) => (
      <span key={titulo} className="flex items-center gap-8 whitespace-nowrap pr-8 text-base font-semibold md:text-lg">
        {titulo}
        <PawPrint className="h-4 w-4 text-primary" aria-hidden="true" />
      </span>
    ))}
  </div>
);

// Franja en movimiento con los siete cuidados; estática si el usuario pidió menos movimiento.
const FranjaCuidados = () => {
  const reducir = useReducedMotion();

  return (
    <section aria-label="Cuidados de Hocicos Canosos" className="overflow-hidden bg-accent py-5 text-accent-foreground">
      {reducir ? (
        <ul className="container mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2 px-4">
          {TITULOS.map((titulo) => (
            <li key={titulo} className="text-base font-semibold">
              {titulo}
            </li>
          ))}
        </ul>
      ) : (
        <motion.div
          className="flex w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        >
          <Fila />
          <Fila oculta />
        </motion.div>
      )}
    </section>
  );
};

export default FranjaCuidados;
