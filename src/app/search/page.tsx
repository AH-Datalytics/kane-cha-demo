"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useMemo } from "react";
import { PageHeader, Eyebrow, Tag } from "@/components/ui/editorial";
import {
  HEADLINE_INDICATORS,
  PRIORITY_AREAS,
  MUNICIPALITIES,
  PLANNING_AREAS,
  IPLAN_CATEGORIES,
  DATA_SOURCES,
} from "@/lib/data";
import { Search as SearchIcon } from "lucide-react";
import { useLocale, Locale } from "@/lib/i18n";

type Entry = {
  title: string;
  categoryKey: keyof ReturnType<typeof getGroupLabels>;
  href: string;
  body: string;
  groupKey: keyof ReturnType<typeof getGroupLabels>;
};

function getGroupLabels(
  t: ReturnType<typeof useLocale>["t"]
): {
  indicators: string;
  places: string;
  priorityAreas: string;
  framework: string;
  sources: string;
  indicator: string;
  priorityArea: string;
  municipality: string;
  planningArea: string;
  iplanCategory: string;
  dataSource: string;
} {
  return { ...t.search.groups, ...t.search.groupLabels };
}

function buildIndex(locale: Locale) {
  const entries: Entry[] = [];

  HEADLINE_INDICATORS.forEach((i) => {
    const label = locale === "es" ? i.labelEs : locale === "pl" ? i.labelPl : i.label;
    entries.push({
      title: label,
      categoryKey: "indicator",
      href: `/priorities`,
      body: `${i.value}${i.unit} · ${i.source}`,
      groupKey: "indicators",
    });
  });
  PRIORITY_AREAS.forEach((p) => {
    const name = locale === "es" ? p.nameEs : locale === "pl" ? p.namePl : p.name;
    const headline = locale === "es" ? p.headlineEs : locale === "pl" ? p.headlinePl : p.headline;
    entries.push({
      title: name,
      categoryKey: "priorityArea",
      href: `/priorities/${p.slug}`,
      body: headline,
      groupKey: "priorityAreas",
    });
  });
  MUNICIPALITIES.forEach((m) => {
    entries.push({
      title: m.name,
      categoryKey: "municipality",
      href: `/map?place=${m.id}`,
      body: `Population ${m.population.toLocaleString()}`,
      groupKey: "places",
    });
  });
  PLANNING_AREAS.forEach((pa) => {
    entries.push({
      title: pa.name,
      categoryKey: "planningArea",
      href: `/map?place=${pa.id}`,
      body: pa.description,
      groupKey: "places",
    });
  });
  IPLAN_CATEGORIES.forEach((c) => {
    const name = locale === "es" ? c.nameEs : locale === "pl" ? c.namePl : c.name;
    const desc = locale === "es" ? c.descriptionEs : locale === "pl" ? c.descriptionPl : c.description;
    entries.push({
      title: name,
      categoryKey: "iplanCategory",
      href: `/priorities`,
      body: desc,
      groupKey: "framework",
    });
  });
  DATA_SOURCES.forEach((s) => {
    entries.push({
      title: s.name,
      categoryKey: "dataSource",
      href: `/sources`,
      body: s.description,
      groupKey: "sources",
    });
  });

  return entries;
}

function SearchContent() {
  const { t, locale } = useLocale();
  const params = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const index = useMemo(() => buildIndex(locale), [locale]);
  const results = useMemo(() => {
    if (!q) return [];
    return index.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q)
    );
  }, [q, index]);

  const labels = getGroupLabels(t);
  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    (acc[r.groupKey] = acc[r.groupKey] ?? []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        eyebrow={t.search.eyebrow}
        title={q ? t.search.titleFor(q) : t.search.titlePlaceholder}
        lede={t.search.lede(results.length)}
        meta={
          <div className="flex gap-2">
            <Tag>{t.search.tags.indicators}</Tag>
            <Tag>{t.search.tags.places}</Tag>
            <Tag>{t.search.tags.priorityAreas}</Tag>
            <Tag>{t.search.tags.sources}</Tag>
          </div>
        }
      />

      <section className="bg-paper py-12">
        <div className="container mx-auto">
          {!q && (
            <p className="text-lg text-ink-soft">{t.search.prompt}</p>
          )}

          {q && results.length === 0 && (
            <div className="max-w-xl">
              <p className="font-display text-2xl text-kane-blue-ink">{t.search.notFound}</p>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">{t.search.notFoundBody}</p>
            </div>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-10">
              <Eyebrow>{labels[group as keyof typeof labels]}</Eyebrow>
              <div className="mt-4 divide-y divide-rule border-t border-b border-rule">
                {items.map((r) => (
                  <Link
                    key={r.href + r.title}
                    href={r.href}
                    className="group grid md:grid-cols-12 gap-4 py-5 hover:bg-white transition-colors px-4 -mx-4"
                  >
                    <div className="md:col-span-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-kane-blue-deep">
                        {labels[r.categoryKey]}
                      </span>
                    </div>
                    <div className="md:col-span-6">
                      <h3 className="font-display text-xl text-kane-blue-ink group-hover:text-kane-amber">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink-soft line-clamp-2">{r.body}</p>
                    </div>
                    <div className="md:col-span-3 text-right">
                      <SearchIcon
                        size={14}
                        className="ml-auto text-ink-soft/60 group-hover:text-kane-amber"
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto py-20 font-mono text-ink-soft">Loading…</div>}>
      <SearchContent />
    </Suspense>
  );
}
