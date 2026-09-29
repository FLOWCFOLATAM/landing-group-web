import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HowWeWorkPage from "@/components/HowWeWorkPage";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

export const metadata: Metadata = {
  title: "Cómo lo hacemos — LANDING GROUP",
  description: content.howWeWork.pageIntro,
  alternates: { canonical: "/como-lo-hacemos/" },
};

/* Diferenciales en profundidad: producción, logística y acompañamiento. */
export default async function ComoLoHacemosPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <HowWeWorkPage />
      <Footer />
    </ContentProvider>
  );
}
