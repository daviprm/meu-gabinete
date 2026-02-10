"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", concluidas: 85, pendentes: 32 },
  { month: "Fev", concluidas: 72, pendentes: 28 },
  { month: "Mar", concluidas: 96, pendentes: 41 },
  { month: "Abr", concluidas: 110, pendentes: 35 },
  { month: "Mai", concluidas: 105, pendentes: 48 },
  { month: "Jun", concluidas: 130, pendentes: 42 },
  { month: "Jul", concluidas: 125, pendentes: 38 },
  { month: "Ago", concluidas: 142, pendentes: 50 },
  { month: "Set", concluidas: 155, pendentes: 45 },
  { month: "Out", concluidas: 168, pendentes: 52 },
  { month: "Nov", concluidas: 180, pendentes: 48 },
  { month: "Dez", concluidas: 195, pendentes: 55 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-1.5">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-muted-foreground">
            {entry.dataKey === "concluidas" ? "Concluídas" : "Pendentes"}:{" "}
          </span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function OrdersChart() {
  return (
    <div className="rounded-lg border border-border p-4 lg:col-span-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">
          Demandas atendidas
        </p>
        <p className="text-xs text-muted-foreground">
          Concluídas vs pendentes por mês
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} barGap={2}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="month"
            fontSize={12}
            stroke="var(--color-muted-foreground)"
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            fontSize={12}
            stroke="var(--color-muted-foreground)"
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="concluidas"
            fill="var(--color-foreground)"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="pendentes"
            fill="var(--color-border)"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
