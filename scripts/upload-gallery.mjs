/**
 * Sube todas las fotos de una carpeta a la galería de Sanity.
 *
 * Uso:
 *   1. Pon todas tus fotos en una carpeta (ej: ~/Desktop/fotos-anais/)
 *   2. Ejecuta:  node scripts/upload-gallery.mjs /ruta/a/tu/carpeta
 *
 * Formatos soportados: JPG, JPEG, PNG, WEBP, AVIF
 * El nombre del archivo se usa como pie de foto (opcional).
 */

import { createClient } from "@sanity/client";
import { readFileSync, readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import * as dotenv from "dotenv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env.local") });

const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Falta SANITY_API_WRITE_TOKEN en .env.local\n");
  process.exit(1);
}

const folder = process.argv[2];
if (!folder) {
  console.error("\n❌ Indica la carpeta con las fotos:");
  console.error("   node scripts/upload-gallery.mjs /ruta/a/la/carpeta\n");
  process.exit(1);
}

const EXTS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

const client = createClient({
  projectId: "6q4qoj9r",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

function captionFromFilename(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function uploadImage(filePath) {
  const buffer = readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase().replace(".", "");
  const mimeMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", avif: "image/avif" };
  const contentType = mimeMap[ext] ?? "image/jpeg";

  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
    contentType,
  });

  return asset._id;
}

async function main() {
  const absFolder = path.resolve(folder);

  let files;
  try {
    files = readdirSync(absFolder)
      .filter((f) => EXTS.includes(path.extname(f).toLowerCase()))
      .filter((f) => statSync(path.join(absFolder, f)).isFile())
      .sort();
  } catch {
    console.error(`\n❌ No se pudo leer la carpeta: ${absFolder}\n`);
    process.exit(1);
  }

  if (files.length === 0) {
    console.error(`\n❌ No se encontraron fotos en: ${absFolder}`);
    console.error(`   Formatos válidos: ${EXTS.join(", ")}\n`);
    process.exit(1);
  }

  console.log(`\n📸 Subiendo ${files.length} foto(s) desde:\n   ${absFolder}\n`);

  // Saber cuántos documentos de galería ya existen para asignar orden correlativo
  const existing = await client.fetch(`count(*[_type == "galleryImage"])`);

  for (const [i, filename] of files.entries()) {
    const filePath = path.join(absFolder, filename);
    const caption = captionFromFilename(filename);
    const order = existing + i + 1;

    process.stdout.write(`   [${i + 1}/${files.length}] ${filename} ... `);

    try {
      const assetId = await uploadImage(filePath);
      await client.create({
        _type: "galleryImage",
        image: { _type: "image", asset: { _type: "reference", _ref: assetId } },
        caption,
        order,
        active: true,
      });
      console.log("✓");
    } catch (err) {
      console.log(`❌ ${err.message}`);
    }
  }

  console.log("\n✅ Listo. Ábrelo en el Studio para ajustar pies de foto:");
  console.log("   http://localhost:3020/studio\n");
}

main();
