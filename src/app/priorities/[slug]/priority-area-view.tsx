"use client";

import Link from "next/link";
import {
  PageHeader,
  Eyebrow,
  RuleEditorial,
  StatDisplay,
  Tag,
} from "@/components/ui/editorial";
import {
  PRIORITY_AREAS,
  IPLAN_CATEGORIES,
  TREND_BY_INDICATOR,
  EQUITY_BY_INDICATOR,
  QUALITATIVE_CALLOUTS,
  HEADLINE_INDICATORS,
  PA_HEALTH_PROFILE,
  PLANNING_AREAS,
  DEMO_LABELS,
} from "@/lib/data";
import { TrendChart } from "@/components/charts/trend-chart";
import { DisparityBars } from "@/components/charts/disparity-bars";
import { useLocale } from "@/lib/i18n";

const SLUG_TO_INDICATOR: Record<string, string> = {
  "chronic-disease": "diabetes",
  "maternal-child-health": "infant-mortality",
  "behavioral-health": "mental-distress",
  "access-to-care": "no-primary-care",
  "injury-and-violence": "overdose",
  "environmental-health": "diabetes",
};

const PLANNING_AREA_TRANSLATIONS: Record<string, { nameEs: string; namePl: string; descEs: string; descPl: string }> = {
  "pa-east": {
    nameEs: "Kane Este",
    namePl: "Kane Wschód",
    descEs: "Aurora, Batavia, Geneva, St. Charles — el corredor este del río Fox.",
    descPl: "Aurora, Batavia, Geneva, St. Charles — korytarz wschodni rzeki Fox.",
  },
  "pa-north": {
    nameEs: "Kane Norte",
    namePl: "Kane Północ",
    descEs: "Elgin, Carpentersville, Dundee — el tercio norte del condado.",
    descPl: "Elgin, Carpentersville, Dundee — północna trzecia część hrabstwa.",
  },
  "pa-south": {
    nameEs: "Kane Sur",
    namePl: "Kane Południe",
    descEs: "Sugar Grove, Big Rock, Kaneville — sur rural y corredor sur de Aurora.",
    descPl: "Sugar Grove, Big Rock, Kaneville — wiejskie południe hrabstwa i południowy korytarz Aurory.",
  },
  "pa-west": {
    nameEs: "Kane Oeste",
    namePl: "Kane Zachód",
    descEs: "Hampshire, Pingree Grove, Burlington — el lado oeste en crecimiento.",
    descPl: "Hampshire, Pingree Grove, Burlington — rozwijający się zachód.",
  },
  "pa-central": {
    nameEs: "Kane Central",
    namePl: "Kane Centrum",
    descEs: "Campton Hills, Elburn, Wasco — el centro no incorporado del condado.",
    descPl: "Campton Hills, Elburn, Wasco — niezinkorporowane centrum hrabstwa.",
  },
};

