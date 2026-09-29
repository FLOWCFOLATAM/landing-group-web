"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useTina } from "tinacms/dist/react";
import { content as staticContent, withAssetPaths, type Content } from "@/brand/content";

/* Proveedor de contenido con edición visual:
   - Sin datos de Tina (build sin credenciales, o fallo del API): sirve el
     contenido estático de content/site.json — el sitio queda idéntico.
   - Con datos de Tina: useTina conecta la página al editor visual; dentro
     del admin, cada tecla del cliente re-renderiza la página EN VIVO.
   Los componentes leen SIEMPRE vía useContent(). */

export type TinaSiteProps = {
  query: string;
  variables: object;
  data: object;
} | null;

const Ctx = createContext<Content>(staticContent);

export function useContent(): Content {
  return useContext(Ctx);
}

export default function ContentProvider({
  tina,
  children,
}: {
  tina: TinaSiteProps;
  children: ReactNode;
}) {
  if (!tina) return <Ctx.Provider value={staticContent}>{children}</Ctx.Provider>;
  return <LiveContent tina={tina}>{children}</LiveContent>;
}

/* Los hooks no pueden ser condicionales: el ramal vivo va en su propio
   componente para que useTina solo exista cuando hay datos de Tina. */
function LiveContent({
  tina,
  children,
}: {
  tina: NonNullable<TinaSiteProps>;
  children: ReactNode;
}) {
  const { data } = useTina(tina as never) as { data: { site?: unknown } };
  const value = data?.site
    ? mergeOver(staticContent, withAssetPaths(data.site))
    : staticContent;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/* Blindaje del contenido en vivo: Tina devuelve null en campos vacíos y,
   mientras reindexa un esquema nuevo, puede traer la forma anterior. Se
   superpone lo vivo sobre la forma estática: nunca falta un campo que un
   componente espera. Las listas se toman tal cual (el cliente puede
   reordenar/borrar); cada elemento se completa contra un molde VACÍO
   (no contra otro elemento) para no mezclar contenidos entre sí. */
function mergeOver<T>(base: T, live: unknown): T {
  if (live === null || live === undefined) return base;
  if (Array.isArray(base)) {
    if (!Array.isArray(live)) return base;
    const mold = base.length ? skeleton(base[0]) : undefined;
    return live
      .filter((item) => item !== null && item !== undefined)
      .map((item) => (mold === undefined ? item : mergeOver(mold, item))) as T;
  }
  if (base && typeof base === "object") {
    if (typeof live !== "object" || Array.isArray(live)) return base;
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(base as Record<string, unknown>)) {
      out[key] = mergeOver(inner, (live as Record<string, unknown>)[key]);
    }
    return out as T;
  }
  return (typeof live === typeof base ? live : base) as T;
}

/* Molde vacío con la misma forma: textos "", listas [], objetos anidados. */
function skeleton<T>(value: T): T {
  if (Array.isArray(value)) return [] as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, inner] of Object.entries(value as Record<string, unknown>)) out[key] = skeleton(inner);
    return out as T;
  }
  if (typeof value === "string") return "" as T;
  return value;
}
