"use client";
import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface Props { title?: string; subtitle?: string; whatsapp?: string; buttonLabel?: string; }

export function ContactFormBlock({ title, subtitle, whatsapp = "573208504292", buttonLabel = "Enviar por WhatsApp" }: Props) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = encodeURIComponent(`Hola, soy ${name}.\n\n${message}`);
    window.open(`https://wa.me/${whatsapp}?text=${text}`, "_blank");
  };

  const inputClass = "w-full bg-cream rounded-xl border border-cream-border px-4 py-3 font-body text-sm text-brown-dark placeholder:text-brown-dark/40 focus:outline-none focus:ring-2 focus:ring-rose/30 focus:border-rose transition-all";

  return (
    <section className="py-20 px-6 bg-cream-dark">
      <div className="max-w-xl mx-auto">
        {title && <h2 className="font-heading text-3xl font-bold text-brown-dark text-center mb-3">{title}</h2>}
        {subtitle && <p className="font-body text-brown-dark/60 text-center mb-8">{subtitle}</p>}
        <div className="bg-white rounded-3xl border border-cream-border p-8 space-y-4 shadow-sm">
          <div>
            <label className="block font-body text-sm font-semibold text-brown-dark mb-1.5">Tu nombre</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: María Camila" className={inputClass} />
          </div>
          <div>
            <label className="block font-body text-sm font-semibold text-brown-dark mb-1.5">Tu mensaje</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Escribe tu pregunta o mensaje..." className={`${inputClass} resize-none`} />
          </div>
          <button
            onClick={handleSend}
            disabled={!name || !message}
            className="flex items-center justify-center gap-2 w-full bg-rose text-white font-body font-semibold py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <MessageCircle size={16} />
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
