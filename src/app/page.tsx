import Link from "next/link";
import Image from "next/image";
import { Sparkline } from "@/components/charts/sparkline";
import {
  Eyebrow,
  EditorialCard,
  StatDisplay,
  CTALink,
  RuleEditorial,
  SectionHeading,
  Tag,
} from "@/components/ui/editorial";
import {
  HEADLINE_INDICATORS,
  IPLAN_CATEGORIES,
  PRIORITY_AREAS,
  QUALITATIVE_CALLOUTS,
} from "@/lib/data";
import { DATA_PALETTE } from "@/lib/utils";
import { HomeHero } from "@/components/home-hero";

export default function Home() {
  const priorityByCategory = IPLAN_CATEGORIES.map((c) => ({
    ...c,
    priorities: PRIORITY_AREAS.filter((p) => p.category === c.id),
  }));

  return (
    <div>
      <HomeHero />

      {/* Headline indicators strip */}
      <section
        className="border-t border-b border-rule bg-white"
        data-tour="indicators"
        aria-labelledby="headline-indicators"
      >
        <div className="container mx-auto py-12 md:py-16">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <Eyebrow>Kane County at a glance</Eyebrow>
              <h2 id="headline-indicators" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance max-w-2xl">
                Eight indicators, three CHA cycles, 535,000 residents.
              </h2>
            </div>
            <CTALink href="/map" className="hidden md:inline-flex">
              Open the map
            </CTALink>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid gap-x-10 gap-y-12 grid-cols-2 md:grid-cols-4">
            {HEADLINE_INDICATORS.map((ind, i) => (
              <Link
                key={ind.id}
                href={`/priorities/${categoryToSlug(ind.category)}`}
                className="group block"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 inline-block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Sparkline data={ind.sparkline} color={DATA_PALETTE[i % DATA_PALETTE.length]} />
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-medium tnum text-stat-xl leading-none text-kane-blue-ink group-hover:text-kane-blue-deep transition-colors">
                    {ind.value.toFixed(ind.value < 20 ? 1 : 1)}
                  </span>
                  <span className="font-display text-lg text-ink-soft leading-none">
                    {ind.unit}
                  </span>
                </div>
                <p className="mt-3 text-sm text-ink-soft leading-snug text-pretty">{ind.label}</p>
                <p
                  className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                    ind.change > 0 && ind.interpretation === "higher-worse"
                      ? "text-critical"
                      : ind.change < 0 && ind.interpretation === "higher-worse"
                        ? "text-positive"
                        : "text-ink-soft"
                  }`}
                >
                  {ind.change > 0 ? "▲" : ind.change < 0 ? "▼" : "→"}{" "}
                  {Math.abs(ind.change).toFixed(1)} pts since 2019
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IPLAN priority areas */}
      <section className="bg-paper" aria-labelledby="iplan-section">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-8">
              <Eyebrow>Priority areas · IPLAN framework</Eyebrow>
              <h2 id="iplan-section" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance">
                Kane County’s health, organized against IPLAN.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                Six Illinois Project for Local Assessment of Needs categories, paired with the
                specific priorities KCHD and community partners named in the 2024 Community
                Health Assessment. Each area has its own deep-dive page with time series,
                cross-tabs, and qualitative voice from community listening sessions.
              </p>
            </div>
            <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <Eyebrow>How to read this</Eyebrow>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                The circled number on each area is the IPLAN reference. The headline statistic
                is the single indicator KCHD and community partners named as the priority for
                this cycle. Click through for the full picture, including equity breakdowns.
              </p>
            </div>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {priorityByCategory.map((cat, catIdx) =>
              cat.priorities.map((p) => (
                <article key={p.slug} className="group relative">
                  <div className="flex items-start gap-4 mb-4">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-kane-blue-ink font-mono text-xs text-kane-blue-ink"
                      aria-hidden
                    >
                      {String(catIdx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Eyebrow>{cat.name}</Eyebrow>
                      <h3 className="mt-1 font-display text-xl leading-tight text-kane-blue-ink group-hover:text-kane-blue-deep transition-colors">
                        <Link href={`/priorities/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                          {p.name}
                        </Link>
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-ink-soft mb-4 text-pretty">
                    {p.headline}
                  </p>

                  <div className="border-t border-rule pt-4 flex items-baseline justify-between">
                    <StatDisplay
                      size="sm"
                      value={p.headlineStat.value}
                      label={p.headlineStat.label}
                      change={p.headlineStat.change}
                      direction={p.headlineStat.direction}
                    />
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Equity pullquote */}
      <section className="bg-kane-blue-ink text-white py-16 md:py-20" aria-labelledby="equity-pullquote">
        <div className="container mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow className="text-kane-amber">Health equity, not buried</Eyebrow>
            <h2 id="equity-pullquote" className="mt-3 font-display text-display-2 text-paper text-balance">
              Disparity is the story.
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed text-pretty">
              Every indicator on this atlas is disaggregated by race and ethnicity, age, income,
              language, geography, and sexual orientation and gender identity where data permit.
              The equity view is the default view.
            </p>
            <div className="mt-6">
              <Link
                href="/equity"
                className="inline-flex items-center gap-2 border-b border-kane-amber text-kane-amber pb-0.5 font-mono text-[11px] uppercase tracking-[0.18em] hover:text-white hover:border-white transition-colors"
              >
                Open the equity dashboard →
              </Link>
            </div>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">2.8×</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">
                Black–White infant mortality ratio in Kane County, flat since 2015.
              </p>
            </div>
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">3.2×</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">
                Diabetes prevalence in the lowest-income tracts of Aurora versus St. Charles.
              </p>
            </div>
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">47.8%</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">
                LGBTQ+ Kane County adults reporting frequent mental distress, nearly double the county average.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community voice */}
      <section className="bg-paper py-16 md:py-24" aria-labelledby="community-voice">
        <div className="container mx-auto">
          <div className="mb-12">
            <Eyebrow>Community voice · CHA 2024</Eyebrow>
            <h2 id="community-voice" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance max-w-3xl">
              What the numbers alone can’t tell you.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
              Quantitative data says what. Qualitative data says why. Both live on the same
              pages across this atlas. A few voices from the 2024 CHA listening sessions.
            </p>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid md:grid-cols-2 gap-8">
            {QUALITATIVE_CALLOUTS.slice(0, 2).map((q, i) => (
              <figure key={q.id} className="relative pl-6 border-l-2 border-kane-amber">
                <blockquote>
                  <p className="font-display text-xl md:text-2xl leading-snug text-kane-blue-ink text-balance">
                    “{q.quote.en}”
                  </p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                    {q.attribution.en}
                  </span>
                </figcaption>
                <p className="mt-2">
                  <Tag>{q.theme}</Tag>
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action grid */}
      <section className="bg-white border-t border-rule" aria-labelledby="cta-grid">
        <div className="container mx-auto py-16 md:py-20">
          <h2 id="cta-grid" className="sr-only">
            Tools and resources
          </h2>
          <div className="grid md:grid-cols-3 gap-0 -mx-6 md:mx-0">
            {[
              {
                eyebrow: "Section 02",
                title: "Interactive Kane County map",
                body: "Five geographic levels. SVI overlay. Filter by any indicator and any demographic slice.",
                cta: "Open the map",
                href: "/map",
              },
              {
                eyebrow: "Section 05",
                title: "Custom report builder",
                body: "Pick indicators, geography, demographics, time period. Save, share via URL, export to PDF, CSV, or PNG.",
                cta: "Build a report",
                href: "/reports",
              },
              {
                eyebrow: "Section 06",
                title: "Data sources and methods",
                body: "Every source, citation, and refresh schedule. Plus short tutorials and a guided first-visit tour.",
                cta: "Review methods",
                href: "/sources",
              },
            ].map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className={`group block p-8 md:p-10 border-b md:border-b-0 md:border-r border-rule last:border-r-0 hover:bg-paper-deep transition-colors relative`}
              >
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-2xl md:text-3xl text-kane-blue-ink text-balance leading-tight group-hover:text-kane-blue-deep">
                  {c.title}
                </h3>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed text-pretty">
                  {c.body}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-kane-blue-ink border-b border-kane-blue-ink pb-0.5 group-hover:text-kane-amber group-hover:border-kane-amber transition-colors">
                  {c.cta} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function categoryToSlug(category: string) {
  const map: Record<string, string> = {
    "chronic-disease": "chronic-disease",
    "maternal-child": "maternal-child-health",
    "behavioral-health": "behavioral-health",
    "injury-violence": "injury-and-violence",
    "access-to-care": "access-to-care",
    "environmental-health": "environmental-health",
  };
  return map[category] ?? "chronic-disease";
}
