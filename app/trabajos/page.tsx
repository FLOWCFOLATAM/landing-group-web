import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContentProvider from "@/components/ContentProvider";
import { WorksPageBody } from "@/components/Cases";
import { getSiteTina } from "@/brand/tina";

export const metadata: Metadata = {
  title: "Trabajos — LANDING GROUP",
  description: content.cases.intro,
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
    </ContentProvider>
  );
}
