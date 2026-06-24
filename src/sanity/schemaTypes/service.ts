import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Servicio",
  type: "document",

  groups: [
    { name: "general", title: "🎯 General", default: true },
    { name: "precio",  title: "💰 Precio" },
    { name: "tarjeta", title: "🃏 Tarjeta (preview)" },
    { name: "modal",   title: "📖 Modal (detalle)" },
  ],

  fields: [
    // ─── General ──────────────────────────────────────────────────────────────
    defineField({ group: "general", name: "name_es", title: "Nombre (ES) *", type: "string", validation: (r) => r.required() }),
    defineField({ group: "general", name: "name_en", title: "Nombre (EN)", type: "string" }),
    defineField({ group: "general", name: "description_es", title: "Descripción corta (ES) *", type: "text", rows: 2, description: "Texto visible bajo el nombre en la tarjeta", validation: (r) => r.required() }),
    defineField({ group: "general", name: "description_en", title: "Descripción corta (EN)", type: "text", rows: 2 }),
    defineField({
      group: "general", name: "icon", title: "Ícono", type: "string",
      options: { list: [
        { title: "🏠 Hogar", value: "home" },
        { title: "🌙 Noche / Pernocta", value: "moon" },
        { title: "⏰ Reloj / Horas", value: "clock" },
        { title: "📷 Cámara / Eventos", value: "camera" },
        { title: "🚿 Gota / Baños", value: "droplets" },
      ], layout: "radio" },
    }),
    defineField({ group: "general", name: "order", title: "Orden de aparición", type: "number" }),
    defineField({ group: "general", name: "active", title: "Visible en el sitio", type: "boolean", initialValue: true }),

    // ─── Precio ───────────────────────────────────────────────────────────────
    defineField({ group: "precio", name: "price_large", title: "💲 Precio principal — aparece en la tarjeta (COP)", type: "string", description: 'Ej: 60.000  —  Dejar vacío para mostrar "Consultar"' }),
    defineField({ group: "precio", name: "price_small", title: "Precio alternativo / razas pequeñas (COP)", type: "string", description: "Opcional. Se muestra debajo del precio principal en el modal. Ej: 40.000" }),
    defineField({ group: "precio", name: "unit_es", title: "Unidad (ES)", type: "string", description: "noche, día, evento, hora..." }),
    defineField({ group: "precio", name: "unit_en", title: "Unit (EN)", type: "string" }),
    defineField({ group: "precio", name: "price_note_es", title: "Nota de precio (ES)", type: "string", description: "Ej: Primeras 2h · $30.000/hora adicional" }),
    defineField({ group: "precio", name: "price_note_en", title: "Price note (EN)", type: "string" }),

    // ─── Tarjeta ──────────────────────────────────────────────────────────────
    defineField({ group: "tarjeta", name: "card_includes_es", title: "Puntos clave en la tarjeta (ES)", type: "array", of: [{ type: "string" }], description: "Lista corta de 3-5 ítems que aparece como viñetas en la tarjeta preview" }),
    defineField({ group: "tarjeta", name: "card_includes_en", title: "Card key points (EN)", type: "array", of: [{ type: "string" }] }),

    // ─── Modal ────────────────────────────────────────────────────────────────
    defineField({ group: "modal", name: "detail_es", title: "Descripción larga (ES)", type: "text", rows: 4, description: "Párrafos de introducción en el modal. Separa párrafos con una línea en blanco." }),
    defineField({ group: "modal", name: "detail_en", title: "Long description (EN)", type: "text", rows: 4 }),

    defineField({ group: "modal", name: "includes_es", title: "¿Qué incluye? (ES)", type: "array", of: [{ type: "string" }] }),
    defineField({ group: "modal", name: "includes_en", title: "What's included? (EN)", type: "array", of: [{ type: "string" }] }),

    defineField({ group: "modal", name: "ideal_es", title: "Ideal para (ES)", type: "text", rows: 2, description: "Ej: Bodas · Cumpleaños · Sesiones fotográficas" }),
    defineField({ group: "modal", name: "ideal_en", title: "Ideal for (EN)", type: "text", rows: 2 }),

    defineField({ group: "modal", name: "benefits_es", title: "Beneficios (ES)", type: "array", of: [{ type: "string" }], description: "Solo para el servicio de eventos" }),
    defineField({ group: "modal", name: "benefits_en", title: "Benefits (EN)", type: "array", of: [{ type: "string" }] }),

    defineField({ group: "modal", name: "why_higher_es", title: "¿Por qué tiene un valor más alto? (ES)", type: "array", of: [{ type: "string" }], description: "Solo para pernocta" }),
    defineField({ group: "modal", name: "why_higher_en", title: "Why higher price? (EN)", type: "array", of: [{ type: "string" }] }),

    defineField({ group: "modal", name: "conditions_es", title: "Condiciones (ES)", type: "array", of: [{ type: "string" }] }),
    defineField({ group: "modal", name: "conditions_en", title: "Conditions (EN)", type: "array", of: [{ type: "string" }] }),

    defineField({ group: "modal", name: "footer_note_es", title: "Frase de cierre (ES)", type: "text", rows: 2, description: "Frase inspiracional al final del modal" }),
    defineField({ group: "modal", name: "footer_note_en", title: "Closing quote (EN)", type: "text", rows: 2 }),
  ],

  orderings: [{ title: "Orden", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name_es", price: "price_large", unit: "unit_es" },
    prepare({ title, price, unit }) {
      return {
        title: title ?? "(sin nombre)",
        subtitle: price ? `$${price} / ${unit ?? ""}` : "Sin precio fijo",
      };
    },
  },
});
