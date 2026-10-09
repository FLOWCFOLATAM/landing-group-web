/*
  SEO y GEO (Generative Engine Optimization): metadatos, datos estructurados
  y el resumen /llms.txt para buscadores y asistentes de IA.

  REGLA (Landing, 9-oct-2026): nada de esto cambia el diseño ni el contenido
  visible de la web. Todo se DERIVA de content/site.json (lo que la página ya
  dice) para no afirmar nada que el visitante no pueda leer. El número de
  WhatsApp NO se muestra en la web ni va en /llms.txt; solo se declara como
  teléfono de la organización en los datos estructurados, para que coincida
  con Google Business Profile (decisión de Hugo, 9-oct-2026).
*/

import { content, type CaseItem, type SolutionItem } from "./content";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupolanding.com").replace(/\/$/, "");
export const BRAND = "LANDING GROUP";
const LOCALE = "es-PE";
const abs = (path: string) => `${SITE_URL}${path}`;
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const COUNTRY = { "@type": "Country", name: "Perú" };

type Json = Record<string, unknown>;

/* "51923290835" → "+51 923 290 835" (formato peruano; otros: +dígitos). Solo para
   datos estructurados: ningún componente visible lo usa. */
const PHONE = (() => {
  const d = content.contact.whatsapp.replace(/\D/g, "");
  if (!d) return "";
  return d.length === 11 && d.startsWith("51") ? `+51 ${d.slice(2, 5)} ${d.slice(5, 8)} ${d.slice(8)}` : `+${d}`;
})();
const withPhone = (): Json => (PHONE ? { telephone: PHONE } : {});

type Crumb = { name: string; path: string };

/* ── Título y descripción que ven los buscadores ─────────────────────── */

export const metaHome = {
  title: `Merch corporativo, BTL y eventos en Lima | ${BRAND}`,
  description:
    "Merch, BTL y eventos corporativos en Lima, Perú. Producción bajo control y entregas que representan tu marca. Contáctanos por WhatsApp o correo.",
};

export const metaHowWeWork = {
  title: `Cómo lo hacemos: personalización y producción | ${BRAND}`,
  description: content.howWeWork.pageIntro,
};

export const metaWorks = {
  title: `Casos y trabajos de merch corporativo y BTL | ${BRAND}`,
  description:
    "Proyectos reales de merch corporativo, BTL y personalización: qué necesitaba cada marca y cómo lo resolvimos.",
};

export const metaContact = {
  title: `Contáctanos: merch corporativo, BTL y eventos | ${BRAND}`,
  description: content.contact.intro,
};

/* Google corta la descripción a ~155 caracteres: se recorta en el límite de
   una palabra para que nunca termine a mitad de frase. */
const clip = (s: string, max = 158) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
};

export const solutionMeta = (s: SolutionItem) => ({
  title: `${s.name} en Lima | ${BRAND}`,
  description: clip(`${s.name} en Lima, Perú. ${s.promise} ${s.body}`),
});

export const caseMeta = (c: CaseItem) => ({
  title: `${c.brand} — ${c.title} — ${BRAND}`,
  description: clip(`${c.need} ${c.answer}`),
});

/* ── Datos estructurados (JSON-LD, schema.org) ───────────────────────── */

function organizationNode(): Json {
  const { brand, contact, hero, solutions, howWeWork } = content;
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: `${brand.name} ${brand.group}`,
    legalName: brand.legal,
    alternateName: "Grupo Landing",
    url: SITE_URL,
    logo: { "@type": "ImageObject", url: abs("/brand/logo-black.png"), width: 1123, height: 275 },
    image: abs("/opengraph-image.jpg"),
    description: hero.sub,
    slogan: brand.tagline,
    email: contact.email,
    ...withPhone(),
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    areaServed: COUNTRY,
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: contact.email, ...withPhone(), areaServed: "PE", availableLanguage: "Spanish" },
    ],
    sameAs: [contact.instagram, contact.linkedin].filter(Boolean),
    knowsAbout: [...solutions.items.map((s) => s.name), ...howWeWork.items.map((h) => h.name)],
  };
}

function websiteNode(): Json {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND,
    alternateName: "Grupo Landing",
    inLanguage: LOCALE,
    publisher: { "@id": ORG_ID },
  };
}

/* Va en todas las páginas (layout): quién es Landing y qué sitio es este. */
export const siteGraph = (): Json => ({ "@context": "https://schema.org", "@graph": [organizationNode(), websiteNode()] });

function pageGraph(o: {
  path: string;
  type?: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  about?: Json;
  mainEntity?: Json;
  extra?: Json[];
}): Json {
  const url = abs(o.path);
  const crumbs: Crumb[] = [{ name: "Inicio", path: "/" }, ...o.crumbs];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": o.type ?? "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: o.name,
        description: o.description,
        inLanguage: LOCALE,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        ...(o.about ? { about: o.about } : {}),
        ...(o.mainEntity ? { mainEntity: o.mainEntity } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.path) })),
      },
      ...(o.extra ?? []),
    ],
  };
}

