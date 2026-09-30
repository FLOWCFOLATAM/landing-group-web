import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Caveat } from "next/font/google";
import { content } from "@/brand/content";
import Cursor from "@/components/Cursor";
import PageDirector from "@/components/PageDirector";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://grupolanding.com";
/* Espejo de revisión (preview.grupolanding.com): se sirve igual pero no se
   indexa, para no duplicar el sitio en buscadores. */
const isPreview = process.env.NEXT_PUBLIC_SITE_ENV === "preview";

/* Tipografía oficial LANDING GROUP (brand book pág. 18):
   Barlow Condensed SemiBold para titulares, Inter para texto,
   y una manuscrita para el "acento manual". */
const display = Barlow_Condensed({
  variable: "--font-display-face",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const body = Inter({
  variable: "--font-body-face",
  subsets: ["latin"],
});

const script = Caveat({
  variable: "--font-script-face",
  weight: ["500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${content.brand.name} ${content.brand.group} — ${content.brand.tagline}`,
  description: content.hero.sub,
  alternates: {
    canonical: "/",
  },
  ...(isPreview ? { robots: { index: false, follow: false } } : {}),
  keywords: [
    "merchandising corporativo",
    "merch Perú",
    "eventos BTL",
    "uniformes corporativos",
    "regalos corporativos",
    "Landing Group",
  ],
  openGraph: {
    title: "LANDING GROUP — De la idea a la experiencia.",
    description: content.hero.sub,
    url: "/",
    siteName: "LANDING GROUP",
    locale: "es_PE",
    type: "website",
    // La imagen se toma por convención de app/opengraph-image.jpg (1200×632,
    // ~120 KB): Next añade dimensiones y un hash de cache-busting solo.
  },
  twitter: {
    card: "summary_large_image",
    title: "LANDING GROUP — De la idea a la experiencia.",
    description: content.hero.sub,
    // Idem: app/twitter-image.jpg vía convención.
  },
};

/* Datos estructurados de la organización (SEO técnico, segunda fase). */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: `${content.brand.name} ${content.brand.group}`,
  legalName: content.brand.legal,
  url: siteUrl,
  logo: `${siteUrl}/brand/logo-black.png`,
  email: content.contact.email,
  telephone: content.contact.whatsapp ? `+${content.contact.whatsapp.replace(/\D/g, "")}` : undefined,
  sameAs: [content.contact.instagram, content.contact.linkedin].filter(Boolean),
  areaServed: "PE",
  slogan: content.brand.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${script.variable} antialiased`}
    >
      <body>
        {/* Marca .js antes del primer paint: sin JS nada queda oculto */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        {children}
        <Cursor />
        <PageDirector />
      </body>
    </html>
  );
}
