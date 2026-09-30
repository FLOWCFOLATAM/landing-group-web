"use client";

import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import MarkerStroke from "./MarkerStroke";
import PlateReveal from "./PlateReveal";
import BrandStar from "./BrandStar";
import SmartLink from "./SmartLink";
import PrimaryCta from "./PrimaryCta";

/* /como-lo-hacemos — los diferenciales en profundidad (diagnóstico UX §6):
   Personalización (técnica; se movió aquí desde Soluciones a pedido de
   Landing, 30-sep), Producción bajo control (ejecución), Logística y
   entregas (operación) y Acompañamiento (servicio). Conservan el contenido
   de las antiguas páginas: se reubicaron, no se eliminaron. Un diferencial
   sin detalle (frase principal vacía en el CMS) solo se enlaza. */
export default function HowWeWorkPage() {
  const content = useContent();
  const { label, pageTitle, pageIntro, items } = content.howWeWork;
  const detailed = items.filter((i) => i.detail.claim.trim());
  const linked = items.filter((i) => !i.detail.claim.trim());

  return (
    <main className="telon-main">
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-12 pt-32 sm:px-8">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
        </Reveal>
        <h1 className="display mt-4 max-w-3xl text-[clamp(2.8rem,6.5vw,5.4rem)] leading-[0.92]">
          <SplitWords text={pageTitle} step={70} />
        </h1>
        <MarkerStroke shape="underline" auto beat={500} className="mt-2 h-[10px] w-[min(280px,55vw)] text-sage" />
        <Reveal delay={250}>
          <p className="mt-6 max-w-2xl text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-ink/70">{pageIntro}</p>
          <nav aria-label="Secciones" className="mt-8 flex flex-wrap gap-3">
            {[...detailed, ...linked].map((i) => (
              <SmartLink
                key={i.id}
                href={i.detail.claim.trim() ? `#${i.id}` : i.href}
                className="inline-flex min-h-[44px] items-center rounded-button border border-line bg-white px-4 text-[12px] uppercase tracking-[0.14em] text-ink/75 transition-colors [font-weight:600] hover:border-accent hover:text-accent"
              >
                {i.name}
              </SmartLink>
            ))}
          </nav>
        </Reveal>
      </section>

      {detailed.map((item, idx) => (
        <section key={item.id} id={item.id} className="scroll-mt-24 border-t border-line py-20">
          <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:items-start">
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <Reveal>
                <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
                  Diferencial de {item.role.toLowerCase()}
                </p>
                <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] leading-[0.92]">{item.name}</h2>
                <p className="display mt-3 text-[clamp(1.3rem,2.2vw,1.8rem)] leading-[1] text-accent">
                  {item.detail.claim}
                </p>
                <p className="mt-5 text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.6] text-ink/75">{item.detail.intro}</p>
              </Reveal>
              <ul className="mt-8 space-y-3">
                {item.detail.bullets.map((b, i) => (
                  <li key={b}>
                    <Reveal delay={i * 70}>
                      <div className="flex items-start gap-4 rounded-card bg-white p-5 shadow-lift">
                        <BrandStar auto className="mt-0.5 w-5 shrink-0" />
                        <p className="text-[15px] leading-[1.55] text-ink/80">{b}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-1 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-card sm:col-span-2 lg:col-span-1">
                <Image src={item.photo} alt="" fill sizes="(max-width: 1024px) 92vw, 560px" className="object-cover" />
              </div>
              {item.detail.gallery.map((g, i) => (
                <figure key={g.src}>
                  <PlateReveal beat={i * 120} className="relative aspect-[4/3] rounded-card bg-white shadow-lift">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      fill
                      sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 560px"
                      className="plate-img object-contain p-6"
                    />
                  </PlateReveal>
                  <figcaption className="mt-2 px-1 text-[12px] tracking-[0.03em] text-ink/65">{g.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Diferenciales sin detalle (si los hay) + enlace al proceso */}
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-10 pt-4 sm:px-8">
        <div className={`grid gap-4 ${linked.length ? "sm:grid-cols-2" : ""}`}>
          {linked.map((item) => (
            <Reveal key={item.id}>
              <SmartLink
                href={item.href}
                className="group flex h-full min-h-[44px] items-center justify-between gap-6 rounded-card bg-white p-6 shadow-lift transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <span>
                  <span className="block text-[11px] uppercase tracking-[0.16em] text-accent [font-weight:600]">
                    {item.role}
                  </span>
                  <span className="display mt-1 block text-[clamp(1.6rem,2.4vw,2rem)] leading-[0.95]">{item.name}</span>
                  <span className="mt-1 block text-[14px] text-ink/70">{item.body}</span>
                </span>
                <span aria-hidden className="text-xl text-accent transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </SmartLink>
            </Reveal>
          ))}
          <Reveal delay={100}>
            <SmartLink
              href="/#proceso"
              className="group flex h-full min-h-[44px] items-center justify-between gap-6 rounded-card border border-line bg-paper p-6 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-accent [font-weight:600]">
                  {content.process.label}
                </span>
                <span className="display mt-1 block text-[clamp(1.6rem,2.4vw,2rem)] leading-[0.95]">
                  {content.process.title}
                </span>
                <span className="mt-1 block text-[14px] text-ink/70">
                  {content.process.steps.map((s) => s.title).join(" → ")}
                </span>
              </span>
              <span aria-hidden className="text-xl text-accent transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </SmartLink>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-10 sm:px-8">
        <Reveal className="reveal-scale">
          <div className="rounded-card bg-accent px-8 py-14 text-center text-accent-ink sm:px-14">
            <h2 className="display mx-auto max-w-2xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.95]">
              {content.cta.title}
            </h2>
            <div className="mt-8">
              <PrimaryCta variant="light" location="como-lo-hacemos" magnetic={0.4} />
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
