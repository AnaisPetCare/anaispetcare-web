import { defineField, defineType } from "sanity";

export const settings = defineType({
  name: "settings",
  title: "Configuración general",
  type: "document",

  groups: [
    { name: "contact", title: "Contacto" },
    { name: "hero", title: "🏠 Hero (inicio)" },
    { name: "about", title: "👤 Sobre mí" },
  ],
  fields: [
    // ─── Contacto ───
    defineField({ name: "whatsapp", group: "contact", title: "Número de WhatsApp", type: "string", description: "Solo números con código de país. Ej: 573208504292", validation: (r) => r.required() }),
    defineField({ name: "instagram", group: "contact", title: "Usuario de Instagram", type: "string", description: "Sin @. Ej: anaispcareservices" }),
    defineField({ name: "email", group: "contact", title: "Correo electrónico", type: "string" }),

    // ─── Hero ───
    defineField({ name: "hero_badge", group: "hero", title: "Badge (ej: Medellín · Cuidado con amor)", type: "string" }),
    defineField({ name: "hero_title_es", group: "hero", title: "Título línea 1 (ES) — ej: Tu mascota,", type: "string" }),
    defineField({ name: "hero_title_en", group: "hero", title: "Título línea 1 (EN)", type: "string" }),
    defineField({ name: "hero_title_highlight_es", group: "hero", title: "Título línea 2 destacada (ES) — ej: nuestra familia", type: "string" }),
    defineField({ name: "hero_title_highlight_en", group: "hero", title: "Título línea 2 destacada (EN)", type: "string" }),
    defineField({ name: "hero_subtitle_es", group: "hero", title: "Tagline (ES) — ej: Atención personalizada...", type: "string" }),
    defineField({ name: "hero_subtitle_en", group: "hero", title: "Tagline (EN)", type: "string" }),
    defineField({ name: "hero_description_es", group: "hero", title: "Descripción (ES)", type: "text", rows: 3 }),
    defineField({ name: "hero_description_en", group: "hero", title: "Descripción (EN)", type: "text", rows: 3 }),

    // ─── Sobre mí ───
    defineField({ name: "profilePhoto", group: "about", title: "Foto de perfil", type: "image", options: { hotspot: true } }),
    defineField({ name: "about_title_es", group: "about", title: "Título (ES) — ej: Hola, soy Anais", type: "string" }),
    defineField({ name: "about_title_en", group: "about", title: "Título (EN)", type: "string" }),
    defineField({ name: "about_subtitle_es", group: "about", title: "Subtítulo (ES) — ej: Tu aliada en el cuidado de peludos", type: "string" }),
    defineField({ name: "about_subtitle_en", group: "about", title: "Subtítulo (EN)", type: "string" }),
    defineField({ name: "about_es", group: "about", title: "Texto 'Sobre mí' (ES)", type: "text", rows: 5 }),
    defineField({ name: "about_en", group: "about", title: "About me text (EN)", type: "text", rows: 5 }),
  ],
  preview: {
    prepare() {
      return { title: "Configuración general" };
    },
  },
});
