"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Plus, ChevronLeft, ChevronRight, Users, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { eventos, type Evento } from "@/lib/mock-data";

const tipoBadge: Record<string, string> = {
  Reunião: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Visita: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Evento: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  Audiência: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Campanha: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
};

const tipoBg: Record<string, string> = {
  Reunião: "bg-blue-500/10 border-l-blue-500 hover:bg-blue-500/15",
  Visita: "bg-emerald-500/10 border-l-emerald-500 hover:bg-emerald-500/15",
  Evento: "bg-violet-500/10 border-l-violet-500 hover:bg-violet-500/15",
  Audiência: "bg-amber-500/10 border-l-amber-500 hover:bg-amber-500/15",
  Campanha: "bg-pink-500/10 border-l-pink-500 hover:bg-pink-500/15",
};

const tipoDot: Record<string, string> = {
  Reunião: "bg-blue-500",
  Visita: "bg-emerald-500",
  Evento: "bg-violet-500",
  Audiência: "bg-amber-500",
  Campanha: "bg-pink-500",
};

const DAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DAYS_MINI = ["D", "S", "T", "Q", "Q", "S", "S"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const HOURS = Array.from({ length: 14 }, (_, i) => i + 7); // 7:00 - 20:00

function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWeekDays(date: Date) {
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

type ViewMode = "week" | "day";

export default function AgendaPage() {
  const today = new Date();
  const todayStr = formatDate(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const filteredEvents = useMemo(() => {
    if (!activeFilter) return eventos;
    return eventos.filter((e) => e.tipo === activeFilter);
  }, [activeFilter]);

  const eventsByDate = useMemo(() => {
    const map = new Map<string, Evento[]>();
    filteredEvents.forEach((e) => {
      const list = map.get(e.data) || [];
      list.push(e);
      map.set(e.data, list);
    });
    return map;
  }, [filteredEvents]);

  const dayEvents = eventsByDate.get(selectedDate) || [];

  const navigateWeek = (dir: -1 | 1) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + dir * 7);
    setCurrentDate(d);
  };

  const navigateDay = (dir: -1 | 1) => {
    const d = new Date(selectedDate + "T12:00:00");
    d.setDate(d.getDate() + dir);
    setSelectedDate(formatDate(d));
    setCurrentDate(d);
  };

  const goToToday = () => {
    setCurrentDate(today);
    setSelectedDate(todayStr);
  };

  // Mini calendar helpers
  const miniMonth = currentDate.getMonth();
  const miniYear = currentDate.getFullYear();
  const daysInMonth = new Date(miniYear, miniMonth + 1, 0).getDate();
  const firstDay = new Date(miniYear, miniMonth, 1).getDay();

  // Stats
  const thisWeekEvents = weekDays.reduce((acc, d) => {
    return acc + (eventsByDate.get(formatDate(d))?.length || 0);
  }, 0);
  const monthEvents = filteredEvents.filter((e) => {
    const d = new Date(e.data + "T12:00:00");
    return d.getMonth() === miniMonth && d.getFullYear() === miniYear;
  }).length;

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Agenda</h1>
          <p className="text-sm text-muted-foreground">Visualize e organize seus compromissos.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="gap-1.5" onClick={goToToday}>
            Hoje
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Evento</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>
      </div>

      {/* Dialog novo evento */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Evento</DialogTitle>
            <DialogDescription>Adicione um compromisso à sua agenda.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              <Label>Título</Label>
              <Input placeholder="Nome do evento" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Data</Label>
                <DatePicker date={new Date(selectedDate + "T12:00:00")} placeholder="Selecionar data" />
              </div>
              <div className="space-y-2">
                <Label>Horário</Label>
                <Input type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Local</Label>
              <Input placeholder="Local do evento" />
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <div className="flex gap-2 flex-wrap">
                {["Reunião", "Visita", "Evento", "Audiência", "Campanha"].map((t) => (
                  <Button key={t} variant="outline" size="sm">{t}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea placeholder="Detalhes do evento..." rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setDialogOpen(false)}>Criar Evento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <div className="space-y-4">
          {/* Mini Calendar */}
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{MONTHS[miniMonth]} {miniYear}</span>
              <div className="flex gap-0.5">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => {
                  const d = new Date(currentDate);
                  d.setMonth(d.getMonth() - 1);
                  setCurrentDate(d);
                }}>
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => {
                  const d = new Date(currentDate);
                  d.setMonth(d.getMonth() + 1);
                  setCurrentDate(d);
                }}>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0">
              {DAYS_MINI.map((d, i) => (
                <div key={i} className="py-1 text-center text-[10px] font-medium text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-7" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = `${miniYear}-${String(miniMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isToday = dateStr === todayStr;
                const isSelected = dateStr === selectedDate;
                const hasEvents = eventsByDate.has(dateStr);
                return (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDate(dateStr);
                      setCurrentDate(new Date(dateStr + "T12:00:00"));
                      setViewMode("day");
                    }}
                    className={cn(
                      "relative flex h-7 w-full items-center justify-center rounded-md text-xs transition-colors",
                      isSelected && "bg-foreground text-background font-semibold",
                      !isSelected && isToday && "bg-muted font-semibold",
                      !isSelected && !isToday && "hover:bg-muted/50"
                    )}
                  >
                    {day}
                    {hasEvents && !isSelected && (
                      <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-blue-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stats */}
          <div className="rounded-lg border border-border p-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Resumo</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Esta semana</span>
              <span className="font-semibold tabular-nums">{thisWeekEvents} eventos</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Este mês</span>
              <span className="font-semibold tabular-nums">{monthEvents} eventos</span>
            </div>
          </div>

          {/* Filter by type */}
          <div className="rounded-lg border border-border p-3 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Filter className="h-3 w-3" />
              Filtrar por tipo
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(tipoDot).map(([tipo, color]) => (
                <button
                  key={tipo}
                  onClick={() => setActiveFilter(activeFilter === tipo ? null : tipo)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] transition-colors border",
                    activeFilter === tipo
                      ? "border-foreground/20 bg-foreground/5 font-medium"
                      : "border-transparent hover:bg-muted/50 text-muted-foreground"
                  )}
                >
                  <div className={`h-2 w-2 rounded-full ${color}`} />
                  {tipo}
                </button>
              ))}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="hidden lg:block rounded-lg border border-border p-3 space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Próximos eventos</p>
            <div className="space-y-1.5">
              {filteredEvents
                .filter((e) => e.data >= todayStr)
                .sort((a, b) => a.data.localeCompare(b.data) || a.horario.localeCompare(b.horario))
                .slice(0, 5)
                .map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setSelectedEvento(e)}
                    className="flex items-start gap-2 w-full rounded-md p-1.5 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${tipoDot[e.tipo]}`} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate">{e.titulo}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(e.data + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short" })} · {e.horario}
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-0 rounded-lg border border-border overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-border px-3 py-2 sm:px-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => viewMode === "week" ? navigateWeek(-1) : navigateDay(-1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => viewMode === "week" ? navigateWeek(1) : navigateDay(1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <h2 className="text-sm font-semibold">
                {viewMode === "week"
                  ? `${weekDays[0].getDate()} ${MONTHS[weekDays[0].getMonth()].slice(0, 3)} — ${weekDays[6].getDate()} ${MONTHS[weekDays[6].getMonth()].slice(0, 3)} ${weekDays[6].getFullYear()}`
                  : new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
                }
              </h2>
            </div>
            <div className="flex gap-0.5 rounded-md border border-border p-0.5">
              <button
                onClick={() => setViewMode("week")}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium transition-colors",
                  viewMode === "week" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="hidden sm:inline">Semana</span>
                <span className="sm:hidden">Sem</span>
              </button>
              <button
                onClick={() => setViewMode("day")}
                className={cn(
                  "rounded px-2 py-1 text-xs font-medium transition-colors",
                  viewMode === "day" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Dia
              </button>
            </div>
          </div>

          {/* Week View */}
          {viewMode === "week" && (
            <div className="overflow-x-auto">
              {/* Day headers */}
              <div className="grid border-b border-border" style={{ gridTemplateColumns: "60px repeat(7, minmax(100px, 1fr))" }}>
                <div className="border-r border-border" />
                {weekDays.map((d) => {
                  const dateStr = formatDate(d);
                  const isToday = dateStr === todayStr;
                  const dayEvts = eventsByDate.get(dateStr) || [];
                  return (
                    <button
                      key={dateStr}
                      onClick={() => { setSelectedDate(dateStr); setViewMode("day"); }}
                      className={cn(
                        "flex flex-col items-center py-2 border-r border-border last:border-0 transition-colors",
                        isToday && "bg-blue-500/5"
                      )}
                    >
                      <span className="text-[10px] font-medium text-muted-foreground">{DAYS_SHORT[d.getDay()]}</span>
                      <span className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                        isToday && "bg-blue-500 text-white",
                        dateStr === selectedDate && !isToday && "bg-foreground text-background"
                      )}>
                        {d.getDate()}
                      </span>
                      {dayEvts.length > 0 && (
                        <span className="text-[9px] text-muted-foreground tabular-nums">{dayEvts.length} evt</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time grid */}
              <div className="max-h-[calc(100vh-340px)] min-h-[400px] overflow-y-auto">
                <div className="relative grid" style={{ gridTemplateColumns: "60px repeat(7, minmax(100px, 1fr))" }}>
                  {/* Time labels + grid rows */}
                  {HOURS.map((hour) => (
                    <div key={hour} className="contents">
                      <div className="flex h-14 items-start justify-end border-r border-b border-border pr-2 pt-0.5">
                        <span className="text-[10px] text-muted-foreground tabular-nums">{String(hour).padStart(2, "0")}:00</span>
                      </div>
                      {weekDays.map((d) => {
                        const dateStr = formatDate(d);
                        const isToday = dateStr === todayStr;
                        const dayEvts = eventsByDate.get(dateStr) || [];
                        const hourEvts = dayEvts.filter((e) => {
                          const h = parseInt(e.horario.split(":")[0]);
                          return h === hour;
                        });
                        return (
                          <div
                            key={`${dateStr}-${hour}`}
                            className={cn(
                              "relative h-14 border-r border-b border-border last:border-r-0 p-0.5",
                              isToday && "bg-blue-500/[0.02]"
                            )}
                          >
                            {hourEvts.map((e) => (
                              <button
                                key={e.id}
                                onClick={() => setSelectedEvento(e)}
                                className={cn(
                                  "w-full rounded-md border-l-2 px-1.5 py-0.5 text-left transition-colors cursor-pointer",
                                  tipoBg[e.tipo]
                                )}
                              >
                                <p className="text-[10px] font-medium truncate leading-tight">{e.titulo}</p>
                                <p className="text-[9px] text-muted-foreground truncate">{e.horario} · {e.local}</p>
                              </button>
                            ))}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Day View */}
          {viewMode === "day" && (
            <div className="max-h-[calc(100vh-340px)] min-h-[400px] overflow-y-auto">
              <div className="relative">
                {HOURS.map((hour) => {
                  const hourEvts = dayEvents.filter((e) => {
                    const h = parseInt(e.horario.split(":")[0]);
                    return h === hour;
                  });
                  return (
                    <div key={hour} className="flex border-b border-border">
                      <div className="flex h-16 w-16 shrink-0 items-start justify-end border-r border-border pr-2 pt-1">
                        <span className="text-xs text-muted-foreground tabular-nums">{String(hour).padStart(2, "0")}:00</span>
                      </div>
                      <div className="flex-1 p-1 min-h-16">
                        {hourEvts.map((e) => (
                          <button
                            key={e.id}
                            onClick={() => setSelectedEvento(e)}
                            className={cn(
                              "w-full rounded-lg border-l-3 px-3 py-2 text-left transition-colors cursor-pointer mb-1",
                              tipoBg[e.tipo]
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{e.titulo}</p>
                              <Badge variant="secondary" className={`text-[10px] ${tipoBadge[e.tipo]}`}>{e.tipo}</Badge>
                            </div>
                            <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {e.horario}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {e.local}
                              </span>
                            </div>
                            {e.descricao && (
                              <p className="mt-1 text-xs text-muted-foreground/70 truncate">{e.descricao}</p>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sheet evento */}
      <Sheet open={!!selectedEvento} onOpenChange={(open) => !open && setSelectedEvento(null)}>
        <SheetContent>
          {selectedEvento && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedEvento.titulo}</SheetTitle>
                <SheetDescription>
                  <Badge variant="secondary" className={`mt-0.5 ${tipoBadge[selectedEvento.tipo]}`}>
                    {selectedEvento.tipo}
                  </Badge>
                </SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Horário:</span>
                    <span className="font-medium">{selectedEvento.horario}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Local:</span>
                    <span className="font-medium">{selectedEvento.local}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium">
                      {new Date(selectedEvento.data + "T12:00:00").toLocaleDateString("pt-BR", {
                        weekday: "long", day: "numeric", month: "long",
                      })}
                    </span>
                  </div>
                </div>
                {selectedEvento.descricao && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-xs font-medium text-muted-foreground mb-2">Descrição</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selectedEvento.descricao}</p>
                    </div>
                  </>
                )}
                <Separator />
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                  <Button variant="outline" size="sm" className="flex-1 text-red-500 hover:text-red-600">Cancelar evento</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
