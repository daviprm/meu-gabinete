"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  MapPin,
  Users,
  BarChart3,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Rocket,
  Check,
  Search,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ClipboardCheck,
  Tag,
  Filter,
  TrendingUp,
  FileText,
  Shield,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ─── step data ─── */
const steps = [
  {
    tag: "Bem-vindo",
    title: "Meu Gabinete",
    subtitle: "Sua plataforma completa de gestão parlamentar",
    description:
      "Gerencie eleitores, pesquisas, demandas e comunicações em um único lugar — com inteligência geográfica e dados em tempo real.",
    icon: Sparkles,
    features: [
      "Gestão completa de eleitores",
      "Mapa eleitoral interativo",
      "Pesquisas de campo",
      "Relatórios inteligentes",
    ],
  },
  {
    tag: "Mapa Eleitoral",
    title: "Visualize sua base",
    subtitle: "Mapa interativo com dados geográficos",
    description:
      "Localize cada eleitor no mapa, filtre por intenção de voto, bairro e tags. Clique nos pins para ver detalhes completos.",
    icon: MapPin,
    features: [
      "Pins com foto do eleitor",
      "Cores por intenção de voto",
      "Filtros inteligentes",
      "Fly-to automático",
    ],
  },
  {
    tag: "Eleitores",
    title: "Base de contatos",
    subtitle: "Cadastro completo e organizado",
    description:
      "Mantenha o perfil de cada eleitor atualizado — com histórico de interações, tags, demandas e intenção de voto.",
    icon: Users,
    features: [
      "Perfil detalhado",
      "Tags e segmentação",
      "Histórico de interações",
      "Busca avançada",
    ],
  },
  {
    tag: "Pesquisas",
    title: "Pesquisas de campo",
    subtitle: "Dados reais da sua região",
    description:
      "Crie pesquisas, acompanhe resultados e visualize a evolução da intenção de voto nos bairros.",
    icon: BarChart3,
    features: [
      "Pesquisadores dedicados",
      "Resultados em tempo real",
      "Gráficos por bairro",
      "Exportação de dados",
    ],
  },
  {
    tag: "Agenda & Comunicação",
    title: "Organize e comunique",
    subtitle: "Calendário e mensagens integrados",
    description:
      "Agende reuniões, visitas e eventos. Envie comunicações segmentadas por WhatsApp, SMS ou email.",
    icon: Calendar,
    features: [
      "Calendário interativo",
      "Segmentos de eleitores",
      "Envio por WhatsApp/SMS",
      "Histórico completo",
    ],
  },
  {
    tag: "Vamos começar",
    title: "Tudo pronto!",
    subtitle: "Seu gabinete está configurado",
    description:
      "Explore o dashboard, cadastre eleitores e comece a tomar decisões baseadas em dados.",
    icon: Rocket,
    features: [],
  },
];

/* ─── animation variants ─── */
const overlayV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const containerV: Variants = {
  hidden: { opacity: 0, scale: 0.88, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scale: 0.92, y: -30, transition: { duration: 0.4 } },
};

const slideV: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.85, filter: "blur(8px)" }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -400 : 400,
    opacity: 0,
    scale: 0.85,
    filter: "blur(8px)",
    transition: { duration: 0.4 },
  }),
};

const featureItemV: Variants = {
  hidden: { opacity: 0, x: -24, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { delay: 0.35 + i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

const previewV: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.88, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(3px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.4 + i * 0.09, duration: 0.45 },
  }),
};

/* ─── floating particles ─── */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-foreground/[0.04]"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
          }}
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 15 + Math.random() * 15, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

/* ─── glow orbs ─── */
function GlowOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-foreground/[0.02]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(80px)" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-foreground/[0.02]"
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1.1, 1, 1.1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ filter: "blur(80px)" }}
      />
    </div>
  );
}

/* ─── progress bar ─── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="h-1.5 rounded-full"
          initial={false}
          animate={{
            width: i === current ? 40 : 10,
            backgroundColor: i <= current ? "var(--color-foreground)" : "var(--color-muted-foreground)",
            opacity: i <= current ? 1 : 0.2,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/* ─── glass container helper ─── */
const glass = "rounded-2xl border border-foreground/[0.06] bg-foreground/[0.03] backdrop-blur-xl";
const glassInner = "rounded-xl border border-foreground/[0.05] bg-foreground/[0.02] backdrop-blur-sm";

