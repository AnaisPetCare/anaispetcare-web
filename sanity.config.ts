import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { SeedTool } from "./src/sanity/tools/SeedTool";

export default defineConfig({
  name: "anaispetcare",
  title: "Anais Pet Care · CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "placeholder",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Panel de contenido")
          .items([
            S.listItem()
              .title("⚙️ Configuración general")
              .child(S.document().schemaType("settings").documentId("settings")),
            S.divider(),
            S.listItem()
              .title("🐾 Servicios")
              .child(S.documentTypeList("service").title("Servicios")),
            S.listItem()
              .title("🏆 Certificaciones")
              .child(S.documentTypeList("certification").title("Certificaciones")),
            S.listItem()
              .title("📸 Galería de fotos")
              .child(S.documentTypeList("galleryImage").title("Fotos")),
            S.listItem()
              .title("📋 Requisitos de ingreso")
              .child(S.documentTypeList("requirementItem").title("Requisitos")),
            S.listItem()
              .title("❓ Preguntas frecuentes")
              .child(S.documentTypeList("faqItem").title("Preguntas")),
            S.listItem()
              .title("💬 Testimonios")
              .child(S.documentTypeList("testimonial").title("Testimonios")),
            S.divider(),
            S.listItem()
              .title("📄 Páginas")
              .child(S.documentTypeList("page").title("Páginas")),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
  tools: (prev) => [
    ...prev,
    {
      name: "seed-tool",
      title: "🌱 Seed",
      component: SeedTool,
    },
  ],
});
