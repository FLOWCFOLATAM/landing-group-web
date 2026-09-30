"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import type { NavLink } from "@/brand/content";
import RollText from "./RollText";
import SmartLink from "./SmartLink";
import PrimaryCta from "./PrimaryCta";

/* Bloque 01 — HEADER (diagnóstico UX §3 y §9): logo + Soluciones ▾ +
   Cómo lo hacemos ▾ + Trabajos + Proceso + CTA único. Máx. 5 entradas.
   Móvil/tablet: menú compacto (hamburguesa) + el CTA siempre visible.
   El panel móvil vive FUERA del <header>: el backdrop-blur del header
   crearía un bloque contenedor y rompería su position: fixed. */
export default function Nav() {
  const content = useContent();
  const links = content.nav.links;
  const [open, setOpen] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) burger.current?.focus();
  }, []);

  /* Panel abierto: bloquear scroll, foco al primer enlace, Escape cierra,
     y se cierra solo al pasar a desktop. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const lg = window.matchMedia("(min-width: 1024px)");
    const onLg = () => lg.matches && close(false);
    window.addEventListener("keydown", onKey);
    lg.addEventListener("change", onLg);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      lg.removeEventListener("change", onLg);
    };
  }, [open, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-xl">
        <nav
          aria-label="Principal"
          className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-8"
        >
          {/* Wordmark original en alta resolución, conservado en todos los breakpoints. */}
          <Link href="/" aria-label="Landing Group — inicio" className="flex shrink-0 items-center">
            <Image
              src={assetPath("/brand/logo-black.png")}
              alt="Landing Group"
              width={1123}
              height={275}
              priority
              unoptimized
              className="h-5 w-auto sm:h-6 lg:h-7"
            />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {links.map((link, i) => (
              <DesktopItem key={link.label} link={link} beat={1150 + i * 60} />
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <PrimaryCta
              variant="header"
              location="header"
              className="max-[400px]:px-3 max-[400px]:text-[11px] max-[400px]:tracking-[0.06em]"
            />
            <button
              ref={burger}
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => (open ? close() : setOpen(true))}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-button border border-line text-ink transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <span aria-hidden className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 top-[6px] h-[1.5px] w-5 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`absolute left-0 top-3 h-[1.5px] w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Globito de WhatsApp: listo en components/WhatsAppFloat.tsx, en espera
          hasta que Landing lo apruebe. Para activarlo: importarlo aquí y
          renderizar {!open && <WhatsAppFloat />}. */}

      {/* Menú compacto (móvil/tablet) */}
      <div
        id={panelId}
        ref={panel}
        hidden={!open}
        className="nav-panel fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper lg:hidden"
      >
        <ul className="mx-auto w-full max-w-[1200px] px-5 pb-12 pt-6 sm:px-8">
          {links.map((link) => (
            <li key={link.label} className="border-b border-line py-3">
              <SmartLink
                href={link.href}
                onClick={() => close(false)}
                className="display flex min-h-[48px] items-center text-[clamp(1.9rem,7vw,2.4rem)] leading-none text-ink"
              >
                {link.label}
              </SmartLink>
              {link.children.length > 0 && (
                <ul className="mb-2 ml-1 border-l border-line pl-4">
                  {link.children.map((child) => (
                    <li key={child.href}>
                      <SmartLink
                        href={child.href}
                        onClick={() => close(false)}
                        className="flex min-h-[44px] items-center text-[15px] tracking-[0.02em] text-ink/75"
                      >
                        {child.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/* Entrada de escritorio: con hijos, despliega un panel al hover/foco; el
   chevron lo abre/cierra con teclado o toque y Escape lo cierra. */
function DesktopItem({ link, beat }: { link: NavLink; beat: number }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLLIElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const hasChildren = link.children.length > 0;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <li
      ref={wrap}
      data-choreo
      style={{ ["--beat" as string]: `${beat}ms` }}
      className="group/dd relative"
      data-open={open || undefined}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <div className="flex items-center gap-1">
        <SmartLink
          href={link.href}
          className="group inline-flex min-h-[44px] items-center text-[14px] tracking-[0.03em] text-ink/70 transition-colors [font-weight:450] hover:text-ink"
        >
          <RollText text={link.label} />
        </SmartLink>
        {hasChildren && (
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={`Ver opciones de ${link.label}`}
            onClick={() => setOpen((v) => !v)}
            className="grid h-8 w-6 place-items-center text-ink/60 transition-colors hover:text-accent"
          >
            <svg
              viewBox="0 0 12 12"
              aria-hidden
              className="h-3 w-3 transition-transform duration-300 group-hover/dd:rotate-180 group-data-[open]/dd:rotate-180"
            >
              <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {hasChildren && (
        <div
          className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-focus-within/dd:visible group-focus-within/dd:translate-y-0 group-focus-within/dd:opacity-100 group-hover/dd:visible group-hover/dd:translate-y-0 group-hover/dd:opacity-100 group-data-[open]/dd:visible group-data-[open]/dd:translate-y-0 group-data-[open]/dd:opacity-100"
        >
          <ul id={menuId} className="min-w-[250px] rounded-card border border-line bg-white p-2 shadow-glass">
            {link.children.map((child) => (
              <li key={child.href}>
                <SmartLink
                  href={child.href}
                  className="flex min-h-[44px] items-center justify-between gap-4 rounded-button px-4 text-[14px] text-ink/80 transition-colors hover:bg-paper hover:text-accent focus-visible:bg-paper"
                >
                  {child.label}
                  <span aria-hidden className="text-accent">→</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}
