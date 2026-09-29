"use client";

import Link from "next/link";
import { useContent } from "@/components/ContentProvider";
import Magnetic from "./Magnetic";
import RollText from "./RollText";

/* CTA ÚNICO del sitio (diagnóstico UX §8): el mismo texto y el mismo
   destino en header, hero, soluciones, casos y cierre. Texto y destino se
   editan en un solo lugar del CMS (primaryCta). `location` queda como
   data-atributo para medir clics por ubicación en la fase de analítica. */
const VARIANTS = {
  /* header: contorno verde compacto */
  header:
    "border border-accent px-4 py-2.5 text-accent [--fill:var(--brand-accent)] hover:text-accent-ink sm:px-5",
  /* sobre fondo claro: verde lleno, relleno tinta al hover */
  solid: "bg-accent px-7 py-4 text-accent-ink [--fill:var(--brand-ink)]",
  /* sobre fondo verde: papel, relleno tinta al hover */
  light: "bg-paper px-8 py-4 text-accent [--fill:var(--brand-ink)] hover:text-paper",
  /* sobre fondo tinta: verde lleno, relleno sage al hover */
  dark: "bg-accent px-8 py-4 text-accent-ink [--fill:var(--brand-sage)]",
} as const;

export default function PrimaryCta({
  variant = "solid",
  location,
  magnetic,
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  /* dónde vive este CTA: "header", "hero", "solucion-merch-corporativo"… */
  location: string;
  /* fuerza del efecto magnético (0 = sin efecto) */
  magnetic?: number;
  className?: string;
}) {
  const { primaryCta } = useContent();
  const link = (
    <Link
      href={primaryCta.href}
      data-cta="primary"
      data-cta-location={location}
      className={`btn-fill group inline-flex min-h-[44px] items-center justify-center whitespace-nowrap rounded-button text-[12px] uppercase tracking-[0.14em] [font-weight:600] sm:tracking-[0.16em] ${VARIANTS[variant]} ${className}`}
    >
      <RollText text={primaryCta.label} />
    </Link>
  );
  return magnetic ? <Magnetic strength={magnetic}>{link}</Magnetic> : link;
}
