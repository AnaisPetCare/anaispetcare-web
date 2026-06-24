"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  pet: string;
  service: string;
  rating: number;
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "text-rose fill-rose" : "text-cream-border"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <div className="bg-white rounded-3xl p-7 border border-cream-border shadow-sm flex flex-col gap-4 h-full">
      <div className="flex items-start justify-between">
        <Stars count={item.rating} />
        <Quote size={20} className="text-rose/20 shrink-0" />
      </div>
      <p className="font-body text-brown-dark/70 text-sm leading-relaxed flex-1 italic">
        "{item.quote}"
      </p>
      <div className="border-t border-cream-border pt-4">
        <p className="font-body font-semibold text-brown-dark text-sm">{item.author}</p>
        <p className="font-body text-xs text-brown-dark/40 mt-0.5">{item.pet}</p>
        <span className="inline-block mt-2 text-[10px] font-body font-semibold text-rose bg-rose-pale px-2.5 py-1 rounded-full uppercase tracking-wide">
          {item.service}
        </span>
      </div>
    </div>
  );
}

export function Testimonials({ serverItems }: { serverItems?: TestimonialItem[] }) {
  const t = useTranslations("testimonials");
  const fallback: TestimonialItem[] = t.raw("items");
  const items = serverItems && serverItems.length > 0 ? serverItems : fallback;

  const [current, setCurrent] = useState(0);
  const visible = 3;
  const canPrev = current > 0;
  const canNext = current + visible < items.length;

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Testimonios
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.slice(current, current + visible).map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>

        {/* Navegación — solo si hay más de 3 */}
        {items.length > visible && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={!canPrev}
              className="w-10 h-10 rounded-full border border-cream-border bg-white flex items-center justify-center hover:border-rose/40 hover:bg-rose-pale transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={18} className="text-brown-dark" />
            </button>
            <span className="font-body text-xs text-brown-dark/40">
              {Math.floor(current / visible) + 1} / {Math.ceil(items.length / visible)}
            </span>
            <button
              onClick={() => setCurrent((c) => Math.min(items.length - visible, c + 1))}
              disabled={!canNext}
              className="w-10 h-10 rounded-full border border-cream-border bg-white flex items-center justify-center hover:border-rose/40 hover:bg-rose-pale transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={18} className="text-brown-dark" />
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="font-body text-brown-dark/50 text-sm mb-4">
            ¿Ya usaste nuestros servicios? Cuéntanos tu experiencia
          </p>
          <a
            href="https://wa.me/573208504292?text=Hola%20Anais!%20Quiero%20dejar%20un%20comentario%20sobre%20el%20servicio%20🐾"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md hover:shadow-lg text-sm"
          >
            💬 Dejar un comentario
          </a>
        </div>
      </div>
    </section>
  );
}
