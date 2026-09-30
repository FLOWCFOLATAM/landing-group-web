"use client";

import { useContent } from "@/components/ContentProvider";
import { mailtoHref, whatsappHref } from "@/brand/content";
import { MailIcon, WhatsAppIcon } from "./BrandIcons";

/* Los dos canales de contacto directo (decisión de Landing, 29-sep-2026):
   WhatsApp y correo comercial. Sin formularios ni agenda. Número, correo y
   mensaje prellenado se editan en el CMS (contact). `location` queda como
   data-atributo para medir clics por ubicación en la fase de analítica. */
export default function ContactOptions({
  location,
  tone = "light",
  className = "",
}: {
  location: string;
  /* light: sobre papel/blanco · dark: sobre tinta o verde */
  tone?: "light" | "dark";
  className?: string;
}) {
  const { contact } = useContent();
  const wa = whatsappHref(contact);
  const dark = tone === "dark";

  const secondary = dark
    ? "border border-paper/35 bg-paper/5 text-paper hover:border-sand hover:bg-paper/10"
    : "border border-line bg-white text-ink hover:border-accent";
  const secondarySub = dark ? "text-paper/75" : "text-ink/65";

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          data-cta="whatsapp"
          data-cta-location={location}
          className="group flex min-h-[72px] items-center gap-3 rounded-card bg-accent px-4 py-4 sm:gap-4 sm:px-6 text-left text-accent-ink transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/15">
            <WhatsAppIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] uppercase tracking-[0.16em] [font-weight:600]">WhatsApp</span>
            <span className="mt-0.5 block text-[16px] [font-weight:500]">Escríbenos por chat</span>
          </span>
          <span aria-hidden className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1 max-[380px]:hidden">→</span>
        </a>
      )}
      {contact.email && (
        <a
          href={mailtoHref(contact)}
          data-cta="correo"
          data-cta-location={location}
          className={`group flex min-h-[72px] items-center gap-3 rounded-card px-4 py-4 sm:gap-4 sm:px-6 text-left transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${secondary}`}
        >
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${dark ? "bg-paper/10" : "bg-accent/[0.08] text-accent"}`}>
            <MailIcon className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] uppercase tracking-[0.16em] [font-weight:600]">Correo</span>
            <span className={`mt-0.5 block whitespace-nowrap text-[13px] [font-weight:500] min-[400px]:text-[14px] sm:text-[15px] ${secondarySub}`}>
              {contact.email}
            </span>
          </span>
          <span aria-hidden className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1 max-[380px]:hidden">→</span>
        </a>
      )}
    </div>
  );
}
