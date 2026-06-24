import { defineField, defineType } from "sanity";

export const heroBlock = defineType({
  name: "heroBlock", title: "Hero / Encabezado", type: "object",
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
  name: "textBlock", title: "Bloque de texto", type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "body", title: "Contenido", type: "text", rows: 5 }),
    defineField({ name: "align", title: "Alineación", type: "string", options: { list: ["left", "center", "right"], layout: "radio" }, initialValue: "center" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Texto: ${title ?? "(sin título)"}` }) },
});

export const imageBlock = defineType({
  name: "imageBlock", title: "Imagen", type: "object",
  fields: [
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Pie de foto", type: "string" }),
    defineField({ name: "fullWidth", title: "Ancho completo", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "caption", media: "image" }, prepare: ({ title, media }) => ({ title: `Imagen: ${title ?? ""}`, media }) },
});

export const cardsBlock = defineType({
  name: "cardsBlock", title: "Cuadrícula de tarjetas", type: "object",
  fields: [
    defineField({ name: "title", title: "Título de sección", type: "string" }),
    defineField({
      name: "cards", title: "Tarjetas", type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "icon", title: "Emoji / Ícono", type: "string" }),
        defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
        defineField({ name: "buttonLabel", title: "Botón (opcional)", type: "string" }),
        defineField({ name: "buttonLink", title: "Enlace del botón", type: "string" }),
      ], preview: { select: { title: "title", subtitle: "icon" } } }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Tarjetas: ${title ?? ""}` }) },
});

export const ctaBlock = defineType({
  name: "ctaBlock", title: "Llamada a la acción (CTA)", type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "buttonLabel", title: "Texto del botón", type: "string" }),
    defineField({ name: "buttonLink", title: "Enlace", type: "string" }),
    defineField({ name: "background", title: "Fondo", type: "string", options: { list: ["cream", "rose", "dark"], layout: "radio" }, initialValue: "cream" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `CTA: ${title}` }) },
});

export const accordionBlock = defineType({
  name: "accordionBlock", title: "Acordeón / Preguntas frecuentes", type: "object",
  fields: [
    defineField({ name: "title", title: "Título de sección", type: "string" }),
    defineField({
      name: "items", title: "Preguntas", type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "question", title: "Pregunta", type: "string", validation: (r) => r.required() }),
        defineField({ name: "answer", title: "Respuesta", type: "text", rows: 3, validation: (r) => r.required() }),
      ], preview: { select: { title: "question" } } }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Acordeón: ${title ?? ""}` }) },
});

export const galleryBlock = defineType({
  name: "galleryBlock", title: "Galería de fotos", type: "object",
  fields: [
    defineField({ name: "title", title: "Título de sección", type: "string" }),
    defineField({
      name: "images", title: "Fotos", type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "image", title: "Foto", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
        defineField({ name: "caption", title: "Pie de foto", type: "string" }),
      ], preview: { select: { media: "image", title: "caption" } } }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Galería: ${title ?? ""}` }) },
});

export const twoColumnsBlock = defineType({
  name: "twoColumnsBlock", title: "Dos columnas (texto + imagen)", type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string" }),
    defineField({ name: "body", title: "Texto", type: "text", rows: 5 }),
    defineField({ name: "image", title: "Imagen", type: "image", options: { hotspot: true } }),
    defineField({ name: "imageRight", title: "Imagen a la derecha", type: "boolean", initialValue: true }),
    defineField({ name: "buttonLabel", title: "Texto del botón (opcional)", type: "string" }),
    defineField({ name: "buttonLink", title: "Enlace del botón", type: "string" }),
  ],
  preview: { select: { title: "title", media: "image" }, prepare: ({ title, media }) => ({ title: `2 columnas: ${title ?? ""}`, media }) },
});

