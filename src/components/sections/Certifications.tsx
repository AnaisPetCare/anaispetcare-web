"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Award, Shield, HeartHandshake, X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface CertItem {
  id: string;
  name: string;
  institution: string;
  year: string;
  description: string;
  image?: string;
}

const ICONS = [Award, Shield, HeartHandshake];

function CertModal({ item, onClose }: { item: CertItem; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-brown-dark/50 backdrop-blur-sm" />

      <div
        className="relative z-10 bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-cream-border px-6 py-5 flex items-start justify-between rounded-t-3xl">
          <div>
            <h3 className="font-heading font-bold text-xl text-brown-dark leading-tight">{item.name}</h3>
            <p className="font-body text-sm text-brown-dark/50 mt-0.5">
              {item.institution}
              {item.year && <span className="ml-2">· {item.year}</span>}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center hover:bg-rose-pale transition-colors cursor-pointer shrink-0 ml-4"
          >
            <X size={16} className="text-brown-dark" />
          </button>
        </div>

        {/* Certificate image or placeholder */}
        <div className="p-6">
          {item.image ? (
            <div className="rounded-2xl overflow-hidden border border-cream-border shadow-sm">
              <Image
                src={item.image}
                alt={item.name}
                width={600}
                height={450}
                className="w-full h-auto object-contain"
                unoptimized
              />
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-cream-border bg-cream flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-rose-pale rounded-2xl flex items-center justify-center mb-4">
                <Award size={28} className="text-rose" />
              </div>
              <p className="font-heading font-semibold text-brown-dark mb-1">{item.name}</p>
              <p className="font-body text-sm text-brown-dark/40 mt-1">
                Imagen del certificado próximamente
              </p>
            </div>
          )}

          {item.description && (
            <p className="font-body text-sm text-brown-dark/60 leading-relaxed mt-5 border-t border-cream-border pt-4">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Certifications({ serverItems }: { serverItems?: CertItem[] }) {
  const t = useTranslations("certifications");
  const items = serverItems ?? [];
  const [selected, setSelected] = useState<CertItem | null>(null);

  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Formación profesional
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className="group text-left bg-white rounded-3xl p-6 border border-cream-border shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-rose/30 transition-all duration-300 cursor-pointer flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-rose-pale rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose/10 transition-colors">
                  <Icon size={24} className="text-rose" />
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-lg text-brown-dark mb-1 leading-tight">
                  {item.name}
                </h3>

                {/* Institution + year */}
                <p className="font-body text-xs text-brown-dark/40 mb-0.5">{item.institution}</p>
                {item.year && (
                  <p className="font-body text-xs text-brown-dark/30 mb-4">{item.year}</p>
                )}

                {/* CTA */}
                <span className="mt-auto flex items-center gap-1.5 text-xs font-body font-semibold text-rose border border-rose/30 rounded-full px-4 py-1.5 group-hover:bg-rose group-hover:text-white group-hover:border-rose transition-all">
                  <ZoomIn size={12} />
                  {t("cta")}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <CertModal item={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
