import { useTranslations } from "next-intl";
import { Syringe, Bug, Utensils, Heart, Calendar, ClipboardList, Pill, AlertTriangle, Phone } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  syringe: Syringe,
  bug: Bug,
  utensils: Utensils,
  heart: Heart,
  calendar: Calendar,
  clipboard: ClipboardList,
  pill: Pill,
  alert: AlertTriangle,
  phone: Phone,
};

interface ReqItem {
  icon: string;
  title: string;
  description: string;
}

export function Requirements({ serverItems }: { serverItems?: ReqItem[] }) {
  const t = useTranslations("requirements");
  const items = serverItems ?? [];

  return (
    <section className="py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Requisitos
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Requirements grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Heart;
              return (
                <div
                  key={i}
                  className="flex gap-4 bg-white rounded-2xl p-6 border border-cream-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 bg-rose-pale rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                    <Icon size={18} className="text-rose" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-base text-brown-dark mb-1.5">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-brown-dark/60 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA banner */}
        <div className="mt-12 bg-rose rounded-3xl px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <p className="font-heading font-bold text-white text-xl sm:text-2xl mb-1">
              ¿Tienes dudas sobre los requisitos?
            </p>
            <p className="font-body text-white/80 text-sm">
              Escríbeme y te cuento todo lo que necesitas saber.
            </p>
          </div>
          <a
            href="https://wa.me/573208504292"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-white text-rose font-body font-bold px-6 py-3 rounded-full hover:bg-cream-dark transition-colors shadow-md"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
