import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const TYPES = ["service", "certification", "faqItem", "testimonial", "requirementItem", "settings"];

export async function POST() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!token) return NextResponse.json({ error: "No write token" }, { status: 500 });

  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6q4qoj9r",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    apiVersion: "2024-01-01",
    token,
    useCdn: false,
  });

  const deleted: string[] = [];
  for (const type of TYPES) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (ids.length === 0) continue;
    const tx = client.transaction();
    ids.forEach((id) => tx.delete(id));
    await tx.commit();
    deleted.push(`${type}(${ids.length})`);
  }

  return NextResponse.json({ ok: true, deleted, secret });
}
