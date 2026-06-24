import { createClient } from "next-sanity";
import { groq } from "next-sanity";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import { fetchNavPages } from "@/sanity/lib/fetch";

export const revalidate = 10;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug && active != false][0] {
    title,
    "slug": slug.current,
    blocks[] {
      _type,
      ...,
      image { asset-> { url } },
      cards[] {
        ...,
      }
    }
  }
`;

interface Props {
  params: Promise<{ locale: string; slug: string[] }>;
}

export default async function DynamicPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const slugPath = slug.join("/");

  const [page, navPages] = await Promise.all([
    client.fetch(PAGE_QUERY, { slug: slugPath }, { next: { revalidate: 10 } }),
    fetchNavPages(),
  ]);

  if (!page) notFound();

  return (
    <>
      <Navbar locale={locale} cmsPages={navPages ?? undefined} />
      <main>
        <BlockRenderer blocks={page.blocks ?? []} locale={locale} />
      </main>
      <Footer />
    </>
  );
}
