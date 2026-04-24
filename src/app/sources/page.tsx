"use client";

import { useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, RuleEditorial, Tag } from "@/components/ui/editorial";
import { DATA_SOURCES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlayCircle, Compass } from "lucide-react";
import { useLocale } from "@/lib/i18n";

export default function SourcesPage() {
  const { t } = useLocale();
  const [activeSource, setActiveSource] = useState(DATA_SOURCES[0].id);
  const src = DATA_SOURCES.find((s) => s.id === activeSource)!;

  return (
    <div>
      <PageHeader
        eyebrow={t.sources.eyebrow}
        title={t.sources.title}
        lede={t.sources.lede}
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>
              {DATA_SOURCES.length} {t.sources.tagSources}
            </Tag>
            <Tag>{t.sources.tagRefresh}</Tag>
            <Tag>{t.sources.tagLabels}</Tag>
          </div>
        }
      />

      {/* Tutorials */}
      <section className="bg-paper border-b border-rule py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>{t.sources.howToEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
              {t.sources.howToTitle}
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {t.sources.tutorials.map((tut, i) => (
              <article
                key={tut.title}
                className="group relative border border-rule bg-white p-6 hover:border-kane-blue-ink transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-kane-blue-ink font-mono text-xs text-kane-blue-ink"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <PlayCircle size={20} className="text-kane-amber" />
                </div>
                <h3 className="mt-4 font-display text-xl text-kane-blue-ink leading-tight">
                  {tut.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{tut.body}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                  {tut.duration} · {t.demoMinute.replace("min · ", "")}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 p-6 bg-kane-blue-ink text-white flex items-start gap-4">
            <Compass size={32} className="text-kane-amber shrink-0" />
            <div>
              <Eyebrow className="text-kane-amber">{t.sources.restartEyebrow}</Eyebrow>
              <p className="mt-2 font-display text-xl leading-snug">{t.sources.restartTitle}</p>
              <p className="mt-2 text-sm text-white/70">{t.sources.restartBody}</p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("kane-tour-seen");
                    window.location.href = "/";
                  }
                }}
                className="mt-4 border border-kane-amber text-kane-amber px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] hover:bg-kane-amber hover:text-white transition-colors"
              >
                {t.sources.restartBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="bg-white py-14">
        <div className="container mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <Eyebrow>{t.sources.dataSourcesEyebrow}</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
                {t.sources.dataSourcesTitle}
              </h2>
            </div>
            <Tag>{t.sources.lastAudit}</Tag>
          </div>

          <RuleEditorial className="mb-8" />

          <div className="grid md:grid-cols-12 gap-8">
            <ul className="md:col-span-5 space-y-1 border-l border-rule">
              {DATA_SOURCES.map((s) => {
                const isReal = s.scope.startsWith("Real");
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActiveSource(s.id)}
                      className={cn(
                        "group w-full text-left py-3 pl-5 pr-3 transition-colors -ml-px border-l-2",
                        activeSource === s.id
                          ? "border-kane-amber bg-paper"
                          : "border-transparent hover:border-rule hover:bg-paper/50"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <span className="font-display text-base text-kane-blue-ink leading-tight">
                          {s.name}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.12em] whitespace-nowrap",
                            isReal ? "text-positive" : "text-kane-amber"
                          )}
                        >
                          {isReal ? t.sources.live : t.sources.demo}
                        </span>
                      </div>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/70">
                        {s.frequency}
                      </p>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="md:col-span-7">
              <EditorialCard className="h-full">
                <Eyebrow>{src.frequency}</Eyebrow>
                <h3 className="mt-2 font-display text-2xl text-kane-blue-ink leading-tight">
                  {src.name}
                </h3>
                <p className="mt-4 text-sm text-ink-soft leading-relaxed">{src.description}</p>
                <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-rule">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                      {t.sources.lastRefresh}
                    </div>
                    <div className="mt-1 font-display text-sm text-kane-blue-ink">
                      {src.lastRefresh}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                      {t.sources.scope}
                    </div>
                    <div className="mt-1 font-display text-sm text-kane-blue-ink">{src.scope}</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-rule">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    {t.sources.citation}
                  </div>
                  <p className="mt-1 font-display text-sm text-ink italic leading-relaxed">
                    {src.citation}
                  </p>
                </div>
              </EditorialCard>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-paper py-14">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>{t.sources.methodologyEyebrow}</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
              {t.sources.methodologyTitle}
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {t.sources.methodologyItems.map((m, i) => (
              <article key={m.title}>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                    M · {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg text-kane-blue-ink leading-tight">{m.title}</h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{m.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
