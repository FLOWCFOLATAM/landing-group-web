"use client";

import Image from "next/image";
import type { WorkItem } from "@/brand/content";
import PlateReveal from "./PlateReveal";

/* Galería de piezas producidas (se mantiene: es una fortaleza del sitio).
   Rótulo permanente marca/pieza; al hover, zoom del producto y panel con
   la descripción. La descripción también existe para lectores de pantalla. */
export default function WorkGallery({ items }: { items: WorkItem[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((work, i) => (
        <li key={`${work.src}-${i}`}>
          <figure className="group transition-transform duration-500 hover:-translate-y-1.5">
            <PlateReveal beat={(i % 5) * 90} className="relative aspect-[9/10] rounded-card bg-white shadow-lift">
              <div className="absolute inset-0 bottom-12 transition-transform duration-700 ease-out group-hover:scale-[1.16]">
                <Image
                  src={work.src}
                  alt={`${work.piece} producido para ${work.brand}`}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
                  className="plate-img object-contain p-5"
                />
              </div>

              <figcaption className="absolute inset-x-0 bottom-0 z-[1] px-4 pb-3.5 transition-opacity duration-300 group-hover:opacity-0">
                <span className="display block text-[15px] leading-none text-ink">{work.brand}</span>
                <span className="mt-0.5 block text-[11px] tracking-[0.03em] text-ink/65 [font-weight:450]">
                  {work.piece}
                </span>
                <span className="sr-only">{work.desc}</span>
              </figcaption>

              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 z-[2] translate-y-full bg-ink/[0.92] p-4 text-paper transition-transform duration-500 ease-out group-hover:translate-y-0"
              >
                <span className="display block text-[15px] leading-none">
                  {work.brand} · {work.piece}
                </span>
                <p className="mt-2 text-[11.5px] leading-[1.45] tracking-[0.01em] text-paper/80">{work.desc}</p>
              </div>
            </PlateReveal>
          </figure>
        </li>
      ))}
    </ul>
  );
}
