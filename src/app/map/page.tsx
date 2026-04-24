"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, Tag } from "@/components/ui/editorial";
import {
  GEO_LEVELS,
  GEO_BREAKDOWNS,
  PLANNING_AREAS,
  DEMO_LABELS,
  DemographicSlice,
  EQUITY_BY_INDICATOR,
} from "@/lib/data";
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
              <p className="mt-2 text-[11px] text-ink-soft/70 leading-snug">
                {geoLevel === "county"
                  ? locale === "es"
                    ? "Mostrando actualmente: agregado del Condado de Kane (104 secciones combinadas)."
                    : locale === "pl"
                      ? "Obecnie wyświetlane: agregat Hrabstwa Kane (104 obwody łącznie)."
                      : "Currently showing: Kane County aggregate (104 tracts combined)."
                  : geoLevel === "planning-area"
                    ? locale === "es"
                      ? "Mostrando actualmente: 5 Áreas de Planificación de KCHD (agregadas de 104 secciones)."
                      : locale === "pl"
                        ? "Obecnie wyświetlane: 5 Obszarów Planowania KCHD (agregowane z 104 obwodów)."
                        : "Currently showing: 5 KCHD Planning Areas (aggregated from 104 tracts)."
                    : geoLevel === "municipality"
                      ? locale === "es"
                        ? "Mostrando actualmente: municipios del Condado de Kane (agregados de 104 secciones)."
                        : locale === "pl"
                          ? "Obecnie wyświetlane: gminy Hrabstwa Kane (agregowane z 104 obwodów)."
                          : "Currently showing: Kane County municipalities (aggregated from 104 tracts)."
                      : geoLevel === "zip"
                        ? locale === "es"
                          ? "Mostrando actualmente: códigos postales del Condado de Kane (agregados de 104 secciones)."
                          : locale === "pl"
                            ? "Obecnie wyświetlane: kody pocztowe Hrabstwa Kane (agregowane z 104 obwodów)."
                            : "Currently showing: Kane County ZIP codes (aggregated from 104 tracts)."
                        : t.map.currentlyShowing}
              </p>
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
              <KaneMap
                indicator={indicator}
                svi={svi}
                geoLevel={geoLevel as any}
                demographic={demographic as DemographicSlice}
              />
            </div>

            {/* Breakdown at selected level */}
            <GeoBreakdownPanel indicator={indicator} geoLevel={geoLevel} demographic={demographic as DemographicSlice} />

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <EditorialCard className="p-5">
                <Eyebrow>{t.map.countyAggregate}</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-blue-ink">
                  {countyAggregate(indicator, demographic as DemographicSlice)}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{t.map.countyAggregateBody}</p>
              </EditorialCard>
              <EditorialCard className="p-5">
                <Eyebrow>{t.map.highestTract}</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-amber">
                  {topTract(indicator, demographic as DemographicSlice).value}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">{topTract(indicator, demographic as DemographicSlice).name}</p>
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

