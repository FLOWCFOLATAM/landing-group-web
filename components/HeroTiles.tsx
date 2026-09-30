"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";

/* Piezas flotantes del hero con fotografía real: cada una entra desde un
   punto distinto, conserva profundidad y al hover sube al frente para que
   su copy nunca quede oculto por las otras tarjetas. */
const LOOK = [
  {
    photo: assetPath("/brand/tile-la.webp"),
    fit: "object-cover object-left",
    tilt: "-5deg",
    depth: 18,
    spin: -0.011,
    delay: "0s",
    pos: "left-0 top-0",
    enterX: "0px",
    enterY: "-280px",
    enterRot: "-9deg",
    hoverX: "-24px",
    hoverY: "-18px",
    z: 30,
  },
  {
    photo: assetPath("/brand/tile-btl.webp"),
    fit: "object-cover",
    tilt: "3.5deg",
    depth: 34,
    spin: 0.014,
    delay: "0.9s",
    pos: "right-0 top-[24%]",
    enterX: "0px",
    enterY: "300px",
    enterRot: "8deg",
    hoverX: "26px",
    hoverY: "-12px",
    z: 20,
  },
  {
    photo: assetPath("/brand/tile-merch.webp"),
    fit: "object-cover",
    tilt: "-2deg",
    depth: 26,
    spin: -0.008,
    delay: "1.7s",
    pos: "left-[10%] top-[50%]",
    enterX: "-300px",
    enterY: "0px",
    enterRot: "-7deg",
    hoverX: "-16px",
    hoverY: "20px",
    z: 10,
  },
] as const;

export default function HeroTiles() {
  const content = useContent();
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = wrap.current;
    if (!el) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    let nx = 0;
    let ny = 0;
    let raf = 0;

    const render = () => {
      const sy = Math.min(window.scrollY, 900);
      layers.forEach((layer, i) => {
        const d = Number(layer.dataset.depth);
        const drift = sy * d * 0.004;
        const rot = sy * LOOK[i].spin;
        layer.style.transform = `translate3d(${(-nx * d).toFixed(1)}px, ${(-ny * d + drift).toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg)`;
      });
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    };
    const onMove = (e: MouseEvent) => {
      nx = e.clientX / window.innerWidth - 0.5;
      ny = e.clientY / window.innerHeight - 0.5;
      schedule();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrap} className="hero-tiles relative mx-auto h-[430px] w-full max-w-md lg:h-[470px]" aria-hidden>
      {content.hero.tiles.map((tile, i) => (
        <div
          key={tile.label}
          data-depth={LOOK[i].depth}
          className={`hero-tile-anchor absolute ${LOOK[i].pos}`}
          style={{
            ["--tile-z" as string]: LOOK[i].z,
          }}
        >
          <div
            className="hero-tile-arrival"
            style={{
              ["--beat" as string]: `${1050 + i * 140}ms`,
              ["--enter-x" as string]: LOOK[i].enterX,
              ["--enter-y" as string]: LOOK[i].enterY,
              ["--enter-rot" as string]: LOOK[i].enterRot,
              ["--hover-x" as string]: LOOK[i].hoverX,
              ["--hover-y" as string]: LOOK[i].hoverY,
            }}
          >
            <div className="hero-tile-hover">
              <div
                className="hero-tile-card animate-float relative h-52 w-52 overflow-hidden rounded-card shadow-glass sm:h-60 sm:w-60"
                style={{
                  ["--tilt" as string]: LOOK[i].tilt,
                  animationDelay: LOOK[i].delay,
                }}
              >
                <Image
                  src={LOOK[i].photo}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 208px, 240px"
                  className={LOOK[i].fit}
                />
                <div className="hero-tile-caption absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-ink/90 via-ink/60 to-transparent p-4 pt-12">
                  <span className="display block text-3xl leading-none text-white">{tile.label}</span>
                  <span className="hero-tile-note mt-1 block text-[11px] tracking-[0.03em] text-white/80 [font-weight:450]">
                    {tile.note}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
