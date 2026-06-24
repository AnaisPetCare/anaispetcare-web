"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Home, Moon, Footprints, Syringe, Camera, Clock,
  Droplets, Check, X, MessageCircle, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home: Home, moon: Moon, footprints: Footprints,
  syringe: Syringe, camera: Camera, clock: Clock, droplets: Droplets,
};

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  detail?: string;
  card_includes?: string[];
  includes?: string[];
  benefits?: string[];
  why_higher?: string[];
  footer_note?: string;
  price_large: string;
  price_small?: string;
  note: string;
  conditions?: string[];
  ideal?: string;
  unit: string;
  icon: string;
}

function ServiceModal({ item, onClose, locale }: { item: ServiceItem; onClose: () => void; locale: string }) {
  const Icon = ICON_MAP[item.icon] ?? Home;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const handleBook = () => {
    sessionStorage.setItem("selected-service", item.name);
    onClose();
    const bookingEl = document.getElementById("booking");
    if (bookingEl) {
      setTimeout(() => bookingEl.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.location.href = `/${locale}/#booking`;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brown-dark/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative z-10 bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-cream-border px-6 py-5 flex items-center justify-between rounded-t-3xl sm:rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-pale rounded-xl flex items-center justify-center shrink-0">
              <Icon size={20} className="text-rose" />
            </div>
            <h3 className="font-heading font-bold text-lg text-brown-dark leading-tight">{item.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-cream-dark flex items-center justify-center hover:bg-rose-pale transition-colors cursor-pointer shrink-0"
          >
            <X size={16} className="text-brown-dark" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Detail / Description — supports \n\n paragraphs */}
          <div className="space-y-3">
            {(item.detail ?? item.description).split("\n\n").map((para, i) => (
              <p key={i} className="font-body text-brown-dark/70 text-sm leading-relaxed">{para}</p>
            ))}
          </div>

          {/* ¿Por qué tiene un valor más alto? (pernocta) */}
          {item.why_higher && item.why_higher.length > 0 && (
            <div className="border border-rose/20 bg-rose-pale/20 rounded-2xl px-4 py-4">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-rose/70 mb-3">
                ¿Por qué tiene un valor más alto?
              </p>
              <ul className="space-y-2">
                {item.why_higher.map((w, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-body text-brown-dark/70">
                    <span className="text-rose shrink-0 mt-0.5">✦</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Includes */}
          {item.includes && item.includes.length > 0 && (
            <div>
              <p className="font-body text-xs font-bold uppercase tracking-widest text-brown-dark/40 mb-3">
                Incluye
              </p>
              <ul className="space-y-2">
                {item.includes.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm font-body text-brown-dark">
                    <div className="w-5 h-5 bg-rose-pale rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-rose" />
                    </div>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ideal para */}
          {item.ideal && (
            <div className="bg-rose-pale/40 rounded-2xl px-4 py-3">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-brown-dark/40 mb-1.5">
                Ideal para
              </p>
              <p className="font-body text-sm text-brown-dark/70">{item.ideal}</p>
            </div>
          )}

          {/* Benefits (eventos) */}
          {item.benefits && item.benefits.length > 0 && (
            <div className="bg-rose-pale/30 rounded-2xl px-4 py-3">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-brown-dark/40 mb-2">
                Beneficios
              </p>
              <ul className="space-y-1.5">
                {item.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm font-body text-brown-dark/70">
                    <span className="text-rose mt-0.5 shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conditions */}
          {item.conditions && item.conditions.length > 0 && (
            <div className="bg-cream-dark rounded-2xl px-4 py-3">
              <p className="font-body text-xs font-bold uppercase tracking-widest text-brown-dark/40 mb-2">
                Condiciones
              </p>
              <ul className="space-y-1.5">
                {item.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-body text-brown-dark/60">
                    <span className="text-brown/40 mt-0.5 shrink-0">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer note / closing quote */}
          {item.footer_note && (
            <p className="font-body text-xs text-brown-dark/50 italic text-center leading-relaxed border-t border-cream-border pt-4">
              {item.footer_note}
            </p>
          )}
        </div>

        {/* Footer: price + CTA */}
        <div className="sticky bottom-0 bg-white border-t border-cream-border px-6 py-4 flex items-center justify-between gap-3">
          <div>
            {item.price_large ? (
              <>
                <p className="font-body text-xs text-brown-dark/40 uppercase tracking-wide">Desde</p>
                <p className="font-heading font-bold text-2xl text-rose leading-tight">
                  ${item.price_large}
                  {item.unit && (
                    <span className="text-sm font-body font-normal text-brown-dark/50 ml-1">/ {item.unit}</span>
                  )}
                </p>
                {item.price_small && (
                  <p className="text-xs font-body text-brown-dark/40">Pequeños desde ${item.price_small}</p>
                )}
                {item.note && (
                  <p className="text-xs font-body text-brown-dark/40 mt-0.5 max-w-[180px] leading-tight">{item.note}</p>
                )}
              </>
            ) : (
              <p className="font-body text-sm text-brown-dark/50 italic">{item.note}</p>
            )}
          </div>
          <button
            onClick={handleBook}
            className="flex items-center gap-2 bg-rose text-white font-body font-bold text-sm px-5 py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md shrink-0 cursor-pointer"
          >
            <MessageCircle size={16} />
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}

export function Services({ serverItems, locale = "es" }: { serverItems?: ServiceItem[]; locale?: string }) {
  const t = useTranslations("services");
  const fallback: ServiceItem[] = t.raw("items");
  const items = serverItems && serverItems.length > 0 ? serverItems : fallback;
  const [selected, setSelected] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Servicios
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">{t("title")}</h2>
          <p className="font-body text-brown-dark/60 text-lg max-w-xl mx-auto">{t("subtitle")}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Home;
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={cn(
                  "group text-left bg-white rounded-3xl p-6 border border-cream-border shadow-sm",
                  "hover:shadow-xl hover:-translate-y-1 hover:border-rose/30 transition-all duration-300 cursor-pointer",
                  "flex flex-col"
                )}
              >
                {/* Icon */}
                <div className="w-11 h-11 bg-rose-pale rounded-2xl flex items-center justify-center mb-4 group-hover:bg-rose/10 transition-colors">
                  <Icon size={20} className="text-rose" />
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-lg text-brown-dark mb-2 leading-tight">{item.name}</h3>

                {/* Description */}
                <p className="font-body text-brown-dark/60 text-sm leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Card includes — compact tag list */}
                {item.card_includes && item.card_includes.length > 0 && (
                  <ul className="flex flex-col gap-1 mb-4 flex-1">
                    {item.card_includes.map((tag, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs font-body text-brown-dark/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose/50 shrink-0" />
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
                {!item.card_includes && <div className="flex-1" />}

                {/* Bottom row */}
                <div className="flex items-center justify-between mt-4">
                  {item.price_large ? (
                    <span className="font-heading font-bold text-xl text-rose">
                      ${item.price_large}
                      <span className="text-sm font-body font-normal text-brown-dark/40 ml-1">/ {item.unit}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-body text-brown-dark/40 italic">{item.note}</span>
                  )}
                  <span className="flex items-center gap-1 text-xs font-body font-semibold text-rose group-hover:gap-2 transition-all">
                    Ver más <ChevronRight size={14} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selected && <ServiceModal item={selected} onClose={() => setSelected(null)} locale={locale} />}
    </section>
  );
}
