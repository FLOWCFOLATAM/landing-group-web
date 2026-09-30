// tina/config.ts
import { defineConfig } from "tinacms";
var basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\//, "");
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    ...basePath ? { basePath } : {}
  },
  media: {
    tina: {
      // Raíz en "public" (mediaRoot vacío) para que los paths de imagen
      // sean "/brand/xxx.webp" exactamente como los referencia el sitio.
      mediaRoot: "",
      publicFolder: "public"
    }
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
          router: () => basePath ? `/${basePath}/` : "/"
        },
        fields: [
          {
            type: "object",
            name: "brand",
            label: "Marca",
            fields: [
              { type: "string", name: "name", label: "Nombre" },
              { type: "string", name: "group", label: "Sufijo (GROUP)" },
              { type: "string", name: "legal", label: "Raz\xF3n social (pie de p\xE1gina)" },
              { type: "string", name: "tagline", label: "Tagline" }
            ]
          },
          {
            type: "object",
            name: "primaryCta",
            label: "Bot\xF3n principal del sitio (CTA \xFAnico)",
            description: "Este texto y este destino se usan en TODOS los botones de acci\xF3n del sitio: men\xFA, portada, soluciones, casos y cierre.",
            fields: [
              { type: "string", name: "label", label: "Texto del bot\xF3n" },
              { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
            ]
          },
          {
            type: "object",
            name: "nav",
            label: "Men\xFA superior",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Entradas del men\xFA (m\xE1x. 4 + bot\xF3n)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" },
                  {
                    type: "object",
                    name: "children",
                    label: "Submen\xFA (opcional)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
                    ]
                  }
                ]
              }
            ]
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
                description: "Escribirlas exactamente como aparecen en el titular."
              },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "sub", label: "Descripci\xF3n", ui: { component: "textarea" } },
              {
                type: "object",
                name: "tiles",
                label: "Tarjetas flotantes (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Etiqueta grande" },
                  { type: "string", name: "note", label: "Nota peque\xF1a" }
                ]
              }
            ]
          },
          {
            type: "string",
            name: "marquee",
            label: "Cinta en movimiento (palabras)",
            list: true
          },
          {
            type: "object",
            name: "solutions",
            label: "Soluciones",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
              {
                type: "object",
                name: "note",
                label: "Franja de personalizaci\xF3n (bajo las tarjetas)",
                fields: [
                  { type: "string", name: "text", label: "Texto", ui: { component: "textarea" } },
                  { type: "string", name: "label", label: "Texto del enlace" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
                ]
              },
              {
                type: "object",
                name: "items",
                label: "Soluciones y capacidades",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name }) },
                fields: [
                  { type: "string", name: "slug", label: "URL de la p\xE1gina (no cambiar sin apoyo t\xE9cnico)" },
                  {
                    type: "string",
                    name: "tier",
                    label: "Tipo",
                    options: [
                      { value: "principal", label: "Soluci\xF3n principal (aparece en la portada)" },
                      { value: "capacidad", label: "Capacidad transversal (p\xE1gina secundaria)" }
                    ]
                  },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "promise", label: "Promesa (frase corta)" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "image", name: "photo", label: "Foto de cabecera" },
                  {
                    type: "string",
                    name: "solves",
                    label: "Qu\xE9 resuelve (2\u20133 l\xEDneas)",
                    ui: { component: "textarea" }
                  },
                  {
                    type: "object",
                    name: "includes",
                    label: "Qu\xE9 incluye (3\u20135)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title }) },
                    fields: [
                      {
                        type: "string",
                        name: "icon",
                        label: "\xCDcono",
                        options: [
                          { value: "textil", label: "Textil (prenda)" },
                          { value: "accesorio", label: "Accesorio / credencial" },
                          { value: "kit", label: "Kit / caja" },
                          { value: "muestra", label: "Muestra aprobada" },
                          { value: "activacion", label: "Activaci\xF3n (meg\xE1fono)" },
                          { value: "montaje", label: "Montaje / stand" },
                          { value: "granformato", label: "Gran formato (toldo)" },
                          { value: "responsable", label: "Responsable \xFAnico" },
                          { value: "bordado", label: "Bordado" },
                          { value: "serigrafia", label: "Serigraf\xEDa" },
                          { value: "uv", label: "Impresi\xF3n UV" },
                          { value: "prueba", label: "Prueba documentada" }
                        ]
                      },
                      { type: "string", name: "title", label: "T\xEDtulo" },
                      { type: "string", name: "text", label: "Texto corto", ui: { component: "textarea" } }
                    ]
                  },
                  {
                    type: "object",
                    name: "how",
                    label: "C\xF3mo lo hacemos (diferenciales conectados)",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.title }) },
                    fields: [
                      { type: "string", name: "title", label: "T\xEDtulo" },
                      { type: "string", name: "text", label: "Texto", ui: { component: "textarea" } },
                      { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
                    ]
                  },
                  {
                    type: "string",
                    name: "cases",
                    label: "Casos que se muestran (2\u20134)",
                    list: true,
                    description: "Escribe el identificador del caso: monster, tottus, amoramar, swan, tres-cruces, johnnie-walker, red-bull, heineken."
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "howWeWork",
            label: "C\xF3mo lo hacemos (diferenciales)",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo (portada)" },
              { type: "string", name: "intro", label: "Introducci\xF3n (portada)", ui: { component: "textarea" } },
              { type: "string", name: "pageTitle", label: "T\xEDtulo (p\xE1gina C\xF3mo lo hacemos)" },
              { type: "string", name: "pageIntro", label: "Introducci\xF3n (p\xE1gina)", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Diferenciales (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.name }) },
                fields: [
                  { type: "string", name: "id", label: "Identificador (no cambiar sin apoyo t\xE9cnico)" },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "role", label: "Rol (Ejecuci\xF3n, Operaci\xF3n, Servicio\u2026)" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" },
                  { type: "image", name: "photo", label: "Foto" },
                  {
                    type: "object",
                    name: "detail",
                    label: "Detalle en la p\xE1gina C\xF3mo lo hacemos",
                    description: "Si la frase principal queda vac\xEDa, el diferencial solo se enlaza (caso Personalizaci\xF3n).",
                    fields: [
                      { type: "string", name: "claim", label: "Frase principal" },
                      { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
                      { type: "string", name: "bullets", label: "Vi\xF1etas", list: true },
                      {
                        type: "object",
                        name: "gallery",
                        label: "Fotos (2)",
                        list: true,
                        ui: { itemProps: (item) => ({ label: item?.alt }) },
                        fields: [
                          { type: "image", name: "src", label: "Foto" },
                          { type: "string", name: "alt", label: "Pie de foto / descripci\xF3n" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cases",
            label: "Trabajos (casos)",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Casos",
                description: "Los primeros 6 casos aparecen en la portada; todos aparecen en /trabajos.",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.title].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "string", name: "slug", label: "Identificador / URL (no cambiar sin apoyo t\xE9cnico)" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "category", label: "Categor\xEDa (etiqueta)" },
                  {
                    type: "string",
                    name: "solution",
                    label: "Soluci\xF3n relacionada",
                    options: [
                      { value: "merch-corporativo", label: "Merch corporativo" },
                      { value: "eventos-btl", label: "Eventos & BTL" },
                      { value: "personalizacion", label: "Personalizaci\xF3n" }
                    ]
                  },
                  { type: "string", name: "title", label: "Titular del caso" },
                  { type: "string", name: "need", label: "Qu\xE9 necesitaba", ui: { component: "textarea" } },
                  { type: "string", name: "answer", label: "Qu\xE9 hicimos", ui: { component: "textarea" } },
                  { type: "string", name: "execution", label: "C\xF3mo lo ejecutamos (pasos)", list: true },
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
                      { type: "string", name: "alt", label: "Descripci\xF3n de la foto" }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "works",
            label: "Galer\xEDa de piezas",
            fields: [
              { type: "string", name: "label", label: "T\xEDtulo de la galer\xEDa" },
              {
                type: "object",
                name: "items",
                label: "Piezas",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.piece].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "image", name: "src", label: "Foto" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "piece", label: "Pieza" },
                  { type: "string", name: "desc", label: "Descripci\xF3n (hover)", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "Proceso",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              {
                type: "object",
                name: "steps",
                label: "Pasos (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.title].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "string", name: "n", label: "N\xFAmero (01\u201304)" },
                  { type: "string", name: "title", label: "T\xEDtulo del paso" },
                  { type: "string", name: "body", label: "Descripci\xF3n", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Nuestra operaci\xF3n",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "intro", label: "Argumento comercial", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Bloques (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value }) },
                fields: [
                  { type: "string", name: "value", label: "Dato grande" },
                  { type: "string", name: "label", label: "Explicaci\xF3n" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "Bloque final de contacto",
            fields: [
              { type: "string", name: "title", label: "Mensaje comercial" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "contact",
            label: "Contacto (WhatsApp, correo y redes)",
            description: "Estos datos alimentan los botones de WhatsApp y correo del cierre y de la p\xE1gina Cont\xE1ctanos. Las redes del pie de p\xE1gina se editan en \xABPie de p\xE1gina\xBB.",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de la p\xE1gina" },
              { type: "string", name: "title", label: "T\xEDtulo de la p\xE1gina" },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
              {
                type: "string",
                name: "whatsapp",
                label: "WhatsApp comercial",
                description: "N\xFAmero con c\xF3digo de pa\xEDs, solo d\xEDgitos (ej. 51923290835). Vac\xEDo = no se muestra el bot\xF3n."
              },
              {
                type: "string",
                name: "whatsappMessage",
                label: "Mensaje inicial de WhatsApp",
                description: "Texto que aparece escrito al abrir el chat (el cliente puede cambiarlo antes de enviar).",
                ui: { component: "textarea" }
              },
              { type: "string", name: "email", label: "Correo comercial" },
              { type: "string", name: "emailSubject", label: "Asunto sugerido del correo" },
              { type: "string", name: "instagram", label: "Instagram (URL)" },
              { type: "string", name: "linkedin", label: "LinkedIn (URL)" },
              { type: "string", name: "response", label: "Expectativa de respuesta" }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de p\xE1gina",
            fields: [
              {
                type: "object",
                name: "columns",
                label: "Columnas de enlaces",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "T\xEDtulo de columna" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino" }
                    ]
                  }
                ]
              },
              { type: "string", name: "note", label: "Nota final" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
