import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Solutions from "@/components/Solutions";
import HowWeWork from "@/components/HowWeWork";
import Cases from "@/components/Cases";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

/* Home en 9 bloques, en el orden exacto del diagnóstico UX (28-09-2026):
   01 Header · 02 Hero · 03 Soluciones · 04 Diferenciales · 05 Trabajos/casos
   · 06 Proceso · 07 Operación · 08 CTA final · 09 Footer. */
export default async function Home() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <main className="telon-main">
        <Hero />
        {/* pliego-cover: este bloque sube y cubre el hero fijado; la cinta
            es el cierre visual del hero, no un bloque de contenido. */}
        <div className="pliego-cover">
          <Marquee />
          <Solutions />
          <HowWeWork />
          <Cases />
          <Process />
          <Stats />
          <CtaFinal />
        </div>
      </main>
      <Footer />
    </ContentProvider>
  );
}
