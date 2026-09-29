# Landing Group

Sitio comercial de Landing Group. Arquitectura según el diagnóstico UX del
28-09-2026 (detalle y decisiones en `docs/ux-arquitectura-2026-09.md`):

- **Home en 9 bloques**: header · hero · soluciones · cómo lo hacemos ·
  trabajos/casos · proceso · operación · CTA final · footer.
- **Soluciones** (`/soluciones/[slug]/`): Merch corporativo y Eventos & BTL
  como principales; Personalización como capacidad transversal. Plantilla
  común de 7 bloques.
- **Cómo lo hacemos** (`/como-lo-hacemos/`): producción, logística y
  acompañamiento como diferenciales.
- **Trabajos** (`/trabajos/` y `/trabajos/[slug]/`): casos con contexto
  (marca → necesidad → solución → imagen) + galería de piezas.
- **Hablemos** (`/hablemos/`): formulario comercial + agenda. Es el destino
  del **CTA único** («Agenda una reunión»), definido una sola vez en
  `primaryCta`.

## Sitio público

- Producción: [https://grupolanding.com](https://grupolanding.com) (Vercel, rama `main`).
- Revisión: `preview.grupolanding.com` (espejo no indexable de la rama en revisión).

## Desarrollo local

```bash
npm ci
npm run dev -- -p 3010
```

## Validación

```bash
npm run lint
npm run build
```

Cada actualización de `main` se compila y publica automáticamente mediante
GitHub Pages.

## Edición visual con TinaCMS (recomendada)

El sitio integra [TinaCMS](https://tina.io): el editor abre **la web real** con
un panel lateral — escribe y **ve el cambio en vivo** antes de guardar; al
guardar se hace commit y el sitio se republica solo.

- **Local (ya funciona):** `npm run dev` → sitio en `http://localhost:3010`,
  editor en `http://localhost:3010/admin/index.html` (modo local: guarda al
  filesystem).
- **Producción (activar una vez):**
  1. Crear proyecto gratuito en [app.tina.io](https://app.tina.io) → *Connect
     to GitHub* → elegir `landing-group-web` (branch `main`).
  2. Copiar el **Client ID** y un **Read-only token** del proyecto.
  3. En GitHub: Settings → Secrets and variables → Actions → agregar
     `NEXT_PUBLIC_TINA_CLIENT_ID` y `TINA_TOKEN`.
  4. Re-ejecutar el workflow de Pages. El editor queda vivo en
     `https://flow-2024-ai.github.io/landing-group-web/admin/index.html`.
  5. En app.tina.io → Project → Users, invitar al correo del cliente (tier
     gratuito: 2 usuarios). Entra con ese login, sin cuenta de GitHub.

## Editar el contenido con formularios (alternativa: Pages CMS)

Todo el contenido editable del sitio (textos, soluciones, diferenciales,
casos, galería, formulario, pie de página) vive en **`content/site.json`**, y el
esquema **`.pages.yml`** lo expone como formularios amigables en
[Pages CMS](https://pagescms.org).

### Puesta en marcha (una sola vez, por el administrador del repo)

1. Invitar al editor como colaborador: **Settings → Collaborators → Add people**
   (necesita una cuenta de GitHub y permiso *Write*).
2. El editor entra a [app.pagescms.org](https://app.pagescms.org), inicia sesión
   **Sign in with GitHub** y autoriza el repositorio `landing-group-web`.

### Flujo de edición (el cliente, cuando quiera)

1. Entrar a [app.pagescms.org](https://app.pagescms.org) → elegir **landing-group-web**.
2. Abrir **Contenido del sitio** y editar con formularios: textos, fotos
   (se suben a `public/brand/`), viñetas, horarios…
3. **Save**: cada guardado es un commit a `main` y el sitio se republica
   solo en ~2 minutos.

Notas:
- **Botón principal del sitio** (`primaryCta`): su texto y destino se usan en
  todos los botones de acción; cambiarlo en un lugar lo cambia en todo el sitio.
- **Casos**: los 6 primeros de la lista aparecen en la portada; todos en `/trabajos/`.
- Los campos marcados "no cambiar sin apoyo técnico" (destinos `href`, `slug`)
  afectan enlaces y URLs; todo lo demás es libre.
- Las fotos de catálogo lucen mejor con fondo blanco (pipeline de limpieza
  documentado en `BRAND_HANDOFF.md`).
