import Image from "next/image";
import { AccordionBlock } from "./AccordionBlock";
import { ContactFormBlock } from "./ContactFormBlock";

// ── Locale helper ─────────────────────────────────────────────────────────────
// Returns EN value if locale is "en" and EN exists, otherwise falls back to ES
const loc = (es: string | undefined, en: string | undefined, locale: string): string | undefined =>
  locale === "en" ? (en || es) : es;

// ── Types ────────────────────────────────────────────────────────────────────

interface HeroBlock      { _type: "heroBlock"; title: string; title_en?: string; subtitle?: string; subtitle_en?: string; buttonLabel?: string; buttonLabel_en?: string; buttonLink?: string; image?: { asset: { url: string } }; }
interface TextBlock      { _type: "textBlock"; title?: string; title_en?: string; subtitle?: string; subtitle_en?: string; body?: string; body_en?: string; align?: "left"|"center"|"right"; }
interface ImageBlock     { _type: "imageBlock"; image: { asset: { url: string } }; caption?: string; caption_en?: string; fullWidth?: boolean; }
interface Card           { icon?: string; title: string; title_en?: string; description?: string; description_en?: string; buttonLabel?: string; buttonLabel_en?: string; buttonLink?: string; }
interface CardsBlock     { _type: "cardsBlock"; title?: string; title_en?: string; cards?: Card[]; }
interface CtaBlock       { _type: "ctaBlock"; title: string; title_en?: string; subtitle?: string; subtitle_en?: string; buttonLabel?: string; buttonLabel_en?: string; buttonLink?: string; background?: "cream"|"rose"|"dark"; }
interface AccordionItem  { question: string; question_en?: string; answer: string; answer_en?: string; }
interface AccordionBlockT{ _type: "accordionBlock"; title?: string; title_en?: string; items?: AccordionItem[]; }
interface GalleryImage   { image: { asset: { url: string } }; caption?: string; caption_en?: string; }
interface GalleryBlock   { _type: "galleryBlock"; title?: string; title_en?: string; images?: GalleryImage[]; }
interface TwoColumnsBlock{ _type: "twoColumnsBlock"; title?: string; title_en?: string; body?: string; body_en?: string; image?: { asset: { url: string } }; imageRight?: boolean; buttonLabel?: string; buttonLabel_en?: string; buttonLink?: string; }
interface VideoBlock     { _type: "videoBlock"; title?: string; title_en?: string; url: string; caption?: string; caption_en?: string; }
interface MapBlock       { _type: "mapBlock"; title?: string; title_en?: string; address: string; embedUrl?: string; }
interface SeparatorBlock { _type: "separatorBlock"; style?: "space"|"line"|"paws"; size?: "small"|"medium"|"large"; }
interface ContactFormBlockT { _type: "contactFormBlock"; title?: string; title_en?: string; subtitle?: string; subtitle_en?: string; whatsapp?: string; buttonLabel?: string; buttonLabel_en?: string; }
interface BannerBlock    { _type: "bannerBlock"; icon?: string; text: string; text_en?: string; background?: "rose"|"cream"|"dark"|"yellow"; buttonLabel?: string; buttonLabel_en?: string; buttonLink?: string; }
interface Step           { title: string; title_en?: string; description?: string; description_en?: string; icon?: string; }
interface StepsBlock     { _type: "stepsBlock"; title?: string; title_en?: string; subtitle?: string; subtitle_en?: string; steps?: Step[]; }

type Block = HeroBlock | TextBlock | ImageBlock | CardsBlock | CtaBlock | AccordionBlockT | GalleryBlock | TwoColumnsBlock | VideoBlock | MapBlock | SeparatorBlock | ContactFormBlockT | BannerBlock | StepsBlock;

// ── Helpers ──────────────────────────────────────────────────────────────────

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&?/\s]{11})/);
  return match?.[1] ?? null;
}

// ── Block components ─────────────────────────────────────────────────────────

