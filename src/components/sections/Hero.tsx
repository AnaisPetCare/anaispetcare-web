import Image from "next/image";
import { useTranslations } from "next-intl";
import { MessageCircle, ChevronDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const trust = useTranslations("trust");

  const TRUST_ITEMS = ["item1", "item2", "item3", "item4"] as const;
  const TRUST_ICONS = ["🎓", "✂️", "🐾", "📸"];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-cream"
    >
      {/* Background image with blobs */}
      <div className="absolute inset-0">
        <Image
          src="/background.png"
          alt=""
          fill
          className="object-cover object-center opacity-70"
          priority
        />
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-rose-pale/50 blob blur-2xl" />
      <div className="absolute bottom-20 left-0 w-60 h-60 bg-peach/40 blob blur-2xl" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-cream-border rounded-full px-4 py-2 mb-6 shadow-sm">
              <span className="text-base">🐾</span>
              <span className="text-sm font-body font-semibold text-brown-dark">
                {t("badge")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-brown-dark leading-tight mb-4">
              {t("title")}
              <br />
              <span className="text-rose italic">{t("title_highlight")}</span>
            </h1>

            {/* Tagline */}
            <p className="font-heading text-lg sm:text-xl text-brown italic text-brown/80 mb-4">
              {t("subtitle")}
            </p>

            <p className="font-body text-brown-dark/70 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              {t("description")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="https://wa.me/573208504292"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-rose text-white px-7 py-3.5 rounded-full font-body font-semibold text-base hover:bg-rose-hover shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <MessageCircle size={18} />
                {t("cta_book")}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 bg-white text-brown-dark border border-cream-border px-7 py-3.5 rounded-full font-body font-semibold text-base hover:border-rose hover:text-rose transition-all duration-200 shadow-sm"
              >
                {t("cta_services")}
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {TRUST_ITEMS.map((key, i) => (
                <div
                  key={key}
                  className="flex items-center gap-2.5 bg-white/70 backdrop-blur-sm rounded-2xl px-4 py-3 border border-cream-border shadow-sm"
                >
                  <span className="text-xl">{TRUST_ICONS[i]}</span>
                  <span className="font-body text-sm font-semibold text-brown-dark">
                    {trust(key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: banner image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Blob behind image */}
              <div className="absolute -inset-6 bg-rose-pale/60 blob" />
              <Image
                src="/banner.png"
                alt="Anais Pet Care"
                width={560}
                height={380}
                className="relative z-10 w-full rounded-3xl shadow-2xl object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 z-20 bg-white rounded-2xl shadow-lg px-4 py-3 border border-cream-border">
                <p className="font-body text-xs text-brown-dark/60 font-medium">Atención exclusiva</p>
                <p className="font-heading font-bold text-brown-dark text-sm">Una mascota a la vez 🐶</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-brown-dark/40 hover:text-rose transition-colors"
      >
        <span className="font-body text-xs font-medium">Scroll</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
