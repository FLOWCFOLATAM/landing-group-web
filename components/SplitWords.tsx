"use client";

import { useEffect, useRef, useState } from "react";

/* Titular editorial: cada palabra emerge desde una máscara con stagger.
   Las palabras listadas en `accents` se pintan con el color de marca.
   La visibilidad vive en estado React (sobrevive a Fast Refresh). */
export default function SplitWords({
  text,
  accents = [],
  className = "",
  baseDelay = 0,
  step = 60,
}: {
  text: string;
  accents?: readonly string[];
  className?: string;
  baseDelay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const normalized = (w: string) => w.toLowerCase().replace(/[.,;:!?¿¡"'()]/g, "");
  const accentSet = new Set(accents.map(normalized));

  return (
    <span ref={ref} className={`${className} ${visible ? "is-visible" : ""}`}>
      {text.split(" ").map((word, i, words) => (
        <span key={i} className="split-line">
          <span
            className={`split-word ${accentSet.has(normalized(word)) ? "text-accent" : ""}`}
            style={{ ["--d" as string]: `${baseDelay + i * step}ms` }}
          >
            {word}
          </span>
          {/* Espacio real entre palabras para quien lee el HTML sin estilos
              (buscadores, asistentes de IA, lectores de pantalla): «Merch
              corporativo» y no «Merchcorporativo». Va al final de la línea
              dentro del inline-block, donde el navegador lo colapsa: no ocupa
              ancho, así que el diseño no cambia. */}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
