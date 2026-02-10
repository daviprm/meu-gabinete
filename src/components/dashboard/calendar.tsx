"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarEvent {
  data: string;
  tipo: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const DAYS_SHORT = ["D", "S", "T", "Q", "Q", "S", "S"];
const DAYS_FULL = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const tipoColor: Record<string, string> = {
  Reunião: "bg-blue-500",
  Visita: "bg-emerald-500",
  Evento: "bg-violet-500",
  Audiência: "bg-amber-500",
  Campanha: "bg-pink-500",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function Calendar({ events, selectedDate, onSelectDate }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [viewMode, setViewMode] = useState<"month" | "year">("month");
  const [direction, setDirection] = useState(0);

  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const eventDates = useMemo(() => {
    const map = new Map<string, string[]>();
    events.forEach((e) => {
      const existing = map.get(e.data) || [];
      if (!existing.includes(e.tipo)) existing.push(e.tipo);
      map.set(e.data, existing);
    });
    return map;
  }, [events]);

  const eventsThisMonth = useMemo(() => {
    let count = 0;
    eventDates.forEach((_, key) => {
      const d = new Date(key + "T12:00:00");
      if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) count++;
    });
    return count;
  }, [eventDates, currentMonth, currentYear]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevDays = getDaysInMonth(
    currentMonth === 0 ? currentYear - 1 : currentYear,
    currentMonth === 0 ? 11 : currentMonth - 1
  );

  const navigate = (dir: -1 | 1) => {
    setDirection(dir);
    if (currentMonth + dir < 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else if (currentMonth + dir > 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + dir);
    }
  };

  const goToToday = () => {
    setDirection(0);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    onSelectDate(todayStr);
  };

  const selectMonth = (month: number) => {
    setCurrentMonth(month);
    setViewMode("month");
  };

  // Build calendar grid with prev/next month days
  const cells: { day: number; current: boolean; dateStr: string }[] = [];
  for (let i = 0; i < firstDay; i++) {
    const day = prevDays - firstDay + i + 1;
    const m = currentMonth === 0 ? 11 : currentMonth - 1;
    const y = currentMonth === 0 ? currentYear - 1 : currentYear;
    cells.push({ day, current: false, dateStr: formatDate(y, m, day) });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, dateStr: formatDate(currentYear, currentMonth, d) });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    const m = currentMonth === 11 ? 0 : currentMonth + 1;
    const y = currentMonth === 11 ? currentYear + 1 : currentYear;
    cells.push({ day: d, current: false, dateStr: formatDate(y, m, d) });
  }

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  // Selected date info
  const selDate = new Date(selectedDate + "T12:00:00");
  const selDayName = DAYS_FULL[selDate.getDay()];

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "month" ? "year" : "month")}
            className="text-sm font-semibold hover:underline underline-offset-4 decoration-muted-foreground/40 transition-colors"
          >
            {MONTHS[currentMonth]} {currentYear}
          </button>
          <Badge count={eventsThisMonth} />
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="h-7 px-2 text-xs text-muted-foreground"
          >
            Hoje
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-7 w-7 p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate(1)} className="h-7 w-7 p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "year" ? (
          <motion.div
            key="year-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="grid grid-cols-3 gap-2 p-4"
          >
            {MONTHS.map((m, i) => {
              const isCurrentMonth = i === currentMonth;
              const isTodayMonth = i === today.getMonth() && currentYear === today.getFullYear();
              return (
                <button
                  key={m}
                  onClick={() => selectMonth(i)}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isCurrentMonth
                      ? "bg-foreground text-background font-medium"
                      : isTodayMonth
                        ? "bg-muted font-medium"
                        : "hover:bg-muted/50"
                  )}
                >
                  {m.slice(0, 3)}
                </button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key={`${currentYear}-${currentMonth}`}
            initial={{ opacity: 0, x: direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -20 }}
            transition={{ duration: 0.15 }}
            className="p-3"
          >
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map((d, i) => (
                <div
                  key={i}
                  className={cn(
                    "py-1.5 text-center text-[11px] font-medium",
                    i === 0 || i === 6 ? "text-muted-foreground/50" : "text-muted-foreground"
                  )}
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Weeks */}
            {weeks.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7">
                {week.map((cell) => {
                  const isToday = cell.dateStr === todayStr;
                  const isSelected = cell.dateStr === selectedDate;
                  const dayEvents = eventDates.get(cell.dateStr);
                  const isWeekend =
                    new Date(cell.dateStr + "T12:00:00").getDay() === 0 ||
                    new Date(cell.dateStr + "T12:00:00").getDay() === 6;

                  return (
                    <motion.button
                      key={cell.dateStr}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => onSelectDate(cell.dateStr)}
                      className={cn(
                        "relative mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all",
                        !cell.current && "text-muted-foreground/30",
                        cell.current && !isSelected && !isToday && "text-foreground",
                        cell.current && isWeekend && !isSelected && !isToday && "text-muted-foreground/60",
                        isSelected && "bg-foreground text-background font-semibold",
                        !isSelected && isToday && "bg-muted font-semibold",
                        !isSelected && cell.current && "hover:bg-muted/60"
                      )}
                    >
                      {cell.day}
                      {dayEvents && !isSelected && (
                        <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]">
                          {dayEvents.slice(0, 3).map((tipo, j) => (
                            <div
                              key={j}
                              className={`h-1 w-1 rounded-full ${tipoColor[tipo] || "bg-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      )}
                      {isSelected && dayEvents && (
                        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]">
                          {dayEvents.slice(0, 3).map((tipo, j) => (
                            <div
                              key={j}
                              className="h-1 w-1 rounded-full bg-background/60"
                            />
                          ))}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer - selected date summary */}
      <div className="border-t border-border px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarIcon className="h-3 w-3" />
          <span>{selDayName}, {selDate.getDate()} de {MONTHS[selDate.getMonth()]}</span>
        </div>
        {eventDates.get(selectedDate) && (
          <span className="text-xs font-medium tabular-nums">
            {eventDates.get(selectedDate)!.length} evento{eventDates.get(selectedDate)!.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Legenda */}
      <div className="border-t border-border px-4 py-2 flex flex-wrap gap-3">
        {Object.entries(tipoColor).map(([tipo, color]) => (
          <div key={tipo} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <div className={`h-1.5 w-1.5 rounded-full ${color}`} />
            {tipo}
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-[10px] font-medium tabular-nums text-muted-foreground">
      {count}
    </span>
  );
}
