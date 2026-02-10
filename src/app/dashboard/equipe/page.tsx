"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Users, ClipboardCheck, Search as SearchIcon, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { equipe, type MembroEquipe } from "@/lib/mock-data";

const papelColor: Record<string, string> = {
  Coordenador: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  Pesquisadora: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Assessor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Motorista: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Secretária: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
};

export default function EquipePage() {
  const [selected, setSelected] = useState<MembroEquipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Equipe</h1>
          <p className="text-sm text-muted-foreground">Gerencie os membros da sua equipe.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Convidar Membro
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Convidar Membro</DialogTitle>
              <DialogDescription>Adicione um novo membro à equipe do gabinete.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Nome completo</Label>
                  <Input placeholder="Nome do membro" />
                </div>
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="email@gabinete.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label>Papel</Label>
                  <Input placeholder="Ex: Assessor" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Região de atuação</Label>
                <Input placeholder="Ex: Zona Norte" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setDialogOpen(false)}>Enviar Convite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {equipe.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => setSelected(m)}
            className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-muted text-xs font-medium">{m.avatar}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium truncate hover:underline underline-offset-4 decoration-muted-foreground/40">{m.nome}</p>
                  <Badge variant="secondary" className={papelColor[m.papel] || "bg-muted"}>{m.papel}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{m.regiao}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span className="tabular-nums">{m.eleitoresAtendidos}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClipboardCheck className="h-3 w-3" />
                <span className="tabular-nums">{m.demandasResolvidas}</span>
              </div>
              <div className="flex items-center gap-1">
                <SearchIcon className="h-3 w-3" />
                <span className="tabular-nums">{m.pesquisasRealizadas}</span>
              </div>
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
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-muted text-sm font-medium">{selected.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selected.nome}</SheetTitle>
                    <SheetDescription>
                      <Badge variant="secondary" className={`mt-0.5 ${papelColor[selected.papel] || "bg-muted"}`}>
                        {selected.papel}
                      </Badge>
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.email}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.regiao}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-3">Métricas</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Eleitores", value: selected.eleitoresAtendidos, icon: Users },
                      { label: "Demandas", value: selected.demandasResolvidas, icon: ClipboardCheck },
                      { label: "Pesquisas", value: selected.pesquisasRealizadas, icon: SearchIcon },
                    ].map((m) => (
                      <div key={m.label} className="rounded-lg border border-border p-3 text-center">
                        <m.icon className="mx-auto h-4 w-4 text-muted-foreground mb-1" />
                        <p className="text-lg font-semibold tabular-nums">{m.value}</p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-3">Atividade recente</h3>
                  <div className="space-y-3">
                    {[
                      { acao: "Pesquisa concluída - Zona Norte", data: "08/02/2026" },
                      { acao: "Demanda resolvida - Iluminação", data: "05/02/2026" },
                      { acao: "3 eleitores cadastrados", data: "03/02/2026" },
                    ].map((a, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 rounded-full bg-muted-foreground/40" />
                        <div>
                          <p className="text-xs font-medium">{a.acao}</p>
                          <p className="text-[11px] text-muted-foreground">{a.data}</p>
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
