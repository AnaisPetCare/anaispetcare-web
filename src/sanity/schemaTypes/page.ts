import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Páginas",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nombre de la página", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL de la página",
      type: "slug",
      description: 'Ej: "sobre-mi" → el sitio la publica en /es/sobre-mi',
      options: { source: "title", maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "active", title: "✅ Publicada — visible en el sitio", type: "boolean", initialValue: false }),
    defineField({
      name: "blocks",
      title: "Secciones de la página",
      type: "array",
      of: [
        { type: "heroBlock" },
        { type: "textBlock" },
        { type: "imageBlock" },
        { type: "cardsBlock" },
        { type: "ctaBlock" },
      ],
      description: "Añade, elimina y reordena las secciones. Cada tipo de bloque tiene sus propios campos.",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current", active: "active" },
    prepare: ({ title, slug, active }) => ({
      title,
      subtitle: `/${slug} ${active ? "✅" : "⏸ borrador"}`,
    }),
  },
});
