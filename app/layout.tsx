import type { Metadata } from "next";
import { Barlow_Condensed, Inter, Caveat } from "next/font/google";
import { content } from "@/brand/content";
import { SITE_URL, metaHome, siteGraph } from "@/brand/seo";
import JsonLd from "@/components/JsonLd";
import Cursor from "@/components/Cursor";
import PageDirector from "@/components/PageDirector";
import "./globals.css";

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
  metadataBase: new URL(SITE_URL),
  title: metaHome.title,
  description: metaHome.description,
  alternates: {
    canonical: "/",
  },
  /* Producción: se permiten vistas previas grandes y fragmentos sin límite
     (buscadores y asistentes de IA pueden citar). El espejo de revisión no se indexa. */
  robots: isPreview
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
      },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-PE"
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
        <JsonLd data={siteGraph()} />
        {children}
        <Cursor />
        <PageDirector />
      </body>
    </html>
  );
}
