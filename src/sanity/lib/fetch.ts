import { createClient } from "next-sanity";
import {
  SERVICES_QUERY,
  CERTIFICATIONS_QUERY,
  FAQ_QUERY,
  GALLERY_QUERY,
} from "./queries";

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const REVALIDATE = { next: { revalidate: 60 } };

async function safeFetch<T>(query: string, params: Record<string, string> = {}): Promise<T[] | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId || projectId === "TU_PROJECT_ID_AQUI") return null;
  try {
    const data = await serverClient.fetch<T[]>(query, params, REVALIDATE);
    return data?.length > 0 ? data : null;
  } catch {
    return null;
  }
}

export const fetchServices = (locale: string) =>
  safeFetch<{
    id: string; name: string; description: string; detail?: string;
    card_includes?: string[]; includes?: string[]; benefits?: string[];
    why_higher?: string[]; footer_note?: string; price_large: string;
    price_small?: string; note: string; conditions?: string[];
    ideal?: string; unit: string; icon: string;
  }>(SERVICES_QUERY, { locale });

export const fetchCertifications = (locale: string) =>
  safeFetch<{
    id: string; name: string; institution: string;
    year: string; description: string; image?: string;
  }>(CERTIFICATIONS_QUERY, { locale });

export const fetchFaq = (locale: string) =>
  safeFetch<{ q: string; a: string }>(FAQ_QUERY, { locale });

export const fetchGallery = () =>
  safeFetch<{ id: string; src: string; caption?: string }>(GALLERY_QUERY);
