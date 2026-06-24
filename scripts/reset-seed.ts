/**
 * Deletes all seeded documents so checkAndSeed() runs fresh on next deploy.
 * Usage: npx tsx scripts/reset-seed.ts
 * Requires SANITY_API_WRITE_TOKEN and NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "6q4qoj9r",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const TYPES = ["service", "certification", "faqItem", "testimonial", "requirementItem", "settings"];

async function resetSeed() {
  for (const type of TYPES) {
    const ids = await client.fetch<string[]>(`*[_type == $type]._id`, { type });
    if (ids.length === 0) {
      console.log(`  ${type}: already empty`);
      continue;
    }
    const tx = client.transaction();
    ids.forEach((id) => tx.delete(id));
    await tx.commit();
    console.log(`  ${type}: deleted ${ids.length} document(s)`);
  }
  console.log("\nDone. Redeploy or restart the server to re-run the seed.");
}

resetSeed().catch(console.error);
