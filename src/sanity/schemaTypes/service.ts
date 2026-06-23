import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",
  fields: [
    defineField({ name: "name_es", title: "Nombre (Español)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name_en", title: "Nombre (English)", type: "string" }),

    defineField({ name: "description_es", title: "Descripción de la card (Español)", type: "text", rows: 3, validation: (r) => r.required(), description: "Texto corto visible en la tarjeta del servicio" }),
    defineField({ name: "description_en", title: "Card description (English)", type: "text", rows: 3 }),

    defineField({ name: "detail_es", title: "Detalle del modal (Español)", type: "text", rows: 4, description: "Párrafo(s) de introducción en el modal. Separa párrafos con una línea en blanco." }),
    defineField({ name: "detail_en", title: "Modal detail (English)", type: "text", rows: 4 }),

    defineField({
      name: "card_includes_es",
      title: "Etiquetas de la card (Español)",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista corta de ítems que aparece en la tarjeta (preview). Ej: Pet Sitting, Estadías cortas...",
    }),
    defineField({
      name: "card_includes_en",
      title: "Card tags (English)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "includes_es",
      title: "¿Qué incluye? (Español)",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista de ítems incluidos en el servicio",
    }),
    defineField({
      name: "includes_en",
      title: "What's included? (English)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "why_higher_es",
      title: "¿Por qué tiene un valor más alto? (Español)",
      type: "array",
      of: [{ type: "string" }],
      description: "Solo para el servicio de pernocta. Explica por qué el precio es mayor.",
    }),
    defineField({
      name: "why_higher_en",
      title: "Why higher price? (English)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({ name: "ideal_es", title: "Ideal para (Español)", type: "text", rows: 2, description: "Tipos de eventos o contextos recomendados. Ej: Bodas · Cumpleaños..." }),
    defineField({ name: "ideal_en", title: "Ideal for (English)", type: "text", rows: 2 }),

    defineField({
      name: "benefits_es",
      title: "Beneficios (Español)",
      type: "array",
      of: [{ type: "string" }],
      description: "Lista de beneficios. Solo para Acompañamiento en Eventos.",
    }),
    defineField({
      name: "benefits_en",
      title: "Benefits (English)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({
      name: "conditions_es",
      title: "Condiciones (Español)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "conditions_en",
      title: "Conditions (English)",
      type: "array",
      of: [{ type: "string" }],
    }),

    defineField({ name: "footer_note_es", title: "Nota de cierre (Español)", type: "text", rows: 2, description: "Frase inspiracional al final del modal (pernocta y eventos)." }),
    defineField({ name: "footer_note_en", title: "Closing note (English)", type: "text", rows: 2 }),

    defineField({ name: "price_large", title: "Precio razas grandes / tarifa base (COP)", type: "string", description: "Ej: 60.000" }),
    defineField({ name: "price_small", title: "Precio razas pequeñas (COP)", type: "string", description: "Ej: 40.000 — solo para hospedaje" }),
    defineField({ name: "price_note_es", title: "Nota de precio (Español)", type: "string", description: "Texto informativo sobre el precio: variaciones, transporte, horas adicionales, etc." }),
    defineField({ name: "price_note_en", title: "Price note (English)", type: "string" }),

    defineField({ name: "unit_es", title: "Unidad (Español)", type: "string", description: "noche, día, evento..." }),
    defineField({ name: "unit_en", title: "Unit (English)", type: "string" }),

    defineField({
      name: "icon",
      title: "Ícono",
      type: "string",
      options: {
        list: [
          { title: "🏠 Hogar", value: "home" },
          { title: "🌙 Noche", value: "moon" },
          { title: "⏰ Reloj / Horas", value: "clock" },
          { title: "📷 Cámara / Eventos", value: "camera" },
          { title: "🚿 Baños", value: "droplets" },
        ],
        layout: "radio",
      },
    }),

    defineField({ name: "order", title: "Orden de aparición", type: "number" }),
    defineField({ name: "active", title: "Visible en el sitio", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name_es", subtitle: "price_large" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `$${subtitle} COP` : "Sin precio fijo" };
    },
  },
});
