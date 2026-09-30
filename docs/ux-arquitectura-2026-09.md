# Rediseño de arquitectura UX — septiembre 2026

Fuente: *Grupo Landing — Diagnóstico UX / Arquitectura web* (28-09-2026), enviado
por el cliente. Objetivo: ordenar experiencia, jerarquía y conversión **sin
rediseñar la identidad visual**. Rama: `ux-arquitectura`.

## 1. Decisiones

| Tema | Decisión |
|---|---|
| CTA único | **«Contáctanos»** → `/contacto/` (cambio pedido por Landing el 29-09-2026: «agendar reunión» no servía a los objetivos comerciales). Mismo texto y destino en header, hero, soluciones, casos y cierre. Un solo campo del CMS (`primaryCta`) y un solo componente (`components/PrimaryCta.tsx`). |
| Menú | Soluciones ▾ · Cómo lo hacemos ▾ · Trabajos · Proceso + CTA. Máx. 5 entradas. Móvil: menú compacto (hamburguesa) + CTA visible. |
| Soluciones | 2 principales (Merch corporativo, Eventos & BTL) en la home. Personalización = capacidad transversal con página secundaria propia (`tier: "capacidad"`). |
| Diferenciales | Producción bajo control, Logística y entregas, Acompañamiento (+ Personalización) → bloque 04 de la home y página `/como-lo-hacemos/` con el contenido de las antiguas páginas de servicio (no se elimina nada). |
| Casos | 8 casos con contexto (marca → necesidad → solución → imagen → Ver proyecto). La home muestra los 6 primeros; `/trabajos/` muestra los 8 + la galería de 15 piezas. Cada caso tiene ficha breve en `/trabajos/[slug]/`. **Textos de casos redactados a partir de las descripciones existentes: Landing debe validarlos (editables en Tina).** |
| Contacto | **Sin formularios ni agenda** (decisión de Landing, 29-09-2026). Dos canales directos: **WhatsApp +51 923 290 835** y **comercial@grupolanding.pe**, en `/contacto/` y en el cierre de la home (`components/ContactOptions.tsx`). Redes en el footer: Instagram y LinkedIn (sin Twitter por ahora). |
| URLs viejas | `vercel.json` redirige (308, permanentes desde la aprobación del 29-09-2026) `/agenda` y `/hablemos` → `/contacto/`, y `/servicios/*` → su nuevo hogar. |
| Retirado de la home | Frase editorial («Las grandes marcas nacen de los detalles») y la franja «Selección destacada»: no están en los 9 bloques. La cinta (marquee) queda como cierre visual del hero. |

## 2. Home — 9 bloques (orden exacto)

| # | Bloque | Componente | id |
|---|---|---|---|
| 01 | Header | `Nav` | — |
| 02 | Hero (+ cinta) | `Hero`, `Marquee` | `hero` |
| 03 | Soluciones | `Solutions` | `soluciones` |
| 04 | Diferenciales | `HowWeWork` | `como-lo-hacemos` |
| 05 | Trabajos / casos | `Cases` | `trabajos` |
| 06 | Proceso | `Process` | `proceso` |
| 07 | Operación | `Stats` | `operacion` |
| 08 | CTA final (WhatsApp + correo) | `CtaFinal` | `contacto` |
| 09 | Footer | `Footer` | `site-footer` |

## 3. Páginas

| Ruta | Contenido |
|---|---|
| `/soluciones/[slug]/` | Plantilla común: Hero (nombre + promesa + imagen + CTA) · Qué resuelve · Qué incluye (3–5, ícono + texto) · Cómo lo hacemos · Piezas/casos reales (2–4) · CTA · Otras soluciones |
| `/como-lo-hacemos/` | Producción bajo control · Logística y entregas · Acompañamiento (+ enlace a Personalización) · CTA |
| `/trabajos/` | 8 casos + galería de 15 piezas · CTA |
| `/trabajos/[slug]/` | Ficha: para quién, qué necesitaba, qué hizo Landing, cómo lo ejecutó, piezas, imágenes · CTA · otros casos |
| `/contacto/` | Contáctanos: botones de WhatsApp y correo comercial + redes |

## 4. Checklist de entrega (del diagnóstico)

- [x] Menú implementado según arquitectura propuesta
- [x] CTA principal definido y consistente
- [x] Home ordenada en 9 bloques
- [x] Producción, Logística y Acompañamiento tratados como diferenciales
- [x] Plantilla común para las páginas de solución
- [x] Casos con contexto, no solo imágenes
- [x] Contacto funcional: WhatsApp y correo directos (formulario retirado a pedido de Landing)
- [x] Responsive revisado en desktop y mobile
- [x] Links y CTAs probados
- [x] Imágenes optimizadas y con alt text
- [x] H1/H2/H3 coherentes por página
- [x] SEO técnico/analítica: preparado para segunda fase (sitemap, robots, metadata por página, `data-cta` en cada CTA)

## 5. Convenciones de implementación

- Contenido tipado en `brand/content.ts` (tipos `Content`, `SolutionItem`,
  `CaseItem`, `HowItem`…); componentes leen con `useContent()`; las páginas
  servidor importan `content` solo para `generateStaticParams`/metadata.
- Cada página: `<ContentProvider tina={await getSiteTina()}><Nav /><main className="telon-main">…</main><Footer /></ContentProvider>`.
- Enlaces que vienen del CMS: `components/SmartLink.tsx`. CTA: `components/PrimaryCta.tsx`.
- Rutas de imagen del contenido ya llegan con `assetPath` aplicado; los
  literales `"/brand/..."` en componentes van con `assetPath()`.
- Un solo `h1` por página; `h2` por sección; `h3` por tarjeta.
- Secciones con ancla llevan `scroll-mt-24` (header fijo de 64 px).
- Áreas táctiles ≥ 44 px; texto informativo con contraste ≥ `text-ink/60`.
- Motion: solo los primitivos existentes (`Reveal`, `PlateReveal`,
  `TiltCard`, `MarkerStroke`, `Magnetic`, `RollText`); respetar
  `prefers-reduced-motion`.
