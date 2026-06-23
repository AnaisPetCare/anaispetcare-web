import { defineField, defineType } from "sanity";

export const faqItem = defineType({
  name: "faqItem",
  title: "Pregunta frecuente",
  type: "document",
  fields: [
    defineField({ name: "question_es", title: "Pregunta (Español)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "question_en", title: "Question (English)", type: "string" }),
    defineField({ name: "answer_es", title: "Respuesta (Español)", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "answer_en", title: "Answer (English)", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Orden", type: "number" }),
    defineField({ name: "active", title: "Visible en el sitio", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "question_es" },
  },
});
