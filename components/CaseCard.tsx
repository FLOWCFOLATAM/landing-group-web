"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseItem } from "@/brand/content";
import PlateReveal from "./PlateReveal";

/* Tarjeta de caso (diagnóstico UX §7): de "producto mostrado" a "proyecto
   demostrado". Orden literal de la card recomendada:
   Marca → necesidad/ocasión → solución → imagen → Ver proyecto.
   La tarjeta completa es el enlace a la ficha del caso. */
export default function CaseCard({
  item,
  index = 0,
  headingLevel = "h3",
}: {
  item: CaseItem;
  index?: number;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <Link
      href={`/trabajos/${item.slug}/`}
      data-cta="caso"
      data-cta-location={item.slug}
      className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-lift transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {/* Marca */}
      <div className="flex items-start justify-between gap-3 px-6 pt-6">
        <Heading className="display text-[clamp(1.6rem,2.2vw,1.95rem)] leading-[0.95] text-ink">{item.brand}</Heading>
        <span className="mt-1 shrink-0 rounded-button bg-accent/[0.08] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.12em] text-accent [font-weight:600]">
          {item.category}
        </span>
      </div>

      <dl className="px-6 pb-5 pt-4 text-[14px] leading-[1.5]">
        {/* Necesidad / ocasión */}
        <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">Qué necesitaba</dt>
        <dd className="mt-1 line-clamp-3 text-ink/80">{item.need}</dd>
        {/* Solución */}
        <dt className="mt-3 text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">Qué hicimos</dt>
        <dd className="mt-1 line-clamp-3 text-ink/80">{item.answer}</dd>
      </dl>

      {/* Imagen */}
      <PlateReveal beat={(index % 3) * 90} className="relative mx-6 mt-auto aspect-[4/3] overflow-hidden rounded-[16px] bg-white">
        {/* las fotos del catálogo traen marco gris: se encuadra al producto */}
        <div className="absolute inset-0 scale-[1.34] transition-transform duration-700 group-hover:scale-[1.42]">
          <Image
            src={item.cover}
            alt={`${item.brand}: ${item.pieces}`}
            fill
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 340px"
            className="plate-img object-contain"
          />
        </div>
      </PlateReveal>

      {/* Ver proyecto */}
      <span className="flex items-center justify-between px-6 pb-6 pt-5 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]">
        Ver proyecto
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
          →
        </span>
      </span>
    </Link>
  );
}
