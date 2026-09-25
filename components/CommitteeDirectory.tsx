"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import type { PersonCard } from "@/lib/cms-types";

type CommitteeDirectoryProps = {
  members: PersonCard[];
  bioLabel: string;
  closeLabel: string;
  emphasizeBiography?: boolean;
};

export default function CommitteeDirectory({ members, bioLabel, closeLabel, emphasizeBiography = true }: CommitteeDirectoryProps) {
  const [selectedMember, setSelectedMember] = useState<PersonCard | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selectedMember) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedMember(null);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [selectedMember]);

  const openBiography = (member: PersonCard, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setSelectedMember(member);
  };

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {members.map((member) => (
          <article key={member.id ?? member.name} className="flex flex-col rounded-[1.5rem] bg-paper px-6 py-5">
            <div className="relative mb-6 mr-2 aspect-square overflow-hidden bg-linen shadow-[8px_8px_0_rgb(var(--color-brand)/1)]">
              {member.image?.url ? (
                <Image
                  src={member.image.url}
                  alt={member.image.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1280px) 18vw, (min-width: 768px) 45vw, 90vw"
                />
              ) : (
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-6xl text-moss/60">
                  {member.name.split(" ").map((part) => part[0]).join("")}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col pt-5">
              {member.quote && (
                <blockquote className="font-display text-[1.16rem] font-light leading-[1.48] text-bark">
                  “{member.quote}”
                </blockquote>
              )}

              <div className={member.quote ? "mt-7" : undefined}>
                <h3 className="text-lg font-semibold leading-snug text-bark">{member.name}</h3>
                <p className="mt-2 text-sm leading-6 text-bark/60">{member.role}</p>
              </div>

              <div className="mt-auto pt-4">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-moss bg-transparent px-7 py-1.5 font-semibold text-moss transition hover:bg-moss hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2"
                  onClick={(event) => openBiography(member, event.currentTarget)}
                >
                  {bioLabel}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-bark/45 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMember(null);
          }}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`bio-${selectedMember.id ?? "member"}`}
            tabIndex={-1}
            className="relative mx-auto my-4 max-w-6xl rounded-[2rem] bg-paper p-6 shadow-[0_24px_80px_rgb(var(--color-forest-dark)/0.22)] outline-none sm:p-10 lg:my-10 lg:p-14"
          >
            <button
              type="button"
              aria-label={closeLabel}
              className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-linen text-bark transition hover:bg-moss hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss"
              onClick={() => setSelectedMember(null)}
            >
              <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
            </button>

            <div className="grid gap-10 lg:grid-cols-[minmax(240px,0.52fr)_minmax(0,1.48fr)] lg:gap-14">
              <div className="max-w-[20rem] pr-2 pt-10 lg:pt-0">
                <div className="relative mr-2 aspect-square overflow-hidden bg-linen shadow-[8px_8px_0_rgb(var(--color-brand)/1)]">
                  {selectedMember.image?.url ? (
                    <Image
                      src={selectedMember.image.url}
                      alt={selectedMember.image.alt}
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 1024px) 30vw, 80vw"
                      priority
                    />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-6xl text-moss/60">
                      {selectedMember.name.split(" ").map((part) => part[0]).join("")}
                    </span>
                  )}
                </div>
              </div>

              <div className="self-center lg:pr-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-moss">
                  {selectedMember.role}
                </p>
                <h2
                  id={`bio-${selectedMember.id ?? "member"}`}
                  className="mt-5 font-display text-[48px] font-light leading-[1.04] text-bark text-balance"
                >
                  {selectedMember.name}
                </h2>
                <div className="mt-8 grid gap-5 text-[1.16rem] leading-[1.6] text-bark/76">
                  {selectedMember.paragraphs?.map((paragraph) => (
                    <p key={paragraph} className="whitespace-pre-line">
                      {paragraph.split(/(\*\*.*?\*\*)/g).map((part, index) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? emphasizeBiography
                            ? <strong key={index}>{part.slice(2, -2)}</strong>
                            : part.slice(2, -2)
                          : part
                      )}
                    </p>
                  ))}
                </div>
                {selectedMember.quote && (
                  <blockquote className="mt-8 border-l-2 border-moss/35 pl-5 font-display text-[1.25rem] font-light leading-[1.55] text-bark">
                    “{selectedMember.quote}”
                  </blockquote>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