export function solutionGraph(s: SolutionItem): Json {
  const path = `/soluciones/${s.slug}/`;
  const service: Json = {
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name: s.name,
    serviceType: s.name,
    description: s.solves,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: COUNTRY,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.name}: qué incluye`,
      itemListElement: s.includes.map((inc) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: inc.title, description: inc.text },
      })),
    },
  };
  return pageGraph({
    path,
    name: s.name,
    description: solutionMeta(s).description,
    crumbs: [{ name: s.name, path }],
    about: { "@id": service["@id"] },
    extra: [service],
  });
}

export function caseGraph(c: CaseItem): Json {
  const path = `/trabajos/${c.slug}/`;
  return pageGraph({
    path,
    name: `${c.brand} — ${c.title}`,
    description: caseMeta(c).description,
    crumbs: [
      { name: "Trabajos", path: "/trabajos/" },
      { name: c.brand, path },
    ],
    about: { "@type": "Organization", name: c.brand },
  });
}

export function worksGraph(): Json {
  const path = "/trabajos/";
  const list: Json = {
    "@type": "ItemList",
    "@id": `${abs(path)}#casos`,
    name: content.cases.title,
    numberOfItems: content.cases.items.length,
    itemListElement: content.cases.items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/trabajos/${c.slug}/`),
      name: c.brand,
      description: c.answer,
    })),
  };
  return pageGraph({
    path,
    type: "CollectionPage",
    name: content.cases.title,
    description: metaWorks.description,
    crumbs: [{ name: "Trabajos", path }],
    mainEntity: { "@id": list["@id"] },
    extra: [list],
  });
}

export function howWeWorkGraph(): Json {
  const path = "/como-lo-hacemos/";
  const list: Json = {
    "@type": "ItemList",
    "@id": `${abs(path)}#diferenciales`,
    name: content.howWeWork.title,
    numberOfItems: content.howWeWork.items.length,
    itemListElement: content.howWeWork.items.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(h.href),
      name: h.name,
    })),
  };
  return pageGraph({
    path,
    name: content.howWeWork.pageTitle,
    description: metaHowWeWork.description,
    crumbs: [{ name: "Cómo lo hacemos", path }],
    mainEntity: { "@id": list["@id"] },
    extra: [list],
  });
}

export function contactGraph(): Json {
  const path = "/contacto/";
  return pageGraph({
    path,
    type: "ContactPage",
    name: content.contact.title,
    description: metaContact.description,
    crumbs: [{ name: "Contáctanos", path }],
    mainEntity: { "@id": ORG_ID },
  });
}

/* ── /llms.txt: resumen en texto plano para asistentes de IA ─────────────
   Formato llmstxt.org. Sin evidencia de que los buscadores grandes lo usen
   hoy; es barato, está al día solo (se genera desde el contenido) y no
   incluye nada que la web no diga. */
export function llmsText(): string {
  const c = content;
  const L: string[] = [];
  const clean = (s: string) => s.replace(/\s+/g, " ").trim();
  L.push(`# ${BRAND}`, "");
  L.push(`> ${clean(c.hero.sub)} ${c.stats.items.map((i) => clean(i.label)).join(". ")}.`, "");

  L.push("## Soluciones");
  for (const s of c.solutions.items) L.push(`- [${s.name}](${abs(`/soluciones/${s.slug}/`)}): ${clean(`${s.promise} ${s.body}`)}`);
  L.push("");

  L.push("## Cómo lo hacemos");
  for (const h of c.howWeWork.items) L.push(`- [${h.name}](${abs(h.href)}): ${clean(h.body)}`);
  L.push("");

  L.push("## Proceso");
  for (const st of c.process.steps) L.push(`- ${st.n} ${st.title}: ${clean(st.body)}`);
  L.push("");

  L.push("## Trabajos");
  for (const k of c.cases.items) L.push(`- [${k.brand} — ${k.title}](${abs(`/trabajos/${k.slug}/`)}): ${clean(k.need)}`);
  L.push("");

  L.push("## Contacto");
  L.push(`- [Contáctanos](${abs("/contacto/")}): por WhatsApp o correo comercial. ${clean(c.contact.response)}`);
  L.push(`- Correo: ${c.contact.email}`);
  if (c.contact.instagram) L.push(`- Instagram: ${c.contact.instagram}`);
  if (c.contact.linkedin) L.push(`- LinkedIn: ${c.contact.linkedin}`);
  L.push("", `${c.brand.legal} ${clean(c.footer.note)}`, "");
  return L.join("\n");
}
