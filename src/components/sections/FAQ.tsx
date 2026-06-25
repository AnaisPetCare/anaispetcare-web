import { useTranslations } from "next-intl";
import { Accordion } from "@/components/ui/Accordion";

interface FaqItem {
  q: string;
  a: string;
}

export function FAQ({ serverItems, whatsapp = "573208504292" }: { serverItems?: FaqItem[]; whatsapp?: string }) {
  const t = useTranslations("faq");
  const items = serverItems ?? [];

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 bg-cream-dark">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            FAQ
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg">{t("subtitle")}</p>
        </div>

        <Accordion items={items} />

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="font-body text-brown-dark/60 text-base mb-4">
            ¿No encontraste tu pregunta?
          </p>
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-rose text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md hover:shadow-lg"
          >
            💬 Pregúntame directamente
          </a>
        </div>
      </div>
    </section>
  );
}
