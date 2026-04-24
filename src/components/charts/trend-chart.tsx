"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { TrendRow } from "@/lib/data";

export function TrendChart({
  data,
  unit = "%",
  color = "rgb(8, 110, 159)",
  height = 280,
  annotateLatest,
}: {
  data: TrendRow[];
  unit?: string;
  color?: string;
  height?: number;
  annotateLatest?: string;
}) {
  const formatted = data.map((d) => ({ cycle: d.cycle, value: d.value }));
  const values = data.map((d) => d.value);
  const rawMax = Math.max(...values);
  const rawMin = Math.min(...values);
  const padding = (rawMax - rawMin) * 0.3 || rawMax * 0.15 || 1;
  const max = Math.ceil(rawMax + padding);
  const min = Math.max(0, Math.floor(rawMin - padding));

  return (
    <div style={{ height }} role="img" aria-label={`Trend line: ${data.map((d) => `${d.cycle} ${d.value}${unit}`).join(", ")}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formatted} margin={{ top: 20, right: 40, bottom: 10, left: 0 }}>
          <CartesianGrid stroke="rgb(var(--rule))" strokeDasharray="0" vertical={false} />
          <XAxis
            dataKey="cycle"
            tick={{ fill: "rgb(var(--ink-soft))", fontSize: 11, fontFamily: "var(--font-plex-mono)" }}
            stroke="rgb(var(--rule))"
            tickLine={false}
            axisLine={{ stroke: "rgb(var(--rule))" }}
          />
          <YAxis
            domain={[min, max]}
            tick={{ fill: "rgb(var(--ink-soft))", fontSize: 11, fontFamily: "var(--font-plex-mono)" }}
            stroke="rgb(var(--rule))"
            tickLine={false}
            axisLine={false}
            width={45}
            tickFormatter={(v) => `${Number(v).toFixed(0)}${unit}`}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "rgb(var(--paper))",
              border: "1px solid rgb(var(--kane-blue-ink))",
              borderRadius: 2,
              fontFamily: "var(--font-plex-sans)",
              fontSize: 12,
            }}
            formatter={(v) => [`${v}${unit}`, "Value"] as [string, string]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 4, fill: color, stroke: "rgb(var(--paper))", strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
          {annotateLatest && (
            <ReferenceLine
              x={data[data.length - 1].cycle}
              stroke="rgb(var(--kane-amber))"
              strokeDasharray="3 3"
              label={{
                value: annotateLatest,
                fill: "rgb(var(--kane-amber))",
                fontSize: 10,
                fontFamily: "var(--font-plex-mono)",
                position: "top",
              }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
