"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader, Eyebrow, EditorialCard, RuleEditorial, Tag } from "@/components/ui/editorial";
import { cn } from "@/lib/utils";
import {
  HEADLINE_INDICATORS,
  EQUITY_BY_INDICATOR,
  TREND_BY_INDICATOR,
  DEMO_LABELS,
  DemographicSlice,
  CHA_CYCLES,
  MUNICIPALITIES,
  PLANNING_AREAS,
} from "@/lib/data";
import { DisparityBars } from "@/components/charts/disparity-bars";
import { TrendChart } from "@/components/charts/trend-chart";
import { FileDown, Link2, Printer, ImageDown, Share2 } from "lucide-react";

type GeoMode = "county" | "municipality" | "planning" | "tract";

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-20 font-mono text-ink-soft">Loading…</div>}>
      <ReportsPageInner />
    </Suspense>
  );
}

function ReportsPageInner() {
  const params = useSearchParams();
  const [title, setTitle] = useState("Kane County Custom Report");
  const [indicators, setIndicators] = useState<string[]>(
    params.get("indicator") ? [params.get("indicator")!] : ["diabetes", "mental-distress"]
  );
  const [geoMode, setGeoMode] = useState<GeoMode>("county");
  const [demo, setDemo] = useState<DemographicSlice[]>(["overall", "race-white", "race-black", "race-latino"]);
  const [period, setPeriod] = useState<string>("2024 CHA");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Parse state from URL on mount (shareable URL feature)
  useEffect(() => {
    const s = params.get("state");
    if (s) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(s)));
        if (decoded.title) setTitle(decoded.title);
        if (decoded.indicators) setIndicators(decoded.indicators);
        if (decoded.geoMode) setGeoMode(decoded.geoMode);
        if (decoded.demo) setDemo(decoded.demo);
        if (decoded.period) setPeriod(decoded.period);
      } catch {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildShareUrl = () => {
    const payload = { title, indicators, geoMode, demo, period };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    const url = `${window.location.origin}${window.location.pathname}?state=${encoded}`;
    return url;
  };

  const handleCopyLink = async () => {
    const url = buildShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handlePDF = () => {
    window.print();
  };

  const handleCSV = () => {
    const rows: string[][] = [["Kane County Community Health Atlas — Custom Report"], [title], [`Generated ${new Date().toLocaleString()}`], [""]];
    indicators.forEach((id) => {
      const meta = HEADLINE_INDICATORS.find((i) => i.id === id);
      const equityRows = (EQUITY_BY_INDICATOR[id] ?? []).filter((e) => demo.includes(e.slice));
      rows.push([`INDICATOR: ${meta?.label ?? id}`, `Unit: ${meta?.unit ?? "%"}`, `Source: ${meta?.source ?? ""}`]);
      rows.push(["Slice", "Value", "Unit"]);
      equityRows.forEach((e) => rows.push([DEMO_LABELS[e.slice].en, String(e.value), meta?.unit ?? "%"]));
      const trend = TREND_BY_INDICATOR[id] ?? [];
      if (trend.length) {
        rows.push([""]);
        rows.push(["Trend across CHA cycles"]);
        rows.push(["Cycle", "Value"]);
        trend.forEach((t) => rows.push([t.cycle, String(t.value)]));
      }
      rows.push([""]);
    });

    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kane-cha-report-${Date.now()}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handlePNG = async () => {
    if (!previewRef.current) return;
    const { toPng } = await import("html-to-image");
    const dataUrl = await toPng(previewRef.current, {
      cacheBust: true,
      backgroundColor: "#faf8f3",
      pixelRatio: 2,
    });
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `kane-cha-report-${Date.now()}.png`;
    a.click();
  };

  return (
    <div>
      <PageHeader
        eyebrow="Section 05 · Custom reports"
        title="Build a report. Save it. Share it."
        lede="Pick indicators, geography, demographics, and time period. Export to PDF, CSV, or PNG. Every report has a shareable URL that restores the exact view."
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>PDF export</Tag>
            <Tag>CSV download</Tag>
            <Tag>PNG image</Tag>
            <Tag>Shareable URL</Tag>
          </div>
        }
      />

      <div className="container mx-auto py-10 grid lg:grid-cols-12 gap-8 no-print">
        {/* Controls */}
        <aside className="lg:col-span-4 space-y-6">
          <EditorialCard className="p-6">
            <Eyebrow>Report title</Eyebrow>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full border-0 border-b border-rule bg-transparent font-display text-2xl text-kane-blue-ink focus:border-kane-blue-ink focus:outline-none pb-1"
            />
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>1. Indicators</Eyebrow>
            <p className="mt-2 text-xs text-ink-soft">Pick one or more. Each becomes a section of the report.</p>
            <div className="mt-4 grid gap-2">
              {HEADLINE_INDICATORS.map((ind) => {
                const on = indicators.includes(ind.id);
                return (
                  <label key={ind.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) => {
                        setIndicators((prev) =>
                          e.target.checked ? [...prev, ind.id] : prev.filter((x) => x !== ind.id)
                        );
                      }}
                      className="accent-kane-blue-ink"
                    />
                    <span className="text-sm text-ink group-hover:text-kane-blue-ink">{ind.label}</span>
                    <span className="ml-auto font-mono tnum text-xs text-ink-soft">
                      {ind.value}
                      {ind.unit}
                    </span>
                  </label>
                );
              })}
            </div>
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>2. Geography</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {(
                [
                  { id: "county", label: "Kane County" },
                  { id: "municipality", label: "By municipality" },
                  { id: "planning", label: "Planning Areas" },
                  { id: "tract", label: "Census tracts" },
                ] as { id: GeoMode; label: string }[]
              ).map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGeoMode(g.id)}
                  className={cn(
                    "px-2 py-1.5 border text-[11px] text-left leading-tight transition-colors",
                    geoMode === g.id
                      ? "bg-kane-blue-ink border-kane-blue-ink text-white"
                      : "border-rule text-ink-soft hover:border-kane-blue-ink hover:text-kane-blue-ink"
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>3. Demographics</Eyebrow>
            <p className="mt-2 text-xs text-ink-soft">Slices to include in each indicator section.</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(["overall", "race-white", "race-black", "race-latino", "race-asian", "income-low", "income-mid", "income-high", "lang-en", "lang-es", "lang-pl", "age-18-34", "age-35-54", "age-55-plus", "lgbtq"] as DemographicSlice[]).map((slice) => {
                const on = demo.includes(slice);
                return (
                  <button
                    key={slice}
                    onClick={() => {
                      setDemo((prev) =>
                        on ? prev.filter((x) => x !== slice) : [...prev, slice]
                      );
                    }}
                    className={cn(
                      "px-2 py-1 border text-[10px] transition-colors",
                      on
                        ? "bg-kane-amber border-kane-amber text-white"
                        : "border-rule text-ink-soft hover:border-kane-amber"
                    )}
                  >
                    {DEMO_LABELS[slice].en}
                  </button>
                );
              })}
            </div>
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>4. Time period</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {[...CHA_CYCLES, "All cycles"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "px-2 py-1.5 border text-[11px] text-left transition-colors",
                    period === p
                      ? "bg-kane-blue-ink border-kane-blue-ink text-white"
                      : "border-rule text-ink-soft hover:border-kane-blue-ink"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>Export</Eyebrow>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={handlePDF}
                className="flex items-center gap-2 px-3 py-2 border border-kane-blue-ink text-kane-blue-ink text-xs hover:bg-kane-blue-ink hover:text-white transition-colors"
              >
                <Printer size={14} /> PDF
              </button>
              <button
                onClick={handleCSV}
                className="flex items-center gap-2 px-3 py-2 border border-kane-blue-ink text-kane-blue-ink text-xs hover:bg-kane-blue-ink hover:text-white transition-colors"
              >
                <FileDown size={14} /> CSV
              </button>
              <button
                onClick={handlePNG}
                className="flex items-center gap-2 px-3 py-2 border border-kane-blue-ink text-kane-blue-ink text-xs hover:bg-kane-blue-ink hover:text-white transition-colors"
              >
                <ImageDown size={14} /> PNG
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-2 border border-kane-amber text-kane-amber text-xs hover:bg-kane-amber hover:text-white transition-colors"
              >
                <Link2 size={14} /> {copied ? "Copied" : "Copy URL"}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-ink-soft/70 leading-snug">
              Copy URL encodes the full report state so a colleague opens the exact same view.
            </p>
          </EditorialCard>
        </aside>

        {/* Preview */}
        <main className="lg:col-span-8">
          <div ref={previewRef} className="report-print bg-white border border-rule p-8 md:p-12">
            {/* Report masthead */}
            <div className="pb-6 mb-8 border-b border-rule">
              <div className="ribbon-kane h-1 w-full mb-6" aria-hidden />
              <Eyebrow>Kane County Community Health Atlas · Custom report</Eyebrow>
              <h1 className="mt-2 font-display text-4xl md:text-5xl text-kane-blue-ink leading-tight">
                {title}
              </h1>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Indicators
                  </div>
                  <div className="mt-1 font-display tnum text-xl text-kane-blue-ink">{indicators.length}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Geography
                  </div>
                  <div className="mt-1 font-display text-sm text-kane-blue-ink">
                    {geoMode === "county" && "Kane County"}
                    {geoMode === "municipality" && "By municipality"}
                    {geoMode === "planning" && "Planning Areas"}
                    {geoMode === "tract" && "Census tracts"}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Slices
                  </div>
                  <div className="mt-1 font-display tnum text-xl text-kane-blue-ink">{demo.length}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Period
                  </div>
                  <div className="mt-1 font-display text-sm text-kane-blue-ink">{period}</div>
                </div>
              </div>
            </div>

            {/* Indicator sections */}
            {indicators.map((id, i) => {
              const meta = HEADLINE_INDICATORS.find((x) => x.id === id);
              const trend = TREND_BY_INDICATOR[id] ?? [];
              const equity = (EQUITY_BY_INDICATOR[id] ?? []).filter((e) => demo.includes(e.slice));
              return (
                <section key={id} className={cn("mb-10 pb-10", i < indicators.length - 1 && "border-b border-rule")}>
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <div>
                      <Eyebrow>Section {String(i + 1).padStart(2, "0")}</Eyebrow>
                      <h2 className="mt-1 font-display text-2xl text-kane-blue-ink leading-tight">
                        {meta?.label}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="font-display tnum text-3xl text-kane-blue-ink">
                        {meta?.value}
                        <span className="text-sm text-ink-soft">{meta?.unit}</span>
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mt-0.5">
                        Kane County · {period}
                      </div>
                    </div>
                  </div>

                  {trend.length > 0 && (period === "All cycles" || CHA_CYCLES.includes(period as any)) && (
                    <div className="mt-6">
                      <Eyebrow>Trend</Eyebrow>
                      <div className="mt-3">
                        <TrendChart data={trend} unit={meta?.unit ?? "%"} height={220} />
                      </div>
                    </div>
                  )}

                  {equity.length > 0 && (
                    <div className="mt-6">
                      <Eyebrow>Equity view</Eyebrow>
                      <div className="mt-3">
                        <DisparityBars data={equity} unit={meta?.unit ?? "%"} />
                      </div>
                    </div>
                  )}

                  <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Source · {meta?.source}
                  </p>
                </section>
              );
            })}

            {indicators.length === 0 && (
              <div className="py-16 text-center">
                <Eyebrow>No indicators selected</Eyebrow>
                <p className="mt-3 font-display text-2xl text-ink-soft">
                  Pick one or more indicators from the left panel.
                </p>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-rule flex items-center justify-between text-[11px] text-ink-soft/70">
              <span className="font-mono uppercase tracking-[0.14em]">
                Generated {new Date().toLocaleDateString()} · Kane County Health Department
              </span>
              <span className="font-mono">CHA 2024 · v1.0</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
