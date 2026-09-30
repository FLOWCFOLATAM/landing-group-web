"use client";

import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import ContactOptions from "./ContactOptions";

/* Cuerpo de /contacto: los dos canales directos y las redes. */
export default function ContactPageBody() {
  const { contact } = useContent();
  const socials = [
    { label: "Instagram", href: contact.instagram },
    { label: "LinkedIn", href: contact.linkedin },
  ].filter((s) => s.href);

  return (
    <Reveal delay={550}>
      <div className="mt-12 max-w-3xl">
        <ContactOptions location="contacto" />
        {socials.length > 0 && (
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[14px] text-ink/70">
            <span className="text-[12px] uppercase tracking-[0.2em] text-ink/60 [font-weight:600]">Síguenos</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center underline decoration-ink/25 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {s.label}
              </a>
            ))}
          </p>
        )}
      </div>
    </Reveal>
  );
}
