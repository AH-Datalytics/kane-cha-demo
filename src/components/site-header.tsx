"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, LOCALES, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Search, Languages, Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [q, setQ] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchRef.current?.focus(), 50);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setLangOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = [
    { href: "/", label: t.nav.overview, key: "overview" },
    { href: "/map", label: t.nav.map, key: "map" },
    { href: "/priorities", label: t.nav.priorities, key: "priorities" },
    { href: "/equity", label: t.nav.equity, key: "equity" },
    { href: "/reports", label: t.nav.reports, key: "reports" },
    { href: "/sources", label: t.nav.sources, key: "sources" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80 no-print">
      {/* Tri-color ribbon */}
      <div className="ribbon-kane h-[3px] w-full" aria-hidden />

      <div className="container mx-auto flex h-20 items-center justify-between gap-4">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Kane County Community Health Atlas, home"
          data-tour="brand"
        >
          <div className="flex items-center gap-3">
            <Image
              src="/logos/kchd.png"
              alt=""
              width={120}
              height={30}
              className="h-8 w-auto"
              priority
            />
            <div className="hidden sm:block h-8 w-px bg-rule" aria-hidden />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-display text-[15px] font-medium tracking-tight text-kane-blue-ink">
                Community Health Atlas
              </span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                Kane County, Illinois
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden lg:flex items-center gap-7" data-tour="nav">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "relative text-[13.5px] tracking-[0.01em] transition-colors py-2",
                  active
                    ? "text-kane-blue-ink font-medium"
                    : "text-ink-soft hover:text-kane-blue-ink"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
                {active && (
                  <span
                    className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-kane-amber"
                    aria-hidden
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchOpen((v) => !v);
              setTimeout(() => searchRef.current?.focus(), 50);
            }}
            className="flex items-center gap-2 rounded-sm border border-rule px-3 py-1.5 text-xs text-ink-soft hover:border-kane-blue-ink hover:text-kane-blue-ink transition-colors"
            aria-label="Search the atlas"
            data-tour="search"
          >
            <Search size={14} />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden md:inline font-mono text-[10px] text-ink-soft/60">⌘K</kbd>
          </button>

          {/* Language */}
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1.5 rounded-sm border border-rule px-3 py-1.5 text-xs text-ink-soft hover:border-kane-blue-ink hover:text-kane-blue-ink transition-colors"
              aria-label="Change language"
              aria-expanded={langOpen}
              data-tour="language"
            >
              <Languages size={14} />
              <span className="font-mono uppercase">{locale}</span>
            </button>
            {langOpen && (
              <div
                className="absolute right-0 top-full mt-1 w-48 rounded-sm border border-rule bg-white shadow-editorial-lg z-50"
                role="menu"
              >
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLocale(l.code as Locale);
                      setLangOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-baseline justify-between px-3 py-2 text-left text-sm transition-colors",
                      locale === l.code ? "bg-paper-deep text-kane-blue-ink" : "hover:bg-paper-deep"
                    )}
                    role="menuitem"
                  >
                    <span>{l.native}</span>
                    <span className="font-mono text-[10px] uppercase text-ink-soft">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden rounded-sm border border-rule p-1.5 text-ink-soft hover:text-kane-blue-ink"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Search tray */}
      {searchOpen && (
        <div className="border-t border-rule bg-white">
          <div className="container mx-auto py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (q.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(q)}`;
                }
              }}
              className="flex items-center gap-3"
            >
              <Search size={18} className="text-ink-soft" />
              <input
                ref={searchRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="flex-1 border-0 bg-transparent text-lg font-display tracking-tight placeholder:text-ink-soft/50 focus:outline-none"
                aria-label="Search"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs uppercase tracking-[0.14em] text-ink-soft hover:text-kane-blue-ink"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile nav */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="lg:hidden border-t border-rule bg-paper">
          <div className="container mx-auto py-3">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "block border-b border-rule py-3 text-sm font-display tracking-tight",
                    active ? "text-kane-blue-ink font-medium" : "text-ink-soft"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