function HeroBlockC({ b, l }: { b: HeroBlock; l: string }) {
  const title = loc(b.title, b.title_en, l) ?? b.title;
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center px-6 py-24 bg-cream overflow-hidden">
      {b.image?.asset?.url && <Image src={b.image.asset.url} alt={title} fill className="object-cover opacity-20" />}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brown-dark mb-6 leading-tight">{title}</h1>
        {loc(b.subtitle, b.subtitle_en, l) && <p className="font-body text-xl text-brown-dark/70 mb-8">{loc(b.subtitle, b.subtitle_en, l)}</p>}
        {loc(b.buttonLabel, b.buttonLabel_en, l) && b.buttonLink && (
          <a href={b.buttonLink} className="inline-block bg-rose text-white font-body font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-rose-hover transition-colors">{loc(b.buttonLabel, b.buttonLabel_en, l)}</a>
        )}
      </div>
    </section>
  );
}

function TextBlockC({ b, l }: { b: TextBlock; l: string }) {
  const alignClass = b.align === "left" ? "text-left" : b.align === "right" ? "text-right" : "text-center";
  return (
    <section className={`py-20 px-6 bg-cream ${alignClass}`}>
      <div className="max-w-3xl mx-auto">
        {loc(b.title, b.title_en, l)    && <h2 className="font-heading text-4xl font-bold text-brown-dark mb-4">{loc(b.title, b.title_en, l)}</h2>}
        {loc(b.subtitle, b.subtitle_en, l) && <p className="font-body text-xl text-brown-dark/60 mb-6">{loc(b.subtitle, b.subtitle_en, l)}</p>}
        {loc(b.body, b.body_en, l)      && <p className="font-body text-brown-dark/70 leading-relaxed whitespace-pre-line">{loc(b.body, b.body_en, l)}</p>}
      </div>
    </section>
  );
}

function ImageBlockC({ b, l }: { b: ImageBlock; l: string }) {
  const caption = loc(b.caption, b.caption_en, l);
  return (
    <div className="py-10 px-6 flex flex-col items-center bg-cream">
      <div className={`relative w-full ${b.fullWidth ? "max-w-full h-[28rem]" : "max-w-3xl h-80"} rounded-3xl overflow-hidden shadow-md`}>
        <Image src={b.image.asset.url} alt={caption ?? ""} fill className="object-cover" />
      </div>
      {caption && <p className="font-body text-sm text-brown-dark/50 mt-3 italic">{caption}</p>}
    </div>
  );
}

