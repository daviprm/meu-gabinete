"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", pesquisas: 420, demandas: 180 },
  { month: "Fev", pesquisas: 380, demandas: 210 },
  { month: "Mar", pesquisas: 510, demandas: 190 },
  { month: "Abr", pesquisas: 620, demandas: 240 },
  { month: "Mai", pesquisas: 580, demandas: 220 },
  { month: "Jun", pesquisas: 710, demandas: 260 },
  { month: "Jul", pesquisas: 680, demandas: 230 },
  { month: "Ago", pesquisas: 790, demandas: 280 },
  { month: "Set", pesquisas: 850, demandas: 310 },
  { month: "Out", pesquisas: 920, demandas: 290 },
  { month: "Nov", pesquisas: 1050, demandas: 340 },
  { month: "Dez", pesquisas: 1180, demandas: 370 },
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
            {entry.dataKey === "pesquisas" ? "Pesquisas" : "Demandas"}:{" "}
          </span>
          <span className="font-medium text-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <div className="rounded-lg border border-border p-4 lg:col-span-4">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">
          Pesquisas vs Demandas
        </p>
        <p className="text-xs text-muted-foreground">
          Evolução mensal ao longo do ano
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="gradPesquisas" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="var(--color-foreground)"
                stopOpacity={0.15}
              />
              <stop
                offset="100%"
                stopColor="var(--color-foreground)"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey="pesquisas"
            stroke="var(--color-foreground)"
            strokeWidth={2}
            fill="url(#gradPesquisas)"
          />
          <Line
            type="monotone"
            dataKey="demandas"
            stroke="var(--color-muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
