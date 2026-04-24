"use client";

import Link from "next/link";
import { Sparkline } from "@/components/charts/sparkline";
import {
  Eyebrow,
  StatDisplay,
  CTALink,
  RuleEditorial,
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
import { useLocale, Locale } from "@/lib/i18n";

function loc<T extends object>(obj: T, locale: Locale, keys: [keyof T, keyof T, keyof T]): string {
  if (locale === "es") return obj[keys[1]] as unknown as string;
  if (locale === "pl") return obj[keys[2]] as unknown as string;
  return obj[keys[0]] as unknown as string;
}

export default function Home() {
  const { t, locale } = useLocale();

  const priorityByCategory = IPLAN_CATEGORIES.map((c) => ({
    ...c,
    priorities: PRIORITY_AREAS.filter((p) => p.category === c.id),
  }));

  const ctaAdmin = {
    eyebrow: locale === "es" ? "Sección · Personal" : locale === "pl" ? "Sekcja · Personel" : "Staff workspace",
    title:
      locale === "es"
        ? "Espacio de trabajo del personal de KCHD"
        : locale === "pl"
          ? "Obszar roboczy personelu KCHD"
          : "KCHD staff workspace",
    body:
      locale === "es"
        ? "Analítica de uso estilo Google Analytics, controles de actualización de datos, carga basada en roles y un directorio de 20 usuarios con seguridad a nivel de fila."
        : locale === "pl"
          ? "Analityka użycia w stylu Google Analytics, kontrole odświeżania danych, przesyłanie oparte na rolach i katalog 20 użytkowników z bezpieczeństwem wierszowym."
          : "Google Analytics-style usage analytics, data refresh controls, role-based uploads, and a 20-user directory with row-level security.",
    cta:
      locale === "es"
        ? "Abrir /admin"
        : locale === "pl"
          ? "Otwórz /admin"
          : "Open /admin",
  };

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
              <Eyebrow>{t.home.atGlanceEyebrow}</Eyebrow>
              <h2 id="headline-indicators" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance max-w-2xl">
                {t.home.atGlanceTitle}
              </h2>
            </div>
            <CTALink href="/map" className="hidden md:inline-flex">
              {t.home.openMap}
            </CTALink>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid gap-x-10 gap-y-12 grid-cols-2 md:grid-cols-4">
            {HEADLINE_INDICATORS.map((ind, i) => {
              const label =
                locale === "es" ? ind.labelEs : locale === "pl" ? ind.labelPl : ind.label;
              return (
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
                      {ind.value.toFixed(1)}
                    </span>
                    <span className="font-display text-lg text-ink-soft leading-none">{ind.unit}</span>
                  </div>
                  <p className="mt-3 text-sm text-ink-soft leading-snug text-pretty">{label}</p>
                  <p
                    className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      ind.change > 0 && ind.interpretation === "higher-worse"
                        ? "text-critical"
                        : ind.change < 0 && ind.interpretation === "higher-worse"
                          ? "text-positive"
                          : "text-ink-soft"
                    }`}
                  >
                    {ind.change > 0 ? "▲" : ind.change < 0 ? "▼" : "→"} {Math.abs(ind.change).toFixed(1)} {t.home.changeSince2019}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* IPLAN priority areas */}
      <section className="bg-paper" aria-labelledby="iplan-section" data-tour="iplan">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 mb-12">
            <div className="md:col-span-8">
              <Eyebrow>{t.home.iplanEyebrow}</Eyebrow>
              <h2 id="iplan-section" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance">
                {t.home.iplanTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
                {t.home.iplanLede}
              </p>
            </div>
            <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
              <Eyebrow>{t.home.iplanHowToReadEyebrow}</Eyebrow>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {t.home.iplanHowToReadBody}
              </p>
            </div>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {priorityByCategory.map((cat, catIdx) =>
              cat.priorities.map((p) => {
                const catName = loc(cat, locale, ["name", "nameEs", "namePl"]);
                const areaName = loc(p, locale, ["name", "nameEs", "namePl"]);
                const headline = loc(p, locale, ["headline", "headlineEs", "headlinePl"]);
                const statLabel =
                  locale === "es"
                    ? p.headlineStat.labelEs
                    : locale === "pl"
                      ? p.headlineStat.labelPl
                      : p.headlineStat.label;
                const statChange =
                  locale === "es"
                    ? p.headlineStat.changeEs
                    : locale === "pl"
                      ? p.headlineStat.changePl
                      : p.headlineStat.change;
                return (
                  <article key={p.slug} className="group relative">
                    <div className="flex items-start gap-4 mb-4">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-kane-blue-ink font-mono text-xs text-kane-blue-ink"
                        aria-hidden
                      >
                        {String(catIdx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <Eyebrow>{catName}</Eyebrow>
                        <h3 className="mt-1 font-display text-xl leading-tight text-kane-blue-ink group-hover:text-kane-blue-deep transition-colors">
                          <Link href={`/priorities/${p.slug}`} className="after:absolute after:inset-0 after:content-['']">
                            {areaName}
                          </Link>
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-ink-soft mb-4 text-pretty">
                      {headline}
                    </p>

                    <div className="border-t border-rule pt-4 flex items-baseline justify-between">
                      <StatDisplay
                        size="sm"
                        value={p.headlineStat.value}
                        label={statLabel}
                        change={statChange}
                        direction={p.headlineStat.direction}
                      />
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Equity pullquote */}
      <section
        className="bg-kane-blue-ink text-white py-16 md:py-20"
        aria-labelledby="equity-pullquote"
        data-tour="equity"
      >
        <div className="container mx-auto grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Eyebrow className="text-kane-amber">{t.home.equityEyebrow}</Eyebrow>
            <h2 id="equity-pullquote" className="mt-3 font-display text-display-2 text-paper text-balance">
              {t.home.equityTitle}
            </h2>
            <p className="mt-4 text-white/70 leading-relaxed text-pretty">
              {t.home.equityLede}
            </p>
            <div className="mt-6">
              <Link
                href="/equity"
                className="inline-flex items-center gap-2 border-b border-kane-amber text-kane-amber pb-0.5 font-mono text-[11px] uppercase tracking-[0.18em] hover:text-white hover:border-white transition-colors"
              >
                {t.home.openEquityDashboard}
              </Link>
            </div>
          </div>

          <div className="md:col-span-8 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">2.8×</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">{t.home.equityStat1}</p>
            </div>
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">3.2×</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">{t.home.equityStat2}</p>
            </div>
            <div>
              <div className="font-display tnum text-stat-xl leading-none text-kane-amber">47.8%</div>
              <p className="mt-3 text-sm text-white/80 text-pretty">{t.home.equityStat3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community voice */}
      <section className="bg-paper py-16 md:py-24" aria-labelledby="community-voice">
        <div className="container mx-auto">
          <div className="mb-12">
            <Eyebrow>{t.home.communityEyebrow}</Eyebrow>
            <h2 id="community-voice" className="mt-2 font-display text-display-2 text-kane-blue-ink text-balance max-w-3xl">
              {t.home.communityTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft text-pretty">
              {t.home.communityLede}
            </p>
          </div>

          <RuleEditorial className="mb-10" />

          <div className="grid md:grid-cols-2 gap-8">
            {QUALITATIVE_CALLOUTS.slice(0, 2).map((q) => (
              <figure key={q.id} className="relative pl-6 border-l-2 border-kane-amber">
                <blockquote>
                  <p className="font-display text-xl md:text-2xl leading-snug text-kane-blue-ink text-balance">
                    “{q.quote[locale]}”
                  </p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm text-ink-soft">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em]">
                    {q.attribution[locale]}
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
            {t.nav.reports}
          </h2>
          <div className="grid md:grid-cols-4 gap-0 -mx-6 md:mx-0">
            {[
              { ...t.home.ctaMap, href: "/map", tour: "cta-map" },
              { ...t.home.ctaReports, href: "/reports", tour: "cta-reports" },
              { ...t.home.ctaSources, href: "/sources", tour: "cta-sources" },
              { ...ctaAdmin, href: "/admin", tour: "cta-admin" },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                data-tour={c.tour}
                className="group block p-6 md:p-8 border-b md:border-b-0 md:border-r border-rule last:border-r-0 hover:bg-paper-deep transition-colors relative"
              >
                <Eyebrow>{c.eyebrow}</Eyebrow>
                <h3 className="mt-3 font-display text-xl md:text-2xl text-kane-blue-ink text-balance leading-tight group-hover:text-kane-blue-deep">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">
                  {c.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-kane-blue-ink border-b border-kane-blue-ink pb-0.5 group-hover:text-kane-amber group-hover:border-kane-amber transition-colors">
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
