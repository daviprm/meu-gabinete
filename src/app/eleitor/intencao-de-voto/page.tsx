"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Vote, CheckCircle2, Phone, MapPin, User, Hash, HelpCircle,
  ChevronRight, ArrowLeft, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { candidatosPrefeito, candidatosVereador } from "@/lib/mock-data";

const bairros = [
  "Centro", "Jardins", "Atalaia", "Farolândia", "Siqueira Campos",
  "13 de Julho", "Luzia", "Grageru", "Coroa do Meio", "Inácio Barbosa",
  "São José", "Ponto Novo", "Industrial", "Getúlio Vargas", "Santo Antônio",
  "América", "Cidade Nova", "Olaria", "Pereira Lobo", "Suíssa",
];

type FormData = {
  nome: string;
  telefone: string;
  bairro: string;
  cargo: "prefeito" | "vereador";
  candidatoId: string | null;
  indeciso: boolean;
  numero: string;
};

const initial: FormData = {
  nome: "",
  telefone: "",
  bairro: "",
  cargo: "prefeito",
  candidatoId: null,
  indeciso: false,
  numero: "",
};

export default function IntencaoDeVotoPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const candidatos = form.cargo === "prefeito" ? candidatosPrefeito : candidatosVereador;
  const selectedCand = candidatos.find((c) => c.id === form.candidatoId);

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.bairro) e.bairro = "Selecione seu bairro";
    if (!form.candidatoId && !form.indeciso) e.candidatoId = "Selecione um candidato ou marque indeciso";
    if (form.indeciso && !form.telefone.trim()) e.telefone = "Informe seu WhatsApp para contato";
    if (form.telefone.trim() && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(form.telefone.replace(/\s/g, "")))
      e.telefone = "Telefone inválido";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit() {
    if (validate()) setStep("confirm");
  }

  function handleConfirm() {
    setStep("done");
  }

  function selectCandidato(id: string) {
    setForm((f) => ({ ...f, candidatoId: id, indeciso: false }));
    setErrors((e) => ({ ...e, candidatoId: undefined }));
  }

  function toggleIndeciso() {
    setForm((f) => ({ ...f, indeciso: !f.indeciso, candidatoId: null }));
    setErrors((e) => ({ ...e, candidatoId: undefined }));
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, var(--color-background) 75%)",
        }}
      />
      {/* Accent glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/[0.07] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-md px-4 py-10 sm:py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-600/20">
            <Vote className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Intenção de Voto</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sua opinião importa. Leva menos de 1 minuto.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ── STEP 1: FORM ── */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Personal info */}
              <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Seus dados
                </p>

                {/* Nome */}
                <div className="space-y-1.5">
                  <Label htmlFor="nome" className="text-xs font-medium">
                    Nome completo
                  </Label>
                  <Input
                    id="nome"
                    placeholder="Digite seu nome"
                    value={form.nome}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, nome: e.target.value }));
                      setErrors((er) => ({ ...er, nome: undefined }));
                    }}
                    className={errors.nome ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                  />
                  {errors.nome && <p className="text-[11px] text-red-500">{errors.nome}</p>}
                </div>

                {/* Telefone */}
                <div className="space-y-1.5">
                  <Label htmlFor="telefone" className="text-xs font-medium">
                    WhatsApp
                    {form.indeciso
                      ? <span className="text-red-500 ml-0.5">*</span>
                      : <span className="text-muted-foreground font-normal ml-1">(opcional)</span>
                    }
                  </Label>
                  <Input
                    id="telefone"
                    placeholder="(79) 99999-9999"
                    value={form.telefone}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, telefone: e.target.value }));
                      setErrors((er) => ({ ...er, telefone: undefined }));
                    }}
                    className={errors.telefone ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                  />
                  {errors.telefone && <p className="text-[11px] text-red-500">{errors.telefone}</p>}
                  {form.indeciso && !errors.telefone && (
                    <p className="text-[11px] text-amber-600 dark:text-amber-400">
                      Precisamos do seu WhatsApp para entrar em contato.
                    </p>
                  )}
                </div>

                {/* Bairro — Select */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Bairro / Região</Label>
                  <Select
                    value={form.bairro}
                    onValueChange={(v) => {
                      setForm((f) => ({ ...f, bairro: v }));
                      setErrors((e) => ({ ...e, bairro: undefined }));
                    }}
                  >
                    <SelectTrigger className={errors.bairro ? "border-red-500 focus:ring-red-500/30" : ""}>
                      <SelectValue placeholder="Selecione o bairro" />
                    </SelectTrigger>
                    <SelectContent>
                      {bairros.map((b) => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bairro && <p className="text-[11px] text-red-500">{errors.bairro}</p>}
                </div>
              </div>

              {/* Cargo selector */}
              <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Intenção de voto
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {(["prefeito", "vereador"] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, cargo: c, candidatoId: null, indeciso: false }))}
                      className={`rounded-md border px-3 py-2 text-sm font-medium transition-all ${
                        form.cargo === c
                          ? "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "border-border text-muted-foreground hover:bg-accent/50"
                      }`}
                    >
                      {c === "prefeito" ? "Prefeito" : "Vereador"}
                    </button>
                  ))}
                </div>

                {/* Candidates */}
                {errors.candidatoId && <p className="text-[11px] text-red-500">{errors.candidatoId}</p>}
                <div className="grid grid-cols-1 gap-2">
                  {candidatos.map((c) => {
                    const isSelected = form.candidatoId === c.id;
                    return (
                      <motion.button
                        key={c.id}
                        type="button"
                        onClick={() => selectCandidato(c.id)}
                        whileTap={{ scale: 0.98 }}
                        className={`group relative flex items-center gap-3 rounded-md border px-3 py-2.5 text-left transition-all ${
                          isSelected
                            ? "border-transparent ring-2 bg-accent/60"
                            : "border-border hover:border-muted-foreground/30 hover:bg-accent/30"
                        }`}
                        style={isSelected ? { boxShadow: `0 0 0 2px ${c.cor}` } : undefined}
                      >
                        <img
                          src={c.foto}
                          alt={c.nome}
                          className="h-9 w-9 rounded-md object-cover shrink-0"
                          style={{ outline: isSelected ? `2px solid ${c.cor}` : "none", outlineOffset: 1 }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{c.nome}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {c.partido} &middot; {c.numero}
                          </p>
                        </div>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full border-2 shrink-0 transition-all ${
                            isSelected ? "border-transparent" : "border-muted-foreground/30"
                          }`}
                          style={isSelected ? { backgroundColor: c.cor } : {}}
                        >
                          {isSelected && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                              <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                            </motion.div>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Indeciso */}
                <button
                  type="button"
                  onClick={toggleIndeciso}
                  className={`w-full flex items-center justify-center gap-2 rounded-md border px-3 py-2.5 text-sm font-medium transition-all ${
                    form.indeciso
                      ? "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-sm"
                      : "border-dashed border-border text-muted-foreground hover:border-muted-foreground/40 hover:bg-accent/30"
                  }`}
                >
                  <HelpCircle className="h-4 w-4" />
                  Estou indeciso(a)
                </button>
              </div>

              {/* Optional number */}
              <AnimatePresence>
                {!form.indeciso && form.candidatoId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 space-y-1.5">
                      <Label htmlFor="numero" className="text-xs font-medium">
                        Número do candidato
                        <span className="text-muted-foreground font-normal ml-1">(opcional)</span>
                      </Label>
                      <Input
                        id="numero"
                        placeholder="Ex: 55"
                        value={form.numero}
                        onChange={(e) => setForm((f) => ({ ...f, numero: e.target.value }))}
                        className="max-w-[140px]"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <Button
                className="w-full h-11 gap-2"
                onClick={handleSubmit}
              >
                Continuar
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* ── STEP 2: CONFIRMATION ── */}
          {step === "confirm" && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 space-y-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted">
                    <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <h2 className="text-sm font-semibold">Confirme seus dados</h2>
                </div>

                <div className="space-y-0 divide-y divide-border text-sm">
                  <Row label="Nome" value={form.nome} />
                  {form.telefone && <Row label="WhatsApp" value={form.telefone} />}
                  <Row label="Bairro" value={form.bairro} />
                  <Row label="Cargo" value={form.cargo === "prefeito" ? "Prefeito" : "Vereador"} />
                  <div className="flex items-center justify-between py-3">
                    <span className="text-muted-foreground">Intenção de voto</span>
                    {form.indeciso ? (
                      <span className="font-medium text-amber-600 dark:text-amber-400">Indeciso(a)</span>
                    ) : selectedCand ? (
                      <div className="flex items-center gap-2">
                        <img src={selectedCand.foto} alt="" className="h-5 w-5 rounded-md" />
                        <span className="font-medium">{selectedCand.nome}</span>
                        <span className="text-[11px] text-muted-foreground">{selectedCand.partido}</span>
                      </div>
                    ) : null}
                  </div>
                  {form.numero && <Row label="Número" value={form.numero} />}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-11 gap-2"
                  onClick={() => setStep("form")}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </Button>
                <Button
                  className="h-11 gap-2"
                  onClick={handleConfirm}
                >
                  Confirmar
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: THANK YOU ── */}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Success icon */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.15 }}
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/25"
                >
                  <CheckCircle2 className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h2 className="text-xl font-bold tracking-tight">
                    Obrigado, {form.nome.split(" ")[0]}!
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
                    Sua intenção de voto foi registrada com sucesso. A sua participação é
                    fundamental para a construção de uma cidade melhor para todos.
                  </p>
                </motion.div>
              </div>

              {/* Summary card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-5 space-y-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Resumo
                </p>
                <div className="flex items-center gap-3">
                  {form.indeciso ? (
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-500/10 border border-amber-500/20">
                      <HelpCircle className="h-5 w-5 text-amber-500" />
                    </div>
                  ) : selectedCand ? (
                    <img
                      src={selectedCand.foto}
                      alt=""
                      className="h-10 w-10 rounded-md object-cover border"
                      style={{ borderColor: selectedCand.cor }}
                    />
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">
                      {form.indeciso ? "Indeciso(a)" : selectedCand?.nome}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {form.indeciso
                        ? "Entraremos em contato pelo WhatsApp"
                        : `${selectedCand?.partido} \u00b7 ${form.cargo === "prefeito" ? "Prefeito" : "Vereador"}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3 w-3" /> {form.nome}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> {form.bairro}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex justify-center"
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setForm(initial);
                    setStep("form");
                  }}
                >
                  Registrar outra intenção
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
