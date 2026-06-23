import { defineField, defineType } from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "Galería de fotos",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Fotos",
      type: "array",
      description: "Arrastra para reordenar. Puedes subir varias fotos a la vez.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Pie de foto (opcional)",
              type: "string",
              description: 'Texto que aparece al pasar el cursor. Ej: "Luna jugando en el jardín"',
            }),
            defineField({
              name: "active",
              title: "Visible en el sitio",
              type: "boolean",
              initialValue: true,
            }),
          ],
          preview: {
            select: { title: "caption", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Sin pie de foto", media };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Galería de fotos" };
    },
  },
});
