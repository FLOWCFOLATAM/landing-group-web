import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/ContactHeader";
import ContactPageBody from "@/components/ContactPageBody";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

export const metadata: Metadata = {
  title: "Contáctanos — LANDING GROUP",
  description: content.contact.intro,
  alternates: { canonical: "/contacto/" },
};

/* Destino del CTA único («Contáctanos»): contacto directo por WhatsApp o
   correo comercial. Sin formularios ni agenda (decisión de Landing). */
export default async function ContactoPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <main className="telon-main">
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-32 sm:px-8">
          <ContactHeader />
          <ContactPageBody />
        </section>
      </main>
      <Footer />
    </ContentProvider>
  );
}
