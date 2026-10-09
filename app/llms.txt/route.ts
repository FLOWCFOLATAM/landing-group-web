import { llmsText } from "@/brand/seo";

/* /llms.txt — resumen del sitio en texto plano para asistentes de IA.
   Se genera en el build desde content/site.json (siempre al día). */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
