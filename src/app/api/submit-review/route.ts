import { createClient } from "@sanity/client";
import { NextRequest, NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { author, pet, service, quote, rating } = body;

    if (!author || !quote || quote.length < 10) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    await writeClient.create({
      _type: "testimonial",
      quote_es: quote.trim(),
      author: author.trim(),
      pet: pet?.trim() ?? "",
      service_es: service?.trim() ?? "",
      rating: Number(rating) || 5,
      active: false,
      order: 99,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}
