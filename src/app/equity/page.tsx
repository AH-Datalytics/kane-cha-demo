"use client";

import { useState } from "react";
import { PageHeader, Eyebrow, RuleEditorial, EditorialCard, Tag } from "@/components/ui/editorial";
import { DisparityBars } from "@/components/charts/disparity-bars";
import { EQUITY_BY_INDICATOR, HEADLINE_INDICATORS, DEMO_LABELS, DemographicSlice } from "@/lib/data";
import { cn } from "@/lib/utils";

const LENSES: { id: string; label: string; desc: string; slices: DemographicSlice[] }[] = [
  { id: "race", label: "Race & Ethnicity", desc: "Disparities across Black, White, Latino, and Asian Kane County residents.", slices: ["overall", "race-white", "race-black", "race-latino", "race-asian"] },
  { id: "income", label: "Income", desc: "Disparities by household income relative to the Federal Poverty Level.", slices: ["overall", "income-low", "income-mid", "income-high"] },
  { id: "age", label: "Age", desc: "How burden shifts across 18–34, 35–54, and 55+.", slices: ["overall", "age-18-34", "age-35-54", "age-55-plus"] },
  { id: "language", label: "Language at home", desc: "English, Spanish, Polish — Kane County’s top three languages.", slices: ["overall", "lang-en", "lang-es", "lang-pl"] },
  { id: "lgbtq", label: "LGBTQ+ adults", desc: "Sexual orientation and gender identity where BRFSS and KCHD survey data permit.", slices: ["overall", "lgbtq"] },
];

const EQUITY_INDICATORS = ["mental-distress", "diabetes", "obesity", "no-primary-care", "infant-mortality", "overdose"];

