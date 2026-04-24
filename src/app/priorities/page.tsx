"use client";

import Link from "next/link";
import { PageHeader, Eyebrow, RuleEditorial, StatDisplay, Tag } from "@/components/ui/editorial";
import { IPLAN_CATEGORIES, PRIORITY_AREAS } from "@/lib/data";
import { useLocale } from "@/lib/i18n";

export default function PrioritiesIndex() {
  const { t, locale } = useLocale();

  return (
    <div>
      <PageHeader
        eyebrow={t.prioritiesIndex.eyebrow}
        title={t.prioritiesIndex.title}
        lede={t.prioritiesIndex.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{t.prioritiesIndex.tagIplan}</Tag>
            <Tag>{t.prioritiesIndex.tagCycles}</Tag>
            <Tag>{t.prioritiesIndex.tagEquity}</Tag>
            <Tag>{t.prioritiesIndex.tagQualitative}</Tag>
          </div>
        }
      />

      <section className="bg-paper py-14">
        <div className="container mx-auto">
          {IPLAN_CATEGORIES.map((cat, i) => {
            const areas = PRIORITY_AREAS.filter((p) => p.category === cat.id);
            const catName = locale === "es" ? cat.nameEs : locale === "pl" ? cat.namePl : cat.name;
            const catDesc = locale === "es" ? cat.descriptionEs : locale === "pl" ? cat.descriptionPl : cat.description;
            return (
              <div key={cat.id} className="mb-16 last:mb-0">
                <div className="flex items-baseline justify-between gap-6 mb-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Eyebrow>{t.prioritiesIndex.categoryOf(i + 1, IPLAN_CATEGORIES.length)}</Eyebrow>
                      <h2 className="mt-1 font-display text-3xl md:text-4xl text-kane-blue-ink leading-tight">
                        {catName}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-ink-soft leading-relaxed">
                        {catDesc}
                      </p>
                    </div>
                  </div>
                </div>
                <RuleEditorial className="mb-6" />

                <div className="grid md:grid-cols-2 gap-8">
                  {areas.map((p) => {
                    const areaName = locale === "es" ? p.nameEs : locale === "pl" ? p.namePl : p.name;
                    const headline = locale === "es" ? p.headlineEs : locale === "pl" ? p.headlinePl : p.headline;
                    const statLabel =
                      locale === "es" ? p.headlineStat.labelEs : locale === "pl" ? p.headlineStat.labelPl : p.headlineStat.label;
                    const statChange =
                      locale === "es" ? p.headlineStat.changeEs : locale === "pl" ? p.headlineStat.changePl : p.headlineStat.change;
                    return (
                      <Link
                        key={p.slug}
                        href={`/priorities/${p.slug}`}
                        className="group block border border-rule bg-white p-6 hover:border-kane-blue-ink hover:shadow-editorial-lg transition-all"
                      >
                        <Eyebrow>{catName}</Eyebrow>
                        <h3 className="mt-2 font-display text-xl text-kane-blue-ink leading-tight group-hover:text-kane-blue-deep">
                          {areaName}
                        </h3>
                        <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">{headline}</p>
                        <div className="mt-5 pt-4 border-t border-rule flex items-end justify-between gap-4">
                          <StatDisplay
                            size="sm"
                            value={p.headlineStat.value}
                            label={statLabel}
                            change={statChange}
                            direction={p.headlineStat.direction}
                          />
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 whitespace-nowrap">
                            {t.prioritiesIndex.deepDive}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
