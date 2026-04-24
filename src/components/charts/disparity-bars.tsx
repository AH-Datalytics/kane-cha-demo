"use client";

import { DATA_PALETTE } from "@/lib/utils";
import { DEMO_LABELS, DemographicSlice } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export function DisparityBars({
  data,
  unit = "%",
  referenceSlice = "overall",
  highlightMax = true,
}: {
  data: { slice: DemographicSlice; value: number }[];
  unit?: string;
  referenceSlice?: DemographicSlice;
  highlightMax?: boolean;
}) {
  const { locale } = useLocale();
  const reference = data.find((d) => d.slice === referenceSlice)?.value ?? data[0].value;
  const maxValue = Math.max(...data.map((d) => d.value));
  const scale = maxValue * 1.1;

  const maxSlice = data.reduce((a, b) => (b.value > a.value ? b : a));

  return (
    <div className="space-y-3">
      {data.map((d) => {
        const label = DEMO_LABELS[d.slice][locale];
        const pct = (d.value / scale) * 100;
        const isReference = d.slice === referenceSlice;
        const isMax = highlightMax && d.slice === maxSlice.slice;
        const ratioVsRef = (d.value / reference).toFixed(2);
        return (
          <div key={d.slice} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 items-baseline">
            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span
                  className={`text-sm text-pretty ${isReference ? "font-medium text-kane-blue-ink" : "text-ink"}`}
                >
                  {label}
                  {isReference && (
                    <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      Reference
                    </span>
                  )}
                </span>
                <span className={`font-display tnum text-lg ${isMax ? "text-kane-amber font-medium" : "text-kane-blue-ink"}`}>
                  {d.value}
                  <span className="text-sm text-ink-soft">{unit}</span>
                </span>
              </div>
              <div className="relative h-2 w-full bg-paper-deep overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 transition-all ${isReference ? "bg-ink-soft" : isMax ? "bg-kane-amber" : "bg-kane-blue-deep"}`}
                  style={{ width: `${pct}%` }}
                  aria-hidden
                />
              </div>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft min-w-[4ch] text-right">
              {isReference ? "—" : `${ratioVsRef}×`}
            </span>
          </div>
        );
      })}
    </div>
  );
}
