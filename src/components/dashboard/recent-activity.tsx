"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const activities = [
  {
    title: "Nova pesquisa registrada",
    detail: "Bairro Centro — 48 eleitores",
    badge: "Pesquisa",
    badgeVariant: "secondary" as const,
    time: "Há 12 min",
  },
  {
    title: "Demanda concluída",
    detail: "Iluminação pública — Rua das Flores",
    badge: "Concluída",
    badgeVariant: "secondary" as const,
    time: "Há 34 min",
  },
  {
    title: "Novo eleitor cadastrado",
    detail: "Maria Silva — Bairro Jardim",
    badge: "Cadastro",
    badgeVariant: "secondary" as const,
    time: "Há 1h",
  },
  {
    title: "Pesquisador ativo",
    detail: "João Santos concluiu rota no Bairro Alto",
    badge: "Equipe",
    badgeVariant: "secondary" as const,
    time: "Há 1h 20min",
  },
  {
    title: "Demanda aberta",
    detail: "Asfalto — Rua 7 de Setembro",
    badge: "Pendente",
    badgeVariant: "secondary" as const,
    time: "Há 2h",
  },
  {
    title: "Relatório gerado",
    detail: "Intenção de voto — Zona Norte",
    badge: "Relatório",
    badgeVariant: "secondary" as const,
    time: "Há 3h",
  },
  {
    title: "Evento agendado",
    detail: "Reunião comunitária — Bairro Liberdade",
    badge: "Agenda",
    badgeVariant: "secondary" as const,
    time: "Há 4h",
  },
  {
    title: "Nova pesquisa registrada",
    detail: "Bairro Industrial — 32 eleitores",
    badge: "Pesquisa",
    badgeVariant: "secondary" as const,
    time: "Há 5h",
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">
          Atividade recente
        </p>
        <p className="text-xs text-muted-foreground">
          Últimas ações registradas no sistema
        </p>
      </div>

      <div className="space-y-0">
        {activities.map((activity, i) => (
          <div key={i}>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.detail}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant={activity.badgeVariant}
                  className="text-[10px] font-medium"
                >
                  {activity.badge}
                </Badge>
                <span className="whitespace-nowrap text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </div>
            {i < activities.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
}
