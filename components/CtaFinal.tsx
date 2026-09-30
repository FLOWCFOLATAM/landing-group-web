"use client";

import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import MarkerStroke from "./MarkerStroke";
import ContactOptions from "./ContactOptions";

/* Bloque 08 — CTA FINAL: mensaje comercial + contacto directo (WhatsApp y
   correo comercial, sin formularios).
   Cierre en Deep Ink con subrayado sand (espejo de la última página del
   brand book); el fondo es el asset 25 del banco bajo velo de tinta. */
export default function CtaFinal() {
  const content = useContent();
  const { cta, contact } = content;

  return (
    <section id="contacto" className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 pb-28 pt-8 sm:px-8">
      <Reveal className="reveal-scale">
        <div className="relative overflow-hidden rounded-card bg-ink px-5 py-20 text-center text-paper sm:px-16 sm:py-28">
          <Image src={assetPath("/brand/cta-bg.webp")} alt="" fill sizes="1200px" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-ink/60" aria-hidden />
          <div className="relative z-[1]">
            <h2 className="display mx-auto max-w-4xl text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.92]">
              <SplitWords text={cta.title} step={70} />
            </h2>
            <MarkerStroke
              shape="underline"
              auto
              beat={500}
              className="mx-auto mt-4 h-[12px] w-[min(420px,70vw)] text-sand"
            />
            <p className="mx-auto mt-8 max-w-lg text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.5] text-paper/85">
              {cta.body}
            </p>
            {/* Contacto directo: WhatsApp y correo comercial */}
            <ContactOptions location="cierre" tone="dark" className="mx-auto mt-11 max-w-3xl" />
            <p className="mt-6 text-[13px] text-paper/75">{contact.response}</p>
            {(contact.instagram || contact.linkedin) && (
              <p className="mt-2 flex flex-wrap items-center justify-center gap-x-6 text-[14px] text-paper/80">
                {[
                  { label: "Instagram", href: contact.instagram },
                  { label: "LinkedIn", href: contact.linkedin },
                ]
                  .filter((s) => s.href)
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-[44px] items-center underline decoration-paper/30 underline-offset-4 transition-colors hover:text-sand hover:decoration-sand"
                    >
                      {s.label}
                    </a>
                  ))}
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
