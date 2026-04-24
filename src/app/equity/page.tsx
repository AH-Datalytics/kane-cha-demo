"use client";

import { useState } from "react";
import { PageHeader, Eyebrow, RuleEditorial, Tag } from "@/components/ui/editorial";
import { DisparityBars } from "@/components/charts/disparity-bars";
import {
  EQUITY_BY_INDICATOR,
  HEADLINE_INDICATORS,
  DEMO_LABELS,
  DemographicSlice,
  GEO_BREAKDOWNS,
  PLANNING_AREAS,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

const LENS_IDS = ["race", "income", "age", "language", "lgbtq"] as const;
const LENS_SLICES: Record<(typeof LENS_IDS)[number], DemographicSlice[]> = {
  race: ["overall", "race-white", "race-black", "race-latino", "race-asian"],
  income: ["overall", "income-low", "income-mid", "income-high"],
  age: ["overall", "age-18-34", "age-35-54", "age-55-plus"],
  language: ["overall", "lang-en", "lang-es", "lang-pl"],
  lgbtq: ["overall", "lgbtq"],
};

const EQUITY_INDICATORS = [
  "mental-distress",
  "diabetes",
  "obesity",
  "no-primary-care",
  "infant-mortality",
  "overdose",
];

export default function EquityPage() {
  const { t, locale } = useLocale();
  const [indicator, setIndicator] = useState("mental-distress");
  const [lens, setLens] = useState<(typeof LENS_IDS)[number]>("race");

  const allData = EQUITY_BY_INDICATOR[indicator] ?? [];
  const filtered = allData.filter((d) => LENS_SLICES[lens].includes(d.slice));
  const indicatorMeta = HEADLINE_INDICATORS.find((i) => i.id === indicator);
  const indLabel =
    locale === "es" ? indicatorMeta?.labelEs : locale === "pl" ? indicatorMeta?.labelPl : indicatorMeta?.label;

  const overall = allData.find((d) => d.slice === "overall")?.value ?? 1;
  const worst = [...allData].filter((d) => d.slice !== "overall").sort((a, b) => b.value - a.value)[0];
  const best = [...allData].filter((d) => d.slice !== "overall").sort((a, b) => a.value - b.value)[0];
  const ratio = worst && overall ? (worst.value / overall).toFixed(1) : "—";
  const worstLabel = worst ? DEMO_LABELS[worst.slice]?.[locale] : "—";
  const lensLabel = t.equity.lensOptions[lens];

  return (
    <div>
      <PageHeader
        eyebrow={t.equity.eyebrow}
        title={t.equity.title}
        lede={t.equity.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            {t.equity.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        }
      />

      {/* Controls */}
      <section className="bg-white border-t border-b border-rule">
        <div className="container mx-auto py-6 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <Eyebrow>{t.equity.indicator}</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {EQUITY_INDICATORS.map((id) => {
                const meta = HEADLINE_INDICATORS.find((i) => i.id === id);
                const label =
                  locale === "es" ? meta?.labelEs : locale === "pl" ? meta?.labelPl : meta?.label;
                return (
                  <button
                    key={id}
                    onClick={() => setIndicator(id)}
                    className={cn(
                      "px-3 py-1.5 border text-xs transition-colors",
                      indicator === id
                        ? "bg-kane-blue-ink border-kane-blue-ink text-white"
                        : "border-rule text-ink-soft hover:border-kane-blue-ink hover:text-kane-blue-ink"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-6 md:border-l md:border-rule md:pl-6">
            <Eyebrow>{t.equity.lens}</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {LENS_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => setLens(id)}
                  className={cn(
                    "px-3 py-1.5 border text-xs transition-colors",
                    lens === id
                      ? "bg-kane-amber border-kane-amber text-white"
                      : "border-rule text-ink-soft hover:border-kane-amber hover:text-kane-amber"
                  )}
                >
                  {t.equity.lensOptions[id]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Headline stat */}
      <section className="bg-paper py-12">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <div className="md:col-span-7">
              <Eyebrow>{t.equity.headlineEyebrow(lensLabel)}</Eyebrow>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-kane-blue-ink leading-tight text-balance">
                {t.equity.headlineTemplate(indLabel ?? "", ratio, worstLabel ?? "—")}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-soft leading-relaxed">
                {t.equity.lensDesc[lens]}
              </p>
            </div>
            <div className="md:col-span-5 grid grid-cols-3 gap-6 md:border-l md:border-rule md:pl-8">
              <StatRow label={t.equity.overall} value={overall} unit={indicatorMeta?.unit ?? "%"} />
              <StatRow
                label={t.equity.highest}
                value={worst?.value ?? 0}
                unit={indicatorMeta?.unit ?? "%"}
                highlight="amber"
              />
              <StatRow label={t.equity.lowest} value={best?.value ?? 0} unit={indicatorMeta?.unit ?? "%"} />
            </div>
          </div>
        </div>
      </section>

      {/* Disparity chart */}
      <section className="bg-white border-t border-rule py-14">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>{t.equity.byLens(lensLabel)}</Eyebrow>
            <h3 className="mt-2 font-display text-2xl text-kane-blue-ink">{indLabel}</h3>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <DisparityBars data={filtered} unit={indicatorMeta?.unit ?? "%"} />
            </div>
            <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
              <Eyebrow>{t.equity.howToReadEyebrow}</Eyebrow>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.equity.howToReadBody}</p>
              <div className="mt-5 p-4 bg-paper border border-rule">
                <Eyebrow>{t.equity.sourceEyebrow}</Eyebrow>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  {indicatorMeta?.source ?? "CDC PLACES 2024 + BRFSS Kane 2024"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geographic equity strip */}
      <GeographyStrip indicator={indicator} worst={worst} overall={overall} indicatorLabel={indLabel ?? ""} unit={indicatorMeta?.unit ?? "%"} />

      {/* Secondary equity stories */}
      <section className="bg-paper py-14">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>{t.equity.otherStoriesEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">{t.equity.otherStoriesTitle}</h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.equity.stories.map((s) => (
              <article key={s.eyebrow} className="border border-rule bg-white p-6">
                <Eyebrow>{s.eyebrow}</Eyebrow>
                <div className="mt-3 font-display tnum text-stat-xl leading-none text-kane-amber">
                  {s.stat}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">{s.headline}</p>
                <p className="mt-4 pt-4 border-t border-rule font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                  {t.equity.sourceEyebrow} · {s.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GeographyStrip({
  indicator,
  worst,
  overall,
  indicatorLabel,
  unit,
}: {
  indicator: string;
  worst: { slice: DemographicSlice; value: number } | undefined;
  overall: number;
  indicatorLabel: string;
  unit: string;
}) {
  const { t, locale } = useLocale();
  const geo = GEO_BREAKDOWNS[indicator];
  if (!geo) return null;

  // Ratio applied to each PA: the "worst" demographic slice value vs. overall.
  // That ratio, multiplied by each PA's rate, approximates where the disparity concentrates.
  const worstRatio = worst ? worst.value / overall : 1;
  const worstName = worst ? DEMO_LABELS[worst.slice][locale] : "";

  const countyOverall = overall;
  const paValues = PLANNING_AREAS.map((pa) => {
    const base = geo.planningAreas[pa.id] ?? 0;
    const worstValue = base * worstRatio;
    const disparity = base > 0 ? worstValue / base : 1;
    return {
      id: pa.id,
      name: pa.name,
      description: pa.description,
      tracts: pa.tracts,
      population: pa.population,
      base,
      worstValue,
      disparity,
      vsCounty: base > 0 ? base / countyOverall : 1,
    };
  });

  const maxDisparity = Math.max(...paValues.map((p) => p.worstValue));

  return (
    <section className="bg-white border-t border-b border-rule py-14">
      <div className="container mx-auto">
        <div className="mb-8 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-kane-blue-deep">
                {locale === "es"
                  ? "¿Dónde vive la disparidad?"
                  : locale === "pl"
                    ? "Gdzie mieszka nierówność?"
                    : "Where does the disparity live?"}
              </span>
            </div>
            <h2 className="font-display text-3xl text-kane-blue-ink leading-tight text-balance">
              {locale === "es"
                ? "Cinco Áreas de Planificación, comparadas."
                : locale === "pl"
                  ? "Pięć Obszarów Planowania, porównanych."
                  : "Five Planning Areas, compared."}
            </h2>
          </div>
          <div className="md:col-span-6 md:border-l md:border-rule md:pl-6">
            <p className="text-sm text-ink-soft leading-relaxed max-w-md">
              {locale === "es"
                ? `Si la brecha de ${worstName} persiste por igual en todo el condado, ${indicatorLabel.toLowerCase()} alcanza estos valores en cada Área de Planificación. Muestra dónde la disparidad se concentra geográficamente.`
                : locale === "pl"
                  ? `Jeśli luka ${worstName} utrzymuje się równomiernie w całym hrabstwie, ${indicatorLabel.toLowerCase()} osiąga te wartości w każdym Obszarze Planowania. Pokazuje, gdzie nierówność koncentruje się geograficznie.`
                  : `If the ${worstName} gap persists uniformly across the county, ${indicatorLabel.toLowerCase()} reaches these values in each Planning Area. Shows where the disparity concentrates geographically.`}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
              {locale === "es"
                ? "Por encima de la barra · tasa general · por debajo · tasa modelada para " + worstName
                : locale === "pl"
                  ? "Nad paskiem · stawka ogólna · pod · modelowana dla " + worstName
                  : "Bar top · overall rate · below · modeled rate for " + worstName}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-0 border-t border-l border-rule">
          {paValues.map((pa) => {
            const basePct = (pa.base / maxDisparity) * 100;
            const worstPct = (pa.worstValue / maxDisparity) * 100;
            return (
              <div key={pa.id} className="border-r border-b border-rule p-5 bg-paper/40">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-kane-blue-deep">
                  {pa.name}
                </div>
                <div className="mt-3 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display tnum text-xl text-kane-blue-ink">
                      {pa.base.toFixed(1)}
                      <span className="text-xs text-ink-soft">{unit}</span>
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-ink-soft/70">
                      {locale === "es" ? "general" : locale === "pl" ? "ogółem" : "overall"}
                    </span>
                  </div>
                  <div className="relative h-1.5 w-full bg-paper-deep">
                    <div
                      className="absolute inset-y-0 left-0 bg-kane-blue-deep"
                      style={{ width: `${basePct}%` }}
                      aria-hidden
                    />
                  </div>
                  <div className="flex items-baseline gap-1 pt-1">
                    <span className="font-display tnum text-xl text-kane-amber">
                      {pa.worstValue.toFixed(1)}
                      <span className="text-xs text-ink-soft">{unit}</span>
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.1em] text-kane-amber truncate">
                      {worstName.length > 14 ? worstName.slice(0, 12) + "…" : worstName}
                    </span>
                  </div>
                  <div className="relative h-1.5 w-full bg-paper-deep">
                    <div
                      className="absolute inset-y-0 left-0 bg-kane-amber"
                      style={{ width: `${worstPct}%` }}
                      aria-hidden
                    />
                  </div>
                </div>
                <p className="mt-3 pt-3 border-t border-rule font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                  {pa.tracts} {t.priority.tracts} · {Math.round(pa.population / 1000)}k {t.priority.pop}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/60 max-w-3xl">
          {locale === "es"
            ? "Los valores por Área de Planificación se calculan como la prevalencia base × la razón de disparidad del grupo más afectado. Para ver cualquier tracto individual, use el Mapa."
            : locale === "pl"
              ? "Wartości według Obszarów Planowania są obliczane jako bazowa chorobowość × wskaźnik nierówności grupy najbardziej dotkniętej. Aby zobaczyć pojedynczy obwód, użyj Mapy."
              : "Planning Area values are computed as base prevalence × the disparity ratio of the most-affected slice. For individual tracts, use the Map."}
        </p>
      </div>
    </section>
  );
}

function StatRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: number;
  unit: string;
  highlight?: "amber";
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">{label}</div>
      <div
        className={cn(
          "mt-1 font-display tnum leading-none text-2xl md:text-3xl",
          highlight === "amber" ? "text-kane-amber" : "text-kane-blue-ink"
        )}
      >
        {value.toFixed(1)}
        <span className="text-sm text-ink-soft">{unit}</span>
      </div>
    </div>
  );
}
