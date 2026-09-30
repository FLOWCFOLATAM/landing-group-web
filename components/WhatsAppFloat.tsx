"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { whatsappHref } from "@/brand/content";
import { WHATSAPP_GREEN, WhatsAppIcon } from "./BrandIcons";

/* Globito flotante de WhatsApp (abajo a la derecha, en todas las páginas).
   EN ESPERA: no está montado todavía (pedido de Hugo, 29-sep-2026); se
   activa desde components/Nav.tsx.
   Aparece después de la partitura de carga para no competir con el hero;
   al hover muestra la etiqueta. Si no hay número en el CMS, no se muestra. */
export default function WhatsAppFloat() {
  const { contact } = useContent();
  const href = whatsappHref(contact);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShown(true), reduce ? 0 : 1600);
    return () => clearTimeout(t);
  }, []);

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      data-cta="whatsapp"
      data-cta-location="flotante"
      className={`wa-float group fixed bottom-4 right-4 z-[46] flex items-center gap-3 sm:bottom-6 sm:right-6 ${shown ? "wa-float-in" : ""}`}
    >
      <span className="pointer-events-none hidden translate-x-2 whitespace-nowrap rounded-button bg-ink px-4 py-2.5 text-[13px] text-paper opacity-0 shadow-glass transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
        ¿Hablamos por WhatsApp?
      </span>
      <span
        className="wa-float-ring relative grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_28px_rgba(20,27,28,0.28)] transition-transform duration-300 group-hover:scale-105 sm:h-[60px] sm:w-[60px]"
        style={{ background: WHATSAPP_GREEN }}
      >
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>
    </a>
  );
}
