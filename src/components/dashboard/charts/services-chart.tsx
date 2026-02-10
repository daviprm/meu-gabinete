"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const data = [
  { name: "Intenção A", value: 4200 },
  { name: "Intenção B", value: 2800 },
  { name: "Intenção C", value: 1900 },
  { name: "Indeciso", value: 1500 },
  { name: "Não respondeu", value: 800 },
];

const COLORS = [
  "var(--color-foreground)",
  "var(--color-muted-foreground)",
  "var(--color-ring)",
  "var(--color-input)",
  "var(--color-border)",
];

export function ServicesChart() {
  return (
    <div className="rounded-lg border border-border p-4 lg:col-span-3">
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground">
          Intenção de voto
        </p>
        <p className="text-xs text-muted-foreground">
          Distribuição geral dos pesquisados
        </p>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            iconSize={8}
            formatter={(value: string) => (
              <span className="text-xs text-muted-foreground">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
