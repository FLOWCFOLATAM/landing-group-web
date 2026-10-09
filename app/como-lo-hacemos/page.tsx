import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";
import { howWeWorkGraph, metaHowWeWork } from "@/brand/seo";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  ...metaHowWeWork,
  alternates: { canonical: "/como-lo-hacemos/" },
};

/* Diferenciales en profundidad: personalización, producción, logística y acompañamiento. */
export default async function ComoLoHacemosPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <HowWeWorkPage />
      <Footer />
      <JsonLd data={howWeWorkGraph()} />
    </ContentProvider>
  );
}
