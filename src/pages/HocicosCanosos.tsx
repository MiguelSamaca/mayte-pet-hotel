import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MotionConfig, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroHocicos from "@/components/hocicos/HeroHocicos";
import FranjaCuidados from "@/components/hocicos/FranjaCuidados";
import EmpatiaHocicos from "@/components/hocicos/EmpatiaHocicos";
import ContrasteHocicos from "@/components/hocicos/ContrasteHocicos";
import CuidadosHocicos from "@/components/hocicos/CuidadosHocicos";
import MetodoHocicos from "@/components/hocicos/MetodoHocicos";
import MoritaHocicos from "@/components/hocicos/MoritaHocicos";
import FaqHocicos from "@/components/hocicos/FaqHocicos";
import CierreHocicos from "@/components/hocicos/CierreHocicos";
import { registrarContacto, waVisita } from "@/components/hocicos/contacto";
import imgHero from "@/assets/hocicos/hocicos-hero.webp";

/**
 * Hocicos Canosos — cuidado para perros mayores.
 * Copy: Hocicos_Canosos_Landing_Copy.md. Tono: cálido, cercano y seguro;
 * nunca lástima, siempre gratitud por el viejito.
 * Estructura narrativa por capítulos, con animaciones al hacer scroll que
 * se desactivan si el usuario pidió reducir el movimiento.
 */
const HocicosCanosos = () => {
  // Al llegar desde otra ruta del sitio, empezar arriba y no donde quedó el scroll.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const [encabezadoSolido, setEncabezadoSolido] = useState(false);
  useMotionValueEvent(scrollY, "change", (valor) => setEncabezadoSolido(valor > window.innerHeight * 0.55));

  const origen = typeof window !== "undefined" ? window.location.origin : "https://maytepethotel.com";

  return (
    <MotionConfig reducedMotion="user">
      {/* overflow-x-clip: las entradas laterales arrancan desplazadas y no deben abrir scroll horizontal.
          Se usa clip y no hidden porque hidden rompe las columnas sticky de las secciones. */}
      <main className="min-h-screen overflow-x-clip bg-nube text-tinta">
        <Seo
          title="Hocicos Canosos — Cuidado para perros mayores | Mayte Pet Hotel"
          description="Cuidado especializado para perros mayores en Bogotá: sus medicinas a tiempo, sus paseos a su ritmo y una rutina tan parecida a la de casa que casi no notará que te fuiste."
          path="/hocicos-canosos"
          image={`${origen}${imgHero}`}
        />

        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary"
        />

        <header
          className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
            encabezadoSolido ? "bg-nube/95 shadow-sm backdrop-blur" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link
              to="/"
              className={`group inline-flex min-h-[44px] items-center gap-2 font-bold transition-colors ${
                encabezadoSolido ? "text-tinta hover:text-accent" : "text-white hover:text-white/80"
              }`}
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              Mayte Pet Hotel
            </Link>
            <a
              href={waVisita()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={registrarContacto("hocicos_encabezado")}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 ${
                encabezadoSolido
                  ? "bg-accent text-accent-foreground shadow-md hover:bg-accent/90"
                  : "border border-white/60 text-white hover:bg-white/10"
              }`}
            >
              Agenda una visita
            </a>
          </div>
        </header>

        <HeroHocicos />
        <FranjaCuidados />
        <EmpatiaHocicos />
        <ContrasteHocicos />
        <CuidadosHocicos />
        <MetodoHocicos />
        <MoritaHocicos />
        <FaqHocicos />
        <CierreHocicos />

        <Footer />
        <WhatsAppButton />
      </main>
    </MotionConfig>
  );
};

export default HocicosCanosos;
