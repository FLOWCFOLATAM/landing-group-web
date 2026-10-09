import { notFound } from "next/navigation";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseDetail from "@/components/CaseDetail";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";
import { caseGraph, caseMeta } from "@/brand/seo";
import JsonLd from "@/components/JsonLd";

/* Ficha de caso: slug y metadata se resuelven en build con el contenido
   estático; el cuerpo lee el contenido en vivo (edición visual del CMS). */
export function generateStaticParams() {
  return content.cases.items.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = content.cases.items.find((c) => c.slug === slug);
  if (!item) return { title: "Trabajo — LANDING GROUP" };
  return {
    ...caseMeta(item),
    alternates: { canonical: `/trabajos/${item.slug}/` },
  };
}

export default async function CasoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = content.cases.items.find((c) => c.slug === slug);
  if (!item) notFound();
  const tina = await getSiteTina();

  return (
    <ContentProvider tina={tina}>
      <Nav />
      <CaseDetail slug={slug} />
      <Footer />
      <JsonLd data={caseGraph(item)} />
    </ContentProvider>
  );
}
