import { defineConfig } from "tinacms";

/* TinaCMS — edición visual del contenido de Landing Group.
   - Local: `npm run dev` levanta Tina + Next; admin en /admin/
   - Producción: requiere proyecto en app.tina.io y los secretos
     NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN en GitHub (ver README).
   El contenido vive en content/site.json (tipado en brand/content.ts);
   las fotos, en public/brand. Si cambia la forma del JSON, actualizar este
   esquema, .pages.yml y brand/content.ts a la vez. */

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\//, "");

export default defineConfig({
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.GITHUB_BRANCH ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    ...(basePath ? { basePath } : {}),
  },

  media: {
    tina: {
      // Raíz en "public" (mediaRoot vacío) para que los paths de imagen
      // sean "/brand/xxx.webp" exactamente como los referencia el sitio.
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "site",
        label: "Contenido del sitio",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
          /* Al abrir el documento, saltar directo a la edición visual
             sobre la portada del sitio (respetando el basePath de Pages). */
          router: () => (basePath ? `/${basePath}/` : "/"),
        },
        fields: [
          {
            type: "object",
            name: "brand",
            label: "Marca",
            fields: [
              { type: "string", name: "name", label: "Nombre" },
              { type: "string", name: "group", label: "Sufijo (GROUP)" },
              { type: "string", name: "legal", label: "Razón social (pie de página)" },
              { type: "string", name: "tagline", label: "Tagline" },
            ],
          },
          {
            type: "object",
            name: "primaryCta",
            label: "Botón principal del sitio (CTA único)",
            description:
              "Este texto y este destino se usan en TODOS los botones de acción del sitio: menú, portada, soluciones, casos y cierre.",
            fields: [
              { type: "string", name: "label", label: "Texto del botón" },
              { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
            ],
          },
          {
            type: "object",
            name: "nav",
            label: "Menú superior",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Entradas del menú (máx. 4 + botón)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                  {
                    type: "object",
                    name: "children",
                    label: "Submenú (opcional)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Portada",
            fields: [
              { type: "string", name: "title", label: "Titular grande" },
              {
                type: "string",
                name: "accents",
                label: "Palabras del titular en verde",
                list: true,
                description: "Escribirlas exactamente como aparecen en el titular.",
              },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "sub", label: "Descripción", ui: { component: "textarea" } },
              {
                type: "object",
                name: "tiles",
                label: "Tarjetas flotantes (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Etiqueta grande" },
                  { type: "string", name: "note", label: "Nota pequeña" },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "marquee",
            label: "Cinta en movimiento (palabras)",
            list: true,
          },
          {
            type: "object",
            name: "solutions",
            label: "Soluciones",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
              {
                type: "object",
                name: "note",
                label: "Franja de personalización (bajo las tarjetas)",
                fields: [
                  { type: "string", name: "text", label: "Texto", ui: { component: "textarea" } },
                  { type: "string", name: "label", label: "Texto del enlace" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                ],
              },
              {
                type: "object",
                name: "items",
                label: "Soluciones y capacidades",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name }) },
                fields: [
                  { type: "string", name: "slug", label: "URL de la página (no cambiar sin apoyo técnico)" },
                  {
                    type: "string",
                    name: "tier",
                    label: "Tipo",
                    options: [
                      { value: "principal", label: "Solución principal (aparece en la portada)" },
                      { value: "capacidad", label: "Capacidad transversal (página secundaria)" },
                    ],
                  },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "promise", label: "Promesa (frase corta)" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "image", name: "photo", label: "Foto de cabecera" },
                  {
                    type: "string",
                    name: "solves",
                    label: "Qué resuelve (2–3 líneas)",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "object",
                    name: "includes",
                    label: "Qué incluye (3–5)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title }) },
                    fields: [
                      {
                        type: "string",
                        name: "icon",
                        label: "Ícono",
                        options: [
                          { value: "textil", label: "Textil (prenda)" },
                          { value: "accesorio", label: "Accesorio / credencial" },
                          { value: "kit", label: "Kit / caja" },
                          { value: "muestra", label: "Muestra aprobada" },
                          { value: "activacion", label: "Activación (megáfono)" },
                          { value: "montaje", label: "Montaje / stand" },
                          { value: "granformato", label: "Gran formato (toldo)" },
                          { value: "responsable", label: "Responsable único" },
                          { value: "bordado", label: "Bordado" },
                          { value: "serigrafia", label: "Serigrafía" },
                          { value: "uv", label: "Impresión UV" },
                          { value: "prueba", label: "Prueba documentada" },
                        ],
                      },
                      { type: "string", name: "title", label: "Título" },
                      { type: "string", name: "text", label: "Texto corto", ui: { component: "textarea" } },
                    ],
                  },
                  {
                    type: "object",
                    name: "how",
                    label: "Cómo lo hacemos (diferenciales conectados)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title }) },
                    fields: [
                      { type: "string", name: "title", label: "Título" },
                      { type: "string", name: "text", label: "Texto", ui: { component: "textarea" } },
                      { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                    ],
                  },
                  {
                    type: "string",
                    name: "cases",
                    label: "Casos que se muestran (2–4)",
                    list: true,
                    description:
                      "Escribe el identificador del caso: monster, tottus, amoramar, swan, tres-cruces, johnnie-walker, red-bull, heineken.",
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "howWeWork",
            label: "Cómo lo hacemos (diferenciales)",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título (portada)" },
              { type: "string", name: "intro", label: "Introducción (portada)", ui: { component: "textarea" } },
              { type: "string", name: "pageTitle", label: "Título (página Cómo lo hacemos)" },
              { type: "string", name: "pageIntro", label: "Introducción (página)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Diferenciales (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name }) },
                fields: [
                  { type: "string", name: "id", label: "Identificador (no cambiar sin apoyo técnico)" },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "role", label: "Rol (Ejecución, Operación, Servicio…)" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                  { type: "image", name: "photo", label: "Foto" },
                  {
                    type: "object",
                    name: "detail",
                    label: "Detalle en la página Cómo lo hacemos",
                    description: "Si la frase principal queda vacía, el diferencial solo se enlaza (caso Personalización).",
                    fields: [
                      { type: "string", name: "claim", label: "Frase principal" },
                      { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
                      { type: "string", name: "bullets", label: "Viñetas", list: true },
                      {
                        type: "object",
                        name: "gallery",
                        label: "Fotos (2)",
                        list: true,
                        ui: { itemProps: (item) => ({ label: item?.alt }) },
                        fields: [
                          { type: "image", name: "src", label: "Foto" },
                          { type: "string", name: "alt", label: "Pie de foto / descripción" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cases",
            label: "Trabajos (casos)",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Casos",
                description: "Los primeros 6 casos aparecen en la portada; todos aparecen en /trabajos.",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.title].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "string", name: "slug", label: "Identificador / URL (no cambiar sin apoyo técnico)" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "category", label: "Categoría (etiqueta)" },
                  {
                    type: "string",
                    name: "solution",
                    label: "Solución relacionada",
                    options: [
                      { value: "merch-corporativo", label: "Merch corporativo" },
                      { value: "eventos-btl", label: "Eventos & BTL" },
                      { value: "personalizacion", label: "Personalización" },
                    ],
                  },
                  { type: "string", name: "title", label: "Titular del caso" },
                  { type: "string", name: "need", label: "Qué necesitaba", ui: { component: "textarea" } },
                  { type: "string", name: "answer", label: "Qué hicimos", ui: { component: "textarea" } },
                  { type: "string", name: "execution", label: "Cómo lo ejecutamos (pasos)", list: true },
                  { type: "string", name: "pieces", label: "Piezas" },
                  { type: "image", name: "cover", label: "Foto de la tarjeta" },
                  {
                    type: "object",
                    name: "gallery",
                    label: "Fotos de la ficha",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.alt }) },
                    fields: [
                      { type: "image", name: "src", label: "Foto" },
                      { type: "string", name: "alt", label: "Descripción de la foto" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "works",
            label: "Galería de piezas",
            fields: [
              { type: "string", name: "label", label: "Título de la galería" },
              {
                type: "object",
                name: "items",
                label: "Piezas",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.piece].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "image", name: "src", label: "Foto" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "piece", label: "Pieza" },
                  { type: "string", name: "desc", label: "Descripción (hover)", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Proceso",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              {
                type: "object",
                name: "steps",
                label: "Pasos (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.title].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "string", name: "n", label: "Número (01–04)" },
                  { type: "string", name: "title", label: "Título del paso" },
                  { type: "string", name: "body", label: "Descripción", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Nuestra operación",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "intro", label: "Argumento comercial", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Bloques (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value }) },
                fields: [
                  { type: "string", name: "value", label: "Dato grande" },
                  { type: "string", name: "label", label: "Explicación" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Bloque final de contacto",
            fields: [
              { type: "string", name: "title", label: "Mensaje comercial" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "contact",
            label: "Contacto (WhatsApp, correo y redes)",
            description:
              "Estos datos alimentan los botones de WhatsApp y correo del cierre y de la página Contáctanos. Las redes del pie de página se editan en «Pie de página».",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de la página" },
              { type: "string", name: "title", label: "Título de la página" },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp comercial",
                description: "Número con código de país, solo dígitos (ej. 51923290835). Vacío = no se muestra el botón.",
              },
              {
                type: "string",
                name: "whatsappMessage",
                label: "Mensaje inicial de WhatsApp",
                description: "Texto que aparece escrito al abrir el chat (el cliente puede cambiarlo antes de enviar).",
                ui: { component: "textarea" },
              },
              { type: "string", name: "email", label: "Correo comercial" },
              { type: "string", name: "emailSubject", label: "Asunto sugerido del correo" },
              { type: "string", name: "instagram", label: "Instagram (URL)" },
              { type: "string", name: "linkedin", label: "LinkedIn (URL)" },
              { type: "string", name: "response", label: "Expectativa de respuesta" },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de página",
            fields: [
              {
                type: "object",
                name: "columns",
                label: "Columnas de enlaces",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Título de columna" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino" },
                    ],
                  },
                ],
              },
              { type: "string", name: "note", label: "Nota final" },
            ],
          },
        ],
      },
    ],
  },
});

// Tina Cloud indexa la rama main vía webhook del push (setup inicial).
