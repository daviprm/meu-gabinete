"use client";

import { motion } from "framer-motion";
import {
  Vote,
  Users,
  MapPin,
  BarChart3,
  ClipboardList,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const orbs = [
  {
    size: 340,
    positions: [
      { left: "10%", top: "20%" },
      { left: "60%", top: "10%" },
      { left: "40%", top: "70%" },
      { left: "15%", top: "50%" },
    ],
    duration: 22,
  },
  {
    size: 200,
    positions: [
      { left: "70%", top: "60%" },
      { left: "20%", top: "80%" },
      { left: "50%", top: "30%" },
    ],
    duration: 18,
  },
  {
    size: 280,
    positions: [
      { left: "30%", top: "10%" },
      { left: "70%", top: "40%" },
      { left: "10%", top: "60%" },
      { left: "50%", top: "20%" },
    ],
    duration: 26,
  },
  {
    size: 160,
    positions: [
      { left: "80%", top: "15%" },
      { left: "40%", top: "50%" },
      { left: "60%", top: "80%" },
    ],
    duration: 20,
  },
  {
    size: 240,
    positions: [
      { left: "5%", top: "40%" },
      { left: "50%", top: "60%" },
      { left: "80%", top: "20%" },
      { left: "30%", top: "80%" },
    ],
    duration: 24,
  },
];

const pills = [
  { icon: Vote, label: "Pesquisa de campo" },
  { icon: MapPin, label: "Mapa eleitoral" },
  { icon: Users, label: "Gestão de eleitores" },
  { icon: ClipboardList, label: "Demandas" },
  { icon: BarChart3, label: "Relatórios" },
];

function FloatingOrbs() {
  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/[0.07] blur-3xl"
          style={{ width: orb.size, height: orb.size }}
          animate={{
            left: orb.positions.map((p) => p.left),
            top: orb.positions.map((p) => p.top),
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

export default function LoginPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Branding */}
      <div className="relative hidden overflow-hidden bg-neutral-950 p-10 text-white lg:flex lg:w-1/2">
        <FloatingOrbs />

        <div className="relative z-10 flex h-full flex-col justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-xs font-bold">
              G
            </div>
            <span className="text-sm font-semibold">Meu Gabinete</span>
          </div>

          {/* Headline */}
          <div>
            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight">
              Gerencie seu
              <br />
              gabinete com
              <br />
              simplicidade.
            </h1>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Tudo que você precisa para organizar pesquisas de campo, eleitores,
              demandas e relatórios em um só lugar.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs"
                >
                  <pill.icon className="size-3" />
                  <span>{pill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/30">
            &copy; 2026 Meu Gabinete. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="relative flex w-full flex-col bg-background lg:w-1/2">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.6] dark:opacity-[0.2]"
          style={{
            backgroundImage: `linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Fade left edge */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--color-background) 0%, transparent 20%)",
          }}
        />
        {/* Fade all edges */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, var(--color-background) 80%)",
          }}
        />

        {/* Top bar */}
        <div className="relative z-10 flex items-center justify-between p-6">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:invisible">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-foreground text-xs font-bold text-background">
              G
            </div>
            <span className="text-sm font-semibold text-foreground">
              Meu Gabinete
            </span>
          </div>
          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Form */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6">
          <motion.div
            className="w-full max-w-sm space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Bem-vindo de volta
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Insira suas credenciais para acessar o sistema.
              </p>
            </div>

            <Separator />

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail ou usuário</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="seu@email.com ou username"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <span className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
                    Esqueceu a senha?
                  </span>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>

            <p className="pt-2 text-center text-xs text-muted-foreground/60">
              Sistema de uso interno. Acesso restrito a colaboradores
              autorizados.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
