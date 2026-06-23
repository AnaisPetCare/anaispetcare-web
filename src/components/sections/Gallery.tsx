"use client";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";

interface GalleryImage {
  id: string;
  src: string;
  caption?: string;
}

const PLACEHOLDER_SLIDES: GalleryImage[][] = [
  [
    { id: "p1", src: "", caption: "Juego en el jardín 🌿" },
    { id: "p2", src: "", caption: "Siesta feliz 😴" },
    { id: "p3", src: "", caption: "Paseo matutino 🌅" },
    { id: "p4", src: "", caption: "Baño esponjoso 🛁" },
    { id: "p5", src: "", caption: "Mimos del día 💕" },
    { id: "p6", src: "", caption: "Hora del juego 🎾" },
  ],
];

function chunk<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

function Lightbox({
  images,
  index,
  onClose,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(index);

  const prev = useCallback(() => setCurrent((c) => (c > 0 ? c - 1 : images.length - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c < images.length - 1 ? c + 1 : 0)), [images.length]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, prev, next]);

  const img = images[current];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-brown-dark/90 backdrop-blur-sm" />

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
      >
        <X size={20} className="text-white" />
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 z-10 font-body text-white/60 text-sm">
        {current + 1} / {images.length}
      </p>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronLeft size={22} className="text-white" />
        </button>
      )}

      {/* Image */}
      <div
        className="relative z-10 max-w-4xl w-full mx-16 sm:mx-24"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full max-h-[80vh] flex items-center justify-center">
          <Image
            src={img.src}
            alt={img.caption ?? "Anais Pet Care"}
            width={1200}
            height={900}
            className="rounded-2xl object-contain max-h-[80vh] w-auto mx-auto shadow-2xl"
            priority
          />
        </div>
        {img.caption && (
          <p className="text-center font-body text-white/70 text-sm mt-4">{img.caption}</p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
        >
          <ChevronRight size={22} className="text-white" />
        </button>
      )}
    </div>
  );
}

function PhotoCard({
  img,
  isPlaceholder,
  onClick,
}: {
  img: GalleryImage;
  isPlaceholder: boolean;
  onClick?: () => void;
}) {
  if (isPlaceholder) {
    return (
      <div className="aspect-[4/3] bg-cream-dark rounded-2xl border border-cream-border flex flex-col items-center justify-center gap-2 text-brown-dark/30">
        <Camera size={28} />
        <p className="font-body text-xs font-medium text-center px-3">{img.caption}</p>
        <p className="font-body text-[10px] opacity-60">Tu foto aquí · JPG/PNG</p>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-cream-border shadow-sm hover:shadow-lg transition-all duration-300 cursor-zoom-in w-full"
    >
      <Image
        src={img.src}
        alt={img.caption ?? "Anais Pet Care"}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-brown-dark/0 group-hover:bg-brown-dark/20 transition-colors duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100">
          <ZoomIn size={18} className="text-brown-dark opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      {img.caption && (
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-brown-dark/60 to-transparent px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="font-body text-white text-xs">{img.caption}</p>
        </div>
      )}
    </button>
  );
}

export function Gallery({ serverImages }: { serverImages?: GalleryImage[] }) {
  const t = useTranslations("gallery");
  const hasImages = serverImages && serverImages.length > 0;
  const allImages = hasImages ? serverImages : [];

  const slides = hasImages ? chunk(serverImages, 6) : PLACEHOLDER_SLIDES;
  const [current, setCurrent] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(slides.length - 1, c + 1));

  // Calculates the absolute index across all images
  const openLightbox = (slideIndex: number, cardIndex: number) => {
    setLightboxIndex(slideIndex * 6 + cardIndex);
  };

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-rose font-body font-semibold text-sm tracking-widest uppercase mb-3">
            Galería
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-brown-dark mb-4">
            {t("title")}
          </h2>
          <p className="font-body text-brown-dark/60 text-lg max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((slide, si) => (
              <div key={si} className="w-full shrink-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slide.map((img, ci) => (
                    <PhotoCard
                      key={img.id}
                      img={img}
                      isPlaceholder={!hasImages}
                      onClick={() => openLightbox(si, ci)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controles carrusel */}
        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border border-cream-border bg-white flex items-center justify-center hover:border-rose/40 hover:bg-rose-pale transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft size={18} className="text-brown-dark" />
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === current
                      ? "w-6 h-2.5 bg-rose"
                      : "w-2.5 h-2.5 bg-cream-border hover:bg-rose/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={current === slides.length - 1}
              className="w-10 h-10 rounded-full border border-cream-border bg-white flex items-center justify-center hover:border-rose/40 hover:bg-rose-pale transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight size={18} className="text-brown-dark" />
            </button>
          </div>
        )}

        {!hasImages && (
          <p className="mt-8 text-center font-body text-sm text-brown-dark/40">
            📸 Las fotos reales de los peludos irán aquí ·{" "}
            <span className="text-rose font-semibold">Próximamente</span>
          </p>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && hasImages && (
        <Lightbox
          images={allImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}
