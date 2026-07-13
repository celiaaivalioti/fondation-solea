"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

type DatePickerProps = {
  name: string;
  required?: boolean;
};

const monthFormatter = new Intl.DateTimeFormat("fr-FR", {
  month: "long",
  year: "numeric"
});

const weekdays = ["L", "M", "M", "J", "V", "S", "D"];

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toDisplayDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

function isSameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function getCalendarDays(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const mondayBasedStart = (firstDay.getDay() + 6) % 7;
  const gridStart = new Date(firstDay);
  gridStart.setDate(firstDay.getDate() - mondayBasedStart);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    return date;
  });
}

export default function DatePicker({ name, required = false }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const selectedValue = selectedDate ? toDisplayDate(selectedDate) : "";
  const selectedIsoValue = selectedDate ? toIsoDate(selectedDate) : "";

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <input
          name={name}
          value={selectedIsoValue}
          required={required}
          readOnly
          aria-label="Date du diagnostic"
          className="sr-only"
          tabIndex={-1}
        />
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className="flex min-h-14 w-full items-center justify-between rounded-2xl bg-linen/70 px-4 text-left text-base font-normal text-bark shadow-[0_16px_50px_rgb(var(--color-stroke)/0.42)] transition hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className={selectedDate ? "text-bark" : "text-bark/45"}>
            {selectedValue || "jj.mm.aaaa"}
          </span>
          <CalendarDays aria-hidden="true" className="h-5 w-5 text-bark/70" strokeWidth={1.7} />
        </button>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Choisir une date"
          className="absolute right-0 z-50 mt-3 w-[min(22rem,calc(100vw-3rem))] rounded-[1.75rem] bg-paper p-5 shadow-[0_24px_90px_rgb(var(--color-stroke)/0.95)]"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-medium capitalize text-bark">
              {monthFormatter.format(visibleMonth)}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Mois précédent"
                className="grid h-11 w-11 place-items-center rounded-full bg-linen text-bark transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1)
                  )
                }
              >
                <ChevronLeft aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
              </button>
              <button
                type="button"
                aria-label="Mois suivant"
                className="grid h-11 w-11 place-items-center rounded-full bg-linen text-bark transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
                onClick={() =>
                  setVisibleMonth(
                    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1)
                  )
                }
              >
                <ChevronRight aria-hidden="true" className="h-6 w-6" strokeWidth={1.7} />
              </button>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-7 gap-1 text-center text-sm font-medium text-bark/58">
            {weekdays.map((weekday, index) => (
              <span key={`${weekday}-${index}`} className="py-2">
                {weekday}
              </span>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
              const isCurrentMonth = date.getMonth() === visibleMonth.getMonth();
              const isSelected = selectedDate ? isSameDate(date, selectedDate) : false;

              return (
                <button
                  key={toIsoDate(date)}
                  type="button"
                  className={`grid h-10 place-items-center rounded-full text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                    isSelected
                      ? "bg-moss text-paper shadow-[0_10px_30px_rgb(var(--color-brand)/0.35)]"
                      : isCurrentMonth
                        ? "text-bark hover:bg-linen"
                        : "text-bark/35 hover:bg-linen"
                  }`}
                  onClick={() => {
                    setSelectedDate(date);
                    setVisibleMonth(new Date(date.getFullYear(), date.getMonth(), 1));
                    setIsOpen(false);
                  }}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-base font-medium text-bark/62 transition hover:bg-linen hover:text-bark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              onClick={() => setSelectedDate(null)}
            >
              Effacer
            </button>
            <button
              type="button"
              className="rounded-full bg-linen px-4 py-2 text-base font-medium text-moss transition hover:bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
              onClick={() => {
                const today = new Date();
                setSelectedDate(today);
                setVisibleMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                setIsOpen(false);
              }}
            >
              Aujourd’hui
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
