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
    defineField({ name: "showInNav", title: "📌 Mostrar en el menú de navegación", type: "boolean", initialValue: false }),
    defineField({ name: "navLabel", title: "Nombre en el menú (opcional)", type: "string", description: "Si no lo pones, se usa el título de la página." }),
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
        { type: "accordionBlock" },
        { type: "galleryBlock" },
        { type: "twoColumnsBlock" },
        { type: "videoBlock" },
        { type: "mapBlock" },
        { type: "separatorBlock" },
        { type: "contactFormBlock" },
        { type: "bannerBlock" },
        { type: "stepsBlock" },
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
