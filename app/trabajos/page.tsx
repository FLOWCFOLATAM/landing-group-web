import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContentProvider from "@/components/ContentProvider";
import { WorksPageBody } from "@/components/Cases";
import { getSiteTina } from "@/brand/tina";
import { metaWorks, worksGraph } from "@/brand/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  ...metaWorks,
  alternates: { canonical: "/trabajos/" },
};

/* Todos los casos con contexto + la galería completa de piezas. */
export default async function TrabajosPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <WorksPageBody />
      <Footer />
      <JsonLd data={worksGraph()} />
    </ContentProvider>
  );
}
