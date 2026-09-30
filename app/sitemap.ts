import type { MetadataRoute } from "next";
import { content } from "@/brand/content";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupolanding.com").replace(/\/$/, "");

/* Mapa del sitio (SEO técnico preparado para la segunda fase). */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...content.solutions.items.map((s) => `/soluciones/${s.slug}/`),
    "/como-lo-hacemos/",
    "/trabajos/",
    ...content.cases.items.map((c) => `/trabajos/${c.slug}/`),
    "/contacto/",
  ];
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : path.split("/").length > 3 ? 0.6 : 0.8,
  }));
}
