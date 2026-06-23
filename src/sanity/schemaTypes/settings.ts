import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Configuración general",
  type: "document",

  fields: [
    defineField({
      name: "whatsapp",
      title: "Número de WhatsApp",
      type: "string",
      description: "Solo números con código de país. Ej: 573208504292",
      validation: (r) => r.required(),
    }),
    defineField({ name: "instagram", title: "Usuario de Instagram", type: "string", description: "Sin @. Ej: anaispcareservices" }),
    defineField({ name: "email", title: "Correo electrónico", type: "string" }),
    defineField({
      name: "profilePhoto",
      title: "Foto de perfil (Sección 'Sobre mí')",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "about_es", title: "Texto 'Sobre mí' (Español)", type: "text", rows: 4 }),
    defineField({ name: "about_en", title: "About me text (English)", type: "text", rows: 4 }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración general" };
    },
  },
});
