"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Phone, Mail, MapPin, Tag, FileText, Clock } from "lucide-react";
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
import { eleitores, type Eleitor } from "@/lib/mock-data";

const intencaoBadge: Record<string, string> = {
  Favorável: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Indeciso: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Oposição: "bg-red-500/10 text-red-600 dark:text-red-400",
};

const intencaoRing: Record<string, string> = {
  Favorável: "ring-emerald-500",
  Indeciso: "ring-amber-500",
  Oposição: "ring-red-500",
};

export default function EleitoresPage() {
  const [selected, setSelected] = useState<Eleitor | null>(null);
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
          <h1 className="text-lg font-semibold tracking-tight">Eleitores</h1>
          <p className="text-sm text-muted-foreground">Base completa de eleitores cadastrados.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              Novo Eleitor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Eleitor</DialogTitle>
              <DialogDescription>Cadastre um novo eleitor na base.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 overflow-y-auto px-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nome completo</Label>
                  <Input placeholder="Nome do eleitor" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>E-mail</Label>
                  <Input type="email" placeholder="email@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label>Bairro</Label>
                  <Input placeholder="Bairro" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Intenção de voto</Label>
                <div className="flex gap-2">
                  {["Favorável", "Indeciso", "Oposição"].map((i) => (
                    <Button key={i} variant="outline" size="sm" className="flex-1">{i}</Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Saúde, Educação, Transporte..." />
              </div>
              <div className="space-y-2">
                <Label>Observações</Label>
                <Textarea placeholder="Anotações sobre o eleitor..." rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => setDialogOpen(false)}>Cadastrar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar por nome, bairro..." className="pl-9" />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_120px_130px_100px_1fr_100px] gap-4 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
          <span>Nome</span>
          <span>Bairro</span>
          <span>Telefone</span>
          <span>Intenção</span>
          <span>Tags</span>
          <span className="text-right">Cadastro</span>
        </div>
        {eleitores.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => setSelected(e)}
            className="grid cursor-pointer grid-cols-[1fr_120px_130px_100px_1fr_100px] items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-0 transition-colors hover:bg-muted/50"
          >
            <span className="font-medium truncate hover:underline underline-offset-4 decoration-muted-foreground/40">{e.nome}</span>
            <span className="text-muted-foreground">{e.bairro}</span>
            <span className="text-muted-foreground tabular-nums">{e.telefone}</span>
            <Badge variant="secondary" className={intencaoBadge[e.intencao]}>{e.intencao}</Badge>
            <div className="flex gap-1 overflow-hidden">
              {e.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>
              ))}
            </div>
            <span className="text-right text-muted-foreground">{new Date(e.dataCadastro).toLocaleDateString("pt-BR")}</span>
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
                  <img
                    src={selected.foto}
                    alt={selected.nome}
                    className={`h-12 w-12 rounded-full object-cover ring-2 ${intencaoRing[selected.intencao]}`}
                  />
                  <div>
                    <SheetTitle>{selected.nome}</SheetTitle>
                    <SheetDescription>{selected.bairro}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <Badge variant="secondary" className={intencaoBadge[selected.intencao]}>
                  {selected.intencao}
                </Badge>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.telefone}</span>
                  </div>
                  {selected.email && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selected.email}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{selected.bairro}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Desde {new Date(selected.dataCadastro).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Tag className="h-3.5 w-3.5" />
                    Tags
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selected.tags.map((t) => (
                      <Badge key={t} variant="outline" className="text-[11px]">{t}</Badge>
                    ))}
                  </div>
                </div>

                {selected.observacoes && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                        <FileText className="h-3.5 w-3.5" />
                        Observações
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{selected.observacoes}</p>
                    </div>
                  </>
                )}

                <Separator />

                <div>
                  <h3 className="text-xs font-medium text-muted-foreground mb-3">Timeline de intenção</h3>
                  <div className="space-y-3">
                    {[
                      { data: "01/12/2025", intencao: "Indeciso" },
                      { data: "15/12/2025", intencao: "Favorável" },
                      { data: "05/01/2026", intencao: selected.intencao },
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground/40" />
                        <span className="text-xs text-muted-foreground tabular-nums">{t.data}</span>
                        <Badge variant="secondary" className={`text-[10px] ${intencaoBadge[t.intencao]}`}>
                          {t.intencao}
                        </Badge>
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
