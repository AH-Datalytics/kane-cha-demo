"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";
import { Eyebrow } from "@/components/ui/editorial";
import { ArrowUpRight } from "lucide-react";

export function HomeHero() {
  const { t, locale } = useLocale();

  return (
    <section className="relative bg-paper bg-grain overflow-hidden" aria-labelledby="hero-title">
      <div className="container mx-auto pt-16 pb-20 md:pt-24 md:pb-28 grid md:grid-cols-12 gap-10 relative">
        {/* Left: editorial header */}
        <div className="md:col-span-8 animate-fade-up">
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>

          <h1
            id="hero-title"
            className="mt-6 font-display text-display-1 text-kane-blue-ink text-balance leading-[0.97]"
          >
            {t.hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-soft text-pretty">
            {t.hero.lede}
          </p>

          <div className="mt-9 flex flex-wrap gap-5">
            <Link
              href="/priorities"
              className="inline-flex items-center gap-2 bg-kane-blue-ink text-white px-6 py-3 text-sm tracking-[0.01em] hover:bg-kane-blue-deep transition-colors"
            >
              {t.hero.cta1}
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 border border-kane-blue-ink text-kane-blue-ink px-6 py-3 text-sm tracking-[0.01em] hover:bg-kane-blue-ink hover:text-white transition-colors"
            >
              {t.hero.cta2}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Masthead metadata */}
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl border-t border-rule pt-8 text-sm">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mb-1">
                {t.hero.populationLabel}
              </dt>
              <dd className="font-display tnum text-xl text-kane-blue-ink">535,041</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mb-1">
                {t.hero.municipalitiesLabel}
              </dt>
              <dd className="font-display tnum text-xl text-kane-blue-ink">16</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mb-1">
                {t.hero.tractsLabel}
              </dt>
              <dd className="font-display tnum text-xl text-kane-blue-ink">144</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 mb-1">
                {t.hero.chaLabel}
              </dt>
              <dd className="font-display tnum text-xl text-kane-blue-ink">4</dd>
            </div>
          </dl>
        </div>

        {/* Right: masthead seal + metadata */}
        <aside className="md:col-span-4 md:border-l md:border-rule md:pl-8 animate-fade-up" aria-label="Masthead">
          <div className="flex items-start justify-between">
            <Image
              src="/logos/kane-county-seal.png"
              alt="Kane County seal"
              width={88}
              height={88}
              className="h-20 w-20 object-contain"
            />
            <Image
              src="/logos/kane-county-main.png"
              alt="Kane County, Illinois · Established January 16, 1836"
              width={200}
              height={50}
              className="h-10 w-auto object-contain opacity-80"
            />
          </div>

          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-baseline justify-between border-b border-rule pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                {t.volume}
              </span>
              <span className="font-display text-kane-blue-ink">I · 2024</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-rule pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                {t.publisher}
              </span>
              <span className="font-display text-kane-blue-ink">KCHD</span>
            </div>
            <div className="flex items-baseline justify-between border-b border-rule pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                {t.lastRefreshed}
              </span>
              <span className="font-display text-kane-blue-ink">
                {new Date("2026-04-10").toLocaleDateString(locale === "pl" ? "pl-PL" : locale === "es" ? "es-US" : "en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-baseline justify-between border-b border-rule pb-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                {t.languages}
              </span>
              <span className="font-display text-kane-blue-ink">EN · ES · PL</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70">
                CHA
              </span>
              <span className="font-display text-kane-blue-ink">2015 · 2019 · 2022 · 2024</span>
            </div>
          </div>

          <p className="mt-8 border-l-2 border-kane-amber pl-4 font-display italic text-ink-soft leading-relaxed text-pretty">
            {t.hero.tagline}
          </p>
        </aside>

        {/* Corner decoration */}
        <div
          aria-hidden
          className="hidden md:block absolute top-4 right-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft/50"
        >
          RFQ 26-029-TK · Atlas v1.0
        </div>
      </div>

      {/* Bottom rule with tri-color */}
      <div className="ribbon-kane h-1 w-full" aria-hidden />
    </section>
  );
}
