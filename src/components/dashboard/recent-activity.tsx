"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const activities = [
  { title: "Nova pesquisa registrada", detail: "Bairro Centro — 48 eleitores", badge: "Pesquisa", badgeVariant: "secondary" as const, time: "Há 12 min" },
  { title: "Demanda concluída", detail: "Iluminação pública — Rua das Flores", badge: "Concluída", badgeVariant: "secondary" as const, time: "Há 34 min" },
  { title: "Novo eleitor cadastrado", detail: "Maria Silva — Bairro Jardim", badge: "Cadastro", badgeVariant: "secondary" as const, time: "Há 1h" },
  { title: "Pesquisador ativo", detail: "João Santos concluiu rota no Bairro Alto", badge: "Equipe", badgeVariant: "secondary" as const, time: "Há 1h 20min" },
  { title: "Demanda aberta", detail: "Asfalto — Rua 7 de Setembro", badge: "Pendente", badgeVariant: "secondary" as const, time: "Há 2h" },
  { title: "Relatório gerado", detail: "Intenção de voto — Zona Norte", badge: "Relatório", badgeVariant: "secondary" as const, time: "Há 3h" },
  { title: "Evento agendado", detail: "Reunião comunitária — Bairro Liberdade", badge: "Agenda", badgeVariant: "secondary" as const, time: "Há 4h" },
  { title: "Nova pesquisa registrada", detail: "Bairro Industrial — 32 eleitores", badge: "Pesquisa", badgeVariant: "secondary" as const, time: "Há 5h" },
];

export function RecentActivity() {
  return (
    <div className="rounded-lg border border-border p-3 sm:p-4">
      <div className="mb-3 sm:mb-4">
        <p className="text-sm font-semibold text-foreground">Atividade recente</p>
        <p className="text-xs text-muted-foreground">Últimas ações registradas no sistema</p>
      </div>

      <div className="space-y-0">
        {activities.map((activity, i) => (
          <div key={i}>
            <div className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:py-3">
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.title}</p>
                <p className="text-xs text-muted-foreground truncate">{activity.detail}</p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <Badge variant={activity.badgeVariant} className="text-[10px] font-medium">
                  {activity.badge}
                </Badge>
                <span className="whitespace-nowrap text-[11px] sm:text-xs text-muted-foreground">
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
