"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/i18n";

export function SiteFooter() {
  const { t, locale } = useLocale();

  return (
    <footer className="mt-24 border-t border-rule bg-paper-deep/60 no-print">
      <div className="ribbon-kane h-[3px] w-full" aria-hidden />

      <div className="container mx-auto py-12">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image src="/logos/kchd.png" alt="" width={140} height={36} className="h-10 w-auto" />
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              {t.footer.builtBy}
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">
              {t.footer.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">
                Explore
              </h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-ink hover:text-kane-blue-deep">{t.nav.overview}</Link></li>
                <li><Link href="/map" className="text-ink hover:text-kane-blue-deep">{t.nav.map}</Link></li>
                <li><Link href="/priorities" className="text-ink hover:text-kane-blue-deep">{t.nav.priorities}</Link></li>
                <li><Link href="/equity" className="text-ink hover:text-kane-blue-deep">{t.nav.equity}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">
                Build &amp; learn
              </h3>
              <ul className="space-y-2">
                <li><Link href="/reports" className="text-ink hover:text-kane-blue-deep">{t.nav.reports}</Link></li>
                <li><Link href="/sources" className="text-ink hover:text-kane-blue-deep">{t.nav.sources}</Link></li>
                <li><Link href="/admin" className="text-ink hover:text-kane-blue-deep">KCHD staff</Link></li>
                <li><a href="#" className="text-ink hover:text-kane-blue-deep">{t.footer.accessibility}</a></li>
              </ul>
            </div>
          </nav>

          <div className="md:col-span-3 text-sm">
            <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft/70">
              Kane County Health Department
            </h3>
            <address className="not-italic text-ink-soft leading-relaxed">
              1240 N. Highland Ave., Suite 5<br />
              Aurora, IL 60506<br />
              <a href="tel:+16302082273" className="text-ink hover:text-kane-blue-deep">
                (630) 208-2273
              </a>
            </address>
            <p className="mt-4 text-xs text-ink-soft/70">
              {t.footer.owner}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between border-t border-rule pt-6 gap-3 text-[11px] text-ink-soft/70">
          <span className="font-mono uppercase tracking-[0.14em]">
            {t.lastUpdated}: {new Date("2026-04-10").toLocaleDateString(locale === "pl" ? "pl-PL" : locale === "es" ? "es-US" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
          </span>
          <span className="font-mono">v1.0 · RFQ 26-029-TK demonstration</span>
        </div>
      </div>
    </footer>
  );
}
