<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Convenciones del proyecto

- **Arquitectura**: `docs/ux-arquitectura-2026-09.md` (home en 9 bloques,
  soluciones, diferenciales, casos, CTA único). Leerlo antes de mover bloques.
- **CTA único**: todo botón de conversión usa `components/PrimaryCta.tsx`
  (texto/destino en `primaryCta`); enlaces que vienen del CMS con
  `components/SmartLink.tsx`. Tipos del contenido en `brand/content.ts`.
- **Contenido**: la fuente de verdad es `content/site.json` (lo edita el
  cliente vía TinaCMS — esquema en `tina/config.ts` — o Pages CMS con
  `.pages.yml`). Los componentes leen SIEMPRE vía `useContent()` de
  `components/ContentProvider` (edición visual en vivo); NO importar
  `content` directo en componentes (solo en metadata/generateStaticParams).
  Si cambia la estructura del JSON: actualizar `tina/config.ts` Y `.pages.yml`,
  y regenerar `tina/__generated__` (`npm run dev` lo hace).
- **Identidad**: tokens en `brand/tokens.css`; reglas y decisiones de marca en
  `BRAND_HANDOFF.md` (leerlo antes de tocar diseño). Elementos de identidad
  (logo, estrella) se extraen del brandbook real, nunca se redibujan.
- **Imágenes**: rutas `"/brand/..."` siempre a través de `assetPath()`
  (el basePath quedó por si se publica bajo subruta; hoy sirve Vercel en la
  raíz). Fotos de catálogo: limpiar fondo con el
  pipeline documentado en `BRAND_HANDOFF.md`.
- **Deploy**: Vercel (proyecto `landing-group-web`, rama `main` → grupolanding.com).
  Revisión previa en `preview.grupolanding.com` (proyecto aparte
  `landing-group-preview`, no indexable; se despliega con `vercel deploy --prod`
  y `NEXT_PUBLIC_SITE_ENV=preview`). GitHub Pages está retirado. Verificación
  mínima antes de commit: `npm run lint`, `npx tsc --noEmit` y `npm run build`.
- **SEO/GEO**: `docs/seo-geo-2026-10.md`. Títulos, descripciones y JSON-LD viven
  en `brand/seo.ts` y se derivan del contenido visible. REGLA de Landing: no
  cambiar diseño ni contenido visible. El número de WhatsApp no se publica en
  JSON-LD ni en `/llms.txt` (la web no lo muestra).
- **Motion**: sin librerías de animación; respetar `prefers-reduced-motion`,
  estados one-shot en estado React, solo transform/opacity/clip-path/color.
  El cursor cruz es constante (decisión cerrada del cliente).
