import { builder } from "@builder.io/sdk";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BuilderPage } from "@/components/BuilderPage";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY ?? "");

export const revalidate = 10;

interface Props {
  params: Promise<{ locale: string; page: string[] }>;
}

export default async function Page({ params }: Props) {
  const { locale, page } = await params;
  setRequestLocale(locale);

  const urlPath = "/" + page.join("/");

  const content = await builder
    .get("page", {
      userAttributes: { urlPath },
      prerender: false,
    })
    .promise();

  if (!content && process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <BuilderPage content={content ?? null} />
      </main>
      <Footer />
    </>
  );
}
