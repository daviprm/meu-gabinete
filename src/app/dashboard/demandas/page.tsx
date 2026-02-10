"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, AlertCircle, Clock, CheckCircle2, TrendingUp, User, Tag, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { demandas, type Demanda } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  Aberta: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Em andamento": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Concluída: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Cancelada: "bg-zinc-500/10 text-zinc-500",
};

const prioridadeDot: Record<string, string> = {
  Alta: "bg-red-500",
  Média: "bg-amber-500",
  Baixa: "bg-zinc-400",
};

const abertas = demandas.filter((d) => d.status === "Aberta").length;
const emAndamento = demandas.filter((d) => d.status === "Em andamento").length;
const concluidas = demandas.filter((d) => d.status === "Concluída").length;
const taxa = Math.round((concluidas / demandas.length) * 100);

const stats = [
  { label: "Abertas", value: abertas, icon: AlertCircle, color: "text-blue-500" },
  { label: "Em andamento", value: emAndamento, icon: Clock, color: "text-amber-500" },
  { label: "Concluídas", value: concluidas, icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Taxa de conclusão", value: `${taxa}%`, icon: TrendingUp, color: "text-foreground" },
];

export default function DemandasPage() {
  const [selected, setSelected] = useState<Demanda | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <motion.div
      className="space-y-4 sm:space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Demandas</h1>
          <p className="text-sm text-muted-foreground">Acompanhe e gerencie as demandas dos eleitores.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova Demanda</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Demanda</DialogTitle>
              <DialogDescription>Registre uma nova demanda de eleitor.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto px-6 py-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input placeholder="Título da demanda" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea placeholder="Descreva a demanda em detalhes..." rows={3} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input placeholder="Ex: Infraestrutura" />
                </div>
                <div className="space-y-2">
                  <Label>Prioridade</Label>
                  <div className="flex gap-2">
                    {["Alta", "Média", "Baixa"].map((p) => (
                      <Button key={p} variant="outline" size="sm" className="flex-1">{p}</Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Eleitor</Label>
                  <Input placeholder="Nome do eleitor" />
                </div>
                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Input placeholder="Membro da equipe" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setDialogOpen(false)}>Criar Demanda</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-3 rounded-lg border border-border p-3 sm:p-4">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar demanda..." className="pl-9" />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_110px_80px_110px_120px_120px] gap-4 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span>Título</span>
          <span>Status</span>
          <span>Prioridade</span>
          <span>Categoria</span>
          <span>Eleitor</span>
          <span>Responsável</span>
        </div>
        {demandas.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(d)}
            className="grid grid-cols-[1fr_110px_80px_110px_120px_120px] items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <span className="font-medium truncate">{d.titulo}</span>
            <Badge variant="secondary" className={statusColor[d.status]}>{d.status}</Badge>
            <div className="flex items-center gap-1.5">
              <div className={`h-2 w-2 rounded-full ${prioridadeDot[d.prioridade]}`} />
              <span className="text-muted-foreground text-xs">{d.prioridade}</span>
            </div>
            <Badge variant="outline" className="text-[11px]">{d.categoria}</Badge>
            <span className="text-muted-foreground truncate">{d.eleitor}</span>
            <span className="text-muted-foreground truncate">{d.responsavel}</span>
          </motion.div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-2 md:hidden">
        {demandas.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(d)}
            className="rounded-lg border border-border p-3 active:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{d.titulo}</p>
              <Badge variant="secondary" className={`shrink-0 text-[10px] ${statusColor[d.status]}`}>{d.status}</Badge>
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className={`h-1.5 w-1.5 rounded-full ${prioridadeDot[d.prioridade]}`} />
                {d.prioridade}
              </div>
              <Badge variant="outline" className="text-[10px]">{d.categoria}</Badge>
            </div>
            <div className="mt-1.5 text-xs text-muted-foreground">
              {d.eleitor} · {d.responsavel}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.titulo}</SheetTitle>
                <SheetDescription>{selected.descricao}</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={statusColor[selected.status]}>{selected.status}</Badge>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${prioridadeDot[selected.prioridade]}`} />
                    <span className="text-xs text-muted-foreground">{selected.prioridade}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Categoria:</span>
                    <Badge variant="outline" className="text-[11px]">{selected.categoria}</Badge>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Eleitor:</span>
                    <span className="font-medium">{selected.eleitor}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Responsável:</span>
                    <span className="font-medium">{selected.responsavel}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Criada:</span>
                    <span className="tabular-nums">{new Date(selected.dataCriacao).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Atualizada:</span>
                    <span className="tabular-nums">{new Date(selected.dataAtualizacao).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Descrição completa</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.descricao}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-3">Histórico</h3>
                  <div className="space-y-3">
                    {[
                      { data: selected.dataCriacao, acao: "Demanda criada", autor: selected.eleitor },
                      { data: selected.dataAtualizacao, acao: "Atribuída a " + selected.responsavel, autor: "Sistema" },
                    ].map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground/40" />
                        <div>
                          <p className="text-xs font-medium">{h.acao}</p>
                          <p className="text-[11px] text-muted-foreground">{new Date(h.data).toLocaleDateString("pt-BR")} · {h.autor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
