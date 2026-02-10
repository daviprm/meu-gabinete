"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Users, ClipboardCheck, UserCheck, MapPin, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { pesquisas, type Pesquisa } from "@/lib/mock-data";

const statusColor: Record<string, string> = {
  Concluída: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Em andamento": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Agendada: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const stats = [
  { label: "Total de pesquisas", value: pesquisas.length, icon: ClipboardCheck },
  { label: "Eleitores pesquisados", value: pesquisas.reduce((a, p) => a + p.eleitores, 0), icon: Users },
  { label: "Pesquisadores ativos", value: new Set(pesquisas.map((p) => p.pesquisador)).size, icon: UserCheck },
];

export default function PesquisasPage() {
  const [selected, setSelected] = useState<Pesquisa | null>(null);
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
          <h1 className="text-lg font-semibold tracking-tight">Pesquisas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie as pesquisas de campo e acompanhe resultados.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5 shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nova Pesquisa</span>
              <span className="sm:hidden">Nova</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Pesquisa</DialogTitle>
              <DialogDescription>Cadastre uma nova pesquisa de campo.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto px-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="pesquisa-nome">Nome da pesquisa</Label>
                <Input id="pesquisa-nome" placeholder="Ex: Pesquisa Centro - Jan/26" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="pesquisa-data">Data</Label>
                  <DatePicker placeholder="Selecionar data" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pesquisa-bairro">Bairro</Label>
                  <Input id="pesquisa-bairro" placeholder="Ex: Centro" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pesquisa-pesquisador">Pesquisador responsável</Label>
                <Input id="pesquisa-pesquisador" placeholder="Nome do pesquisador" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pesquisa-obs">Observações</Label>
                <Textarea id="pesquisa-obs" placeholder="Detalhes adicionais sobre a pesquisa..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setDialogOpen(false)}>Criar Pesquisa</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border p-3 sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar pesquisa..." className="pl-9" />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_100px_120px_140px_80px_100px] gap-4 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span>Nome</span>
          <span>Data</span>
          <span>Bairro</span>
          <span>Pesquisador</span>
          <span className="text-right">Eleitores</span>
          <span className="text-right">Status</span>
        </div>
        {pesquisas.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(p)}
            className="grid grid-cols-[1fr_100px_120px_140px_80px_100px] items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <span className="font-medium truncate">{p.nome}</span>
            <span className="text-muted-foreground">{new Date(p.data).toLocaleDateString("pt-BR")}</span>
            <span className="text-muted-foreground">{p.bairro}</span>
            <span className="text-muted-foreground">{p.pesquisador}</span>
            <span className="text-right tabular-nums">{p.eleitores}</span>
            <span className="flex justify-end">
              <Badge variant="secondary" className={statusColor[p.status]}>{p.status}</Badge>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="space-y-2 md:hidden">
        {pesquisas.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelected(p)}
            className="rounded-lg border border-border p-3 active:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium">{p.nome}</p>
              <Badge variant="secondary" className={`shrink-0 text-[10px] ${statusColor[p.status]}`}>{p.status}</Badge>
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
              <span>{p.bairro}</span>
              <span className="tabular-nums">{new Date(p.data).toLocaleDateString("pt-BR")}</span>
              <span className="tabular-nums">{p.eleitores} eleitores</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{p.pesquisador}</p>
          </motion.div>
        ))}
      </div>

      {/* Sheet */}
      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent>
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.nome}</SheetTitle>
                <SheetDescription>Detalhes da pesquisa de campo</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <Badge variant="secondary" className={statusColor[selected.status]}>
                  {selected.status}
                </Badge>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium">{new Date(selected.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Bairro:</span>
                    <span className="font-medium">{selected.bairro}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Pesquisador:</span>
                    <span className="font-medium">{selected.pesquisador}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Eleitores:</span>
                    <span className="font-medium tabular-nums">{selected.eleitores}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-2">Resumo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Pesquisa realizada no bairro {selected.bairro} com {selected.eleitores} eleitores
                    entrevistados pelo pesquisador {selected.pesquisador}.
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-medium mb-3">Resultados</h3>
                  <div className="space-y-2">
                    {[
                      { label: "Favorável", pct: 58, color: "bg-emerald-500" },
                      { label: "Indeciso", pct: 27, color: "bg-amber-500" },
                      { label: "Oposição", pct: 15, color: "bg-red-500" },
                    ].map((r) => (
                      <div key={r.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{r.label}</span>
                          <span className="font-medium tabular-nums">{r.pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${r.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${r.pct}%` }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                          />
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
