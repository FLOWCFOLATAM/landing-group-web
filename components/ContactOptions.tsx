"use client";

import { useContent } from "@/components/ContentProvider";
import { mailtoHref, whatsappDisplay, whatsappHref } from "@/brand/content";

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
            <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.5-4.4a8.4 8.4 0 1 1 15.5-4.5Z" />
              <path d="M9 8.6c.2-.5.9-.6 1.2-.1l.7 1.3c.2.3.1.7-.2 1l-.5.4a5.6 5.6 0 0 0 2.6 2.6l.4-.5c.3-.3.7-.4 1-.2l1.3.7c.5.3.4 1-.1 1.2-.9.5-2 .6-3.1-.1a8.2 8.2 0 0 1-3.3-3.3c-.6-1-.5-2.2 0-3Z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] uppercase tracking-[0.16em] [font-weight:600]">WhatsApp</span>
            <span className="mt-0.5 block text-[16px] [font-weight:500]">{whatsappDisplay(contact)}</span>
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
            <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3.5 6h17v12h-17Z" />
              <path d="m3.5 7 8.5 6.5L20.5 7" />
            </svg>
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
