"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import { casesBySlug, principalSolutions } from "@/brand/content";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import MarkerStroke from "./MarkerStroke";
import SmartLink from "./SmartLink";
import IncludeIcon from "./IncludeIcon";
import CaseCard from "./CaseCard";
import PrimaryCta from "./PrimaryCta";

/* Plantilla común de las páginas de SOLUCIÓN (diagnóstico UX §5):
   Hero · Qué resuelve · Qué incluye · Cómo lo hacemos · Piezas y casos
   reales · CTA · Otras soluciones. La página servidor valida el slug. */
const H2 = "text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]";

export default function SolutionDetail({ slug }: { slug: string }) {
  const content = useContent();
  const item = content.solutions.items.find((s) => s.slug === slug);
  if (!item) return null;
  const isCapacity = item.tier === "capacidad";
  const cases = casesBySlug(content, item.cases).slice(0, 4);
  const others = content.solutions.items.filter((s) => s.slug !== slug);
  const principals = principalSolutions(content);

  return (
    <main className="telon-main">
      {/* 1 · Hero: nombre + promesa + imagen + CTA */}
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 pt-24 sm:px-8">
        <Reveal>
          <SmartLink
            href="/#soluciones"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-accent [font-weight:600]"
          >
            <span aria-hidden className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Soluciones
          </SmartLink>
        </Reveal>
        <div className="relative mt-4 min-h-[420px] overflow-hidden rounded-card sm:min-h-[480px]">
          <Image src={item.photo} alt="" fill priority sizes="(max-width: 1200px) 100vw, 1140px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-ink/10" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-7 text-paper sm:p-12">
            <p className="text-[12px] uppercase tracking-[0.2em] text-sand [font-weight:600]">
              {isCapacity ? "Capacidad transversal" : "Solución"}
            </p>
            <h1 className="display mt-3 max-w-3xl text-[clamp(2.8rem,7vw,5.6rem)] leading-[0.92]">
              <SplitWords text={item.name} step={70} />
            </h1>
            <p className="display mt-3 max-w-2xl text-[clamp(1.3rem,2.4vw,2rem)] leading-[1] text-paper/90">
              {item.promise}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCta variant="solid" location={`solucion-${item.slug}`} magnetic={0.35} />
              {isCapacity && (
                <p className="text-[13px] leading-[1.5] text-paper/85">
                  Potencia{" "}
                  {principals.map((p, i) => (
                    <span key={p.slug}>
                      {i > 0 && " y "}
                      <Link
                        href={`/soluciones/${p.slug}/`}
                        className="underline decoration-paper/40 underline-offset-4 hover:text-sand hover:decoration-sand"
                      >
                        {p.name}
                      </Link>
                    </span>
                  ))}
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2 · Qué resuelve: 2–3 líneas centradas en la necesidad del cliente */}
      <section id="resuelve" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 pb-20 pt-4 text-center sm:px-8">
        <Reveal>
          <h2 className={H2}>Qué resuelve</h2>
          <p className="mx-auto mt-5 max-w-3xl text-[clamp(1.3rem,2.2vw,1.75rem)] leading-[1.45] text-ink/85">
            {item.solves}
          </p>
          <MarkerStroke shape="underline" auto beat={300} className="mx-auto mt-5 h-[10px] w-[min(220px,50vw)] text-sage" />
        </Reveal>
      </section>

      {/* 3 · Qué incluye: 3–5 elementos con ícono y texto corto */}
      <section id="incluye" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 pb-20 sm:px-8">
        <Reveal>
          <h2 className={H2}>Qué incluye</h2>
        </Reveal>
        <ul className={`mt-8 grid gap-4 sm:grid-cols-2 ${item.includes.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {item.includes.map((inc, i) => (
            <li key={inc.title} className="h-full">
              <Reveal delay={(i % 4) * 90} className="h-full">
                <div className="flex h-full flex-col rounded-card bg-white p-6 shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-accent-ink">
                    <IncludeIcon name={inc.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="display mt-5 text-[clamp(1.35rem,1.8vw,1.6rem)] leading-[0.95]">{inc.title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.5] text-ink/70">{inc.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 · Cómo lo hacemos: la solución conectada a los diferenciales */}
      <section id="como" className="relative scroll-mt-24 overflow-hidden bg-sand/40 py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
          <Reveal>
            <h2 className={H2}>Cómo lo hacemos</h2>
            <p className="display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.2rem)] leading-[0.95]">
              Detrás de cada {isCapacity ? "aplicación" : "entrega"}.
            </p>
          </Reveal>
          <ul className={`mt-10 grid gap-4 sm:grid-cols-2 ${item.how.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {item.how.map((h, i) => (
              <li key={h.title} className="h-full">
                <Reveal delay={(i % 4) * 90} className="h-full">
                  <SmartLink
                    href={h.href}
                    className="group flex h-full flex-col rounded-card bg-white p-6 shadow-lift transition-transform duration-500 hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    <h3 className="display text-[clamp(1.35rem,1.8vw,1.6rem)] leading-[0.95]">{h.title}</h3>
                    <p className="mt-3 text-[14px] leading-[1.5] text-ink/70">{h.text}</p>
                    <span
                      aria-hidden
                      className="mt-auto pt-5 text-lg text-accent transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </SmartLink>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Piezas y casos reales: 2–4 ejemplos relevantes */}
      {cases.length > 0 && (
        <section id="casos" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8">
          <Reveal>
            <h2 className={H2}>Piezas y casos reales</h2>
          </Reveal>
          <ul className={`mt-8 grid gap-4 sm:grid-cols-2 ${cases.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {cases.map((c, i) => (
              <li key={c.slug} className="h-full">
                <Reveal delay={(i % 4) * 90} className="h-full">
                  <CaseCard item={c} index={i} />
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 6 · CTA */}
      <section id="cierre" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 pb-20 sm:px-8">
        <Reveal className="reveal-scale">
          <div className="rounded-card bg-accent px-8 py-14 text-center text-accent-ink sm:px-14">
            <h2 className="display mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
              Cuéntanos qué necesitas.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.55] text-accent-ink/85">
              {content.cta.body}
            </p>
            <div className="mt-8">
              <PrimaryCta variant="light" location={`solucion-${item.slug}-cierre`} magnetic={0.4} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* 7 · Otras soluciones */}
      <section id="otras" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 pb-24 sm:px-8">
        <Reveal>
          <h2 className={H2}>Otras soluciones</h2>
        </Reveal>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {others.map((o, i) => (
            <li key={o.slug}>
              <Reveal delay={i * 90}>
                <Link
                  href={`/soluciones/${o.slug}/`}
                  className="group flex min-h-[44px] items-center justify-between gap-6 rounded-card border border-line bg-white px-6 py-5 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span>
                    <span className="block text-[11px] uppercase tracking-[0.16em] text-ink/60 [font-weight:600]">
                      {o.tier === "capacidad" ? "Capacidad transversal" : "Solución"}
                    </span>
                    <span className="display mt-1 block text-[clamp(1.5rem,2.2vw,1.9rem)] leading-[0.95]">{o.name}</span>
                    <span className="mt-1 block text-[14px] text-ink/70">{o.promise}</span>
                  </span>
                  <span aria-hidden className="text-xl text-accent transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
