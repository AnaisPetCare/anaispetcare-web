import { defineField, defineType } from "sanity";

export const requirementItem = defineType({
  name: "requirementItem",
  title: "Requisito",
  type: "document",
  fields: [
    defineField({
      name: "icon", title: "Ícono", type: "string",
      options: { list: [
        { title: "💉 Jeringa (vacunas)", value: "syringe" },
        { title: "🐛 Bug (desparasitado)", value: "bug" },
        { title: "💊 Píldora (medicamentos)", value: "pill" },
        { title: "⚠️ Alerta (miedos/cuidados)", value: "alert" },
        { title: "🍴 Comida", value: "utensils" },
        { title: "❤️ Corazón", value: "heart" },
        { title: "📅 Calendario (reserva)", value: "calendar" },
        { title: "📋 Portapapeles (visita)", value: "clipboard" },
      ], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title_es", title: "Título (ES) *", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Título (EN)", type: "string", description: "Si no se llena, se muestra el español." }),
    defineField({ name: "description_es", title: "Descripción (ES) *", type: "text", rows: 2 }),
    defineField({ name: "description_en", title: "Descripción (EN)", type: "text", rows: 2, description: "Si no se llena, se muestra el español." }),
    defineField({ name: "order", title: "Orden", type: "number" }),
    defineField({ name: "active", title: "Activo", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "title_es", subtitle: "icon" },
    prepare: ({ title, subtitle }) => ({ title: title ?? "(sin título)", subtitle: subtitle }),
  },
});
