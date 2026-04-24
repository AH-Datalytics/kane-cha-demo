import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.2em] text-kane-blue-deep",
        className
      )}
    >
      {children}
    </span>
  );
}

export function RuleEditorial({ className }: { className?: string }) {
  return <div className={cn("rule-editorial", className)} aria-hidden />;
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")} id={id}>
      {eyebrow && (
        <>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="mt-2" />
        </>
      )}
      <h2 className="font-display text-display-2 text-kane-blue-ink text-balance">{title}</h2>
      {lede && (
        <p className="mt-4 text-lg leading-relaxed text-ink-soft text-pretty">{lede}</p>
      )}
    </div>
  );
}

export function EditorialCard({
  as: As = "article",
  className,
  children,
  interactive = false,
}: {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  const Component = As as any;
  return (
    <Component
      className={cn(
        "bg-white border border-rule p-6 lg:p-8 relative",
        interactive && "transition-all hover:border-kane-blue-ink hover:shadow-editorial-lg",
        className
      )}
    >
      {children}
    </Component>
  );
}

export function StatDisplay({
  value,
  unit,
  label,
  change,
  direction,
  size = "md",
  source,
  interpretation = "higher-worse",
}: {
  value: string | number;
  unit?: string;
  label: string;
  change?: string | number;
  direction?: "up" | "down" | "flat";
  size?: "sm" | "md" | "lg";
  source?: string;
  interpretation?: "higher-worse" | "higher-better";
}) {
  // A change is "good" if direction is down AND interpretation is higher-worse,
  // or if direction is up AND interpretation is higher-better
  const changeIsPositive =
    direction === "flat"
      ? false
      : (direction === "down" && interpretation === "higher-worse") ||
        (direction === "up" && interpretation === "higher-better");
  const changeIsNegative =
    direction === "flat"
      ? false
      : (direction === "up" && interpretation === "higher-worse") ||
        (direction === "down" && interpretation === "higher-better");

  const numberSize =
    size === "lg"
      ? "text-stat-xl"
      : size === "sm"
        ? "text-3xl"
        : "text-4xl md:text-5xl";

  return (
    <div>
      <div className="flex items-baseline gap-1">
        <span
          className={cn(
            "font-display font-medium leading-none text-kane-blue-ink tnum",
            numberSize
          )}
        >
          {value}
        </span>
        {unit && (
          <span className="font-display text-xl text-ink-soft leading-none">{unit}</span>
        )}
      </div>
      <p className="mt-3 text-sm text-ink-soft leading-snug text-pretty">{label}</p>
      {change !== undefined && (
        <p
          className={cn(
            "mt-2 font-mono text-[11px] uppercase tracking-[0.1em]",
            changeIsPositive && "text-positive",
            changeIsNegative && "text-critical",
            direction === "flat" && "text-ink-soft"
          )}
        >
          {direction === "up" && "▲ "}
          {direction === "down" && "▼ "}
          {direction === "flat" && "→ "}
          {change}
        </p>
      )}
      {source && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft/60">
          Source · {source}
        </p>
      )}
    </div>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border border-rule px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

export function CTALink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 border-b border-kane-blue-ink pb-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-kane-blue-ink hover:border-kane-amber hover:text-kane-amber transition-colors",
        className
      )}
    >
      {children}
      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  meta?: React.ReactNode;
}) {
  return (
    <header className="border-b border-rule bg-paper pt-10 pb-10">
      <div className="container mx-auto">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-3 font-display text-display-1 text-kane-blue-ink text-balance max-w-5xl">
          {title}
        </h1>
        {lede && (
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-soft text-pretty">
            {lede}
          </p>
        )}
        {meta && <div className="mt-6">{meta}</div>}
      </div>
    </header>
  );
}
