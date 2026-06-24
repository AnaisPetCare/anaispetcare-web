import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero / Encabezado",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título principal", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "buttonLabel", title: "Texto del botón", type: "string" }),
    defineField({ name: "buttonLink", title: "Enlace del botón", type: "string", description: 'Ej: /es/contacto o #booking' }),
    defineField({ name: "image", title: "Imagen de fondo", type: "image", options: { hotspot: true } }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Hero: ${title}` }) },
});

export const textBlock = defineType({
  name: "textBlock",
  title: "Bloque de texto",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "body", title: "Contenido", type: "text", rows: 5 }),
    defineField({ name: "align", title: "Alineación", type: "string", options: { list: ["left", "center", "right"], layout: "radio" }, initialValue: "center" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Texto: ${title ?? "(sin título)"}` }) },
});

export const imageBlock = defineType({
  name: "imageBlock",
  title: "Imagen",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Pie de foto", type: "string" }),
    defineField({ name: "fullWidth", title: "Ancho completo", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "caption", media: "image" }, prepare: ({ title, media }) => ({ title: `Imagen: ${title ?? ""}`, media }) },
});

export const cardsBlock = defineType({
  name: "cardsBlock",
  title: "Cuadrícula de tarjetas",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título de sección", type: "string" }),
    defineField({
      name: "cards",
      title: "Tarjetas",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Emoji / Ícono", type: "string" }),
          defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
          defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
          defineField({ name: "buttonLabel", title: "Botón (opcional)", type: "string" }),
          defineField({ name: "buttonLink", title: "Enlace del botón", type: "string" }),
        ],
        preview: { select: { title: "title", subtitle: "icon" } },
      }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Tarjetas: ${title ?? ""}` }) },
});

export const ctaBlock = defineType({
  name: "ctaBlock",
  title: "Llamada a la acción (CTA)",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "buttonLabel", title: "Texto del botón", type: "string" }),
    defineField({ name: "buttonLink", title: "Enlace", type: "string" }),
    defineField({ name: "background", title: "Fondo", type: "string", options: { list: ["cream", "rose", "dark"], layout: "radio" }, initialValue: "cream" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `CTA: ${title}` }) },
});
