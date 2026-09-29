"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import SmartLink from "./SmartLink";

/* Bloque 04 — DIFERENCIALES ("Cómo lo hacemos"): Personalización,
   Producción bajo control, Logística y entregas, Acompañamiento. Dejan de
   ser servicios al mismo nivel y pasan a sostener las dos soluciones
   (diagnóstico UX §6). Cada tarjeta completa enlaza a su detalle. */
export default function HowWeWork() {
  const content = useContent();
  const { label, title, intro, items } = content.howWeWork;

  return (
    <section
      id="como-lo-hacemos"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <Reveal>
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <h2 className="display max-w-2xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">{title}</h2>
          <p className="max-w-md text-[15px] leading-[1.6] text-ink/70 lg:justify-self-end">{intro}</p>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} className="h-full">
            <Reveal delay={(i % 4) * 90} className="h-full">
              <SmartLink
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-card bg-white shadow-lift transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden">
                  <Image
                    src={item.photo}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 280px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
                    {item.role}
                  </span>
                  <h3 className="display mt-3 text-[clamp(1.5rem,2vw,1.8rem)] leading-[0.95]">{item.name}</h3>
                  <p className="mt-3 text-[14px] leading-[1.5] text-ink/70">{item.body}</p>
                  <span
                    aria-hidden
                    className="mt-auto pt-5 text-lg text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </div>
              </SmartLink>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal delay={200}>
        <Link
          href="/como-lo-hacemos/"
          className="group mt-8 inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
        >
          Ver cómo lo hacemos
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
            →
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
