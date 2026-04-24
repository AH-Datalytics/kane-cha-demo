import Link from "next/link";
import { PageHeader, Eyebrow, RuleEditorial, StatDisplay, Tag, CTALink } from "@/components/ui/editorial";
import { IPLAN_CATEGORIES, PRIORITY_AREAS } from "@/lib/data";

export default function PrioritiesIndex() {
  return (
    <div>
      <PageHeader
        eyebrow="Section 03 · Priority areas"
        title="Six priority areas, organized against IPLAN."
        lede="Every deep dive page below includes the headline indicator, trend lines over four CHA cycles, demographic cross-tabs, equity views, and voice from community listening sessions."
        meta={
          <div className="flex flex-wrap items-center gap-2">
            <Tag>IPLAN framework</Tag>
            <Tag>Four CHA cycles back-loaded</Tag>
            <Tag>Equity disaggregation</Tag>
            <Tag>Qualitative voice</Tag>
          </div>
        }
      />

      <section className="bg-paper py-14">
        <div className="container mx-auto">
          {IPLAN_CATEGORIES.map((cat, i) => {
            const areas = PRIORITY_AREAS.filter((p) => p.category === cat.id);
            return (
              <div key={cat.id} className="mb-16 last:mb-0">
                <div className="flex items-baseline justify-between gap-6 mb-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <Eyebrow>IPLAN · category {i + 1} of 6</Eyebrow>
                      <h2 className="mt-1 font-display text-3xl md:text-4xl text-kane-blue-ink leading-tight">
                        {cat.name}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm text-ink-soft leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                </div>
                <RuleEditorial className="mb-6" />

                <div className="grid md:grid-cols-2 gap-8">
                  {areas.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/priorities/${p.slug}`}
                      className="group block border border-rule bg-white p-6 hover:border-kane-blue-ink hover:shadow-editorial-lg transition-all"
                    >
                      <Eyebrow>{cat.name}</Eyebrow>
                      <h3 className="mt-2 font-display text-xl text-kane-blue-ink leading-tight group-hover:text-kane-blue-deep">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed text-pretty">
                        {p.headline}
                      </p>
                      <div className="mt-5 pt-4 border-t border-rule flex items-end justify-between gap-4">
                        <StatDisplay
                          size="sm"
                          value={p.headlineStat.value}
                          label={p.headlineStat.label}
                          change={p.headlineStat.change}
                          direction={p.headlineStat.direction}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft/70 whitespace-nowrap">
                          Deep dive →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
