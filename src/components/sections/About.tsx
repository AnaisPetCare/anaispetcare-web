import { useTranslations } from "next-intl";
import { Award, Star, Shield } from "lucide-react";

export function About() {
  const t = useTranslations("about");

  const certs = [
    { icon: Award, label: t("cert1"), color: "bg-rose-pale text-rose" },
    { icon: Award, label: t("cert2"), color: "bg-peach/60 text-brown" },
    { icon: Shield, label: t("cert3"), color: "bg-cream-dark text-brown-dark" },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual card */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Blob bg */}
              <div className="absolute -inset-8 bg-rose-pale/50 blob" />

              {/* Photo placeholder */}
              <div className="relative z-10 w-72 h-80 sm:w-80 sm:h-96 rounded-3xl overflow-hidden bg-cream-dark border-4 border-white shadow-2xl flex items-center justify-center">
                <div className="text-center px-6">
                  <div className="text-6xl mb-4">🐾</div>
                  <p className="font-heading text-brown-dark font-semibold text-lg">Foto de Anais</p>
                  <p className="font-body text-brown-dark/50 text-sm mt-1">Pendiente de subir</p>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -top-4 -right-4 z-20 bg-rose text-white rounded-2xl shadow-lg px-4 py-3 text-center">
                <p className="font-heading font-bold text-2xl">3+</p>
                <p className="font-body text-xs font-medium opacity-90">años</p>
              </div>

              {/* Stars */}
              <div className="absolute -bottom-4 -right-6 z-20 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2 border border-cream-border">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-rose fill-rose" />
                  ))}
                </div>
                <span className="font-body text-xs font-semibold text-brown-dark">100+ peludos</span>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
              Sobre mí
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-2">
              {t("title")}
            </h2>
            <p className="font-heading italic text-rose text-lg mb-6">{t("subtitle")}</p>

            <p className="font-body text-brown-dark/70 text-base leading-relaxed mb-4">
              {t("description")}
            </p>
            <p className="font-body text-brown-dark/70 text-base leading-relaxed mb-8">
              {t("description2")}
            </p>

            {/* Certification badges */}
            <div className="flex flex-wrap gap-3">
              {certs.map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-body text-sm font-semibold ${color} border border-cream-border`}
                >
                  <Icon size={15} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
