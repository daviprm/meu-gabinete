"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Seg", pesquisas: 145 },
  { day: "Ter", pesquisas: 168 },
  { day: "Qua", pesquisas: 192 },
  { day: "Qui", pesquisas: 178 },
  { day: "Sex", pesquisas: 210 },
  { day: "Sáb", pesquisas: 260 },
  { day: "Dom", pesquisas: 95 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-xs">
      <p className="mb-1 font-medium text-foreground">{label}</p>
      <div className="flex items-center gap-1.5">
        <div
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--color-foreground)" }}
        />
        <span className="text-muted-foreground">Pesquisas: </span>
        <span className="font-medium text-foreground">{payload[0].value}</span>
      </div>
    </div>
  );
}

export function WeeklyChart() {
  return (
    <div className="rounded-lg border border-border p-4 lg:col-span-3">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">
          Pesquisas por dia da semana
        </p>
        <p className="text-xs text-muted-foreground">
          Média semanal de pesquisas realizadas
        </p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-border)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
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
          <Line
            type="monotone"
            dataKey="pesquisas"
            stroke="var(--color-foreground)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "var(--color-background)",
              stroke: "var(--color-foreground)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 5,
              fill: "var(--color-foreground)",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
