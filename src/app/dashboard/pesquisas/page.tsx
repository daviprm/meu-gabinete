"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import {
  Search, Plus, Users, ClipboardCheck, UserCheck, MapPin, Calendar, User,
  Target, ShieldCheck, BarChart3, TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/ui/date-picker";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import {
  pesquisas, type Pesquisa,
  candidatosPrefeito, candidatosVereador,
  resultadosBairroPrefeito, resultadosBairroVereador,
  evolucaoPrefeito, evolucaoVereador,
  demograficosPrefeito, demograficosVereador,
  type ResultadoBairro,
} from "@/lib/mock-data";
import { aracajuBairrosGeoJSON } from "@/lib/geojson-aracaju";

const MapSection = dynamic(() => import("./map-section"), { ssr: false });

const statusColor: Record<string, string> = {
  Concluída: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Em andamento": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  Agendada: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
};

export default function PesquisasPage() {
  const [selected, setSelected] = useState<Pesquisa | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cargo, setCargo] = useState<"prefeito" | "vereador">("prefeito");

  const candidatos = cargo === "prefeito" ? candidatosPrefeito : candidatosVereador;
  const resultadosBairro = cargo === "prefeito" ? resultadosBairroPrefeito : resultadosBairroVereador;
  const evolucao = cargo === "prefeito" ? evolucaoPrefeito : evolucaoVereador;
  const demograficos = cargo === "prefeito" ? demograficosPrefeito : demograficosVereador;

  const totalEntrevistados = resultadosBairro.reduce((a, b) => a + b.totalEntrevistados, 0);

  const stats = [
    { label: "Total de pesquisas", value: pesquisas.length, icon: ClipboardCheck },
    { label: "Eleitores pesquisados", value: totalEntrevistados, icon: Users },
    { label: "Pesquisadores ativos", value: new Set(pesquisas.map((p) => p.pesquisador)).size, icon: UserCheck },
    { label: "Margem de erro", value: "±2,5%", icon: Target },
    { label: "Confiança", value: "95%", icon: ShieldCheck },
    { label: "Bairros cobertos", value: resultadosBairro.length, icon: MapPin },
  ];

  // Build colored GeoJSON for choropleth
  const coloredGeoJSON = useMemo(() => {
    const colorMap = new Map<string, string>();
    resultadosBairro.forEach((r) => colorMap.set(r.bairro, r.corLider));

    return {
      ...aracajuBairrosGeoJSON,
      features: aracajuBairrosGeoJSON.features.map((f: GeoJSON.Feature) => ({
        ...f,
        properties: {
          ...f.properties,
          cor: colorMap.get(f.properties?.nome ?? "") ?? "#888",
        },
      })),
    } as GeoJSON.FeatureCollection;
  }, [resultadosBairro]);

  // Recharts data for evolution
  const evolucaoData = useMemo(() => {
    return evolucao.map((e) => {
      const row: Record<string, string | number> = { mes: e.mes };
      e.candidatos.forEach((c) => {
        const cand = candidatos.find((x) => x.id === c.candidatoId);
        if (cand) row[cand.nome] = c.percentual;
      });
      return row;
    });
  }, [evolucao, candidatos]);

  // Recharts data for demographics
  const faixaEtariaData = useMemo(() => {
    return demograficos.faixaEtaria.map((f) => {
      const row: Record<string, string | number> = { faixa: f.faixa };
      f.candidatos.forEach((c) => {
        const cand = candidatos.find((x) => x.id === c.candidatoId);
        if (cand) row[cand.nome] = c.pct;
      });
      return row;
    });
  }, [demograficos, candidatos]);

  const generoData = useMemo(() => {
    return demograficos.genero.map((g) => {
      const row: Record<string, string | number> = { genero: g.genero };
      g.candidatos.forEach((c) => {
        const cand = candidatos.find((x) => x.id === c.candidatoId);
        if (cand) row[cand.nome] = c.pct;
      });
      return row;
    });
  }, [demograficos, candidatos]);

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
          <h1 className="text-lg font-semibold tracking-tight">Pesquisas Eleitorais</h1>
          <p className="text-sm text-muted-foreground">
            Mapa de intenção de voto, ranking de candidatos e análise demográfica.
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

      {/* Cargo selector */}
      <Tabs value={cargo} onValueChange={(v) => setCargo(v as "prefeito" | "vereador")}>
        <TabsList>
          <TabsTrigger value="prefeito">Prefeito</TabsTrigger>
          <TabsTrigger value="vereador">Vereador</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Map */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="p-3 border-b border-border flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">Mapa de Intenção de Voto por Bairro</h2>
        </div>
        <div className="relative">
          <div className="h-[400px] sm:h-[500px]">
            <MapSection
              coloredGeoJSON={coloredGeoJSON}
              resultadosBairro={resultadosBairro}
              candidatos={candidatos}
            />
          </div>
          {/* Legend */}
          <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur border border-border rounded-lg p-2.5 text-xs space-y-1">
            {candidatos.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: c.cor }} />
                <span className="text-muted-foreground">{c.nome}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ranking */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">Ranking de Candidatos</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {candidatos.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 rounded-lg border border-border p-3"
            >
              <div className="relative shrink-0">
                <img
                  src={c.foto}
                  alt={c.nome}
                  className="h-12 w-12 rounded-full object-cover border-2"
                  style={{ borderColor: c.cor }}
                />
                {i === 0 && (
                  <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    1
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium truncate">{c.nome}</p>
                  <Badge variant="secondary" className="text-[10px] shrink-0">{c.partido}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{c.numero}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: c.cor }}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.percentual}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                    />
                  </div>
                  <span className="text-xs font-semibold tabular-nums" style={{ color: c.cor }}>
                    {c.percentual}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Evolution Chart */}
      <div className="rounded-lg border border-border p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium">Evolução Temporal</h2>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolucaoData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="mes" className="text-xs" tick={{ fontSize: 11 }} />
              <YAxis className="text-xs" tick={{ fontSize: 11 }} unit="%" />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              {candidatos.map((c) => (
                <Line
                  key={c.id}
                  type="monotone"
                  dataKey={c.nome}
                  stroke={c.cor}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-lg border border-border p-4">
          <h2 className="text-sm font-medium mb-4">Por Faixa Etária</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={faixaEtariaData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                <YAxis dataKey="faixa" type="category" width={50} tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                {candidatos.slice(0, 4).map((c) => (
                  <Bar key={c.id} dataKey={c.nome} fill={c.cor} radius={[0, 2, 2, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border border-border p-4">
          <h2 className="text-sm font-medium mb-4">Por Gênero</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={generoData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis type="number" unit="%" tick={{ fontSize: 11 }} />
                <YAxis dataKey="genero" type="category" width={70} tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                {candidatos.slice(0, 4).map((c) => (
                  <Bar key={c.id} dataKey={c.nome} fill={c.cor} radius={[0, 2, 2, 0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Results table by neighborhood */}
      <div className="rounded-lg border border-border">
        <div className="p-3 border-b border-border">
          <h2 className="text-sm font-medium">Resultados por Bairro</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground">
                <th className="text-left px-4 py-2.5 font-medium">Bairro</th>
                <th className="text-right px-4 py-2.5 font-medium">Entrevistados</th>
                <th className="text-left px-4 py-2.5 font-medium">Líder</th>
                <th className="text-right px-4 py-2.5 font-medium">% Líder</th>
                <th className="text-left px-4 py-2.5 font-medium hidden sm:table-cell">2º Colocado</th>
              </tr>
            </thead>
            <tbody>
              {resultadosBairro.map((r) => {
                const sorted = [...r.candidatos].sort((a, b) => b.percentual - a.percentual);
                const segundo = candidatos.find((c) => c.id === sorted[1]?.candidatoId);
                return (
                  <tr key={r.bairro} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-2.5 font-medium">{r.bairro}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">{r.totalEntrevistados}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: r.corLider }} />
                        {r.lider}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums font-medium">{sorted[0]?.percentual}%</td>
                    <td className="px-4 py-2.5 text-muted-foreground hidden sm:table-cell">
                      {segundo?.nome} ({sorted[1]?.percentual}%)
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Separator />

      {/* Existing surveys listing */}
      <div>
        <h2 className="text-sm font-medium mb-3">Pesquisas de Campo</h2>

        <div className="relative max-w-sm mb-4">
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
