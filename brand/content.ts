/*
  CONTENIDO — LANDING GROUP
  La fuente de verdad editable vive en content/site.json (la edita el
  cliente vía CMS, ver README). Este módulo solo la carga, la tipa y aplica
  assetPath a toda ruta de imagen ("/brand/...") para que el sitio
  funcione igual en local y bajo el basePath de GitHub Pages.

  Arquitectura (diagnóstico UX 28-sep-2026):
    Home en 9 bloques · Soluciones (2 principales + Personalización como
    capacidad transversal) · Cómo lo hacemos (diferenciales) · Casos con
    contexto · CTA único (primaryCta) repetido en todo el sitio.

  Voz del copy (brand book): clara, segura, específica y sobria.
  "Decimos: producción bajo control, personalización con propósito,
   entregas que representan tu marca. Evitamos: superlativos y clichés."
*/

import site from "../content/site.json";
import { assetPath } from "./paths";

export type Link = { label: string; href: string };
export type NavLink = Link & { children: Link[] };
export type Photo = { src: string; alt: string };

/* Ícono de "Qué incluye" (se dibuja en components/IncludeIcon.tsx). */
export type IncludeIcon =
  | "textil"
  | "accesorio"
  | "kit"
  | "muestra"
  | "activacion"
  | "montaje"
  | "granformato"
  | "responsable"
  | "bordado"
  | "serigrafia"
  | "uv"
  | "prueba";

export type SolutionItem = {
  slug: string;
  /* "principal" = card en la home (Merch, BTL); "capacidad" = página
     secundaria transversal (Personalización). */
  tier: "principal" | "capacidad";
  name: string;
  promise: string;
  body: string;
  photo: string;
  solves: string;
  includes: { icon: IncludeIcon; title: string; text: string }[];
  how: { title: string; text: string; href: string }[];
  /* slugs de cases.items */
  cases: string[];
};

export type HowItem = {
  id: string;
  name: string;
  role: string;
  body: string;
  href: string;
  photo: string;
  /* Personalización no tiene detalle aquí: vive en su página de solución. */
  detail: { claim: string; intro: string; bullets: string[]; gallery: Photo[] };
};

export type CaseItem = {
  slug: string;
  brand: string;
  category: string;
  /* slug de solutions.items */
  solution: string;
  title: string;
  need: string;
  answer: string;
  execution: string[];
  pieces: string;
  cover: string;
  gallery: Photo[];
};

export type WorkItem = { src: string; brand: string; piece: string; desc: string };

export type Content = {
  brand: { name: string; group: string; legal: string; tagline: string };
  primaryCta: Link;
  nav: { links: NavLink[] };
  hero: {
    title: string;
    accents: string[];
    script: string;
    sub: string;
    tiles: { label: string; note: string }[];
  };
  marquee: string[];
  solutions: {
    label: string;
    title: string;
    intro: string;
    note: { text: string; label: string; href: string };
    items: SolutionItem[];
  };
  howWeWork: {
    label: string;
    title: string;
    intro: string;
    pageTitle: string;
    pageIntro: string;
    items: HowItem[];
  };
  cases: { label: string; title: string; intro: string; items: CaseItem[] };
  works: { label: string; items: WorkItem[] };
  process: { label: string; title: string; steps: { n: string; title: string; body: string }[] };
  stats: { label: string; title: string; intro: string; items: { value: string; label: string }[] };
  cta: { title: string; body: string };
  /* Contacto directo (decisión de Landing, 29-sep-2026): sin formularios ni
     agenda; dos canales — WhatsApp y correo comercial. */
  contact: {
    label: string;
    title: string;
    script: string;
    intro: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    emailSubject: string;
    instagram: string;
    linkedin: string;
    response: string;
  };
  footer: { columns: { title: string; links: Link[] }[]; note: string };
};

/* Recorre el JSON y envuelve con assetPath cualquier string de imagen.
   Lo usa también ContentProvider para los valores en vivo de TinaCMS. */
export function withAssetPaths<T>(value: T): T {
  if (typeof value === "string") {
    return (value.startsWith("/brand/") ? assetPath(value) : value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => withAssetPaths(item)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) {
      out[key] = withAssetPaths(inner);
    }
    return out as T;
  }
  return value;
}

export const content: Content = withAssetPaths(site as Content);

/* Soluciones principales (cards de la home) y capacidad transversal. */
export const principalSolutions = (c: Content) => c.solutions.items.filter((s) => s.tier === "principal");

/* Casos por slug, conservando el orden pedido (los que no existan se omiten). */
export function casesBySlug(c: Content, slugs: string[]): CaseItem[] {
  return slugs
    .map((slug) => c.cases.items.find((item) => item.slug === slug))
    .filter((item): item is CaseItem => Boolean(item));
}

/* Cantidad de casos que muestra la home (los primeros de la lista). */
export const HOME_CASES = 6;

/* Enlaces de contacto directo, construidos desde el CMS. */
export function whatsappHref(c: Content["contact"]) {
  const digits = c.whatsapp.replace(/\D/g, "");
  if (!digits) return "";
  const text = c.whatsappMessage.trim();
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/* "51923290835" → "+51 923 290 835" (formato peruano; otros, tal cual). */
export function whatsappDisplay(c: Content["contact"]) {
  const d = c.whatsapp.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("51")) return `+51 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}`;
  return d ? `+${d}` : "";
}

export function mailtoHref(c: Content["contact"]) {
  const subject = c.emailSubject.trim();
  return `mailto:${c.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
