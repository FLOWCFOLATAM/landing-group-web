"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

/* Bloque 03 — SOLUCIONES: Merch corporativo y Eventos & BTL. La
   Personalización vive en «Cómo lo hacemos» (decisión de Landing, 30-sep). */
const SURFACE = [
  { bg: "color-mix(in srgb, var(--brand-accent) 8%, var(--brand-white))", accent: "var(--brand-accent)" },
  { bg: "color-mix(in srgb, var(--brand-sand) 45%, var(--brand-white))", accent: "var(--brand-ink)" },
] as const;

export default function Solutions() {
  const content = useContent();
  const { label, title, intro, items } = content.solutions;

  return (
    <section id="soluciones" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
        <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end">
          <h2 className="display max-w-2xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">{title}</h2>
          <p className="max-w-md text-[15px] leading-[1.6] text-ink/70 lg:justify-self-end">{intro}</p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {items.map((item, i) => {
          const surface = SURFACE[i % SURFACE.length];
          return (
            <Reveal key={item.slug} className={`reveal-clip ${i === 0 ? "reveal-left" : "reveal-right"}`} delay={i * 120}>
              <Link
                href={`/soluciones/${item.slug}/`}
                data-cta="solucion"
                data-cta-location={`home-${item.slug}`}
                className="block h-full rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <TiltCard className="group h-full" max={4}>
                  <article
                    className="relative flex h-full flex-col overflow-hidden rounded-card"
                    style={{ background: surface.bg }}
                  >
                    <span className="glare" aria-hidden />
                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                      <Image
                        src={item.photo}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 92vw, 580px"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 sm:p-9">
                      <span
                        className="text-[12px] uppercase tracking-[0.2em] [font-weight:600]"
                        style={{ color: surface.accent }}
                      >
                        Solución {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display mt-3 text-[clamp(2.2rem,3.6vw,3rem)] leading-[0.92]">{item.name}</h3>
                      <p className="display mt-2 text-[clamp(1.15rem,1.6vw,1.4rem)] leading-[1.05] text-accent">
                        {item.promise}
                      </p>
                      <p className="mt-4 max-w-md text-[15px] leading-[1.55] text-ink/75">{item.body}</p>
                      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Incluye">
                        {item.includes.slice(0, 3).map((inc) => (
                          <li
                            key={inc.title}
                            className="rounded-button border border-line bg-white/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-ink/70 [font-weight:600]"
                          >
                            {inc.title}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]">
                        Ver solución
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">
                          →
                        </span>
                      </span>
                    </div>
                  </article>
                </TiltCard>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
