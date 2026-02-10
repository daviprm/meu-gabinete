"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Users,
  ClipboardList,
  MapPin,
  TrendingUp,
  BarChart3,
  Download,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const relatorios = [
  { id: "1", titulo: "Relatório de Eleitores", descricao: "Análise completa da base de eleitores por região, intenção e tags.", icon: Users },
  { id: "2", titulo: "Relatório de Demandas", descricao: "Visão geral das demandas: abertas, concluídas e taxa de resolução.", icon: ClipboardList },
  { id: "3", titulo: "Relatório de Pesquisas", descricao: "Resultados consolidados das pesquisas de campo realizadas.", icon: BarChart3 },
  { id: "4", titulo: "Mapa de Cobertura", descricao: "Distribuição geográfica do atendimento por bairro.", icon: MapPin },
  { id: "5", titulo: "Desempenho da Equipe", descricao: "Métricas de produtividade por membro da equipe.", icon: TrendingUp },
  { id: "6", titulo: "Relatório Geral", descricao: "Resumo executivo com todos os indicadores do gabinete.", icon: FileText },
];

const miniChartData = [35, 42, 28, 55, 48, 62, 58, 70, 65, 78, 72, 85];

export default function RelatoriosPage() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Relatórios</h1>
        <p className="text-sm text-muted-foreground">
          Gere e exporte relatórios detalhados.
        </p>
      </div>

      {/* Last report preview */}
      <div className="rounded-lg border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium">Último relatório gerado</p>
            <p className="text-xs text-muted-foreground">Relatório Geral · 05/02/2026</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Visualizar
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="h-3.5 w-3.5" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* Mini chart */}
        <div className="flex items-end gap-1.5 h-16">
          {miniChartData.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(v / 100) * 100}%` }}
              transition={{ delay: 0.3 + i * 0.04, duration: 0.4 }}
              className="flex-1 rounded-sm bg-foreground/10"
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] text-muted-foreground tabular-nums">
          <span>Jan</span>
          <span>Fev</span>
          <span>Mar</span>
          <span>Abr</span>
          <span>Mai</span>
          <span>Jun</span>
          <span>Jul</span>
          <span>Ago</span>
          <span>Set</span>
          <span>Out</span>
          <span>Nov</span>
          <span>Dez</span>
        </div>
      </div>

      {/* Reports grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatorios.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex flex-col justify-between rounded-lg border border-border p-4 hover:bg-muted/30 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <r.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <h3 className="text-sm font-medium">{r.titulo}</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r.descricao}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              Gerar Relatório
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