function CardsBlockC({ b, l }: { b: CardsBlock; l: string }) {
  return (
    <section className="py-20 px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {loc(b.title, b.title_en, l) && <h2 className="font-heading text-4xl font-bold text-brown-dark text-center mb-12">{loc(b.title, b.title_en, l)}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {b.cards?.map((card, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 border border-cream-border shadow-sm flex flex-col gap-3">
              {card.icon && <div className="text-4xl">{card.icon}</div>}
              <h3 className="font-heading font-bold text-lg text-brown-dark">{loc(card.title, card.title_en, l)}</h3>
              {loc(card.description, card.description_en, l) && <p className="font-body text-sm text-brown-dark/60 flex-1">{loc(card.description, card.description_en, l)}</p>}
              {loc(card.buttonLabel, card.buttonLabel_en, l) && card.buttonLink && (
                <a href={card.buttonLink} className="inline-block mt-2 text-rose font-body font-semibold text-sm hover:underline">{loc(card.buttonLabel, card.buttonLabel_en, l)} →</a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlockC({ b, l }: { b: CtaBlock; l: string }) {
  const bgClass = b.background === "rose" ? "bg-rose" : b.background === "dark" ? "bg-[#0d1526]" : "bg-cream";
  const textClass = b.background === "cream" ? "text-brown-dark" : "text-white";
  const subClass = b.background === "cream" ? "text-brown-dark/60" : "text-white/70";
  const btnClass = b.background === "cream" ? "bg-rose text-white hover:bg-rose-hover" : "bg-white text-rose hover:bg-cream";
  return (
    <section className={`py-20 px-6 text-center ${bgClass}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`font-heading text-4xl font-bold mb-4 ${textClass}`}>{loc(b.title, b.title_en, l)}</h2>
        {loc(b.subtitle, b.subtitle_en, l) && <p className={`font-body text-lg mb-8 ${subClass}`}>{loc(b.subtitle, b.subtitle_en, l)}</p>}
        {loc(b.buttonLabel, b.buttonLabel_en, l) && b.buttonLink && (
          <a href={b.buttonLink} className={`inline-block font-body font-semibold px-8 py-4 rounded-full shadow-md transition-colors ${btnClass}`}>{loc(b.buttonLabel, b.buttonLabel_en, l)}</a>
        )}
      </div>
    </section>
  );
}

function GalleryBlockC({ b, l }: { b: GalleryBlock; l: string }) {
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto">
        {loc(b.title, b.title_en, l) && <h2 className="font-heading text-4xl font-bold text-brown-dark text-center mb-12">{loc(b.title, b.title_en, l)}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {b.images?.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm">
              <Image src={img.image.asset.url} alt={loc(img.caption, img.caption_en, l) ?? ""} fill className="object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TwoColumnsBlockC({ b, l }: { b: TwoColumnsBlock; l: string }) {
  const title = loc(b.title, b.title_en, l);
  const imgEl = b.image?.asset?.url && (
    <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-md">
      <Image src={b.image.asset.url} alt={title ?? ""} fill className="object-cover" />
    </div>
  );
  const textEl = (
    <div className="flex flex-col justify-center gap-4">
      {title && <h2 className="font-heading text-4xl font-bold text-brown-dark">{title}</h2>}
      {loc(b.body, b.body_en, l) && <p className="font-body text-brown-dark/70 leading-relaxed whitespace-pre-line">{loc(b.body, b.body_en, l)}</p>}
      {loc(b.buttonLabel, b.buttonLabel_en, l) && b.buttonLink && (
        <a href={b.buttonLink} className="inline-block w-fit bg-rose text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-rose-hover transition-colors shadow-md">{loc(b.buttonLabel, b.buttonLabel_en, l)}</a>
      )}
    </div>
  );
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {b.imageRight ? <>{textEl}{imgEl}</> : <>{imgEl}{textEl}</>}
      </div>
    </section>
  );
}

function VideoBlockC({ b, l }: { b: VideoBlock; l: string }) {
  const id = getYouTubeId(b.url);
  if (!id) return null;
  const title = loc(b.title, b.title_en, l);
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-4xl mx-auto">
        {title && <h2 className="font-heading text-3xl font-bold text-brown-dark text-center mb-8">{title}</h2>}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg">
          <iframe src={`https://www.youtube.com/embed/${id}`} title={title ?? "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full" />
        </div>
        {loc(b.caption, b.caption_en, l) && <p className="font-body text-sm text-brown-dark/50 text-center mt-4 italic">{loc(b.caption, b.caption_en, l)}</p>}
      </div>
    </section>
  );
}

function MapBlockC({ b, l }: { b: MapBlock; l: string }) {
  const src = b.embedUrl ?? `https://maps.google.com/maps?q=${encodeURIComponent(b.address)}&output=embed`;
  return (
    <section className="py-20 px-6 bg-cream-dark">
      <div className="max-w-4xl mx-auto">
        {loc(b.title, b.title_en, l) && <h2 className="font-heading text-3xl font-bold text-brown-dark text-center mb-8">{loc(b.title, b.title_en, l)}</h2>}
        <div className="rounded-3xl overflow-hidden shadow-lg h-96">
          <iframe src={src} title={b.address} width="100%" height="100%" loading="lazy" className="border-0" />
        </div>
        <p className="font-body text-sm text-brown-dark/50 text-center mt-3">{b.address}</p>
      </div>
    </section>
  );
}

function SeparatorBlockC({ b }: { b: SeparatorBlock }) {
  const sizeClass = b.size === "small" ? "py-4" : b.size === "large" ? "py-16" : "py-8";
  if (b.style === "line") return <div className={`${sizeClass} px-6`}><div className="max-w-3xl mx-auto border-t border-cream-border" /></div>;
  if (b.style === "paws") return <div className={`${sizeClass} text-center text-2xl tracking-widest text-rose/40`}>🐾 🐾 🐾</div>;
  return <div className={sizeClass} />;
}

function BannerBlockC({ b, l }: { b: BannerBlock; l: string }) {
  const bgClass = b.background === "rose" ? "bg-rose text-white" : b.background === "dark" ? "bg-[#0d1526] text-white" : b.background === "yellow" ? "bg-amber-100 text-brown-dark" : "bg-cream-dark text-brown-dark";
  return (
    <div className={`py-5 px-6 ${bgClass}`}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        {b.icon && <span className="text-2xl">{b.icon}</span>}
        <p className="font-body font-semibold">{loc(b.text, b.text_en, l)}</p>
        {loc(b.buttonLabel, b.buttonLabel_en, l) && b.buttonLink && (
          <a href={b.buttonLink} className={`font-body font-bold text-sm px-5 py-2 rounded-full border-2 transition-colors ${b.background === "rose" || b.background === "dark" ? "border-white hover:bg-white hover:text-rose" : "border-rose text-rose hover:bg-rose hover:text-white"}`}>
            {loc(b.buttonLabel, b.buttonLabel_en, l)}
          </a>
        )}
      </div>
    </div>
  );
}

function StepsBlockC({ b, l }: { b: StepsBlock; l: string }) {
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {loc(b.title, b.title_en, l)    && <h2 className="font-heading text-4xl font-bold text-brown-dark text-center mb-4">{loc(b.title, b.title_en, l)}</h2>}
        {loc(b.subtitle, b.subtitle_en, l) && <p className="font-body text-brown-dark/60 text-center mb-12">{loc(b.subtitle, b.subtitle_en, l)}</p>}
        <ol className="space-y-6">
          {b.steps?.map((step, i) => (
            <li key={i} className="flex gap-5 items-start">
              <div className="shrink-0 w-10 h-10 rounded-full bg-rose text-white font-heading font-bold flex items-center justify-center text-lg shadow-md">
                {step.icon ?? (i + 1)}
              </div>
              <div className="pt-1">
                <h3 className="font-heading font-bold text-lg text-brown-dark mb-1">{loc(step.title, step.title_en, l)}</h3>
                {loc(step.description, step.description_en, l) && <p className="font-body text-sm text-brown-dark/60 leading-relaxed">{loc(step.description, step.description_en, l)}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Renderer ─────────────────────────────────────────────────────────────────

export function BlockRenderer({ blocks, locale = "es" }: { blocks: Block[]; locale?: string }) {
  const l = locale;
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case "heroBlock":        return <HeroBlockC        key={i} b={block} l={l} />;
          case "textBlock":        return <TextBlockC        key={i} b={block} l={l} />;
          case "imageBlock":       return <ImageBlockC       key={i} b={block} l={l} />;
          case "cardsBlock":       return <CardsBlockC       key={i} b={block} l={l} />;
          case "ctaBlock":         return <CtaBlockC         key={i} b={block} l={l} />;
          case "accordionBlock":   return <AccordionBlock    key={i} title={loc(block.title, block.title_en, l)} items={block.items?.map(it => ({ question: loc(it.question, it.question_en, l) ?? it.question, answer: loc(it.answer, it.answer_en, l) ?? it.answer }))} />;
          case "galleryBlock":     return <GalleryBlockC     key={i} b={block} l={l} />;
          case "twoColumnsBlock":  return <TwoColumnsBlockC  key={i} b={block} l={l} />;
          case "videoBlock":       return <VideoBlockC       key={i} b={block} l={l} />;
          case "mapBlock":         return <MapBlockC         key={i} b={block} l={l} />;
          case "separatorBlock":   return <SeparatorBlockC   key={i} b={block} />;
          case "contactFormBlock": return <ContactFormBlock  key={i} title={loc(block.title, block.title_en, l)} subtitle={loc(block.subtitle, block.subtitle_en, l)} whatsapp={block.whatsapp} buttonLabel={loc(block.buttonLabel, block.buttonLabel_en, l)} />;
          case "bannerBlock":      return <BannerBlockC      key={i} b={block} l={l} />;
          case "stepsBlock":       return <StepsBlockC       key={i} b={block} l={l} />;
          default:                 return null;
        }
      })}
    </>
  );
}
