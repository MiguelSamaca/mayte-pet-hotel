import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import imgFondo from "@/assets/hocicos/morita-sonrisa.webp";
import { Botones, Reveal } from "./animacion";

const CierreHocicos = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-tinta">
      <motion.img
        src={imgFondo}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ y }}
        className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
      />
      <div className="absolute inset-0 bg-tinta/70" />
      <div className="container relative mx-auto max-w-4xl px-4 py-24 text-center text-white md:py-36">
        <Reveal>
          <h2 className="text-4xl font-semibold leading-tight md:text-6xl">
            Te acompañó toda la vida.
            <span className="mt-2 block text-primary">Deja que nosotros lo acompañemos ahora.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
            En Hocicos Canosos cuidamos a tu viejito con la misma paciencia con la que él te esperó todos estos años. Con
            calma, con cariño y con la atención que su edad merece.
          </p>
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Botones sobreFoto centrado />
        </Reveal>
      </div>
    </section>
  );
};

export default CierreHocicos;
