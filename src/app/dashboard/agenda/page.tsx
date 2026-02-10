"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar } from "@/components/dashboard/calendar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { eventos, type Evento } from "@/lib/mock-data";

const tipoBadge: Record<string, string> = {
  Reunião: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Visita: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Evento: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Audiência: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Campanha: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function AgendaPage() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [selectedEvento, setSelectedEvento] = useState<Evento | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const dayEvents = eventos.filter((e) => e.data === selectedDate);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Agenda</h1>
          <p className="text-sm text-muted-foreground">Visualize e organize seus compromissos.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Novo Evento
        </Button>
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
            <div className="grid grid-cols-2 gap-4">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
        <Calendar
          events={eventos}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />

        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">
            {new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h2>

          {dayEvents.length === 0 ? (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed border-border">
              <p className="text-sm text-muted-foreground">Nenhum evento neste dia.</p>
            </div>
          ) : (
            dayEvents.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedEvento(e)}
                className="flex items-start gap-4 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold tabular-nums">
                  {e.horario}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium hover:underline underline-offset-4 decoration-muted-foreground/40">{e.titulo}</p>
                    <Badge variant="secondary" className={tipoBadge[e.tipo]}>{e.tipo}</Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {e.horario}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {e.local}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
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
