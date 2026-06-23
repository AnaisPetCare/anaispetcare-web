import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certificación",
  type: "document",
  fields: [
    defineField({ name: "name_es", title: "Nombre (Español)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name_en", title: "Name (English)", type: "string" }),
    defineField({ name: "institution", title: "Institución certificadora", type: "string" }),
    defineField({ name: "year", title: "Año", type: "string", description: "Ej: 2023" }),
    defineField({ name: "description_es", title: "Descripción (Español)", type: "text", rows: 3 }),
    defineField({ name: "description_en", title: "Description (English)", type: "text", rows: 3 }),
    defineField({
      name: "image",
      title: "Foto del certificado",
      type: "image",
      options: { hotspot: false },
      description: "Sube la foto o scan del certificado físico.",
    }),
    defineField({ name: "order", title: "Orden de aparición", type: "number" }),
    defineField({ name: "active", title: "Visible en el sitio", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name_es", subtitle: "institution", media: "image" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ?? "Sin institución", media };
    },
  },
});
