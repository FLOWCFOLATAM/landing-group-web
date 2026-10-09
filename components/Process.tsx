"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import MarkerStroke from "./MarkerStroke";

/* El hilo del proceso: una línea de marcador serpentea por los 4 pasos y
   se dibuja proporcional al scroll (bidireccional). Cuando la punta
   alcanza un paso, un óvalo rodea su número (one-shot) y el título pasa
   de gris a tinta: alguien marca la checklist mientras lees. */
const THRESHOLDS = [0.15, 0.38, 0.61, 0.84];

export default function Process() {
  const content = useContent();
  const { label, title, steps } = content.process;
  const section = useRef<HTMLElement>(null);
  const [reached, setReached] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--thread-p", "1");
      setReached(steps.length);
      return;
    }

    let raf = 0;
    let active = false;

    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (r.height + vh * 0.4)));
      el.style.setProperty("--thread-p", p.toFixed(3));
      const hit = THRESHOLDS.filter((t) => p >= t).length;
      /* one-shot hacia adelante: la checklist marcada no se desmarca */
      setReached((prev) => Math.max(prev, hit));
    };
    const onScroll = () => {
      if (!active) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    /* el scrub solo trabaja con la sección visible */
    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) update();
    });
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [steps.length]);

  return (
    <section id="proceso" ref={section} className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">{label}</p>
        <h2 className="display mt-4 max-w-2xl text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[0.95]">
          {title}
        </h2>
      </Reveal>

      <div className="relative mt-14">
        {/* El hilo: solo desktop; en móvil los pasos conservan su borde */}
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          aria-hidden
          className="thread absolute -top-7 left-0 hidden h-10 w-full text-accent lg:block"
        >
          <path
            d="M0 26 C 120 10, 250 34, 390 22 C 500 13, 580 28, 700 22 C 820 16, 900 32, 1010 24 C 1090 18, 1150 22, 1200 18"
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
          />
        </svg>

        <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 110}
              className={`border-t-2 border-accent/70 pt-6 lg:border-t-0 lg:pt-8 ${reached > i ? "step-done" : ""}`}
            >
              <span className="relative inline-block px-2 py-1">
                <span className="text-[12px] tracking-[0.2em] text-accent [font-weight:600]">
                  {step.n}
                </span>
                <MarkerStroke
                  shape="circle"
                  drawn={reached > i}
                  className="absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)] text-accent"
                />
              </span>
              <h3 className="display step-title mt-3 text-[clamp(1.7rem,2.4vw,2.1rem)] leading-[0.95]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.5] tracking-[0.01em] text-ink/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
