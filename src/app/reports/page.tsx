"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader, Eyebrow, EditorialCard, Tag } from "@/components/ui/editorial";
import { cn } from "@/lib/utils";
import {
  HEADLINE_INDICATORS,
  EQUITY_BY_INDICATOR,
  TREND_BY_INDICATOR,
  DEMO_LABELS,
  DemographicSlice,
  CHA_CYCLES,
  GEO_BREAKDOWNS,
  PLANNING_AREAS,
} from "@/lib/data";
import { DisparityBars } from "@/components/charts/disparity-bars";
import { TrendChart } from "@/components/charts/trend-chart";
import { FileDown, Link2, Printer, ImageDown } from "lucide-react";
import { useLocale } from "@/lib/i18n";

type GeoMode = "county" | "municipality" | "planning" | "tract";

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-20 font-mono text-ink-soft">Loading…</div>}>
      <ReportsPageInner />
    </Suspense>
  );
}

function ReportsPageInner() {
  const { t, locale } = useLocale();
  const params = useSearchParams();
  const [title, setTitle] = useState(t.reports.defaultTitle);
  const [indicators, setIndicators] = useState<string[]>(
    params.get("indicator") ? [params.get("indicator")!] : ["diabetes", "mental-distress"]
  );
  const [geoMode, setGeoMode] = useState<GeoMode>("county");
  const [demo, setDemo] = useState<DemographicSlice[]>([
    "overall",
    "race-white",
    "race-black",
    "race-latino",
  ]);
  const [period, setPeriod] = useState<string>("2024 CHA");
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  // Prune demographic slices when no selected indicator supports them
  useEffect(() => {
    const avail = new Set<DemographicSlice>();
    indicators.forEach((id) => {
      (EQUITY_BY_INDICATOR[id] ?? []).forEach((e) => avail.add(e.slice));
    });
    setDemo((prev) => {
      const filtered = prev.filter((s) => avail.has(s));
      return filtered.length === prev.length ? prev : filtered;
    });
  }, [indicators]);

  const buildShareUrl = () => {
    const payload = { title, indicators, geoMode, demo, period };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    return `${window.location.origin}${window.location.pathname}?state=${encoded}`;
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(buildShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handlePDF = () => window.print();

  const handleCSV = () => {
    const rows: string[][] = [
      ["Kane County Community Health Atlas — Custom Report"],
      [title],
      [`Generated ${new Date().toLocaleString()}`],
      [""],
    ];
    indicators.forEach((id) => {
      const meta = HEADLINE_INDICATORS.find((i) => i.id === id);
      const mLabel =
        locale === "es" ? meta?.labelEs : locale === "pl" ? meta?.labelPl : meta?.label;
      const equityRows = (EQUITY_BY_INDICATOR[id] ?? []).filter((e) => demo.includes(e.slice));
      rows.push([
        `INDICATOR: ${mLabel ?? id}`,
        `Unit: ${meta?.unit ?? "%"}`,
        `Source: ${meta?.source ?? ""}`,
      ]);
      rows.push(["Slice", "Value", "Unit"]);
      equityRows.forEach((e) => rows.push([DEMO_LABELS[e.slice][locale], String(e.value), meta?.unit ?? "%"]));
      const trend = TREND_BY_INDICATOR[id] ?? [];
      if (trend.length) {
        rows.push([""]);
        rows.push([t.reports.trend]);
        rows.push([t.reports.period, "Value"]);
        trend.forEach((tr) => rows.push([tr.cycle, String(tr.value)]));
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

  const geoOpts: { id: GeoMode; label: string }[] = [
    { id: "county", label: t.reports.step2Opts.county },
    { id: "municipality", label: t.reports.step2Opts.municipality },
    { id: "planning", label: t.reports.step2Opts.planning },
    { id: "tract", label: t.reports.step2Opts.tract },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={t.reports.eyebrow}
        title={t.reports.title}
        lede={t.reports.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{t.reports.tags.pdf}</Tag>
            <Tag>{t.reports.tags.csv}</Tag>
            <Tag>{t.reports.tags.png}</Tag>
            <Tag>{t.reports.tags.url}</Tag>
          </div>
        }
      />

      <div className="container mx-auto py-10 grid lg:grid-cols-12 gap-8">
        {/* Controls */}
        <aside className="lg:col-span-4 space-y-6 no-print">
          <EditorialCard className="p-6">
            <Eyebrow>{t.reports.reportTitle}</Eyebrow>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 w-full border-0 border-b border-rule bg-transparent font-display text-2xl text-kane-blue-ink focus:border-kane-blue-ink focus:outline-none pb-1"
            />
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>{t.reports.step1}</Eyebrow>
            <p className="mt-2 text-xs text-ink-soft">{t.reports.step1Body}</p>
            <div className="mt-4 grid gap-2">
              {HEADLINE_INDICATORS.map((ind) => {
                const on = indicators.includes(ind.id);
                const label =
                  locale === "es" ? ind.labelEs : locale === "pl" ? ind.labelPl : ind.label;
                return (
                  <label key={ind.id} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={(e) =>
                        setIndicators((prev) =>
                          e.target.checked ? [...prev, ind.id] : prev.filter((x) => x !== ind.id)
                        )
                      }
                      className="accent-kane-blue-ink"
                    />
                    <span className="text-sm text-ink group-hover:text-kane-blue-ink">{label}</span>
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
            <Eyebrow>{t.reports.step2}</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {geoOpts.map((g) => (
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
            <Eyebrow>{t.reports.step3}</Eyebrow>
            <p className="mt-2 text-xs text-ink-soft">{t.reports.step3Body}</p>
            {(() => {
              const availableSlices = new Set<DemographicSlice>();
              indicators.forEach((id) => {
                (EQUITY_BY_INDICATOR[id] ?? []).forEach((e) => availableSlices.add(e.slice));
              });
              return (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(
                    [
                      "overall",
                      "race-white",
                      "race-black",
                      "race-latino",
                      "race-asian",
                      "income-low",
                      "income-mid",
                      "income-high",
                      "lang-en",
                      "lang-es",
                      "lang-pl",
                      "age-18-34",
                      "age-35-54",
                      "age-55-plus",
                      "lgbtq",
                    ] as DemographicSlice[]
                  ).map((slice) => {
                    const on = demo.includes(slice);
                    const available = availableSlices.has(slice);
                    return (
                      <button
                        key={slice}
                        onClick={() => {
                          if (!available) return;
                          setDemo((prev) =>
                            on ? prev.filter((x) => x !== slice) : [...prev, slice]
                          );
                        }}
                        disabled={!available}
                        title={
                          !available
                            ? locale === "es"
                              ? "No disponible para los indicadores seleccionados"
                              : locale === "pl"
                                ? "Niedostępne dla wybranych wskaźników"
                                : "Not available for the selected indicator(s)"
                            : undefined
                        }
                        className={cn(
                          "px-2 py-1 border text-[10px] transition-colors",
                          !available
                            ? "border-rule/50 text-ink-soft/30 line-through cursor-not-allowed bg-paper-deep/30"
                            : on
                              ? "bg-kane-amber border-kane-amber text-white"
                              : "border-rule text-ink-soft hover:border-kane-amber"
                        )}
                      >
                        {DEMO_LABELS[slice][locale]}
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </EditorialCard>

          <EditorialCard className="p-6">
            <Eyebrow>{t.reports.step4}</Eyebrow>
            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {[...CHA_CYCLES, t.reports.allCycles].map((p) => (
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
            <Eyebrow>{t.reports.exportHeading}</Eyebrow>
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
                <Link2 size={14} /> {copied ? t.reports.copiedLabel : t.reports.copyUrl}
              </button>
            </div>
            <p className="mt-3 text-[11px] text-ink-soft/70 leading-snug">{t.reports.exportBody}</p>
          </EditorialCard>
        </aside>

        {/* Preview */}
        <main className="lg:col-span-8">
          <div ref={previewRef} className="report-print bg-white border border-rule p-8 md:p-12">
            <div className="pb-6 mb-8 border-b border-rule">
              <div className="ribbon-kane h-1 w-full mb-6" aria-hidden />
              <Eyebrow>Kane County Community Health Atlas · {t.reports.reportTitle}</Eyebrow>
              <h1 className="mt-2 font-display text-4xl md:text-5xl text-kane-blue-ink leading-tight">
                {title}
              </h1>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    {t.reports.indicators}
                  </div>
                  <div className="mt-1 font-display tnum text-xl text-kane-blue-ink">
                    {indicators.length}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    {t.reports.geography}
                  </div>
                  <div className="mt-1 font-display text-sm text-kane-blue-ink">
                    {geoOpts.find((g) => g.id === geoMode)?.label}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    {t.reports.slices}
                  </div>
                  <div className="mt-1 font-display tnum text-xl text-kane-blue-ink">
                    {demo.length}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    {t.reports.period}
                  </div>
                  <div className="mt-1 font-display text-sm text-kane-blue-ink">{period}</div>
                </div>
              </div>
            </div>

            {indicators.map((id, i) => {
              const meta = HEADLINE_INDICATORS.find((x) => x.id === id);
              const mLabel =
                locale === "es" ? meta?.labelEs : locale === "pl" ? meta?.labelPl : meta?.label;
              const trend = TREND_BY_INDICATOR[id] ?? [];
              const equity = (EQUITY_BY_INDICATOR[id] ?? []).filter((e) => demo.includes(e.slice));
              const geo = GEO_BREAKDOWNS[id];
              const unit = meta?.unit ?? "%";

              return (
                <section
                  key={id}
                  className={cn("mb-10 pb-10", i < indicators.length - 1 && "border-b border-rule")}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <div>
                      <Eyebrow>
                        {t.reports.section} {String(i + 1).padStart(2, "0")}
                      </Eyebrow>
                      <h2 className="mt-1 font-display text-2xl text-kane-blue-ink leading-tight">
                        {mLabel}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="font-display tnum text-3xl text-kane-blue-ink">
                        {meta?.value}
                        <span className="text-sm text-ink-soft">{unit}</span>
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mt-0.5">
                        {period}
                      </div>
                    </div>
                  </div>

                  {trend.length > 0 &&
                    (period === t.reports.allCycles || CHA_CYCLES.includes(period as any)) && (
                      <div className="mt-6">
                        <Eyebrow>{t.reports.trend}</Eyebrow>
                        <div className="mt-3">
                          <TrendChart data={trend} unit={unit} height={220} />
                        </div>
                      </div>
                    )}

                  {/* Geography view — driven by step 2 */}
                  {geoMode === "municipality" && geo && (
                    <div className="mt-6">
                      <Eyebrow>
                        {locale === "es"
                          ? "Por municipio"
                          : locale === "pl"
                            ? "Według gminy"
                            : "By municipality"}
                      </Eyebrow>
                      <table className="mt-3 w-full text-sm">
                        <thead>
                          <tr className="border-b border-rule font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                            <th className="text-left py-2">
                              {locale === "es" ? "Municipio" : locale === "pl" ? "Gmina" : "Municipality"}
                            </th>
                            <th className="text-right py-2">
                              {locale === "es" ? "Valor" : locale === "pl" ? "Wartość" : "Value"}
                            </th>
                            <th className="text-right py-2 w-1/2 pl-4">
                              {locale === "es" ? "vs. condado" : locale === "pl" ? "vs. hrabstwo" : "vs. county"}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...geo.municipalities]
                            .sort((a, b) => b.value - a.value)
                            .map((m) => {
                              const county = meta?.value ?? 1;
                              const pct = Math.min(100, (m.value / (county * 2)) * 100);
                              const ratio = (m.value / county).toFixed(2);
                              const above = m.value > county;
                              return (
                                <tr key={m.id} className="border-b border-rule">
                                  <td className="py-2.5 font-display text-kane-blue-ink">{m.name}</td>
                                  <td className="py-2.5 text-right font-display tnum">
                                    {m.value}
                                    <span className="text-xs text-ink-soft">{unit}</span>
                                  </td>
                                  <td className="py-2.5 pl-4">
                                    <div className="flex items-center gap-3">
                                      <div className="relative h-2 flex-1 bg-paper-deep">
                                        <div
                                          className={cn(
                                            "absolute inset-y-0 left-0",
                                            above ? "bg-kane-amber" : "bg-kane-blue-deep"
                                          )}
                                          style={{ width: `${pct}%` }}
                                          aria-hidden
                                        />
                                      </div>
                                      <span className="font-mono text-[10px] tnum text-ink-soft w-10 text-right">
                                        {ratio}×
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {geoMode === "planning" && geo && (
                    <div className="mt-6">
                      <Eyebrow>
                        {locale === "es"
                          ? "Por Área de Planificación KCHD"
                          : locale === "pl"
                            ? "Według Obszarów Planowania KCHD"
                            : "By KCHD Planning Area"}
                      </Eyebrow>
                      <div className="mt-3 grid grid-cols-5 border-t border-l border-rule">
                        {PLANNING_AREAS.map((pa) => {
                          const value = geo.planningAreas[pa.id];
                          return (
                            <div key={pa.id} className="border-r border-b border-rule p-3 bg-paper/50">
                              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft/70">
                                {pa.name}
                              </div>
                              <div className="mt-1.5 font-display tnum text-xl text-kane-blue-ink">
                                {value}
                                <span className="text-xs text-ink-soft">{unit}</span>
                              </div>
                              <div className="mt-1 font-mono text-[9px] text-ink-soft/60">
                                {pa.tracts} tracts
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {geoMode === "tract" && geo && (
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <Eyebrow>
                          {locale === "es"
                            ? "5 tractos más altos"
                            : locale === "pl"
                              ? "5 najwyższych obwodów"
                              : "Top 5 tracts"}
                        </Eyebrow>
                        <table className="mt-3 w-full text-sm">
                          <tbody>
                            {geo.topTracts.map((tt) => (
                              <tr key={tt.geoid} className="border-b border-rule">
                                <td className="py-2 text-[13px] text-ink">{tt.name}</td>
                                <td className="py-2 text-right font-display tnum text-kane-amber">
                                  {tt.value}
                                  <span className="text-[11px] text-ink-soft">{unit}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <Eyebrow>
                          {locale === "es"
                            ? "5 tractos más bajos"
                            : locale === "pl"
                              ? "5 najniższych obwodów"
                              : "Bottom 5 tracts"}
                        </Eyebrow>
                        <table className="mt-3 w-full text-sm">
                          <tbody>
                            {geo.bottomTracts.map((tt) => (
                              <tr key={tt.geoid} className="border-b border-rule">
                                <td className="py-2 text-[13px] text-ink">{tt.name}</td>
                                <td className="py-2 text-right font-display tnum text-kane-blue-deep">
                                  {tt.value}
                                  <span className="text-[11px] text-ink-soft">{unit}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {equity.length > 0 && (
                    <div className="mt-6">
                      <Eyebrow>{t.reports.equityView}</Eyebrow>
                      <div className="mt-3">
                        <DisparityBars data={equity} unit={unit} />
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
                <Eyebrow>{t.reports.noIndicators}</Eyebrow>
                <p className="mt-3 font-display text-2xl text-ink-soft">
                  {t.reports.noIndicatorsBody}
                </p>
              </div>
            )}

            <div className="pt-6 mt-6 border-t border-rule flex items-center justify-between text-[11px] text-ink-soft/70">
              <span className="font-mono uppercase tracking-[0.14em]">
                {t.reports.generatedOn(new Date().toLocaleDateString())}
              </span>
              <span className="font-mono">CHA 2024 · v1.0</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
