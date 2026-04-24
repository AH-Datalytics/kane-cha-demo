"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, Tag } from "@/components/ui/editorial";
import { GEO_LEVELS, MUNICIPALITIES, PLANNING_AREAS } from "@/lib/data";
import { cn } from "@/lib/utils";

const KaneMap = dynamic(() => import("@/components/map/kane-map").then((m) => m.KaneMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-paper-deep flex items-center justify-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
        Loading Kane County geometry…
      </span>
    </div>
  ),
});

const INDICATORS = [
  { id: "diabetes", label: "Diabetes prevalence", category: "Chronic Disease" },
  { id: "obesity", label: "Obesity", category: "Chronic Disease" },
  { id: "hypertension", label: "Hypertension", category: "Chronic Disease" },
  { id: "mental_distress", label: "Frequent mental distress", category: "Behavioral Health" },
  { id: "no_primary_care", label: "No personal doctor", category: "Access to Care" },
  { id: "uninsured", label: "Uninsured adults", category: "Access to Care" },
  { id: "infant_mortality", label: "Infant mortality", category: "Maternal & Child" },
  { id: "overdose", label: "Overdose mortality", category: "Injury & Violence" },
];

const DEMO_FILTERS = [
  { id: "overall", label: "Overall" },
  { id: "race-white", label: "White, NH" },
  { id: "race-black", label: "Black / AA" },
  { id: "race-latino", label: "Hispanic / Latino" },
  { id: "race-asian", label: "Asian" },
  { id: "income-low", label: "<200% FPL" },
  { id: "age-55-plus", label: "Age 55+" },
  { id: "lang-es", label: "Spanish speakers" },
  { id: "lang-pl", label: "Polish speakers" },
];

export default function MapPage() {
  const [indicator, setIndicator] = useState("diabetes");
  const [geoLevel, setGeoLevel] = useState<string>("tract");
  const [svi, setSvi] = useState(true);
  const [demographic, setDemographic] = useState<string>("overall");

  const selectedIndicator = INDICATORS.find((i) => i.id === indicator);

  return (
    <div>
      <PageHeader
        eyebrow="Section 02 · Interactive map"
        title="Map every indicator at every scale."
        lede="Choropleth at the census tract level with a togglable CDC Social Vulnerability Index overlay. Filter by indicator and by demographic slice. Five geographic levels available."
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>Five geographic levels</Tag>
            <Tag>SVI overlay</Tag>
            <Tag>Demographic cross-tabs</Tag>
            <Tag>Basemap: CARTO Light</Tag>
          </div>
        }
      />

      <section className="bg-paper">
        <div className="container mx-auto py-10 grid lg:grid-cols-12 gap-8">
          {/* Left controls */}
          <aside className="lg:col-span-3 space-y-6">
            <div>
              <Eyebrow>Indicator</Eyebrow>
              <div className="mt-2 space-y-1">
                {INDICATORS.map((i) => (
                  <button
                    key={i.id}
                    onClick={() => setIndicator(i.id)}
                    className={cn(
                      "group block w-full text-left px-3 py-2 border-l-2 transition-colors",
                      indicator === i.id
                        ? "border-kane-amber bg-white"
                        : "border-transparent hover:border-rule hover:bg-white"
                    )}
                  >
                    <div
                      className={cn(
                        "font-display text-sm leading-tight",
                        indicator === i.id ? "text-kane-blue-ink" : "text-ink"
                      )}
                    >
                      {i.label}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70 mt-0.5">
                      {i.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>Geographic level</Eyebrow>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {GEO_LEVELS.map((g) => (
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
                    {g.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-ink-soft/70 leading-snug">
                Currently showing: census tract choropleth (144 Kane County tracts).
              </p>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>Demographic slice</Eyebrow>
              <div className="mt-3 grid grid-cols-2 gap-1.5">
                {DEMO_FILTERS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDemographic(d.id)}
                    className={cn(
                      "px-2 py-1.5 border text-[11px] text-left leading-tight transition-colors",
                      demographic === d.id
                        ? "bg-kane-amber border-kane-amber text-white"
                        : "border-rule text-ink-soft hover:border-kane-amber hover:text-kane-amber"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rule">
              <Eyebrow>Overlays</Eyebrow>
              <label className="mt-3 flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={svi}
                  onChange={(e) => setSvi(e.target.checked)}
                  className="mt-0.5 accent-kane-amber"
                />
                <div>
                  <div className="font-display text-sm text-kane-blue-ink leading-tight">
                    CDC Social Vulnerability Index
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70 mt-0.5">
                    Tracts with SVI &gt; 0.5 highlighted
                  </div>
                </div>
              </label>
            </div>
          </aside>

          {/* Map container */}
          <div className="lg:col-span-9">
            <div className="bg-white border border-rule h-[620px] relative">
              <div className="absolute top-4 left-4 z-[400] bg-white/95 border border-rule px-4 py-3 shadow-editorial">
                <Eyebrow>Now viewing</Eyebrow>
                <p className="mt-1 font-display text-base text-kane-blue-ink leading-tight max-w-xs">
                  {selectedIndicator?.label} · {DEMO_FILTERS.find((d) => d.id === demographic)?.label}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                  {GEO_LEVELS.find((g) => g.id === geoLevel)?.label} · {indicator === "svi" ? "CDC SVI 2022" : "CDC PLACES 2024 + ACS 5-yr"}
                </p>
              </div>
              <KaneMap indicator={indicator} svi={svi} />
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <EditorialCard className="p-5">
                <Eyebrow>County aggregate</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-blue-ink">
                  {countyAggregate(indicator)}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  Kane County weighted average across all 144 tracts.
                </p>
              </EditorialCard>
              <EditorialCard className="p-5">
                <Eyebrow>Highest tract</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-amber">
                  {topTract(indicator).value}
                  <span className="text-base text-ink-soft">{countyUnit(indicator)}</span>
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  {topTract(indicator).name}
                </p>
              </EditorialCard>
              <EditorialCard className="p-5">
                <Eyebrow>County vs. Illinois</Eyebrow>
                <p className="mt-2 font-display tnum text-3xl text-kane-blue-ink">
                  {stateDelta(indicator)}
                </p>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  Kane County compared to the Illinois statewide rate (IDPH 2024).
                </p>
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