function GeoBreakdownPanel({
  indicator,
  geoLevel,
  demographic,
}: {
  indicator: string;
  geoLevel: string;
  demographic: DemographicSlice;
}) {
  const geo = GEO_BREAKDOWNS[MAP_TO_EQUITY[indicator] ?? indicator];
  if (!geo || geoLevel === "tract" || geoLevel === "county") return null;
  const ratio = demographicRatio(indicator, demographic);
  const unit = countyUnit(indicator);

  if (geoLevel === "planning-area") {
    return (
      <div className="mt-6 border border-rule bg-white">
        <div className="px-5 py-3 border-b border-rule flex items-baseline justify-between">
          <Eyebrow>By Planning Area · {demographic !== "overall" ? DEMO_LABELS[demographic].en : "overall"}</Eyebrow>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/60">
            5 areas · 104 tracts total
          </span>
        </div>
        <div className="grid grid-cols-5 border-t border-rule">
          {PLANNING_AREAS.map((pa) => {
            const v = (geo.planningAreas[pa.id] ?? 0) * ratio;
            return (
              <div key={pa.id} className="border-r border-rule p-4 last:border-r-0">
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft/70">
                  {pa.name}
                </div>
                <div className="mt-1 font-display tnum text-2xl text-kane-blue-ink">
                  {v.toFixed(1)}
                  <span className="text-xs text-ink-soft">{unit}</span>
                </div>
                <div className="mt-1 font-mono text-[10px] text-ink-soft/60">
                  {pa.tracts} tracts · {Math.round(pa.population / 1000)}k pop.
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (geoLevel === "municipality") {
    const sorted = [...geo.municipalities].sort((a, b) => b.value - a.value);
    return (
      <div className="mt-6 border border-rule bg-white">
        <div className="px-5 py-3 border-b border-rule">
          <Eyebrow>By municipality · {demographic !== "overall" ? DEMO_LABELS[demographic].en : "overall"}</Eyebrow>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {sorted.map((m, i) => (
              <tr key={m.id} className={i < sorted.length - 1 ? "border-b border-rule" : ""}>
                <td className="p-3 font-display text-kane-blue-ink">{m.name}</td>
                <td className="p-3 text-right font-display tnum">
                  {(m.value * ratio).toFixed(1)}
                  <span className="text-xs text-ink-soft">{unit}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (geoLevel === "zip") {
    const unique = new Map<string, { name: string; value: number }>();
    geo.municipalities.forEach((m) => {
      const zip = ZIP_FOR_MUNI[m.id] ?? "60119";
      if (!unique.has(zip)) unique.set(zip, { name: zip, value: m.value });
    });
    return (
      <div className="mt-6 border border-rule bg-white">
        <div className="px-5 py-3 border-b border-rule">
          <Eyebrow>By ZIP code · {demographic !== "overall" ? DEMO_LABELS[demographic].en : "overall"}</Eyebrow>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-rule">
          {Array.from(unique.entries()).map(([zip, v], i) => (
            <div
              key={zip}
              className={cn(
                "p-3 border-r border-b border-rule",
                (i + 1) % 4 === 0 && "border-r-0"
              )}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                ZIP {zip}
              </div>
              <div className="mt-1 font-display tnum text-xl text-kane-blue-ink">
                {(v.value * ratio).toFixed(1)}
                <span className="text-xs text-ink-soft">{unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

const ZIP_FOR_MUNI: Record<string, string> = {
  aurora: "60505",
  elgin: "60120",
  carpentersville: "60110",
  geneva: "60134",
  "st-charles": "60174",
  batavia: "60510",
  "south-elgin": "60177",
  "west-dundee": "60118",
};

const MAP_TO_EQUITY: Record<string, string> = {
  mental_distress: "mental-distress",
  no_primary_care: "no-primary-care",
  infant_mortality: "infant-mortality",
};

function demographicRatio(indicator: string, demo: DemographicSlice): number {
  if (demo === "overall") return 1;
  const key = MAP_TO_EQUITY[indicator] ?? indicator;
  const data = EQUITY_BY_INDICATOR[key];
  if (!data) return 1;
  const overall = data.find((d) => d.slice === "overall")?.value ?? 1;
  const slice = data.find((d) => d.slice === demo)?.value;
  if (!slice || !overall) return 1;
  return slice / overall;
}

function countyAggregate(id: string, demo: DemographicSlice = "overall") {
  const vals: Record<string, number> = {
    diabetes: 10.4,
    obesity: 31.2,
    hypertension: 29.7,
    mental_distress: 24.1,
    no_primary_care: 13.2,
    uninsured: 10.8,
    infant_mortality: 5.1,
    overdose: 26.4,
  };
  const base = vals[id];
  if (base === undefined) return "—";
  const adj = base * demographicRatio(id, demo);
  return adj.toFixed(1);
}
function countyUnit(id: string) {
  return id === "infant_mortality" ? " / 1,000" : id === "overdose" ? " / 100k" : "%";
}
function topTract(id: string, demo: DemographicSlice = "overall") {
  const m: Record<string, { name: string; value: number }> = {
    diabetes: { name: "Tract 8519 · Aurora east", value: 16.8 },
    obesity: { name: "Tract 8527 · Aurora", value: 41.2 },
    hypertension: { name: "Tract 8514 · Aurora", value: 37.1 },
    mental_distress: { name: "Tract 8503 · Elgin central", value: 29.8 },
    no_primary_care: { name: "Tract 8527 · Aurora", value: 24.6 },
    uninsured: { name: "Tract 8519 · Aurora east", value: 21.4 },
    infant_mortality: { name: "Tract 8522 · Aurora", value: 10.8 },
    overdose: { name: "Tract 8504 · Elgin north", value: 33.1 },
  };
  const entry = m[id];
  if (!entry) return { name: "—", value: "—" };
  return { name: entry.name, value: (entry.value * demographicRatio(id, demo)).toFixed(1) };
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
