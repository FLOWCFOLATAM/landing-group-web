"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Envuelve cualquier bloque para que aparezca al entrar en viewport.
   La visibilidad vive en estado React (no en classList imperativo)
   para sobrevivir re-renders de Fast Refresh y ser estable en prod. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /* "li" cuando el bloque es hijo directo de un <ul>/<ol> (lista bien formada) */
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className} ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
