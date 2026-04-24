"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, Tag } from "@/components/ui/editorial";
import { GEO_LEVELS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

const KaneMap = dynamic(() => import("@/components/map/kane-map").then((m) => m.KaneMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-paper-deep flex items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        Loading…
      </span>
    </div>
  ),
});

const INDICATOR_IDS = [
  "diabetes",
  "obesity",
  "hypertension",
  "mental_distress",
  "no_primary_care",
  "uninsured",
  "infant_mortality",
  "overdose",
] as const;

const DEMO_FILTER_IDS = [
  "overall",
  "race-white",
  "race-black",
  "race-latino",
  "race-asian",
  "income-low",
  "age-55-plus",
  "lang-es",
  "lang-pl",
] as const;

export default function MapPage() {
  const { t, locale } = useLocale();
  const [indicator, setIndicator] = useState<string>("diabetes");
  const [geoLevel, setGeoLevel] = useState<string>("tract");
  const [svi, setSvi] = useState(true);
  const [demographic, setDemographic] = useState<string>("overall");

  const selectedIndicator = t.map.indicators[indicator];
  const currentGeo = GEO_LEVELS.find((g) => g.id === geoLevel);
  const currentGeoLabel =
    locale === "es" ? currentGeo?.labelEs : locale === "pl" ? currentGeo?.labelPl : currentGeo?.label;

  return (
    <div>
      <PageHeader
        eyebrow={t.map.eyebrow}
        title={t.map.title}
        lede={t.map.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{t.map.tags.geoLevels}</Tag>
            <Tag>{t.map.tags.svi}</Tag>
            <Tag>{t.map.tags.crosstabs}</Tag>
            <Tag>{t.map.tags.basemap}</Tag>
          </div>
        }
      />

      <section className="bg-paper">
        <div className="container mx-auto py-10 grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-6">
            <div>
              <Eyebrow>{t.map.indicator}</Eyebrow>
              <div className="mt-2 space-y-1">
                {INDICATOR_IDS.map((id) => {
                  const meta = t.map.indicators[id];
                  return (
                    <button
                      key={id}
                      onClick={() => setIndicator(id)}
                      className={cn(
                        "group block w-full text-left px-3 py-2 border-l-2 transition-colors",
                        indicator === id
                          ? "border-kane-amber bg-white"
                          : "border-transparent hover:border-rule hover:bg-white"
                      )}
                    >
                      <div
                        className={cn(
                          "font-display text-sm leading-tight",
                          indicator === id ? "text-kane-blue-ink" : "text-ink"
                        )}
                      >
                        {meta.label}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70 mt-0.5">
                        {meta.category}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>{t.map.geoLevel}</Eyebrow>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {GEO_LEVELS.map((g) => {
                  const label = locale === "es" ? g.labelEs : locale === "pl" ? g.labelPl : g.label;
                  return (
                    <button
                      key={g.id}
                      onClick={() => setGeoLevel(g.id)}
                      className={cn(
                        "px-2 py-1.5 border text-[11px] text-left leading-tight transition-colors",
                        geoLevel === g.id
                          ? "bg-kane-blue-ink border-kane-blue-ink text-white"
                          : "border-rule text-ink-soft hover:border-kane-blue-ink hover:text-kane-blue-ink"
                      )}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[11px] text-ink-soft/70 leading-snug">{t.map.currentlyShowing}</p>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>{t.map.demographicSlice}</Eyebrow>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {DEMO_FILTER_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => setDemographic(id)}
                    className={cn(
                      "px-2 py-1.5 border text-[11px] text-left leading-tight transition-colors",
                      demographic === id
                        ? "bg-kane-amber border-kane-amber text-white"
                        : "border-rule text-ink-soft hover:border-kane-amber hover:text-kane-amber"
                    )}
                  >
                    {t.map.demoFilters[id]}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>{t.map.overlays}</Eyebrow>
              <label className="mt-3 flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={svi}
                  onChange={(e) => setSvi(e.target.checked)}
                  className="mt-0.5 accent-kane-amber"
                />
                <div>
                  <div className="font-display text-sm text-kane-blue-ink leading-tight">
                    {t.map.sviToggle}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70 mt-0.5">
                    {t.map.sviTract}
                  </div>
                </div>
              </label>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="bg-white border border-rule h-[620px] relative">
              <div className="absolute top-4 left-14 z-[400] bg-white/95 border border-rule px-4 py-3 shadow-editorial">
                <Eyebrow>{t.map.nowViewing}</Eyebrow>
                <p className="mt-1 font-display text-base text-kane-blue-ink leading-tight max-w-xs">
                  {selectedIndicator?.label} · {t.map.demoFilters[demographic as keyof typeof t.map.demoFilters]}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                  {currentGeoLabel} · CDC PLACES 2024 + ACS 5-yr
                </p>
              </div>
              <KaneMap indicator={indicator} svi={svi} />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <EditorialCard className="p-5">
                <Eyebrow>{t.map.countyAggregate}</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-blue-ink">
                  {countyAggregate(indicator)}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{t.map.countyAggregateBody}</p>
              </EditorialCard>
              <EditorialCard className="p-5">
                <Eyebrow>{t.map.highestTract}</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-amber">
                  {topTract(indicator).value}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{topTract(indicator).name}</p>
              </EditorialCard>
              <EditorialCard className="p-5">
                <Eyebrow>{t.map.countyVsIllinois}</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-blue-ink">
                  {stateDelta(indicator)}
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{t.map.countyVsIllinoisBody}</p>
              </EditorialCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function countyAggregate(id: string) {
  const vals: Record<string, string> = {
    diabetes: "10.4",
    obesity: "31.2",
    hypertension: "29.7",
    mental_distress: "24.1",
    no_primary_care: "13.2",
    uninsured: "10.8",
    infant_mortality: "5.1",
    overdose: "26.4",
  };
  return vals[id] ?? "—";
}
function countyUnit(id: string) {
  return id === "infant_mortality" ? " / 1,000" : id === "overdose" ? " / 100k" : "%";
}
function topTract(id: string) {
  const m: Record<string, { name: string; value: string }> = {
    diabetes: { name: "Tract 8519 · Aurora east", value: "16.8" },
    obesity: { name: "Tract 8527 · Aurora", value: "41.2" },
    hypertension: { name: "Tract 8514 · Aurora", value: "37.1" },
    mental_distress: { name: "Tract 8503 · Elgin central", value: "29.8" },
    no_primary_care: { name: "Tract 8527 · Aurora", value: "24.6" },
    uninsured: { name: "Tract 8519 · Aurora east", value: "21.4" },
    infant_mortality: { name: "Tract 8522 · Aurora", value: "10.8" },
    overdose: { name: "Tract 8504 · Elgin north", value: "33.1" },
  };
  return m[id] ?? { name: "—", value: "—" };
}
function stateDelta(id: string) {
  const m: Record<string, string> = {
    diabetes: "−1.2 pts",
    obesity: "+0.4 pts",
    hypertension: "−1.8 pts",
    mental_distress: "+2.1 pts",
    no_primary_care: "+0.7 pts",
    uninsured: "−2.3 pts",
    infant_mortality: "−1.4 / 1k",
    overdose: "−4.6 / 100k",
  };
  return m[id] ?? "—";
}
