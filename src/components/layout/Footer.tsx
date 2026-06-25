import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink, Mail, MapPin, MessageCircle } from "lucide-react";

export function Footer({ whatsapp = "573208504292", instagram = "anaispcareservices" }: { whatsapp?: string; instagram?: string }) {
  const t = useTranslations();
  const nav = useTranslations("nav");

  const NAV_LINKS = [
    { key: "services", id: "services" },
    { key: "about", id: "about" },
    { key: "gallery", id: "gallery" },
    { key: "faq", id: "faq" },
  ];

  return (
    <footer className="bg-brown-dark text-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.jpeg"
                alt="Anais Pet Care"
                width={48}
                height={48}
                className="rounded-full border-2 border-rose-light/40"
              />
              <div>
                <p className="font-heading font-bold text-lg text-cream">Anais Pet Care</p>
                <p className="text-rose-light text-sm">{t("footer.tagline")}</p>
              </div>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed font-body">
              {t("contact.location")}
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="font-heading font-semibold text-cream mb-4">Menú</p>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ key, id }) => (
                <li key={key}>
                  <a
                    href={`#${id}`}
                    className="text-cream/60 hover:text-rose-light transition-colors text-sm font-body"
                  >
                    {nav(key as "services" | "about" | "gallery" | "faq")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-heading font-semibold text-cream mb-4">{t("contact.title")}</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream/60 hover:text-rose-light transition-colors text-sm font-body"
                >
                  <MessageCircle size={16} className="text-rose-light shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-cream/60 hover:text-rose-light transition-colors text-sm font-body"
                >
                  <ExternalLink size={16} className="text-rose-light shrink-0" />
                  {t("contact.instagram")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="flex items-center gap-2.5 text-cream/60 hover:text-rose-light transition-colors text-sm font-body"
                >
                  <Mail size={16} className="text-rose-light shrink-0" />
                  {t("contact.email")}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-cream/60 text-sm font-body">
                <MapPin size={16} className="text-rose-light shrink-0" />
                {t("contact.location")}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center text-cream/40 text-xs font-body">
          © {new Date().getFullYear()} Anais Pet Care · {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
