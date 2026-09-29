import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { plainHref } from "@/brand/paths";

/* Enlace para hrefs que vienen del CMS:
   - externos (http) → nueva pestaña;  mailto:/tel: → <a> directo
   - con ancla ("/#trabajos", "/como-lo-hacemos/#logistica") → <a> nativo
     (scroll suave del html; respeta el basePath vía plainHref)
   - páginas internas → next/link (prefetch + navegación del cliente) */
type Props = Omit<ComponentProps<"a">, "href"> & { href: string; children: ReactNode };

export default function SmartLink({ href, children, ...rest }: Props) {
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.includes("#")) {
    return (
      <a href={plainHref(href)} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}
