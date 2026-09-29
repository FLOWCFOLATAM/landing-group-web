"use client";

import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import Reveal from "./Reveal";

export default function Stats() {
  const content = useContent();
  const { label, title, intro, items } = content.stats;
  /* Bloque 07 — OPERACIÓN: prueba de capacidad junto al argumento comercial. */
  return (
    <section id="operacion" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal className="reveal-scale">
        <div className="relative overflow-hidden rounded-card bg-accent px-7 py-14 text-paper shadow-lift sm:px-12 sm:py-16">
          <Image
            src={assetPath("/brand/texture-green.webp")}
            alt=""
            fill
            sizes="1200px"
            className="object-cover opacity-55"
          />
          <Image
            src={assetPath("/brand/overlay-grid.webp")}
            alt=""
            fill
            sizes="1200px"
            className="object-cover opacity-20"
          />
          <div className="relative z-[1] text-center">
            <p className="text-[12px] uppercase tracking-[0.2em] text-sand [font-weight:600]">{label}</p>
            <h2 className="display mx-auto mt-4 max-w-2xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[clamp(1rem,1.4vw,1.1rem)] leading-[1.55] text-paper/85">
              {intro}
            </p>

            <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-paper/20 bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item) => (
                <article
                  key={item.value}
                  className="flex min-h-[190px] flex-col items-center justify-center bg-accent/80 p-6 text-center backdrop-blur-sm sm:p-7"
                >
                  <p className="display text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[0.92] text-sand">
                    {item.value}
                  </p>
                  <p className="mx-auto mt-7 max-w-[15rem] text-[14px] leading-[1.45] tracking-[0.02em] text-paper/78">
                    {item.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
