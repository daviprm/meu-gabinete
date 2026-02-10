"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Mail, Phone, Send } from "lucide-react";
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
import { segmentos, comunicacoes, type Segmento, type Comunicacao } from "@/lib/mock-data";

const tabs = ["Segmentos", "Histórico"] as const;

const tipoIcon: Record<string, typeof MessageSquare> = {
  WhatsApp: MessageSquare,
  SMS: Send,
  Email: Mail,
  Ligação: Phone,
};

const tipoColor: Record<string, string> = {
  WhatsApp: "text-emerald-500",
  SMS: "text-blue-500",
  Email: "text-violet-500",
  Ligação: "text-amber-500",
};

const statusBadge: Record<string, string> = {
  Enviado: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Entregue: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Lido: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Falha: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export default function ComunicacaoPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Segmentos");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedSegmento, setSelectedSegmento] = useState<Segmento | null>(null);
  const [selectedCom, setSelectedCom] = useState<Comunicacao | null>(null);

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Comunicação</h1>
          <p className="text-sm text-muted-foreground">Gerencie segmentos e histórico de comunicações.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setDialogOpen(true)}>
          <Send className="h-4 w-4" />
          Nova Comunicação
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Comunicação</DialogTitle>
            <DialogDescription>Envie uma mensagem para um segmento de eleitores.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <div className="flex gap-2">
                {["WhatsApp", "SMS", "Email", "Ligação"].map((t) => (
                  <Button key={t} variant="outline" size="sm" className="flex-1">{t}</Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Segmento</Label>
              <Input placeholder="Selecione um segmento..." />
            </div>
            <div className="space-y-2">
              <Label>Mensagem</Label>
              <Textarea placeholder="Escreva sua mensagem..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Agendar envio</Label>
              <DatePicker placeholder="Selecionar data de envio" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setDialogOpen(false)}>Enviar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-border p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              activeTab === tab
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Segmentos" && (
        <div className="space-y-3">
          {segmentos.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedSegmento(s)}
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium hover:underline underline-offset-4 decoration-muted-foreground/40">{s.nome}</p>
                  <Badge variant="outline" className="text-[11px] tabular-nums">
                    <Users className="mr-1 h-3 w-3" />
                    {s.eleitores}
                  </Badge>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.criterios}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-xs text-muted-foreground">{s.ultimaAcao}</p>
                <p className="text-[11px] text-muted-foreground/60">{s.ultimaAcaoData}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === "Histórico" && (
        <div className="space-y-3">
          {comunicacoes.map((c, i) => {
            const Icon = tipoIcon[c.tipo] || MessageSquare;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedCom(c)}
                className="flex items-start gap-3 rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className={`h-4 w-4 ${tipoColor[c.tipo]}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium hover:underline underline-offset-4 decoration-muted-foreground/40">{c.tipo}</p>
                    <Badge variant="secondary" className={statusBadge[c.status]}>{c.status}</Badge>
                    <span className="text-[11px] text-muted-foreground tabular-nums ml-auto">
                      {new Date(c.data).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{c.segmento} · {c.destinatarios} destinatários</p>
                  <p className="mt-1 text-xs text-muted-foreground/70 truncate">{c.mensagem}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Sheet Segmento */}
      <Sheet open={!!selectedSegmento} onOpenChange={(open) => !open && setSelectedSegmento(null)}>
        <SheetContent>
          {selectedSegmento && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedSegmento.nome}</SheetTitle>
                <SheetDescription>Detalhes do segmento</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="tabular-nums">
                    <Users className="mr-1 h-3 w-3" />
                    {selectedSegmento.eleitores} eleitores
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">Critérios</h3>
                  <p className="text-sm">{selectedSegmento.criterios}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">Última ação</h3>
                  <p className="text-sm">{selectedSegmento.ultimaAcao}</p>
                  <p className="text-xs text-muted-foreground">{selectedSegmento.ultimaAcaoData}</p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Sheet Comunicação */}
      <Sheet open={!!selectedCom} onOpenChange={(open) => !open && setSelectedCom(null)}>
        <SheetContent>
          {selectedCom && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedCom.tipo} - {selectedCom.segmento}</SheetTitle>
                <SheetDescription>Detalhes da comunicação</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={statusBadge[selectedCom.status]}>{selectedCom.status}</Badge>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {new Date(selectedCom.data).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">Destinatários</h3>
                  <p className="text-sm tabular-nums">{selectedCom.destinatarios} eleitores</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">Mensagem</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selectedCom.mensagem}</p>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}
