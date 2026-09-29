"use client";

import Image from "next/image";
import { useContent } from "@/components/ContentProvider";
import { assetPath } from "@/brand/paths";
import SmartLink from "./SmartLink";

/* Bloque 09 — FOOTER: logo/tagline + navegación + contacto + redes + datos
   legales. Siempre aparece inmediatamente después del CTA. */
export default function Footer() {
  const content = useContent();
  return (
    <footer id="site-footer" className="telon-footer bg-accent pb-10 pt-24 text-paper">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_2fr]">
          <div>
            <Image
              src={assetPath("/brand/logo-white-lg.png")}
              alt="Landing Group"
              width={2118}
              height={508}
              unoptimized
              className="h-9 w-auto"
            />
            <p className="display mt-8 max-w-md text-[clamp(1.8rem,2.8vw,2.4rem)] leading-[0.95]">
              {content.hero.title}
            </p>
            <p className="mt-3 font-script text-[1.5rem] leading-none text-sand">
              {content.brand.tagline}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_1.1fr_0.8fr_1.4fr]">
            {content.footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-paper/70 [font-weight:600]">
                  {col.title}
                </h2>
                <ul className="mt-3 sm:mt-4 sm:space-y-1">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <SmartLink
                        href={link.href}
                        className="inline-flex min-h-[44px] items-center break-all text-[14px] sm:min-h-[32px] tracking-[0.02em] text-paper/85 transition-colors hover:text-sand sm:break-normal"
                      >
                        {link.label}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Wordmark oficial gigante para cerrar la página con la marca. */}
        <Image
          src={assetPath("/brand/logo-white-lg.png")}
          alt=""
          aria-hidden
          width={2118}
          height={508}
          unoptimized
          className="mx-auto mt-20 w-full max-w-[900px] select-none opacity-[0.14]"
        />

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/20 pt-6 text-[12px] tracking-[0.03em] text-paper/70 sm:flex-row">
          <span>
            © {new Date().getFullYear()} {content.brand.legal}
          </span>
          <span>{content.footer.note}</span>
        </div>

        {/* Firma del creador: enlaza al sitio de Flow (el producto). */}
        <div className="mt-8 flex justify-center">
          <a
            href="https://flow-cfo.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-paper/60 transition-colors hover:text-paper/90"
          >
            <span>Powered by</span>
            <span className="[font-weight:700] tracking-[0.16em] text-paper/70 transition-colors group-hover:text-sand">
              FLOW
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