/* ════════════════════════════════════════════════
   PREVIEW COMPONENTS — mini mockups das páginas
   ════════════════════════════════════════════════ */

/* ── Welcome: Dashboard overview mockup ── */
function PreviewWelcome() {
  const modules = [
    { icon: MapPin, label: "Mapa" },
    { icon: Users, label: "Eleitores" },
    { icon: BarChart3, label: "Pesquisas" },
    { icon: Calendar, label: "Agenda" },
    { icon: MessageSquare, label: "Comunicação" },
    { icon: FileText, label: "Relatórios" },
    { icon: Users, label: "Equipe" },
    { icon: Settings, label: "Config" },
  ];

  return (
    <motion.div variants={previewV} initial="hidden" animate="visible" className="w-full max-w-md">
      <div className={`${glass} overflow-hidden`}>
        {/* Mini browser chrome */}
        <div className="flex items-center gap-2 border-b border-foreground/[0.06] px-4 py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-foreground/10" />
          <div className="ml-3 h-5 flex-1 rounded-lg bg-foreground/[0.04]" />
        </div>

        <div className="p-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { v: "1.247", l: "Eleitores" },
              { v: "58%", l: "Favoráveis" },
              { v: "23", l: "Pesquisas" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                custom={i}
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                className={`${glassInner} p-3 text-center`}
              >
                <p className="text-xl font-bold tabular-nums">{s.v}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.l}</p>
              </motion.div>
            ))}
          </div>

          {/* Module grid */}
          <div className="grid grid-cols-4 gap-3">
            {modules.map((m, i) => (
              <motion.div
                key={m.label}
                custom={i + 3}
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                className={`flex flex-col items-center gap-2 ${glassInner} p-3 transition-colors hover:bg-foreground/[0.04]`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground/[0.06]">
                  <m.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-[10px] font-medium text-muted-foreground">{m.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Mini chart */}
          <motion.div
            custom={11}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            className={`${glassInner} p-4`}
          >
            <p className="text-[11px] font-medium text-muted-foreground mb-3">Atividade recente</p>
            <div className="flex items-end gap-1.5 h-14">
              {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-sm bg-foreground/10"
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.7 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Map preview ── */
function PreviewMap() {
  const pins = [
    { x: "35%", y: "30%", name: "Ana S.", active: false },
    { x: "55%", y: "45%", name: "Carlos M.", active: true },
    { x: "40%", y: "60%", name: "Maria L.", active: false },
    { x: "65%", y: "25%", name: "José R.", active: false },
    { x: "25%", y: "50%", name: "Paula F.", active: false },
    { x: "70%", y: "55%", name: "Diego A.", active: false },
  ];

  return (
    <motion.div variants={previewV} initial="hidden" animate="visible" className="w-full max-w-md">
      <div className={`${glass} overflow-hidden`}>
        {/* Mini toolbar */}
        <div className="flex items-center gap-2.5 border-b border-foreground/[0.06] px-4 py-3">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <div className="h-6 flex-1 rounded-lg bg-foreground/[0.04] px-3 flex items-center">
            <span className="text-[10px] text-muted-foreground">Filtrar eleitores...</span>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar list */}
          <div className="w-32 shrink-0 border-r border-foreground/[0.06] p-3 space-y-2">
            {pins.slice(0, 4).map((p, i) => (
              <motion.div
                key={p.name}
                custom={i}
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-2 rounded-lg p-2 hover:bg-foreground/[0.04] transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-foreground/[0.06] flex items-center justify-center">
                  <Users className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-medium truncate">{p.name}</p>
                  <p className="text-[8px] text-muted-foreground">Aracaju</p>
                </div>
              </motion.div>
            ))}
            {/* Legend */}
            <div className="pt-2 mt-2 border-t border-foreground/[0.06] space-y-1.5">
              {[
                { l: "Favorável" },
                { l: "Indeciso" },
                { l: "Oposição" },
              ].map((item) => (
                <div key={item.l} className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-foreground/20" />
                  <span className="text-[8px] text-muted-foreground">{item.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map area */}
          <div className="relative flex-1 h-60 bg-foreground/[0.02] overflow-hidden">
            {/* Fake streets */}
            <div className="absolute inset-0">
              <div className="absolute top-[20%] left-0 right-0 h-px bg-foreground/[0.04]" />
              <div className="absolute top-[40%] left-0 right-0 h-px bg-foreground/[0.04]" />
              <div className="absolute top-[60%] left-0 right-0 h-px bg-foreground/[0.04]" />
              <div className="absolute top-[80%] left-0 right-0 h-px bg-foreground/[0.04]" />
              <div className="absolute left-[25%] top-0 bottom-0 w-px bg-foreground/[0.04]" />
              <div className="absolute left-[50%] top-0 bottom-0 w-px bg-foreground/[0.04]" />
              <div className="absolute left-[75%] top-0 bottom-0 w-px bg-foreground/[0.04]" />
              <div className="absolute top-0 left-[10%] bottom-0 w-px bg-foreground/[0.06] rotate-[25deg] origin-top-left" />
              <div className="absolute top-[15%] left-0 right-0 h-[2px] bg-foreground/[0.06] rotate-[-8deg]" />
            </div>

            {/* Water area */}
            <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-foreground/[0.02]" />

            {/* Pins */}
            {pins.map((p, i) => (
              <motion.div
                key={p.name}
                className="absolute"
                style={{ left: p.x, top: p.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="h-8 w-8 rounded-full border border-foreground/10 bg-foreground/[0.06] backdrop-blur-sm flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  </motion.div>
                  {/* Pulse on active */}
                  {p.active && (
                    <motion.div
                      className="absolute inset-0 rounded-full border border-foreground/10"
                      animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            {/* Popup for highlighted pin */}
            <motion.div
              className="absolute rounded-xl border border-foreground/[0.08] bg-background/80 backdrop-blur-xl p-2.5 text-[9px]"
              style={{ left: "55%", top: "24%" }}
              initial={{ opacity: 0, y: 8, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <p className="font-semibold">Carlos M.</p>
              <p className="text-muted-foreground">Jardins · Indeciso</p>
              <div className="flex items-center gap-1 mt-0.5 text-muted-foreground">
                <Phone className="h-2.5 w-2.5" />
                <span>(79) 9xxxx</span>
              </div>
            </motion.div>

            {/* Zoom controls */}
            <div className="absolute bottom-3 right-3 flex flex-col gap-1">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm border border-foreground/[0.06] text-[11px]">+</div>
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm border border-foreground/[0.06] text-[11px]">−</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Eleitores preview ── */
function PreviewEleitores() {
  const rows = [
    { name: "Ana Silva", bairro: "Centro", phone: "(79) 99812-...", intent: "Favorável", tags: ["Líder", "Saúde"] },
    { name: "Carlos Melo", bairro: "Jardins", phone: "(79) 98834-...", intent: "Indeciso", tags: ["Educação"] },
    { name: "Maria Lima", bairro: "Atalaia", phone: "(79) 99901-...", intent: "Favorável", tags: ["Infraestrutura"] },
    { name: "José Rocha", bairro: "Luzia", phone: "(79) 98776-...", intent: "Oposição", tags: [] },
    { name: "Paula Freitas", bairro: "Farolândia", phone: "(79) 99123-...", intent: "Favorável", tags: ["Jovem"] },
  ];

  return (
    <motion.div variants={previewV} initial="hidden" animate="visible" className="w-full max-w-[440px]">
      <div className={`${glass} overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-3">
          <span className="text-[11px] font-semibold">Eleitores</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 items-center gap-1.5 rounded-lg bg-foreground/[0.04] px-3">
              <Search className="h-3 w-3 text-muted-foreground" />
              <span className="text-[9px] text-muted-foreground">Buscar...</span>
            </div>
            <div className="h-7 rounded-lg bg-foreground px-3 flex items-center">
              <span className="text-[9px] text-background font-medium">+ Novo</span>
            </div>
          </div>
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_70px_65px_70px] gap-2 px-4 py-2 text-[9px] font-medium text-muted-foreground border-b border-foreground/[0.06]">
          <span>Nome</span>
          <span>Bairro</span>
          <span>Intenção</span>
          <span>Tags</span>
        </div>

        {/* Rows */}
        {rows.map((r, i) => (
          <motion.div
            key={r.name}
            custom={i}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-[1fr_70px_65px_70px] items-center gap-2 px-4 py-2.5 border-b border-foreground/[0.04] last:border-0 text-[10px] hover:bg-foreground/[0.02] transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-7 w-7 rounded-full bg-foreground/[0.06] flex items-center justify-center shrink-0">
                <Users className="h-3 w-3 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="font-medium truncate">{r.name}</p>
                <p className="text-[8px] text-muted-foreground">{r.phone}</p>
              </div>
            </div>
            <span className="text-muted-foreground truncate">{r.bairro}</span>
            <Badge variant="secondary" className="text-[8px] px-1.5 py-0 h-5 bg-foreground/[0.05] text-muted-foreground border-0">{r.intent}</Badge>
            <div className="flex gap-0.5 overflow-hidden">
              {r.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-[7px] px-1.5 py-0 h-4 gap-0.5 border-foreground/[0.08]">
                  <Tag className="h-2 w-2" />{t}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Pesquisas preview ── */
function PreviewPesquisas() {
  return (
    <motion.div variants={previewV} initial="hidden" animate="visible" className="w-full max-w-md">
      <div className={`${glass} overflow-hidden`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-3">
          <span className="text-[11px] font-semibold">Pesquisas de Campo</span>
          <Badge variant="secondary" className="text-[8px] bg-foreground/[0.05] text-muted-foreground border-0">3 concluídas</Badge>
        </div>

        <div className="p-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: ClipboardCheck, v: "8", l: "Pesquisas" },
              { icon: Users, v: "1.2k", l: "Entrevistados" },
              { icon: TrendingUp, v: "58%", l: "Favoráveis" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                custom={i}
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                className={`flex items-center gap-2 ${glassInner} p-3`}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/[0.06]">
                  <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-base font-bold tabular-nums leading-none">{s.v}</p>
                  <p className="text-[8px] text-muted-foreground mt-0.5">{s.l}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results chart */}
          <motion.div
            custom={3}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            className={`${glassInner} p-4 space-y-3`}
          >
            <p className="text-[10px] font-medium">Resultado Geral</p>
            {[
              { label: "Favorável", pct: 58 },
              { label: "Indeciso", pct: 27 },
              { label: "Oposição", pct: 15 },
            ].map((r, i) => (
              <div key={r.label} className="space-y-1">
                <div className="flex justify-between text-[9px]">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium tabular-nums">{r.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-foreground/[0.06] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-foreground/20"
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ delay: 0.7 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Mini table */}
          <motion.div
            custom={6}
            variants={staggerChild}
            initial="hidden"
            animate="visible"
            className={`${glassInner} overflow-hidden`}
          >
            <div className="grid grid-cols-[1fr_65px_55px] gap-2 px-3 py-2 text-[8px] font-medium text-muted-foreground border-b border-foreground/[0.05]">
              <span>Nome</span>
              <span>Bairro</span>
              <span className="text-right">Status</span>
            </div>
            {[
              { n: "Pesquisa Centro", b: "Centro", s: "Concluída" },
              { n: "Pesquisa Jardins", b: "Jardins", s: "Em andamento" },
              { n: "Pesquisa Atalaia", b: "Atalaia", s: "Agendada" },
            ].map((p, i) => (
              <motion.div
                key={p.n}
                custom={i + 7}
                variants={staggerChild}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-[1fr_65px_55px] items-center gap-2 px-3 py-2 text-[9px] border-b border-foreground/[0.04] last:border-0"
              >
                <span className="font-medium truncate">{p.n}</span>
                <span className="text-muted-foreground">{p.b}</span>
                <Badge variant="secondary" className="text-[7px] px-1.5 py-0 h-4 justify-center bg-foreground/[0.05] text-muted-foreground border-0">{p.s}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Agenda + Comunicação preview ── */
function PreviewAgendaCom() {
  const today = new Date();
  const currentDay = today.getDate();

  return (
    <motion.div variants={previewV} initial="hidden" animate="visible" className="w-full max-w-md space-y-4">
      {/* Calendar */}
      <div className={`${glass} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-3">
          <span className="text-[11px] font-semibold">
            {today.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </span>
          <div className="flex gap-1.5">
            <div className="h-5 w-5 rounded-lg flex items-center justify-center border border-foreground/[0.06] text-[9px]">‹</div>
            <div className="h-5 w-5 rounded-lg flex items-center justify-center border border-foreground/[0.06] text-[9px]">›</div>
          </div>
        </div>
        <div className="p-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <div key={i} className="text-center text-[8px] font-medium text-muted-foreground py-1">{d}</div>
            ))}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3 + 1;
              const isValid = day >= 1 && day <= 31;
              const isToday = day === currentDay;
              const hasEvent = [5, 8, 12, 15, 18, 22, 25, currentDay].includes(day);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isValid ? 1 : 0.15, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.015, duration: 0.3 }}
                  className={`relative flex h-6 items-center justify-center rounded-lg text-[9px] tabular-nums ${
                    isToday
                      ? "bg-foreground text-background font-bold"
                      : "text-muted-foreground"
                  }`}
                >
                  {isValid ? day : ""}
                  {hasEvent && !isToday && (
                    <div className="absolute bottom-0.5 h-1 w-1 rounded-full bg-foreground/20" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Events */}
        <div className="border-t border-foreground/[0.06] p-3 space-y-2">
          {[
            { time: "09:00", title: "Reunião com vereadores", type: "Reunião" },
            { time: "14:00", title: "Visita Bairro Centro", type: "Visita" },
          ].map((e, i) => (
            <motion.div
              key={e.title}
              custom={i + 35}
              variants={staggerChild}
              initial="hidden"
              animate="visible"
              className={`flex items-center gap-2.5 ${glassInner} p-2.5`}
            >
              <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-foreground/[0.06] text-[9px] font-semibold tabular-nums">
                {e.time}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium truncate">{e.title}</p>
              </div>
              <Badge variant="secondary" className="text-[7px] px-1.5 py-0 h-4 bg-foreground/[0.05] text-muted-foreground border-0">{e.type}</Badge>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Communication mini */}
      <motion.div
        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className={`${glass} overflow-hidden`}
      >
        <div className="flex items-center justify-between border-b border-foreground/[0.06] px-4 py-3">
          <span className="text-[11px] font-semibold">Comunicações</span>
          <div className="h-7 rounded-lg bg-foreground px-3 flex items-center gap-1">
            <Send className="h-2.5 w-2.5 text-background" />
            <span className="text-[9px] text-background font-medium">Enviar</span>
          </div>
        </div>
        <div className="p-3 space-y-2">
          {[
            { icon: MessageSquare, type: "WhatsApp", seg: "Favoráveis", status: "Lido" },
            { icon: Mail, type: "Email", seg: "Indecisos", status: "Enviado" },
          ].map((c, i) => (
            <motion.div
              key={c.type}
              custom={i}
              variants={staggerChild}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2.5 rounded-xl p-2.5 hover:bg-foreground/[0.02] transition-colors"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/[0.06]">
                <c.icon className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium">{c.type} · {c.seg}</p>
              </div>
              <Badge variant="secondary" className="text-[7px] px-1.5 py-0 h-4 bg-foreground/[0.05] text-muted-foreground border-0">{c.status}</Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Final: celebration ── */
function PreviewFinal() {
  const allModules = [
    { icon: MapPin, label: "Mapa" },
    { icon: Users, label: "Eleitores" },
    { icon: BarChart3, label: "Pesquisas" },
    { icon: Calendar, label: "Agenda" },
    { icon: MessageSquare, label: "Comunicação" },
    { icon: Shield, label: "Equipe" },
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Orbiting module icons */}
      {allModules.map((m, i) => {
        const angle = (i * Math.PI * 2) / allModules.length - Math.PI / 2;
        const radius = 120;
        return (
          <motion.div
            key={m.label}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
            }}
            transition={{
              delay: 0.5 + i * 0.12,
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <motion.div
              className="flex h-13 w-13 items-center justify-center rounded-2xl bg-foreground/[0.06] backdrop-blur-sm border border-foreground/[0.08]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            >
              <m.icon className="h-5.5 w-5.5 text-foreground/60" strokeWidth={1.5} />
            </motion.div>
            <p className="mt-1.5 text-center text-[9px] font-medium text-muted-foreground">{m.label}</p>
          </motion.div>
        );
      })}

      {/* Center icon */}
      <motion.div
        className="relative z-10"
        animate={{ rotate: [0, 3, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-foreground/[0.08] backdrop-blur-md border border-foreground/[0.1]">
          <Rocket className="h-10 w-10 text-foreground/70" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Connecting lines */}
      {allModules.map((_, i) => {
        const angle = (i * Math.PI * 2) / allModules.length - Math.PI / 2;
        const length = 80;
        const rotation = (angle * 180) / Math.PI;
        return (
          <motion.div
            key={i}
            className="absolute h-px origin-left bg-foreground/[0.06]"
            style={{
              width: length,
              transform: `rotate(${rotation}deg)`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
          />
        );
      })}

      {/* Sparkle particles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-foreground/10"
          animate={{
            x: [0, Math.cos((i * Math.PI * 2) / 10) * 160],
            y: [0, Math.sin((i * Math.PI * 2) / 10) * 160],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
}

/* ─── preview picker ─── */
const previews = [
  PreviewWelcome,
  PreviewMap,
  PreviewEleitores,
  PreviewPesquisas,
  PreviewAgendaCom,
  PreviewFinal,
];

/* ════════════════════════════════════════════════
   MAIN ONBOARDING COMPONENT
   ════════════════════════════════════════════════ */
export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLast = current === steps.length - 1;
  const isFirst = current === 0;
  const step = steps[current];
  const Preview = previews[current];

  const goNext = useCallback(() => {
    if (isLast) { onComplete(); return; }
    setDirection(1);
    setCurrent((c) => c + 1);
  }, [isLast, onComplete]);

  const goPrev = useCallback(() => {
    if (isFirst) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  }, [isFirst]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-2xl"
      variants={overlayV}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Particles />
      <GlowOrbs />

      <motion.div
        className="relative flex h-[calc(100vh-20px)] w-[calc(100vw-20px)] sm:h-[calc(100vh-40px)] sm:w-[calc(100vw-40px)] max-w-7xl flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-foreground/[0.06] bg-background/70 backdrop-blur-xl"
        variants={containerV}
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between border-b border-foreground/[0.06] px-4 py-3 sm:px-8 sm:py-4">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
              <div className="h-3 w-3 rounded-full bg-foreground/10" />
            </div>
            <span className="ml-2 text-xs sm:text-sm font-medium text-muted-foreground">
              <span className="hidden sm:inline">Meu Gabinete — </span>Onboarding
            </span>
          </div>
          <ProgressBar current={current} total={steps.length} />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 items-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideV}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center"
            >
              <div className="grid w-full grid-cols-1 gap-6 px-4 sm:gap-8 sm:px-6 md:gap-10 md:px-10 lg:grid-cols-2 lg:px-16">
                {/* Left: text */}
                <div className="flex flex-col justify-center space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium bg-foreground/[0.05] text-muted-foreground">
                      <step.icon className="h-3.5 w-3.5" />
                      {step.tag}
                    </span>
                  </motion.div>

                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                  >
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight lg:text-5xl">{step.title}</h2>
                    <p className="text-base sm:text-xl text-muted-foreground">{step.subtitle}</p>
                  </motion.div>

                  <motion.p
                    className="max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {step.description}
                  </motion.p>

                  {step.features.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {step.features.map((f, i) => (
                        <motion.div
                          key={f}
                          className="flex items-center gap-3 text-base"
                          custom={i}
                          variants={featureItemV}
                          initial="hidden"
                          animate="visible"
                        >
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.08]">
                            <Check className="h-3.5 w-3.5 text-foreground/60" strokeWidth={2.5} />
                          </div>
                          <span className="text-foreground/80">{f}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {isLast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="pt-3"
                    >
                      <Button size="lg" className="gap-2 h-12 px-6 text-base rounded-xl" onClick={onComplete}>
                        <Rocket className="h-4.5 w-4.5" />
                        Acessar Dashboard
                      </Button>
                    </motion.div>
                  )}
                </div>

                {/* Right: page preview */}
                <div className="hidden lg:flex items-center justify-center">
                  <Preview />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom nav */}
        <div className="flex shrink-0 items-center justify-between border-t border-foreground/[0.06] px-4 py-3 sm:px-8 sm:py-5">
          <Button variant="ghost" size="sm" className="gap-1 sm:gap-1.5 sm:h-11 sm:px-5 rounded-xl" onClick={goPrev} disabled={isFirst}>
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar</span>
          </Button>
          <span className="text-xs sm:text-sm tabular-nums text-muted-foreground">
            {current + 1} / {steps.length}
          </span>
          {!isLast ? (
            <Button size="sm" className="gap-1 sm:gap-1.5 sm:h-11 sm:px-5 rounded-xl" onClick={goNext}>
              <span className="hidden sm:inline">Próximo</span>
              <span className="sm:hidden">Avançar</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <div />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
