"use client";

import { useEffect, useMemo, useState } from "react";

type CommitteeMember = {
  name: string;
  role: string;
  quote: string;
};

export default function CommitteeSlideshow({
  members
}: {
  members: CommitteeMember[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = useMemo(() => members, [members]);
  const visibleSlides = useMemo(() => {
    if (slides.length === 0) {
      return [];
    }

    return [
      slides[activeIndex],
      slides[(activeIndex + 1) % slides.length]
    ].filter(Boolean);
  }, [activeIndex, slides]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-[2rem] bg-ivory p-5 shadow-soft sm:p-8">
      <div className="relative overflow-hidden">
        <div className="grid gap-6 md:grid-cols-2">
          {visibleSlides.map((member, visibleIndex) => (
            <article
              key={`${activeIndex}-${member.name}`}
              className={`overflow-hidden rounded-[1.5rem] bg-paper shadow-rim transition-all duration-700 ease-out-soft ${
                visibleIndex === 1 ? "hidden md:block" : ""
              }`}
            >
              <div className="min-h-[16rem] bg-gradient-to-br from-moss/18 via-paper to-linen p-6">
                <div className="flex h-full min-h-[14rem] flex-col justify-between">
                  <div className="grid h-24 w-24 place-items-center rounded-full bg-moss font-display text-3xl text-paper shadow-rim">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-moss/70">
                      Photo placeholder
                    </p>
                    <p className="mt-2 text-base leading-6 text-bark/58">
                      Portrait du membre du comité à ajouter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 sm:p-10">
                <p className="whitespace-pre-line font-display text-[clamp(1.3rem,2.1vw,1.85rem)] font-light leading-tight text-bark">
                  “{member.quote}”
                </p>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-bark">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-lg leading-7 text-bark/56">{member.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2" aria-label="Membres du comité">
          {slides.map((member, index) => (
            <button
              key={member.name}
              type="button"
              aria-label={`Afficher le groupe commençant par ${member.name}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index ? "w-9 bg-moss" : "w-2.5 bg-moss/25"
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-bark/45">
          Défilement automatique
        </p>
      </div>
    </div>
  );
}
