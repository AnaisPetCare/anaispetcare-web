"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Item { question: string; answer: string; }

export function AccordionBlock({ title, items }: { title?: string; items?: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 px-6 bg-cream">
      <div className="max-w-3xl mx-auto">
        {title && <h2 className="font-heading text-4xl font-bold text-brown-dark text-center mb-12">{title}</h2>}
        <div className="space-y-3">
          {items?.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl border border-cream-border overflow-hidden shadow-sm">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
              >
                <span className="font-body font-semibold text-brown-dark pr-4">{item.question}</span>
                <ChevronDown size={18} className={`text-rose shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-96" : "max-h-0"}`}>
                <p className="font-body text-brown-dark/70 text-sm leading-relaxed px-6 pb-5">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
