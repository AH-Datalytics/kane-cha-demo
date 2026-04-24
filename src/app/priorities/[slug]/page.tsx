import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, Eyebrow, RuleEditorial, EditorialCard, StatDisplay, Tag, CTALink } from "@/components/ui/editorial";
import {
  PRIORITY_AREAS,
  IPLAN_CATEGORIES,
  TREND_BY_INDICATOR,
  EQUITY_BY_INDICATOR,
  QUALITATIVE_CALLOUTS,
  HEADLINE_INDICATORS,
  PA_HEALTH_PROFILE,
  PLANNING_AREAS,
} from "@/lib/data";
import { TrendChart } from "@/components/charts/trend-chart";
import { DisparityBars } from "@/components/charts/disparity-bars";

const SLUG_TO_INDICATOR: Record<string, string> = {
  "chronic-disease": "diabetes",
  "maternal-child-health": "infant-mortality",
  "behavioral-health": "mental-distress",
  "access-to-care": "no-primary-care",
  "injury-and-violence": "overdose",
  "environmental-health": "diabetes",
};

export function generateStaticParams() {
  return PRIORITY_AREAS.map((p) => ({ slug: p.slug }));
}

export default function PriorityAreaPage({ params }: { params: { slug: string } }) {
  const area = PRIORITY_AREAS.find((p) => p.slug === params.slug);
  if (!area) return notFound();

  const cat = IPLAN_CATEGORIES.find((c) => c.id === area.category)!;
  const indicatorId = SLUG_TO_INDICATOR[params.slug] ?? "diabetes";
  const trend = TREND_BY_INDICATOR[indicatorId] ?? [];
  const equity = EQUITY_BY_INDICATOR[indicatorId] ?? [];
  const indicatorMeta = HEADLINE_INDICATORS.find((i) => i.id === indicatorId);
  const callouts = QUALITATIVE_CALLOUTS.filter((q) => q.priorityArea === params.slug || q.priorityArea === area.category);

  return (
    <div>
      <PageHeader
        eyebrow={`${cat.name} · Priority Area ${String(PRIORITY_AREAS.findIndex((p) => p.slug === area.slug) + 1).padStart(2, "0")}`}
        title={area.name}
        lede={area.headline}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>IPLAN: {cat.name}</Tag>
            <Tag>CHA 2015 · 2019 · 2022 · 2024</Tag>
            <Tag>Demographic cross-tabs</Tag>
            <Tag>Updated {area.lastUpdated}</Tag>
          </div>
        }
      />

      {/* Headline + summary */}
      <section className="bg-paper py-12">
        <div className="container mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Eyebrow>The lede</Eyebrow>
            <p className="mt-3 font-display text-2xl md:text-3xl text-kane-blue-ink leading-snug text-pretty">
              {area.summary}
            </p>
          </div>
          <div className="md:col-span-5 md:border-l md:border-rule md:pl-8">
            <Eyebrow>Headline indicator</Eyebrow>
            <div className="mt-3">
              <StatDisplay
                size="lg"
                value={area.headlineStat.value}
                label={area.headlineStat.label}
                change={area.headlineStat.change}
                direction={area.headlineStat.direction}
                source={indicatorMeta?.source}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trend across 4 CHA cycles */}
      {trend.length > 0 && (
        <section className="bg-white border-t border-b border-rule py-12">
          <div className="container mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <Eyebrow>Trend · four CHA cycles</Eyebrow>
                <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                  Tracking {area.headlineStat.label.toLowerCase()} from 2015 forward.
                </h2>
              </div>
              <Tag>Illustrative — KCHD data pending load</Tag>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-8">
                <TrendChart data={trend} unit={indicatorMeta?.unit ?? "%"} annotateLatest="2024 CHA" />
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
                <Eyebrow>Reading the chart</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  The 2015, 2019, and 2022 CHA cycles are back-loaded per Addendum 3 of the
                  RFQ to support trend analysis at launch. Dashed amber marks the 2024 CHA
                  release.
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  {trend.map((t, i) => (
                    <div key={t.cycle} className="flex items-baseline justify-between border-b border-rule pb-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                        {t.cycle}
                      </span>
                      <span className="font-display tnum text-sm text-kane-blue-ink">
                        {t.value}
                        {indicatorMeta?.unit ?? "%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Equity / disparity */}
      {equity.length > 0 && (
        <section className="bg-paper py-12">
          <div className="container mx-auto">
            <div className="mb-8">
              <Eyebrow>Equity · disaggregated view</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                {area.headlineStat.label}, disaggregated.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                Every indicator on this atlas is broken out by race and ethnicity, age, income,
                language, and — where data permit — sexual orientation and gender identity.
                Reference line is the county average.
              </p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-8">
                <DisparityBars data={equity} unit={indicatorMeta?.unit ?? "%"} />
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
                <Eyebrow>What the ratios mean</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                  The number on the right (e.g., 1.85×) is the slice’s value divided by the county
                  average. A 1.00× means parity. Above 1.00× is elevated burden; below is lower.
                </p>
                <div className="mt-5 p-4 bg-white border border-rule">
                  <Eyebrow>Largest gap</Eyebrow>
                  <p className="mt-2 font-display text-lg text-kane-amber leading-tight">
                    {biggestGap(equity).label}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft leading-snug">
                    {biggestGap(equity).ratio}× the Kane County overall rate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Planning Areas */}
      <section className="bg-white border-t border-rule py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>Geography · Planning Area view</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
              Five KCHD Planning Areas.
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-5 gap-0 border-t border-l border-rule">
            {PLANNING_AREAS.map((pa) => {
              const profile = PA_HEALTH_PROFILE[pa.id];
              const value =
                indicatorId === "infant-mortality"
                  ? profile.infantMortality
                  : indicatorId === "mental-distress"
                    ? profile.mentalDistress
                    : indicatorId === "no-primary-care"
                      ? profile.uninsured
                      : profile.diabetes;
              return (
                <div key={pa.id} className="border-r border-b border-rule p-5 bg-paper">
                  <Eyebrow>{pa.name}</Eyebrow>
                  <p className="mt-2 font-display tnum text-2xl text-kane-blue-ink">
                    {value}
                    <span className="text-sm text-ink-soft">{indicatorMeta?.unit ?? "%"}</span>
                  </p>
                  <p className="mt-2 text-[11px] text-ink-soft/80 leading-snug line-clamp-3">
                    {pa.description}
                  </p>
                  <p className="mt-3 font-mono text-[10px] text-ink-soft/60">
                    {pa.tracts} tracts · {pa.population.toLocaleString()} pop.
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Community voice */}
      {callouts.length > 0 && (
        <section className="bg-paper py-16">
          <div className="container mx-auto">
            <div className="mb-8">
              <Eyebrow>Community voice · CHA 2024 listening sessions</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                Why the numbers look this way.
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">
                Voices from the 2024 CHA focus groups and key informant interviews, coded to this
                priority area and published alongside the quantitative data they explain.
              </p>
            </div>
            <RuleEditorial className="mb-10" />
            <div className="grid md:grid-cols-2 gap-10">
              {callouts.map((q) => (
                <figure key={q.id} className="relative pl-6 border-l-2 border-kane-amber">
                  <blockquote>
                    <p className="font-display text-xl md:text-2xl leading-snug text-kane-blue-ink text-balance">
                      “{q.quote.en}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                      {q.attribution.en}
                    </span>
                    <Tag className="w-fit">{q.theme}</Tag>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's next */}
      <section className="bg-kane-blue-ink text-white py-12">
        <div className="container mx-auto grid md:grid-cols-2 gap-10">
          <div>
            <Eyebrow className="text-kane-amber">What’s next</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl text-paper text-balance">
              Build your own view of {area.name.toLowerCase()}.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">
              Open this indicator in the map to see tract-level choropleths. Or jump to the
              report builder to combine it with other indicators, pick your own demographic
              slice, and export a custom report.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <Link
              href={`/map?indicator=${indicatorId}`}
              className="block border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <Eyebrow className="text-kane-amber">Open in map</Eyebrow>
              <p className="mt-1 font-display text-lg text-paper leading-tight">
                See this indicator by tract
              </p>
            </Link>
            <Link
              href={`/reports?indicator=${indicatorId}`}
              className="block border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <Eyebrow className="text-kane-amber">Build report</Eyebrow>
              <p className="mt-1 font-display text-lg text-paper leading-tight">
                Combine with other indicators
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function biggestGap(equity: { slice: string; value: number }[]) {
  const overall = equity.find((e) => e.slice === "overall")?.value ?? 1;
  const sorted = [...equity].filter((e) => e.slice !== "overall").sort((a, b) => b.value - a.value);
  const top = sorted[0];
  return {
    label: top?.slice.replace("race-", "").replace("income-", "").replace("age-", "Age ").replace("lang-", "Lang "),
    ratio: (top.value / overall).toFixed(2),
  };
}
