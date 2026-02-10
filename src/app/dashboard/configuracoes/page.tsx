"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Monitor, Sun, Moon, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const membros = [
  { nome: "User Test", papel: "Owner", avatar: "UT" },
  { nome: "Ricardo Moura", papel: "Admin", avatar: "RM" },
  { nome: "Ana Torres", papel: "Membro", avatar: "AT" },
  { nome: "Carlos Henrique", papel: "Membro", avatar: "CH" },
];

const themes = [
  { value: "system", label: "Sistema", icon: Monitor },
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
] as const;

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      className="max-w-2xl space-y-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie as configurações do seu gabinete.
        </p>
      </div>

      {/* Organização */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Organização</h2>
        <div className="rounded-lg border border-border p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="org-name">Nome da organização</Label>
            <Input id="org-name" defaultValue="Org Test" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="org-desc">Descrição</Label>
            <Input id="org-desc" defaultValue="Gabinete de atendimento ao cidadão" />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Salvar</Button>
          </div>
        </div>
      </section>

      <Separator />

      {/* Aparência */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Aparência</h2>
        <div className="flex gap-3">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "flex flex-1 flex-col items-center gap-2 rounded-lg border border-border p-4 transition-colors",
                theme === t.value && "border-foreground bg-muted"
              )}
            >
              <t.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </section>

      <Separator />

      {/* Membros */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Membros</h2>
          <Button variant="outline" size="sm">Convidar</Button>
        </div>
        <div className="rounded-lg border border-border">
          {membros.map((m, i) => (
            <div
              key={m.nome}
              className={cn(
                "flex items-center justify-between px-4 py-3",
                i < membros.length - 1 && "border-b border-border"
              )}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-muted text-[11px]">{m.avatar}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{m.nome}</span>
              </div>
              <Badge variant="outline" className="text-[11px]">{m.papel}</Badge>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Plano */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold">Plano</h2>
        <div className="flex items-center justify-between rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
              <Crown className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Plano Pro</p>
                <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400">Ativo</Badge>
              </div>
              <p className="text-xs text-muted-foreground">R$ 49/mês · Renova em 10/03/2026</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Upgrade</Button>
        </div>
      </section>
    </motion.div>
  );
}
