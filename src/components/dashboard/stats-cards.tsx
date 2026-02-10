"use client";

import { TrendingUp, TrendingDown, Users, MapPin, ClipboardList, Vote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    label: "Eleitores cadastrados",
    value: "12.483",
    change: +8.2,
    subLabel: "vs. mês anterior",
    icon: Users,
  },
  {
    label: "Pesquisas realizadas",
    value: "3.847",
    change: +12.5,
    subLabel: "vs. mês anterior",
    icon: Vote,
  },
  {
    label: "Demandas abertas",
    value: "284",
    change: -3.1,
    subLabel: "vs. mês anterior",
    icon: ClipboardList,
  },
  {
    label: "Regiões mapeadas",
    value: "47",
    change: +5.6,
    subLabel: "vs. mês anterior",
    icon: MapPin,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border p-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{stat.label}</span>
            <stat.icon className="size-4 text-muted-foreground" />
          </div>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            {stat.value}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Badge
              variant="secondary"
              className="gap-0.5 px-1.5 py-0 text-[10px] font-medium"
            >
              {stat.change > 0 ? (
                <TrendingUp className="size-3 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <TrendingDown className="size-3 text-red-500 dark:text-red-400" />
              )}
              {stat.change > 0 ? "+" : ""}
              {stat.change}%
            </Badge>
            <span className="text-[11px] text-muted-foreground">
              {stat.subLabel}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
