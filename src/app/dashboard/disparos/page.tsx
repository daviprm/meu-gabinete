"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Megaphone, Send, Eye, CheckCheck, MessageSquare, Users,
  TrendingUp, Calendar, Search, Plus, Clock, BarChart3, Target,
  FileText, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  PieChart, Pie, Cell, LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string; name: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-xs shadow-sm">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">{entry.name}: </span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
import {
  eleitores,
  pesquisas,
  segmentos,
  templatesWhatsApp,
  disparos,
  disparoEstatisticas,
  conversaoIntencao,
  type TemplateWhatsApp,
  type Disparo,
} from "@/lib/mock-data";

const tabs = ["Painel", "Templates", "Historico"] as const;

const intencaoColor: Record<string, string> = {
  "Favorável": "#10b981",
  "Indeciso": "#f59e0b",
  "Oposição": "#ef4444",
};

const intencaoBadge: Record<string, string> = {
  "Favorável": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Indeciso": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Oposição": "bg-red-500/10 text-red-600 dark:text-red-400",
  "Todos": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

const statusBadge: Record<string, string> = {
  "Enviado": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Agendado": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Em andamento": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Falha": "bg-red-500/10 text-red-600 dark:text-red-400",
};

const categoriaBadge: Record<string, string> = {
  "Marketing": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Pesquisa": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Engajamento": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Boas-vindas": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Lembrete": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};


export default function DisparosPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Painel");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateWhatsApp | null>(null);
  const [selectedDisparo, setSelectedDisparo] = useState<Disparo | null>(null);
  const [selectedDisparoTemplate, setSelectedDisparoTemplate] = useState<string>("");
  const [selectedDisparoIntencao, setSelectedDisparoIntencao] = useState<string>("Todos");

  // Compute intention distribution from eleitores
  const intencaoDistribuicao = useMemo(() => {
    const favoraveis = eleitores.filter((e) => e.intencao === "Favorável").length;
    const indecisos = eleitores.filter((e) => e.intencao === "Indeciso").length;
    const oposicao = eleitores.filter((e) => e.intencao === "Oposição").length;
    const total = eleitores.length;
    return [
      { name: "Favorável", value: favoraveis, pct: ((favoraveis / total) * 100).toFixed(1), color: "#10b981" },
      { name: "Indeciso", value: indecisos, pct: ((indecisos / total) * 100).toFixed(1), color: "#f59e0b" },
      { name: "Oposição", value: oposicao, pct: ((oposicao / total) * 100).toFixed(1), color: "#ef4444" },
    ];
  }, []);

  // KPI stats
  const totalDisparos = disparos.length;
  const totalEnviados = disparos.reduce((a, d) => a + d.enviados, 0);
  const totalEntregues = disparos.reduce((a, d) => a + d.entregues, 0);
  const totalLidos = disparos.reduce((a, d) => a + d.lidos, 0);
  const taxaEntrega = totalEnviados > 0 ? ((totalEntregues / totalEnviados) * 100).toFixed(1) : "0";
  const taxaLeitura = totalEntregues > 0 ? ((totalLidos / totalEntregues) * 100).toFixed(1) : "0";
  const indecisosAbordados = disparos.filter((d) => d.intencao === "Indeciso").reduce((a, d) => a + d.destinatarios, 0);
  const conversaoPosDisparo = "29.5";

  const stats = [
    { label: "Total de Disparos", value: totalDisparos, icon: Megaphone },
    { label: "Mensagens Enviadas", value: totalEnviados, icon: Send },
    { label: "Taxa de Entrega", value: `${taxaEntrega}%`, icon: CheckCheck },
    { label: "Taxa de Leitura", value: `${taxaLeitura}%`, icon: Eye },
    { label: "Indecisos Abordados", value: indecisosAbordados, icon: Users },
    { label: "Conversão Pós-Disparo", value: `${conversaoPosDisparo}%`, icon: TrendingUp },
  ];

  // Disparos enviados por intencao (for resumo cards)
  const disparosFavoraveis = disparos.filter((d) => d.intencao === "Favorável").reduce((a, d) => a + d.enviados, 0);
  const disparosIndecisos = disparos.filter((d) => d.intencao === "Indeciso").reduce((a, d) => a + d.enviados, 0);
  const disparosOposicao = disparos.filter((d) => d.intencao === "Oposição").reduce((a, d) => a + d.enviados, 0);

  // Template preview for dialog
  const previewTemplate = templatesWhatsApp.find((t) => t.id === selectedDisparoTemplate);

  const handleUsarTemplate = (template: TemplateWhatsApp) => {
    setSelectedTemplate(null);
    setSelectedDisparoTemplate(template.id);
    setDialogOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Disparos</h1>
          <p className="text-sm text-muted-foreground">
            Envie mensagens direcionadas com base em pesquisas e intenção de voto.
          </p>
        </div>
        <Button size="sm" className="gap-1.5 shrink-0" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Novo Disparo</span>
          <span className="sm:hidden">Novo</span>
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center gap-3 rounded-lg border border-border p-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-xl font-semibold tracking-tight truncate">{s.value}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

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
            {tab === "Historico" ? "Histórico" : tab}
          </button>
        ))}
      </div>

      {/* ========== TAB: PAINEL ========== */}
      {activeTab === "Painel" && (
        <div className="space-y-6">
          {/* Pie Chart + Resumo cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Pie Chart */}
            <div className="rounded-lg border border-border p-4">
              <h2 className="text-sm font-medium mb-4">Distribuição de Intenção de Voto</h2>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={intencaoDistribuicao}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      dataKey="value"
                      stroke="none"
                    >
                      {intencaoDistribuicao.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2">
                {intencaoDistribuicao.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 Resumo cards */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {intencaoDistribuicao.map((d) => (
                <div key={d.name} className="rounded-lg border border-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={intencaoBadge[d.name]}>{d.name}</Badge>
                    <span className="text-2xl font-bold tabular-nums">{d.value}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Percentual</span>
                      <span className="font-medium tabular-nums">{d.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: d.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${d.pct}%` }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Disparos enviados</span>
                    <span className="font-medium tabular-nums">
                      {d.name === "Favorável" ? disparosFavoraveis : d.name === "Indeciso" ? disparosIndecisos : disparosOposicao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stacked Bar Chart: Volume por semana */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-medium">Volume de Disparos por Semana</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={disparoEstatisticas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="semana" fontSize={12} stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="favoraveis" name="Favoráveis" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="indecisos" name="Indecisos" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="oposicao" name="Oposição" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart: Taxa de conversão */}
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-medium">Taxa de Conversão Pós-Disparo</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversaoIntencao}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="mes" fontSize={12} stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} stroke="var(--color-muted-foreground)" tickLine={false} axisLine={false} unit="%" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="taxaConversao" name="Taxa de Conversão" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="indecisosConvertidos" name="Indecisos Convertidos" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="oposicaoConvertidos" name="Oposição Convertidos" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Lista rapida ultimos disparos */}
          <div>
            <h2 className="text-sm font-medium mb-3">Últimos Disparos</h2>
            <div className="space-y-2">
              {disparos.slice(0, 5).map((d, i) => (
                <motion.div
                  key={d.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedDisparo(d)}
                  className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{d.templateNome}</p>
                      <Badge variant="secondary" className={intencaoBadge[d.intencao]}>{d.intencao}</Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{d.segmento} · {d.destinatarios} destinatários</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <Badge variant="secondary" className={statusBadge[d.status]}>{d.status}</Badge>
                    <p className="text-[11px] text-muted-foreground mt-0.5 tabular-nums">
                      {new Date(d.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== TAB: TEMPLATES ========== */}
      {activeTab === "Templates" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Templates disponíveis para disparo</p>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => setTemplateDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Novo Template
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {templatesWhatsApp.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedTemplate(t)}
                className="rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium">{t.nome}</h3>
                  <Badge variant="secondary" className={`shrink-0 text-[10px] ${categoriaBadge[t.categoria]}`}>
                    {t.categoria}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-3">{t.mensagem}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Usado {t.vezesUsado}x</span>
                  <span className="tabular-nums">{new Date(t.ultimoUso).toLocaleDateString("pt-BR")}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ========== TAB: HISTÓRICO ========== */}
      {activeTab === "Historico" && (
        <div className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block rounded-lg border border-border">
            <div className="grid grid-cols-[1fr_120px_90px_80px_160px_90px_90px_1fr] gap-4 border-b border-border px-4 py-2.5 text-xs font-medium text-muted-foreground">
              <span>Template</span>
              <span>Segmento</span>
              <span>Intenção</span>
              <span className="text-right">Dest.</span>
              <span>Funil</span>
              <span>Status</span>
              <span>Data</span>
              <span>Pesquisa</span>
            </div>
            {disparos.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedDisparo(d)}
                className="grid grid-cols-[1fr_120px_90px_80px_160px_90px_90px_1fr] items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <span className="font-medium truncate">{d.templateNome}</span>
                <span className="text-muted-foreground truncate">{d.segmento}</span>
                <Badge variant="secondary" className={`text-[10px] ${intencaoBadge[d.intencao]}`}>{d.intencao}</Badge>
                <span className="text-right tabular-nums text-muted-foreground">{d.destinatarios}</span>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground tabular-nums">
                  <span>{d.enviados}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{d.entregues}</span>
                  <ArrowRight className="h-3 w-3" />
                  <span>{d.lidos}</span>
                </div>
                <Badge variant="secondary" className={`text-[10px] ${statusBadge[d.status]}`}>{d.status}</Badge>
                <span className="text-muted-foreground tabular-nums">{new Date(d.data).toLocaleDateString("pt-BR")}</span>
                <span className="text-muted-foreground truncate text-xs">{d.pesquisaVinculada || "—"}</span>
              </motion.div>
            ))}
          </div>

          {/* Mobile Cards */}
          <div className="space-y-2 md:hidden">
            {disparos.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedDisparo(d)}
                className="rounded-lg border border-border p-3 active:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium">{d.templateNome}</p>
                  <Badge variant="secondary" className={`shrink-0 text-[10px] ${statusBadge[d.status]}`}>{d.status}</Badge>
                </div>
                <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className={`text-[10px] ${intencaoBadge[d.intencao]}`}>{d.intencao}</Badge>
                  <span className="text-xs text-muted-foreground">{d.segmento}</span>
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="tabular-nums">{d.destinatarios} dest.</span>
                  <span className="tabular-nums">{d.enviados}→{d.entregues}→{d.lidos}</span>
                  <span className="tabular-nums ml-auto">{new Date(d.data).toLocaleDateString("pt-BR")}</span>
                </div>
                {d.pesquisaVinculada && (
                  <p className="mt-1 text-[11px] text-muted-foreground/70 truncate">{d.pesquisaVinculada}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ========== DIALOG: NOVO DISPARO ========== */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Disparo</DialogTitle>
            <DialogDescription>Configure e envie mensagens para um segmento de eleitores.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Select value={selectedDisparoTemplate} onValueChange={setSelectedDisparoTemplate}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um template" />
                </SelectTrigger>
                <SelectContent>
                  {templatesWhatsApp.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Segmento</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um segmento" />
                </SelectTrigger>
                <SelectContent>
                  {segmentos.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.nome} ({s.eleitores})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Filtro de Intenção</Label>
              <div className="flex gap-2">
                {["Todos", "Favorável", "Indeciso", "Oposição"].map((i) => (
                  <Button
                    key={i}
                    variant={selectedDisparoIntencao === i ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedDisparoIntencao(i)}
                  >
                    {i}
                  </Button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Vincular a Pesquisa (opcional)</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Nenhuma pesquisa" />
                </SelectTrigger>
                <SelectContent>
                  {pesquisas.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Agendar envio (opcional)</Label>
              <DatePicker placeholder="Selecionar data de envio" />
            </div>

            {/* Preview */}
            {previewTemplate && (
              <div className="space-y-2">
                <Label>Preview da mensagem</Label>
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600">WhatsApp Preview</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{previewTemplate.mensagem}</p>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setDialogOpen(false)}>
              <Send className="h-4 w-4 mr-1.5" />
              Enviar Disparo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== DIALOG: NOVO TEMPLATE ========== */}
      <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Template</DialogTitle>
            <DialogDescription>Crie um novo template de mensagem WhatsApp.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 overflow-y-auto px-6 py-4">
            <div className="space-y-2">
              <Label>Nome do template</Label>
              <Input placeholder="Ex: Convite para evento" />
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {["Marketing", "Pesquisa", "Engajamento", "Boas-vindas", "Lembrete"].map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Segmento alvo</Label>
              <Input placeholder="Ex: Indecisos, Favoráveis..." />
            </div>
            <div className="space-y-2">
              <Label>Mensagem</Label>
              <Textarea placeholder="Use {{nome}} e {{bairro}} como placeholders..." rows={5} />
              <p className="text-[11px] text-muted-foreground">
                Placeholders disponíveis: {"{{nome}}"}, {"{{bairro}}"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateDialogOpen(false)}>Cancelar</Button>
            <Button onClick={() => setTemplateDialogOpen(false)}>Criar Template</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ========== SHEET: DETALHES TEMPLATE ========== */}
      <Sheet open={!!selectedTemplate} onOpenChange={(open) => !open && setSelectedTemplate(null)}>
        <SheetContent>
          {selectedTemplate && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedTemplate.nome}</SheetTitle>
                <SheetDescription>Detalhes do template</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <Badge variant="secondary" className={categoriaBadge[selectedTemplate.categoria]}>
                  {selectedTemplate.categoria}
                </Badge>

                <div className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">Mensagem</h3>
                  <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                    <p className="text-sm leading-relaxed">{selectedTemplate.mensagem}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Segmento alvo:</span>
                    <span className="font-medium">{selectedTemplate.segmentoAlvo}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Send className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Vezes usado:</span>
                    <span className="font-medium tabular-nums">{selectedTemplate.vezesUsado}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Criado em:</span>
                    <span className="font-medium">{new Date(selectedTemplate.criadoEm).toLocaleDateString("pt-BR")}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Último uso:</span>
                    <span className="font-medium">{new Date(selectedTemplate.ultimoUso).toLocaleDateString("pt-BR")}</span>
                  </div>
                </div>

                <Separator />

                <Button className="w-full gap-1.5" onClick={() => handleUsarTemplate(selectedTemplate)}>
                  <Send className="h-4 w-4" />
                  Usar Template
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ========== SHEET: DETALHES DISPARO ========== */}
      <Sheet open={!!selectedDisparo} onOpenChange={(open) => !open && setSelectedDisparo(null)}>
        <SheetContent>
          {selectedDisparo && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedDisparo.templateNome}</SheetTitle>
                <SheetDescription>Detalhes do disparo</SheetDescription>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto px-4 space-y-5">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={statusBadge[selectedDisparo.status]}>{selectedDisparo.status}</Badge>
                  <Badge variant="secondary" className={intencaoBadge[selectedDisparo.intencao]}>{selectedDisparo.intencao}</Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Segmento:</span>
                    <span className="font-medium">{selectedDisparo.segmento}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Data:</span>
                    <span className="font-medium">{new Date(selectedDisparo.data).toLocaleDateString("pt-BR")}</span>
                  </div>
                  {selectedDisparo.pesquisaVinculada && (
                    <div className="flex items-center gap-2.5 text-sm">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Pesquisa:</span>
                      <span className="font-medium">{selectedDisparo.pesquisaVinculada}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Funil */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Funil de Entrega</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Destinatários", value: selectedDisparo.destinatarios, max: selectedDisparo.destinatarios, color: "bg-blue-500" },
                      { label: "Enviados", value: selectedDisparo.enviados, max: selectedDisparo.destinatarios, color: "bg-violet-500" },
                      { label: "Entregues", value: selectedDisparo.entregues, max: selectedDisparo.destinatarios, color: "bg-emerald-500" },
                      { label: "Lidos", value: selectedDisparo.lidos, max: selectedDisparo.destinatarios, color: "bg-amber-500" },
                      { label: "Falhas", value: selectedDisparo.falhas, max: selectedDisparo.destinatarios, color: "bg-red-500" },
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{item.label}</span>
                          <span className="font-medium tabular-nums">
                            {item.value} ({item.max > 0 ? ((item.value / item.max) * 100).toFixed(0) : 0}%)
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.max > 0 ? (item.value / item.max) * 100 : 0}%` }}
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
