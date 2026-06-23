import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Certifications } from "@/components/sections/Certifications";
import { Requirements } from "@/components/sections/Requirements";
import { BookingForm } from "@/components/sections/BookingForm";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import {
  fetchServices,
  fetchCertifications,
  fetchFaq,
  fetchGallery,
} from "@/sanity/lib/fetch";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [servicesResult, certsResult, faqResult, galleryResult] =
    await Promise.allSettled([
      fetchServices(locale),
      fetchCertifications(locale),
      fetchFaq(locale),
      fetchGallery(),
    ]);

  const sanityServices =
    servicesResult.status === "fulfilled" ? servicesResult.value : null;
  const sanityCerts =
    certsResult.status === "fulfilled" ? certsResult.value : null;
  const sanityFaq =
    faqResult.status === "fulfilled" ? faqResult.value : null;
  const sanityGallery =
    galleryResult.status === "fulfilled" ? galleryResult.value : null;

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <Hero />
        <Services serverItems={sanityServices ?? undefined} />
        <About />
        <Certifications serverItems={sanityCerts ?? undefined} />
        <Requirements />
        <BookingForm />
        <Gallery serverImages={sanityGallery ?? undefined} />
        <FAQ serverItems={sanityFaq ?? undefined} />
      </main>
      <Footer />
    </>
  );
}
