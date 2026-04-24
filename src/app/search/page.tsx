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

function buildIndex() {
  const entries: { title: string; category: string; href: string; body: string; group: string }[] = [];

  HEADLINE_INDICATORS.forEach((i) => {
    entries.push({
      title: i.label,
      category: "Indicator",
      href: `/priorities`,
      body: `${i.value}${i.unit} · ${i.source}`,
      group: "Indicators",
    });
  });
  PRIORITY_AREAS.forEach((p) => {
    entries.push({
      title: p.name,
      category: "Priority area",
      href: `/priorities/${p.slug}`,
      body: p.headline,
      group: "Priority areas",
    });
  });
  MUNICIPALITIES.forEach((m) => {
    entries.push({
      title: m.name,
      category: "Municipality",
      href: `/map?place=${m.id}`,
      body: `Population ${m.population.toLocaleString()}`,
      group: "Places",
    });
  });
  PLANNING_AREAS.forEach((pa) => {
    entries.push({
      title: pa.name,
      category: "Planning Area",
      href: `/map?place=${pa.id}`,
      body: pa.description,
      group: "Places",
    });
  });
  IPLAN_CATEGORIES.forEach((c) => {
    entries.push({
      title: c.name,
      category: "IPLAN category",
      href: `/priorities`,
      body: c.description,
      group: "Framework",
    });
  });
  DATA_SOURCES.forEach((s) => {
    entries.push({
      title: s.name,
      category: "Data source",
      href: `/sources`,
      body: s.description,
      group: "Sources",
    });
  });

  return entries;
}

function SearchContent() {
  const params = useSearchParams();
  const q = params.get("q")?.toLowerCase() ?? "";
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => {
    if (!q) return [];
    return index.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.body.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.group.toLowerCase().includes(q)
    );
  }, [q, index]);

  const grouped = results.reduce<Record<string, typeof results>>((acc, r) => {
    (acc[r.group] = acc[r.group] ?? []).push(r);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        eyebrow="Search"
        title={q ? `Results for “${q}”` : "Search the atlas"}
        lede={`${results.length} result${results.length === 1 ? "" : "s"} across indicators, places, priority areas, framework categories, and data sources.`}
        meta={
          <div className="flex gap-2">
            <Tag>Indicators</Tag>
            <Tag>Places</Tag>
            <Tag>Priority areas</Tag>
            <Tag>Sources</Tag>
          </div>
        }
      />

      <section className="bg-paper py-12">
        <div className="container mx-auto">
          {!q && (
            <p className="text-lg text-ink-soft">
              Use the search bar in the header, or press ⌘K anywhere in the atlas.
            </p>
          )}

          {q && results.length === 0 && (
            <div className="max-w-xl">
              <p className="font-display text-2xl text-kane-blue-ink">
                Nothing found. Try a broader term.
              </p>
              <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                Suggestions: <em>diabetes</em>, <em>Aurora</em>, <em>behavioral</em>, <em>SVI</em>,
                <em> Planning Area</em>, <em>PLACES</em>.
              </p>
            </div>
          )}

          {Object.entries(grouped).map(([group, items]) => (
            <div key={group} className="mb-10">
              <Eyebrow>{group}</Eyebrow>
              <div className="mt-4 divide-y divide-rule border-t border-b border-rule">
                {items.map((r) => (
                  <Link
                    key={r.href + r.title}
                    href={r.href}
                    className="group grid md:grid-cols-12 gap-4 py-5 hover:bg-white transition-colors px-4 -mx-4"
                  >
                    <div className="md:col-span-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-kane-blue-deep">
                        {r.category}
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
