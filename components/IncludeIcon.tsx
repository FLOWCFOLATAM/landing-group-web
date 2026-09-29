import type { IncludeIcon as IncludeIconName } from "@/brand/content";

/* Íconos de línea para "Qué incluye" (24×24, trazo 1.5, extremos
   redondeados). No son elementos de identidad: solo señalética de apoyo. */
const PATHS: Record<IncludeIconName, string[]> = {
  textil: ["M8.5 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5.5-3a3.5 3.5 0 0 1-7 0Z"],
  accesorio: ["M9 3v5", "M15 3v5", "M6.5 8h11v12.5h-11Z", "M9.5 13h5", "M9.5 16h3"],
  kit: ["m3 7.5 9-4.5 9 4.5v9L12 21l-9-4.5Z", "m3 7.5 9 4.5 9-4.5", "M12 12v9", "m7.5 5.2 9 4.6"],
  muestra: ["M3.5 3.5h10v10h-10Z", "M10.5 10.5h10v10h-10Z", "m13 16 2 2 3.5-3.5"],
  activacion: ["M3 10v4h3l7 4V6l-7 4Z", "M16.5 9a4 4 0 0 1 0 6", "M19 6.5a7.5 7.5 0 0 1 0 11"],
  montaje: ["M2.5 20.5h19", "M5 20.5V9.5h14v11", "m5 9.5 7-5.5 7 5.5", "M9.5 20.5v-5h5v5"],
  granformato: ["M2 11 12 4.5 22 11Z", "M5 11v9.5", "M19 11v9.5", "M8 11v2.5", "M16 11v2.5"],
  responsable: ["M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4.5 21a7.5 7.5 0 0 1 11-6.6", "m15.5 18.5 2 2 3.5-4"],
  bordado: ["M20.5 3.5 7 17", "M17.5 3.5h3v3", "M7 17c-1.5 1.5-3.8.6-4.2 2.3-.4 1.6 2.2 2.1 3.4.4 1-1.4-.4-3 1.4-4.2", "M11 9.5c2.5 0 3.5 1.5 3.5 3.5"],
  serigrafia: ["M3 5.5h18v10H3Z", "M6.5 19.5h11", "M12 15.5v4", "m7 12.5 4-4", "m10.5 12.5 4-4", "m14 12.5 3-3"],
  uv: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z", "M12 2.5v2", "M12 19.5v2", "m5.3 5.3 1.4 1.4", "m17.3 17.3 1.4 1.4", "M2.5 12h2", "M19.5 12h2", "m5.3 18.7 1.4-1.4", "m17.3 6.7 1.4-1.4"],
  prueba: ["M9 3.5h6v3H9Z", "M7 5H5v16h14V5h-2", "m9 13.5 2 2 4-4"],
};

export default function IncludeIcon({ name, className = "" }: { name: IncludeIconName; className?: string }) {
  const paths = PATHS[name] ?? PATHS.prueba;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
