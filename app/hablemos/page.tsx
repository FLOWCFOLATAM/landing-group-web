import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/ContactHeader";
import LeadForm from "@/components/LeadForm";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

export const metadata: Metadata = {
  title: "Agenda una reunión — LANDING GROUP",
  description: content.contact.intro,
  alternates: { canonical: "/hablemos/" },
};

/* Destino del CTA único: formulario comercial + agenda + confirmación. */
export default async function HablemosPage() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      <main className="telon-main">
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-32 sm:px-8">
          <ContactHeader />
          <div className="mt-12">
            <LeadForm />
          </div>
        </section>
      </main>
      <Footer />
    </ContentProvider>
  );
}
