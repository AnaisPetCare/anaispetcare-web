import Image from "next/image";

interface HeroBlock {
  _type: "heroBlock";
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonLink?: string;
  image?: { asset: { url: string } };
}

interface TextBlock {
  _type: "textBlock";
  title?: string;
  subtitle?: string;
  body?: string;
  align?: "left" | "center" | "right";
}

interface ImageBlock {
  _type: "imageBlock";
  image: { asset: { url: string } };
  caption?: string;
  fullWidth?: boolean;
}

interface Card {
  icon?: string;
  title: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
}

interface CardsBlock {
  _type: "cardsBlock";
  title?: string;
  cards?: Card[];
}

interface CtaBlock {
  _type: "ctaBlock";
  title: string;
  subtitle?: string;
  buttonLabel?: string;
  buttonLink?: string;
  background?: "cream" | "rose" | "dark";
}

type Block = HeroBlock | TextBlock | ImageBlock | CardsBlock | CtaBlock;

function HeroBlockComponent({ block }: { block: HeroBlock }) {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center text-center px-6 py-24 bg-cream overflow-hidden"
    >
      {block.image?.asset?.url && (
        <Image
          src={block.image.asset.url}
          alt={block.title}
          fill
          className="object-cover opacity-20"
        />
      )}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="font-heading text-5xl sm:text-6xl font-bold text-brown-dark mb-6 leading-tight">
          {block.title}
        </h1>
        {block.subtitle && (
          <p className="font-body text-xl text-brown-dark/70 mb-8">{block.subtitle}</p>
        )}
        {block.buttonLabel && block.buttonLink && (
          <a
            href={block.buttonLink}
            className="inline-block bg-rose text-white font-body font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-rose-hover transition-colors"
          >
            {block.buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}

function TextBlockComponent({ block }: { block: TextBlock }) {
  const align = block.align ?? "center";
  const alignClass = align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center";
  return (
    <section className={`py-20 px-6 bg-cream ${alignClass}`}>
      <div className="max-w-3xl mx-auto">
        {block.title && (
          <h2 className="font-heading text-4xl font-bold text-brown-dark mb-4">{block.title}</h2>
        )}
        {block.subtitle && (
          <p className="font-body text-xl text-brown-dark/60 mb-6">{block.subtitle}</p>
        )}
        {block.body && (
          <p className="font-body text-brown-dark/70 leading-relaxed whitespace-pre-line">{block.body}</p>
        )}
      </div>
    </section>
  );
}

function ImageBlockComponent({ block }: { block: ImageBlock }) {
  return (
    <div className={`py-10 px-6 flex flex-col items-center bg-cream ${block.fullWidth ? "" : ""}`}>
      <div className={`relative w-full ${block.fullWidth ? "max-w-full h-96" : "max-w-3xl h-80"} rounded-3xl overflow-hidden shadow-md`}>
        <Image src={block.image.asset.url} alt={block.caption ?? ""} fill className="object-cover" />
      </div>
      {block.caption && (
        <p className="font-body text-sm text-brown-dark/50 mt-3 italic">{block.caption}</p>
      )}
    </div>
  );
}

function CardsBlockComponent({ block }: { block: CardsBlock }) {
  return (
    <section className="py-20 px-6 bg-cream-dark">
      <div className="max-w-6xl mx-auto">
        {block.title && (
          <h2 className="font-heading text-4xl font-bold text-brown-dark text-center mb-12">{block.title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {block.cards?.map((card, i) => (
            <div key={i} className="bg-white rounded-3xl p-7 border border-cream-border shadow-sm flex flex-col gap-3">
              {card.icon && <div className="text-4xl">{card.icon}</div>}
              <h3 className="font-heading font-bold text-lg text-brown-dark">{card.title}</h3>
              {card.description && (
                <p className="font-body text-sm text-brown-dark/60 flex-1">{card.description}</p>
              )}
              {card.buttonLabel && card.buttonLink && (
                <a
                  href={card.buttonLink}
                  className="inline-block mt-2 text-rose font-body font-semibold text-sm hover:underline"
                >
                  {card.buttonLabel} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlockComponent({ block }: { block: CtaBlock }) {
  const bgClass =
    block.background === "rose" ? "bg-rose text-white" :
    block.background === "dark" ? "bg-[#0d1526] text-white" :
    "bg-cream";
  const textClass = block.background === "cream" ? "text-brown-dark" : "text-white";
  return (
    <section className={`py-20 px-6 text-center ${bgClass}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className={`font-heading text-4xl font-bold mb-4 ${textClass}`}>{block.title}</h2>
        {block.subtitle && (
          <p className={`font-body text-lg mb-8 ${block.background === "cream" ? "text-brown-dark/60" : "text-white/70"}`}>
            {block.subtitle}
          </p>
        )}
        {block.buttonLabel && block.buttonLink && (
          <a
            href={block.buttonLink}
            className={`inline-block font-body font-semibold px-8 py-4 rounded-full shadow-md transition-colors ${
              block.background === "cream"
                ? "bg-rose text-white hover:bg-rose-hover"
                : "bg-white text-rose hover:bg-cream"
            }`}
          >
            {block.buttonLabel}
          </a>
        )}
      </div>
    </section>
  );
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block._type) {
          case "heroBlock":   return <HeroBlockComponent   key={i} block={block} />;
          case "textBlock":   return <TextBlockComponent   key={i} block={block} />;
          case "imageBlock":  return <ImageBlockComponent  key={i} block={block} />;
          case "cardsBlock":  return <CardsBlockComponent  key={i} block={block} />;
          case "ctaBlock":    return <CtaBlockComponent    key={i} block={block} />;
          default:            return null;
        }
      })}
    </>
  );
}