export const videoBlock = defineType({
  name: "videoBlock", title: "Video de YouTube", type: "object",
  fields: [
    defineField({ name: "title", title: "Título (opcional)", type: "string" }),
    defineField({ name: "url", title: "URL de YouTube", type: "url", description: 'Ej: https://www.youtube.com/watch?v=XXXXX o https://youtu.be/XXXXX', validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Pie de video", type: "string" }),
  ],
  preview: { select: { title: "title", subtitle: "url" }, prepare: ({ title, subtitle }) => ({ title: `Video: ${title ?? subtitle}` }) },
});

export const mapBlock = defineType({
  name: "mapBlock", title: "Mapa / Ubicación", type: "object",
  fields: [
    defineField({ name: "title", title: "Título (opcional)", type: "string" }),
    defineField({ name: "address", title: "Dirección completa", type: "string", description: 'Ej: Medellín, Antioquia, Colombia', validation: (r) => r.required() }),
    defineField({ name: "embedUrl", title: "URL de embed de Google Maps", type: "url", description: 'En Google Maps → Compartir → Insertar un mapa → copia la URL del src' }),
  ],
  preview: { select: { title: "title", subtitle: "address" }, prepare: ({ title, subtitle }) => ({ title: `Mapa: ${title ?? subtitle}` }) },
});

export const separatorBlock = defineType({
  name: "separatorBlock", title: "Separador / Espaciado", type: "object",
  fields: [
    defineField({ name: "style", title: "Estilo", type: "string", options: { list: ["space", "line", "paws"], layout: "radio" }, initialValue: "space" }),
    defineField({ name: "size", title: "Tamaño del espacio", type: "string", options: { list: ["small", "medium", "large"], layout: "radio" }, initialValue: "medium" }),
  ],
  preview: { select: { title: "style" }, prepare: ({ title }) => ({ title: `Separador (${title})` }) },
});

export const contactFormBlock = defineType({
  name: "contactFormBlock", title: "Formulario de contacto", type: "object",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", initialValue: "¿Tienes alguna pregunta?" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({ name: "whatsapp", title: "Número de WhatsApp", type: "string", description: 'Solo dígitos. Ej: 573208504292', initialValue: "573208504292" }),
    defineField({ name: "buttonLabel", title: "Texto del botón", type: "string", initialValue: "Enviar por WhatsApp" }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Formulario: ${title}` }) },
});

export const bannerBlock = defineType({
  name: "bannerBlock", title: "Banner de aviso", type: "object",
  fields: [
    defineField({ name: "icon", title: "Emoji / Ícono", type: "string", description: 'Ej: 🐾 ⚠️ 🎉' }),
    defineField({ name: "text", title: "Texto del banner", type: "string", validation: (r) => r.required() }),
    defineField({ name: "background", title: "Color de fondo", type: "string", options: { list: ["rose", "cream", "dark", "yellow"], layout: "radio" }, initialValue: "rose" }),
    defineField({ name: "buttonLabel", title: "Botón (opcional)", type: "string" }),
    defineField({ name: "buttonLink", title: "Enlace del botón", type: "string" }),
  ],
  preview: { select: { title: "text" }, prepare: ({ title }) => ({ title: `Banner: ${title}` }) },
});

export const stepsBlock = defineType({
  name: "stepsBlock", title: "Lista de pasos", type: "object",
  fields: [
    defineField({ name: "title", title: "Título de sección", type: "string" }),
    defineField({ name: "subtitle", title: "Subtítulo", type: "string" }),
    defineField({
      name: "steps", title: "Pasos", type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "title", title: "Título del paso", type: "string", validation: (r) => r.required() }),
        defineField({ name: "description", title: "Descripción", type: "text", rows: 2 }),
        defineField({ name: "icon", title: "Emoji / Ícono (opcional)", type: "string" }),
      ], preview: { select: { title: "title", subtitle: "description" } } }],
    }),
  ],
  preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: `Pasos: ${title ?? ""}` }) },
});
