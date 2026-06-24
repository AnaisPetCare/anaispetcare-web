import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonios",
  type: "document",
  fields: [
    defineField({ name: "quote_es", title: "Comentario (ES)", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "quote_en", title: "Comentario (EN)", type: "text", rows: 3 }),
    defineField({ name: "author", title: "Nombre del cliente", type: "string", validation: (r) => r.required() }),
    defineField({ name: "pet", title: "Mascota y raza", type: "string", description: 'Ej: "Max · Golden Retriever"' }),
    defineField({ name: "service_es", title: "Servicio (ES)", type: "string" }),
    defineField({ name: "service_en", title: "Servicio (EN)", type: "string" }),
    defineField({ name: "rating", title: "Calificación (1-5)", type: "number", validation: (r) => r.min(1).max(5), initialValue: 5 }),
    defineField({ name: "order", title: "Orden", type: "number" }),
    defineField({ name: "active", title: "Visible en el sitio", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "author", subtitle: "quote_es" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 60) + "..." };
    },
  },
});
