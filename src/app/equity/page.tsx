"use client";

import { useState } from "react";
import { PageHeader, Eyebrow, RuleEditorial, Tag } from "@/components/ui/editorial";
import { DisparityBars } from "@/components/charts/disparity-bars";
import { EQUITY_BY_INDICATOR, HEADLINE_INDICATORS, DEMO_LABELS, DemographicSlice } from "@/lib/data";
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
