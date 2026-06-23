/**
 * Carga todo el contenido del JSON al CMS de Sanity.
 *
 * Requisitos:
 *   1. Ve a https://sanity.io/manage → tu proyecto → API → Tokens
 *   2. Crea un token con permisos "Editor"
 *   3. Agrégalo a .env.local:  SANITY_API_WRITE_TOKEN=sk...
 *   4. Ejecuta:  node scripts/seed-sanity.mjs
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Falta SANITY_API_WRITE_TOKEN en .env.local");
  console.error("   Ve a sanity.io/manage → tu proyecto → API → Tokens");
  console.error("   Crea un token 'Editor' y agrégalo al .env.local\n");
  process.exit(1);
}

const client = createClient({
  projectId: "6q4qoj9r",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const ROOT = path.join(__dirname, "../src/i18n/messages");
const es = JSON.parse(readFileSync(path.join(ROOT, "es.json"), "utf8"));
const en = JSON.parse(readFileSync(path.join(ROOT, "en.json"), "utf8"));

// ─── Servicios ────────────────────────────────────────────────────────────────
async function seedServices() {
  console.log("\n🐾 Servicios...");
  const esItems = es.services.items;
  const enItems = en.services.items;

  for (const [i, item] of esItems.entries()) {
    const enItem = enItems.find((e) => e.id === item.id) ?? {};
    await client.createOrReplace({
      _id: `service-${item.id}`,
      _type: "service",
      name_es: item.name,
      name_en: enItem.name ?? "",
      description_es: item.description ?? "",
      description_en: enItem.description ?? "",
      detail_es: item.detail ?? "",
      detail_en: enItem.detail ?? "",
      card_includes_es: item.card_includes ?? [],
      card_includes_en: enItem.card_includes ?? [],
      includes_es: item.includes ?? [],
      includes_en: enItem.includes ?? [],
      why_higher_es: item.why_higher ?? [],
      why_higher_en: enItem.why_higher ?? [],
      benefits_es: item.benefits ?? [],
      benefits_en: enItem.benefits ?? [],
      ideal_es: item.ideal ?? "",
      ideal_en: enItem.ideal ?? "",
      conditions_es: item.conditions ?? [],
      conditions_en: enItem.conditions ?? [],
      footer_note_es: item.footer_note ?? "",
      footer_note_en: enItem.footer_note ?? "",
      price_large: item.price_large ?? "",
      price_small: item.price_small ?? "",
      price_note_es: item.note ?? "",
      price_note_en: enItem.note ?? "",
      unit_es: item.unit ?? "",
      unit_en: enItem.unit ?? "",
      icon: item.icon,
      order: i + 1,
      active: true,
    });
    console.log(`   ✓ ${item.name}`);
  }
}

// ─── Certificaciones ──────────────────────────────────────────────────────────
async function seedCertifications() {
  console.log("\n🏆 Certificaciones...");
  const esItems = es.certifications.items;
  const enItems = en.certifications.items;

  for (const [i, item] of esItems.entries()) {
    const enItem = enItems.find((e) => e.id === item.id) ?? {};
    await client.createOrReplace({
      _id: `certification-${item.id}`,
      _type: "certification",
      name_es: item.name,
      name_en: enItem.name ?? "",
      institution: item.institution ?? "",
      year: item.year ?? "",
      description_es: item.description ?? "",
      description_en: enItem.description ?? "",
      order: i + 1,
      active: true,
    });
    console.log(`   ✓ ${item.name}`);
  }
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
async function seedFaq() {
  console.log("\n❓ FAQ...");
  const esItems = es.faq.items;
  const enItems = en.faq.items;

  for (const [i, item] of esItems.entries()) {
    const enItem = enItems[i] ?? {};
    await client.createOrReplace({
      _id: `faq-${String(i + 1).padStart(2, "0")}`,
      _type: "faqItem",
      question_es: item.q,
      question_en: enItem.q ?? "",
      answer_es: item.a,
      answer_en: enItem.a ?? "",
      order: i + 1,
      active: true,
    });
    console.log(`   ✓ ${item.q.slice(0, 55)}...`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Iniciando carga de contenido al CMS...");
  try {
    await seedServices();
    await seedCertifications();
    await seedFaq();
    console.log("\n✅ Todo el contenido fue cargado exitosamente.");
    console.log("   Ábrelo en: http://localhost:3020/studio\n");
  } catch (err) {
    console.error("\n❌ Error:", err.message);
    process.exit(1);
  }
}

main();
