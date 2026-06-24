"use client";
import { Builder } from "@builder.io/react";

// Registra aquí los componentes que Katherine puede usar en el editor visual
// Cada componente aparece en el panel de Builder con los inputs que definas

Builder.registerComponent(
  ({ title, subtitle }: { title: string; subtitle: string }) => (
    <section className="py-20 px-6 text-center bg-cream">
      <h2 className="font-heading text-4xl font-bold text-brown-dark mb-4">{title}</h2>
      <p className="font-body text-lg text-brown-dark/60">{subtitle}</p>
    </section>
  ),
  {
    name: "TextBlock",
    friendlyName: "Bloque de texto",
    inputs: [
      { name: "title", type: "string", defaultValue: "Título de sección" },
      { name: "subtitle", type: "string", defaultValue: "Subtítulo descriptivo" },
    ],
  }
);

Builder.registerComponent(
  ({ src, alt, caption }: { src: string; alt: string; caption?: string }) => (
    <div className="py-10 px-6 flex flex-col items-center">
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="rounded-3xl max-w-2xl w-full object-cover shadow-md" />
      )}
      {caption && (
        <p className="font-body text-sm text-brown-dark/50 mt-3 italic">{caption}</p>
      )}
    </div>
  ),
  {
    name: "ImageBlock",
    friendlyName: "Imagen",
    inputs: [
      { name: "src", type: "file", allowedFileTypes: ["jpeg", "png", "webp"] },
      { name: "alt", type: "string", defaultValue: "Imagen" },
      { name: "caption", type: "string" },
    ],
  }
);

Builder.registerComponent(
  ({ label, href, variant = "primary" }: { label: string; href: string; variant?: string }) => (
    <div className="flex justify-center py-6">
      <a
        href={href}
        className={
          variant === "primary"
            ? "bg-rose text-white font-body font-semibold px-8 py-3 rounded-full shadow-md hover:bg-rose-hover transition-colors"
            : "border-2 border-rose text-rose font-body font-semibold px-8 py-3 rounded-full hover:bg-rose-pale transition-colors"
        }
      >
        {label}
      </a>
    </div>
  ),
  {
    name: "ButtonBlock",
    friendlyName: "Botón",
    inputs: [
      { name: "label", type: "string", defaultValue: "Agendar visita" },
      { name: "href", type: "string", defaultValue: "#booking" },
      {
        name: "variant",
        type: "string",
        enum: ["primary", "outline"],
        defaultValue: "primary",
      },
    ],
  }
);

Builder.registerComponent(
  ({ items }: { items: { icon: string; title: string; description: string }[] }) => (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.map((item, i) => (
          <div key={i} className="bg-white rounded-3xl p-7 border border-cream-border shadow-sm text-center">
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="font-heading font-bold text-lg text-brown-dark mb-2">{item.title}</h3>
            <p className="font-body text-sm text-brown-dark/60">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  ),
  {
    name: "CardsGrid",
    friendlyName: "Cuadrícula de tarjetas",
    inputs: [
      {
        name: "items",
        type: "list",
        subFields: [
          { name: "icon", type: "string", defaultValue: "🐾" },
          { name: "title", type: "string", defaultValue: "Servicio" },
          { name: "description", type: "string", defaultValue: "Descripción del servicio." },
        ],
        defaultValue: [
          { icon: "🐾", title: "Hospedaje", description: "Cuidado en el hogar de Anais." },
          { icon: "🛁", title: "Baños", description: "Higiene completa para tu mascota." },
          { icon: "🦮", title: "Paseos", description: "Ejercicio diario y diversión." },
        ],
      },
    ],
  }
);
