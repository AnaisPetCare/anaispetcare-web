"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Star, ChevronLeft, ChevronRight, Quote, Send, CheckCircle } from "lucide-react";

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

const SERVICES_ES = [
  "Hospedaje en Mi Hogar",
  "Cuidado en Tu Hogar",
  "Visitas Diarias",
  "Cuidado por Horas",
  "Acompañamiento en Eventos",
  "Baños e Higiene",
];

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          className="cursor-pointer"
        >
          <Star
            size={22}
            className={n <= (hover || value) ? "text-rose fill-rose" : "text-cream-border"}
          />
        </button>
      ))}
    </div>
  );
}

function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const body = {
      author: fd.get("author"),
      pet: fd.get("pet"),
      service: fd.get("service"),
      quote: fd.get("quote"),
      rating,
    };
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Hubo un problema al enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-cream rounded-xl border border-cream-border px-4 py-3 font-body text-sm text-brown-dark placeholder:text-brown-dark/40 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-all";
  const labelClass = "block font-body text-sm font-semibold text-brown-dark mb-1.5";

  if (sent) {
    return (
      <div className="bg-white rounded-3xl border border-cream-border p-8 text-center">
        <CheckCircle size={40} className="text-rose mx-auto mb-3" />
        <h4 className="font-heading font-bold text-lg text-brown-dark mb-2">¡Gracias por tu comentario!</h4>
        <p className="font-body text-sm text-brown-dark/60">Lo revisaremos pronto y lo publicaremos en el sitio 🐾</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-cream-border p-8 space-y-4">
      <h4 className="font-heading font-bold text-xl text-brown-dark">Deja tu reseña</h4>
      <p className="font-body text-sm text-brown-dark/50">Tu comentario será revisado antes de publicarse.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tu nombre *</label>
          <input name="author" required placeholder="Ej: María Camila" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Nombre de tu mascota</label>
          <input name="pet" placeholder="Ej: Max · Golden Retriever" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Servicio que usaste</label>
        <select name="service" className={inputClass}>
          <option value="">Selecciona un servicio</option>
          {SERVICES_ES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className={labelClass}>Tu calificación *</label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      <div>
        <label className={labelClass}>Tu comentario *</label>
        <textarea name="quote" required rows={4} placeholder="Cuéntanos cómo fue la experiencia de tu peludo..." className={`${inputClass} resize-none`} />
      </div>

      {error && <p className="font-body text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 bg-rose text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md disabled:opacity-60 cursor-pointer"
      >
        <Send size={15} />
        {loading ? "Enviando..." : "Enviar reseña"}
      </button>
    </form>
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

        {/* Formulario de reseña */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-2xl text-brown-dark mb-2">
              ¿Ya usaste nuestros servicios?
            </h3>
            <p className="font-body text-brown-dark/50 text-sm">
              Cuéntanos tu experiencia. Lo revisaremos y lo publicaremos aquí 🐾
            </p>
          </div>
          <ReviewForm />
        </div>
      </div>
    </section>
  );
}
