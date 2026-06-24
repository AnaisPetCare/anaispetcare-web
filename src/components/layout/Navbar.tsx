"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = ["services", "about", "gallery", "faq"] as const;

interface CmsPage { title: string; slug: string; navLabel?: string; }

export function Navbar({ locale, cmsPages = [] }: { locale: string; cmsPages?: CmsPage[] }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = () => {
    const next = locale === "es" ? "en" : "es";
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || "/");
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-border"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-18">
        {/* Logo */}
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="/logo.jpeg"
            alt="Anais Pet Care"
            width={42}
            height={42}
            className="rounded-full object-cover border-2 border-rose-pale"
          />
          <span className="font-heading font-bold text-lg text-brown-dark hidden sm:block">
            Anais Pet Care
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <button
                onClick={() => scrollTo(key)}
                className="px-4 py-2 text-sm font-body font-medium text-brown-dark hover:text-rose transition-colors rounded-full hover:bg-rose-pale/40 cursor-pointer"
              >
                {t(key)}
              </button>
            </li>
          ))}
          {cmsPages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${locale}/${page.slug}`}
                className="px-4 py-2 text-sm font-body font-medium text-brown-dark hover:text-rose transition-colors rounded-full hover:bg-rose-pale/40"
              >
                {page.navLabel ?? page.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cream-border bg-white text-sm font-body font-semibold text-brown-dark hover:border-rose hover:text-rose transition-all cursor-pointer"
          >
            <span className="text-base leading-none">
              {locale === "es" ? "🇺🇸" : "🇨🇴"}
            </span>
            <span>{locale === "es" ? "EN" : "ES"}</span>
          </button>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/573208504292"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-rose text-white px-4 py-2 rounded-full text-sm font-body font-semibold hover:bg-rose-hover transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <MessageCircle size={15} />
            {t("book")}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full hover:bg-rose-pale/40 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X size={20} className="text-brown-dark" /> : <Menu size={20} className="text-brown-dark" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 bg-white border-b border-cream-border",
          mobileOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <ul className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((key) => (
            <li key={key}>
              <button
                onClick={() => scrollTo(key)}
                className="w-full text-left px-4 py-3 rounded-xl text-brown-dark font-body font-medium hover:bg-rose-pale/50 hover:text-rose transition-colors cursor-pointer"
              >
                {t(key)}
              </button>
            </li>
          ))}
          {cmsPages.map((page) => (
            <li key={page.slug}>
              <Link
                href={`/${locale}/${page.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left px-4 py-3 rounded-xl text-brown-dark font-body font-medium hover:bg-rose-pale/50 hover:text-rose transition-colors"
              >
                {page.navLabel ?? page.title}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="https://wa.me/573208504292"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-rose text-white px-4 py-3 rounded-xl text-sm font-body font-semibold"
            >
              <MessageCircle size={16} />
              {t("book")}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
