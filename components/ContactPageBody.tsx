"use client";

import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import ContactOptions from "./ContactOptions";
import { InstagramIcon, LinkedInIcon } from "./BrandIcons";

/* Cuerpo de /contacto: los dos canales directos y las redes. */
export default function ContactPageBody() {
  const { contact } = useContent();
  const socials = [
    { label: "Instagram", href: contact.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: contact.linkedin, Icon: LinkedInIcon },
  ].filter((s) => s.href);

  return (
    <Reveal delay={550}>
      <div className="mt-12 max-w-3xl">
        <ContactOptions location="contacto" />
        {socials.length > 0 && (
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3 text-[14px] text-ink/70 sm:gap-x-4">
            <span className="basis-full text-[12px] uppercase tracking-[0.2em] text-ink/60 [font-weight:600] sm:basis-auto">Síguenos</span>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-button border border-line bg-white px-4 text-ink/80 transition-colors hover:border-accent hover:text-accent"
              >
                <s.Icon className="h-[18px] w-[18px]" />
                {s.label}
              </a>
            ))}
          </p>
        )}
      </div>
    </Reveal>
  );
}
