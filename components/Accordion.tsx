"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
};

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-moss/20 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex items-start justify-between gap-6 px-6 py-5 sm:px-8 sm:py-6 hover:bg-linen/50 transition-colors"
            aria-expanded={openIndex === index}
            aria-controls={`accordion-content-${index}`}
          >
            <h3 className="text-left font-display text-xl sm:text-2xl leading-snug text-bark font-light">
              {item.question}
            </h3>
            <div className="flex-shrink-0 mt-0.5">
              {openIndex === index ? (
                <Minus className="w-7 h-7 sm:w-8 sm:h-8 text-moss" strokeWidth={1.5} />
              ) : (
                <Plus className="w-7 h-7 sm:w-8 sm:h-8 text-moss" strokeWidth={1.5} />
              )}
            </div>
          </button>

          {openIndex === index && (
            <div
              id={`accordion-content-${index}`}
              className="border-t border-moss/20 px-6 py-5 sm:px-8 sm:py-6 bg-cream/30"
            >
              <div className="prose prose-sm sm:prose max-w-none text-bark/82 text-base sm:text-[1.05rem] leading-relaxed space-y-4">
                {item.answer.split("\n\n").map((paragraph, i) => (
                  <div key={i}>
                    {paragraph.split("\n").map((line, j) => {
                      // Check if line starts with a dash (bullet point)
                      if (line.trim().startsWith("-")) {
                        return (
                          <div key={j} className="ml-4 mb-2">
                            • {line.replace(/^-\s*/, "")}
                          </div>
                        );
                      }
                      return <p key={j}>{line}</p>;
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
