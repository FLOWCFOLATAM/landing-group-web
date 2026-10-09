/* Datos estructurados (JSON-LD) para buscadores y asistentes de IA.
   Invisible para el visitante. El "<" se escapa para que un texto del CMS
   nunca pueda cerrar la etiqueta <script> por accidente. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
