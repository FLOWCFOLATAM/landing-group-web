import { notFound } from "next/navigation";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SolutionDetail from "@/components/SolutionDetail";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";
import { solutionGraph, solutionMeta } from "@/brand/seo";
import JsonLd from "@/components/JsonLd";

/* Página de solución (plantilla común): slug y metadata se resuelven en
   build con el contenido estático; el cuerpo lee el contenido en vivo. */
export function generateStaticParams() {
  return content.solutions.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = content.solutions.items.find((s) => s.slug === slug);
  if (!item) return { title: "Solución — LANDING GROUP" };
  return {
    ...solutionMeta(item),
    alternates: { canonical: `/soluciones/${item.slug}/` },
  };
}

export default async function SolucionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = content.solutions.items.find((s) => s.slug === slug);
  if (!item) notFound();
  const tina = await getSiteTina();

  return (
    <ContentProvider tina={tina}>
      <Nav />
      <SolutionDetail slug={slug} />
      <Footer />
      <JsonLd data={solutionGraph(item)} />
    </ContentProvider>
  );
}
