"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import { HOME_CASES } from "@/brand/content";
import Reveal from "./Reveal";
import CaseCard from "./CaseCard";
import WorkGallery from "./WorkGallery";
import PrimaryCta from "./PrimaryCta";

/* Textura de papel compartida por la sección de casos y /trabajos. */
function PaperTexture() {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-55"
      style={{ backgroundImage: `url("${assetPath("/brand/texture-paper.webp")}")` }}
      aria-hidden
    />
  );
}

/* Bloque 05 de la home — TRABAJOS / CASOS: los primeros HOME_CASES casos
   con contexto (marca → necesidad → solución → imagen → Ver proyecto). */
export default function Cases() {
  const content = useContent();
  const { label, title, intro, items } = content.cases;

  return (
    <section id="trabajos" className="relative scroll-mt-24 overflow-hidden py-24">
      <PaperTexture />
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="display max-w-3xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">{title}</h2>
            <p className="max-w-md text-[15px] leading-[1.6] text-ink/70 lg:justify-self-end">{intro}</p>
          </div>
        </Reveal>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, HOME_CASES).map((item, i) => (
            <li key={item.slug} className="h-full">
              <Reveal delay={(i % 3) * 90} className="h-full">
                <CaseCard item={item} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/trabajos/"
              className="group inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
            >
              Ver todos los trabajos ({items.length} casos · {content.works.items.length} piezas)
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
            <PrimaryCta variant="solid" location="casos-home" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Cuerpo de /trabajos: todos los casos + galería completa de piezas. */
export function WorksPageBody() {
  const content = useContent();
  const { label, title, intro, items } = content.cases;

  return (
    <main className="telon-main">
      <section className="relative overflow-hidden pb-24 pt-32">
        <PaperTexture />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
            <h1 className="display mt-4 max-w-3xl text-[clamp(2.8rem,6.5vw,5.4rem)] leading-[0.92]">{title}</h1>
            <p className="mt-6 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-ink/70">{intro}</p>
          </Reveal>

          <h2 className="mt-16 text-[12px] uppercase tracking-[0.2em] text-ink/70 [font-weight:600]">
            Casos · {items.length}
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <li key={item.slug} className="h-full">
                <Reveal delay={(i % 3) * 90} className="h-full">
                  <CaseCard item={item} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">{content.works.label}</h2>
        </Reveal>
        <div className="mt-8">
          <WorkGallery items={content.works.items} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 sm:px-8">
        <Reveal className="reveal-scale">
          <div className="rounded-card bg-accent px-8 py-14 text-center text-accent-ink sm:px-14">
            <h2 className="display mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
              ¿Lo aterrizamos para tu marca?
            </h2>
            <div className="mt-8">
              <PrimaryCta variant="light" location="trabajos" magnetic={0.4} />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