export function PriorityAreaView({ slug }: { slug: string }) {
  const { t, locale } = useLocale();
  const area = PRIORITY_AREAS.find((p) => p.slug === slug)!;
  const cat = IPLAN_CATEGORIES.find((c) => c.id === area.category)!;
  const indicatorId = SLUG_TO_INDICATOR[slug] ?? "diabetes";
  const trend = TREND_BY_INDICATOR[indicatorId] ?? [];
  const equity = EQUITY_BY_INDICATOR[indicatorId] ?? [];
  const indicatorMeta = HEADLINE_INDICATORS.find((i) => i.id === indicatorId);
  const callouts = QUALITATIVE_CALLOUTS.filter(
    (q) => q.priorityArea === slug || q.priorityArea === area.category
  );

  const areaName = locale === "es" ? area.nameEs : locale === "pl" ? area.namePl : area.name;
  const areaHeadline = locale === "es" ? area.headlineEs : locale === "pl" ? area.headlinePl : area.headline;
  const areaSummary = locale === "es" ? area.summaryEs : locale === "pl" ? area.summaryPl : area.summary;
  const catName = locale === "es" ? cat.nameEs : locale === "pl" ? cat.namePl : cat.name;
  const statLabel =
    locale === "es" ? area.headlineStat.labelEs : locale === "pl" ? area.headlineStat.labelPl : area.headlineStat.label;
  const statChange =
    locale === "es" ? area.headlineStat.changeEs : locale === "pl" ? area.headlineStat.changePl : area.headlineStat.change;
  const lastUpdated =
    locale === "es" ? area.lastUpdatedEs : locale === "pl" ? area.lastUpdatedPl : area.lastUpdated;
  const indLabel =
    locale === "es" ? indicatorMeta?.labelEs : locale === "pl" ? indicatorMeta?.labelPl : indicatorMeta?.label;

  const biggestGap = computeBiggestGap(equity, locale);

  return (
    <div>
      <PageHeader
        eyebrow={t.priority.eyebrow(
          catName,
          String(PRIORITY_AREAS.findIndex((p) => p.slug === area.slug) + 1).padStart(2, "0")
        )}
        title={areaName}
        lede={areaHeadline}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>
              {t.priority.tagIplan}: {catName}
            </Tag>
            <Tag>{t.priority.tagCycles}</Tag>
            <Tag>{t.priority.tagCrosstabs}</Tag>
            <Tag>
              {t.priority.tagUpdated} {lastUpdated}
            </Tag>
          </div>
        }
      />

      {/* Lede + headline */}
      <section className="bg-paper py-12">
        <div className="container mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Eyebrow>{t.priority.theLede}</Eyebrow>
            <p className="mt-3 font-display text-2xl md:text-3xl text-kane-blue-ink leading-snug text-pretty">
              {areaSummary}
            </p>
          </div>
          <div className="md:col-span-5 md:border-l md:border-rule md:pl-8">
            <Eyebrow>{t.priority.headlineIndicator}</Eyebrow>
            <div className="mt-3">
              <StatDisplay
                size="lg"
                value={area.headlineStat.value}
                label={statLabel}
                change={statChange}
                direction={area.headlineStat.direction}
                source={indicatorMeta?.source}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trend */}
      {trend.length > 0 && (
        <section className="bg-white border-t border-b border-rule py-12">
          <div className="container mx-auto">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <Eyebrow>{t.priority.trendEyebrow}</Eyebrow>
                <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                  {t.priority.trendTitle((statLabel ?? "").toLowerCase())}
                </h2>
              </div>
              <Tag>{t.priority.illustrativeTag}</Tag>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-8">
                <TrendChart data={trend} unit={indicatorMeta?.unit ?? "%"} annotateLatest={t.priority.latestCycleLabel} />
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
                <Eyebrow>{t.priority.readingChartEyebrow}</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.priority.readingChartBody}</p>
                <div className="mt-4 space-y-2 text-xs">
                  {trend.map((tr) => (
                    <div
                      key={tr.cycle}
                      className="flex items-baseline justify-between border-b border-rule pb-1"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">
                        {tr.cycle}
                      </span>
                      <span className="font-display tnum text-sm text-kane-blue-ink">
                        {tr.value}
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

      {/* Equity */}
      {equity.length > 0 && (
        <section className="bg-paper py-12">
          <div className="container mx-auto">
            <div className="mb-8">
              <Eyebrow>{t.priority.equityEyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                {t.priority.equityTitle(statLabel ?? "")}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">{t.priority.equityLede}</p>
            </div>
            <RuleEditorial className="mb-8" />
            <div className="grid md:grid-cols-12 gap-10">
              <div className="md:col-span-8">
                <DisparityBars data={equity} unit={indicatorMeta?.unit ?? "%"} />
              </div>
              <div className="md:col-span-4 md:border-l md:border-rule md:pl-6">
                <Eyebrow>{t.priority.ratiosEyebrow}</Eyebrow>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.priority.ratiosBody}</p>
                <div className="mt-5 p-4 bg-white border border-rule">
                  <Eyebrow>{t.priority.largestGap}</Eyebrow>
                  <p className="mt-2 font-display text-lg text-kane-amber leading-tight">
                    {biggestGap.label}
                  </p>
                  <p className="mt-1 text-xs text-ink-soft leading-snug">
                    {biggestGap.ratio}× {t.priority.aboveAverage}
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
            <Eyebrow>{t.priority.planningEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
              {t.priority.planningTitle}
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
              const paTr = PLANNING_AREA_TRANSLATIONS[pa.id];
              const paName = locale === "es" ? paTr.nameEs : locale === "pl" ? paTr.namePl : pa.name;
              const paDesc = locale === "es" ? paTr.descEs : locale === "pl" ? paTr.descPl : pa.description;
              return (
                <div key={pa.id} className="border-r border-b border-rule p-5 bg-paper">
                  <Eyebrow>{paName}</Eyebrow>
                  <p className="mt-2 font-display tnum text-2xl text-kane-blue-ink">
                    {value}
                    <span className="text-sm text-ink-soft">{indicatorMeta?.unit ?? "%"}</span>
                  </p>
                  <p className="mt-2 text-[11px] text-ink-soft/80 leading-snug line-clamp-3">{paDesc}</p>
                  <p className="mt-3 font-mono text-[10px] text-ink-soft/60">
                    {pa.tracts} {t.priority.tracts} · {pa.population.toLocaleString()} {t.priority.pop}
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
              <Eyebrow>{t.priority.communityEyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink leading-tight max-w-2xl">
                {t.priority.communityTitle}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-ink-soft leading-relaxed">{t.priority.communityLede}</p>
            </div>
            <RuleEditorial className="mb-10" />
            <div className="grid md:grid-cols-2 gap-10">
              {callouts.map((q) => (
                <figure key={q.id} className="relative pl-6 border-l-2 border-kane-amber">
                  <blockquote>
                    <p className="font-display text-xl md:text-2xl leading-snug text-kane-blue-ink text-balance">
                      “{q.quote[locale]}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex flex-col gap-2 text-sm text-ink-soft">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                      {q.attribution[locale]}
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
            <Eyebrow className="text-kane-amber">{t.priority.nextEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-2xl md:text-3xl text-paper text-balance">
              {t.priority.nextTitle(areaName.toLowerCase())}
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed">{t.priority.nextBody}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <Link
              href={`/map?indicator=${indicatorId}`}
              className="block border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <Eyebrow className="text-kane-amber">{t.priority.openInMap}</Eyebrow>
              <p className="mt-1 font-display text-lg text-paper leading-tight">
                {t.priority.openInMapBody}
              </p>
            </Link>
            <Link
              href={`/reports?indicator=${indicatorId}`}
              className="block border border-white/30 p-4 hover:bg-white/10 transition-colors"
            >
              <Eyebrow className="text-kane-amber">{t.priority.buildReport}</Eyebrow>
              <p className="mt-1 font-display text-lg text-paper leading-tight">
                {t.priority.buildReportBody}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function computeBiggestGap(
  equity: { slice: keyof typeof DEMO_LABELS; value: number }[],
  locale: "en" | "es" | "pl"
) {
  const overall = equity.find((e) => e.slice === "overall")?.value ?? 1;
  const sorted = [...equity].filter((e) => e.slice !== "overall").sort((a, b) => b.value - a.value);
  const top = sorted[0];
  if (!top) return { label: "—", ratio: "1.00" };
  return {
    label: DEMO_LABELS[top.slice]?.[locale] ?? top.slice,
    ratio: (top.value / overall).toFixed(2),
  };
}
