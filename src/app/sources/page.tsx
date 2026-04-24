"use client";

import { useState } from "react";
import { PageHeader, Eyebrow, EditorialCard, RuleEditorial, Tag } from "@/components/ui/editorial";
import { DATA_SOURCES } from "@/lib/data";
import { cn } from "@/lib/utils";
import { PlayCircle, BookOpen, Compass } from "lucide-react";

const TUTORIALS = [
  {
    title: "How to read the map",
    duration: "2 min",
    body: "Choropleth colors, demographic filters, SVI overlay, and what the ratios on the disparity bars mean.",
  },
  {
    title: "Building a custom report",
    duration: "3 min",
    body: "Pick indicators, geography, demographics, and time period. Export to PDF / CSV / PNG. Share via URL.",
  },
  {
    title: "What is IPLAN?",
    duration: "1 min",
    body: "The Illinois Project for Local Assessment of Needs framework — six categories of community health the atlas is organized around.",
  },
  {
    title: "Equity views, explained",
    duration: "2 min",
    body: "Why disparity is the default view. How race/ethnicity, income, age, language, and LGBTQ+ cuts work across every indicator.",
  },
];

export default function SourcesPage() {
  const [activeSource, setActiveSource] = useState(DATA_SOURCES[0].id);
  const src = DATA_SOURCES.find((s) => s.id === activeSource)!;

  return (
    <div>
      <PageHeader
        eyebrow="Section 06 · Data & methods"
        title="Every source, every citation, every refresh."
        lede="This atlas is built on public data from the CDC, Census Bureau, Illinois Department of Public Health, and Kane County’s own Community Health Assessment. This page is the transparent record."
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{DATA_SOURCES.length} sources</Tag>
            <Tag>Refresh timestamps</Tag>
            <Tag>Real vs. illustrative labels</Tag>
          </div>
        }
      />

      {/* Tutorials */}
      <section className="bg-paper border-b border-rule py-12">
        <div className="container mx-auto">
          <div className="mb-8">
            <Eyebrow>How to use this atlas</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
              Four short tutorials, plus a guided first-visit tour.
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-2 gap-6">
            {TUTORIALS.map((t, i) => (
              <article
                key={t.title}
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
                  {t.title}
                </h3>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed">{t.body}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                  {t.duration} · video + transcript
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10 p-6 bg-kane-blue-ink text-white flex items-start gap-4">
            <Compass size={32} className="text-kane-amber shrink-0" />
            <div>
              <Eyebrow className="text-kane-amber">Restart the tour</Eyebrow>
              <p className="mt-2 font-display text-xl leading-snug">
                Want the guided walkthrough again?
              </p>
              <p className="mt-2 text-sm text-white/70">
                Click to re-run the five-step tour that appears on first visit.
              </p>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("kane-tour-seen");
                    window.location.href = "/";
                  }
                }}
                className="mt-4 border border-kane-amber text-kane-amber px-4 py-2 text-xs font-mono uppercase tracking-[0.14em] hover:bg-kane-amber hover:text-white transition-colors"
              >
                Restart tour →
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
              <Eyebrow>Data sources</Eyebrow>
              <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
                Every dataset behind this atlas.
              </h2>
            </div>
            <Tag>Last audit: April 10, 2026</Tag>
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
                          {isReal ? "Live" : "Demo"}
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
                      Last refresh
                    </div>
                    <div className="mt-1 font-display text-sm text-kane-blue-ink">
                      {src.lastRefresh}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                      Scope in this demo
                    </div>
                    <div className="mt-1 font-display text-sm text-kane-blue-ink">{src.scope}</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-rule">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                    Citation
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
            <Eyebrow>Methodology</Eyebrow>
            <h2 className="mt-2 font-display text-3xl text-kane-blue-ink max-w-2xl leading-tight">
              How the atlas is built.
            </h2>
          </div>
          <RuleEditorial className="mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tract-level estimates",
                body: "Small-area estimates use CDC PLACES, with ACS 5-year as the population base. Kane County has 144 census tracts and six aggregate geographies (county, municipality, ZIP, Planning Area, plus hospital service area where data permit).",
              },
              {
                title: "Demographic disaggregation",
                body: "Race and ethnicity use OMB categories with Hispanic/Latino treated as a separate dimension. Income is measured relative to the Federal Poverty Level (<200%, 200–399%, ≥400%). LGBTQ+ estimates from BRFSS adult supplement where sample size permits.",
              },
              {
                title: "Privacy and suppression",
                body: "Cells with fewer than 20 observations are suppressed in public views. Rates computed against population denominators with standard population age-adjustment applied for mortality outcomes. Tract-level estimates flagged with coefficient of variation.",
              },
              {
                title: "Refresh and monitoring",
                body: "Automated pulls run on scheduled GitHub Actions. Each source has a health check that alerts KCHD staff by email if a pull fails or a schema changes. Every page shows the data’s ‘last refreshed’ timestamp from the source.",
              },
              {
                title: "Accessibility",
                body: "WCAG 2.1 AA throughout. Semantic HTML, visible focus states, keyboard-accessible interactions, color-independent encoding (every choropleth has a numeric legend), screen-reader friendly chart descriptions. Lighthouse target: 90+.",
              },
              {
                title: "Translation",
                body: "English, Spanish, and Polish. Kane County’s third-most-spoken language is Polish. Interface labels, page content, and exported reports translate. Additional languages can be added post-launch without structural changes.",
              },
            ].map((m, i) => (
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
