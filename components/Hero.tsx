"use client";

import { useContent } from "@/components/ContentProvider";
import HeroHeadline from "./HeroHeadline";
import HeroTiles from "./HeroTiles";
import MarkerStroke from "./MarkerStroke";
import BrandStar from "./BrandStar";
import PrimaryCta from "./PrimaryCta";

/* Hero fijado ("el pliego cede"), bloque 02 de la home: titular, firma,
   descripción y UN solo CTA; tiles grandes a la derecha. */
export default function Hero() {
  const content = useContent();
  return (
    <section id="hero" className="pliego-hero">
      <div className="pliego-scale flex h-full flex-col justify-center">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-x-10 gap-y-8 px-5 pb-14 pt-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-0 lg:pt-6">
          <div className="relative lg:col-span-2">
            <BrandStar className="star-pop absolute top-4 right-[11%] hidden w-10 sm:block [--beat:1700ms]" />
            <h1 className="display text-[clamp(3.2rem,9vw,7.6rem)] leading-[0.9]">
              <HeroHeadline />
            </h1>
            <p className="script-wipe mt-3 font-script text-[clamp(1.5rem,2.6vw,2.1rem)] leading-none text-accent [--beat:700ms]">
              {content.hero.script}
            </p>
            <MarkerStroke
              shape="underline"
              className="choreo-draw mt-1 h-[10px] w-[min(320px,60vw)] text-sage"
              beat={1350}
            />
          </div>

          <div>
            <p
              data-choreo
              className="max-w-md text-[clamp(1.02rem,1.5vw,1.25rem)] leading-[1.5] text-ink/70 [--beat:850ms]"
            >
              {content.hero.sub}
            </p>

            {/* Un solo CTA (diagnóstico UX §8): el mismo del header y del cierre. */}
            <div className="mt-7">
              <span data-choreo className="inline-block [--beat:950ms]">
                <PrimaryCta variant="solid" location="hero" magnetic={0.35} />
              </span>
            </div>
          </div>

          <HeroTiles />
        </div>
      </div>

      {/* Velo de tinta: el hero queda en sombra bajo el pliego que lo cubre */}
      <div className="pliego-veil" aria-hidden />
    </section>
  );
}
