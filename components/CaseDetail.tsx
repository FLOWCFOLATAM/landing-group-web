"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import MarkerStroke from "./MarkerStroke";
import PlateReveal from "./PlateReveal";
import BrandStar from "./BrandStar";
import CaseCard from "./CaseCard";
import PrimaryCta from "./PrimaryCta";

/* Ficha breve de caso (diagnóstico UX §7): para quién, qué necesitaba,
   qué hizo Landing y cómo lo ejecutó. La página servidor valida el slug. */
export default function CaseDetail({ slug }: { slug: string }) {
  const content = useContent();
  const items = content.cases.items;
  const index = items.findIndex((c) => c.slug === slug);
  const item = items[index];
  if (!item) return null;
  const solution = content.solutions.items.find((s) => s.slug === item.solution);
  /* los 3 siguientes en la lista (circular), para seguir recorriendo */
  const others = [1, 2, 3].map((k) => items[(index + k) % items.length]).filter((c) => c.slug !== slug);

  const rows: { term: string; value: ReactNode }[] = [
    { term: "Para quién", value: `${item.brand} · ${item.category}` },
    { term: "Qué necesitaba", value: item.need },
    { term: "Qué hicimos", value: item.answer },
    {
      term: "Cómo lo ejecutamos",
      value: (
        <ul className="space-y-2">
          {item.execution.map((step) => (
            <li key={step} className="flex items-start gap-3">
              <BrandStar className="mt-1 w-4 shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      ),
    },
    { term: "Piezas", value: item.pieces },
  ];

  return (
    <main className="telon-main">
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-28 sm:px-8">
        <Reveal>
          <Link
            href="/trabajos/"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Trabajos
          </Link>
          <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{item.category}</p>
        </Reveal>
        <h1 className="display mt-3 text-[clamp(3rem,8vw,6.4rem)] leading-[0.9]">
          <SplitWords text={item.brand} step={70} />
        </h1>
        <p className="display mt-2 max-w-3xl text-[clamp(1.4rem,2.6vw,2.2rem)] leading-[1] text-ink/75">{item.title}</p>
        <MarkerStroke shape="underline" auto beat={450} className="mt-2 h-[10px] w-[min(280px,55vw)] text-sage" />
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <dl className="divide-y divide-line rounded-card bg-white p-7 shadow-lift sm:p-9">
            {rows.map((row) => (
              <div key={row.term} className="grid gap-2 py-5 first:pt-0 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">{row.term}</dt>
                <dd className="text-[15px] leading-[1.55] text-ink/80">{row.value}</dd>
              </div>
            ))}
            {solution && (
              <div className="grid gap-2 py-5 last:pb-0 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">Solución</dt>
                <dd>
                  <Link
                    href={`/soluciones/${solution.slug}/`}
                    className="group inline-flex min-h-[44px] items-center gap-2 text-[13px] uppercase tracking-[0.14em] text-accent [font-weight:600]"
                  >
                    {solution.name}
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </dd>
              </div>
            )}
          </dl>
        </Reveal>

        <div className={`grid gap-4 ${item.gallery.length > 1 ? "sm:grid-cols-2 lg:grid-cols-1" : ""}`}>
          {item.gallery.map((g, i) => (
            <PlateReveal key={g.src} beat={i * 120} className="relative aspect-[4/3] rounded-card bg-white shadow-lift">
              <div className="absolute inset-0 scale-[1.3]">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 92vw, 640px"
                  className="plate-img object-contain"
                />
              </div>
            </PlateReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-20 sm:px-8">
        <Reveal className="reveal-scale">
          <div className="rounded-card bg-accent px-8 py-14 text-center text-accent-ink sm:px-14">
            <h2 className="display mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
              ¿Lo aterrizamos para tu marca?
            </h2>
            <div className="mt-8">
              <PrimaryCta variant="light" location={`caso-${slug}`} magnetic={0.4} />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 sm:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">Otros proyectos</h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((other, i) => (
            <li key={other.slug} className="h-full">
              <Reveal delay={i * 90} className="h-full">
                <CaseCard item={other} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