export default function EquityPage() {
  const [indicator, setIndicator] = useState("mental-distress");
  const [lens, setLens] = useState(LENSES[0].id);

  const currentLens = LENSES.find((l) => l.id === lens)!;
  const allData = EQUITY_BY_INDICATOR[indicator] ?? [];
  const filtered = allData.filter((d) => currentLens.slices.includes(d.slice));
  const indicatorMeta = HEADLINE_INDICATORS.find((i) => i.id === indicator);

  // Compute headline disparity
  const overall = allData.find((d) => d.slice === "overall")?.value ?? 1;
  const worst = [...allData].filter((d) => d.slice !== "overall").sort((a, b) => b.value - a.value)[0];
  const best = [...allData].filter((d) => d.slice !== "overall").sort((a, b) => a.value - b.value)[0];

  return (
    <div>
      <PageHeader
        eyebrow="Section 04 · Health equity"
        title="Disparities are the story, not a subsection."
        lede="Every indicator in this atlas is disaggregated. This page pulls the disparity views together in one place. Pick an indicator. Pick a lens."
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>Race & ethnicity</Tag>
            <Tag>Income</Tag>
            <Tag>Age</Tag>
            <Tag>Language</Tag>
            <Tag>LGBTQ+</Tag>
            <Tag>Geography</Tag>
          </div>
        }
      />

      {/* Controls */}
      <section className="bg-white border-t border-b border-rule">
        <div className="container mx-auto py-6 grid md:grid-cols-12 gap-6">
          <div className="md:col-span-6">
            <Eyebrow>Indicator</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {EQUITY_INDICATORS.map((id) => {
                const meta = HEADLINE_INDICATORS.find((i) => i.id === id);
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
                    {meta?.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-6 md:border-l md:border-rule md:pl-6">
            <Eyebrow>Equity lens</Eyebrow>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {LENSES.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLens(l.id)}
                  className={cn(
                    "px-3 py-1.5 border text-xs transition-colors",
                    lens === l.id
                      ? "bg-kane-amber border-kane-amber text-white"
                      : "border-rule text-ink-soft hover:border-kane-amber hover:text-kane-amber"
                  )}
                >
                  {l.label}
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
              <Eyebrow>Headline · {currentLens.label}</Eyebrow>
              <h2 className="mt-3 font-display text-4xl md:text-5xl text-kane-blue-ink leading-tight text-balance">
                {indicatorMeta?.label} is {worst && overall ? (worst.value / overall).toFixed(1) : "—"}× higher for {DEMO_LABELS[worst?.slice ?? "overall"].en} than the Kane County average.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-soft leading-relaxed">
                {currentLens.desc}
              </p>
            </div>
            <div className="md:col-span-5 grid grid-cols-3 gap-6 md:border-l md:border-rule md:pl-8">
              <StatRow label="Overall" value={overall} unit={indicatorMeta?.unit ?? "%"} />
              <StatRow label="Highest" value={worst?.value ?? 0} unit={indicatorMeta?.unit ?? "%"} highlight="amber" />
              <StatRow label="Lowest" value={best?.value ?? 0} unit={indicatorMeta?.unit ?? "%"} highlight="blue" />
            </div>
          </div>
        </div>
      </section>

      {/* Disparity chart */}
      <section className="bg-white border-t border-rule py-14">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>By {currentLens.label.toLowerCase()}</Eyebrow>
            <h3 className="mt-2 font-display text-2xl text-kane-blue-ink">
              {indicatorMeta?.label}
            </h3>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-8">
              <DisparityBars data={filtered} unit={indicatorMeta?.unit ?? "%"} />
            </div>
            <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
              <Eyebrow>How to read this</Eyebrow>
              <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                Dark bar is the Kane County overall rate. Amber marks the highest-burden slice.
                The number on the right of each bar is the slice’s value divided by the overall
                rate.
              </p>
              <div className="mt-5 p-4 bg-paper border border-rule">
                <Eyebrow>Source</Eyebrow>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  {indicatorMeta?.source ?? "CDC PLACES 2024 + BRFSS Kane oversample 2024"}
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
            <Eyebrow>Other equity stories</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink">
              Five headlines worth knowing.
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EquityStory
              eyebrow="Infant mortality · race"
              stat="2.8×"
              headline="Black infants die before their first birthday at nearly three times the rate of white infants in Kane County."
              source="IDPH Vital Statistics 2023"
            />
            <EquityStory
              eyebrow="Mental distress · LGBTQ+"
              stat="47.8%"
              headline="Nearly one in two LGBTQ+ Kane County adults reported frequent mental distress in 2024 — double the county rate."
              source="BRFSS 2024 Kane supplement"
            />
            <EquityStory
              eyebrow="No personal doctor · language"
              stat="2.3×"
              headline="Spanish-speaking adults are 2.3× more likely than English speakers to lack a personal physician."
              source="BRFSS 2024 Kane supplement"
            />
            <EquityStory
              eyebrow="Diabetes · income"
              stat="2.2×"
              headline="Adults in Kane County’s lowest-income tracts have diabetes at 2.2× the rate of the highest-income tracts."
              source="CDC PLACES 2024"
            />
            <EquityStory
              eyebrow="Obesity · race + income"
              stat="40.1%"
              headline="Obesity among Black adults (40.1%) is 12 points above the county average, widening since 2015."
              source="CDC PLACES 2024"
            />
            <EquityStory
              eyebrow="Overdose · age"
              stat="2.3×"
              headline="Adults 18–34 die from overdose at 2.3× the rate of adults 55+, reversing the 2015 pattern."
              source="CDC WONDER 2023"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StatRow({ label, value, unit, highlight }: { label: string; value: number; unit: string; highlight?: "amber" | "blue" }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
        {label}
      </div>
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

function EquityStory({ eyebrow, stat, headline, source }: { eyebrow: string; stat: string; headline: string; source: string }) {
  return (
    <article className="border border-rule bg-white p-6">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-3 font-display tnum text-stat-xl leading-none text-kane-amber">{stat}</div>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">{headline}</p>
      <p className="mt-4 pt-4 border-t border-rule font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
        Source · {source}
      </p>
    </article>
  );
}
